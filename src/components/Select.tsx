import React, { useState, useRef, useEffect, forwardRef } from "react";
import { cn } from "../lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  error?: string;
  options: SelectOption[];
  containerClassName?: string;
  className?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg" | "xl";
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  id?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  disabled?: boolean;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label,
      error,
      options,
      className,
      containerClassName,
      placeholder = "Select option",
      size = "md",
      value,
      onChange,
      required,
      id,
      showSearch = false,
      searchPlaceholder = "Search...",
      disabled = false,
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const selectRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const filteredOptions = React.useMemo(
      () =>
        options.filter((o) =>
          o.label.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      [options, searchTerm],
    );

    const selected = options.find((o) => o.value === value);

    useEffect(() => {
      if (open && showSearch) {
        // Use a small timeout to ensure the element is rendered and can be focused
        const timer = setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
        return () => clearTimeout(timer);
      } else if (!open) {
        setSearchTerm("");
      }
    }, [open, showSearch]);

    const sizes = {
      sm: "px-4 h-[35px] text-[12px] rounded-lg font-semibold",
      md: "px-4 h-[40px] text-[12px] rounded-lg font-semibold",
      lg: "px-4 h-[45px] text-[12px] rounded-lg font-semibold",
      xl: "px-4 h-[50px] text-[12px] rounded-lg font-semibold",
    };

    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleSelect = (option: SelectOption) => {
      onChange?.(option.value);
      setOpen(false);
    };

    return (
      <div
        ref={selectRef}
        className={cn("w-full relative", containerClassName)}
      >
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "block font-bold text-slate-700 mb-1",
              size === "sm" ? "text-xs" : "text-sm",
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Select Input */}
        <div
          ref={ref}
          onClick={() => !disabled && setOpen(!open)}
          className={cn(
            "w-full border border-slate-200 bg-white text-slate-900 flex items-center justify-between cursor-pointer transition-all duration-300",
            "focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white",
            sizes[size],
            error && "border-red-500",
            open && "ring-2 ring-primary/20 border-primary bg-white",
            disabled && "opacity-50 cursor-not-allowed grayscale-[0.5]",
            className,
          )}
        >
          <span className={cn(!selected && "text-slate-400")}>
            {selected ? selected.label : placeholder}
          </span>

          <i
            className={cn(
              "fa-solid fa-chevron-down text-xs transition-transform duration-300",
              open && "rotate-180 text-primary",
            )}
          />
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute w-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
            {showSearch && (
              <div className="p-2 border-b border-slate-100">
                <div className="relative">
                  <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                  <input
                    ref={searchInputRef}
                    type="text"
                    className="w-full h-10 pl-9 pr-4 text-sm bg-slate-50 border-none rounded-xl focus:ring-1 focus:ring-primary/20 outline-none"
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            )}
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => {
                  const isActive = option.value === value;

                  return (
                    <div
                      key={`${option.value}-${index}`}
                      onClick={() => handleSelect(option)}
                      className={cn(
                        "px-4 py-3 cursor-pointer transition-all duration-200",
                        "hover:bg-primary/5 hover:text-primary",
                        isActive && "bg-primary/10 text-primary font-semibold",
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[12px]">{option.label}</span>
                        {isActive && (
                          <i className="fa-solid fa-check text-xs"></i>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="px-4 py-8 text-center text-slate-400 text-sm italic">
                  No matching results
                </div>
              )}
            </div>
          </div>
        )}

        {error && (
          <p className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}

        {/* Hidden input for form submission compatibility */}
        <input type="hidden" value={value || ""} required={required} />
      </div>
    );
  },
);

Select.displayName = "Select";
