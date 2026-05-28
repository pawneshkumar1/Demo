import React, { useState, useMemo, useEffect } from "react";
import { motion } from "motion/react";
import {
  ShieldCheck,
  Clock,
  ArrowRight,
  Loader2,
  CreditCard,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchHeaderPrices } from "../../features/header/headerApi";
import { createBuyProposal } from "../../features/buy/buyApi";
import { fetchUnifiedPortfolio } from "../../features/portfolio/portfolioApi";
import { clearPortfolio } from "../../features/portfolio/portfolioSlice";
import { fetchKycClientList, fetchKycData } from "../../features/kyc/kycApi";
import { toast } from "react-hot-toast";
import { cn } from "../../lib/utils";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import AugmontLogo from "../../assets/logo/Augmont_Logo.avif";
import MMTCLogo from "../../assets/logo/MMTC_Logo.avif";
import { ValidationError } from "../../components/ValidationError";
import {
  isValidNumericInput,
  isValidDecimalInput,
} from "../../lib/validations";
import goldIcon from "../../assets/icons/GoldSilverIcon/gold.png";
import silverIcon from "../../assets/icons/GoldSilverIcon/silver.png";
import { Select } from "../../components/Select";

type Provider = "AUGMONT" | "MMTC";
type Asset = "GOLD" | "SILVER";
type Mode = "RUPEE" | "GRAM";

