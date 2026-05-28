import React from "react";
import { cn } from "../lib/utils";

interface StatusTabsProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
  className?: string;
}

export const StatusTabs: React.FC<StatusTabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
}) => {
  return (
    <div
      className={cn("flex p-1 bg-white rounded-lg w-full sm:w-fit", className)}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={cn(
            "flex-1 sm:flex-none sm:min-w-[120px] min-w-[80px] flex items-center justify-center gap-2 h-[35px] px-4 rounded-md text-[10px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap",
            activeTab === tab
              ? "bg-primary text-white shadow-sm"
              : "text-slate-600 hover:text-slate-700",
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
