import React from "react";
import { motion } from "motion/react";
import { Check, Star } from "lucide-react";
import { Button } from "./Button";

interface JewelleryFiltersProps {
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  selectedMetal: string;
  setSelectedMetal: (metal: string) => void;
  priceRange: number;
  setPriceRange: (price: number) => void;
  onReset: () => void;
}

export const JewelleryFilters: React.FC<JewelleryFiltersProps> = ({
  selectedCategories,
  toggleCategory,
  selectedMetal,
  setSelectedMetal,
  priceRange,
  setPriceRange,
  onReset,
}) => {
  const categories = [
    "Rings",
    "Necklaces",
    "Coins",
    "Bars",
    "Bracelets",
    "Earrings",
  ];
  const metals = [
    { name: "Gold", color: "#FFD700" },
    { name: "Silver", color: "#E5E4E2" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 items-start">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700 ">
            Price Range
          </label>
          <div className="px-2">
            <input
              type="range"
              min="500"
              max="200000"
              step="100"
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
              className="w-full h-2 bg-primary/10 rounded-full appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400 mt-2 ">
              <span>₹500</span>
              <span className="text-primary text-xs ">
                ₹{priceRange.toLocaleString()}
              </span>
              <span>₹2,00,000+</span>
            </div>
          </div>
        </div>
        {/* Category */}
        <div>
          <label className="block text-sm font-semibold mb-4 text-slate-700">
            Category
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category);

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl border border-slate-300 bg-white hover:border-slate-400 transition-all"
                >
                  {/* Checkbox */}
                  <div
                    className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-black border-black text-white"
                        : "border-slate-400 bg-white"
                    }`}
                  >
                    {isSelected && <Check size={14} />}
                  </div>

                  {/* Label */}
                  <span className="text-[11px] font-semibold text-slate-700">
                    {category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Metal Type */}
      <div>
        <label className="block text-sm font-semibold mb-4 text-slate-700 ">
          Metal Type
        </label>

        <div className="flex gap-3">
          {metals.map((metal) => {
            const isSelected = selectedMetal === metal.name;

            return (
              <button
                key={metal.name}
                type="button"
                onClick={() => setSelectedMetal(metal.name)}
                className="flex items-center gap-3 px-4 py-2 rounded-xl border border-slate-300 bg-white hover:border-slate-400 transition-all"
              >
                {/* Checkbox */}
                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-black border-black text-white"
                      : "border-slate-400 bg-white"
                  }`}
                >
                  {isSelected && <Check size={14} />}
                </div>

                {/* Label */}
                <span className="text-xs font-semibold text-slate-700">
                  {metal.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
