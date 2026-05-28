import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { StateCitySelect } from "../../components/StateCitySelect";
import { Select } from "../../components/Select";
import axiosInstance from "../../services/axiosInstance";
import { ENDPOINTS } from "../../services/endpoints";
import { toast } from "react-hot-toast";
import { Popup } from "../../components/Popup";
import {
  validateEmail,
  validateMobile,
  validateRequired,
  validatePan,
  validatePinCode,
  validateIfsc,
  validateCIN,
  validateGSTIN,
} from "../../lib/validations";

import Personal_Info_1 from "../../assets/images/RegistrationSlider/Personal_Info/Personal_Info_1.png";
import Personal_Info_2 from "../../assets/images/RegistrationSlider/Personal_Info/Personal_Info_2.png";
import Personal_Info_3 from "../../assets/images/RegistrationSlider/Personal_Info/Personal_Info_3.png";

import Address_Details_1 from "../../assets/images/RegistrationSlider/Address_Details/Address_Details_1.png";
import Address_Details_2 from "../../assets/images/RegistrationSlider/Address_Details/Address_Details_2.png";
import Address_Details_3 from "../../assets/images/RegistrationSlider/Address_Details/Address_Details_3.png";

import Bank_Details_1 from "../../assets/images/RegistrationSlider/Bank_Details/Bank_Details_1.png";
import Bank_Details_2 from "../../assets/images/RegistrationSlider/Bank_Details/Bank_Details_2.png";
import Bank_Details_3 from "../../assets/images/RegistrationSlider/Bank_Details/Bank_Details_3.png";

import Verification_1 from "../../assets/images/RegistrationSlider/Verification/Verification_1.png";
import Verification_2 from "../../assets/images/RegistrationSlider/Verification/Verification_2.png";
import Verification_3 from "../../assets/images/RegistrationSlider/Verification/Verification_3.png";

// Slider Image Mapping by Step
const STEP_IMAGES = {
  1: [Personal_Info_1, Personal_Info_2, Personal_Info_3],
  2: [Address_Details_1, Address_Details_2, Address_Details_3],
  3: [Bank_Details_1, Bank_Details_2, Bank_Details_3],
  4: [Verification_1, Verification_2, Verification_3],
};

