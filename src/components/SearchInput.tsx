import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "./Button";
import { cn } from "../lib/utils";

interface SearchInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  containerClassName?: string;
  isSearchOpen?: boolean;
  setIsSearchOpen?: (open: boolean) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value: controlledValue,
  onChange: controlledOnChange,
  onSearch,
  placeholder = "Search...",
  size = "md",
  className,
  containerClassName,
  isSearchOpen,
  setIsSearchOpen,
}) => {
  const [internalQuery, setInternalQuery] = useState("");
  const isControlled = typeof controlledValue !== "undefined";
  const query = isControlled ? controlledValue! : internalQuery;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isControlled) {
      controlledOnChange?.(e);
    } else {
      setInternalQuery(e.target.value);
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div
        className={cn(
          "relative flex items-center w-full max-w-md",
          containerClassName,
        )}
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 z-10" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={cn(
            "w-full bg-slate-100 border-none rounded-xl py-2 pl-10 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all",
            onSearch ? "pr-24" : "pr-4",
            className,
          )}
          placeholder={placeholder}
        />
        {onSearch && (
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
            <Button
              size={size === "xl" ? "lg" : size === "lg" ? "md" : "sm"}
              onClick={handleSearch}
              className="h-auto"
            >
              Search
            </Button>
          </div>
        )}
      </div>

      {setIsSearchOpen && typeof isSearchOpen !== "undefined" && (
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
        >
          <Search className="w-5 h-5" />
        </button>
      )}
    </>
  );
};
