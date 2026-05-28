import React from "react";
import Table, { Column } from "../Table";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  status: "Completed" | "Pending";
  date: string;
}

export const TransactionTable: React.FC = () => {
  const data: Transaction[] = [
    {
      id: "TXN-849201",
      type: "24K Gold",
      amount: 12450.0,
      status: "Completed",
      date: "Oct 28, 2023",
    },
    {
      id: "TXN-849188",
      type: "Fine Silver",
      amount: 3200.0,
      status: "Completed",
      date: "Oct 24, 2023",
    },
    {
      id: "TXN-848902",
      type: "24K Gold",
      amount: 5000.0,
      status: "Pending",
      date: "Oct 21, 2023",
    },
    {
      id: "TXN-848712",
      type: "24K Gold",
      amount: 8500.0,
      status: "Completed",
      date: "Oct 15, 2023",
    },
    {
      id: "TXN-848550",
      type: "Fine Silver",
      amount: 1500.0,
      status: "Completed",
      date: "Oct 12, 2023",
    },
  ];

  const columns: Column<Transaction>[] = [
    {
      key: "id",
      header: "Transaction ID",
      sortable: true,
      cell: (item) => (
        <span className="font-mono text-xs text-slate-600">{item.id}</span>
      ),
    },
    {
      key: "type",
      header: "Asset Type",
      sortable: true,
      cell: (item) => (
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              item.type.includes("Gold") ? "bg-amber-500" : "bg-slate-400"
            }`}
          ></span>
          <span className="font-semibold">{item.type}</span>
        </div>
      ),
    },
    {
      key: "amount",
      header: <div className="text-right w-full">Amount</div>,
      sortable: true,
      cell: (item) => (
        <div className="text-right font-bold text-primary">
          ₹
          {item.amount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (item) => (
        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
            item.status === "Completed"
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: "date",
      header: "Date",
      sortable: true,
      cell: (item) => <span className="text-slate-600">{item.date}</span>,
    },
  ];

  const handleExport = (dataToExport: Transaction[], filename: string) => {
    if (dataToExport.length === 0) {
      alert("No data to export");
      return;
    }
    const headers = [
      "Transaction ID",
      "Asset Type",
      "Amount",
      "Status",
      "Date",
    ];
    const csvContent = [
      headers.join(","),
      ...dataToExport.map((row) =>
        [row.id, row.type, row.amount, row.status, row.date]
          .map((f) => `"${f}"`)
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="transition-transform duration-500 hover:-translate-y-1">
      <Table<Transaction>
        title=""
        subtitle=""
        columns={columns}
        data={data}
        searchPlaceholder="Search transactions..."
        entriesPerPage={5}
        selectable
        onExportAll={(exportedData) =>
          handleExport(exportedData, "transactions_all.csv")
        }
        onExportSelected={(exportedData) =>
          handleExport(exportedData, "transactions_selected.csv")
        }
      />
    </div>
  );
};
