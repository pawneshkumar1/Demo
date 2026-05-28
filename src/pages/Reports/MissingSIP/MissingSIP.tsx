import React, { useEffect, useState } from "react";
import {
  User,
  Zap,
  BarChart3,
  TrendingUp,
  Sparkles,
  Search,
  Copy,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../../../lib/utils";
import { Table, Column } from "../../../components/Table";
import { ReportFilter } from "../../../components/Dashboard/ReportFilter";
import { MetricCard } from "../../../components/Dashboard/MetricCard";
import { AppDispatch, RootState } from "@/src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "@/src/utils/formatters";
import toast from "react-hot-toast";
import { missingSipRecord } from "@/src/features/reports/missingSip/missingSipSlice";
import { fetchmissingSipReport } from "@/src/features/reports/missingSip/missingSipApi";
import { exportTableToCSV } from "@/src/components/common/ExportData";

// ─── Types & Data ─────────────────────────────────────────────────────────────
const statusStyles: Record<string, { label: string; className: string }> = {
  Executed: {
    label: "EXECUTED",
    className: "bg-emerald-100 text-emerald-700",
  },
  Pending: {
    label: "PENDING",
    className: "bg-amber-100 text-amber-700",
  },
  Failed: {
    label: "FAILED",
    className: "bg-red-100 text-red-700",
  },
};

// ─── Table columns ────────────────────────────────────────────────────────────

const columns: Column<missingSipRecord>[] = [
  {
    key: "Proposal_id",
    header: "Proposal Id",
    sortable: true,
    filterable: true,
    cell: (row) => {
      const handleCopy = () => {
        navigator.clipboard.writeText(row.invoice_No);
        toast.success("Copied to clipboard!");
      };
      return (
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded">
            {row.invoice_No}
          </span>
          <button
            onClick={handleCopy}
            className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-primary transition-colors"
            title="Copy Invoice No"
          >
            <Copy size={12} />
          </button>
        </div>
      );
    },
  },
  {
    key: "client_id",
    header: "Investor Id",
    sortable: true,
    filterable: true,
    cell: (row) => (
      <div className="flex items-center gap-3 justify-center text-center">
        <span className="text-sm font-semibold text-slate-700">
          {row.client_id?.name || "N/A"}
        </span>
      </div>
    ),
  },
  {
    key: "Investor_name",
    header: "Investor Name",
    sortable: true,
    filterable: true,
    cell: (row) => {
      const refinery = row.refinery ?? "Augmont";

      if (refinery.toLowerCase() === "mmtc-pamp") {
        return <span className="capitalize">MMTC-PAMP</span>;
      }

      return (
        <span className="capitalize">
          {refinery.charAt(0).toUpperCase() + refinery.slice(1).toLowerCase()}
        </span>
      );
    },
  },
  {
    key: "Proposal_no",
    header: "Proposal No.",
    sortable: true,
    filterable: true,
    cell: (row) => {
      return row.commission ? parseFloat(row.commission).toFixed(2) : "0.00";
    },
  },
  {
    key: "day of month",
    header: "Day Of Month",
    sortable: true,
    filterable: true,
    cell: (row) => {
      const handleCopy = () => {
        navigator.clipboard.writeText(row.merchant_transaction_id);
        toast.success("Copied to clipboard!");
      };
      return (
        <div className="flex items-center justify-center">
          <button
            onClick={handleCopy}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-primary transition-colors"
            title={row.merchant_transaction_id}
          >
            <Copy size={14} />
          </button>
        </div>
      );
    },
  },
  {
    key: "metal type",
    header: "Metal Type",
    sortable: true,
    filterable: true,
    cell: (row) => row.amount || "0.00",
  },
  {
    key: "amount",
    header: "Amount(₹)",
    sortable: true,
    filterable: true,
    cell: (row) => row.amount || "0.00",
  },

  {
    key: "quantity",
    header: "Quantity(g)",
    sortable: true,
    filterable: true,
    cell: (row) => {
      const handleCopy = () => {
        if (row.payment_id) {
          navigator.clipboard.writeText(row.payment_id);
          toast.success("Copied to clipboard!");
        }
      };
      return (
        <div className="flex items-center justify-center gap-2">
          {row.payment_id && (
            <button
              onClick={handleCopy}
              className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-primary transition-colors"
              title="Copy Payment ID"
            >
              <Copy size={12} />
            </button>
          )}
          <span>{row.payment_id || "N/A"}</span>
        </div>
      );
    },
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    filterable: true,
    cell: (row) => {
      const s = statusStyles[row.status] || {
        label: row.status.toUpperCase(),
        className: "bg-slate-100 text-slate-700",
      };
      return (
        <span
          className={cn(
            "px-2.5 py-1 text-[10px] font-black uppercase  rounded-full",
            s.className,
          )}
        >
          {s.label}
        </span>
      );
    },
  },

  {
    key: "sip_status",
    header: "Sip Status",
    sortable: true,
    filterable: true,
    cell: (row) => {
      const s = statusStyles[row.status] || {
        label: row.status.toUpperCase(),
        className: "bg-slate-100 text-slate-700",
      };
      return (
        <span
          className={cn(
            "px-2.5 py-1 text-[10px] font-black uppercase  rounded-full",
            s.className,
          )}
        >
          {s.label}
        </span>
      );
    },
  },
  {
    key: "frequency",
    header: "Frequency",
    sortable: true,
    filterable: true,
    cell: (row) => {
      const s = statusStyles[row.status] || {
        label: row.status.toUpperCase(),
        className: "bg-slate-100 text-slate-700",
      };
      return (
        <span
          className={cn(
            "px-2.5 py-1 text-[10px] font-black uppercase  rounded-full",
            s.className,
          )}
        >
          {s.label}
        </span>
      );
    },
  },
  {
    key: "createdAt",
    header: "Date",
    sortable: true,
    filterable: true,
    cell: (row) => formatDate(row.createdAt),
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export const MissingSIP: React.FC = () => {
  const [investorName, setInvestorName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { transactions, totalAmount, loading } = useSelector(
    (state: RootState) => state.missingSip,
  );

  console.log(transactions, "transactions");
  console.log(totalAmount, "totalAmount");
  console.log(loading, "loading");

  useEffect(() => {
    dispatch(fetchmissingSipReport({}));
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(fetchmissingSipReport({ investorName, startDate, endDate }));
  };

  const handleReset = () => {
    setInvestorName("");
    setStartDate("");
    setEndDate("");
    dispatch(fetchmissingSipReport({}));
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 mx-auto w-full space-y-4"
    >
      {/* ── Filters ──────────────────────────────────────── */}
      <ReportFilter
        investorName={investorName}
        setInvestorName={setInvestorName}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        handleSearch={handleSearch}
        handleReset={handleReset}
      />

      {/* ── Table ────────────────────────────────────────── */}
      <Table<missingSipRecord>
        title="Missing SIP Records"
        data={transactions}
        columns={columns}
        entriesPerPage={10}
        selectable
        onExportAll={(data) =>
          exportTableToCSV(data, columns, "top_investors_all.csv")
        }
        onExportSelected={(data) =>
          exportTableToCSV(data, columns, "top_investors_selected.csv")
        }
      />
    </motion.div>
  );
};
