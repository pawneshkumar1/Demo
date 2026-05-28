import React, { useState, forwardRef } from "react";
import { cn } from "../lib/utils";

interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
  "size"
> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  containerClassName?: string;
  multiline?: boolean;
  rows?: number;
  size?: "sm" | "md" | "lg" | "xl";
}

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    {
      label,
      error,
      icon,
      rightElement,
      className,
      containerClassName,
      type,
      id,
      multiline,
      rows = 2,
      size = "md",
      required,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    const sizes = {
      sm: "px-4 h-[35px] text-[12px] rounded-lg font-semibold",
      md: "px-4 h-[40px] text-[12px] rounded-lg font-semibold",
      lg: "px-4 h-[45px] text-[12px] rounded-lg font-semibold",
      xl: "px-4 h-[50px] text-[12px] rounded-lg font-semibold",
    };

    const iconSizes = {
      sm: "left-3 text-xs",
      md: "left-4 text-sm",
      lg: "left-4 text-base",
      xl: "left-5 text-lg",
    };

    const inputClasses = cn(
      "w-full border border-slate-200 bg-white text-slate-900 outline-none transition-all duration-300",
      "focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white",
      "placeholder:text-slate-400",
      icon ? (size === "sm" ? "pl-10" : size === "xl" ? "pl-14" : "pl-12") : "",
      isPassword || rightElement
        ? size === "sm"
          ? "pr-10"
          : size === "xl"
            ? "pr-14"
            : "pr-12"
        : "",
      error
        ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
        : "border-slate-200",
      "form-shadow",
      multiline
        ? "px-4 py-3 min-h-[80px] h-auto rounded-lg text-[12px] font-semibold"
        : sizes[size],
      className,
    );

    return (
      <div className={cn("w-full space-y-1", containerClassName)}>
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "block font-semibold text-slate-700",
              size === "sm" ? "text-xs" : "text-sm",
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative group">
          {icon && (
            <div
              className={cn(
                "absolute text-slate-400 group-focus-within:text-primary transition-colors flex items-center justify-center",
                iconSizes[size],
                multiline ? "top-4" : "top-1/2 -translate-y-1/2",
              )}
            >
              {icon}
            </div>
          )}

          {multiline ? (
            <textarea
              id={id}
              ref={ref as any}
              className={inputClasses}
              rows={rows}
              {...(props as any)}
            />
          ) : (
            <input
              id={id}
              type={inputType}
              ref={ref as any}
              className={inputClasses}
              {...(props as any)}
            />
          )}

          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <i
                className={cn(
                  "fa-solid",
                  showPassword ? "fa-eye-slash" : "fa-eye",
                )}
              ></i>
            </button>
          ) : rightElement ? (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {rightElement}
            </div>
          ) : null}
        </div>

        {error && (
          <p className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
