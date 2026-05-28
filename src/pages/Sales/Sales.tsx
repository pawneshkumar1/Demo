import React, { useState, useEffect } from "react";
import { Weight, IndianRupee, Wallet } from "lucide-react";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";
import { Table, Column } from "../../components/Table";
import { Select } from "../../components/Select";
import { CustomDate } from "../../components/CustomDate";
import { useDispatch, useSelector } from "react-redux";
import { fetchsalesReport } from "../../features/sales/salesApi";
import { RootState, AppDispatch } from "../../redux/store";
import { formatDate, formatNumber } from "@/src/utils/formatters";
import { salesRecord } from "@/src/features/sales/salesSlice";
import { SummaryCard } from "@/src/components/Dashboard/SummaryCard";
import { exportTableToCSV } from "@/src/components/common/ExportData";

const dateFilterOptions = [
  { value: "30d", label: "Last 30 Days" },
  { value: "ytd", label: "Custom Date" },
];

const columns: Column<salesRecord>[] = [
  {
    key: "client_id",
    sortable: true,
    filterable: true,
    header: "Investor Name",
    cell: (row) => {
      const value = row.client_id?.name || "N/A";
      const formatted =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

      return <span>{formatted}</span>;
    },
  },
  {
    key: "metal_type",
    sortable: true,
    filterable: true,
    header: "Metal Type",
    cell: (item) => {
      const metalType = (item.metal_type || item.metal_type || "N/A")
        .toString()
        .toUpperCase();

      const backgroundColor = metalType === "GOLD" ? "#FFD700" : "#E0E0E0";

      return (
        <span
          className="px-3 py-1 rounded-xl text-[12px] text-slate-600 capitalize inline-block"
          style={{ backgroundColor }}
        >
          {metalType.toLowerCase()}
        </span>
      );
    },
  },
  {
    key: "Refinery",
    sortable: true,
    filterable: true,
    header: "Refinery",
    cell: (row) => {
      const value = row.refinery || "N/A";
      const formatted =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

      return <span>{formatted}</span>;
    },
  },
  {
    key: "preTaxAmount",
    sortable: true,
    filterable: true,
    header: "Pre-Tax Amount(₹)",
    cell: (row) => <span>₹{row.preTaxAmount}</span>,
  },
  {
    key: "tax_amount",
    sortable: true,
    filterable: true,
    header: "tax amount(₹)",
    cell: (row) => {
      const value = row.gst || "N/A";
      const formatted =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

      return <span>₹{formatted}</span>;
    },
  },
  {
    key: "total_amount",
    sortable: true,
    filterable: true,
    header: "Total Amount(₹)",
    cell: (row) => {
      const value = row.total_amount || "N/A";
      const formatted =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

      return <span>₹{formatted}</span>;
    },
  },
  {
    key: "createdAt",
    sortable: true,
    filterable: true,
    header: "Date",
    cell: (row) => formatDate(row.createdAt),
  },
];

export const Sales: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    transactions,
    totalAumAmount,
    totalGoldAmount,
    totalSilverAmount,
    totalAugmontGoldAmount,
    totalAugmontSilverAmount,
    totalMMTCGoldAmount,
    totalMMTCSilverAmount,
    totalAugmontGoldSilverAmount,
    totalMMTCGoldSilverAmount,
    loading,
    error,
  } = useSelector((state: RootState) => state.sales);

  console.log("Sales state:", {
    transactions,
    totalAumAmount,
    totalGoldAmount,
    totalSilverAmount,
    totalAugmontGoldAmount,
    totalAugmontSilverAmount,
    totalMMTCGoldAmount,
    totalMMTCSilverAmount,
    totalAugmontGoldSilverAmount,
    totalMMTCGoldSilverAmount,
    loading,
    error,
  });
  const [dateFilter, setDateFilter] = useState("30d");
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const isCustomDateOpen = dateFilter === "ytd";

  useEffect(() => {
    if (isCustomDateOpen) {
      setFromDate("");
      setToDate("");
    }
  }, [isCustomDateOpen]);

  const calculateDateRange = (filter: string) => {
    const today = new Date();
    let startDate = new Date();

    switch (filter) {
      case "7d":
        startDate.setDate(today.getDate() - 7);
        break;
      case "30d":
        startDate.setDate(today.getDate() - 30);
        break;
      case "quarter":
        startDate.setMonth(today.getMonth() - 3);
        break;
      case "ytd":
        startDate.setMonth(0);
        startDate.setDate(1);
        break;
      default:
        startDate.setDate(today.getDate() - 30);
    }

    return {
      startDate: startDate.toISOString().split("T")[0],
      endDate: today.toISOString().split("T")[0],
    };
  };

  const handleFetchSales = (startDateParam?: string, endDateParam?: string) => {
    if (startDateParam && endDateParam) {
      // Use custom dates
      dispatch(
        fetchsalesReport({ startDate: startDateParam, endDate: endDateParam }),
      );
    } else {
      // Use filter
      const { startDate, endDate } = calculateDateRange(dateFilter);
      dispatch(fetchsalesReport({ startDate, endDate }));
    }
  };

  const handleApplyCustomDate = () => {
    if (fromDate && toDate) {
      handleFetchSales(fromDate, toDate);
    }
  };

  const handleFilterChange = (searchValue: string) => {
    setSearchQuery(searchValue);
  };

  // Filter transactions based on search query
  const filteredTransactions = searchQuery.trim()
    ? transactions.filter((transaction) =>
        transaction.client_id?.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()),
      )
    : transactions;

  useEffect(() => {
    if (dateFilter !== "ytd") {
      handleFetchSales();
    }
  }, [dateFilter]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="p-4 space-y-4 mx-auto w-full"
    >
      {/* Title & Global Actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-end">
        <div className="w-full sm:w-40 shrink-0">
          <Select
            options={dateFilterOptions}
            value={dateFilter}
            onChange={setDateFilter}
            size="md"
          />
        </div>

        {isCustomDateOpen && (
          <div className="w-full md:w-auto">
            <CustomDate
              startDate={fromDate}
              endDate={toDate}
              onStartDateChange={setFromDate}
              onEndDateChange={setToDate}
              onSubmit={handleApplyCustomDate}
              submitLabel="Submit"
              containerClassName="justify-end"
              className="border border-slate-300 rounded-lg"
              size="md"
            />
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          Error: {error}
        </div>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <SummaryCard
          label="Total Amount"
          value={formatNumber(totalAumAmount)}
          augmontValue={formatNumber(totalAugmontGoldSilverAmount)}
          mmtcValue={formatNumber(totalMMTCGoldSilverAmount)}
          icon={Wallet}
        />
        <SummaryCard
          label="Gold Amount"
          value={formatNumber(totalGoldAmount)}
          augmontValue={formatNumber(totalAugmontGoldAmount)}
          mmtcValue={formatNumber(totalMMTCGoldAmount)}
          icon={IndianRupee}
        />
        <SummaryCard
          label="Silver Amount"
          value={formatNumber(totalSilverAmount)}
          augmontValue={formatNumber(totalAugmontSilverAmount)}
          mmtcValue={formatNumber(totalMMTCSilverAmount)}
          icon={IndianRupee}
        />
      </div>

      {/* Sales Table */}
      <Table<salesRecord>
        title="Sales Report"
        data={filteredTransactions}
        columns={columns}
        searchPlaceholder="Search investors..."
        onSearch={handleFilterChange}
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
