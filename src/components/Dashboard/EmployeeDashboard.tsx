import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  ShieldCheck,
  BarChart3,
  LayoutGrid,
} from "lucide-react";
import { SummaryCard } from "./SummaryCard";

export const EmployeeDashboard: React.FC = () => {
  return (
    <div className="p-4 mx-auto w-full flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 p-8 shadow-2xl"
      >
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-white mb-2">
            Employee <span className="text-indigo-400">Dashboard</span>
          </h2>
          <p className="text-indigo-200/80 font-medium">
            Welcome back! Here's an overview of the platform performance today.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          label="Total Leads"
          value="1,280"
          icon={Users}
          variant="light"
        />
        <SummaryCard
          label="Conversions"
          value="15% "
          icon={TrendingUp}
          variant="light"
        />
        <SummaryCard
          label="Compliance Rate"
          value="98.5%"
          icon={ShieldCheck}
          variant="light"
        />
        <SummaryCard
          label="Active Tasks"
          value="12"
          icon={BarChart3}
          variant="light"
        />
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
          <LayoutGrid className="w-10 h-10 text-indigo-500" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">
          Metrics & Reports
        </h3>
        <p className="text-slate-600 max-w-sm">
          Select a category from the sidebar to view detailed employee-specific
          reports and analytics.
        </p>
      </div>
    </div>
  );
};
