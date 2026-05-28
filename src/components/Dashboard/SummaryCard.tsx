import React from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

interface SummaryCardProps {
  label: string;
  value: string;
  unit?: string;
  augmontValue?: string;
  mmtcValue?: string;
  icon: React.ElementType;
  variant?: "light" | "dark";
  isLoading?: boolean;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  label,
  value,
  unit,
  augmontValue,
  mmtcValue,
  icon: Icon,
  variant = "light",
  isLoading = false,
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02 }}
    className={cn(
      "p-4 rounded-2xl flex flex-col transition-all",
      variant === "dark"
        ? "bg-primary text-white shadow-xl shadow-primary/20"
        : "bg-white border border-slate-100 shadow-sm",
    )}
  >
    <div className="flex items-center justify-between w-full">
      <div>
        <p
          className={cn(
            "text-xs font-semibold uppercase mb-1",
            variant === "dark"
              ? "text-primary-200 opacity-80"
              : "text-slate-600",
          )}
        >
          {label}
        </p>
        {isLoading ? (
          <div className="h-7 w-32 bg-current opacity-10 animate-pulse rounded-lg" />
        ) : (
          <span className="font-semibold text-sm">
            {value}
            {unit && <span className="text-sm ml-1">{unit}</span>}
          </span>
        )}
      </div>
      <Icon
        className={cn(
          "w-10 h-10 opacity-20",
          variant === "dark" ? "text-white" : "text-slate-400",
        )}
      />
    </div>

    {(augmontValue || mmtcValue || isLoading) && (
      <div
        className={cn(
          "mt-4 pt-2 border-t w-full grid grid-cols-2 relative h-10",
          variant === "dark" ? "border-white/10" : "border-slate-100",
        )}
      >
        {/* Vertical Separator */}
        <div
          className={cn(
            "absolute left-1/2 top-4 bottom-0 w-[1px] -translate-x-1/2",
            variant === "dark" ? "bg-white/10" : "bg-slate-100",
          )}
        />

        <div className="text-center">
          <p
            className={cn(
              "text-[10px] font-bold uppercase ",
              variant === "dark" ? "text-white" : "text-slate-800",
            )}
          >
            Augmont
          </p>
          {isLoading ? (
            <div className="h-3 w-12 mx-auto bg-current opacity-10 animate-pulse rounded mt-1" />
          ) : (
            <p
              className={cn(
                "text-[10px] font-medium mt-0.5",
                variant === "dark" ? "text-primary-100" : "text-slate-600",
              )}
            >
              {augmontValue}
              {unit && <span className="ml-0.5 opacity-70">{unit}</span>}
            </p>
          )}
        </div>
        <div className="text-center">
          <p
            className={cn(
              "text-[10px] font-bold uppercase ",
              variant === "dark" ? "text-white" : "text-slate-800",
            )}
          >
            MMTC-PAMP
          </p>
          {isLoading ? (
            <div className="h-3 w-12 mx-auto bg-current opacity-10 animate-pulse rounded mt-1" />
          ) : (
            <p
              className={cn(
                "text-[10px] font-medium mt-0.5",
                variant === "dark" ? "text-primary-100" : "text-slate-600",
              )}
            >
              {mmtcValue}
              {unit && <span className="ml-0.5 opacity-70">{unit}</span>}
            </p>
          )}
        </div>
      </div>
    )}
  </motion.div>
);
