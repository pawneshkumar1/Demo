import React from "react";
import Table, { Column } from "../Table";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { TopInvestor } from "../../features/dashboard/dashboardSlice";
import { formatCurrency } from "../../utils/formatters";
import { exportTableToCSV } from "../common/ExportData";

export const TopInvestors: React.FC = () => {
  const { topInvestors, topInvestorsLoading } = useSelector(
    (state: RootState) => state.dashboard,
  );

  const columns: Column<TopInvestor>[] = [
    {
      key: "name",
      header: "Investor Name",
      sortable: true,
      filterable: true,
      cell: (item: any) => <span className="text-slate-600">{item.name}</span>,
    },
    {
      key: "mobileNo",
      sortable: true,
      filterable: true,
      header: "Mobile Number",
      cell: (item: any) => (
        <span className="text-slate-600">{item.mobileNo || "N/A"}</span>
      ),
    },
    {
      key: "Email",
      sortable: true,
      filterable: true,
      header: "Email Id",
      cell: (item: any) => <span>{item.Email || "N/A"}</span>,
    },
    {
      key: "totalInvestment",
      header: "Total Investment",
      sortable: true,
      filterable: true,
      cell: (item) => (
        <div className="text-primary">
          {formatCurrency(item.totalInvestment)}
        </div>
      ),
    },
  ];

  const handleExportTopInvestors = (
    dataToExport: TopInvestor[],
    filename: string,
  ) => {
    if (!dataToExport.length) {
      alert("No data available to export");
      return;
    }

    const headers = [
      "Client Name",
      "Mobile Number",
      "Email Id",
      "Total Investment",
    ];
    const csvRows = [
      headers.join(","),
      ...dataToExport.map((row) =>
        [row.name, row.mobileNo, row.Email, formatCurrency(row.totalInvestment)]
          .map((field) => `"${String(field ?? "").replace(/"/g, '""')}"`)
          .join(","),
      ),
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
    <div className="transition-transform duration-500 hover:-translate-y-1">
      <Table<TopInvestor>
        title="Top Investors"
        subtitle=""
        columns={columns}
        data={topInvestors}
        loading={topInvestorsLoading}
        searchPlaceholder="Search partners..."
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
  );
};
