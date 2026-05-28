import React, { useState, useEffect } from "react";
import {
  Search,
  RotateCcw,
  Download,
  Eye,
  Mail,
  Wallet,
  User,
  Zap,
  Tag,
  CreditCard,
  FileText,
  Building2,
  Calendar,
  Phone,
  Lock,
  ChevronLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchTransactionReport,
  sendTransactionPdf,
} from "../../features/transactions/transactionApi";
import { Table, Column } from "../../components/Table";
import { Button } from "../../components/Button";
import { DateInput } from "../../components/Date";
import { cn } from "../../lib/utils";
import moment from "moment";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-hot-toast";
import Logo from "../../assets/images/transactions/PdfHeader.png";
import FooterImage from "../../assets/images/transactions/PdfFooter.png";
import noProfileImage from "../../assets/icons/Profile/no_profile.avif";

interface TransactionRow {
  createdAt: string;
  refinery: string;
  description: string;
  type: "buy" | "sell" | "redeem";
  gram: string;
  amount: string;
  balance: string;
}

export const ViewTransactions: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const state = location.state as { clientId?: string };
  const clientId = state?.clientId || id;

  const {
    goldData,
    silverData,
    userDetails,
    address,
    goldSummary,
    silverSummary,
    loading,
    pdfLoading,
  } = useSelector((state: RootState) => state.transactions);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [viewLoading, setViewLoading] = useState(false);
  const [mailLoading, setMailLoading] = useState(false);
  const [localPdfLoading, setLocalPdfLoading] = useState(false);

  useEffect(() => {
    const today = new Date();
    const defaultEndDate = moment(today).format("DD-MM-YYYY");
    const defaultStartDate = moment(
      new Date().setDate(today.getDate() - 30),
    ).format("DD-MM-YYYY");

    setStartDate(defaultStartDate);
    setEndDate(defaultEndDate);
    if (clientId) {
      dispatch(
        fetchTransactionReport(clientId, defaultStartDate, defaultEndDate),
      );
    }
  }, [clientId, dispatch, location.state]);

  const handleSearch = () => {
    if (clientId && startDate && endDate) {
      dispatch(fetchTransactionReport(clientId, startDate, endDate));
    } else {
      toast.error("Please select both start and end dates");
    }
  };

  const handleReset = () => {
    const today = new Date();
    const defaultEndDate = moment(today).format("DD-MM-YYYY");
    const defaultStartDate = moment(
      new Date().setDate(today.getDate() - 30),
    ).format("DD-MM-YYYY");
    setStartDate(defaultStartDate);
    setEndDate(defaultEndDate);
    if (clientId) {
      dispatch(
        fetchTransactionReport(clientId, defaultStartDate, defaultEndDate),
      );
    }
  };

  const transactionColumns: Column<TransactionRow>[] = [
    {
      key: "createdAt",
      header: "Txn Date",
      cell: (item) => (
        <span className="text-xs font-medium text-slate-700">
          {moment(item.createdAt).format("DD MMM YYYY")}
        </span>
      ),
    },
    {
      key: "refinery",
      header: "Refinery",
      cell: (item) => (
        <span className="text-xs font-semibold text-[#5b2c90]">
          {item.refinery}
        </span>
      ),
    },
    {
      key: "description",
      header: "Description",
      cell: (item) => (
        <span
          className="text-xs text-slate-600 truncate max-w-[200px]"
          title={item.description}
        >
          {item.description}
        </span>
      ),
    },
    {
      key: "gram",
      header: "Buy(g)",
      cell: (item) => (
        <span
          className={cn(
            "text-xs font-semibold",
            item.type === "buy" ? "text-emerald-600" : "text-slate-300",
          )}
        >
          {item.type === "buy" ? item.gram : "-"}
        </span>
      ),
    },
    {
      key: "gram",
      header: "Sell(g)",
      cell: (item) => (
        <span
          className={cn(
            "text-xs font-semibold",
            item.type === "sell" ? "text-rose-600" : "text-slate-300",
          )}
        >
          {item.type === "sell" ? item.gram : "-"}
        </span>
      ),
    },
    {
      key: "gram",
      header: "Redeem(g)",
      cell: (item) => (
        <span
          className={cn(
            "text-xs font-semibold",
            item.type === "redeem" ? "text-blue-600" : "text-slate-300",
          )}
        >
          {item.type === "redeem" ? item.gram : "-"}
        </span>
      ),
    },
    {
      key: "amount",
      header: "Amount(₹)",
      cell: (item) => (
        <span className="text-xs font-semibold text-slate-900">
          {item.amount}
        </span>
      ),
    },
    {
      key: "balance",
      header: "Balance(g)",
      cell: (item) => (
        <span className="text-xs font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
          {item.balance}
        </span>
      ),
    },
  ];

  const generatePdf = () => {
    if (!userDetails) {
      toast.error("User details not found. Cannot generate PDF.");
      return null;
    }

    const doc = new jsPDF() as any;

    // Helper function for safe number formatting
    const formatNumber = (val: any) => {
      const num = Number(val);
      return isNaN(num) ? "N/A" : num.toFixed(2);
    };

    const footerImageHeight = 15;
    const footer = (doc: any) => {
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;

        doc.addImage(Logo, "PNG", 0, 0, pageWidth, 25);
        doc.addImage(
          FooterImage,
          "PNG",
          0,
          pageHeight - footerImageHeight,
          pageWidth,
          footerImageHeight,
        );

        // Add footer text
        doc.setTextColor(238, 216, 129);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth - 30, pageHeight - 5, {
          align: "justify",
        });
      }
    };

    // Add User Details
    const userDetailsRows = [
      ["Name", userDetails.name || "N/A"],
      ["Phone", userDetails.phone || "N/A"],
      ["DOB", userDetails.dob || "N/A"],
      ["Email", userDetails.email || "N/A"],
      [
        "Address",
        address
          ? `${address.line1 || "N/A"}, ${address.line2 || "N/A"}, ${address.city || "N/A"}, ${address.state || "N/A"}, ${address.zip || "N/A"}`
          : "N/A",
      ],
      ["Unique ID", userDetails.uniqueId || "N/A"],
    ];

    autoTable(doc, {
      head: [["User Details", ""]],
      body: userDetailsRows,
      startY: 30,
      theme: "plain",
      headStyles: {
        textColor: [0, 58, 72],
        fontSize: 16,
        fontStyle: "bold",
      },
      bodyStyles: { fontSize: 8 },
      margin: { top: 30, left: 10, bottom: 20, right: 10 },
      didDrawPage: () => {
        doc.addImage(Logo, "PNG", 0, 0, 210, 25);
      },
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(
      `Statement From ${startDate} To ${endDate}`,
      10,
      doc.lastAutoTable.finalY + 10,
    );

    // Gold Transactions
    if (goldData.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(0, 58, 72);
      doc.text("Gold Transactions", 10, doc.lastAutoTable.finalY + 20);

      const goldTransactionRows = goldData.map((row) => [
        moment(row.createdAt).format("DD MMM YYYY"),
        row.refinery,
        row.description,
        row.type === "buy" ? row.gram : "",
        row.type === "sell" ? row.gram : "",
        row.type === "redeem" ? row.gram : "",
        row.amount,
        row.balance,
      ]);

      // Total Row
      goldTransactionRows.push([
        "Total",
        "",
        "",
        goldSummary.totalBuyGram || "N/A",
        goldSummary.totalSellGram || "N/A",
        "-",
        formatNumber(
          Number(goldSummary.totalBuyAmount) -
            Number(goldSummary.totalSellAmount),
        ),
        goldData[goldData.length - 1]?.balance || "N/A",
      ]);

      autoTable(doc, {
        head: [
          [
            "Txn Date",
            "Refinery",
            "Description",
            "Buy(g)",
            "Sell(g)",
            "Redeem(g)",
            "Amount(Rs)",
            "Balance(g)",
          ],
        ],
        body: goldTransactionRows,
        startY: doc.lastAutoTable.finalY + 25,
        theme: "grid",
        headStyles: {
          fillColor: [0, 58, 72],
          textColor: [255, 255, 255],
          fontSize: 8,
          fontStyle: "bold",
        },
        bodyStyles: { fontSize: 8 },
        columnStyles: { 2: { halign: "left" } },
        margin: { top: 30, left: 10, bottom: 20, right: 10 },
        didParseCell: (hookData: any) => {
          if (hookData.row.index === goldTransactionRows.length - 1) {
            hookData.cell.styles.fontStyle = "bold";
          }
        },
        didDrawPage: () => {
          doc.addImage(Logo, "PNG", 0, 0, 210, 25);
        },
      });

      // Gold Summary
      const goldSummaryRows = [
        ["Total Gold Bought (g)", goldSummary.totalBuyGram || "N/A"],
        ["Total Gold Sold (g)", goldSummary.totalSellGram || "N/A"],
        ["Total Gold Buy Amount (Rs)", goldSummary.totalBuyAmount || "N/A"],
        ["Total Gold Sell Amount (Rs)", goldSummary.totalSellAmount || "N/A"],
      ];

      autoTable(doc, {
        head: [["Gold Summary", ""]],
        body: goldSummaryRows,
        startY: doc.lastAutoTable.finalY + 5,
        theme: "plain",
        headStyles: { textColor: [0, 58, 72], fontSize: 16, fontStyle: "bold" },
        bodyStyles: { fontSize: 8 },
        margin: { top: 30, left: 10, bottom: 20, right: 10 },
      });
    }

    // Silver Transactions
    if (silverData.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(0, 58, 72);
      doc.text("Silver Transactions", 10, doc.lastAutoTable.finalY + 15);

      const silverTransactionRows = silverData.map((row) => [
        moment(row.createdAt).format("DD MMM YYYY"),
        row.refinery,
        row.description,
        row.type === "buy" ? row.gram : "",
        row.type === "sell" ? row.gram : "",
        row.type === "redeem" ? row.gram : "",
        row.amount,
        row.balance,
      ]);

      // Total Row
      silverTransactionRows.push([
        "Total",
        "",
        "",
        silverSummary.totalBuyGram || "N/A",
        silverSummary.totalSellGram || "N/A",
        "-",
        formatNumber(
          Number(silverSummary.totalBuyAmount) -
            Number(silverSummary.totalSellAmount),
        ),
        silverData[silverData.length - 1]?.balance || "N/A",
      ]);

      autoTable(doc, {
        head: [
          [
            "Txn Date",
            "Refinery",
            "Description",
            "Buy(g)",
            "Sell(g)",
            "Redeem(g)",
            "Amount(Rs)",
            "Balance(g)",
          ],
        ],
        body: silverTransactionRows,
        startY: doc.lastAutoTable.finalY + 20,
        theme: "grid",
        headStyles: {
          fillColor: [0, 58, 72],
          textColor: [255, 255, 255],
          fontSize: 8,
          fontStyle: "bold",
        },
        bodyStyles: { fontSize: 8 },
        columnStyles: { 2: { halign: "left" } },
        margin: { top: 30, left: 10, bottom: 20, right: 10 },
        didParseCell: (hookData: any) => {
          if (hookData.row.index === silverTransactionRows.length - 1) {
            hookData.cell.styles.fontStyle = "bold";
          }
        },
        didDrawPage: () => {
          doc.addImage(Logo, "PNG", 0, 0, 210, 25);
        },
      });

      // Silver Summary
      const silverSummaryRows = [
        ["Total Silver Bought (g)", silverSummary.totalBuyGram || "N/A"],
        ["Total Silver Sold (g)", silverSummary.totalSellGram || "N/A"],
        ["Total Silver Buy Amount (Rs)", silverSummary.totalBuyAmount || "N/A"],
        [
          "Total Silver Sell Amount (Rs)",
          silverSummary.totalSellAmount || "N/A",
        ],
      ];

      autoTable(doc, {
        head: [["Silver Summary", ""]],
        body: silverSummaryRows,
        startY: doc.lastAutoTable.finalY + 5,
        theme: "plain",
        headStyles: { textColor: [0, 58, 72], fontSize: 16, fontStyle: "bold" },
        bodyStyles: { fontSize: 8 },
        margin: { top: 30, left: 10, bottom: 20, right: 10 },
      });
    }

    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(
      "**This is a computer generated statement and does not require a signature.",
      10,
      doc.lastAutoTable.finalY + 10,
    );

    footer(doc);
    return doc.output("bloburl");
  };

  const handleDownload = async () => {
    setLocalPdfLoading(true);
    try {
      const pdfOutput = generatePdf();
      if (pdfOutput) {
        const link = document.createElement("a");
        link.href = pdfOutput;
        link.download = `${userDetails?.name || "Investor"}_Transaction_Report.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } finally {
      setLocalPdfLoading(false);
    }
  };

  const handleView = async () => {
    setViewLoading(true);
    try {
      const pdfOutput = generatePdf();
      if (pdfOutput) {
        window.open(pdfOutput, "_blank");
      }
    } finally {
      setViewLoading(false);
    }
  };

  const handleSendMail = async () => {
    setMailLoading(true);
    try {
      const pdfOutput = generatePdf();
      if (pdfOutput && clientId) {
        const blob = await (await fetch(pdfOutput)).blob();
        console.log("Sending PDF mail for clientId:", clientId);
        const result = await dispatch(
          sendTransactionPdf(clientId, blob, startDate, endDate),
        );
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      }
    } catch (error: any) {
      toast.error("Failed to process PDF for email.");
    } finally {
      setMailLoading(false);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4 animate-in fade-in duration-500 pb-4">
      {/* Profile Card */}
      <div className="lg:col-span-8 bg-[#5b2c90]  rounded-2xl relative overflow-hidden group shadow-2xl shadow-[#5b2c90]/20">
        <div className="relative p-4 flex flex-col md:flex-row gap-4 items-start">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-inner overflow-hidden">
            <img
              src={noProfileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 space-y-1">
            <div className="border-b border-white/10">
              <span className="text-white font-semibold text-lg">
                {userDetails?.name || "Loading..."}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="space-y-1">
                <p className="text-white/40 text-sm font-semibold ">
                  Unique ID
                </p>
                <p className="text-white font-semibold text-sm ">
                  {userDetails?.uniqueId || "—"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-white/40 text-sm font-semibold ">Phone</p>
                <p className="text-white font-semibold text-sm ">
                  {userDetails?.phone || "—"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-white/40 text-sm font-semibold ">Email</p>
                <p className="text-white font-semibold text-sm  truncate">
                  {userDetails?.email || "—"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-white/40 text-sm font-semibold ">DOB</p>
                <p className="text-white font-semibold text-sm ">
                  {userDetails?.dob || "—"}
                </p>
              </div>
              <div className="md:col-span-2 space-y-1">
                <p className="text-white/40 text-sm font-semibold ">Address</p>
                <p className="text-white font-medium text-xs leading-relaxed opacity-90">
                  {address
                    ? [
                        address.line1,
                        address.line2,
                        address.city,
                        address.state,
                        address.zip && `- ${address.zip}`,
                      ]
                        .filter(Boolean)
                        .join(", ")
                    : "—"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Filter Bar */}
      <div className="bg-white/80 backdrop-blur-xl  rounded-2xl border border-white shadow-2xl shadow-[#5b2c90]/5 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <DateInput
            label="Start Date"
            value={startDate}
            onChange={setStartDate}
            size="md"
            className="bg-slate-50/50"
          />
          <DateInput
            label="End Date"
            value={endDate}
            onChange={setEndDate}
            size="md"
            className="bg-slate-50/50"
          />
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={handleSearch}
            loading={loading}
            icon={<Search size={18} />}
          >
            Search Report
          </Button>
          <Button
            variant="secondary"
            size="md"
            fullWidth
            icon={<RotateCcw size={18} />}
            onClick={handleReset}
          >
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Date Statement Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-white border border-slate-200  rounded-2xl shadow-sm gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#5b2c90]/5 flex items-center justify-center text-[#5b2c90]">
            <FileText size={20} />
          </div>
          <div>
            <h3 className="text-md font-semibold text-slate-900">
              Statement Overview
            </h3>
            <p className="text-slate-600 text-xs font-medium italic">
              From {startDate} To {endDate}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-400">
              Total Records
            </p>
            <p className="text-slate-900 font-semibold text-sm">
              {(goldData.length || 0) + (silverData.length || 0)} Found
            </p>
          </div>
          <div className="w-px h-10 bg-slate-100" />
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-400">
              Generating On
            </p>
            <p className="text-slate-900 font-semibold text-sm">
              {moment().format("DD-MM-YYYY")}
            </p>
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <div className="space-y-10">
        {/* Gold Table */}
        {goldData.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-8 bg-amber-500 rounded-full" />
                <h3 className="text-md font-semibold text-slate-900">
                  Gold Transactions
                </h3>
              </div>
              <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-2xl border border-amber-100 ">
                High Purity 24K
              </span>
            </div>
            {/* Gold Summary Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
              <SummaryCard
                label="Total Buy"
                value={goldSummary.totalBuyGram}
                unit="g"
                icon={Download}
                color="emerald"
              />
              <SummaryCard
                label="Total Sell"
                value={goldSummary.totalSellGram}
                unit="g"
                icon={Zap}
                color="rose"
              />
              <SummaryCard
                label="Buy Amount"
                value={`₹${goldSummary.totalBuyAmount}`}
                icon={CreditCard}
                color="indigo"
              />
              <SummaryCard
                label="Sell Amount"
                value={`₹${goldSummary.totalSellAmount}`}
                icon={Tag}
                color="amber"
              />
            </div>
            <Table<TransactionRow>
              data={goldData}
              columns={transactionColumns}
              entriesPerPage={5}
              loading={loading}
              className="border border-slate-200 rounded-3xl"
            />
          </motion.section>
        )}

        {/* Silver Table */}
        {silverData.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-8 bg-slate-400 rounded-full" />
                <h3 className="text-md font-semibold text-slate-900">
                  Silver Transactions
                </h3>
              </div>
              <span className="text-[10px] font-semibold text-slate-600 bg-slate-50 px-2 py-1 rounded-2xl border border-slate-200 ">
                999 Fine Silver
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
              <SummaryCard
                label="Total Buy"
                value={silverSummary.totalBuyGram}
                unit="g"
                icon={Download}
                color="emerald"
              />
              <SummaryCard
                label="Total Sell"
                value={silverSummary.totalSellGram}
                unit="g"
                icon={Zap}
                color="rose"
              />
              <SummaryCard
                label="Buy Amount"
                value={`₹${silverSummary.totalBuyAmount}`}
                icon={CreditCard}
                color="indigo"
              />
              <SummaryCard
                label="Sell Amount"
                value={`₹${silverSummary.totalSellAmount}`}
                icon={Tag}
                color="amber"
              />
            </div>
            <Table<TransactionRow>
              data={silverData}
              columns={transactionColumns}
              entriesPerPage={5}
              loading={loading}
              className="border border-slate-200 rounded-3xl"
            />
          </motion.section>
        )}

        {goldData.length === 0 && silverData.length === 0 && !loading && (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-400">
              <Search size={40} />
            </div>
            <div>
              <h4 className="text-md font-semibold text-slate-900">
                No Transactions Found
              </h4>
              <p className="text-slate-600 text-xs">
                We couldn't find any records for the selected date range.
              </p>
            </div>
            <Button onClick={handleReset} variant="secondary">
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      <footer className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          variant="primary"
          size="md"
          // className="bg-slate-900 hover:bg-black shadow-xl shadow-slate-200 h-14 px-10 rounded-2xl"
          onClick={handleDownload}
          loading={localPdfLoading}
          icon={<Download size={20} />}
        >
          DOWNLOAD REPORT PDF
        </Button>
        <Button
          variant="secondary"
          size="md"
          // className="border-[#5b2c90] text-[#5b2c90] hidden md:flex"
          onClick={handleView}
          loading={viewLoading}
          icon={<Eye size={16} />}
        >
          View PDF
        </Button>
        <Button
          variant="primary"
          size="md"
          // className="bg-[#5b2c90] hover:bg-[#4a2a7d] shadow-xl shadow-[#5b2c90]/20 h-14 px-10 rounded-2xl"
          onClick={handleSendMail}
          loading={mailLoading || pdfLoading}
          icon={<Mail size={20} />}
        >
          SEND VIA EMAIL
        </Button>
      </footer>
    </div>
  );
};

const SummaryCard: React.FC<{
  label: string;
  value: string;
  unit?: string;
  icon: any;
  color: "emerald" | "rose" | "indigo" | "amber";
}> = ({ label, value, unit, icon: Icon, color }) => {
  const variants = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
    indigo: "bg-[#5b2c90]/5 text-[#5b2c90] border-[#5b2c90]/10",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:border-slate-300 transition-colors">
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center border",
          variants[color],
        )}
      >
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-400 ">{label}</p>
        <h5 className="text-sm font-semibold text-slate-900 ">
          {value}{" "}
          {unit && (
            <span className="text-sm font-semibold text-slate-400">{unit}</span>
          )}
        </h5>
      </div>
    </div>
  );
};