export const FinalCreateBuy: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { clientId: initialClientId } = location.state || {};
  const [clientId, setClientId] = useState(initialClientId);

  const [provider, setProvider] = useState<Provider>("AUGMONT");
  const [asset, setAsset] = useState<Asset>("GOLD");
  const [mode, setMode] = useState<Mode>("RUPEE");
  const [amount, setAmount] = useState<string>("1000");
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [hasTriedToSubmit, setHasTriedToSubmit] = useState(false);

  const { prices } = useSelector((state: RootState) => state.header);
  const {
    kycClientList,
    kycData,
    loading: kycLoading,
  } = useSelector((state: RootState) => state.kyc);

  const { data: portfolio } = useSelector(
    (state: RootState) => state.portfolio,
  );

  const clientName = useMemo(() => {
    if (kycData?.name) return kycData.name;
    if (!clientId) return "Investor";
    const client = kycClientList.find((c: any) => c._id === clientId);
    return client?.name || "Investor";
  }, [clientId, kycClientList, kycData]);

  const availableBalance = useMemo(() => {
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
    dispatch(fetchKycClientList());
  }, [dispatch]);

  useEffect(() => {
    if (clientId) {
      dispatch(fetchKycData(clientId));
    }
  }, [clientId, dispatch]);

  useEffect(() => {
    dispatch(fetchHeaderPrices());
  }, [dispatch]);

  useEffect(() => {
    if (clientId) {
      const client = kycClientList.find((c: any) => c._id === clientId);
      const refNo = client?.customerRefNo;

      console.log("🟡 Fetching Unified Portfolio for Buy Page");
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

  // 3-minute countdown — auto-refresh on expiry
  useEffect(() => {
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

  const handleRefresh = () => {
    dispatch(fetchHeaderPrices());
    setTimeLeft(180);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Derive live price from Redux header state
  const currentPrice = useMemo(() => {
    const providerName = provider === "AUGMONT" ? "Augmont" : "MMTC-PAMP";
    const providerData = prices.find((p) => p.provider === providerName);
    if (!providerData) return asset === "GOLD" ? 6205.28 : 94.5;
    const priceStr = asset === "GOLD" ? providerData.gold : providerData.silver;
    return parseFloat(priceStr) || (asset === "GOLD" ? 6205.28 : 94.5);
  }, [prices, provider, asset]);

  const goldPrice = useMemo(() => {
    const providerName = provider === "AUGMONT" ? "Augmont" : "MMTC-PAMP";
    const pd = prices.find((p) => p.provider === providerName);
    return parseFloat(pd?.gold || "0") || 6205.28;
  }, [prices, provider]);

  const silverPrice = useMemo(() => {
    const providerName = provider === "AUGMONT" ? "Augmont" : "MMTC-PAMP";
    const pd = prices.find((p) => p.provider === providerName);
    return parseFloat(pd?.silver || "0") || 94.5;
  }, [prices, provider]);

  const isAmountInvalid = useMemo(() => {
    const numAmount = parseFloat(amount || "0");
    const rupeeValue = mode === "GRAM" ? numAmount * currentPrice : numAmount;
    return numAmount <= 0 || rupeeValue < 100;
  }, [amount, mode, currentPrice]);

  const handleChange = (val: number) => {
    setAmount((prev) => {
      const current = parseFloat(prev) || 0;
      const newValue = current + val;
      return mode === "RUPEE"
        ? Math.round(newValue).toString()
        : newValue.toFixed(3).replace(/\.?0+$/, "");
    });
  };

  const calculations = useMemo(() => {
    const amt = parseFloat(amount || "0");
    const quantity = mode === "RUPEE" ? amt / currentPrice : amt;
    const value = mode === "GRAM" ? amt * currentPrice : amt;
    return {
      quantity: quantity.toFixed(4),
      value: value.toLocaleString(undefined, { minimumFractionDigits: 2 }),
    };
  }, [amount, currentPrice, mode]);

  const handleModeToggle = (newMode: Mode) => {
    if (newMode === mode) return;
    const numAmt = parseFloat(amount || "0");
    if (numAmt > 0) {
      if (newMode === "GRAM") {
        // Convert Rupee to Gram
        setAmount((numAmt / currentPrice).toFixed(4).replace(/\.?0+$/, ""));
      } else {
        // Convert Gram to Rupee
        setAmount(Math.round(numAmt * currentPrice).toString());
      }
    }
    setMode(newMode);
  };

  const handleConfirmBuy = async () => {
    setHasTriedToSubmit(true);
    if (isAmountInvalid) {
      return;
    }
    if (!clientId) {
      return;
    }

    setSubmitting(true);
    try {
      const payload: any = {
        metal_type: asset.toLowerCase(),
      };

      if (mode === "GRAM") {
        payload.quantity = amount;
      } else {
        payload.amount = amount;
      }

      if (provider === "MMTC") {
        payload.refinery = "mmtc-pamp";
      }

      const response = await dispatch(
        createBuyProposal(clientId, payload) as any,
      );
      toast.success(response?.message || "Buy order created successfully!");
      navigate("/dashboard/buy");
    } catch (error: any) {
      toast.error(error.message || "Failed to create buy order");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 py-4 px-4 bg-background-light">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                  size="lg"
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
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm h-full">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Choose Refinery
                  </h3>
                </div>
                <div className="flex p-1.5 bg-slate-200 rounded-xl gap-2">
                  <button
                    onClick={() => {
                      setProvider("AUGMONT");
                      handleRefresh();
                    }}
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
                    onClick={() => {
                      setProvider("MMTC");
                      handleRefresh();
                    }}
                    className={cn(
                      "flex-1 py-1 px-2 rounded-lg transition-all flex justify-center items-center h-[36px]",
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
            </div>
          </div>

          {/* Step 3: Asset */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div className="flex flex-col mb-2">
              <div className="flex items-center justify-between">
                <h3 className="text-1xl font-semibold text-slate-900">
                  Choose Metal
                </h3>
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

          {/* Step 4: Amount */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-1xl font-semibold text-slate-900 ">
                Buy Amount
              </h3>
              {/* Toggle */}
              <div className="flex p-1 bg-slate-100 rounded-xl">
                {[
                  { label: "Amount (₹)", value: "RUPEE" },
                  { label: "Weight (g)", value: "GRAM" },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => handleModeToggle(item.value as Mode)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-[10px] font-bold uppercase  transition-all",
                      mode === item.value
                        ? "bg-white text-primary shadow-sm"
                        : "text-slate-400 hover:text-slate-600",
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative group">
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (
                      mode === "GRAM"
                        ? isValidDecimalInput(val)
                        : isValidNumericInput(val)
                    ) {
                      setAmount(val);
                    }
                  }}
                  onWheel={(e) => (e.target as HTMLInputElement).blur()}
                  placeholder="0.00"
                  className={cn(
                    "w-full rounded-xl py-4 text-xl font-semibold transition-all outline-none pl-14 pr-16",
                    hasTriedToSubmit && isAmountInvalid
                      ? "bg-red-50/30 border-red-500 text-red-900"
                      : "bg-slate-50 border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-semibold transition z-10 pointer-events-none uppercase",
                    hasTriedToSubmit && isAmountInvalid
                      ? "text-red-400"
                      : "text-slate-300 group-focus-within:text-primary",
                  )}
                >
                  {mode === "RUPEE" ? "₹" : "g"}
                </span>
              </div>

              {hasTriedToSubmit && isAmountInvalid && (
                <ValidationError
                  message={
                    parseFloat(amount || "0") <= 0
                      ? "Please enter a valid amount"
                      : `Minimum purchase amount is ₹100 (${(100 / currentPrice).toFixed(4)} g)`
                  }
                  className="mt-0 ml-1"
                />
              )}

              {/* Quick Select */}
              <div className="grid grid-cols-5 gap-2">
                {(mode === "RUPEE"
                  ? [100, 500, 1000, 2000, 5000]
                  : asset === "GOLD"
                    ? [0.1, 0.2, 0.3, 0.5, 1]
                    : [10, 20, 30, 50, 100]
                ).map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val.toString())}
                    className={cn(
                      "py-2.5 rounded-xl border text-xs font-bold transition-all active:scale-95",
                      amount === val.toString()
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-white border-slate-200 text-slate-600 hover:border-primary hover:text-primary",
                    )}
                  >
                    {mode === "RUPEE" ? `₹${val.toLocaleString()}` : `${val} g`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <Button
            size="lg"
            fullWidth
            onClick={handleConfirmBuy}
            disabled={submitting || parseFloat(amount) <= 0}
            className="mt-2 bg-primary text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2"
          >
            {submitting ? (
              <div className="flex gap-2 whitespace-nowrap">
                <Loader2 className="animate-spin" size={20} />
                Processing...
              </div>
            ) : (
              <div className="flex gap-2 whitespace-nowrap">
                Place Order
                <ArrowRight size={18} />
              </div>
            )}
          </Button>
        </div>

        {/* Right Column */}
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

              <div className="space-y-4">
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
                        {availableBalance.toFixed(4)}{" "}
                        <span className="text-[10px] font-semibold text-white/40">
                          g
                        </span>
                      </h4>
                    </div>
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

          <div className="relative group overflow-hidden rounded-3xl shadow-xl h-60">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4a2a7d] via-[#4a2a7d] to-[#2d194d]" />
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="relative z-10 px-6 py-4 flex flex-col h-full text-white">
              {/* Features */}
              <div>
                <div className="flex items-center gap-3">
                  <Clock size={22} className="text-yellow-400" />
                  <h5 className="font-bold bg-gradient-to-br from-amber-400 to-amber-600 bg-clip-text text-transparent">
                    Price Applicability
                  </h5>
                </div>
                <div className="pl-13 mb-2">
                  <ul className="list-disc list-outside text-xs text-white font-medium leading-relaxed">
                    <li>
                      Due to live market fluctuations, the price may vary
                      between order placement and execution.
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <CreditCard size={22} className="text-yellow-400" />
                  <h5 className="font-bold bg-gradient-to-br from-amber-400 to-amber-600 bg-clip-text text-transparent">
                    Payment Charges
                  </h5>
                </div>
                <div className="pl-13 mb-2">
                  <ul className="list-disc list-outside text-xs text-white font-medium leading-relaxed">
                    <li>
                      Payment gateway charges will be applied at the time of
                      payment execution.
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <ShieldCheck size={22} className="text-yellow-400" />
                  <h5 className="font-bold bg-gradient-to-br from-amber-400 to-amber-600 bg-clip-text text-transparent">
                    Lock-in Period
                  </h5>
                </div>
                <div className="pl-13 mb-2">
                  <ul className="list-disc list-outside text-xs text-white font-medium leading-relaxed">
                    <li>
                      A 7-day lock-in period will be applicable on the purchase.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
