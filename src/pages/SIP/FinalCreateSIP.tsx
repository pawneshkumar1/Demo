import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Loader2,
  ArrowRight,
  Clock,
  Repeat,
  CreditCard,
  CalendarDays,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchHeaderPrices } from "../../features/header/headerApi";
import { createSipProposal } from "../../features/sip/sipApi";
import { fetchUnifiedPortfolio } from "../../features/portfolio/portfolioApi";
import { clearPortfolio } from "../../features/portfolio/portfolioSlice";
import { toast } from "react-hot-toast";
import { fetchKycClientList, fetchKycData } from "../../features/kyc/kycApi";
import { cn } from "../../lib/utils";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ValidationError } from "../../components/ValidationError";
import { isValidNumericInput } from "../../lib/validations";
import AugmontLogo from "../../assets/logo/Augmont_Logo.avif";
import MMTCLogo from "../../assets/logo/MMTC_Logo.avif";
import { Select } from "@/src/components/Select";
import { Modal } from "../../components/Modal";
import goldIcon from "../../assets/icons/GoldSilverIcon/gold.png";
import silverIcon from "../../assets/icons/GoldSilverIcon/silver.png";

type Provider = "AUGMONT" | "MMTC";
type Asset = "GOLD" | "SILVER";
type Frequency = "DAILY" | "WEEKLY" | "MONTHLY";

