import React from "react";
import { motion } from "motion/react";
import { Check, BadgeCheck, type LucideIcon } from "lucide-react";
import { cn } from "../lib/utils";

interface Step {
  id: string | number;
  title: string;
  label?: string;
  icon?: LucideIcon;
  isCompleted?: boolean;
}

interface StepsProps {
  currentStep: number; // 0-indexed internally
  steps: Step[];
  variant?: "bars" | "circles";
  containerClassName?: string;
}

export const Steps: React.FC<StepsProps> = ({
  currentStep,
  steps,
  variant = "bars",
  containerClassName,
}) => {
  if (variant === "circles") {
    return (
      <div className={cn("mb-12 w-full mx-auto relative", containerClassName)}>
        <div className="flex w-full justify-between items-center px-4 relative">
          {steps.map((step, idx) => {
            const isActive = currentStep === idx;
            const isCompleted = currentStep > idx || step.isCompleted;
            const Icon = step.icon;

            return (
              <React.Fragment key={step.id}>
                {/* Step Item */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* Outer Circle */}
                  <motion.div
                    initial={false}
                    animate={{
                      borderColor:
                        isActive || isCompleted ? "var(--primary)" : "#CBD5E1",
                      scale: isActive ? 1.1 : 1,
                    }}
                    className={cn(
                      "w-16 h-16 rounded-full border-2 bg-white flex items-center justify-center transition-all duration-300",
                      isActive || isCompleted
                        ? "border-primary shadow-lg shadow-primary/10"
                        : "border-slate-200",
                    )}
                  >
                    {/* Inner Circle / Number */}
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300",
                        isCompleted
                          ? "bg-primary text-white"
                          : isActive
                            ? "bg-primary/20 text-primary"
                            : "bg-slate-50 text-slate-400",
                      )}
                    >
                      {isCompleted ? (
                        <Check size={24} strokeWidth={3} />
                      ) : Icon ? (
                        <Icon size={24} />
                      ) : (
                        idx + 1
                      )}
                    </div>
                  </motion.div>

                  {/* Step Label */}
                  <div className="absolute top-20 flex flex-col items-center whitespace-nowrap">
                    <span
                      className={cn(
                        "text-[10px] uppercase  font-bold",
                        isActive ? "text-primary" : "text-slate-400",
                      )}
                    >
                      {step.label || step.title}
                    </span>
                  </div>
                </div>

                {/* Line Segment between steps */}
                {idx < steps.length - 1 && (
                  <div className="flex-1 h-[2px] mx-[-32px] relative">
                    {/* Background Dotted Line */}
                    <div className="absolute inset-0 border-t-2 border-dashed border-slate-200" />
                    {/* Progress Dotted Line */}
                    <motion.div
                      className="absolute inset-0 border-t-2 border-dashed border-primary z-10"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isCompleted ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      style={{ transformOrigin: "left" }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }

  // Default 'bars' variant (Standardized to 0-indexed currentStep)
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("mb-4 w-full", containerClassName)}
    >
      <div className="flex justify-between items-end mb-2">
        <div>
          <p className="text-[#5b2c90] font-semibold text-sm mt-1">
            Step {currentStep + 1}
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-slate-600">
            {currentStep + 1} of {steps.length} Steps
          </span>
        </div>
      </div>

      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
      >
        {steps.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-2 rounded-full transition-all duration-500",
              currentStep >= i ? "bg-[#5b2c90]" : "bg-slate-200",
            )}
          />
        ))}
      </div>

      <div className="flex justify-around mt-2">
        {steps.map((step, i) => (
          <div
            key={step.id}
            className="flex items-center gap-1 justify-center whitespace-nowrap"
          >
            <span
              className={cn(
                "text-[10px] font-semibold transition-colors duration-300",
                currentStep >= i || step.isCompleted
                  ? "text-[#5b2c90]"
                  : "text-slate-400",
              )}
            >
              {step.label || step.title}
            </span>
            {step.isCompleted && (
              <BadgeCheck className="w-3 h-3 text-green-500" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};
