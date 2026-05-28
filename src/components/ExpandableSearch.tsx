import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "./Input";
import { TooltipButton } from "./TooltipButton";
import { cn } from "../lib/utils";

interface ExpandableSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  containerClassName?: string;
  initialOpen?: boolean;
}

export const ExpandableSearch: React.FC<ExpandableSearchProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = "Search...",
  className,
  inputClassName,
  containerClassName,
  initialOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch?.(value);
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {isOpen && (
        <Input
          size="sm"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className={cn(
            "bg-slate-50 border-slate-100 focus:bg-white",
            inputClassName,
          )}
        />
      )}
      <TooltipButton
        tooltip={isOpen ? "Close search" : "Open search"}
        variant={isOpen ? "secondary" : "primary"}
        size="sm"
        onClick={handleToggle}
        className="w-10 p-0"
        icon={isOpen ? <X size={14} /> : <Search size={14} />}
        shimmer={false}
      />
    </div>
  );
};
