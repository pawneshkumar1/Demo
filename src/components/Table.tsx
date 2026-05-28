import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Download,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  DownloadCloud,
} from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./Button";
import { TooltipButton } from "./TooltipButton";
import { ExpandableSearch } from "./ExpandableSearch";

export interface Column<T> {
  key: Extract<keyof T, string> | string;
  header: React.ReactNode;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
}

export interface TableProps<T> {
  title?: string;
  subtitle?: string;
  columns: Column<T>[];
  data: T[];
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  onFilter?: () => void;
  onDownload?: () => void;
  entriesPerPage?: number;
  selectable?: boolean;
  onExportAll?: (data: T[]) => void;
  onExportSelected?: (data: T[]) => void;
  loading?: boolean;
  className?: string;
}

export function Table<T>({
  title,
  subtitle,
  columns,
  data,
  searchPlaceholder = "Search...",
  onSearch,
  onFilter,
  onDownload,
  entriesPerPage = 5,
  selectable = false,
  onExportAll,
  onExportSelected,
  loading = false,
  className,
}: TableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>(
    {},
  );
  const [showFilters, setShowFilters] = useState(false);

  const handleSort = (key: string, sortable?: boolean) => {
    if (!sortable) return;
    setSortConfig((prev) => {
      if (prev && prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const handleColumnFilterChange = (key: string, value: string) => {
    setColumnFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1);
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const filteredAndSortedData = useMemo(() => {
    let result = Array.isArray(data) ? [...data] : [];

    // Client-side search if no onSearch prop is provided
    if (!onSearch && searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter((item) =>
        Object.values(item as any).some((val) =>
          String(val).toLowerCase().includes(lowercasedSearch),
        ),
      );
    }

    // Apply column filters
    Object.entries(columnFilters).forEach(([key, filterValue]) => {
      if (filterValue.trim()) {
        const lowercasedFilter = filterValue.toLowerCase();
        result = result.filter((item) =>
          String((item as any)[key])
            .toLowerCase()
            .includes(lowercasedFilter),
        );
      }
    });

    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = (a as any)[sortConfig.key];
        const bValue = (b as any)[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [data, searchTerm, onSearch, sortConfig, columnFilters]);

  const [selectedItems, setSelectedItems] = useState<Set<T>>(new Set());

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems(new Set(filteredAndSortedData));
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleSelectItem = (item: T, checked: boolean) => {
    const newSet = new Set(selectedItems);
    if (checked) {
      newSet.add(item);
    } else {
      newSet.delete(item);
    }
    setSelectedItems(newSet);
  };

  const isAllSelected =
    filteredAndSortedData.length > 0 &&
    selectedItems.size === filteredAndSortedData.length;
  const isPartiallySelected =
    selectedItems.size > 0 && selectedItems.size < filteredAndSortedData.length;

  const totalPages = Math.ceil(filteredAndSortedData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedData = filteredAndSortedData.slice(
    startIndex,
    startIndex + entriesPerPage,
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  const goToPage = (page: number) => setCurrentPage(page);

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(-1); // indicator for ellipsis
      }
    }
    return pages.filter((page, index, self) => self.indexOf(page) === index);
  };

  return (
    <div
      className={cn(
        "bg-white rounded-2xl py-2 shadow-sm border border-slate-100 w-full",
        className,
      )}
    >
      {/* Header Section */}
      {(title ||
        subtitle ||
        onSearch !== undefined ||
        onFilter ||
        onDownload ||
        onExportAll ||
        onExportSelected ||
        searchPlaceholder !== "Search...") && (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 px-4 gap-3">
          <div className="flex-shrink-0">
            {title && (
              <span className="font-semibold text-slate-800 whitespace-nowrap">
                {title}
              </span>
            )}
            {subtitle && (
              <p className="text-xs text-slate-600 whitespace-nowrap">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 justify-end w-full md:w-auto overflow-hidden flex-nowrap">
            {(onSearch !== undefined ||
              searchPlaceholder !== "Search..." ||
              (Array.isArray(data) && data.length > 0)) && (
              <div className="flex-shrink-0">
                <ExpandableSearch
                  value={searchTerm}
                  onChange={(value) => {
                    setSearchTerm(value);
                    if (onSearch) {
                      onSearch(value);
                    }
                    setCurrentPage(1);
                  }}
                  onSearch={(value) => {
                    if (onSearch) {
                      onSearch(value);
                    }
                  }}
                  placeholder={searchPlaceholder}
                  className="transition-all duration-300"
                  inputClassName="w-0 focus:w-48 sm:focus:w-64"
                />
              </div>
            )}

            {onDownload && (
              <TooltipButton
                tooltip="Download"
                variant="secondary"
                size="sm"
                onClick={onDownload}
                className="w-10 h-9 p-0 rounded-xl flex-shrink-0"
                icon={<DownloadCloud size={14} />}
                shimmer={false}
              />
            )}

            {onExportAll && (
              <TooltipButton
                tooltip="Export all data"
                variant="primary"
                size="sm"
                onClick={() => onExportAll(filteredAndSortedData)}
                icon={<Download size={14} />}
                iconPosition="left"
                className="h-9 px-4 rounded-lg flex-shrink-0"
              />
            )}

            {onExportSelected && selectable && (
              <TooltipButton
                tooltip="Export selected rows"
                variant={selectedItems.size > 0 ? "primary" : "secondary"}
                size="sm"
                onClick={() => onExportSelected(Array.from(selectedItems))}
                disabled={selectedItems.size === 0}
                icon={<CheckCircle size={14} />}
                iconPosition="left"
                className={cn(
                  "h-9 px-4 rounded-lg flex-shrink-0",
                  selectedItems.size === 0 && "opacity-50 grayscale",
                )}
              />
            )}
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-auto custom-scrollbar">
        {loading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 backdrop-blur-[2px] transition-all duration-300">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-[10px] font-black text-primary  animate-pulse">
                Loading Data
              </p>
            </div>
          </div>
        )}
        <table
          className={cn(
            "w-full border-collapse min-w-[600px] transition-all duration-500",
            loading && "blur-[1px] opacity-40 grayscale-[0.5]",
          )}
        >
          <thead>
            <tr className="bg-slate-50/50">
              {selectable && (
                <th className="px-4 py-2 border-b border-slate-100 w-12">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={(input) => {
                        if (input) input.indeterminate = isPartiallySelected;
                      }}
                      onChange={handleSelectAll}
                      style={{ accentColor: "#5b2c90" }}
                      className="w-4 h-4 appearance-none rounded-full border-2 border-slate-300 
  checked:bg-primary checked:border-primary cursor-pointer relative

  before:content-[''] before:absolute before:hidden
  checked:before:block

  before:w-[6px] before:h-[10px]
  before:border-white before:border-r-2 before:border-b-2
  before:rotate-45

  before:top-1/2 before:left-1/2
  before:-translate-x-1/2 before:-translate-y-1/2"
                    />
                  </div>
                </th>
              )}
              {columns.map((col, idx) => (
                <th
                  key={String(col.key) || idx}
                  className="px-6 py-3 border-b border-slate-100 bg-transparent whitespace-nowrap text-center"
                  onClick={() => handleSort(String(col.key), col.sortable)}
                >
                  <div
                    className={`flex items-center justify-center gap-2 group ${
                      col.sortable ? "cursor-pointer" : ""
                    }`}
                  >
                    <span className="text-primary font-bold text-[13px] ">
                      {col.header}
                    </span>
                    <div className="flex items-center gap-1">
                      {col.sortable && (
                        <span
                          className={cn(
                            "transition-all duration-300",
                            sortConfig?.key === col.key
                              ? "text-primary opacity-100"
                              : "text-slate-300  group-hover:opacity-100",
                          )}
                        >
                          {sortConfig?.key === col.key ? (
                            sortConfig.direction === "asc" ? (
                              <ArrowUp size={12} />
                            ) : (
                              <ArrowDown size={12} />
                            )
                          ) : (
                            <ArrowUpDown size={12} />
                          )}
                        </span>
                      )}
                      {col.filterable && (
                        <span
                          className={cn(
                            "transition-all duration-300 border-none cursor-pointer",
                            columnFilters[String(col.key)]
                              ? "text-primary opacity-100"
                              : "text-slate-300 group-hover:opacity-100",
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFilters();
                          }}
                        >
                          <Filter size={12} />
                        </span>
                      )}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
            {showFilters && (
              <tr className="bg-slate-50/30">
                {selectable && (
                  <th className="px-6 py-2 border-b border-slate-100"></th>
                )}
                {columns.map((col, idx) => (
                  <th
                    key={`filter-${String(col.key) || idx}`}
                    className="px-6 py-2 border-b border-slate-100"
                  >
                    {col.filterable && (
                      <input
                        type="text"
                        placeholder={`Search ${col.header}`}
                        value={columnFilters[String(col.key)] || ""}
                        onChange={(e) =>
                          handleColumnFilterChange(
                            String(col.key),
                            e.target.value,
                          )
                        }
                        className="w-full px-3 py-1.5 text-xs border-transparent rounded-md bg-slate-50 focus:ring-1 focus:ring-primary/20 outline-none"
                      />
                    )}
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody className="divide-y divide-slate-50">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-primary/[0.02] transition-colors group"
                >
                  {selectable && (
                    <td className="px-4 py-2 text-center">
                      <div className="flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={selectedItems.has(row)}
                          onChange={(e) =>
                            handleSelectItem(row, e.target.checked)
                          }
                          style={{ accentColor: "#5b2c90" }}
                          className="w-4 h-4 appearance-none rounded-full border-2 border-slate-300 
  checked:bg-primary checked:border-primary cursor-pointer relative

  before:content-[''] before:absolute before:hidden
  checked:before:block

  before:w-[6px] before:h-[10px]
  before:border-white before:border-r-2 before:border-b-2
  before:rotate-45

  before:top-1/2 before:left-1/2
  before:-translate-x-1/2 before:-translate-y-1/2"
                        />
                      </div>
                    </td>
                  )}
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-6 py-2 text-slate-600 text-xs text-center whitespace-nowrap"
                    >
                      {col.cell ? col.cell(row) : (row as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={selectable ? columns.length + 1 : columns.length}
                  className="p-12 text-center"
                >
                  <div className="flex flex-col items-center gap-2 opacity-40">
                    <Search size={32} className="text-slate-300" />
                    <p className="text-sm font-bold text-slate-400 ">
                      No records found
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      {filteredAndSortedData.length > 0 && (
        <div className="mt-2 flex flex-col sm:flex-row items-center justify-between px-4 gap-2">
          <p className="text-[11px]">
            Showing {Math.min(startIndex + 1, filteredAndSortedData.length)}-
            {Math.min(
              startIndex + entriesPerPage,
              filteredAndSortedData.length,
            )}{" "}
            of {filteredAndSortedData.length} records
          </p>
          <div className="flex flex-wrap items-center gap-3 justify-center">
            <span className="text-[11px] hidden sm:inline-block">
              Rows: {entriesPerPage}
            </span>
            <div className="flex gap-1.5 p-1 bg-slate-50 rounded-xl border border-slate-100">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="size-8 p-0 rounded-lg hover:bg-white hover:shadow-sm"
                aria-label="Previous Page"
                shimmer={false}
              >
                <ChevronLeft size={16} />
              </Button>

              {getPageNumbers().map((page, idx) => {
                if (page === -1) {
                  return (
                    <span
                      key={`ellipsis-${idx}`}
                      className="w-8 h-8 flex items-center justify-center text-slate-300"
                    >
                      ...
                    </span>
                  );
                }
                return (
                  <Button
                    key={page}
                    variant={page === currentPage ? "primary" : "white"}
                    size="sm"
                    onClick={() => goToPage(page)}
                    className={cn(
                      "size-8 p-0 rounded-lg font-black text-xs transition-all cursor-pointer",
                      page === currentPage
                        ? "shadow-md shadow-primary/20 scale-110"
                        : "hover:bg-white hover:shadow-sm",
                    )}
                  >
                    {page}
                  </Button>
                );
              })}

              <Button
                variant="ghost"
                size="sm"
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="size-8 p-0 rounded-lg hover:bg-white hover:shadow-sm cursor-pointer"
                aria-label="Next Page"
                shimmer={false}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;
