import React from "react";
import { motion, HTMLMotionProps } from "motion/react";
import { cn } from "../lib/utils";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "glass" | "ghost" | "white";
  size?: "sm" | "md" | "lg" | "xl";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  shimmer?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  shimmer = true,
  fullWidth = false,
  loading = false,
  className,
  ...props
}) => {
  const variants = {
    primary: "bg-primary text-white",
    secondary:
      "border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10",
    glass:
      "bg-white/10 backdrop-blur-xl border border-white/30 text-white hover:bg-white/20",
    white: "bg-white text-primary shadow-xl shadow-black/5 hover:bg-slate-50",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
  };

  const sizes = {
    sm: "px-4 h-[35px] text-[12px] rounded-lg font-semibold",
    md: "px-4 h-[40px] text-[12px] rounded-lg font-semibold",
    lg: "px-4 h-[45px] text-[12px] rounded-lg font-semibold",
    xl: "px-4 h-[50px] text-[12px] rounded-lg font-semibold",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative flex items-center justify-center overflow-hidden group active:scale-95 cursor-pointer",
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "w-fit",
        loading && "opacity-80 pointer-events-none cursor-not-allowed",
        className,
      )}
      disabled={loading || (props as any).disabled}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit z-20">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
      {/* Shimmer Effect */}
      {shimmer && (
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shimmer pointer-events-none" />
      )}

      {icon && iconPosition === "left" && (
        <span className="transition-transform">{icon}</span>
      )}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === "right" && (
        <span className="transition-transform">{icon}</span>
      )}
    </motion.button>
  );
};