export const Entity = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [registrationResponse, setRegistrationResponse] = useState<any>(null);

  const [formData, setFormData] = useState({
    entityType: "",
    companyName: "",
    incorporationNo: "",
    email: "",
    password: "",
    confirmPassword: "",
    panNo: "",
    gstin: "",
    authorizedPersonName: "",
    mobileNo: "",
    companyAddress: "",
    state: "",
    stateId: "",
    city: "",
    cityId: "",
    pincode: "",
    accountHolderName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    acceptedTerms: false,
  });

  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const [otpSent, setOtpSent] = useState({
    email: false,
    mobile: false,
  });

  const [verificationStatus, setVerificationStatus] = useState({
    email: false,
    mobile: false,
  });

  const [otpValues, setOtpValues] = useState({
    email: ["", "", "", "", "", ""],
    mobile: ["", "", "", "", "", ""],
  });

  const [resendTimer, setResendTimer] = useState({
    email: 0,
    mobile: 0,
  });

  const [editingEmail, setEditingEmail] = useState(false);
  const [editingMobile, setEditingMobile] = useState(false);
  const [editEmailValue, setEditEmailValue] = useState("");
  const [editMobileValue, setEditMobileValue] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => ({
        email: prev.email > 0 ? prev.email - 1 : 0,
        mobile: prev.mobile > 0 ? prev.mobile - 1 : 0,
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSendAllOtps = async () => {
    setOtpLoading(true);
    try {
      const payload = {
        email: formData.email,
        mobileNo: formData.mobileNo,
      };
      const response = await axiosInstance.post(
        ENDPOINTS.SEND_OTP_REGISTERATION,
        payload,
      );
      setOtpSent({ email: true, mobile: true });
      setResendTimer({ email: 120, mobile: 120 });
      setOtpValues({
        email: ["", "", "", "", "", ""],
        mobile: ["", "", "", "", "", ""],
      });
      setVerificationStatus({ email: true, mobile: true });
      toast.success(response.data.message || "OTPs sent successfully!");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to send OTPs");
    } finally {
      setOtpLoading(false);
    }
  };

  const startEditingEmail = () => {
    setEditEmailValue(formData.email);
    setEditingEmail(true);
  };

  const saveEmail = () => {
    if (!validateEmail(editEmailValue)) {
      toast.error("Invalid email format");
      return;
    }
    handleInputChange("email", editEmailValue);
    setEditingEmail(false);
    setOtpSent((prev) => ({ ...prev, email: false }));
    setVerificationStatus((prev) => ({ ...prev, email: false }));
  };

  const startEditingMobile = () => {
    setEditMobileValue(formData.mobileNo);
    setEditingMobile(true);
  };

  const saveMobile = () => {
    if (!validateMobile(editMobileValue)) {
      toast.error("Invalid mobile number");
      return;
    }
    handleInputChange("mobileNo", editMobileValue);
    setEditingMobile(false);
    setOtpSent((prev) => ({ ...prev, mobile: false }));
    setVerificationStatus((prev) => ({ ...prev, mobile: false }));
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      entityType: "",
      companyName: "",
      incorporationNo: "",
      email: "",
      password: "",
      confirmPassword: "",
      panNo: "",
      gstin: "",
      authorizedPersonName: "",
      mobileNo: "",
      companyAddress: "",
      state: "",
      stateId: "",
      city: "",
      cityId: "",
      pincode: "",
      accountHolderName: "",
      accountNumber: "",
      confirmAccountNumber: "",
      ifscCode: "",
      acceptedTerms: false,
    });
    setOtpSent({ email: false, mobile: false });
    setVerificationStatus({ email: false, mobile: false });
    setOtpValues({
      email: ["", "", "", "", "", ""],
      mobile: ["", "", "", "", "", ""],
    });
    setResendTimer({ email: 0, mobile: 0 });
    setErrors({});
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    const eotp = otpValues.email.join("");
    const motp = otpValues.mobile.join("");

    if (eotp.length < 6 || motp.length < 6) {
      toast.error("Please enter both 6-digit OTPs");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        registerType: "entity",
        EntityType: formData.entityType,
        Entityname: formData.companyName,
        EntityidentificationNo: formData.incorporationNo,
        Entityemail: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        panNo: formData.panNo,
        Gstin: formData.gstin || "",
        authpersonName: formData.authorizedPersonName,
        mobileNo: formData.mobileNo,
        companyAddress: formData.companyAddress,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        accHoldername: formData.accountHolderName || "",
        accNo: formData.accountNumber || "",
        confirmaccNo: formData.confirmAccountNumber || "",
        Ifsccode: formData.ifscCode || "",
        Eotp: eotp,
        Motp: motp,
      };

      const response = await axiosInstance.post(
        ENDPOINTS.PARTNER_REGISTRATION,
        payload,
      );
      if (response.data && response.data.error) {
        toast.error(response.data.message || "Invalid or expired OTP");
      } else if (response.data) {
        setRegistrationResponse(response.data.data || response.data);
        setShowSuccessPopup(true);
        resetForm();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (
    type: "email" | "mobile",
    index: number,
    value: string,
  ) => {
    const newValues = [...otpValues[type]];
    newValues[index] = value.slice(-1);
    setOtpValues((prev) => ({ ...prev, [type]: newValues }));

    // Focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${type}-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    type: "email" | "mobile",
    index: number,
    e: React.KeyboardEvent,
  ) => {
    if (e.key === "Backspace" && !otpValues[type][index] && index > 0) {
      const prevInput = document.getElementById(`otp-${type}-${index - 1}`);
      prevInput?.focus();
    }
  };

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string): string | null => {
    if (field === "email" && value && !validateEmail(value))
      return "Invalid email format";
    if (field === "panNo" && value && !validatePan(value.toUpperCase()))
      return "Invalid PAN format";
    if (field === "mobileNo" && value && !validateMobile(value))
      return "Invalid mobile number";
    if (field === "pincode" && value && !validatePinCode(value))
      return "Pincode must be 6 digits";
    if (field === "ifscCode" && value && !validateIfsc(value.toUpperCase()))
      return "Invalid IFSC format";
    if (field === "gstin" && value && !validateGSTIN(value.toUpperCase()))
      return "Invalid GSTIN format";
    if (
      field === "incorporationNo" &&
      value &&
      !validateCIN(value.toUpperCase())
    )
      return "Invalid CIN format";
    if (field === "confirmPassword" && formData.password !== value)
      return "Passwords do not match";
    if (field === "confirmAccountNumber" && formData.accountNumber !== value)
      return "Account Numbers do not match";
    return null;
  };

  const handleInputChange = (field: string, value: any) => {
    let finalValue = value;
    if (field === "email") {
      finalValue = value.toLowerCase();
    }
    setFormData((prev) => ({ ...prev, [field]: finalValue }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      const fieldError = validateField(field, finalValue);
      if (fieldError) newErrors[field] = fieldError;
      return newErrors;
    });
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!validateRequired(formData.entityType))
      newErrors.entityType = "Entity Type is required";
    if (!validateRequired(formData.companyName))
      newErrors.companyName = "Company/Entity Name is required";
    if (!validateRequired(formData.incorporationNo)) {
      newErrors.incorporationNo = "Incorporation No. is required";
    } else if (!validateCIN(formData.incorporationNo.toUpperCase())) {
      newErrors.incorporationNo = "Invalid CIN format";
    }
    if (!validateRequired(formData.email)) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!validateRequired(formData.password))
      newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!validateRequired(formData.panNo)) {
      newErrors.panNo = "PAN No. is required";
    } else if (!validatePan(formData.panNo.toUpperCase())) {
      newErrors.panNo = "Invalid PAN format";
    }
    if (formData.gstin && !validateGSTIN(formData.gstin.toUpperCase())) {
      newErrors.gstin = "Invalid GSTIN format";
    }
    if (!validateRequired(formData.authorizedPersonName))
      newErrors.authorizedPersonName = "Authorized Person Name is required";
    if (!validateRequired(formData.mobileNo)) {
      newErrors.mobileNo = "Mobile No. is required";
    } else if (!validateMobile(formData.mobileNo)) {
      newErrors.mobileNo = "Invalid mobile number";
    }
    if (!validateRequired(formData.companyAddress))
      newErrors.companyAddress = "Company Address is required";
    if (!validateRequired(formData.state))
      newErrors.state = "State is required";
    if (!validateRequired(formData.city)) newErrors.city = "City is required";
    if (!validateRequired(formData.pincode)) {
      newErrors.pincode = "Pincode is required";
    } else if (!validatePinCode(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (
      formData.accountNumber &&
      formData.accountNumber !== formData.confirmAccountNumber
    ) {
      newErrors.confirmAccountNumber = "Account Numbers do not match";
    }
    if (formData.ifscCode && !validateIfsc(formData.ifscCode.toUpperCase())) {
      newErrors.ifscCode = "Invalid IFSC format";
    }
    if (validateRequired(formData.acceptedTerms) === false) {
      newErrors.acceptedTerms = "Please accept the terms & conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const currentStepImages =
      STEP_IMAGES[step as keyof typeof STEP_IMAGES] || [];
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % currentStepImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [step]);

  useEffect(() => {
    setCurrentSlide(0);
  }, [step]);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    } else if (step === 3) {
      if (validateStep3()) setStep(4);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="bg-primary/5 text-slate-900 min-h-screen flex flex-col pt-16">
      <main className="grow flex flex-col md:flex-row h-full">
        {/* LEFT SIDE SLIDER */}
        <div className="hidden md:flex md:w-[50%] bg-primary/5 relative overflow-hidden items-center justify-center p-12">
          {/* Background glow */}
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
          </div>

          <div className="relative z-10 max-w-lg text-center w-full">
            {/* IMAGE SLIDER */}
            <div className="mb-10 aspect-square w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl bg-white relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${step}-${currentSlide}`}
                  src={
                    STEP_IMAGES[step as keyof typeof STEP_IMAGES][currentSlide]
                  }
                  alt={`Step ${step} - Slide ${currentSlide + 1}`}
                  className="w-full h-full object-contain absolute inset-0 p-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </div>

            {/* SLIDER DOTS */}
            <div className="flex justify-center gap-2">
              {STEP_IMAGES[step as keyof typeof STEP_IMAGES].map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === currentSlide
                      ? "w-8 bg-primary"
                      : "w-2 bg-primary/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 lg:p-20 bg-primary/5">
          <div className="max-w-xl mx-auto w-full">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase  text-primary">
                  Step {step} of 4
                </span>
                <span className="text-xs font-bold text-slate-600">
                  {step * 25}% Complete
                </span>
              </div>
              <div className="flex gap-2">
                <div
                  className={`h-1.5 flex-1 rounded-full ${step >= 1 ? "bg-primary" : "bg-primary/10"}`}
                ></div>
                <div
                  className={`h-1.5 flex-1 rounded-full ${step >= 2 ? "bg-primary" : "bg-primary/10"}`}
                ></div>
                <div
                  className={`h-1.5 flex-1 rounded-full ${step >= 3 ? "bg-primary" : "bg-primary/10"}`}
                ></div>
                <div
                  className={`h-1.5 flex-1 rounded-full ${step >= 4 ? "bg-primary" : "bg-primary/10"}`}
                ></div>
              </div>
              <div className="mt-2 flex justify-between text-[10px] md:text-xs font-medium text-slate-400">
                <span className={step >= 1 ? "text-primary font-bold" : ""}>
                  Entity Info
                </span>
                <span className={step >= 2 ? "text-primary font-bold" : ""}>
                  Address Details
                </span>
                <span className={step >= 3 ? "text-primary font-bold" : ""}>
                  Bank Details
                </span>
                <span className={step >= 4 ? "text-primary font-bold" : ""}>
                  Verification
                </span>
              </div>
            </div>

            {step === 1 && (
              <>
                <form className="space-y-6" onSubmit={handleNextStep}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label="Entity Type"
                      placeholder="Select Entity Type"
                      size="md"
                      required
                      value={formData.entityType}
                      onChange={(val) => handleInputChange("entityType", val)}
                      error={errors.entityType}
                      options={[
                        {
                          value: "individual_company",
                          label: "Individual Company",
                        },
                        {
                          value: "sole_proprietorship",
                          label: "Sole Proprietorship",
                        },
                        { value: "partnership", label: "Partnership" },
                        { value: "private_limited", label: "Private Limited" },
                        { value: "public_limited", label: "Public Limited" },
                        {
                          value: "llp",
                          label: "LLP (Limited Liability Partnership)",
                        },
                        { value: "trust", label: "Trust" },
                        { value: "society", label: "Society" },
                        { value: "government", label: "Government" },
                        {
                          value: "hindu_undivided_family",
                          label: "Hindu Undivided Family",
                        },
                        { value: "local_authority", label: "Local Authority" },
                        { value: "ngo", label: "NGO" },
                        {
                          value: "one_person_company",
                          label: "One Person Company",
                        },
                        {
                          value: "artificial_juridical_person",
                          label: "Artificial Juridical Person",
                        },
                      ]}
                    />

                    <Input
                      label="Company / Entity Name"
                      placeholder="Enter Company / Entity Name"
                      size="md"
                      value={formData.companyName}
                      onChange={(e) =>
                        handleInputChange("companyName", e.target.value)
                      }
                      error={errors.companyName}
                      required
                    />

                    <Input
                      label="Corporate Identification No. (CIN)"
                      placeholder="Enter CIN (e.g. U12345MH2020PTC123456)"
                      size="md"
                      value={formData.incorporationNo}
                      onChange={(e) =>
                        handleInputChange("incorporationNo", e.target.value)
                      }
                      error={errors.incorporationNo}
                      required
                    />

                    <Input
                      label="Email"
                      placeholder="name@company.com"
                      type="email"
                      size="md"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      error={errors.email}
                      required
                    />

                    <Input
                      label="Password"
                      placeholder="••••••••"
                      type="password"
                      size="md"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      error={errors.password}
                      required
                    />

                    <Input
                      label="Confirm Password"
                      placeholder="••••••••"
                      type="password"
                      size="md"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      error={errors.confirmPassword}
                      required
                    />
                  </div>
                  <div className="">
                    <Button
                      type="submit"
                      fullWidth
                      size="md"
                      icon={<i className="fa-solid fa-arrow-right"></i>}
                    >
                      Next Step
                    </Button>
                  </div>
                </form>
              </>
            )}

            {step === 2 && (
              <>
                <form
                  className="grid grid-cols-12 gap-4"
                  onSubmit={handleNextStep}
                >
                  {/* PAN */}
                  <div className="col-span-12 md:col-span-6">
                    <Input
                      label="PAN no."
                      placeholder="Enter PAN (XXXXX1234X)"
                      className="uppercase"
                      size="md"
                      maxLength={10}
                      value={formData.panNo}
                      onChange={(e) =>
                        handleInputChange("panNo", e.target.value.toUpperCase())
                      }
                      error={errors.panNo}
                      required
                    />
                  </div>

                  {/* GSTIN */}
                  <div className="col-span-12 md:col-span-6">
                    <Input
                      label="GSTIN (Optional)"
                      placeholder="Enter GSTIN"
                      className="uppercase"
                      size="md"
                      maxLength={15}
                      value={formData.gstin}
                      onChange={(e) =>
                        handleInputChange("gstin", e.target.value.toUpperCase())
                      }
                      error={errors.gstin}
                    />
                  </div>

                  {/* Authorized Person */}
                  <div className="col-span-12 md:col-span-6">
                    <Input
                      label="Authorized Person Name"
                      placeholder="Enter Full Name"
                      size="md"
                      value={formData.authorizedPersonName}
                      onChange={(e) =>
                        handleInputChange(
                          "authorizedPersonName",
                          e.target.value,
                        )
                      }
                      error={errors.authorizedPersonName}
                      required
                    />
                  </div>

                  {/* Mobile */}
                  <div className="col-span-12 md:col-span-6">
                    <Input
                      label="Mobile No."
                      placeholder="+91 00000 00000"
                      type="tel"
                      size="md"
                      maxLength={10}
                      value={formData.mobileNo}
                      onChange={(e) =>
                        handleInputChange(
                          "mobileNo",
                          e.target.value.replace(/\D/g, ""),
                        )
                      }
                      error={errors.mobileNo}
                      required
                    />
                  </div>

                  {/* Company Address */}
                  <div className="col-span-12">
                    <Input
                      label="Company Address"
                      placeholder="Enter Company Address"
                      multiline
                      rows={2}
                      size="md"
                      value={formData.companyAddress}
                      onChange={(e) =>
                        handleInputChange("companyAddress", e.target.value)
                      }
                      error={errors.companyAddress}
                      required
                    />
                  </div>

                  {/* State + City */}
                  <div className="col-span-12 md:col-span-8">
                    <StateCitySelect
                      onStateChange={(state, stateId) => {
                        setFormData((prev) => ({ ...prev, state, stateId }));
                        if (errors.state) {
                          setErrors((prev) => {
                            const newErrs = { ...prev };
                            delete newErrs.state;
                            return newErrs;
                          });
                        }
                      }}
                      onCityChange={(city, cityId) => {
                        setFormData((prev) => ({ ...prev, city, cityId }));
                        if (errors.city) {
                          setErrors((prev) => {
                            const newErrs = { ...prev };
                            delete newErrs.city;
                            return newErrs;
                          });
                        }
                      }}
                      size="md"
                      stateError={errors.state}
                      cityError={errors.city}
                      required
                    />
                  </div>

                  {/* Pincode */}
                  <div className="col-span-12 md:col-span-4">
                    <Input
                      label="Pincode"
                      placeholder="6-digit Pincode"
                      size="md"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) =>
                        handleInputChange(
                          "pincode",
                          e.target.value.replace(/\D/g, ""),
                        )
                      }
                      error={errors.pincode}
                      required
                    />
                  </div>

                  {/* Buttons */}
                  <div className="col-span-12 flex gap-4">
                    <Button
                      onClick={prevStep}
                      variant="secondary"
                      size="md"
                      className="flex-1"
                      icon={<i className="fa-solid fa-arrow-left"></i>}
                      iconPosition="left"
                    >
                      Back
                    </Button>

                    <Button
                      type="submit"
                      className="flex-[2]"
                      size="md"
                      icon={<i className="fa-solid fa-arrow-right"></i>}
                    >
                      Next Step
                    </Button>
                  </div>
                </form>
              </>
            )}

            {step === 3 && (
              <>
                <form className="space-y-6" onSubmit={handleNextStep}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Account Holder's Name (Optional)"
                      placeholder="Enter Account Holder's Name"
                      containerClassName="md:col-span-2"
                      size="md"
                      value={formData.accountHolderName}
                      onChange={(e) =>
                        handleInputChange("accountHolderName", e.target.value)
                      }
                      error={errors.accountHolderName}
                    />
                    <Input
                      label="Account No. (Optional)"
                      placeholder="Enter Account No."
                      size="md"
                      maxLength={18}
                      value={formData.accountNumber}
                      onChange={(e) =>
                        handleInputChange(
                          "accountNumber",
                          e.target.value.replace(/\D/g, ""),
                        )
                      }
                      error={errors.accountNumber}
                    />
                    <Input
                      label="Confirm Account No. (Optional)"
                      placeholder="Confirm Account No."
                      size="md"
                      maxLength={18}
                      value={formData.confirmAccountNumber}
                      onChange={(e) =>
                        handleInputChange(
                          "confirmAccountNumber",
                          e.target.value.replace(/\D/g, ""),
                        )
                      }
                      error={errors.confirmAccountNumber}
                    />
                    <Input
                      label="IFSC Code (Optional)"
                      placeholder="Enter IFSC Code"
                      className="uppercase"
                      containerClassName="md:col-span-2"
                      size="md"
                      maxLength={11}
                      value={formData.ifscCode}
                      onChange={(e) =>
                        handleInputChange(
                          "ifscCode",
                          e.target.value.toUpperCase(),
                        )
                      }
                      error={errors.ifscCode}
                    />
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary cursor-pointer"
                        checked={formData.acceptedTerms}
                        onChange={(e) =>
                          handleInputChange(
                            "acceptedTerms",
                            e.target.checked as any,
                          )
                        }
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="terms"
                        className="text-sm text-slate-600 cursor-pointer"
                      >
                        Please accept our{" "}
                        <Link
                          to="#"
                          className="text-primary font-bold hover:underline"
                        >
                          terms & conditions
                        </Link>
                      </label>
                      {errors.acceptedTerms && (
                        <p className="text-[10px] text-red-500 font-medium mt-1">
                          {errors.acceptedTerms}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={prevStep}
                      variant="secondary"
                      size="md"
                      className="flex-1"
                      icon={<i className="fa-solid fa-arrow-left"></i>}
                      iconPosition="left"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-[2]"
                      size="md"
                      icon={<i className="fa-solid fa-arrow-right"></i>}
                    >
                      Next Step
                    </Button>
                  </div>
                </form>
              </>
            )}

            {step === 4 && (
              <>
                <form className="space-y-8" onSubmit={handleRegistration}>
                  <div className="space-y-8">
                    {/* Unified Send Button */}
                    {!otpSent.email && !otpSent.mobile && (
                      <div className="bg-white p-8 rounded-3xl shadow-sm border border-primary/10 text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                          <i className="fa-solid fa-shield-halved text-2xl"></i>
                        </div>
                        <div className="space-y-3">
                          {/* Email Row */}
                          <div className="flex items-center justify-center gap-2">
                            {editingEmail ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="email"
                                  value={editEmailValue}
                                  onChange={(e) =>
                                    setEditEmailValue(
                                      e.target.value.toLowerCase(),
                                    )
                                  }
                                  placeholder="Enter email"
                                  className="px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none w-56"
                                />
                                <button
                                  type="button"
                                  onClick={saveEmail}
                                  className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary/90"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingEmail(false)}
                                  className="px-3 py-1.5 text-sm bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold">
                                  Email - {formData.email || "pk001@gmail.com"}
                                </span>
                                <button
                                  type="button"
                                  onClick={startEditingEmail}
                                  className="text-primary hover:text-primary/80"
                                >
                                  <i className="fa-solid fa-pen text-xs"></i>
                                </button>
                              </div>
                            )}
                          </div>
                          {/* Mobile Row */}
                          <div className="flex items-center justify-center gap-2">
                            {editingMobile ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="tel"
                                  value={editMobileValue}
                                  onChange={(e) =>
                                    setEditMobileValue(
                                      e.target.value.replace(/\D/g, ""),
                                    )
                                  }
                                  placeholder="Enter mobile"
                                  maxLength={10}
                                  className="px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none w-56"
                                />
                                <button
                                  type="button"
                                  onClick={saveMobile}
                                  className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary/90"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingMobile(false)}
                                  className="px-3 py-1.5 text-sm bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold">
                                  Mobile - {formData.mobileNo || "4567890987"}
                                </span>
                                <button
                                  type="button"
                                  onClick={startEditingMobile}
                                  className="text-primary hover:text-primary/80"
                                >
                                  <i className="fa-solid fa-pen text-xs"></i>
                                </button>
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 max-w-xs mx-auto">
                            We'll send verification codes to your email and
                            mobile number to secure your account.
                          </p>
                        </div>
                      </div>
                    )}

                    {(otpSent.email || otpSent.mobile) && (
                      <div className="space-y-6">
                        {/* Email Verification */}
                        <div className="space-y-4">
                          <div className="flex flex-col">
                            <label className="text-sm font-semibold text-slate-700">
                              Email Verification
                            </label>
                            <span className="text-[10px] font-bold text-slate-400 uppercase ">
                              {`Code sent to ${formData.email || "pk001@gmail.com"}`}
                            </span>
                          </div>
                          <div className="grid grid-cols-6 gap-4">
                            {otpValues.email.map((val, i) => (
                              <input
                                key={i}
                                id={`otp-email-${i}`}
                                type="text"
                                maxLength={1}
                                value={val}
                                onChange={(e) =>
                                  handleOtpChange("email", i, e.target.value)
                                }
                                onKeyDown={(e) => handleKeyDown("email", i, e)}
                                className="w-11 h-11 text-center text-base font-semibold bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                required
                              />
                            ))}
                          </div>
                        </div>

                        {/* Mobile Verification */}
                        <div className="space-y-4">
                          <div className="flex flex-col">
                            <label className="text-sm font-semibold text-slate-700">
                              Mobile Verification
                            </label>
                            <span className="text-[10px] font-bold text-slate-400 uppercase ">
                              {`Code sent to ${formData.mobileNo || "4567890987"}`}
                            </span>
                          </div>
                          <div className="grid grid-cols-6 gap-4">
                            {otpValues.mobile.map((val, i) => (
                              <input
                                key={i}
                                id={`otp-mobile-${i}`}
                                type="text"
                                maxLength={1}
                                value={val}
                                onChange={(e) =>
                                  handleOtpChange("mobile", i, e.target.value)
                                }
                                onKeyDown={(e) => handleKeyDown("mobile", i, e)}
                                className="w-11 h-11 text-center text-base font-semibold bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                required
                              />
                            ))}
                          </div>
                        </div>

                        {/* Resend Logic (Shared) */}

                        <div className="flex justify-center pt-4 border-t border-slate-100">
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            disabled={resendTimer.email > 0 || otpLoading}
                            onClick={handleSendAllOtps}
                          >
                            {resendTimer.email > 0
                              ? `Resend OTPs in ${resendTimer.email}s`
                              : "Resend OTPs"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    {!otpSent.email && !otpSent.mobile ? (
                      <Button
                        type="button"
                        size="md"
                        fullWidth
                        onClick={handleSendAllOtps}
                        icon={
                          otpLoading ? (
                            <i className="fa-solid fa-spinner fa-spin"></i>
                          ) : (
                            <i className="fa-solid fa-paper-plane"></i>
                          )
                        }
                      >
                        {otpLoading ? "Sending OTPs..." : "Send OTPs"}
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="flex-[2]"
                        size="md"
                        disabled={loading}
                        icon={
                          loading ? (
                            <i className="fa-solid fa-spinner fa-spin"></i>
                          ) : (
                            <i className="fa-solid fa-circle-check"></i>
                          )
                        }
                      >
                        {loading ? "Registering..." : "Finish Registration"}
                      </Button>
                    )}
                  </div>
                </form>
              </>
            )}

            <div className="mt-8 text-center">
              <p className="text-slate-600 text-sm">
                Already have an account?
                <Link
                  className="text-primary font-bold hover:underline ml-1"
                  to="/login"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Popup
        isOpen={showSuccessPopup}
        onClose={() => {
          setShowSuccessPopup(false);
          navigate("/login");
        }}
        title="Registration Successful!"
        message={
          registrationResponse?.message ||
          "Your company has been registered successfully."
        }
        userId={registrationResponse?.userName}
      />
    </div>
  );
};
