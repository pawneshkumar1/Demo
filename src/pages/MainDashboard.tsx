import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Sidebar } from "../components/Dashboard/Sidebar";
import { Header } from "../components/Dashboard/Header";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { RootState } from "../redux/store";

import { LazyLoading } from "../components/LazyLoading";

// Lazy loaded main pages
const Dashboard = React.lazy(() =>
  import("../components/Dashboard/Dashboard").then((m) => ({
    default: m.Dashboard,
  })),
);
const EmployeeDashboard = React.lazy(() =>
  import("../components/Dashboard/EmployeeDashboard").then((m) => ({
    default: m.EmployeeDashboard,
  })),
);
const SubPartnerDashboard = React.lazy(() =>
  import("../components/Dashboard/SubPartnerDashboard").then((m) => ({
    default: m.SubPartnerDashboard,
  })),
);
const Investors = React.lazy(() =>
  import("./Investors/Investors").then((m) => ({ default: m.Investors })),
);
const SIP = React.lazy(() =>
  import("./SIP/SIP").then((m) => ({ default: m.SIP })),
);
// const CreateSIP = React.lazy(() =>
//   import("./SIP/CreateSIP").then((m) => ({ default: m.CreateSIP })),
// );
const FinalCreateSIP = React.lazy(() =>
  import("./SIP/FinalCreateSIP").then((m) => ({ default: m.FinalCreateSIP })),
);
const Buy = React.lazy(() =>
  import("./Buy/Buy").then((m) => ({ default: m.Buy })),
);
// const CreateBuy = React.lazy(() =>
//   import("./Buy/CreateBuy").then((m) => ({ default: m.CreateBuy })),
// );
const FinalCreateBuy = React.lazy(() =>
  import("./Buy/FinalCreateBuy").then((m) => ({ default: m.FinalCreateBuy })),
);
const Sell = React.lazy(() =>
  import("./Sell/Sell").then((m) => ({ default: m.Sell })),
);
// const CreateSell = React.lazy(() =>
//   import("./Sell/CreateSell").then((m) => ({ default: m.CreateSell })),
// );
const FinalCreateSell = React.lazy(() =>
  import("./Sell/FinalCreateSell").then((m) => ({
    default: m.FinalCreateSell,
  })),
);

const Jewellery = React.lazy(() =>
  import("./Jewellery/Jewellery").then((m) => ({ default: m.Jewellery })),
);
// const BuyJewellery = React.lazy(() =>
//   import("./Jewellery/BuyJewellery").then((m) => ({ default: m.BuyJewellery })),
// );
const BuySelectedJewellery = React.lazy(() =>
  import("./Jewellery/BuySelectedJewellery").then((m) => ({
    default: m.BuySelectedJewellery,
  })),
);
const ViewJewelleryDetails = React.lazy(() =>
  import("./Jewellery/ViewJewelleryDetails").then((m) => ({
    default: m.ViewJewelleryDetails,
  })),
);
const JewelleryCheckout = React.lazy(() =>
  import("./Jewellery/JewelleryCheckout").then((m) => ({
    default: m.JewelleryCheckout,
  })),
);
const Earnings = React.lazy(() =>
  import("./Earnings/Earnings").then((m) => ({ default: m.Earnings })),
);
const Sales = React.lazy(() =>
  import("./Sales/Sales").then((m) => ({ default: m.Sales })),
);
const Invoice = React.lazy(() =>
  import("./Invoice/Invoice").then((m) => ({ default: m.Invoice })),
);
const Template = React.lazy(() =>
  import("./Template/Template").then((m) => ({ default: m.Template })),
);
const Knowledge = React.lazy(() =>
  import("./Knowledge/Knowledge").then((m) => ({ default: m.Knowledge })),
);
const Kyc = React.lazy(() =>
  import("./Kyc/Kyc").then((m) => ({ default: m.Kyc })),
);
const Profile = React.lazy(() =>
  import("./Profile/Profile").then((m) => ({ default: m.Profile })),
);
const ResetPassword = React.lazy(() =>
  import("./ResetPassword/ResetPassword").then((m) => ({
    default: m.ResetPassword,
  })),
);
const CreateTemplate = React.lazy(() =>
  import("./CreateTemplate/CreateTemplate").then((m) => ({
    default: m.CreateTemplate,
  })),
);
// Lazy loaded reports sub-pages
const Lumpsum = React.lazy(() =>
  import("./Reports/Lumpsum/Lumpsum").then((m) => ({ default: m.Lumpsum })),
);
const SIPBooked = React.lazy(() =>
  import("./Reports/SIPBooked/SIPBooked").then((m) => ({
    default: m.SIPBooked,
  })),
);
const SIPMining = React.lazy(() =>
  import("./Reports/SIPMining/SIPMining").then((m) => ({
    default: m.SIPMining,
  })),
);
const SIPBusiness = React.lazy(() =>
  import("./Reports/SIPBusiness/SIPBusiness").then((m) => ({
    default: m.SIPBusiness,
  })),
);
const Compliance = React.lazy(() =>
  import("./Reports/Compliance/Compliance").then((m) => ({
    default: m.Compliance,
  })),
);
const Inactive = React.lazy(() =>
  import("./Reports/Inactive/Inactive").then((m) => ({ default: m.Inactive })),
);
const MissingSIP = React.lazy(() =>
  import("./Reports/MissingSIP/MissingSIP").then((m) => ({
    default: m.MissingSIP,
  })),
);
const ViewTransactions = React.lazy(() =>
  import("./Investors/ViewTransactions").then((m) => ({
    default: m.ViewTransactions,
  })),
);
const KycDone = React.lazy(() =>
  import("./Kyc/KycDone").then((m) => ({ default: m.KycDone })),
);
const PageNotFound = React.lazy(() =>
  import("./PageNotFound").then((m) => ({ default: m.PageNotFound })),
);

