import React from "react";
import { Search, RotateCcw } from "lucide-react";
import { Input } from "../Input";
import { Button } from "../Button";
import { DateInput } from "../Date";

interface ReportFilterProps {
  investorName: string;
  setInvestorName: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  handleSearch: () => void;
  handleReset: () => void;
}

export const ReportFilter: React.FC<ReportFilterProps> = ({
  investorName,
  setInvestorName,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleSearch,
  handleReset,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        {/* Investor Name */}
        <div className="space-y-1.5">
          <label className="text-[12px] font-semibold text-slate-600 ">
            Investor Name
          </label>
          <Input
            placeholder="Enter name"
            size="md"
            value={investorName}
            onChange={(e) => setInvestorName(e.target.value)}
          />
        </div>

        {/* Start Date */}
        <div className="space-y-1.5">
          <label className="text-[12px] font-semibold text-slate-600 ">
            Start Date
          </label>
          <DateInput
            size="md"
            value={startDate}
            onChange={(val) => setStartDate(val)}
          />
        </div>

        {/* End Date */}
        <div className="space-y-1.5">
          <label className="text-[12px] font-semibold text-slate-600 ">
            End Date
          </label>
          <DateInput
            size="md"
            value={endDate}
            onChange={(val) => setEndDate(val)}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            className="flex-1"
            size="md"
            icon={<Search size={15} />}
            onClick={handleSearch}
          >
            Search
          </Button>
          <Button
            className="flex-1 bg-slate-100 text-slate-600 hover:bg-slate-200 shadow-none border-none"
            size="md"
            variant="ghost"
            icon={<RotateCcw size={15} />}
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};
