import React, { useState, useEffect } from "react";
import { Zap, Sparkles, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../../../lib/utils";
import { Table, Column } from "../../../components/Table";
import { ReportFilter } from "../../../components/Dashboard/ReportFilter";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { fetchLumpsumReport } from "../../../features/reports/lumpsum/lumpsumApi";
import { LumpsumRecord } from "../../../features/reports/lumpsum/lumpsumSlice";
import { formatCurrency, formatDate } from "../../../utils/formatters";
import { CopyButton } from "@/src/components/common/CopyButton";
import { exportTableToCSV } from "@/src/components/common/ExportData";

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

// ─── Component ────────────────────────────────────────────────────────────────

export const Lumpsum: React.FC = () => {
  const [investorName, setInvestorName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { transactions, totalAmount, loading } = useSelector(
    (state: RootState) => state.lumpsum,
  );

  console.log(transactions, "transactions");
  console.log(totalAmount, "totalAmount");
  console.log(loading, "loading");

  useEffect(() => {
    dispatch(fetchLumpsumReport({}));
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(fetchLumpsumReport({ investorName, startDate, endDate }));
  };

  const handleReset = () => {
    setInvestorName("");
    setStartDate("");
    setEndDate("");
    dispatch(fetchLumpsumReport({}));
  };

  const handleExportLumpsumData = (
    dataToExport: LumpsumRecord[],
    filename: string,
  ) => {
    if (!dataToExport.length) {
      alert("No data available to export");
      return;
    }

    const headers = [
      "Invoice No.",
      "Investor Name",
      "Refinery",
      "Merchant Txn ID",
      "Amount (₹)",
      "Commission (₹)",
      "Payment ID",
      "Status",
      "Date",
    ];

    const csvRows = [
      headers.join(","),
      ...dataToExport.map((row) => {
        const investorName = row.client_id?.name || "";
        const refinery = row.refinery || "";

        return [
          row.invoice_No || "",
          investorName,
          refinery,
          row.merchant_transaction_id || "",
          row.amount || "0.00",
          row.commission ? parseFloat(row.commission).toFixed(2) : "0.00",
          row.payment_id || "",
          row.status || "",
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

  // ─── Table columns ────────────────────────────────────────────────────────────

  const columns: Column<LumpsumRecord>[] = [
    {
      key: "invoice_No",
      header: "Invoice No.",
      sortable: true,
      filterable: true,
      cell: (row) => {
        return (
          <div className="flex items-center  ">
            <CopyButton text={row.invoice_No} showText />
          </div>
        );
      },
    },
    {
      key: "client_id",
      header: "Investor Name",
      sortable: true,
      filterable: true,
      cell: (row) => (
        <div className="flex items-center gap-3 justify-center text-center">
          <span>{row.client_id?.name || "N/A"}</span>
        </div>
      ),
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
      key: "merchant_transaction_id",
      header: "Merchant Txn Id",
      sortable: true,
      filterable: true,
      cell: (row) => {
        return (
          <div className="flex items-center justify-center">
            <CopyButton text={row.merchant_transaction_id} />
          </div>
        );
      },
    },
    {
      key: "amount",
      header: "Amount(₹)",
      cell: (row) => row.amount || "0.00",
    },
    {
      key: "commission",
      header: "Commission(₹)",
      sortable: true,
      filterable: true,
      cell: (row) => {
        return row.commission ? parseFloat(row.commission).toFixed(2) : "0.00";
      },
    },
    {
      key: "payment_id",
      header: "Payment Id",
      sortable: true,
      filterable: true,
      cell: (row) => {
        return (
          <div className="flex items-center space-x-1">
            <CopyButton text={row.payment_id} showText />
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
      key: "createdAt",
      header: "Date",
      sortable: true,
      filterable: true,
      cell: (row) => formatDate(row.createdAt),
    },
  ];
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
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 shadow-2xl shadow-indigo-500/10"
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 ">
            <div className="w-12 h-12 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles size={24} className="text-emerald-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase">
                Transaction Report
              </span>
              <div className="flex items-baseline justify-between gap-4">
                <h1 className="text-xl font-semibold text-white ">
                  Lumpsum{" "}
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
          icon={Zap}
          label="Total Lumpsum"
          value="₹1,24,500.00"
          change="+15.5%"
          subtext="Overall lumpsum investments"
          iconBg="bg-primary/10 text-primary"
        />
        <MetricCard
          icon={TrendingUp}
          label="Success Rate"
          value="98.2%"
          change="+1.2%"
          subtext="Successful transaction percentage"
          iconBg="bg-emerald-100 text-emerald-600"
        />
        <MetricCard
          icon={BarChart3}
          label="Total Commission"
          value="₹3,450.00"
          change="+5.3%"
          subtext="Earnings from lumpsum orders"
          iconBg="bg-indigo-100 text-indigo-600"
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
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-3xl">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        )}
        <Table<LumpsumRecord>
          title="Lumpsum Transactions"
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
      </div>
    </motion.div>
  );
};