const RootDashboard: React.FC<{ userType: string | null }> = ({ userType }) => {
  if (userType === "subPartner") return <SubPartnerDashboard />;
  if (userType === "employee") return <EmployeeDashboard />;
  return <Dashboard />;
};

export const MainDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { userType } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isMobileOpen={isSidebarOpen}
        onMobileClose={() => setIsSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onCollapseToggle={() => setIsSidebarCollapsed((prev) => !prev)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <Header
          setIsSidebarOpen={setIsSidebarOpen}
          onCollapseToggle={() => setIsSidebarCollapsed((prev) => !prev)}
        />
        <Breadcrumbs />
        <LazyLoading minHeight="60vh">
          <Routes>
            <Route path="/" element={<RootDashboard userType={userType} />} />
            <Route path="investors" element={<Investors />} />
            <Route path="sip" element={<SIP />} />
            {/* <Route path="sip/create-sip" element={<CreateSIP />} /> */}
            <Route
              path="sip/create-sip-proposal"
              element={<FinalCreateSIP />}
            />
            <Route path="buy" element={<Buy />} />
            {/* <Route path="buy/create-buy" element={<CreateBuy />} /> */}
            <Route
              path="buy/create-buy-proposal"
              element={<FinalCreateBuy />}
            />
            <Route path="sell" element={<Sell />} />
            {/* <Route path="sell/create-sell" element={<CreateSell />} /> */}
            <Route
              path="sell/create-sell-order"
              element={<FinalCreateSell />}
            />
            <Route path="jewellery" element={<Jewellery />} />
            {/* <Route path="jewellery/buy-jewellery" element={<BuyJewellery />} /> */}
            <Route
              path="jewellery/buy-selected-jewellery"
              element={<BuySelectedJewellery />}
            />
            <Route
              path="jewellery/buy-selected-jewellery/:productId/details"
              element={<ViewJewelleryDetails />}
            />
            <Route
              path="jewellery/buy-selected-jewellery/:productId/checkout"
              element={<JewelleryCheckout />}
            />
            <Route path="earnings" element={<Earnings />} />
            <Route path="sales" element={<Sales />} />
            <Route path="invoice" element={<Invoice />} />
            <Route path="template" element={<Template />} />
            <Route path="knowledge" element={<Knowledge />} />
            <Route path="investors/kyc" element={<Kyc />} />
            <Route path="investors/kyc-details" element={<KycDone />} />
            <Route path="profile" element={<Profile />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="create-template" element={<CreateTemplate />} />
            <Route
              path="investors/view-transactions"
              element={<ViewTransactions />}
            />

            {/* Reports Routes */}
            <Route path="reports/lumpsum" element={<Lumpsum />} />
            <Route path="reports/sip-booked" element={<SIPBooked />} />
            <Route path="reports/sip-mining" element={<SIPMining />} />
            <Route path="reports/sip-business" element={<SIPBusiness />} />
            <Route path="reports/compliance" element={<Compliance />} />
            <Route path="reports/inactive" element={<Inactive />} />
            <Route path="reports/missing-sip" element={<MissingSIP />} />

            {/* Fallback */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </LazyLoading>
      </div>
    </div>
  );
};
