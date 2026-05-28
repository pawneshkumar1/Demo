import React from "react";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

// Colors for the chart
const COLORS = {
  augmontGold: "#D4AF37",
  mmtcGold: "#CFA04F",
  augmontSilver: "#C0C0C0",
  mmtcSilver: "#94a3b8",
};

// Custom Tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white shadow-md border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold">
        <p className="text-slate-700">{data.name}</p>
        <p className="text-primary">{data.value}%</p>
      </div>
    );
  }
  return null;
};

export const AssetDistribution: React.FC = () => {
  const { totalInvestments } = useSelector(
    (state: RootState) => state.dashboard,
  );

  // Helper to parse percentage strings from backend (e.g., "30%")
  const parsePercent = (val: string | number | undefined) => {
    if (typeof val === "number") return val;
    if (!val) return 0;
    return parseFloat(String(val).replace("%", "")) || 0;
  };

  const data = [
    {
      name: "Augmont Gold",
      value: parsePercent(totalInvestments?.totalAugmontGoldPercentage),
      color: COLORS.augmontGold,
    },
    {
      name: "MMTC-PAMP Gold",
      value: parsePercent(totalInvestments?.totalMMTCGoldPercentage),
      color: COLORS.mmtcGold,
    },
    {
      name: "Augmont Silver",
      value: parsePercent(totalInvestments?.totalAugmontSilverPrecentage),
      color: COLORS.augmontSilver,
    },
    {
      name: "MMTC-PAMP Silver",
      value: parsePercent(totalInvestments?.totalMMTCSilverPrecentage),
      color: COLORS.mmtcSilver,
    },
  ].filter((item) => item.value > 0);

  // Fallback data if everything is zero (for demonstration/initial state)
  const chartData =
    data.length > 0
      ? data
      : [{ name: "No Data", value: 100, color: "#f1f5f9" }];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-[1rem] p-4 shadow-sm border border-slate-100 h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold flex items-center gap-2">
          Asset Distribution
        </h4>
      </div>

      <div className="relative h-56 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RePieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`outer-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </RePieChart>
        </ResponsiveContainer>

        {data.length === 0 && (
          <div className="absolute text-center">
            <p className="text-[10px] font-bold text-slate-400 ">No Assets</p>
          </div>
        )}
      </div>

      {/* Legends */}
      <div className="mt-4 space-y-4 flex-1">
        <div className="grid grid-cols-2 gap-4">
          {/* Gold */}
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-slate-900 px-1">
              Gold
            </p>
            {data
              .filter((item) => item.name.toLowerCase().includes("gold"))
              .map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-[10px] font-semibold"
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-slate-600 truncate max-w-[100px]">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-primary">{item.value}%</span>
                </div>
              ))}
            {data.filter((item) => item.name.toLowerCase().includes("gold"))
              .length === 0 && (
              <p className="text-[10px] text-slate-400 italic px-1">
                No gold assets
              </p>
            )}
          </div>

          {/* Silver */}
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-slate-900 px-1">
              Silver
            </p>
            {data
              .filter((item) => item.name.toLowerCase().includes("silver"))
              .map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-[10px] font-semibold"
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-slate-600 truncate max-w-[100px]">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-slate-600">{item.value}%</span>
                </div>
              ))}
            {data.filter((item) => item.name.toLowerCase().includes("silver"))
              .length === 0 && (
              <p className="text-[10px] text-slate-400 italic px-1">
                No silver assets
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