export const FinalCreateSIP: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { clientId: initialClientId } = location.state || {};
  const [clientId, setClientId] = useState(initialClientId);

  const [provider, setProvider] = useState<Provider>("AUGMONT");
  const [asset, setAsset] = useState<Asset>("GOLD");
  const [amount, setAmount] = useState<string>("2000");
  const [frequency, setFrequency] = useState<Frequency>("DAILY");
  const [selectedDate, setSelectedDate] = useState<number>(5);
  const [selectedDay, setSelectedDay] = useState<string>("MON");
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [isFrequencyModalOpen, setIsFrequencyModalOpen] = useState(false);
  const [isFrequencyConfirmed, setIsFrequencyConfirmed] = useState(false);
  const [hasTriedToSubmit, setHasTriedToSubmit] = useState(false);

  const minAmounts = {
    DAILY: 100,
    WEEKLY: 500,
    MONTHLY: 1000,
  };

  const isAmountInvalid = useMemo(() => {
    const numAmount = parseFloat(amount || "0");
    return numAmount < minAmounts[frequency];
  }, [amount, frequency, minAmounts]);

  const { prices } = useSelector((state: RootState) => state.header);
  const {
    kycClientList,
    kycData,
    loading: kycLoading,
  } = useSelector((state: RootState) => state.kyc);
  const { data: portfolio } = useSelector(
    (state: RootState) => state.portfolio,
  );
  const [loading, setLoading] = useState(false);

  const lockerBalances = useMemo(() => {
    const p = provider.toLowerCase() as "augmont" | "mmtc";
    const a = asset.toLowerCase() as "gold" | "silver";
    return portfolio?.[p]?.[a]?.available || 0;
  }, [portfolio, provider, asset]);

  const lockedBalanceVal = useMemo(() => {
    const p = provider.toLowerCase() as "augmont" | "mmtc";
    const a = asset.toLowerCase() as "gold" | "silver";
    return portfolio?.[p]?.[a]?.locked || 0;
  }, [portfolio, provider, asset]);

  const portfolioDetails = useMemo(() => {
    const p = provider.toLowerCase() as "augmont" | "mmtc";
    const a = asset.toLowerCase() as "gold" | "silver";
    return (
      portfolio?.[p]?.[a] || {
        investedAmount: 0,
        currentAmount: 0,
        profitORloss: 0,
        percent: 0,
        available: 0,
        locked: 0,
      }
    );
  }, [portfolio, provider, asset]);

  useEffect(() => {
    const now = new Date();
    const dayOfMonth = now.getDate();
    setSelectedDate(dayOfMonth > 28 ? 1 : dayOfMonth);

    const dayOfWeek = now
      .toLocaleDateString("en-US", { weekday: "short" })
      .toUpperCase();
    setSelectedDay(dayOfWeek);
  }, []);

  useEffect(() => {
    if (frequency === "DAILY") setAmount("200");
    else if (frequency === "WEEKLY") setAmount("1000");
    else if (frequency === "MONTHLY") setAmount("2000");
  }, [frequency]);

  useEffect(() => {
    dispatch(fetchKycClientList());
  }, [dispatch]);

  useEffect(() => {
    if (clientId) {
      dispatch(fetchKycData(clientId));
    }
  }, [clientId, dispatch]);

  useEffect(() => {
    if (clientId) {
      const client = kycClientList.find((c: any) => c._id === clientId);
      const refNo = client?.customerRefNo;

      console.log("🟡 Fetching Unified Portfolio for SIP Page");
      if (refNo) {
        dispatch(fetchUnifiedPortfolio(refNo));
      } else {
        dispatch(fetchUnifiedPortfolio(clientId));
      }
    }
    return () => {
      dispatch(clearPortfolio());
    };
  }, [dispatch, clientId, kycClientList, provider, asset]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const clientName = useMemo(() => {
    if (kycData?.name) return kycData.name;
    if (!clientId) return "Investor";
    const client = kycClientList.find((c: any) => c._id === clientId);
    return client?.name || "Investor";
  }, [clientId, kycClientList, kycData]);

  // 3-minute countdown — auto-refresh on expiry
  useEffect(() => {
    dispatch(fetchHeaderPrices());
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          dispatch(fetchHeaderPrices());
          return 180;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const handleCreateSip = async () => {
    setHasTriedToSubmit(true);
    if (!isFrequencyConfirmed) {
      return;
    }

    if (isAmountInvalid) {
      return;
    }
    if (!clientId) {
      return;
    }

    setLoading(true);
    const data = {
      day_of_month: frequency === "WEEKLY" ? selectedDay : selectedDate,
      amount: amount,
      frequency: frequency.toLowerCase(),
      metal_type: asset.toLowerCase(),
      client_id: clientId,
    };

    try {
      const response = await dispatch(createSipProposal(clientId, data) as any);
      toast.success(response.message || "SIP created successfully!");
      navigate("/dashboard/sip");
    } catch (error: any) {
      toast.error(error.message || "Failed to create SIP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-4 bg-background-light">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left: Configuration */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {/* Step 1: Investor Selection */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Select Investor
                  </h3>
                </div>
                <Select
                  value={clientId}
                  onChange={(val) => setClientId(val)}
                  showSearch={true}
                  options={kycClientList.map((client: any) => ({
                    value: client._id,
                    label: `${client.name} (${client.mobileNo || "No Mobile"})`,
                  }))}
                  placeholder="Search and select investor"
                  size="md"
                  className={cn(
                    hasTriedToSubmit && !clientId && "border-red-500",
                  )}
                />
                {hasTriedToSubmit && !clientId && (
                  <ValidationError
                    message="Please select an investor"
                    className="mt-1 ml-1"
                  />
                )}
              </div>
            </div>

            {/* Step 2: Provider */}
            {/* <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm h-full">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Choose Refinery
                  </h3>
                </div>
                <div className="flex p-1.5 bg-slate-200 rounded-xl gap-2 h-full items-center">
                  <button
                    onClick={() => setProvider("AUGMONT")}
                    className={cn(
                      "flex-1 py-1 px-2 rounded-lg transition-all flex justify-center items-center h-[36px]",
                      provider === "AUGMONT"
                        ? "bg-primary shadow-lg shadow-primary/20"
                        : "bg-slate-300",
                    )}
                  >
                    <img
                      src={AugmontLogo}
                      alt="Augmont"
                      className={cn(
                        "h-7 w-auto object-contain transition-all",
                        provider === "AUGMONT" ? "brightness-0 invert" : "",
                      )}
                    />
                  </button>
                  <button
                    onClick={() => setProvider("MMTC")}
                    className={cn(
                      "flex-1 py-1 px-2 rounded-xl transition-all flex justify-center items-center h-[36px]",
                      provider === "MMTC"
                        ? "bg-primary shadow-lg shadow-primary/20"
                        : "bg-slate-300",
                    )}
                  >
                    <img
                      src={MMTCLogo}
                      alt="MMTC-PAMP"
                      className={cn(
                        "h-8 w-auto object-contain transition-all",
                        provider === "MMTC" ? "brightness-0 invert" : "",
                      )}
                    />
                  </button>
                </div>
              </div>
            </div> */}
          </div>
          {/* Step 3: Asset */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div className="flex flex-col mb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Choose Metal
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-[14px] font-bold text-black">
                  <span className="text-sm font-semibold text-slate-900">
                    Timer
                  </span>
                  <Clock size={14} />
                  <span
                    className={cn(
                      "text-xs font-semibold tabular-nums",
                      timeLeft <= 30 ? "text-red-300" : "text-black",
                    )}
                  >
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setAsset("GOLD")}
                className={cn(
                  "flex flex-col gap-2 p-2 rounded-xl border-2 transition-all text-left",
                  asset === "GOLD"
                    ? "border-amber-400 bg-amber-50 shadow-lg ring-4 ring-amber-400/5"
                    : "border-slate-100 bg-white hover:border-amber-200",
                )}
              >
                <div className="flex justify-between items-center">
                  <div className="size-10 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                    <img src={goldIcon} alt="" className="size-full" />
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-slate-900">
                      Digital Gold
                    </p>
                    <p className="text-xs font-bold text-slate-600">
                      ₹
                      {(
                        parseFloat(
                          prices.find(
                            (p) =>
                              p.provider ===
                              (provider === "AUGMONT"
                                ? "Augmont"
                                : "MMTC-PAMP"),
                          )?.gold || "0",
                        ) || 6205.28
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}{" "}
                      <span className="text-xs text-slate-400">/g</span>
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setAsset("SILVER")}
                className={cn(
                  "flex flex-col gap-2 p-2 rounded-xl border-2 transition-all text-left",
                  asset === "SILVER"
                    ? "border-slate-400 bg-slate-50 shadow-lg ring-4 ring-slate-400/5"
                    : "border-slate-100 bg-white hover:border-slate-200",
                )}
              >
                <div className="flex justify-between items-center">
                  <div className="size-10 rounded-xl flex items-center justify-center">
                    <img src={silverIcon} alt="" className="size-full" />
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-slate-900">
                      Digital Silver
                    </p>
                    <p className="text-xs font-bold text-slate-600">
                      ₹
                      {(
                        parseFloat(
                          prices.find(
                            (p) =>
                              p.provider ===
                              (provider === "AUGMONT"
                                ? "Augmont"
                                : "MMTC-PAMP"),
                          )?.silver || "0",
                        ) || 94.5
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}{" "}
                      <span className="text-xs text-slate-400">/g</span>
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
          {/* Step 4: Frequency */}
          <div>
            {/* Card */}
            <button
              onClick={() => setIsFrequencyModalOpen(true)}
              className={cn(
                "w-full flex items-center justify-between py-2 px-3 rounded-xl border transition-all group cursor-pointer",
                hasTriedToSubmit && !isFrequencyConfirmed
                  ? "border-red-500 bg-red-50/30"
                  : "border-slate-200 bg-white hover:bg-primary/[0.02] hover:border-primary/30",
              )}
            >
              <div className="flex items-center gap-3">
                <div className="size-6 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:border-primary/20 transition-colors">
                  <Clock size={12} />
                </div>
                <div className="text-left">
                  <h3 className="text-xs font-semibold text-slate-900">
                    {isFrequencyConfirmed
                      ? `${frequency.charAt(0) + frequency.slice(1).toLowerCase()} SIP`
                      : "Select Frequency"}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-xl shadow-sm group-hover:border-primary/20 transition-all">
                  <span className="text-[10px] font-bold text-primary uppercase">
                    {isFrequencyConfirmed ? (
                      <>
                        {frequency === "WEEKLY"
                          ? `${selectedDay}`
                          : frequency === "MONTHLY"
                            ? `Day ${selectedDate}`
                            : "Daily"}
                      </>
                    ) : (
                      "Select frequency type"
                    )}
                  </span>
                </div>
                <ArrowRight
                  size={14}
                  className="text-slate-300 group-hover:text-primary transition-colors"
                />
              </div>
            </button>
            {hasTriedToSubmit && !isFrequencyConfirmed && (
              <ValidationError
                message="Please select the frequency type"
                className="mt-2 ml-1"
              />
            )}
          </div>

          <Modal
            isOpen={isFrequencyModalOpen}
            onClose={() => setIsFrequencyModalOpen(false)}
            title="Set Timing & Frequency"
            size="md"
          >
            <div className="space-y-4">
              {/* Segmented Tabs */}
              <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl">
                {(["DAILY", "WEEKLY", "MONTHLY"] as Frequency[]).map((freq) => (
                  <button
                    key={freq}
                    onClick={() => setFrequency(freq)}
                    className={cn(
                      "flex-1 py-3 rounded-xl text-xs font-semibold uppercase  transition-all duration-300",
                      frequency === freq
                        ? "bg-primary text-white shadow-sm"
                        : "bg-slate-300/50 hover:bg-slate-300",
                    )}
                  >
                    {freq}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="min-h-[200px] flex items-center justify-center bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
                <AnimatePresence mode="wait">
                  {/* DAILY */}
                  {frequency === "DAILY" && (
                    <motion.div
                      key="daily"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="text-center max-w-md"
                    >
                      <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Repeat size={32} className="text-primary" />
                      </div>
                      <p className="font-semibold text-lg text-slate-900">
                        Daily Auto Investment
                      </p>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                        Auto-debit every day. Ideal for consistent investing and
                        rupee-cost averaging.
                      </p>
                    </motion.div>
                  )}

                  {/* WEEKLY */}
                  {frequency === "WEEKLY" && (
                    <motion.div
                      key="weekly"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      className="w-full"
                    >
                      <p className="text-center text-sm font-bold text-slate-900 mb-4 tracking-wider">
                        Select Day of Week
                      </p>
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                        {weekDays.map((day) => (
                          <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={cn(
                              "py-3 rounded-xl text-xs font-bold transition-all border",
                              selectedDay === day
                                ? "bg-primary text-white border-primary shadow-md scale-105"
                                : "bg-white text-slate-600 border-slate-200 hover:border-primary/30",
                            )}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* MONTHLY */}
                  {frequency === "MONTHLY" && (
                    <motion.div
                      key="monthly"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full"
                    >
                      <p className="text-center text-sm font-bold text-slate-900 mb-6 tracking-wider">
                        Select Date of Month
                      </p>
                      <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: 28 }, (_, i) => i + 1).map(
                          (date) => (
                            <button
                              key={date}
                              onClick={() => setSelectedDate(date)}
                              className={cn(
                                "h-10 w-10 flex items-center justify-center rounded-xl text-xs font-bold transition-all border",
                                selectedDate === date
                                  ? "bg-primary text-white border-primary shadow-sm"
                                  : "bg-white text-slate-600 border-slate-200 hover:border-primary/30 hover:text-primary",
                              )}
                            >
                              {date}
                            </button>
                          ),
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Button
                fullWidth
                size="md"
                onClick={() => {
                  setIsFrequencyConfirmed(true);
                  setIsFrequencyModalOpen(false);
                }}
                className="rounded-2xl shadow-lg shadow-primary/20"
              >
                Confirm Timing
              </Button>
            </div>
          </Modal>
          {/* Step 5: Amount */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-slate-900 ">
                  SIP Amount
                </h3>
              </div>
            </div>

            {/* Input Section */}
            <div className="space-y-4">
              <div className="relative group">
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (isValidNumericInput(val)) {
                      setAmount(val);
                    }
                  }}
                  onWheel={(e) => (e.target as HTMLInputElement).blur()}
                  placeholder="0.00"
                  icon={
                    <span
                      className={cn(
                        "text-2xl font-semibold transition-colors",
                        hasTriedToSubmit && isAmountInvalid
                          ? "text-red-400"
                          : "text-slate-300 group-focus-within:text-primary",
                      )}
                    >
                      ₹
                    </span>
                  }
                  className={cn(
                    "w-full rounded-xl py-4 text-2xl font-semibold transition-all outline-none pl-14 pr-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                    hasTriedToSubmit && isAmountInvalid
                      ? "bg-red-50/30 border-red-500 text-red-900"
                      : "bg-slate-50 border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10",
                  )}
                />
              </div>

              {hasTriedToSubmit && isAmountInvalid && (
                <ValidationError
                  message={`Minimum ${frequency.toLowerCase()} SIP amount is ₹${minAmounts[frequency].toLocaleString()}`}
                  className="mt-0 ml-1"
                />
              )}

              {/* Quick Select */}
              <div className="grid grid-cols-5 gap-2">
                {(frequency === "DAILY"
                  ? [100, 200, 300, 500, 1000]
                  : frequency === "WEEKLY"
                    ? [500, 1000, 1500, 2000, 3000]
                    : [1000, 2000, 3000, 5000, 10000]
                ).map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val.toString())}
                    className={cn(
                      "py-2.5 rounded-xl border text-xs font-semibold transition-all active:scale-95",
                      amount === val.toString()
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-white border-slate-200 text-slate-600 hover:border-primary hover:text-primary",
                    )}
                  >
                    ₹{val.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <Button
            size="md"
            className="mt-2 bg-primary text-white font-bold rounded-2xl shadow-lg w-full flex items-center justify-center gap-2"
            onClick={handleCreateSip}
            disabled={loading}
          >
            {loading ? (
              <div className="flex gap-2 whitespace-nowrap">
                <Loader2 className="animate-spin" size={20} />
                Creating SIP...
              </div>
            ) : (
              <div className="flex gap-2 whitespace-nowrap">
                Create SIP
                <ArrowRight size={18} />
              </div>
            )}
          </Button>
        </div>

        {/* Right: Dashboard */}
        <div className="lg:col-span-5 flex flex-col gap-4 sticky top-32">
          <div className="relative group overflow-hidden rounded-3xl shadow-xl h-60">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4a2a7d] via-[#4a2a7d] to-[#2d194d]" />
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="relative z-10 px-6 py-4 flex flex-col h-full text-white">
              <div className="flex justify-between items-start mb-6">
                <div className="h-10 w-auto object-contain rounded-md relative overflow-hidden shadow-inner">
                  <img
                    src="/new-ui/logo.png"
                    alt="Batuk Logo"
                    className="h-10 w-auto object-contain"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50 mb-1">
                    {asset === "GOLD" ? "Locked Gold" : "Locked Silver"}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-md font-semibold tracking-tight">
                      {lockedBalanceVal.toFixed(4)}{" "}
                      <span className="text-[10px] font-semibold text-white/40">
                        g
                      </span>
                    </h4>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50 mb-1">
                    {asset === "GOLD" ? "Gold Balance" : "Silver Balance"}
                  </p>
                  <div className="flex items-center gap-1.5 justify-end">
                    <h4 className="text-md font-semibold tracking-tight">
                      {lockerBalances.toFixed(4)}{" "}
                      <span className="text-[10px] font-semibold text-white/40">
                        g
                      </span>
                    </h4>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-end mt-auto">
                <div className="space-y-0.5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
                    Investor Name
                  </p>
                  <p className="text-sm font-semibold tracking-wide uppercase truncate max-w-[180px]">
                    {clientName}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="text-[10px] font-semibold uppercase opacity-40">
                    Powered By
                  </p>
                  <img
                    src={provider === "AUGMONT" ? AugmontLogo : MMTCLogo}
                    alt={provider}
                    className="h-6 w-auto object-contain brightness-0 invert"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Features */}
          <div className="flex flex-col gap-4 mb-4">
            <div className="relative group overflow-hidden rounded-3xl shadow-xl h-60">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4a2a7d] via-[#4a2a7d] to-[#2d194d]" />
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
              <div className="relative z-10 px-6 py-4 flex flex-col h-full text-white">
                {/* Features */}
                <div>
                  <div className="flex items-center gap-3">
                    <Repeat size={22} className="text-yellow-400" />
                    <h5 className="font-bold bg-gradient-to-br from-amber-400 to-amber-600 bg-clip-text text-transparent">
                      AutoPay Setup (NACH)
                    </h5>
                  </div>
                  <div className="pl-13 mb-2">
                    <ul className="list-disc list-outside text-xs text-white font-medium leading-relaxed">
                      <li>
                        Approval from the bank is completed within 3 business
                        days.
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <CreditCard size={22} className="text-yellow-400" />
                    <h5 className="font-bold bg-gradient-to-br from-amber-400 to-amber-600 bg-clip-text text-transparent">
                      UPI & Card Processing
                    </h5>
                  </div>
                  <div className="pl-13 mb-2">
                    <ul className="list-disc list-outside text-xs text-white font-medium leading-relaxed">
                      <li>
                        UPI debits begin on the same day, followed by scheduled
                        deductions.
                      </li>
                      <li>
                        Debit card payments are processed on the selected date.
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <CalendarDays size={22} className="text-yellow-400" />
                    <h5 className="font-bold bg-gradient-to-br from-amber-400 to-amber-600 bg-clip-text text-transparent">
                      SIP Minimum Contribution
                    </h5>
                  </div>
                  <div className="pl-13 mb-2">
                    <ul className="flex list-disc list-outside text-xs text-white font-medium leading-relaxed">
                      <li className="mr-8">Daily: ₹100</li>
                      <li className="mr-8">Weekly: ₹500</li>
                      <li>Monthly: ₹1,000</li>
                    </ul>
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
