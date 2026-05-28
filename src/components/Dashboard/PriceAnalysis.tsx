import React, { useState, useEffect, useMemo } from "react";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";
import { Select } from "../Select";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { Loader2, Scale, IndianRupee } from "lucide-react";
import { fetchGraphData } from "../../features/dashboard/dashboardApi";

export const PriceAnalysis: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { graphData, graphLoading } = useSelector(
    (state: RootState) => state.dashboard,
  );
  const [timeFilter, setTimeFilter] = useState("3month");
  const [financialYear, setFinancialYear] = useState("2024");
  const [viewIn, setViewIn] = useState<"grams" | "rupees">("grams");

  const filterOptions = [
    { value: "3month", label: "Last 3 Months" },
    { value: "6month", label: "Last 6 Months" },
    { value: "financialyear", label: "Financial Year" },
  ];

  const [financialYearOptions, setFinancialYearOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const isAfterMarch =
      now.getMonth() > 2 || (now.getMonth() === 2 && now.getDate() > 1);
    const endYear = isAfterMarch ? currentYear : currentYear - 1;

    const years = [];
    for (let year = 2024; year <= endYear; year++) {
      years.push({ value: String(year), label: `${year}-${year + 1}` });
    }
    setFinancialYearOptions(years);
  }, []);

  const displayData = useMemo(() => {
    if (!graphData || graphData.length === 0) return [];
    if (timeFilter === "financialyear") return graphData;
    const months = timeFilter === "3month" ? 3 : 6;
    return graphData.slice(-months);
  }, [graphData, timeFilter]);

  useEffect(() => {
    let queryParam = "";
    if (timeFilter === "financialyear") {
      queryParam = `?financialYear=${financialYear}`;
    } else {
      queryParam = `?months=${timeFilter}`;
    }
    dispatch(fetchGraphData(queryParam));
  }, [dispatch, timeFilter, financialYear]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <span className="font-bold text-slate-800 shrink-0">
          Price Analysis
        </span>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {/* Toggle View */}
          <div className="flex p-1 bg-slate-100 rounded-lg w-full sm:w-fit">
            <button
              onClick={() => setViewIn("grams")}
              className={cn(
                "flex-1 sm:flex-none flex items-center justify-center gap-2 h-[33px] px-3 rounded-md text-xs font-bold transition-all cursor-pointer whitespace-nowrap",
                viewIn === "grams"
                  ? "bg-primary text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-700",
              )}
            >
              <Scale className="w-3 h-3" />
              Grams
            </button>
            <button
              onClick={() => setViewIn("rupees")}
              className={cn(
                "flex-1 sm:flex-none flex items-center justify-center gap-2 h-[33px] px-3 rounded-md text-xs font-bold transition-all cursor-pointer whitespace-nowrap",
                viewIn === "rupees"
                  ? "bg-primary text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-700",
              )}
            >
              <IndianRupee className="w-3 h-3" />
              Amount
            </button>
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto">
            <div className="flex-1 lg:w-44">
              <Select
                value={timeFilter}
                onChange={(val) => setTimeFilter(val)}
                options={filterOptions}
                size="md"
              />
            </div>
            {timeFilter === "financialyear" && (
              <div className="flex-1 lg:w-36">
                <Select
                  value={financialYear}
                  onChange={(val) => setFinancialYear(val)}
                  options={financialYearOptions}
                  size="md"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="h-64 w-full relative">
        {graphLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-[1px]">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        )}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={displayData}>
            <defs>
              <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSilver" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
              }}
            />
            {viewIn === "grams" ? (
              <>
                <Area
                  type="monotone"
                  dataKey="gold"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorGold)"
                  name="Gold (gms)"
                />
                <Area
                  type="monotone"
                  dataKey="silver"
                  stroke="#94a3b8"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSilver)"
                  name="Silver (gms)"
                />
              </>
            ) : (
              <>
                <Area
                  type="monotone"
                  dataKey="goldInRupees"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorGold)"
                  name="Gold (₹)"
                />
                <Area
                  type="monotone"
                  dataKey="silverInRupees"
                  stroke="#94a3b8"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSilver)"
                  name="Silver (₹)"
                />
              </>
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase  px-2 overflow-x-auto no-scrollbar gap-2">
        {displayData.length > 0 ? (
          displayData.map((item, index) => (
            <span key={index} className="shrink-0">
              {item.month.substring(0, 3)}
            </span>
          ))
        ) : (
          <span className="w-full text-center">
            No historical data available
          </span>
        )}
      </div>
    </motion.div>
  );
};
