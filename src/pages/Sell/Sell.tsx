import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Delete, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchAllSellOrders,
  fetchSellLivePrices,
  deleteSellProposal,
  resendSellProposal,
} from "../../features/sell/sellApi";
import { fetchPortfolio } from "../../features/portfolio/portfolioApi";
import { Button } from "../../components/Button";
import { StatusTabs } from "../../components/StatusTabs";
import { Table, Column } from "../../components/Table";
import { cn } from "../../lib/utils";
import { formatDate } from "@/src/utils/formatters";
import { CopyButton } from "@/src/components/common/CopyButton";
import { exportTableToCSV } from "@/src/components/common/ExportData";
import { Tooltip } from "recharts";
import { TooltipButton } from "@/src/components/TooltipButton";
import { Modal } from "../../components/Modal";
import { AlertCircle } from "lucide-react";

interface SellFund {
  _id: string;
  OrderNo: string;
  clientName: string;
  metalType: string;
  status: string;
  amount: string;
  quantity: string;
  pricePerGram: string;
  refinery: string;
  createdAt: string;
}

export const Sell: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [activeView, setActiveView] = useState("In-Progress");
  const [activeTooltip, setActiveTooltip] = useState<{
    id: string;
    type: "delete" | "resend";
  } | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProposalId, setSelectedProposalId] = useState<string | null>(
    null,
  );

  const { inProgressOrders, executedOrders, expiredOrders, loading } =
    useSelector((state: RootState) => state.sell);
  const { data: portfolio, loading: portfolioLoading } = useSelector(
    (state: RootState) => state.portfolio,
  );
  const { selectedClient } = useSelector((state: RootState) => state.client);
  const [provider, setProvider] = useState<"augmont" | "mmtc">("augmont");

  // Fetch all orders on mount or when tab changes (to ensure fresh data)
  useEffect(() => {
    dispatch(fetchAllSellOrders());
  }, [dispatch, activeView]);

  // Fetch sell live prices for both providers on mount
  useEffect(() => {
    dispatch(fetchSellLivePrices("augmont"));
    dispatch(fetchSellLivePrices("mmtc"));
  }, [dispatch]);

  useEffect(() => {
    const clientId = selectedClient?._id;
    if (clientId) {
      dispatch(fetchPortfolio(clientId));
    }
  }, [dispatch, selectedClient]);

  const activeList = useMemo(() => {
    if (activeView === "Executed") return executedOrders;
    if (activeView === "Expired") return expiredOrders;
    return inProgressOrders;
  }, [activeView, inProgressOrders, executedOrders, expiredOrders]);

  const columns = useMemo(() => {
    const baseColumns: Column<SellFund>[] = [
      {
        key: "OrderNo" as any,
        sortable: true,
        filterable: true,
        header: "Order No.",
        cell: (fund) => <span>{fund.OrderNo || "-"}</span>,
      },
      {
        key: "clientName" as any,
        sortable: true,
        filterable: true,

        header: "Investor Name",
        cell: (fund) => <span>{fund.clientName || "-"}</span>,
      },
      {
        key: "refinery" as any,
        sortable: true,
        filterable: true,

        header: "Refinery",
        cell: (fund) => <span>{fund.refinery || "-"}</span>,
      },
      {
        key: "metalType" as any,
        sortable: true,
        filterable: true,
        header: "Metal Type",
        cell: (fund) => {
          const metal = (fund.metalType || "gold").toLowerCase();
          const isGold = metal === "gold";
          return (
            <span
              className="px-3 py-1 rounded-xl text-slate-600 capitalize inline-block"
              style={{ backgroundColor: isGold ? "#FFD700" : "#E0E0E0" }}
            >
              {metal}
            </span>
          );
        },
      },
      {
        key: "status",
        sortable: true,
        filterable: true,

        header: "Status",
        cell: (fund) => (
          <span
            className="px-3 py-1 rounded-xl text-[12px] text-white inline-block "
            style={{ backgroundColor: "rgb(74 42 125)" }}
          >
            {fund.status?.replace(/-/g, " ") || "-"}
          </span>
        ),
      },
      {
        key: "amount",
        sortable: true,
        filterable: true,
        header: "Amount(₹)",
        cell: (fund) => <span>₹ {fund.amount}</span>,
      },
      {
        key: "createdAt",
        sortable: true,
        filterable: true,
        header: "Date",
        cell: (row) => formatDate(row.createdAt),
      },
    ];

    if (activeView === "In-Progress") {
      baseColumns.push(
        {
          key: "actions" as any,
          header: "Actions",
          cell: (row) => (
            <button
              className="p-2 rounded-lg text-red-500 hover:bg-red-100 transition-colors cursor-pointer"
              title="Delete"
              onClick={() => {
                setSelectedProposalId(row._id);
                setIsDeleteModalOpen(true);
              }}
            >
              <Trash2 size={16} />
            </button>
          ),
        },
        {
          key: "resendLink" as any,
          header: "Resend Link",
          cell: (row) => (
            <button
              className="p-2 rounded-lg text-green-500 hover:bg-green-100 transition-colors cursor-pointer"
              title="Resend Link"
              onClick={() => {
                dispatch(resendSellProposal(row.OrderNo));
              }}
            >
              <Send size={16} />
            </button>
          ),
        },
      );
    }

    return baseColumns;
  }, [activeView, dispatch]);

  return (
    <div className="flex-1 py-4 px-4 bg-background-light">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <div className="flex justify-end md:order-2">
          <Button onClick={() => navigate("/dashboard/sell/create-sell-order")}>
            Create Order
          </Button>
        </div>

        <div className="md:order-1">
          <StatusTabs
            tabs={["In-Progress", "Executed", "Expired"]}
            activeTab={activeView}
            onChange={setActiveView}
          />
        </div>
      </div>

      {/* Portfolio Cards - shown when an investor is selected */}
      {selectedClient && (
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-700">
              {selectedClient.name} - Portfolio Balance
            </h3>
            <div className="flex p-0.5 bg-slate-100 rounded-lg">
              <button
                onClick={() => setProvider("augmont")}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-semibold transition-all",
                  provider === "augmont"
                    ? "bg-white text-primary shadow-sm"
                    : "text-slate-400 hover:text-slate-600",
                )}
              >
                Augmont
              </button>
              <button
                onClick={() => setProvider("mmtc")}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-semibold transition-all",
                  provider === "mmtc"
                    ? "bg-white text-primary shadow-sm"
                    : "text-slate-400 hover:text-slate-600",
                )}
              >
                MMTC-PAMP
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Gold Card */}
            <div className="rounded-xl p-4 border border-amber-200 bg-amber-50/50">
              <div className="flex items-center gap-2 mb-3">
                <div className="size-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-xs font-bold">
                  Au
                </div>
                <span className="text-sm font-semibold text-amber-800">Gold</span>
              </div>
              {portfolioLoading ? (
                <div className="space-y-2">
                  <div className="h-7 w-24 bg-amber-200/50 animate-pulse rounded" />
                  <div className="h-4 w-32 bg-amber-200/30 animate-pulse rounded" />
                </div>
              ) : (
                <>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-2xl font-bold text-amber-900">
                      {portfolio[provider].gold.available.toFixed(4)}
                    </span>
                    <span className="text-sm font-medium text-amber-600">g</span>
                  </div>
                  {portfolio[provider].gold.locked > 0 && (
                    <p className="text-xs text-amber-500 mb-2">
                      {portfolio[provider].gold.locked.toFixed(4)} g locked
                    </p>
                  )}
                  <div className="border-t border-amber-200 pt-2 mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Invested</span>
                      <span className="font-semibold text-slate-700">
                        ₹{portfolio[provider].gold.investedAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Current</span>
                      <span className="font-semibold text-slate-700">
                        ₹{portfolio[provider].gold.currentAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">P&L</span>
                      <span
                        className={cn(
                          "font-semibold",
                          portfolio[provider].gold.profitORloss >= 0
                            ? "text-green-600"
                            : "text-red-600",
                        )}
                      >
                        {portfolio[provider].gold.profitORloss >= 0 ? "+" : ""}
                        ₹{portfolio[provider].gold.profitORloss.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        {" ("}
                        {portfolio[provider].gold.percent >= 0 ? "+" : ""}
                        {portfolio[provider].gold.percent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Silver Card */}
            <div className="rounded-xl p-4 border border-slate-200 bg-slate-50/50">
              <div className="flex items-center gap-2 mb-3">
                <div className="size-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold">
                  Ag
                </div>
                <span className="text-sm font-semibold text-slate-700">Silver</span>
              </div>
              {portfolioLoading ? (
                <div className="space-y-2">
                  <div className="h-7 w-24 bg-slate-200/50 animate-pulse rounded" />
                  <div className="h-4 w-32 bg-slate-200/30 animate-pulse rounded" />
                </div>
              ) : (
                <>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-2xl font-bold text-slate-900">
                      {portfolio[provider].silver.available.toFixed(4)}
                    </span>
                    <span className="text-sm font-medium text-slate-500">g</span>
                  </div>
                  {portfolio[provider].silver.locked > 0 && (
                    <p className="text-xs text-slate-500 mb-2">
                      {portfolio[provider].silver.locked.toFixed(4)} g locked
                    </p>
                  )}
                  <div className="border-t border-slate-200 pt-2 mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Invested</span>
                      <span className="font-semibold text-slate-700">
                        ₹{portfolio[provider].silver.investedAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Current</span>
                      <span className="font-semibold text-slate-700">
                        ₹{portfolio[provider].silver.currentAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">P&L</span>
                      <span
                        className={cn(
                          "font-semibold",
                          portfolio[provider].silver.profitORloss >= 0
                            ? "text-green-600"
                            : "text-red-600",
                        )}
                      >
                        {portfolio[provider].silver.profitORloss >= 0 ? "+" : ""}
                        ₹{portfolio[provider].silver.profitORloss.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        {" ("}
                        {portfolio[provider].silver.percent >= 0 ? "+" : ""}
                        {portfolio[provider].silver.percent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full"
      >
        <Table
          title={`${activeView} Sell Orders`}
          columns={columns}
          data={activeList}
          entriesPerPage={10}
          loading={loading}
          selectable
          onExportAll={(data) =>
            exportTableToCSV(data, columns, "top_investors_all.csv")
          }
          onExportSelected={(data) =>
            exportTableToCSV(data, columns, "top_investors_selected.csv")
          }
        />
      </motion.div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
        size="sm"
      >
        <div className="flex flex-col items-center text-center space-y-4 py-2">
          <div className="size-16 bg-red-100 rounded-full flex items-center justify-center text-red-600">
            <AlertCircle size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900">Are you sure?</h3>
            <p className="text-sm text-slate-500 max-w-[280px]">
              Do you really want to delete this sell proposal? This action
              cannot be undone.
            </p>
          </div>
          <div className="flex w-full gap-3 mt-4">
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setIsDeleteModalOpen(false)}
              className="bg-slate-100 text-slate-600 border-none hover:bg-slate-200"
            >
              No, Cancel
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                if (selectedProposalId) {
                  dispatch(deleteSellProposal(selectedProposalId));
                  setIsDeleteModalOpen(false);
                }
              }}
              className="bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20"
            >
              Yes, Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
