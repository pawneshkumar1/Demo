import React, { useState, useRef, useEffect, forwardRef } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

// ─── Constants ───────────────────────────────────────────────────────────────

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// ─── Types ───────────────────────────────────────────────────────────────────

interface DateProps {
  label?: string;
  error?: string;
  containerClassName?: string;
  className?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg" | "xl";
  value?: string; // Expecting YYYY-MM-DD
  onChange?: (value: string) => void;
  required?: boolean;
  id?: string;
  popoverDirection?: "left" | "right";
  minDate?: string; // DD-MM-YYYY
  maxDate?: string; // DD-MM-YYYY
  disabled?: boolean;
}

// ─── Component ───────────────────────────────────────────────────────────────

const formatDate = (date: Date) => {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
};

const parseDate = (dateStr: string) => {
  if (!dateStr) return null;
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    // DD-MM-YYYY
    const d = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const y = parseInt(parts[2], 10);
    return new Date(y, m, d);
  }
  const iso = new Date(dateStr);
  return isNaN(iso.getTime()) ? null : iso;
};

export const DateInput = forwardRef<HTMLDivElement, DateProps>(
  (
    {
      label,
      error,
      className,
      containerClassName,
      placeholder = "Select date",
      size = "lg",
      value,
      onChange,
      required,
      id,
      popoverDirection = "left",
      minDate,
      maxDate,
      disabled,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [pickerView, setPickerView] = useState<"calendar" | "month" | "year">(
      "calendar",
    );
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const min = minDate ? parseDate(minDate) : null;
    const max = maxDate ? parseDate(maxDate) : parseDate(formatDate(new Date()));

    // Initial view date (default to today or selected value, or maxDate if provided)
    const initialDate =
      parseDate(value || "") || (max && max < new Date() ? max : new Date());
    const [viewDate, setViewDate] = useState(
      new Date(initialDate.getFullYear(), initialDate.getMonth(), 1),
    );

    const isNextMonthDisabled = () => {
      if (!max) return false;
      const nextMonthFirstDay = new Date(
        viewDate.getFullYear(),
        viewDate.getMonth() + 1,
        1,
      );
      return nextMonthFirstDay > max;
    };

    const isPrevMonthDisabled = () => {
      if (!min) return false;
      const currentMonthFirstDay = new Date(
        viewDate.getFullYear(),
        viewDate.getMonth(),
        1,
      );
      return currentMonthFirstDay <= min;
    };

    const sizes = {
      sm: "px-4 h-[35px] text-[12px] rounded-lg font-semibold",
      md: "px-4 h-[40px] text-[12px] rounded-lg font-semibold",
      lg: "px-4 h-[45px] text-[12px] rounded-lg font-semibold",
      xl: "px-4 h-[50px] text-[12px] rounded-lg font-semibold",
    };

    // ─── Click Outside Logic ──────────────────────────────────────────────────

    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
          setPickerView("calendar");
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, []);

    // ─── Scroll to current year ──────────────────────────────────────────────

    useEffect(() => {
      if (pickerView === "year" && scrollRef.current) {
        const activeYear = scrollRef.current.querySelector(
          '[data-active="true"]',
        );
        if (activeYear) {
          activeYear.scrollIntoView({ block: "center", behavior: "smooth" });
        }
      }
    }, [pickerView]);

    // ─── Calendar Logic ───────────────────────────────────────────────────────

    const changeMonth = (offset: number) => {
      if (offset > 0 && isNextMonthDisabled()) return;
      if (offset < 0 && isPrevMonthDisabled()) return;
      setViewDate(
        new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1),
      );
    };

    const changeYear = (year: number) => {
      setViewDate(new Date(year, viewDate.getMonth(), 1));
      setPickerView("calendar");
    };

    const handleSelectMonth = (monthIdx: number) => {
      setViewDate(new Date(viewDate.getFullYear(), monthIdx, 1));
      setPickerView("calendar");
    };

    const isDateDisabled = (day: number) => {
      const date = new Date(currentYear, currentMonth, day);
      if (min && date < min) return true;
      if (max && date > max) return true;
      return false;
    };

    const handleSelectDate = (day: number) => {
      if (isDateDisabled(day)) return;

      const selected = new Date(
        viewDate.getFullYear(),
        viewDate.getMonth(),
        day,
      );
      onChange?.(formatDate(selected));
      setIsOpen(false);
    };

    const daysInMonth = (month: number, year: number) =>
      new Date(year, month + 1, 0).getDate();
    const startDayOfMonth = (month: number, year: number) =>
      new Date(year, month, 1).getDay();

    const currentMonth = viewDate.getMonth();
    const currentYear = viewDate.getFullYear();
    const totalDays = daysInMonth(currentMonth, currentYear);
    const startOffset = startDayOfMonth(currentMonth, currentYear);

    const days = [];
    for (let i = 0; i < startOffset; i++) days.push(null);
    for (let i = 1; i <= totalDays; i++) days.push(i);

    const isToday = (day: number) => {
      const today = new Date();
      return (
        today.getDate() === day &&
        today.getMonth() === currentMonth &&
        today.getFullYear() === currentYear
      );
    };

    const isSelected = (day: number) => {
      if (!value) return false;
      const selected = parseDate(value);
      if (!selected) return false;
      return (
        selected.getDate() === day &&
        selected.getMonth() === currentMonth &&
        selected.getFullYear() === currentYear
      );
    };

    // Generate years range
    const currentSystemYear = new Date().getFullYear();
    const maxYear = max ? max.getFullYear() : currentSystemYear;
    const minYear = min ? min.getFullYear() : 1901;
    const years = [];
    for (let y = maxYear; y >= minYear; y--) years.push(y);

    return (
      <div
        ref={containerRef}
        className={cn(
          "w-full relative space-y-1",
          containerClassName,
          disabled && "opacity-70",
        )}
      >
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "block font-bold text-slate-700",
              size === "sm" ? "text-xs" : "text-sm",
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div
          ref={ref}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            "w-full border border-slate-200 bg-white text-slate-900 flex items-center justify-between gap-2 cursor-pointer transition-all duration-300",
            "focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary focus-within:bg-white",
            sizes[size],
            error && "border-red-500",
            isOpen && "ring-2 ring-primary/20 border-primary bg-white",
            disabled &&
              "cursor-not-allowed bg-slate-50 text-slate-400 border-slate-200",
            "form-shadow",
            className,
          )}
        >
          <span className={cn(!value && "text-slate-400")}>
            {value || placeholder}
          </span>

          <CalendarIcon
            size={size === "sm" ? 14 : 16}
            className={cn(
              "text-slate-400 transition-colors duration-300",
              isOpen && "text-primary",
            )}
          />
        </div>

        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={cn(
                "absolute mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 z-50 overflow-hidden",
                popoverDirection === "right" ? "right-0" : "left-0",
              )}
              style={{ minWidth: "280px" }}
            >
              {/* Navigation Header */}
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => changeMonth(-1)}
                    disabled={isPrevMonthDisabled()}
                    className={cn(
                      "p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors",
                      isPrevMonthDisabled() && "opacity-20 cursor-not-allowed",
                    )}
                  >
                    <ChevronLeft size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setPickerView(
                        pickerView === "month" ? "calendar" : "month",
                      )
                    }
                    className={cn(
                      "px-2 py-1 rounded-lg text-sm font-black transition-colors",
                      pickerView === "month"
                        ? "bg-primary/10 text-primary"
                        : "text-slate-800 hover:bg-slate-100",
                    )}
                  >
                    {MONTHS[currentMonth]}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setPickerView(pickerView === "year" ? "calendar" : "year")
                    }
                    className={cn(
                      "px-2 py-1 rounded-lg text-sm font-black transition-colors",
                      pickerView === "year"
                        ? "bg-primary/10 text-primary"
                        : "text-slate-800 hover:bg-slate-100",
                    )}
                  >
                    {currentYear}
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => changeMonth(1)}
                    disabled={isNextMonthDisabled()}
                    className={cn(
                      "p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors",
                      isNextMonthDisabled() && "opacity-20 cursor-not-allowed",
                    )}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className="relative min-h-[190px]">
                <AnimatePresence mode="wait">
                  {pickerView === "calendar" && (
                    <motion.div
                      key="calendar"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="grid grid-cols-7 mb-2">
                        {WEEKDAYS.map((day) => (
                          <div
                            key={day}
                            className="text-center text-[10px] font-black text-slate-400 uppercase"
                          >
                            {day}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {days.map((day, idx) => (
                          <div
                            key={idx}
                            className="h-8 flex items-center justify-center"
                          >
                            {day !== null ? (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectDate(day);
                                }}
                                className={cn(
                                  "w-8 h-8 rounded-lg text-xs font-bold transition-all duration-200",
                                  isSelected(day)
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : isToday(day)
                                      ? "bg-primary/10 text-primary"
                                      : isDateDisabled(day)
                                        ? "text-slate-200 cursor-not-allowed"
                                        : "hover:bg-slate-50 text-slate-600 hover:text-primary",
                                )}
                              >
                                {day}
                              </button>
                            ) : (
                              <div className="w-8 h-8" />
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {pickerView === "month" && (
                    <motion.div
                      key="month"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="grid grid-cols-3 gap-2"
                    >
                      {MONTHS.map((month, idx) => {
                        const monthDate = new Date(currentYear, idx, 1);
                        const isDisabled =
                          (min &&
                            monthDate <
                              new Date(min.getFullYear(), min.getMonth(), 1)) ||
                          (max &&
                            monthDate >
                              new Date(max.getFullYear(), max.getMonth(), 1));

                        return (
                          <button
                            type="button"
                            key={month}
                            disabled={isDisabled}
                            onClick={() => !isDisabled && handleSelectMonth(idx)}
                            className={cn(
                              "py-3 rounded-xl text-xs font-bold transition-colors",
                              currentMonth === idx
                                ? "bg-primary text-white"
                                : isDisabled
                                  ? "text-slate-200 cursor-not-allowed"
                                  : "hover:bg-slate-100 text-slate-600",
                            )}
                          >
                            {month.substring(0, 3)}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}

                  {pickerView === "year" && (
                    <motion.div
                      key="year"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      ref={scrollRef}
                      className="grid grid-cols-4 gap-2 max-h-[190px] overflow-y-auto no-scrollbar py-2"
                    >
                      {years.map((year) => (
                        <button
                          type="button"
                          key={year}
                          data-active={currentYear === year}
                          onClick={() => changeYear(year)}
                          className={cn(
                            "py-2 rounded-xl text-xs font-bold transition-colors",
                            currentYear === year
                              ? "bg-primary text-white"
                              : "hover:bg-slate-100 text-slate-600",
                          )}
                        >
                          {year}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <p className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  },
);

DateInput.displayName = "DateInput";
