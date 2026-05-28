import React, { forwardRef } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { DateInput } from "./Date";
import { Button } from "./Button";

interface CustomDateProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onSubmit?: () => void;
  containerClassName?: string;
  className?: string;
  submitLabel?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const CustomDate = forwardRef<HTMLDivElement, CustomDateProps>(
  (
    {
      startDate,
      endDate,
      onStartDateChange,
      onEndDateChange,
      onSubmit,
      containerClassName,
      className,
      submitLabel = "Submit",
      size = "md",
    },
    ref,
  ) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className={cn(
          "flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto",
          containerClassName,
        )}
      >
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <DateInput
            value={startDate}
            onChange={onStartDateChange}
            className={className}
            size={size}
            placeholder="Start Date"
            containerClassName="flex-1 sm:flex-none sm:w-40"
          />
          <span className="text-slate-400 font-bold text-xs uppercase shrink-0">
            to
          </span>
          <DateInput
            value={endDate}
            onChange={onEndDateChange}
            className={className}
            size={size}
            placeholder="End Date"
            containerClassName="flex-1 sm:flex-none sm:w-40"
            popoverDirection="right"
          />
        </div>

        {/* Submit button */}
        {onSubmit && (
          <Button
            onClick={onSubmit}
            size={size}
            className="w-full sm:w-auto shrink-0"
          >
            {submitLabel}
          </Button>
        )}
      </motion.div>
    );
  },
);

CustomDate.displayName = "CustomDate";
