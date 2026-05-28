import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, Check, Trash2, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchBuyProposals,
  deleteBuyProposal,
} from "../../features/buy/buyApi";
import { Button } from "../../components/Button";
import { StatusTabs } from "../../components/StatusTabs";
import { Table, Column } from "../../components/Table";
import { cn } from "../../lib/utils";
import { formatDate } from "@/src/utils/formatters";
import { CopyButton } from "@/src/components/common/CopyButton";
import { exportTableToCSV } from "@/src/components/common/ExportData";
import { Modal } from "../../components/Modal";


interface BuyFund {
  _id: string;
  proposal_no: string;
  client_name: string;
  metal_type: string;
  status: string;
  amount: string;
  quantity: string;
  Price: string;
  refinery: string;
  createdAt: string;
}

export const Buy: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [activeView, setActiveView] = useState("In-Progress");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProposalId, setSelectedProposalId] = useState<string | null>(
    null,
  );


  const { buyList, loading } = useSelector((state: RootState) => state.buy);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  React.useEffect(() => {
    let status = "listInProgress";
    if (activeView === "Executed") status = "listExecuted";
    if (activeView === "Expired") status = "listExpired";
    dispatch(fetchBuyProposals(status));
  }, [activeView, dispatch]);

  const getOrdinalSuffix = (num: number) => {
    if (num % 10 === 1 && num % 100 !== 11) return `${num}st`;
    if (num % 10 === 2 && num % 100 !== 12) return `${num}nd`;
    if (num % 10 === 3 && num % 100 !== 13) return `${num}rd`;
    return `${num}th`;
  };
  const columns: Column<BuyFund>[] = [
    {
      key: "proposal_no",
      sortable: true,
      filterable: true,
      header: "Order No.",
      cell: (fund) => <span>{fund.proposal_no}</span>,
    },
    {
      key: "client_name",
      sortable: true,
      filterable: true,
      header: "Investor Name",
      cell: (fund) => <span>{fund.client_name || "-"}</span>,
    },
    {
      key: "refinery",
      sortable: true,
      filterable: true,
      header: "Refinery",
      cell: (fund) => <span>{fund.refinery || "-"}</span>,
    },
    {
      key: "metal_type",
      sortable: true,
      filterable: true,
      header: "Metal Type",
      cell: (fund) => {
        const metal = (fund.metal_type || "gold").toLowerCase();
        const isGold = metal === "gold";
        return (
          <span
            className="px-3.5 py-1 rounded-xl  text-slate-600 capitalize inline-block"
            style={{ backgroundColor: isGold ? "#FFD700" : "#E0E0E0" }}
          >
            {metal}
          </span>
        );
      },
    },
    {
      key: "_id" as any,
      sortable: true,
      filterable: true,
      header: "Link",
      cell: (row) => (
        <CopyButton text={`${baseUrl}/proposaldetails/${row._id}`} />
      ),
    },
    {
      key: "status",
      sortable: true,
      filterable: true,
      header: "Status",
      cell: (fund) => (
        <span
          className="px-3.5 py-1 rounded-xl  text-white inline-block "
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
      cell: (fund) => <span className="">₹ {fund.amount}</span>,
    },
    {
      key: "createdAt",
      sortable: true,
      filterable: true,
      header: "Date",
      cell: (row) => formatDate(row.createdAt),
    },

    ...(activeView === "In-Progress"
      ? [
          {
            key: "actions" as any,
            header: "Actions",
            cell: (fund: BuyFund) => (
              <button
                className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                title="Delete"
                onClick={() => {
                  setSelectedProposalId(fund._id);
                  setIsDeleteModalOpen(true);
                }}
              >
                <Trash2 size={16} />
              </button>
            ),
          },
        ]
      : []),
  ];

  return (
    <div className="flex-1 py-4 px-4 bg-background-light">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        {/* Button - comes first on mobile, moves right on desktop */}
        <div className="flex justify-end md:order-2">
          <Button
            onClick={() => navigate("/dashboard/buy/create-buy-proposal")}
          >
            Create Order
          </Button>
        </div>

        {/* Tabs - below button on mobile, left on desktop */}
        <div className="md:order-1">
          <StatusTabs
            tabs={["In-Progress", "Executed", "Expired"]}
            activeTab={activeView}
            onChange={setActiveView}
          />
        </div>
      </div>

      {/* SIP Data Table Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full"
      >
        <Table
          title={`${activeView} Buy Orders`}
          columns={columns}
          data={buyList}
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
              Do you really want to delete this buy proposal? This action
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
                  dispatch(deleteBuyProposal(selectedProposalId));
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

