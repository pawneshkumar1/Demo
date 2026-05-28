import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "motion/react";

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Map path segments to display titles
  const segmentToTitle: Record<string, string> = {
    dashboard: "Dashboard",
    investors: "Investors",
    sip: "SIP Order",
    buy: "Buy Gold/Silver",
    sell: "Sell Gold/Silver",
    jewellery: "Jewellery",
    earnings: "Earnings",
    sales: "Sales Performance",
    invoice: "Invoices",
    template: "Templates",
    knowledge: "Knowledge Base",
    kyc: "KYC Verification",
    reports: "Reports",
    lumpsum: "Lumpsum Report",
    "sip-booked": "SIP Booked Report",
    "sip-mining": "SIP Mining Report",
    "sip-business": "SIP Business Report",
    compliance: "Compliance Report",
    inactive: "Inactive Investors Report",
    "missing-sip": "Missing SIP Report",
    profile: "Profile",
    "reset-password": "Reset Password",
    "create-sip": "Select Investor",
    "final-create-sip": "Finalize SIP",
    "create-buy": "Select Investor",
    "final-create-buy": "Finalize Buy",
    "create-sell": "Select Investor",
    "final-create-sell": "Finalize Sell",
    "buy-jewellery": "Select Investor",
    "buy-selected-jewellery": "Select Item",
    details: "Item Details",
    checkout: "Checkout",
    "view-transactions": "Transactions",
  };

  const getBreadcrumbs = () => {
    // Normalize path
    const segments = location.pathname.split("/").filter(Boolean);

    // Remove dynamic productId from breadcrumbs
    const filteredSegments = segments.filter((segment, index) => {
      const nextSegment = segments[index + 1];

      // Hide productId before details or checkout
      if (
        nextSegment &&
        (nextSegment.toLowerCase() === "details" ||
          nextSegment.toLowerCase() === "checkout")
      ) {
        return false;
      }

      return true;
    });

    const crumbs = filteredSegments.map((segment, index) => {
      const path = `/${filteredSegments.slice(0, index + 1).join("/")}`;

      const title =
        segmentToTitle[segment.toLowerCase()] ||
        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

      return {
        title,
        path,
        segment: segment.toLowerCase(),
      };
    });

    // If only dashboard exists
    if (crumbs.length === 1 && crumbs[0].segment === "dashboard") {
      return crumbs;
    }

    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  // Hide breadcrumbs when route doesn't match any known segment (e.g. 404 pages)
  const segments = location.pathname.split("/").filter(Boolean);
  const hasKnownSegment = segments.some(
    (s) => s.toLowerCase() !== "dashboard" && segmentToTitle[s.toLowerCase()]
  );
  if (segments.length > 1 && !hasKnownSegment) return null;

  const pageHeading = breadcrumbs[breadcrumbs.length - 1]?.title || "Dashboard";

  const handleCrumbClick = (path: string, segment: string) => {
    if (segment === "reports") {
      navigate("/dashboard/reports/lumpsum");
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <div className="bg-slate-50">
        <section className="bg-primary/5 py-2 px-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 -z-0" />

          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col">
              {/* Page Heading */}
              <span className="font-semibold text-slate-900 leading-tight">
                {pageHeading}
              </span>

              {/* Desktop Breadcrumbs */}
              <ol className="hidden sm:flex items-center space-x-2 text-sm font-semibold whitespace-nowrap mt-1">
                {breadcrumbs.map((crumb, index) => {
                  const isLast = index === breadcrumbs.length - 1;
                  const isFirst = index === 0;

                  return (
                    <React.Fragment key={crumb.path}>
                      <li className="flex items-center">
                        <motion.button
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() =>
                            handleCrumbClick(crumb.path, crumb.segment)
                          }
                          disabled={isLast}
                          className={`flex items-center gap-1.5 transition-colors ${
                            isLast
                              ? "text-slate-900 cursor-default"
                              : "text-slate-400 hover:text-primary"
                          }`}
                        >
                          {isFirst && <Home className="w-2.5 h-2.5" />}

                          <span className="text-[12px]">{crumb.title}</span>
                        </motion.button>
                      </li>

                      {!isLast && (
                        <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                      )}
                    </React.Fragment>
                  );
                })}
              </ol>
            </div>

            {/* Right Side Welcome */}
            <div className="flex items-center gap-1">
              <span className="text-sm sm:text-sm text-slate-900 leading-none">
                Welcome Back,
              </span>

              <span className="text-sm sm:text-base font-semibold text-slate-900">
                User
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { ChevronRight, Home } from "lucide-react";
// import { motion } from "motion/react";

// export const Breadcrumbs: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Map path segments to display titles
//   const segmentToTitle: Record<string, string> = {
//     dashboard: "Dashboard",
//     investors: "Investors",
//     sip: "SIP Order",
//     buy: "Buy Gold/Silver",
//     sell: "Sell Gold/Silver",
//     jewellery: "Jewellery",
//     earnings: "Earnings",
//     sales: "Sales Performance",
//     invoice: "Invoices",
//     template: "Templates",
//     knowledge: "Knowledge Base",
//     kyc: "KYC Verification",
//     reports: "Reports",
//     lumpsum: "Lumpsum Report",
//     "sip-booked": "SIP Booked Report",
//     "sip-mining": "SIP Mining Report",
//     "sip-business": "SIP Business Report",
//     compliance: "Compliance Report",
//     inactive: "Inactive Investors Report",
//     "missing-sip": "Missing SIP Report",
//     profile: "Profile",
//     "reset-password": "Reset Password",
//     "create-sip": "Select Investor",
//     "final-create-sip": "Finalize SIP",
//     "create-buy": "Select Investor",
//     "final-create-buy": "Finalize Buy",
//     "create-sell": "Select Investor",
//     "final-create-sell": "Finalize Sell",
//     "buy-jewellery": "Select Investor",
//     "buy-selected-jewellery": "Select Item",
//     details: "Item Details",
//     checkout: "Checkout",
//     "view-transactions": "Transactions",
//   };

// const getBreadcrumbs = () => {
//     // Normalize path and remove leading/trailing slashes
//     const segments = location.pathname.split("/").filter(Boolean);

//     // Always start with Dashboard as the first crumb if we're in the dashboard area
//     const crumbs = segments.map((segment, index) => {
//       const path = `/${segments.slice(0, index + 1).join("/")}`;

//       // Special handling for jewellery product details - show generic title
//       if (
//         (segment.toLowerCase() === "details" || segment.toLowerCase() === "checkout") &&
//         index > 0 &&
//         segments[index - 1] &&
//         /^\d+$/.test(segments[index - 1])
//       ) {
//         return {
//           title: segment.toLowerCase() === "details" ? "Item Details" : "Checkout",
//           path,
//           segment: segment.toLowerCase(),
//         };
//       }

//       const title =
//         segmentToTitle[segment.toLowerCase()] ||
//         segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
//       return { title, path, segment: segment.toLowerCase() };
//     });

//     // If we're at just /dashboard, limit to one crumb
//     if (crumbs.length === 1 && crumbs[0].segment === "dashboard") {
//       return crumbs;
//     }

//     return crumbs;
//   };

//   const breadcrumbs = getBreadcrumbs();
//   const pageHeading = breadcrumbs[breadcrumbs.length - 1]?.title || "Dashboard";

//   const handleCrumbClick = (path: string, segment: string) => {
//     // Special handling for parent categories that don't have their own full page
//     if (segment === "reports") {
//       navigate("/dashboard/reports/lumpsum");
//     } else {
//       navigate(path);
//     }
//   };

//   return (
//     <>
//       <div className="bg-slate-50">
//         <section className="bg-primary/5 py-2 px-4 relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 -z-0" />
//           <div className="flex items-center justify-between gap-3">
//             <div className="flex flex-col">
//               <span className="font-semibold text-slate-900 leading-tight">
//                 {pageHeading}
//               </span>
//               {/* Desktop Breadcrumbs (Full) */}
//               <ol className="hidden sm:flex items-center space-x-2 text-sm font-semibold whitespace-nowrap mt-1">
//                 {breadcrumbs.map((crumb, index) => {
//                   const isLast = index === breadcrumbs.length - 1;
//                   const isFirst = index === 0;

//                   return (
//                     <React.Fragment key={crumb.path}>
//                       <li className="flex items-center">
//                         <motion.button
//                           initial={{ opacity: 0, x: -10 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ delay: index * 0.05 }}
//                           onClick={() =>
//                             handleCrumbClick(crumb.path, crumb.segment)
//                           }
//                           disabled={isLast}
//                           className={`flex items-center gap-1.5 transition-colors ${
//                             isLast
//                               ? "text-slate-900 cursor-default"
//                               : "text-slate-400 hover:text-primary"
//                           }`}
//                         >
//                           {isFirst && <Home className="w-2.5 h-2.5" />}
//                           <span className="text-[12px]">{crumb.title}</span>
//                         </motion.button>
//                       </li>
//                       {!isLast && (
//                         <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
//                       )}
//                     </React.Fragment>
//                   );
//                 })}
//               </ol>

//               {/* Mobile Breadcrumbs (Max 3, sliding window) */}
//               {/* <ol className="flex sm:hidden items-center space-x-2 text-sm font-semibold whitespace-nowrap mt-1">
//                 {breadcrumbs.length > 3 && (
//                   <li className="flex items-center gap-2">
//                     <span className="text-slate-400">...</span>
//                     <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
//                   </li>
//                 )}
//                 {breadcrumbs.slice(-3).map((crumb, index, array) => {
//                   const isLast = index === array.length - 1;
//                   const isAbsoluteFirst = crumb.segment === "dashboard";

//                   return (
//                     <React.Fragment key={crumb.path}>
//                       <li className="flex items-center">
//                         <button
//                           onClick={() =>
//                             handleCrumbClick(crumb.path, crumb.segment)
//                           }
//                           disabled={isLast}
//                           className={`flex items-center gap-1.5 transition-colors ${
//                             isLast
//                               ? "text-slate-900 cursor-default"
//                               : "text-slate-400"
//                           }`}
//                         >
//                           {isAbsoluteFirst && <Home className="w-3.5 h-3.5" />}
//                           <span>{crumb.title}</span>
//                         </button>
//                       </li>
//                       {!isLast && (
//                         <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
//                       )}
//                     </React.Fragment>
//                   );
//                 })}
//               </ol> */}
//             </div>
//             {/* Right Side Welcome Section */}
//             <div className="flex items-center gap-1">
//               <span className="text-sm sm:text-sm text-slate-900 leading-none">
//                 Welcome Back,
//               </span>

//               <span className="text-sm sm:text-base font-semibold text-slate-900">
//                 User
//               </span>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// };
