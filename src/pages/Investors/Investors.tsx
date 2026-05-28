import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Save, BadgeCheck, ShieldCheck, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Table, Column } from "../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchClients,
  sendEmailOtp,
  verifyEmailOtp,
  sendMobileOtp,
  verifyMobileOtp,
  createClient,
} from "../../features/client/clientApi";
import { resetClientState } from "../../features/client/clientSlice";
import { toast } from "react-hot-toast";
import { formatDate } from "@/src/utils/formatters";
import { exportTableToCSV } from "@/src/components/common/ExportData";

type VerifyState = "idle" | "otp_sent" | "verifying" | "verified" | "error";

// Helper Component for 6-Digit OTP
const OtpInput: React.FC<{
  value: string;
  onChange: (val: string) => void;
  onVerify: () => void;
  onResend: () => void;
  disabled?: boolean;
  loading?: boolean;
}> = ({ value, onChange, onVerify, onResend, disabled, loading }) => {
  const [timer, setTimer] = React.useState(60);
  const inputs = React.useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    setTimer(60);
    onResend();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val && e.target.value !== "") return;

    const newValue = value.split("");
    if (val) {
      newValue[index] = val[val.length - 1];
      const updatedValue = newValue.join("").slice(0, 6);
      onChange(updatedValue);
      // Auto focus next
      if (index < 5) {
        inputs.current[index + 1]?.focus();
      }
    } else {
      // Handle deletion
      newValue[index] = "";
      onChange(newValue.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
    if (e.key === "Enter" && value.length === 6) {
      onVerify();
    }
  };

  return (
    <div className="mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-2">
        <div className="flex gap-2">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value[i] || ""}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              disabled={disabled || loading}
              className="size-9 rounded-lg border border-slate-200 text-center text-xs font-bold bg-slate-50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          ))}
        </div>
        <Button
          size="sm"
          onClick={onVerify}
          disabled={value.length !== 6 || disabled || loading}
          className="h-9 px-4 text-[10px]"
        >
          {loading ? <Loader2 className="animate-spin" size={14} /> : "Verify"}
        </Button>
      </div>

      <div className="mt-1.5 flex justify-between items-center px-1">
        {timer > 0 ? (
          <p className="text-[10px] text-slate-400 font-bold uppercase ">
            Resend in 0:{timer.toString().padStart(2, "0")}
          </p>
        ) : (
          <button
            onClick={handleResend}
            disabled={disabled || loading}
            className="text-[10px] text-primary font-black uppercase  hover:underline transition-all"
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
};

export const Investors: React.FC<{ onNavigate?: (tab: string) => void }> = ({
  onNavigate,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { clientList, loading, otpLoading, createLoading } = useSelector(
    (state: RootState) => state.client,
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  // Email verification
  const [emailOtp, setEmailOtp] = useState("");
  const [emailState, setEmailState] = useState<VerifyState>("idle");

  // Mobile verification
  const [mobileOtp, setMobileOtp] = useState("");
  const [mobileState, setMobileState] = useState<VerifyState>("idle");

  useEffect(() => {
    dispatch(fetchClients());
    return () => {
      dispatch(resetClientState());
    };
  }, [dispatch]);

  const canSave =
    emailState === "verified" &&
    mobileState === "verified" &&
    name.trim().length > 0;

  const handleSendEmailOtp = async () => {
    if (!email.trim()) {
      toast.error("Please enter email address");
      return;
    }
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      await dispatch(sendEmailOtp(email));
      setEmailState("otp_sent");
      setEmailOtp("");
      toast.success("Email OTP sent successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to send email OTP");
    }
  };

  const handleSendMobileOtp = async () => {
    if (!mobile.trim()) {
      toast.error("Please enter mobile number");
      return;
    }
    if (mobile.replace(/\D/g, "").length < 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    try {
      await dispatch(sendMobileOtp(mobile));
      setMobileState("otp_sent");
      setMobileOtp("");
      toast.success("Mobile OTP sent successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to send mobile OTP");
    }
  };

  const handleVerifyEmail = async () => {
    if (emailOtp.length !== 6) return;
    try {
      await dispatch(verifyEmailOtp(email, emailOtp));
      setEmailState("verified");
      toast.success("Email verified successfully");
    } catch (error: any) {
      toast.error(error.message || "Invalid email OTP");
      setEmailState("error");
    }
  };

  const handleVerifyMobile = async () => {
    if (mobileOtp.length !== 6) return;
    try {
      await dispatch(verifyMobileOtp(mobile, mobileOtp));
      setMobileState("verified");
      toast.success("Mobile verified successfully");
    } catch (error: any) {
      toast.error(error.message || "Invalid mobile OTP");
      setMobileState("error");
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Please enter name as per PAN");
      return;
    }
    if (!email.trim()) {
      toast.error("Please enter email address");
      return;
    }
    if (emailState !== "verified") {
      toast.error("Please verify email address");
      return;
    }
    if (!mobile.trim()) {
      toast.error("Please enter mobile number");
      return;
    }
    if (mobileState !== "verified") {
      toast.error("Please verify mobile number");
      return;
    }

    try {
      await dispatch(
        createClient({
          name,
          Email: email,
          mobileNo: mobile,
          Eotp: emailOtp,
          Motp: mobileOtp,
        }),
      );

      toast.success("Investor added successfully");
      // Reset after save
      setName("");
      setEmail("");
      setMobile("");
      setEmailOtp("");
      setMobileOtp("");
      setEmailState("idle");
      setMobileState("idle");
    } catch (error: any) {
      toast.error(error.message || "Failed to add investor");
    }
  };

  const columns: Column<any>[] = [
    {
      key: "name",
      header: "Investor Name",
      sortable: true,
      filterable: true,
      cell: (row) => (
        <button
          onClick={() =>
            navigate("/dashboard/investors/view-transactions", {
              state: { clientId: row.customerRefNo },
            })
          }
          className=" text-primary font-semibold cursor-pointer hover:underline hover:text-primary/80 transition-all text-left"
        >
          {row.name}
        </button>
      ),
    },
    { key: "Email", header: "Email", sortable: true, filterable: true },
    { key: "mobileNo", header: "Mobile No.", sortable: true, filterable: true },
    {
      key: "createdAt",
      header: "Date",
      sortable: true,
      filterable: true,
      cell: (row) => formatDate(row.createdAt),
    },
    {
      key: "status",
      header: "Actions",
      sortable: true,
      filterable: true,
      cell: (row) =>
        Number(row.status) === 3 ? (
          <div className="flex justify-center">
            <button
              onClick={() =>
                navigate("/dashboard/investors/kyc-details", {
                  state: { clientId: row._id },
                })
              }
              className="flex gap-2 px-3 py-1.5 600 bg-emerald-50 text-emerald-600 cursor-pointer hover:bg-emerald-200 transition-colors text-xs font-bold rounded-lg whitespace-nowrap"
            >
              <BadgeCheck size={14} />
              KYC Done
            </button>
          </div>
        ) : (
          <button
            onClick={() =>
              navigate("/dashboard/investors/kyc", {
                state: { clientId: row._id },
              })
            }
            className="px-3 py-1.5 bg-primary/10 text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors text-xs font-bold rounded-lg whitespace-nowrap"
          >
            Complete KYC
          </button>
        ),
    },
  ];

  return (
    <div className="p-4 max-w-[1600px] mx-auto w-full flex flex-col gap-4 min-h-screen">
      {/* Add Investor Form */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm"
      >
        {/* Header */}
        <div className="px-4 pb-2 pt-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Users size={18} />
            </div>
            <div>
              <h4 className="font-black text-slate-800 text-sm">
                Add New Investor
              </h4>
              <p className="text-[10px] text-slate-400">Quick onboarding</p>
            </div>
          </div>

          {canSave && (
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <ShieldCheck size={14} />
              Verified
            </div>
          )}
        </div>

        {/* FORM ROW */}
        <div className="px-4 pb-4 pt-2">
          <div className="flex flex-col lg:flex-row gap-4 items-start">
            {/* NAME */}
            <div className="w-full lg:w-64 xl:w-72">
              <Input
                label="Name as per PAN"
                size="md"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName((e.target as HTMLInputElement).value)}
              />
            </div>

            {/* EMAIL */}
            <div className="w-full lg:w-72 xl:w-80">
              <Input
                label="Email"
                size="md"
                placeholder="email@address.com"
                value={email}
                onChange={(e) => {
                  setEmail((e.target as HTMLInputElement).value);
                  if (emailState !== "idle") setEmailState("idle");
                }}
                disabled={emailState === "verified"}
                rightElement={
                  emailState === "verified" ? (
                    <BadgeCheck className="text-emerald-500" size={18} />
                  ) : emailState === "idle" ? (
                    <Button
                      size="sm"
                      variant="primary"
                      className="text-[10px] min-w-[50px]"
                      onClick={handleSendEmailOtp}
                      disabled={!email.includes("@") || otpLoading.emailSend}
                    >
                      {otpLoading.emailSend ? (
                        <Loader2 className="animate-spin" size={12} />
                      ) : (
                        "OTP"
                      )}
                    </Button>
                  ) : null
                }
              />

              {/* Inline OTP */}
              {(emailState === "otp_sent" ||
                emailState === "verifying" ||
                emailState === "error") && (
                <OtpInput
                  value={emailOtp}
                  onChange={setEmailOtp}
                  onVerify={handleVerifyEmail}
                  onResend={handleSendEmailOtp}
                  disabled={emailState === "verifying"}
                  loading={otpLoading.emailVerify}
                />
              )}
            </div>

            {/* MOBILE */}
            <div className="w-full lg:w-72 xl:w-80">
              <Input
                label="Mobile"
                size="md"
                placeholder="+91 00000 00000"
                maxLength={10}
                value={mobile}
                onChange={(e) => {
                  const val = (e.target as HTMLInputElement).value
                    .replace(/\D/g, "")
                    .slice(0, 10);
                  setMobile(val);
                  if (mobileState !== "idle") setMobileState("idle");
                }}
                disabled={mobileState === "verified"}
                rightElement={
                  mobileState === "verified" ? (
                    <BadgeCheck className="text-emerald-500" size={18} />
                  ) : mobileState === "idle" ? (
                    <Button
                      size="sm"
                      variant="primary"
                      className="text-[10px] min-w-[50px]"
                      onClick={handleSendMobileOtp}
                      disabled={
                        mobile.replace(/\D/g, "").length < 10 ||
                        otpLoading.mobileSend
                      }
                    >
                      {otpLoading.mobileSend ? (
                        <Loader2 className="animate-spin" size={12} />
                      ) : (
                        "OTP"
                      )}
                    </Button>
                  ) : null
                }
              />

              {/* Inline OTP */}
              {(mobileState === "otp_sent" ||
                mobileState === "verifying" ||
                mobileState === "error") && (
                <OtpInput
                  value={mobileOtp}
                  onChange={setMobileOtp}
                  onVerify={handleVerifyMobile}
                  onResend={handleSendMobileOtp}
                  disabled={mobileState === "verifying"}
                  loading={otpLoading.mobileVerify}
                />
              )}
            </div>

            {/* SAVE BUTTON */}
            <div className="flex items-end self-start lg:mt-[26px] ml-auto">
              <Button
                onClick={handleSave}
                disabled={createLoading}
                size="md"
                className="h-10 min-w-[100px]"
                icon={
                  createLoading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Save size={16} />
                  )
                }
              >
                {createLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Investors List Table */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex-1"
      >
        <Table
          title="Recent Investors"
          columns={columns}
          data={clientList}
          loading={loading}
          searchPlaceholder="Search investors..."
          onSearch={(val) => console.log("Search:", val)}
          onFilter={() => console.log("Filter clicked")}
          entriesPerPage={10}
          selectable
          onExportAll={(data) =>
            exportTableToCSV(data, columns, "top_investors_all.csv")
          }
          onExportSelected={(data) =>
            exportTableToCSV(data, columns, "top_investors_selected.csv")
          }
        />
      </motion.section>
    </div>
  );
};
