import { Column } from "../Table"; // adjust path if needed

export const exportTableToCSV = <T,>(
  data: T[],
  columns: Column<T>[],
  filename: string,
) => {
  if (!data.length) {
    alert("No data available to export");
    return;
  }

  // Use headers from columns
  const headers = columns.map((col) => col.header);

  const csvRows = [
    headers.join(","),

    ...data.map((row: any) =>
      columns
        .map((col) => {
          let value = row[col.key as keyof T];

          // Handle null/undefined
          if (value === null || value === undefined || value === "") {
            value = "N/A";
          }

          // Escape CSV
          return `"${String(value).replace(/"/g, '""')}"`;
        })
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
