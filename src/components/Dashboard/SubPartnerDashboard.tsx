import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Target, Gem, PieChart, ArrowUpRight } from "lucide-react";
import { SummaryCard } from "./SummaryCard";

export const SubPartnerDashboard: React.FC = () => {
  return (
    <div className="p-4 mx-auto w-full flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-800 to-emerald-900 p-8 shadow-2xl"
      >
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-white mb-2">
            Sub-Partner <span className="text-emerald-400">Portal</span>
          </h2>
          <p className="text-emerald-200/80 font-medium">
            Track your network performance and earnings in real-time.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          label="My Network"
          value="45"
          icon={Briefcase}
          variant="light"
        />
        <SummaryCard
          label="Target Archieved"
          value="72%"
          icon={Target}
          variant="light"
        />
        <SummaryCard
          label="Jewellery Sales"
          value="₹4,20,000"
          icon={Gem}
          variant="light"
        />
        <SummaryCard
          label="Revenue Share"
          value="₹1,15,000"
          icon={PieChart}
          variant="light"
        />
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
          <Gem className="w-10 h-10 text-emerald-500" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">
          Network Insights
        </h3>
        <p className="text-slate-600 max-w-sm">
          You are currently in the{" "}
          <span className="text-emerald-600 font-bold">Gold Tier</span>. Refer
          more partners to unlock Platinum benefits.
        </p>
        <button className="mt-8 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center gap-2">
          View My Team <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
