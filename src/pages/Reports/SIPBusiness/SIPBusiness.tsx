import React, { useEffect, useState } from "react";
import { Zap, Briefcase } from "lucide-react";
import { motion } from "motion/react";
import { Table, Column } from "../../../components/Table";
import { ReportFilter } from "../../../components/Dashboard/ReportFilter";
import toast from "react-hot-toast";
import { formatCurrency, formatDate } from "@/src/utils/formatters";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store";
import { SipBusinessRecord } from "@/src/features/reports/sipBusiness/sipBusinessSlice";
import { fetchSipBusinessReport } from "@/src/features/reports/sipBusiness/sipBusinessApi";
import { truncateMessage } from "@/src/utils/truncateWords";
import { CopyButton } from "@/src/components/common/CopyButton";
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

const columns: Column<SipBusinessRecord>[] = [
  {
    key: "_id",
    header: "Buy Id",
    sortable: true,
    filterable: true,
    cell: (row) => {
      const handleCopy = () => {
        navigator.clipboard.writeText(row._id);
        toast.success("Copied to clipboard!");
      };
      return (
        <div className="flex items-center justify-center gap-2">
          <CopyButton text={row._id} />
        </div>
      );
    },
  },
  {
    key: "userName",
    header: "Investor Name",
    sortable: true,
    filterable: true,
    cell: (row) => (
      <div className="flex items-center gap-3 justify-center text-center">
        <span>{row.result.data.userName || "N/A"}</span>
      </div>
    ),
  },
  {
    key: "payment_id",
    header: "Payment Id",
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
          <CopyButton text={row.payment_id} showText />
        </div>
      );
    },
  },
  {
    key: "_id",
    header: "Order Id",
    sortable: true,
    filterable: true,
    cell: (row) => {
      return (
        <div className="flex items-center justify-center gap-2">
          <CopyButton text={row._id} />
        </div>
      );
    },
  },
  {
    key: "message",
    header: "Message",
    sortable: true,
    filterable: true,
    cell: (row) => {
      const refinery = truncateMessage(row.message) ?? "N/A";
      return (
        <span className="capitalize">
          {refinery.charAt(0).toUpperCase() + refinery.slice(1).toLowerCase()}
        </span>
      );
    },
  },
  {
    key: "quantity",
    header: "Quantity(g)",
    sortable: true,
    filterable: true,
    cell: (row) => {
      const refinery = row?.result?.data?.quantity || "N/A";
      return (
        <span className="capitalize">
          {refinery.charAt(0).toUpperCase() + refinery.slice(1).toLowerCase()}
        </span>
      );
    },
  },
  {
    key: "totalAmount",
    header: "Total Amount(₹)",
    sortable: true,
    filterable: true,
    cell: (row) => row.result.data.totalAmount || "0.00",
  },
  {
    key: "metalType",
    header: "Metal Type",
    cell: (row) => {
      const metalRaw = row.result.data.metalType || "";
      const metalType =
        metalRaw.charAt(0).toUpperCase() + metalRaw.slice(1).toLowerCase();

      let backgroundColor = "";
      if (metalType.toLowerCase() === "gold") backgroundColor = "#FFD700";
      else if (metalType.toLowerCase() === "silver")
        backgroundColor = "#E0E0E0";

      return (
        <span
          className="px-3 py-1 rounded-full text-xs font-medium text-black capitalize"
          style={{ backgroundColor }}
        >
          {metalType}
        </span>
      );
    },
  },
  {
    key: "rate",
    header: "Rate(₹)",
    sortable: true,
    filterable: true,
    cell: (row) => row.result.data.rate || "0.00",
  },
  {
    key: "transactionId",
    header: "Transaction Id",
    sortable: true,
    filterable: true,
    cell: (row) => {
      return (
        <div className="flex items-center justify-center gap-2">
          <CopyButton text={row.result.data.transactionId} />
        </div>
      );
    },
  },
  {
    key: "invoiceNumber",
    header: "Invoice No.",
    sortable: true,
    filterable: true,
    cell: (row) => {
      return (
        <div className="flex items-center justify-center gap-2">
          <CopyButton text={row.result.data.invoiceNumber} showText />
        </div>
      );
    },
  },
  {
    key: "goldBalance",
    header: "Gold Balance(g)",
    sortable: true,
    filterable: true,
    cell: (row) => row.result.data.goldBalance || "0.00",
  },
  {
    key: "silverBalance",
    header: "Silver Balance(g)",
    sortable: true,
    filterable: true,
    cell: (row) => row.result.data.silverBalance || "0.00",
  },
  {
    key: "merchantTransactionId",
    header: "Merchant Txn Id",
    sortable: true,
    filterable: true,
    cell: (row) => {
      return (
        <div className="flex items-center justify-center">
          <CopyButton text={row.result.data.merchantTransactionId} />
        </div>
      );
    },
  },
  {
    key: "uniqueId",
    header: "Unique Id",
    sortable: true,
    filterable: true,
    cell: (row) => row.result.data.uniqueId || "0.00",
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

export const SIPBusiness: React.FC = () => {
  const [investorName, setInvestorName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { transactions, totalAmount, loading } = useSelector(
    (state: RootState) => state.sipBusiness,
  );
  console.log(transactions, "_idhvhbnmvbhnmbhnm");

  console.log(transactions, "transactions");
  console.log(totalAmount, "totalAmount");
  console.log(loading, "loading");

  useEffect(() => {
    dispatch(fetchSipBusinessReport({}));
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(fetchSipBusinessReport({ investorName, startDate, endDate }));
  };

  const handleReset = () => {
    setInvestorName("");
    setStartDate("");
    setEndDate("");
    dispatch(fetchSipBusinessReport({}));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 mx-auto w-full space-y-4"
    >
      {/* ── Premium Header ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 shadow-2xl shadow-blue-500/10"
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 ">
            <div className="w-12 h-12 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
              <Briefcase size={24} className="text-emerald-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase">
                Business Insights
              </span>
              <div className="flex items-baseline justify-between gap-4">
                <h1 className="text-xl font-semibold text-white ">
                  SIP Business{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                    Growth Report
                  </span>
                </h1>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl border border-white/10 p-2 rounded-2xl flex items-center gap-5 min-w-[280px]">
            <div className="w-12 h-12 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
              <Zap size={24} />
            </div>
            <div>
              <span className="text-xs font-semibold text-yellow-500 uppercase">
                Total Transaction
              </span>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-md font-semibold text-white">
                  {formatCurrency(Number(totalAmount))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

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
      <Table<SipBusinessRecord>
        title="SIP Business Records"
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
