import React, { useState, useEffect } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, CreditCard, User, Verified, ShieldCheck } from "lucide-react";
import { Steps } from "../../components/Steps";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { cn } from "../../lib/utils";
import {
  validateRequired,
  validateMobile,
  validatePinCode,
} from "../../lib/validations";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import {
  createJewelleryOrder,
  fetchClientById,
} from "../../features/jewellery/jewelleryApi";
import { StateCitySelect } from "../../components/StateCitySelect";
import { DateInput } from "../../components/Date";

interface Product {
  id: string;
  title: string;
  sku: string;
  weight: string | number;
  price: number;
  image: string;
  category: string;
  purity: string | number;
  metal: string;
  badge?: string;
  isFeatured?: boolean;
}

const steps = [
  {
    id: "billing",
    title: "Billing Details",
    label: "BILLING INFO",
    icon: User,
  },
  {
    id: "shipping",
    title: "Shipping Address",
    label: "SHIPPING INFO",
    icon: MapPin,
  },
  { id: "payment", title: "Review & Pay", label: "PAYMENT", icon: CreditCard },
];

const STORAGE_KEY_PRODUCT = "jewellery_checkout_product";
const STORAGE_KEY_FORM = "jewellery_checkout_form";

export const JewelleryCheckout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const [searchParams] = useSearchParams();

  const locationState = location.state as {
    product: Product;
    clientId?: string;
  };

  const clientIdFromUrl = searchParams.get("clientId");
  const clientIdFromState = locationState?.clientId;
  const clientId =
    clientIdFromState ||
    clientIdFromUrl ||
    sessionStorage.getItem("jewellery_selected_client") ||
    undefined;

  let product = locationState?.product;
  if (!product && productId) {
    const stored = sessionStorage.getItem(STORAGE_KEY_PRODUCT);
    if (stored) product = JSON.parse(stored);
  }

  const { selectedClient } = useSelector((state: RootState) => state.jewellery);
  const { orderLoading, orderError, orderSuccess } = useSelector(
    (state: RootState) => state.jewellery,
  );

  console.log("selectedClient", selectedClient);

  const [currentStep, setCurrentStep] = useState(0);
  const [copyBilling, setCopyBilling] = useState(false);
  const [clientLoaded, setClientLoaded] = useState(false);
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({
    billing: {},
    shipping: {},
  });

  const getInitialFormData = () => {
    const stored = sessionStorage.getItem(STORAGE_KEY_FORM);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // ignore parse errors
      }
    }
    return {
      billing: {
        firstName: selectedClient?.client?.name?.split(" ")[0] || "",
        lastName:
          selectedClient?.client?.name?.split(" ").slice(1).join(" ") || "",
        email: selectedClient?.client?.Email || "",
        phone: selectedClient?.client?.mobileNo || "",
        panCardNumber: selectedClient?.client?.PanNumber || "",
        dateOfBirth: selectedClient?.client?.dob || "",
        address: "",
        landmark: "",
        city: "",
        stateName: "",
        zip: "",
      },
      shipping: {
        address: "",
        city: "",
        zip: "",
        landmark: "",
        stateName: "",
      },
      payment: { cardName: "", cardNumber: "", expiry: "", cvv: "" },
    };
  };

  const [formData, setFormData] = useState(getInitialFormData);

  useEffect(() => {
    if (product) {
      sessionStorage.setItem(STORAGE_KEY_PRODUCT, JSON.stringify(product));
    }
  }, [product]);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY_FORM, JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    if (clientId && !clientLoaded) {
      dispatch(fetchClientById(clientId));
      setClientLoaded(true);
    }
  }, [clientId, clientLoaded]);

  useEffect(() => {
    if (selectedClient?.client?._id && clientId === selectedClient.client._id) {
      const client = selectedClient.client;
      setFormData((prev) => ({
        ...prev,
        billing: {
          ...prev.billing,
          firstName: client.name?.split(" ")[0] || "",
          lastName: client.name?.split(" ").slice(1).join(" ") || "",
          email: client.Email || "",
          phone: client.mobileNo || "",
          panCardNumber: client.PanNumber || "",
          dateOfBirth: client.dob || "",
          address: client.address || "",
          city: client.city || "",
          stateName: client.state || "",
          zip: client.zip?.toString() || "",
        },
      }));
    }
  }, [selectedClient, clientId]);

  const adultDobMax = new Date(
    new Date().setFullYear(new Date().getFullYear() - 18),
  )
    .toLocaleDateString("en-GB")
    .replace(/\//g, "-");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  useEffect(() => {
    if (orderSuccess) {
      sessionStorage.removeItem(STORAGE_KEY_PRODUCT);
      sessionStorage.removeItem(STORAGE_KEY_FORM);
      sessionStorage.removeItem("jewellery_selected_client");
      const timer = setTimeout(() => {
        navigate("/dashboard/jewellery");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [orderSuccess, navigate]);

  const validateField = (
    step: string,
    field: string,
    value: string,
  ): string => {
    if (step === "billing") {
      switch (field) {
        case "firstName":
          return validateRequired(value) ? "" : "First name is required";
        case "lastName":
          return validateRequired(value) ? "" : "Last name is required";
        case "email":
          return validateRequired(value) ? "" : "Email is required";
        case "phone":
          if (!validateRequired(value)) return "Mobile number is required";
          return validateMobile(value)
            ? ""
            : "Enter valid 10-digit mobile number";
        case "panCardNumber":
          return validateRequired(value) ? "" : "PAN card number is required";
        case "dateOfBirth":
          return validateRequired(value) ? "" : "Date of birth is required";
        case "address":
          return validateRequired(value) ? "" : "Address is required";
        case "city":
          return validateRequired(value) ? "" : "City is required";
        case "stateName":
          return validateRequired(value) ? "" : "State is required";
        case "zip":
          if (!validateRequired(value)) return "Postal code is required";
          return validatePinCode(value)
            ? ""
            : "Enter valid 6-digit postal code";
        case "landmark":
          return validateRequired(value) ? "" : "Landmark is required";
        default:
          return "";
      }
    }
    if (step === "shipping") {
      switch (field) {
        case "address":
          return validateRequired(value) ? "" : "Delivery address is required";
        case "city":
          return validateRequired(value) ? "" : "City is required";
        case "stateName":
          return validateRequired(value) ? "" : "State is required";
        case "zip":
          if (!validateRequired(value)) return "Postal code is required";
          return validatePinCode(value)
            ? ""
            : "Enter valid 6-digit postal code";
        case "landmark":
          return validateRequired(value) ? "" : "Landmark is required";
        default:
          return "";
      }
    }
    return "";
  };

  const validateStep = (step: string): boolean => {
    const stepData = formData[step as keyof typeof formData];
    const stepErrors: Record<string, string> = {};
    let isValid = true;

    Object.keys(stepData).forEach((field) => {
      const error = validateField(
        step,
        field,
        stepData[field as keyof typeof stepData] as string,
      );
      if (error) {
        stepErrors[field] = error;
        isValid = false;
      }
    });

    setErrors((prev) => ({ ...prev, [step]: stepErrors }));
    return isValid;
  };

  const handleCopyBilling = (checked: boolean) => {
    setCopyBilling(checked);
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        shipping: {
          address: prev.billing.address,
          landmark: prev.billing.landmark,
          stateName: prev.billing.stateName,
          city: prev.billing.city,
          zip: prev.billing.zip,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        shipping: {
          address: "",
          landmark: "",
          stateName: "",
          city: "",
          zip: "",
        },
      }));
    }
  };

  const handleCompleteOrder = async () => {
    if (!clientId) {
      alert("No investor selected. Please go back and select an investor.");
      return;
    }

    const isBillingValid = validateStep("billing");
    const isShippingValid = validateStep("shipping");

    if (!isBillingValid || !isShippingValid) {
      return;
    }

    const payload = {
      productDetails: [
        {
          productId: String(product.id),
          quantity: 1,
          paymentTypeId: 4, // Spot payment
          product_img: product.image,
          metal_type: product.metal.toLowerCase(),
          productName: product.title,
          weight: product.weight,
          finalOrderPrice: product.price,
        },
      ],
      panCardNumber: formData.billing.panCardNumber,
      dateOfBirth: formData.billing.dateOfBirth,
      mobileNumber: formData.billing.phone,
      firstName: formData.billing.firstName,
      lastName: formData.billing.lastName,
      email: formData.billing.email.toLowerCase(),
      customerAddress: formData.billing.address,
      landMark: formData.billing.landmark,
      postalCode: formData.billing.zip.toString(),
      stateName: formData.billing.stateName || "State",
      cityName: formData.billing.city,
      shippingAddress: formData.shipping.address,
      shippingLandMark: formData.shipping.landmark,
      shippingPostalCode: formData.shipping.zip.toString(),
      shippingStateName: formData.shipping.stateName || "State",
      shippingCityName: formData.shipping.city,
    };

    const clientData = selectedClient?.client;
    dispatch(createJewelleryOrder(clientId, payload, clientData));
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <h2 className="text-2xl font-black text-slate-800">
          No product selected
        </h2>
        <Button
          onClick={() =>
            navigate("/dashboard/jewellery/buy-selected-jewellery")
          }
        >
          Return to Selection
        </Button>
      </div>
    );
  }

  const nextStep = () => {
    const currentStepKey = steps[currentStep].id;
    const stepName =
      currentStepKey === "billing" || currentStepKey === "shipping"
        ? currentStepKey
        : "billing";
    if (validateStep(stepName)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleInputChange = (step: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [step]: { ...prev[step as keyof typeof prev], [field]: value },
    }));
    if (errors[step]?.[field]) {
      setErrors((prev) => ({
        ...prev,
        [step]: { ...prev[step], [field]: "" },
      }));
    }
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case "billing":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                size="md"
                value={formData.billing.firstName}
                onChange={(e) =>
                  handleInputChange("billing", "firstName", e.target.value)
                }
                placeholder="John"
                error={errors.billing.firstName}
                required
              />
              <Input
                label="Last Name"
                size="md"
                value={formData.billing.lastName}
                onChange={(e) =>
                  handleInputChange("billing", "lastName", e.target.value)
                }
                placeholder="Doe"
                error={errors.billing.lastName}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Email Address"
                size="md"
                type="email"
                value={formData.billing.email}
                onChange={(e) =>
                  handleInputChange("billing", "email", e.target.value)
                }
                placeholder="john@example.com"
                disabled
                error={errors.billing.email}
                required
              />
              <Input
                label="Mobile Number"
                size="md"
                value={formData.billing.phone}
                onChange={(e) =>
                  handleInputChange("billing", "phone", e.target.value)
                }
                placeholder="98765 43210"
                error={errors.billing.phone}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="PAN Card Number"
                size="md"
                value={formData.billing.panCardNumber}
                onChange={(e) =>
                  handleInputChange("billing", "panCardNumber", e.target.value)
                }
                placeholder="ABCDE1234F"
                disabled
                error={errors.billing.panCardNumber}
                required
              />
              <DateInput
                label="Date of Birth"
                size="md"
                value={formData.billing.dateOfBirth}
                onChange={(val) => {
                  const [d, m, y] = val.split("-");
                  handleInputChange("billing", "dateOfBirth", `${y}-${m}-${d}`);
                }}
                maxDate={adultDobMax}
                error={errors.billing.dateOfBirth}
                required
              />
            </div>

            <Input
              label="Address"
              size="md"
              multiline
              rows={2}
              placeholder="Full street address..."
              value={formData.billing.address}
              onChange={(e) =>
                handleInputChange("billing", "address", e.target.value)
              }
              error={errors.billing.address}
              required
            />
            <div className="grid grid-cols-1 gap-4">
              <StateCitySelect
                onStateChange={(name) =>
                  handleInputChange("billing", "stateName", name)
                }
                onCityChange={(name) =>
                  handleInputChange("billing", "city", name)
                }
                initialStateValue={formData.billing.stateName}
                initialCityValue={formData.billing.city}
                stateError={errors.billing.stateName}
                cityError={errors.billing.city}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Postal Code"
                size="md"
                value={formData.billing.zip}
                onChange={(e) =>
                  handleInputChange("billing", "zip", e.target.value)
                }
                placeholder="400001"
                error={errors.billing.zip}
                required
              />
              <Input
                label="Landmark"
                size="md"
                value={formData.billing.landmark}
                onChange={(e) =>
                  handleInputChange("billing", "landmark", e.target.value)
                }
                placeholder="E.g. Near Park"
                error={errors.billing.landmark}
                required
              />
            </div>
          </motion.div>
        );
      case "shipping":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-2">
              <input
                type="checkbox"
                id="copyBilling"
                className="w-5 h-5 rounded-lg border-slate-300 text-primary focus:ring-primary/20 accent-primary"
                checked={copyBilling}
                onChange={(e) => handleCopyBilling(e.target.checked)}
              />
              <label
                htmlFor="copyBilling"
                className="text-xs font-black uppercase  text-slate-600 cursor-pointer select-none"
              >
                Same as Billing Address
              </label>
            </div>
            <Input
              label="Delivery Address"
              size="md"
              multiline
              rows={2}
              placeholder="Complete delivery address..."
              value={formData.shipping.address}
              onChange={(e) =>
                handleInputChange("shipping", "address", e.target.value)
              }
              disabled={copyBilling}
              error={errors.shipping.address}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StateCitySelect
                onStateChange={(name) =>
                  handleInputChange("shipping", "stateName", name)
                }
                onCityChange={(name) =>
                  handleInputChange("shipping", "city", name)
                }
                initialStateValue={formData.shipping.stateName}
                initialCityValue={formData.shipping.city}
                disabled={copyBilling}
                stateError={errors.shipping.stateName}
                cityError={errors.shipping.city}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Postal Code"
                size="md"
                value={formData.shipping.zip}
                onChange={(e) =>
                  handleInputChange("shipping", "zip", e.target.value)
                }
                placeholder="400001"
                disabled={copyBilling}
                error={errors.shipping.zip}
                required
              />
              <Input
                label="Landmark"
                size="md"
                value={formData.shipping.landmark}
                onChange={(e) =>
                  handleInputChange("shipping", "landmark", e.target.value)
                }
                placeholder="Near Central Park"
                disabled={copyBilling}
                error={errors.shipping.landmark}
                required
              />
            </div>
          </motion.div>
        );
      case "payment":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium">
              Payment is processed securely via our premium gateway. Please
              review your details before completing the order.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <User size={14} className="text-primary" />
                  <span className="text-[10px] font-black uppercase text-slate-500">
                    Billing Address
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-sm text-slate-800">
                    {formData.billing.firstName} {formData.billing.lastName}
                  </div>
                  <div className="text-xs text-slate-600">
                    {formData.billing.email}
                  </div>
                  <div className="text-xs text-slate-600">
                    {formData.billing.phone}
                  </div>
                  <div className="text-xs text-slate-600">
                    {formData.billing.address}
                  </div>
                  <div className="text-xs text-slate-600">
                    {formData.billing.city}, {formData.billing.stateName}{" "}
                    {formData.billing.zip}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-primary" />
                  <span className="text-[10px] font-black uppercase text-slate-500">
                    Shipping Address
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-slate-600">
                    {formData.shipping.address}
                  </div>
                  <div className="text-xs text-slate-600">
                    {formData.shipping.city}, {formData.shipping.stateName}{" "}
                    {formData.shipping.zip}
                  </div>
                  {formData.shipping.landmark && (
                    <div className="text-xs text-slate-500">
                      Landmark: {formData.shipping.landmark}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 flex flex-col">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left Aspect: Form */}
        <div className="flex-1 mb-4">
          <Steps currentStep={currentStep} steps={steps} />
          <div className="bg-white rounded-2xl p-4 shadow-xl shadow-slate-200/50 border border-slate-100">
            {/* <h2 className="text-xl font-semibold text-slate-800 mb-2  flex items-center gap-3">
              {steps[currentStep].title}
            </h2> */}

            {renderStepContent()}

            <div className="mt-6 flex flex-col gap-4">
              {orderError && (
                <div className="text-red-500 text-xs font-black bg-red-50 p-4 rounded-2xl border border-red-100 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  {orderError}
                </div>
              )}
              {orderSuccess && (
                <div className="text-green-600 text-xs font-black bg-green-50 p-4 rounded-2xl border border-green-100 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Order Placed Successfully! Redirecting...
                </div>
              )}
              <div className="flex items-center gap-4">
                {currentStep > 0 && (
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={prevStep}
                    disabled={orderLoading}
                  >
                    Previous Step
                  </Button>
                )}
                <div className="flex-1" />
                <Button
                  size="md"
                  loading={orderLoading}
                  disabled={orderSuccess}
                  onClick={
                    currentStep === steps.length - 1
                      ? handleCompleteOrder
                      : nextStep
                  }
                >
                  {currentStep === steps.length - 1
                    ? "Complete Order"
                    : "Continue to Shipping"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Aspect: Summary */}

        <div className="lg:w-[400px] mb-4">
          <div className="sticky top-8 space-y-4">
            <div className="relative group overflow-hidden rounded-3xl shadow-xl">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4a2a7d] via-[#4a2a7d] to-[#2d194d]" />

              {/* Glow Effects */}
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

              {/* Content */}
              <div className="relative z-10 p-5 text-white">
                {/* Title */}
                <h3 className="text-lg font-semibold mb-3 text-slate-300">
                  Order Summary
                </h3>

                {/* Product Info */}
                <div className="flex justify-between items-center gap-4 mb-3">
                  <div className="flex flex-col justify-center">
                    <div className="text-[10px] font-semibold text-amber-400 mb-1">
                      {product.metal}
                    </div>
                    <div className="text-sm font-semibold leading-tight mb-1 line-clamp-2">
                      {product.title}
                    </div>
                    <div className="text-xs text-slate-300 font-semibold">
                      {product.purity} Purity
                    </div>
                  </div>
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white/10 p-1 flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 pt-3 border-t border-white/10">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-slate-300">Subtotal</span>
                    <span>₹{product.price.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-slate-300">Craftsmanship Fee</span>
                    <span>₹0</span>
                  </div>

                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-slate-300">GST (3%)</span>
                    <span>₹{(product.price * 0.03).toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-slate-300">Shipping</span>
                    <span className="text-green-400 uppercase text-[10px] font-semibold">
                      Free
                    </span>
                  </div>

                  {/* Total */}
                  <div className="pt-3 border-t border-white/20 flex justify-between items-end">
                    <span className="text-md font-semibold text-slate-300">
                      Total Amount
                    </span>
                    <span className="text-lg font-bold text-white">
                      ₹{product.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
