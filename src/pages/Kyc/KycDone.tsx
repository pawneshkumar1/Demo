import React, { useState, useEffect } from "react";
import {
  BadgeCheck,
  ShieldCheck,
  MapPin,
  Building2,
  ArrowLeft,
  Loader2,
  Lock,
  User,
  CreditCard,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchKycData } from "../../features/kyc/kycApi";
import { DraggableChat } from "@/src/components/DraggableChat";

interface KycDoneProps {
  clientId?: string;
}

export const KycDone: React.FC<KycDoneProps> = ({ clientId: propClientId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const clientId = propClientId || location.state?.clientId;
  const [isChatOpen, setIsChatOpen] = useState(false);

  const {
    kycData: client,
    status,
    loading,
  } = useSelector((state: RootState) => state.kyc);

  useEffect(() => {
    if (clientId) {
      dispatch(fetchKycData(clientId));
    }
  }, [clientId, dispatch]);

  const [activeTab, setActiveTab] = useState<"pan" | "address" | "bank">("pan");

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-12 h-12 text-[#5b2c90] animate-spin" />
        <p className="text-slate-600">Verifying your records...</p>
      </div>
    );
  }

  return (
    <main className="flex-1 p-4 bg-background-light">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Details Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap gap-3 bg-slate-200 p-2 rounded-xl border border-slate-200/60 sticky top-4 z-30 backdrop-blur-md">
              {[
                { id: "pan", label: "PAN", icon: CreditCard },
                { id: "address", label: "Address", icon: MapPin },
                { id: "bank", label: "Bank", icon: Building2 },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 p-2 rounded-lg text-[14px] transition-all",
                    activeTab === tab.id
                      ? "bg-primary shadow-lg shadow-primary/20 text-white"
                      : "bg-slate-300 text-black",
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div
              id="verification-content-area"
              className="transition-all duration-500"
            >
              <AnimatePresence mode="wait">
                {activeTab === "pan" && (
                  <motion.div
                    key="pan"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
                        <div>
                          <span className="font-semibold text-slate-900">
                            Identity
                          </span>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="bg-green-50 text-green-700 text-[12px]  p-2 rounded-xl border border-green-200 flex items-center gap-2">
                            <BadgeCheck className="w-4 h-4" />
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DetailItem
                          label="Name"
                          value={client.name}
                          icon={User}
                        />
                        <DetailItem
                          label="PAN"
                          value={client.PanNumber}
                          icon={CreditCard}
                          isHighlighted
                        />
                        <DetailItem
                          label="Date of Birth"
                          value={client.dob}
                          icon={Calendar}
                        />
                        <DetailItem
                          label="Email"
                          value={client.Email}
                          icon={Mail}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "address" && (
                  <motion.div
                    key="address"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="bg-white rounded-[1rem] shadow-sm border border-slate-200 overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
                        <div>
                          <span className="font-semibold text-slate-900">
                            Address
                          </span>
                        </div>
                        <span className="bg-green-50 text-green-700 text-[12px]  p-2 rounded-xl border border-green-200 flex items-center gap-2">
                          <BadgeCheck className="w-4 h-4" />
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <DetailItem
                            label="Complete Address"
                            value={client.address}
                            icon={MapPin}
                          />
                        </div>
                        <DetailItem
                          label="State"
                          value={client.state}
                          icon={Building2}
                        />
                        <DetailItem
                          label="City"
                          value={client.city}
                          icon={Building2}
                        />
                        <DetailItem
                          label="Zip Code"
                          value={client.zip}
                          icon={MapPin}
                          isHighlighted
                        />
                        <DetailItem
                          label="Mobile Number"
                          value={client.mobileNo}
                          icon={Phone}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "bank" && (
                  <motion.div
                    key="bank"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="bg-white rounded-[1rem] shadow-sm border border-slate-200 overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
                        <div>
                          <span className="font-semibold text-slate-900">
                            Bank
                          </span>
                        </div>
                        <span className="bg-green-50 text-green-700 text-[12px]  p-2 rounded-xl border border-green-200 flex items-center gap-2">
                          <BadgeCheck className="w-4 h-4" />
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DetailItem
                          label="Account Holder Name"
                          value={client.name}
                          icon={User}
                        />
                        <DetailItem
                          label="Bank Account Number"
                          value={client.bank_account_no}
                          icon={Building2}
                          isHighlighted
                        />
                        <DetailItem
                          label="IFSC Provider"
                          value={client.ifsc_code}
                          icon={ShieldCheck}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Action Column */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#5b2c90] p-4 rounded-2xl shadow-2xl shadow-[#5b2c90]/30 flex flex-col items-center text-center relative overflow-hidden group">
              <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mb-10 border border-white/20 backdrop-blur-md">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                >
                  <BadgeCheck className="w-10 h-10 text-white" />
                </motion.div>
              </div>
              <h3 className="text-white text-xl bold  mb-4">
                KYC is Completed!
              </h3>
              <button
                onClick={() => {
                  navigate("/dashboard/buy/create-buy-proposal", {
                    state: { clientId: client?._id },
                  });
                }}
                className="w-full bg-white text-[#5b2c90]  py-3 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-[15px] relative z-10"
              >
                Place an Order
              </button>
              <p className="mt-8 text-[10px] font-bold text-white/50 relative z-10">
                Need help?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();

                    const nextState = !isChatOpen;

                    setIsChatOpen(nextState);

                    const tawk = (window as any).Tawk_API;

                    if (tawk?.addEvent) {
                      tawk.addEvent(nextState ? "chat_opened" : "chat_closed", {
                        page: window.location.pathname,
                        source: "header_button",
                        time: new Date().toISOString(),
                      });
                    }
                  }}
                  className="text-white underline decoration-white/30 hover:decoration-white/100 transition-all"
                >
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <DraggableChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </main>
  );
};

/* Helper Component for Reusable Detail Items */
const DetailItem: React.FC<{
  label: string;
  value?: string;
  icon: any;
  isHighlighted?: boolean;
}> = ({ label, value, icon: Icon }) => (
  <div className="group">
    <label className="text-sm  text-slate-600 block mb-1">{label}</label>
    <div
      className={cn(
        "flex items-center gap-2",
        // "bg-slate-50/50 border-slate-100",
        // "group-hover:bg-white group-hover:border-[#5b2c90]/30 group-hover:shadow-lg group-hover:shadow-[#5b2c90]/5",
      )}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center transition-colors shadow-sm",
          "bg-[#5b2c90] text-white",
        )}
      >
        <Icon className="w-4 h-4 shrink-0" />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn("text-slate-600 text-sm truncate leading-none p-2")}>
          {value || "—"}
        </p>
      </div>
    </div>
  </div>
);
