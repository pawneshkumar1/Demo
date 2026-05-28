import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, Check } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../../components/Button";
import { StatusTabs } from "../../components/StatusTabs";
import { Table, Column } from "../../components/Table";
import { cn } from "../../lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchJewelleryOrders } from "../../features/jewellery/jewelleryApi";
import { formatDate } from "@/src/utils/formatters";
import { CopyButton } from "@/src/components/common/CopyButton";
import { exportTableToCSV } from "@/src/components/common/ExportData";

interface JewelleryOrder {
  _id: string;
  order_no: string;
  client_name: string;
  metalType?: string;
  metal_type?: string;
  status: string;
  createdAt: string;
  productDetails?: Array<{
    finalOrderPrice: number;
    metal_type?: string;
    quantity: number;
    weight: number;
    productName: string;
    product_img: string;
  }>;
  orderdetails?: Array<{
    finalOrderPrice: number;
  }>;
  // Fields for Executed/History orders
  product?: {
    productName: string;
    weight: number;
    sku: string;
  };
  product_img?: string;
  quantity?: number;
}

// Mock funds removed

export const Jewellery: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [activeView, setActiveView] = useState("In-Progress");

  const { jewelleryOrders, loading, error } = useSelector(
    (state: RootState) => state.jewellery,
  );

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const getFilteredData = () => {
    switch (activeView) {
      case "In-Progress":
        return jewelleryOrders.PendingOrder;
      case "History":
        return jewelleryOrders.ExecutedOrder;
      // case "Inactive":
      //   return jewelleryOrders.CancelledOrder;
      default:
        return [];
    }
  };

  const currentData = getFilteredData();

  React.useEffect(() => {
    dispatch(fetchJewelleryOrders());
  }, [dispatch]);

  const columns: Column<JewelleryOrder>[] = [
    {
      key: "order_no",
      sortable: true,
      filterable: true,
      header: "Order No.",
      cell: (item) => <span>{item.order_no}</span>,
    },
    {
      key: "client_name",
      sortable: true,
      filterable: true,
      header: "Investor Name",
      cell: (item) => <span>{item.client_name || "_"}</span>,
    },
    {
      key: "product_img",
      sortable: true,
      filterable: true,
      header: "Product Image",
      cell: (item) => {
        const img =
          item.productDetails?.[0]?.product_img ||
          (item.product_img !== "0" ? item.product_img : null);
        return img ? (
          <div className="flex justify-center">
            <img src={img} alt="product" className="w-10 h-10 rounded" />
          </div>
        ) : (
          "_"
        );
      },
    },
    {
      key: "productName",
      sortable: true,
      filterable: true,
      header: "Product Name",
      cell: (item) => (
        <span>
          {item.productDetails?.[0]?.productName ||
            item.product?.productName ||
            "_"}
        </span>
      ),
    },
    {
      key: "weight",
      sortable: true,
      filterable: true,
      header: "Weight(g)",
      cell: (item) => (
        <span>
          {item.productDetails?.[0]?.weight || item.product?.weight || "_"}
        </span>
      ),
    },
    {
      key: "quantity",
      sortable: true,
      filterable: true,
      header: "Quantity",
      cell: (item) => (
        <span>
          {item.productDetails?.[0]?.quantity || item.quantity || "_"}
        </span>
      ),
    },
    {
      key: "metal_type",
      sortable: true,
      filterable: true,
      header: "Metal Type",
      cell: (item) => {
        const metalType = (
          item.metalType ||
          item.metal_type ||
          item.productDetails?.[0]?.metal_type ||
          "GOLD"
        ).toUpperCase();
        const backgroundColor = metalType === "GOLD" ? "#FFD700" : "#E0E0E0";

        return (
          <span
            className="px-3 py-1 rounded-xl text-[12px] text-sate-600 capitalize inline-block"
            style={{ backgroundColor }}
          >
            {metalType.toLowerCase()}
          </span>
        );
      },
    },
    {
      key: "id",
      sortable: true,
      filterable: true,
      header: "Link",
      cell: (row) => (
        <CopyButton
          text={`${baseUrl}/emi/partner_portal/Orderdetails/${row.order_no}`}
        />
      ),
    },
    {
      key: "status",
      sortable: true,
      filterable: true,
      header: "Status",
      cell: (item) => (
        <span
          className="px-3 py-1 rounded-xl text-[12px]  text-white inline-block"
          style={{ backgroundColor: "rgb(74 42 125)" }}
        >
          {item.status.replace(/-/g, " ")}
        </span>
      ),
    },
    {
      key: "amount",
      sortable: true,
      filterable: true,
      header: "Amount(₹)",
      cell: (item) => {
        const amount =
          item.productDetails?.[0]?.finalOrderPrice ||
          item.orderdetails?.[0]?.finalOrderPrice ||
          0;
        return <span>₹ {amount}</span>;
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

  return (
    <div className="flex-1 py-4 px-4 bg-background-light">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        {/* Button - comes first on mobile, moves right on desktop */}
        <div className="flex justify-end md:order-2">
          <Button
            onClick={() =>
              navigate("/dashboard/jewellery/buy-selected-jewellery")
            }
          >
            Create Order
          </Button>
        </div>

        {/* Tabs - below button on mobile, left on desktop */}
        <div className="md:order-1">
          <StatusTabs
            tabs={["In-Progress", "History"]}
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
          title="Jewellery Orders"
          columns={columns.filter(
            (col) => !(activeView === "History" && col.key === "id"),
          )}
          data={currentData}
          entriesPerPage={10}
          loading={loading}
          selectable
          onExportAll={(data) =>
            exportTableToCSV(
              data,
              columns.filter(
                (col) => !(activeView === "History" && col.key === "id"),
              ),
              "top_investors_all.csv",
            )
          }
          onExportSelected={(data) =>
            exportTableToCSV(
              data,
              columns.filter(
                (col) => !(activeView === "History" && col.key === "id"),
              ),
              "top_investors_selected.csv",
            )
          }
        />
      </motion.div>
    </div>
  );
};
