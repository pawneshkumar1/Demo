import React, { useEffect, useState } from "react";
import {
  User,
  Zap,
  BarChart3,
  CheckCircle,
  Sparkles,
  Copy,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../../../lib/utils";
import { Table, Column } from "../../../components/Table";
import { ReportFilter } from "../../../components/Dashboard/ReportFilter";
import { MetricCard } from "../../../components/Dashboard/MetricCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store";
import { fetchsipBookedReport } from "@/src/features/reports/sipBooked/sipbookedApi";
import { sipBookedRecord } from "@/src/features/reports/sipBooked/sipbookedSlice";
import toast from "react-hot-toast";
import { formatCurrency, formatDate } from "@/src/utils/formatters";
import { formatDayOfMonth } from "@/src/utils/formatDayOfMonth";
import { CopyButton } from "@/src/components/common/CopyButton";
import { exportTableToCSV } from "@/src/components/common/ExportData";

const statusStyles: Record<string, { label: string; className: string }> = {
  Executed: {
    label: "ACTIVE",
    className: "bg-green-900 text-emerald-700",
  },
  Pending: {
    label: "PENDING",
    className: "bg-amber-100 text-amber-700",
  },
  Failed: {
    label: "CANCELLED",
    className: "bg-red-100 text-red-700",
  },
};

const getOrdinalSuffix = (num: number) => {
  if (isNaN(num)) return "";
  if (num % 10 === 1 && num % 100 !== 11) return `${num}st`;
  if (num % 10 === 2 && num % 100 !== 12) return `${num}nd`;
  if (num % 10 === 3 && num % 100 !== 13) return `${num}rd`;
  return `${num}th`;
};

const columns: Column<sipBookedRecord>[] = [
  {
    key: "client_id",
    header: "Investor Name",
    sortable: true,
    filterable: true,
    cell: (row) => <span>{row.client_id?.name || "N/A"}</span>,
  },
  {
    key: "refinery",
    header: "Refinery",
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
    key: "subscriptionId",
    header: "Subscription Id",
    sortable: true,
    filterable: true,
    cell: (row) => {
      return (
        <div className="flex items-center justify-center">
          <CopyButton text={row.subscriptionId} />
        </div>
      );
    },
  },
  {
    key: "subReferenceId",
    header: "Sub Ref ID",
    sortable: true,
    filterable: true,
    cell: (row) => {
      return (
        <div className="flex items-center justify-center">
          <CopyButton text={row.subReferenceId} />
        </div>
      );
    },
  },
  {
    key: "order_type",
    header: "Order Type",
    sortable: true,
    filterable: true,
    cell: (row) => {
      const value = row.order_type;

      if (!value) {
        return <span className="capitalize">order type</span>;
      }

      const formatted =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

      return <span className="capitalize">{formatted}</span>;
    },
  },
  {
    key: "amount",
    header: "Amount(₹)",
    sortable: true,
    filterable: true,
    cell: (row) => row.amount || "0.00",
  },
  {
    key: "frequency",
    header: "Frequency",
    sortable: true,
    filterable: true,
    cell: (row) => {
      const value = row.frequency;

      if (!value) {
        return <span className="capitalize">frequency</span>;
      }

      const formatted =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

      return <span className="capitalize">{formatted}</span>;
    },
  },
  {
    key: "day_of_month",
    header: "Day Of Month",
    sortable: true,
    filterable: true,
    cell: (row) => {
      const day = Number(row.day_of_month);
      if (!row.day_of_month || isNaN(day)) return <span>-</span>;
      return <span>{getOrdinalSuffix(day)} Day Of Month</span>;
    },
  },
  {
    key: "sip_status",
    header: "sip Status",
    sortable: true,
    filterable: true,
    cell: (row) => {
      const s = statusStyles[row.sip_status] || {
        label: row.sip_status.toUpperCase(),
        className: "bg-slate-100 text-slate-700",
      };
      return (
        <span className={cn("px-2.5 py-1  rounded-full", s.className)}>
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

export const SIPBooked: React.FC = () => {
  const [investorName, setInvestorName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { transactions, totalAmount, loading } = useSelector(
    (state: RootState) => state.sipBooked,
  );

  console.log(transactions, "transactions");
  console.log(totalAmount, "totalAmount");
  console.log(loading, "loading");

  useEffect(() => {
    dispatch(fetchsipBookedReport({}));
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(fetchsipBookedReport({ investorName, startDate, endDate }));
  };

  const handleReset = () => {
    setInvestorName("");
    setStartDate("");
    setEndDate("");
    dispatch(fetchsipBookedReport({}));
  };
  const handleExportsipBookedData = (dataToExport: any[], filename: string) => {
    if (!dataToExport.length) {
      alert("No data available to export");
      return;
    }

    const headers = [
      "Investor Name",
      "Refinery.",
      "Subscription Id",
      "Sub Reference Id",
      "Order Type",
      "Amount (₹)",
      "frequency",
      "day of month",
      "sip Status",
      "date",
    ];

    const csvRows = [
      headers.join(","),
      ...dataToExport.map((row) => {
        const investorNameValue = row.client_id?.name || row.investorName || "";
        const day = Number(row.day_of_month);
        const dayValue =
          row.day_of_month && !isNaN(day)
            ? `${getOrdinalSuffix(day)} Day Of Month`
            : "";

        return [
          investorNameValue,
          row.refinery || "",
          row.subscriptionId || "",
          row.subReferenceId || "",
          row.order_type || "",
          row.amount || "",
          row.frequency || "",
          dayValue,
          row.sip_status || "",
          row.createdAt ? formatDate(row.createdAt) : "",
        ]
          .map((field) => `"${String(field ?? "").replace(/"/g, '""')}"`)
          .join(",");
      }),
    ];

    const blob = new Blob([csvRows.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-violet-900 shadow-2xl shadow-violet-500/10"
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 ">
            <div className="w-12 h-12 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
              <CheckCircle size={24} className="text-violet-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase">
                Booking Report
              </span>
              <div className="flex items-baseline justify-between gap-4">
                <h1 className="text-xl font-semibold text-white ">
                  SIP Booked{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                    Report
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

      {/* ── Stats Row ────────────────────────────────────── */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          icon={CheckCircle}
          label="Booked Value"
          value="₹2,12,450.00"
          change="+14.2%"
          subtext="Total value of booked SIPs"
          iconBg="bg-violet-100 text-violet-600"
        />
        <MetricCard
          icon={BarChart3}
          label="Confirmed SIPs"
          value="156"
          change="+8.3%"
          subtext="Successfully finalized wealth plans"
          iconBg="bg-primary/10 text-primary"
        />
        <MetricCard
          icon={Zap}
          label="Booking Commission"
          value="₹5,230.00"
          change="+10.5%"
          subtext="Earnings from finalized bookings"
          iconBg="bg-amber-100 text-amber-600"
        />
      </div> */}

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
      <Table<sipBookedRecord>
        title="SIP Booked Records"
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
