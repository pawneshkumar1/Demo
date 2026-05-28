import React, { useEffect, useMemo, useState } from "react";
import {
  User,
  Wallet,
  Coins,
  Sparkles,
  Search,
  RotateCcw,
  FileText,
} from "lucide-react";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";
import { Table, Column } from "../../components/Table";
import { cn } from "../../lib/utils";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchInvoiceReport,
  generatePartnerInvoice,
} from "../../features/invoice/invoiceApi";
import {
  InvoiceTransaction,
  PartnerCommissionSummary,
} from "../../features/invoice/invoiceSlice";
import { formatDate } from "../../utils/formatters";
import { exportTableToCSV } from "@/src/components/common/ExportData";
import { CopyButton } from "@/src/components/common/CopyButton";
import goldIcon from "../../assets/icons/GoldSilverIcon/gold.png";
import silverIcon from "../../assets/icons/GoldSilverIcon/silver.png";

interface BreakdownRow {
  label: string;
  value: string;
  bold?: boolean;
}

type InvoiceStatus = "Paid" | "Unpaid" | "Pending";

interface ClientInvoiceRow {
  _id: string;
  client_id: string;
  invoiceNo: string;
  amount: string;
  gst: string;
  total_amount: string;
  client: string;
  initials: string;
  metal: "Gold" | "Silver";
  quantity: string;
  status: InvoiceStatus;
  date: string;
  Price: string;
  invoice_url: string;
}

const monthOptions = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 3 }, (_, index) => {
  const year = String(currentYear - index);
  return { value: year, label: year };
});

const statusStyles: Record<InvoiceStatus, string> = {
  Paid: "bg-emerald-100 text-emerald-700",
  Unpaid: "bg-red-100 text-red-600",
  Pending: "bg-amber-100 text-amber-700",
};

const normalizeStatus = (value?: string): InvoiceStatus => {
  const normalized = (value || "").trim().toLowerCase();

  if (normalized === "paid") return "Paid";
  if (normalized === "pending") return "Pending";
  return "Unpaid";
};

const formatCurrency = (value?: string | number) => {
  const amount = Number(value ?? 0);

  if (Number.isNaN(amount)) {
    return "₹ 0.00";
  }

  return `₹ ${amount.toFixed(2)}`;
};

const formatQuantity = (value?: string | number) => {
  const quantity = Number(value ?? 0);

  if (Number.isNaN(quantity)) {
    return "0.000 g";
  }

  return `${quantity.toFixed(3)} g`;
};

const getInitials = (value: string) =>
  value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "NA";

const buildBreakdown = (
  partner: PartnerCommissionSummary | null,
  metal: "Gold" | "Silver",
): BreakdownRow[] => {
  if (metal === "Gold") {
    return [
      {
        label: "Total Referral",
        value: formatCurrency(partner?.totalGoldCommission),
        bold: true,
      },
      {
        label: "Referral PreTax",
        value: formatCurrency(partner?.totalGoldPreTaxAmount),
      },
      {
        label: "Referral GST",
        value: formatCurrency(partner?.totalGoldGst),
      },
      {
        label: "Total Quantity",
        value: formatQuantity(partner?.totalGoldQuantity),
      },
    ];
  }

  return [
    {
      label: "Total Referral",
      value: formatCurrency(partner?.totalSilverCommission),
      bold: true,
    },
    {
      label: "Referral PreTax",
      value: formatCurrency(partner?.totalSilverPreTaxAmount),
    },
    {
      label: "Referral GST",
      value: formatCurrency(partner?.totalSilverGst),
    },
    {
      label: "Total Quantity",
      value: formatQuantity(partner?.totalSilverQuantity),
    },
  ];
};

