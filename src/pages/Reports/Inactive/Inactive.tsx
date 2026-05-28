import React, { useEffect, useState } from "react";
import {
  User,
  Zap,
  BarChart3,
  Clock,
  Sparkles,
  Search,
  Copy,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../../../lib/utils";
import { Table, Column } from "../../../components/Table";
import { ReportFilter } from "../../../components/Dashboard/ReportFilter";
import { MetricCard } from "../../../components/Dashboard/MetricCard";
import toast from "react-hot-toast";
import { formatDate } from "@/src/utils/formatters";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store";
import { inactiveInvestorsRecord } from "@/src/features/reports/inactiveInvestors/inactiveInvestorsSlice";
import { fetchinactiveInvestorsReport } from "@/src/features/reports/inactiveInvestors/inactiveInvestorsApi";
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

const columns: Column<inactiveInvestorsRecord>[] = [
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
    header: "Date Of Birth",
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
    header: "A/C No.",
    sortable: true,
    filterable: true,

    cell: (row) => <span>{row.bank_account_no || "N/A"}</span>,
  },
  {
    key: "bank_account_name",
    header: "A/C Name",
    sortable: true,
    filterable: true,
    cell: (row) => <span>{row.bank_account_name || "N/A"}</span>,
  },
  {
    key: "ifsc_code",
    header: "IFSC Code",
    sortable: true,
    filterable: true,
    cell: (row) => <span>{row.ifsc_code || "N/A"}</span>,
  },
  {
    key: "uniqueId",
    header: "Unique Id",
    sortable: true,
    filterable: true,
    cell: (row) => <span>{row.uniqueId || "N/A"}</span>,
  },
  {
    key: "status",
    header: "Kyc Status",
    sortable: true,
    filterable: true,
    cell: (row) => <span>{row.status || "N/A"}</span>,
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

export const Inactive: React.FC = () => {
  const [investorName, setInvestorName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { transactions, totalAmount, loading } = useSelector(
    (state: RootState) => state.inactiveInvestors,
  );

  useEffect(() => {
    dispatch(fetchinactiveInvestorsReport({}));
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(
      fetchinactiveInvestorsReport({ investorName, startDate, endDate }),
    );
  };

  const handleReset = () => {
    setInvestorName("");
    setStartDate("");
    setEndDate("");
    dispatch(fetchinactiveInvestorsReport({}));
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
      <Table<inactiveInvestorsRecord>
        title="Inactive-Investor Records"
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
