import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import {
  LayoutGrid,
  Wallet,
  Weight,
  Gift,
  Sparkles,
  ArrowRight,
  IndianRupee,
  Scale,
} from "lucide-react";
import { SummaryCard } from "./SummaryCard";
import { PriceAnalysis } from "./PriceAnalysis";
import { AssetDistribution } from "./AssetDistribution";
import { Select } from "../Select";
import { CustomDate } from "../CustomDate";
import { TopInvestors } from "./TopInvestors";
import { getProfile } from "../../features/user/userApi";
import {
  fetchTotalInvestments,
  fetchTopInvestors,
} from "../../features/dashboard/dashboardApi";
import type { AppDispatch, RootState } from "../../redux/store";
import { formatCurrency, formatNumber } from "../../utils/formatters";
import { Button } from "../Button";
import noticeBanner from "../../assets/images/notice_banner.avif";

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const hasRequestedProfile = useRef(false);
  const { profile, loading: profileLoading } = useSelector(
    (state: RootState) => state.user,
  );
  const { totalInvestments } = useSelector(
    (state: RootState) => state.dashboard,
  );

  const [timeFilter, setTimeFilter] = useState("30days");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const showNoticeBanner = false;

  useEffect(() => {
    if (!hasRequestedProfile.current && !profile && !profileLoading) {
      hasRequestedProfile.current = true;
      dispatch(getProfile());
    }
  }, [dispatch, profile, profileLoading]);

  useEffect(() => {
    dispatch(fetchTopInvestors());
  }, [dispatch]);

  const formatToISO = (dateStr: string) => {
    if (!dateStr || !dateStr.includes("-")) return dateStr;
    const parts = dateStr.split("-");
    if (parts[0].length === 4) return dateStr;
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  useEffect(() => {
    if (timeFilter !== "custom") {
      let start = "";
      let end = new Date().toISOString().split("T")[0];

      if (timeFilter === "30days") {
        const d = new Date();
        d.setDate(d.getDate() - 30);
        start = d.toISOString().split("T")[0];
      }

      dispatch(fetchTotalInvestments(start, end));
    }
  }, [dispatch, timeFilter]);

  const handleApplyCustomDate = () => {
    if (startDate && endDate) {
      const s = formatToISO(startDate);
      const e = formatToISO(endDate);
      dispatch(fetchTotalInvestments(s, e));
    }
  };

  if (!totalInvestments) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-4 mx-auto w-full flex flex-col gap-4"
    >
      <div className="flex flex-col xl:flex-row xl:items-center justify-between px-1 gap-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2.5 shrink-0">
          <LayoutGrid className="w-6 h-6 text-primary" />
          Overview
        </h3>

        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 w-full xl:w-auto">
          <div className="w-full sm:w-40 shrink-0">
            <Select
              value={timeFilter}
              onChange={(val) => setTimeFilter(val)}
              size="md"
              options={[
                { value: "30days", label: "Last 30 Days" },
                { value: "custom", label: "Custom Date" },
              ]}
            />
          </div>

          {timeFilter === "custom" && (
            <CustomDate
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              onSubmit={handleApplyCustomDate}
              submitLabel="Submit"
              containerClassName="justify-end"
              className="border border-slate-300 rounded-lg"
              size="md"
            />
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* Left Focus Area */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          {/* Top Metrics Row */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <SummaryCard
                label="Total Amount"
                value={formatCurrency(totalInvestments?.totalAumAmount)}
                augmontValue={formatCurrency(
                  totalInvestments?.totalAugmontGoldSilverAmount,
                )}
                mmtcValue={formatCurrency(
                  totalInvestments?.totalMMTCGoldSilverAmount,
                )}
                icon={Wallet}
                variant="dark"
              />
              <SummaryCard
                label="Gold Amount"
                value={formatCurrency(totalInvestments?.totalGoldAmount)}
                augmontValue={formatCurrency(
                  totalInvestments?.totalAugmontGoldAmount,
                )}
                mmtcValue={formatCurrency(
                  totalInvestments?.totalMMTCGoldAmount,
                )}
                icon={IndianRupee}
                variant="dark"
              />
              <SummaryCard
                label="Silver Amount"
                value={formatCurrency(totalInvestments?.totalSilverAmount)}
                augmontValue={formatCurrency(
                  totalInvestments?.totalAugmontSilverAmount,
                )}
                mmtcValue={formatCurrency(
                  totalInvestments?.totalMMTCSilverAmount,
                )}
                icon={IndianRupee}
                variant="dark"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mt-1 mb-4 px-1">
              <span className="font-bold text-slate-800 flex items-center gap-2.5">
                <Weight className="w-6 h-6 text-indigo-500" />
                Metal in Grams
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <SummaryCard
                label="Total Weight"
                value={formatNumber(totalInvestments?.totalGrams)}
                unit="gm"
                augmontValue={formatNumber(
                  totalInvestments?.totalAugmontGoldSilverGrams,
                )}
                mmtcValue={formatNumber(
                  totalInvestments?.totalMMTCGoldSilverGrams,
                )}
                icon={Weight}
              />
              <SummaryCard
                label="Gold Grams"
                value={formatNumber(totalInvestments?.totalGoldGrams)}
                unit="gm"
                augmontValue={formatNumber(
                  totalInvestments?.totalAugmontGoldGrams,
                )}
                mmtcValue={formatNumber(totalInvestments?.totalMMTCGoldGrams)}
                icon={Scale}
              />
              <SummaryCard
                label="Silver Grams"
                value={formatNumber(totalInvestments?.totalSilverGrams)}
                unit="gm"
                augmontValue={formatNumber(
                  totalInvestments?.totalAugmontSilverGrams,
                )}
                mmtcValue={formatNumber(totalInvestments?.totalMMTCSilverGrams)}
                icon={Scale}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 transition-transform duration-500 hover:-translate-y-1">
            <PriceAnalysis />
          </div>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="xl:col-span-4 flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="group hover:-translate-y-1 transition-transform duration-500"
          >
            <AssetDistribution />
          </motion.div>

          {/* Conditional Notice Banner or Gift Card */}
          {showNoticeBanner ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex-1 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              <img
                src={noticeBanner}
                alt="Notice Banner"
                className="w-full h-full object-cover"
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 
                rounded-2xl p-4 text-white shadow-2xl shadow-purple-500/25 
                relative overflow-hidden group hover:shadow-purple-500/40 
                transition-all duration-500"
            >
              {/* Background Effects */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-900/40 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/30 shadow-inner">
                    <Gift className="w-7 h-7 text-white" />
                  </div>

                  <h4 className="text-2xl font-black mb-3">Gift Gold Today</h4>

                  <p className="text-white/90 font-medium text-sm leading-relaxed max-w-xs">
                    Start a recurring gift for your loved ones today. Give the
                    eternal gift of financial security and prosperity.
                  </p>
                </div>

                <Button size="md" variant="white" fullWidth className="mt-6">
                  <div className="flex items-center gap-2">
                    <p>Get Started Now</p>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </Button>
              </div>

              {/* Decorative Icons */}
              <Gift className="absolute -bottom-8 -right-8 w-48 h-48 text-white/10 rotate-12 group-hover:rotate-45 group-hover:scale-110 transition-transform duration-700 ease-in-out pointer-events-none" />
              <Sparkles className="absolute top-8 right-8 w-6 h-6 text-white/40 animate-pulse pointer-events-none" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Full Width Top Investors Table */}
      <div className="pb-4">
        <TopInvestors />
      </div>
    </motion.div>
  );
};