const clientInvoiceColumns: Column<ClientInvoiceRow>[] = [
  {
    key: "_id",
    sortable: true,
    filterable: true,
    header: "Id",
    cell: (row) => (
      <div className="flex items-center justify-center">
        <CopyButton text={row._id} />
      </div>
    ),
  },
  {
    key: "client_id",
    sortable: true,
    filterable: true,
    header: "Investor Id",
    cell: (row) => (
      <div className="flex items-center justify-center">
        <CopyButton text={row.client_id} />
      </div>
    ),
  },
  {
    key: "amount",
    sortable: true,
    filterable: true,
    header: "Amount(₹)",
    cell: (row) => <span>{row.amount}</span>,
  },
  {
    key: "quantity",
    sortable: true,
    filterable: true,
    header: "Quantity(g)",
    cell: (row) => <span>{row.quantity}</span>,
  },
  {
    key: "gst",
    sortable: true,
    filterable: true,
    header: "Gst(₹)",
    cell: (row) => <span>{row.gst}</span>,
  },
  {
    key: "total_amount",
    sortable: true,
    filterable: true,
    header: "Total Amount(₹)",
    cell: (row) => <span>{row.total_amount}</span>,
  },
  {
    key: "Price",
    sortable: true,
    filterable: true,
    header: "Price(₹)",
    cell: (row) => <span>{row.Price}</span>,
  },
  {
    key: "invoice_url",
    sortable: true,
    filterable: true,
    header: "Invoice URL",
    cell: (row) => (
      <div className="flex items-center justify-center">
        <CopyButton text={row.invoice_url} />
      </div>
    ),
  },
  {
    key: "invoiceNo",
    sortable: true,
    filterable: true,
    header: "Invoice No.",
    cell: (row) => <span>{row.invoiceNo}</span>,
  },
  {
    key: "metal",
    sortable: true,
    filterable: true,
    header: "Metal Type",
    cell: (item) => {
      const metalType = (item.metal || item.metal || "N/A")
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
  { key: "date", sortable: true, filterable: true, header: "Date" },
];
export const Invoice: React.FC = () => {
  const today = new Date();
  const defaultMonth = String(today.getMonth() + 1).padStart(2, "0");
  const defaultYear = String(today.getFullYear());

  const [month, setMonth] = useState(defaultMonth);
  const [year, setYear] = useState(defaultYear);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { partner, transactions, loading, generatingInvoice, error } =
    useSelector((state: RootState) => state.invoice);

  const selectedMonthLabel =
    monthOptions.find((m) => m.value === month)?.label ?? monthOptions[0].label;

  const filteredTransactions = useMemo(() => {
    const rows = transactions.map((transaction: InvoiceTransaction) => {
      const clientName =
        transaction.client_name ||
        transaction.clientName ||
        transaction.name ||
        transaction.client_id ||
        "Unknown";
      const metal =
        transaction.metal_type?.toLowerCase() === "silver" ? "Silver" : "Gold";
      const totalAmountValue =
        transaction.total_amount ?? transaction.amount ?? transaction.Price;
      const amountValue =
        transaction.amount ?? transaction.total_amount ?? transaction.Price;

      return {
        _id: transaction._id,
        client_id: transaction.client_id || "N/A",
        invoiceNo: transaction.invoice_No || transaction._id || "N/A",
        amount: formatCurrency(amountValue),
        gst: formatCurrency(transaction.gst),
        total_amount: formatCurrency(totalAmountValue),
        client: clientName,
        initials: getInitials(clientName),
        metal,
        quantity: formatQuantity(transaction.quantity),
        status: normalizeStatus(transaction.status || partner?.status),
        date: transaction.createdAt ? formatDate(transaction.createdAt) : "N/A",
        Price: formatCurrency(transaction.Price),
        invoice_url: transaction.invoice_url || "",
      } satisfies ClientInvoiceRow;
    });

    if (!searchQuery.trim()) {
      return rows;
    }

    const term = searchQuery.toLowerCase();
    return rows.filter(
      (row) =>
        row.invoiceNo.toLowerCase().includes(term) ||
        row.client.toLowerCase().includes(term),
    );
  }, [partner?.status, searchQuery, transactions]);

  const goldBreakdown = useMemo(
    () => buildBreakdown(partner, "Gold"),
    [partner],
  );
  const silverBreakdown = useMemo(
    () => buildBreakdown(partner, "Silver"),
    [partner],
  );

  const fetchInvoiceData = async (
    selectedMonth: string,
    selectedYear: string,
  ) => {
    const result = await dispatch(
      fetchInvoiceReport(selectedMonth, selectedYear),
    );

    if (!result?.success) {
      toast.error(result?.message || "Failed to fetch invoice data");
    }
  };

  useEffect(() => {
    fetchInvoiceData(defaultMonth, defaultYear);
  }, []);

  const handleSearch = async () => {
    await fetchInvoiceData(month, year);
  };

  const handleReset = async () => {
    setMonth(defaultMonth);
    setYear(defaultYear);
    setSearchQuery("");
    await fetchInvoiceData(defaultMonth, defaultYear);
  };

  const handleViewInvoice = async () => {
    if (!partner) {
      toast.error("Partner data is not available");
      return;
    }

    const { _id, totalCommission, ...filteredPartnerData } = partner;
    const payload = {
      ...filteredPartnerData,
      commission: totalCommission,
      month: Number(month),
      year: Number(year),
    };

    const result = await dispatch(generatePartnerInvoice(payload));

    if (!result?.success) {
      toast.error(result?.message || "Failed to generate invoice");
      return;
    }

    const pdfLink = result.data?.pdfLink;
    toast.success(result.message || "Invoice generated successfully");

    if (pdfLink) {
      window.open(pdfLink, "_blank", "noopener,noreferrer");
      return;
    }

    toast.error("Invoice generated, but PDF link was not returned");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-4 space-y-4 mx-auto w-full"
    >
      {/* Search & Filter Bar */}
      <section className="bg-white p-4 rounded-2xl border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Select Month
            </label>
            <Select
              options={monthOptions}
              value={month}
              onChange={setMonth}
              size="md"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Select Year
            </label>
            <Select
              options={yearOptions}
              value={year}
              onChange={setYear}
              size="md"
            />
          </div>

          <div className="md:col-span-2 flex gap-3">
            <Button
              fullWidth
              icon={<Search size={18} />}
              size="md"
              onClick={handleSearch}
              disabled={loading}
            >
              Search
            </Button>

            <Button
              fullWidth
              variant="ghost"
              icon={<RotateCcw size={18} />}
              size="md"
              onClick={handleReset}
              disabled={loading}
              className="bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              Reset
            </Button>
            <Button
              fullWidth
              size="md"
              icon={<FileText size={16} />}
              onClick={handleViewInvoice}
              disabled={loading || generatingInvoice || !partner}
              className="bg-primary/10 text-primary hover:bg-primary hover:text-white"
            >
              {generatingInvoice ? "Generating..." : "View Invoice"}
            </Button>
          </div>
        </div>
      </section>

      {/* Referral Fee Summary */}
      <section className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <h3 className="text-1xl font-semibold text-slate-900">
            Referral Fees For {selectedMonthLabel} {year}
          </h3>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {/* Status Overview Card */}
          <div className="bg-purple-50/40 p-4 rounded-2xl border border-primary/10 flex items-start gap-4">
            <div className="p-3 bg-primary/20 rounded-xl text-primary shrink-0">
              <Wallet size={24} />
            </div>
            <div className="flex-1 space-y-1.5">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-slate-600">Total Referral</p>
                  <h4 className="text-1xl font-semibold text-primary">
                    {formatCurrency(partner?.totalCommission)}
                  </h4>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-sm text-slate-600">Status</p>
                  <span
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-semibold  border shrink-0",
                      normalizeStatus(partner?.status) === "Paid"
                        ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                        : normalizeStatus(partner?.status) === "Pending"
                          ? "bg-amber-100 text-amber-700 border-amber-200"
                          : "bg-red-100 text-red-600 border-red-200",
                    )}
                  >
                    {normalizeStatus(partner?.status).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metal Breakdown Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Gold Card */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="bg-amber-50 p-4 border-b border-amber-200 flex items-center gap-3">
            <div className="size-10 rounded-xl flex items-center justify-center">
              <img src={goldIcon} alt="Gold" className="size-full" />
            </div>
            <h4 className="font-semibold text-slate-900 text-md">
              Gold Breakdown
            </h4>
          </div>
          <div className="p-4 space-y-1">
            {goldBreakdown.map((row) => (
              <div
                key={row.label}
                className="flex justify-between items-center border-b border-slate-100 last:border-b-0"
              >
                <span className="text-sm text-slate-600">{row.label}</span>
                <span
                  className={
                    row.bold
                      ? "font-semibold text-sm text-slate-900"
                      : "font-semibold text-sm text-slate-700"
                  }
                >
                  {row.value}
                </span>
              </div>
            ))}
            <div className="pt-2 flex justify-between items-center">
              <span className="text-sm font-semibold text-primary">
                Total Amount
              </span>
              <span className="text-sm font-semibold text-primary">
                {formatCurrency(partner?.totalGoldTotalAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Silver Card */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-100 p-4 border-b border-slate-200 flex items-center gap-3">
            <div className="size-10 rounded-xl flex items-center justify-center">
              <img src={silverIcon} alt="Silver" className="size-full" />
            </div>
            <h4 className="font-semibold text-slate-900 text-md">
              Silver Breakdown
            </h4>
          </div>
          <div className="p-4 space-y-1">
            {silverBreakdown.map((row) => (
              <div
                key={row.label}
                className="flex justify-between items-center border-b border-slate-100 last:border-b-0"
              >
                <span className="text-sm text-slate-600">{row.label}</span>
                <span
                  className={
                    row.bold
                      ? "font-semibold text-sm text-slate-900"
                      : "font-semibold text-sm text-slate-700"
                  }
                >
                  {row.value}
                </span>
              </div>
            ))}
            <div className="pt-2 flex justify-between items-center">
              <span className="text-sm font-semibold text-primary">
                Total Amount
              </span>
              <span className="text-sm font-semibold text-primary">
                {formatCurrency(partner?.totalSilverTotalAmount)}
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* Client Invoice Table */}
      <Table<ClientInvoiceRow>
        title="Client Invoice"
        data={filteredTransactions}
        columns={clientInvoiceColumns}
        searchPlaceholder="Search invoices or clients..."
        entriesPerPage={10}
        onSearch={setSearchQuery}
        loading={loading}
        selectable
        onExportAll={(data) =>
          exportTableToCSV(
            data,
            clientInvoiceColumns,
            "client_invoices_all.csv",
          )
        }
        onExportSelected={(data) =>
          exportTableToCSV(
            data,
            clientInvoiceColumns,
            "client_invoices_selected.csv",
          )
        }
      />
    </motion.div>
  );
};
