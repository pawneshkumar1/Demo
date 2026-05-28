import React from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

interface SectionHeaderProps {
  title: string | React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  align = "left",
  theme = "light" || "dark",
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 mb-4",
        align === "center"
          ? "items-center text-center"
          : "items-start text-left",
        className,
      )}
    >
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className={cn(
          "text-3xl font-black leading-[1.1] ",
          theme === "light" ? "text-slate-900" : "text-white",
        )}
      >
        {title}
      </motion.h3>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={cn(
            "text-md leading-relaxed font-medium max-w-2xl",
            theme === "light" ? "text-slate-600" : "text-white/80",
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
