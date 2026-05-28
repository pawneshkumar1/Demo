import React, { useState, useEffect } from "react";
import {
  User,
  Zap,
  BarChart3,
  TrendingUp,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { cn } from "../../../lib/utils";
import { Table, Column } from "../../../components/Table";
import { ReportFilter } from "../../../components/Dashboard/ReportFilter";
import { StatusTabs } from "../../../components/StatusTabs";
import { MetricCard } from "../../../components/Dashboard/MetricCard";
import { fetchSipMiningReport } from "@/src/features/reports/sipMining/sipMiningApi";
import { formatDate } from "@/src/utils/formatters";
import { CopyButton } from "@/src/components/common/CopyButton";
import { exportTableToCSV } from "@/src/components/common/ExportData";

// ─── Component ────────────────────────────────────────────────────────────────

export const SIPMining: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [investorName, setInvestorName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activeStatus, setActiveStatus] = useState("Initialized");

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { sipMiningList, loading } = useSelector(
    (state: RootState) => state.reports,
  );

  const getStatusQuery = (tab: string) => {
    if (tab === "Mobile Sip") return "SIP MOBILE";

    if (tab.toUpperCase() === "INITIALIZED") {
      return "Initialized";
    }

    return tab.toUpperCase();
  };

  const fetchReports = () => {
    const params = {
      name: investorName,
      startDate,
      endDate,
      status: getStatusQuery(activeStatus),
    };
    console.log("Fetching with params:", params);
    dispatch(fetchSipMiningReport(params));
  };

  useEffect(() => {
    fetchReports();
  }, [activeStatus, dispatch]);

  const handleSearch = () => {
    fetchReports();
  };

  const handleReset = () => {
    setInvestorName("");
    setStartDate("");
    setEndDate("");
    const params = {
      name: "",
      startDate: "",
      endDate: "",
      status: getStatusQuery(activeStatus),
    };
    dispatch(fetchSipMiningReport(params));
  };

  const handleCopyLink = (proposal_no: string, _id: string) => {
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/partnerPortal/sip/proposal/link/${proposal_no}`;
    navigator.clipboard.writeText(link);
    setCopiedId(_id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportSipMiningData = (dataToExport: any[], filename: string) => {
    if (!dataToExport.length) {
      alert("No data available to export");
      return;
    }

    const headers = [
      "Proposal ID",
      "Investor Name",
      "Proposal No.",
      "Metal Type",
      "Amount (₹)",
      "Day Of Month",
      "Quantity (g)",
      "Price (₹)",
      "Status",
      "Date",
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
          row._id || "",
          investorNameValue,
          row.proposal_no || "",
          row.metal_type ? String(row.metal_type).toUpperCase() : "",
          row.amount ?? "",
          dayValue,
          row.quantity ?? "",
          row.Price ?? "",
          row.status ?? "",
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

  const statusGroup1 = ["Initialized", "Active", "Cancelled"];
  const statusGroup2 = ["Link Expired", "Bank APV Pending", "Mobile Sip"];

  const getOrdinalSuffix = (num: number) => {
    if (isNaN(num)) return "";
    if (num % 10 === 1 && num % 100 !== 11) return `${num}st`;
    if (num % 10 === 2 && num % 100 !== 12) return `${num}nd`;
    if (num % 10 === 3 && num % 100 !== 13) return `${num}rd`;
    return `${num}th`;
  };

  const mobileSipColumns: Column<any>[] = [
    {
      key: "subReferenceId",
      header: "Reference Id",
      cell: (row) => (
        <div className="flex justify-center">
          <CopyButton text={row.subReferenceId || row._id} />
        </div>
      ),
    },
    {
      key: "userName",
      header: "Username",
      cell: (row) => row.userName || "N/A",
    },
    {
      key: "metal_type",
      header: "Metal Type",
      cell: (row) => {
        const metalRaw = row.metal_type || "";
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
      key: "amount",
      header: "Amount (₹)",
      cell: (row) => row.amount || "N/A",
    },
    {
      key: "day_of_month",
      header: "Day Of Month",
      cell: (row) => {
        const day = Number(row.day_of_month);
        if (!row.day_of_month || isNaN(day)) return "N/A";
        return `${getOrdinalSuffix(day)} Day Of Month`;
      },
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => row.status || "N/A",
    },
    {
      key: "createdAt",
      header: "Date",
      cell: (row) => formatDate(row.createdAt),
    },
    {
      key: "updatedAt",
      header: "Updated At",
      cell: (row) => formatDate(row.updatedAt),
    },
  ];

  const standardColumns: Column<any>[] = [
    {
      key: "_id",
      header: "Proposal ID",
      sortable: true,
      filterable: true,
      cell: (row) => (
        <div className="flex justify-center">
          <CopyButton text={row._id} />
        </div>
      ),
    },
    {
      key: "clientName",
      header: "Investor Name",
      sortable: true,
      filterable: true,
      cell: (row) => {
        const name = row.client_id?.name || row.investorName || "N/A";
        return (
          <div className="flex items-center gap-2">
            <CopyButton text={name} showText />
          </div>
        );
      },
    },
    {
      key: "proposal_no",
      header: "Proposal No.",
      sortable: true,
      filterable: true,
      cell: (row) => <span>{row.proposal_no || "-"}</span>,
    },
    {
      key: "metal_type",
      header: "Metal Type",
      sortable: true,
      filterable: true,
      cell: (row) => {
        const metal = (row.metal_type || "GOLD").toUpperCase();
        return (
          <span className="bg-[#FFD700] px-3 py-1 rounded-full capitalize">
            {metal.toLowerCase()}
          </span>
        );
      },
    },
    {
      key: "amount",
      header: "Amount(₹)",
      sortable: true,
      filterable: true,
      cell: (row) => <span>{row.amount || "0"}</span>,
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
      key: "quantity",
      header: "Quantity(g)",
      sortable: true,
      filterable: true,
      cell: (row) => <span>{row.quantity || "-"}</span>,
    },
    {
      key: "Price",
      header: "Price(₹)",
      sortable: true,
      filterable: true,
      cell: (row) => <span>{row.Price || "-"}</span>,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      filterable: true,
      cell: (row) => <span>{row.status || "-"}</span>,
    },

    {
      key: "createdAt",
      header: "Date",
      sortable: true,
      filterable: true,
      cell: (row) => formatDate(row.createdAt),
    },
  ];

  const columns =
    activeStatus === "Mobile Sip" ? mobileSipColumns : standardColumns;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 mx-auto w-full space-y-4"
    >
      {/* ── Filters & Tabs ───────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-3">
          <StatusTabs
            tabs={statusGroup1}
            activeTab={activeStatus}
            onChange={setActiveStatus}
          />
          <StatusTabs
            tabs={statusGroup2}
            activeTab={activeStatus}
            onChange={setActiveStatus}
          />
        </div>

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
      </div>

      {/* ── Table ────────────────────────────────────────── */}
      <Table<any>
        title={`${activeStatus} Transactions`}
        data={sipMiningList}
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
