import React, { useEffect, useState } from "react";
import {
  User,
  Zap,
  BarChart3,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Copy,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../../../lib/utils";
import { Table, Column } from "../../../components/Table";
import { ReportFilter } from "../../../components/Dashboard/ReportFilter";
import { MetricCard } from "../../../components/Dashboard/MetricCard";
import { formatDate } from "@/src/utils/formatters";
import toast from "react-hot-toast";
import { fetchcomplianceRecordsReport } from "@/src/features/reports/complianceRecords/complianceRecordsApi";
import { AppDispatch, RootState } from "@/src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { complianceRecord } from "@/src/features/reports/complianceRecords/complianceRecordsSlice";
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

// ─── Table columns ────────────────────────────────────────────────────────────

const columns: Column<complianceRecord>[] = [
  {
    key: "_id",
    header: "Investor Id",
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
    key: "name",
    header: "Investor Name",
    sortable: true,
    filterable: true,
    cell: (row) => <span>{row.name || "N/A"}</span>,
  },
  {
    key: "Email",
    header: "Email",
    sortable: true,
    filterable: true,
    cell: (row) => <span>{row.Email || "N/A"}</span>,
  },
  {
    key: "mobileNo",
    header: "Mobile No.",
    sortable: true,
    filterable: true,
    cell: (row) => <span>{row.mobileNo || "N/A"}</span>,
  },
  {
    key: "PanNumber",
    header: "Pan No.",
    sortable: true,
    filterable: true,
    cell: (row) => <span>{row.PanNumber || "N/A"}</span>,
  },
  {
    key: "dob",
    header: "Date of Birth",
    sortable: true,
    filterable: true,
    cell: (row) => <span>{row.dob || "N/A"}</span>,
  },
  {
    key: "address_line_1",
    header: "Address Line 1",
    sortable: true,
    filterable: true,
    cell: (row) => <span>{row.address_line_1 || "N/A"}</span>,
  },
  {
    key: "address_line_2",
    header: "Address Line 2",
    sortable: true,
    filterable: true,
    cell: (row) => <span>{row.address_line_2 || "N/A"}</span>,
  },
  {
    key: "city",
    header: "City",
    sortable: true,
    filterable: true,
    cell: (row) => <span>{row.city || "N/A"}</span>,
  },
  {
    key: "state",
    header: "State",
    sortable: true,
    filterable: true,
    cell: (row) => <span>{row.state || "N/A"}</span>,
  },
  {
    key: "zip",
    header: "Pin Code",
    sortable: true,
    filterable: true,
    cell: (row) => <span>{row.zip || "N/A"}</span>,
  },
  {
    key: "bank_account_no",
    header: "Bank Account No.",
    sortable: true,
    filterable: true,

    cell: (row) => <span>{row.bank_account_no || "N/A"}</span>,
  },
  {
    key: "status",
    header: "Kyc Status",
    sortable: true,
    filterable: true,
    cell: (row) => <span>{row.status || "N/A"}</span>,
  },
  {
    key: "user",
    header: "User",
    sortable: true,
    filterable: true,
    cell: (row) => <span>{row.user || "N/A"}</span>,
  },
  {
    key: "pan",
    header: "Pan",
    sortable: true,
    filterable: true,
    cell: (row) => <span>{row.pan || "N/A"}</span>,
  },
  {
    key: "address",
    header: "Address",
    sortable: true,
    filterable: true,
    cell: (row) => <span>{row.address || "N/A"}</span>,
  },
  {
    key: "bank",
    header: "Bank",
    sortable: true,
    filterable: true,
    cell: (row) => <span>{row.bank || "N/A"}</span>,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export const Compliance: React.FC = () => {
  const [investorName, setInvestorName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { transactions, totalAmount, loading } = useSelector(
    (state: RootState) => state.complianceRecords,
  );

  console.log(transactions, "compilancetransactions");
  console.log(totalAmount, "totalAmount");
  console.log(loading, "loading");

  useEffect(() => {
    dispatch(fetchcomplianceRecordsReport({}));
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(
      fetchcomplianceRecordsReport({ investorName, startDate, endDate }),
    );
  };

  const handleReset = () => {
    setInvestorName("");
    setStartDate("");
    setEndDate("");
    dispatch(fetchcomplianceRecordsReport({}));
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
      <Table<complianceRecord>
        title="Compliance Records"
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
