import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  UserCircle,
  CreditCard,
  Loader2,
  BadgeCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Steps } from "../../components/Steps";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchKycData,
  savePanDetails,
  saveAddressDetails,
  saveBankDetails,
} from "../../features/kyc/kycApi";
import {
  setSelectedClientId,
  resetKycState,
} from "../../features/kyc/kycSlice";
import { StateCitySelect } from "../../components/StateCitySelect";
import { DateInput } from "../../components/Date";
import { KycDone } from "./KycDone";
import { toast } from "react-hot-toast";
import { ValidationError } from "../../components/ValidationError";
import * as validations from "../../lib/validations";
import { cn } from "@/src/lib/utils";

const initialFormState = {
  PanNumber: "",
  dob: "",
  email: "",
  name: "",
  mobileNumber: "",
  address: "",
  state: "",
  stateName: "",
  stateCode: "",
  city: "",
  cityName: "",
  zip: "",
  accountHolderName: "",
  bank_account_no: "",
  confirmAccountNo: "",
  ifsc_code: "",
};

export const Kyc: React.FC = () => {
  const [step, setStep] = useState(1);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { kycData, status, panLoading, addressLoading, bankLoading } =
    useSelector((state: RootState) => state.kyc);

  const clientId = location.state?.clientId;

  const [formData, setFormData] = useState(initialFormState);
  const [hasTriedToSubmit, setHasTriedToSubmit] = useState(false);

  useEffect(() => {
    if (clientId) {
      dispatch(resetKycState());
      setFormData(initialFormState);
      setStep(1); // Also reset to first step
      dispatch(setSelectedClientId(clientId));
      dispatch(fetchKycData(clientId));
    }

    return () => {
      dispatch(resetKycState());
    };
  }, [clientId, dispatch]);

  useEffect(() => {
    if (kycData) {
      setFormData((prev) => ({
        ...prev,
        ...kycData,
        email: kycData.email || (kycData as any).Email || prev.email || "",
        mobileNumber:
          kycData.mobileNumber ||
          (kycData as any).mobileNo ||
          prev.mobileNumber ||
          "",
        confirmAccountNo:
          prev.confirmAccountNo || kycData.bank_account_no || "",
        stateName: kycData.stateName || kycData.state || prev.stateName || "",
        cityName: kycData.cityName || kycData.city || prev.cityName || "",
        zip: kycData.zip ? String(kycData.zip) : prev.zip || "",
      }));
    }
  }, [kycData]);

  const nextStep = () => {
    setHasTriedToSubmit(false);
    setStep((prev) => Math.min(prev + 1, 3));
  };
  const prevStep = () => {
    setHasTriedToSubmit(false);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handlePanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasTriedToSubmit(true);

    if (
      !validations.validateRequired(formData.name) ||
      !validations.validatePan(formData.PanNumber) ||
      !validations.validateRequired(formData.dob) ||
      !validations.validateEmail(formData.email)
    ) {
      return;
    }

    if (!clientId) return;
    try {
      const result = await dispatch(
        savePanDetails(clientId, {
          PanNumber: formData.PanNumber,
          dob: formData.dob,
          email: formData.email,
          name: formData.name,
        }),
      );
      const payload = result.payload as any;
      const response = typeof payload === "object" ? payload : null;
      if (response?.error === false) {
        toast.success(response?.message || "PAN details saved");
        nextStep();
      } else if (response?.error) {
        toast.error(response.message || "Failed to save PAN details");
      }
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to save PAN details";
      toast.error(errMsg);
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasTriedToSubmit(true);

    if (
      !validations.validateMobile(formData.mobileNumber) ||
      !validations.validateRequired(formData.address) ||
      !validations.validateRequired(formData.state) ||
      !validations.validateRequired(formData.cityName) ||
      !validations.validatePinCode(formData.zip)
    ) {
      return;
    }

    if (!clientId) return;
    try {
      const result = await dispatch(
        saveAddressDetails(clientId, {
          mobileNumber: formData.mobileNumber,
          address: formData.address,
          state: formData.state,
          stateName: formData.stateName,
          city: formData.city,
          cityName: formData.cityName,
          zip: formData.zip,
          stateCode: formData.stateCode,
        }),
      );
      const payload = result.payload as any;
      const response = typeof payload === "object" ? payload : null;
      if (response?.error === false) {
        toast.success(response?.message || "Address details saved");
        nextStep();
      } else if (response?.error) {
        toast.error(response.message || "Failed to save address details");
      }
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to save address details";
      toast.error(errMsg);
    }
  };

  const handleBankSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasTriedToSubmit(true);

    if (
      !validations.validateAccountNumber(formData.bank_account_no) ||
      !validations.validateAccountNumber(formData.confirmAccountNo) ||
      !validations.validateIfsc(formData.ifsc_code) ||
      formData.bank_account_no !== formData.confirmAccountNo
    ) {
      if (formData.bank_account_no !== formData.confirmAccountNo) {
        toast.error("Account numbers do not match");
      }
      return;
    }

    if (!clientId) return;
    try {
      const response = await dispatch(
        saveBankDetails(clientId, {
          accountHolderName: formData.accountHolderName,
          bank_account_no: formData.bank_account_no,
          ifsc_code: formData.ifsc_code,
        }),
      );
      console.log("Bank details result:", response);
      console.log("Bank details response:", response);
      if (response?.data?.error === false) {
        toast.success(response?.message || "Bank details saved successfully!");
        await dispatch(fetchKycData(clientId));
      } else {
        toast.error(response?.message || "Failed to save bank details");
      }
    } catch (error: any) {
      const errMsg = error?.message || "Failed to save bank details";
      toast.error(errMsg);
    }
  };

  const kycSteps = [
    {
      id: 1,
      title: "PAN Details",
      label: "PAN DETAILS",
      isCompleted: status?.pan === 1,
    },
    {
      id: 2,
      title: "Personal Details",
      label: "PERSONAL",
      isCompleted: status?.address === 1,
    },
    {
      id: 3,
      title: "Bank Details",
      label: "BANK",
      isCompleted: status?.bank === 1,
    },
  ];

  const isKycDone =
    (status?.pan === 1 && status?.address === 1 && status?.bank === 1) ||
    (kycData as any)?.status === 3;

  if (isKycDone && clientId) {
    return <KycDone clientId={clientId} />;
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center bg-white rounded-2xl p-4 shadow-2xl shadow-primary/5 border border-primary/5"
          >
            <div className="flex flex-col items-center justify-center space-y-4 bg-primary/5 rounded-2xl p-4 h-full relative overflow-hidden">
              <div className="relative z-10 w-full aspect-square max-w-[320px] flex items-center justify-center">
                <div className="relative bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4 border border-primary/10 w-3/4">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
                    <ShieldCheck className="w-10 h-10 text-primary" />
                  </div>
                  <div className="h-2 w-20 bg-primary/20 rounded-full" />
                  <div className="h-2 w-32 bg-primary/10 rounded-full" />
                </div>
              </div>
              <div className="text-center space-y-3 relative z-10">
                <h3 className="text-2xl font-black text-slate-800 ">
                  Secure Your Assets
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Steps
                  currentStep={step - 1}
                  steps={kycSteps}
                  containerClassName="mb-0"
                />
              </div>

              <form className="space-y-4" onSubmit={handlePanSubmit} noValidate>
                <div className="space-y-1">
                  <Input
                    label="Name as per PAN"
                    type="text"
                    placeholder="Enter name as per PAN"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: (e.target as HTMLInputElement).value,
                      })
                    }
                    size="sm"
                    required
                    disabled={status?.pan === 1}
                    className={cn(
                      hasTriedToSubmit &&
                        !validations.validateRequired(formData.name) &&
                        "border-red-500 bg-red-50/30",
                    )}
                  />
                  {hasTriedToSubmit &&
                    !validations.validateRequired(formData.name) && (
                      <ValidationError message="Full name is required" />
                    )}
                </div>

                <div className="space-y-1">
                  <Input
                    label="PAN Number"
                    type="text"
                    placeholder="ABCDE1234F"
                    value={formData.PanNumber}
                    onChange={(e) => {
                      const value = (
                        e.target as HTMLInputElement
                      ).value.toUpperCase();
                      if (value.length <= 10) {
                        setFormData({
                          ...formData,
                          PanNumber: value,
                        });
                      }
                    }}
                    size="sm"
                    required
                    disabled={status?.pan === 1}
                    maxLength={10}
                    className={cn(
                      hasTriedToSubmit &&
                        !validations.validatePan(formData.PanNumber) &&
                        "border-red-500 bg-red-50/30",
                    )}
                  />
                  {hasTriedToSubmit &&
                    !validations.validatePan(formData.PanNumber) && (
                      <ValidationError message="Please enter a valid 10-digit PAN number" />
                    )}
                </div>

                <div className="space-y-1">
                  <DateInput
                    label="Date of Birth"
                    value={formData.dob}
                    onChange={(value) =>
                      setFormData({ ...formData, dob: value })
                    }
                    size="sm"
                    required
                    disabled={status?.pan === 1}
                    maxDate={(() => {
                      const date = new Date();
                      date.setFullYear(date.getFullYear() - 18);
                      const d = String(date.getDate()).padStart(2, "0");
                      const m = String(date.getMonth() + 1).padStart(2, "0");
                      const y = date.getFullYear();
                      return `${d}-${m}-${y}`;
                    })()}
                    className={cn(
                      hasTriedToSubmit &&
                        !validations.validateRequired(formData.dob) &&
                        "border-red-500 bg-red-50/30",
                    )}
                  />
                  {hasTriedToSubmit &&
                    !validations.validateRequired(formData.dob) && (
                      <ValidationError message="Date of birth is required" />
                    )}
                </div>

                <div className="space-y-1">
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: (
                          e.target as HTMLInputElement
                        ).value.toLowerCase(),
                      })
                    }
                    size="sm"
                    required
                    disabled={status?.pan === 1}
                    className={cn(
                      hasTriedToSubmit &&
                        !validations.validateEmail(formData.email) &&
                        "border-red-500 bg-red-50/30",
                    )}
                  />
                  {hasTriedToSubmit &&
                    !validations.validateEmail(formData.email) && (
                      <ValidationError message="Please enter a valid email address" />
                    )}
                </div>

                <div className="pt-4">
                  {status?.pan === 1 ? (
                    <Button
                      variant="primary"
                      size="md"
                      fullWidth
                      type="button"
                      onClick={nextStep}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="md"
                      fullWidth
                      type="submit"
                      disabled={panLoading}
                    >
                      {panLoading ? (
                        <Loader2
                          className="animate-spin inline mr-2"
                          size={16}
                        />
                      ) : null}
                      Next Step
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-white p-4 rounded-2xl shadow-2xl shadow-primary/5 border border-primary/5"
          >
            <div className="flex flex-col justify-center items-center bg-primary/5 rounded-2xl p-4 h-full border border-primary/10 relative overflow-hidden">
              <div className="relative bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4 border border-primary/10 w-3/4 text-center">
                <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mb-2 overflow-hidden border-4 border-white">
                  <UserCircle className="w-12 h-12 text-blue-500" />
                </div>
                <div className="h-3 w-32 bg-slate-100 rounded-full" />
              </div>
              <div className="mt-8 text-center space-y-3 relative z-10">
                <h3 className="text-2xl font-black text-slate-900 ">
                  Secure & Private
                </h3>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <Steps
                  currentStep={step - 1}
                  steps={kycSteps}
                  containerClassName="mb-0"
                />
              </div>

              <form
                className="space-y-2"
                onSubmit={handleAddressSubmit}
                noValidate
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={formData.name}
                    readOnly
                    size="sm"
                    className="bg-slate-50 cursor-not-allowed opacity-70"
                  />
                  <div className="space-y-1">
                    <Input
                      label="Mobile Number"
                      value={formData.mobileNumber}
                      onChange={(e) => {
                        const val = (e.target as HTMLInputElement).value;
                        if (
                          validations.isValidNumericInput(val) &&
                          val.length <= 10
                        ) {
                          setFormData({
                            ...formData,
                            mobileNumber: val,
                          });
                        }
                      }}
                      size="sm"
                      placeholder="Enter mobile number"
                      required
                      disabled={status?.address === 1}
                      className={cn(
                        hasTriedToSubmit &&
                          !validations.validateMobile(formData.mobileNumber) &&
                          "border-red-500 bg-red-50/30",
                      )}
                    />
                    {hasTriedToSubmit &&
                      !validations.validateMobile(formData.mobileNumber) && (
                        <ValidationError message="Please enter a valid 10-digit mobile number" />
                      )}
                  </div>
                </div>

                {/* <div className="space-y-1"> */}
                <Input
                  label="Residential Address"
                  multiline
                  rows={1}
                  placeholder="Enter your full address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: (e.target as HTMLTextAreaElement).value,
                    })
                  }
                  size="sm"
                  required
                  disabled={status?.address === 1}
                  className={cn(
                    hasTriedToSubmit &&
                      !validations.validateRequired(formData.address) &&
                      "border-red-500 bg-red-50/30",
                  )}
                />
                {hasTriedToSubmit &&
                  !validations.validateRequired(formData.address) && (
                    <ValidationError message="Residential address is required" />
                  )}
                {/* </div> */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1 col-span-2">
                    <StateCitySelect
                      initialStateValue={formData.state}
                      initialCityValue={formData.cityName}
                      onStateChange={(name, id, code) =>
                        setFormData((prev) => ({
                          ...prev,
                          stateName: name,
                          state: id,
                          stateCode: code,
                          cityName: "",
                          city: "",
                        }))
                      }
                      onCityChange={(name, id) =>
                        setFormData((prev) => ({
                          ...prev,
                          cityName: name,
                          city: id,
                        }))
                      }
                      size="md"
                      required
                      disabled={status?.address === 1}
                    />
                    {hasTriedToSubmit &&
                      (!validations.validateRequired(formData.state) ||
                        !validations.validateRequired(formData.cityName)) && (
                        <ValidationError message="Please select both state and city" />
                      )}
                  </div>
                </div>

                <div className="space-y-1">
                  <Input
                    label="PIN Code"
                    value={formData.zip}
                    onChange={(e) => {
                      const val = (e.target as HTMLInputElement).value;
                      if (
                        validations.isValidNumericInput(val) &&
                        val.length <= 6
                      ) {
                        setFormData({
                          ...formData,
                          zip: val,
                        });
                      }
                    }}
                    maxLength={6}
                    size="sm"
                    required
                    disabled={status?.address === 1}
                    className={cn(
                      hasTriedToSubmit &&
                        !validations.validatePinCode(formData.zip) &&
                        "border-red-500 bg-red-50/30",
                    )}
                  />
                  {hasTriedToSubmit &&
                    !validations.validatePinCode(formData.zip) && (
                      <ValidationError message="Please enter a valid 6-digit PIN code" />
                    )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2 mt-2 border-t border-slate-100">
                  <Button
                    variant="secondary"
                    size="md"
                    fullWidth
                    onClick={prevStep}
                    type="button"
                  >
                    Back
                  </Button>
                  {status?.address === 1 ? (
                    <Button
                      variant="primary"
                      size="md"
                      fullWidth
                      type="button"
                      onClick={nextStep}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="md"
                      fullWidth
                      type="submit"
                      disabled={addressLoading}
                    >
                      {addressLoading ? (
                        <Loader2
                          className="animate-spin inline mr-2"
                          size={16}
                        />
                      ) : null}
                      Save Address
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-white p-4 rounded-2xl shadow-2xl shadow-primary/5 border border-primary/5"
          >
            <div className="flex flex-col justify-center items-center bg-primary/5 rounded-2xl p-4 border border-primary/10 relative overflow-hidden">
              <div className="relative z-10 w-full aspect-square max-w-[320px] flex items-center justify-center">
                <div className="relative bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4 border border-primary/10 w-3/4">
                  <div className="w-full aspect-[1.586/1] bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 relative overflow-hidden shadow-xl">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-8 h-6 bg-amber-400/20 rounded-md border border-amber-400/30 flex items-center justify-center">
                        <div className="w-4 h-3 bg-amber-400/40 rounded-sm" />
                      </div>
                      <CreditCard className="text-white/20" size={20} />
                    </div>
                    <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center space-y-3 relative z-10">
                <h3 className="text-2xl font-black text-slate-900 ">
                  Bank Verification
                </h3>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div>
                <Steps
                  currentStep={step - 1}
                  steps={kycSteps}
                  containerClassName="mb-0"
                />
              </div>

              <form
                className="space-y-4"
                onSubmit={handleBankSubmit}
                noValidate
              >
                <div className="space-y-1">
                  <Input
                    label="Bank Account No."
                    value={formData.bank_account_no}
                    onChange={(e) => {
                      const val = (e.target as HTMLInputElement).value;
                      if (validations.isValidNumericInput(val)) {
                        setFormData({
                          ...formData,
                          bank_account_no: val,
                        });
                      }
                    }}
                    size="sm"
                    placeholder="Enter account number"
                    required
                    disabled={status?.bank === 1}
                    className={cn(
                      hasTriedToSubmit &&
                        !validations.validateAccountNumber(
                          formData.bank_account_no,
                        ) &&
                        "border-red-500 bg-red-50/30",
                    )}
                  />
                  {hasTriedToSubmit &&
                    !validations.validateAccountNumber(
                      formData.bank_account_no,
                    ) && (
                      <ValidationError message="Please enter a valid bank account number" />
                    )}
                </div>

                <div className="space-y-1">
                  <Input
                    label="Confirm Account No."
                    value={formData.confirmAccountNo}
                    onChange={(e) => {
                      const val = (e.target as HTMLInputElement).value;
                      if (validations.isValidNumericInput(val)) {
                        setFormData({
                          ...formData,
                          confirmAccountNo: val,
                        });
                      }
                    }}
                    size="sm"
                    placeholder="Re-enter account number"
                    required
                    disabled={status?.bank === 1}
                    className={cn(
                      hasTriedToSubmit &&
                        (formData.bank_account_no !==
                          formData.confirmAccountNo ||
                          !validations.validateAccountNumber(
                            formData.confirmAccountNo,
                          )) &&
                        "border-red-500 bg-red-50/30",
                    )}
                  />
                  {hasTriedToSubmit &&
                    formData.bank_account_no !== formData.confirmAccountNo && (
                      <ValidationError message="Account numbers do not match" />
                    )}
                  {hasTriedToSubmit &&
                    formData.bank_account_no === formData.confirmAccountNo &&
                    !validations.validateAccountNumber(
                      formData.confirmAccountNo,
                    ) && (
                      <ValidationError message="Please enter a valid account number" />
                    )}
                </div>

                <div className="space-y-1">
                  <Input
                    label="IFSC Code"
                    value={formData.ifsc_code}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ifsc_code: (
                          e.target as HTMLInputElement
                        ).value.toUpperCase(),
                      })
                    }
                    size="sm"
                    placeholder="Enter IFSC code"
                    className={cn(
                      "uppercase",
                      hasTriedToSubmit &&
                        !validations.validateIfsc(formData.ifsc_code) &&
                        "border-red-500 bg-red-50/30",
                    )}
                    required
                    disabled={status?.bank === 1}
                    maxLength={11}
                  />
                  {hasTriedToSubmit &&
                    !validations.validateIfsc(formData.ifsc_code) && (
                      <ValidationError message="Please enter a valid IFSC code (e.g., SBIN0001234)" />
                    )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-8 mt-4 border-t border-slate-100">
                  <Button
                    variant="secondary"
                    size="md"
                    fullWidth
                    onClick={prevStep}
                    type="button"
                  >
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    type="submit"
                    disabled={bankLoading || status?.bank === 1}
                  >
                    {bankLoading ? (
                      <Loader2 className="animate-spin inline mr-2" size={16} />
                    ) : null}
                    {status?.bank === 1
                      ? "Bank Details Verified"
                      : "Submit KYC"}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-4 flex flex-col">
      <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
    </div>
  );
};
