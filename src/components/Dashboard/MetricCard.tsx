import React from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

interface MetricCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  change?: string;
  augmontValue?: string;
  mmtcValue?: string;
  iconBg: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  label,
  value,
  change,
  augmontValue,
  mmtcValue,
  iconBg,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -4 }}
    className="glass-card p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100 bg-white"
  >
    <div className="flex justify-between items-start mb-4">
      <span
        className={cn(
          "p-2.5 rounded-xl flex items-center justify-center",
          iconBg,
        )}
      >
        <Icon className="w-5 h-5" />
      </span>
      {change && (
        <span className="text-green-500 bg-green-500/10 px-2.5 py-1 rounded-full text-[10px] font-bold">
          {change}
        </span>
      )}
    </div>
    <p className="text-sm font-semibold text-slate-600 mb-1">{label}</p>
    <h3 className="text-2xl font-black text-slate-900">{value}</h3>
    {(augmontValue || mmtcValue) && (
      <div className="w-full grid grid-cols-2 relative pt-2">
        {/* Vertical Separator */}
        <div className="absolute left-1/2 top-4 bottom-0 w-[1px] bg-slate-200 -translate-x-1/2" />

        <div className="px-2">
          <p className="text-[10px] font-bold text-slate-800 mb-1">Augmont</p>
          <p className="text-[10px] font-medium text-slate-600 whitespace-nowrap">
            {augmontValue || "₹0.00"}
          </p>
        </div>
        <div className="px-2">
          <p className="text-[10px] font-bold text-slate-800 mb-1">MMTC-PAMP</p>
          <p className="text-[10px] font-medium text-slate-600 whitespace-nowrap">
            {mmtcValue || "₹0.00"}
          </p>
        </div>
      </div>
    )}
  </motion.div>
);
