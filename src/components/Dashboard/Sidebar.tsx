import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  TrendingDown,
  Gem,
  CircleDollarSign,
  BarChart3,
  FileText,
  LayoutGrid,
  BookOpen,
  PieChart,
  ChevronDown,
  X,
  Layers,
  CalendarCheck,
  Pickaxe,
  LineChart,
  ShieldCheck,
  UserX,
  AlertCircle,
  CalendarDays,
  BanknoteArrowUp,
  BanknoteArrowDown,
  BadgeIndianRupee,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import roundedLogoIcon from "../../assets/logo/BatukRoundedLogo.avif";
import PoweredByBatuk from "../PoweredByBatuk";

export interface SidebarSubItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

export interface SidebarNavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  children?: SidebarSubItem[];
}

export const DEFAULT_SIDEBAR_ITEMS: SidebarNavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Users, label: "Investors", path: "/dashboard/investors" },
  { icon: CalendarDays, label: "SIP", path: "/dashboard/sip" },
  { icon: BanknoteArrowUp, label: "Buy Gold/Silver", path: "/dashboard/buy" },
  {
    icon: BanknoteArrowDown,
    label: "Sell Gold/Silver",
    path: "/dashboard/sell",
  },
  { icon: Gem, label: "Jewellery", path: "/dashboard/jewellery" },
  { icon: BadgeIndianRupee, label: "Earnings", path: "/dashboard/earnings" },
  { icon: BarChart3, label: "Sales", path: "/dashboard/sales" },
  { icon: FileText, label: "Invoice", path: "/dashboard/invoice" },
  { icon: LayoutGrid, label: "Template", path: "/dashboard/template" },
  { icon: BookOpen, label: "Knowledge Base", path: "/dashboard/knowledge" },
  {
    icon: PieChart,
    label: "Reports",
    path: "/dashboard/reports",
    children: [
      { icon: Layers, label: "Lumpsum", path: "/dashboard/reports/lumpsum" },
      {
        icon: CalendarCheck,
        label: "SIP Booked",
        path: "/dashboard/reports/sip-booked",
      },
      {
        icon: Pickaxe,
        label: "SIP Mining",
        path: "/dashboard/reports/sip-mining",
      },
      {
        icon: LineChart,
        label: "SIP Business Report",
        path: "/dashboard/reports/sip-business",
      },
      {
        icon: ShieldCheck,
        label: "Compliance Report",
        path: "/dashboard/reports/compliance",
      },
      {
        icon: UserX,
        label: "Inactive Investors",
        path: "/dashboard/reports/inactive",
      },
      {
        icon: AlertCircle,
        label: "Missing SIP",
        path: "/dashboard/reports/missing-sip",
      },
    ],
  },
];

interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
  isCollapsed: boolean;
  onCollapseToggle: () => void;
  items?: SidebarNavItem[];
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isMobileOpen,
  onMobileClose,
  isCollapsed,
  items = DEFAULT_SIDEBAR_ITEMS,
  onLogout,
}) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleItemClick = (item: SidebarNavItem, collapsed: boolean) => {
    if (item.children && item.children.length > 0) {
      setExpandedItem((prev) => (prev === item.label ? null : item.label));
    } else {
      navigate(item.path);
      if (!collapsed) onMobileClose();
    }
  };

  const renderContent = (collapsed = false) => (
    <>
      <div
        className={cn(
          "p-[10.5px] flex items-center bg-primary relative",
          collapsed ? "justify-center" : "justify-start",
        )}
      >
        <div className="flex items-center justify-center overflow-hidden">
          {collapsed ? (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center"
            >
              <img
                src={roundedLogoIcon}
                alt="Icon"
                className="w-11 h-11 object-contain"
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center"
            >
              <img
                src="/new-ui/logo.png"
                alt="Full Logo"
                className="h-11 w-auto object-contain"
              />
            </motion.div>
          )}
        </div>
        {!collapsed && (
          <button
            onClick={onMobileClose}
            className="lg:hidden absolute right-4 p-2 text-white/70 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav
        className={cn(
          "flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar shadow-inner",
          collapsed && "px-2",
        )}
      >
        {items.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedItem === item.label;

          // Better active state logic for nested routes
          const isActive =
            item.path === "/dashboard"
              ? location.pathname === "/dashboard"
              : location.pathname === item.path ||
                location.pathname.startsWith(item.path + "/");

          return (
            <div key={item.label}>
              <div
                onClick={() => handleItemClick(item, collapsed)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group relative",
                  isActive && !hasChildren
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : isActive && hasChildren
                      ? "bg-primary/10 text-primary"
                      : "text-slate-600 hover:bg-primary/5 hover:text-primary",
                  collapsed && "justify-center px-0",
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 shrink-0",
                    isActive && !hasChildren
                      ? "text-white"
                      : isActive
                        ? "text-primary"
                        : "text-slate-600 group-hover:text-primary",
                  )}
                />
                {!collapsed && (
                  <span className="text-sm font-medium whitespace-nowrap overflow-hidden flex-1">
                    {item.label}
                  </span>
                )}
                {!collapsed && hasChildren && (
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 shrink-0 transition-transform duration-300",
                      isExpanded && "rotate-180",
                      isActive
                        ? "text-primary"
                        : "text-slate-400 group-hover:text-primary",
                    )}
                  />
                )}
              </div>

              <AnimatePresence>
                {hasChildren && !collapsed && isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="ml-3 mt-1 pl-1 border-l-2 border-primary/20 space-y-0.5 pb-1">
                      {item.children!.map((child) => {
                        const isChildActive =
                          location.pathname === child.path ||
                          location.pathname.startsWith(child.path + "/");
                        return (
                          <div
                            key={child.path}
                            onClick={() => {
                              navigate(child.path);
                              onMobileClose();
                            }}
                            className={cn(
                              "flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 group/child",
                              isChildActive
                                ? "bg-primary text-white shadow-md shadow-primary/20"
                                : "text-slate-600 hover:bg-primary/5 hover:text-primary",
                            )}
                          >
                            <child.icon
                              className={cn(
                                "w-4 h-4 shrink-0",
                                isChildActive
                                  ? "text-white"
                                  : "text-slate-400 group-hover/child:text-primary",
                              )}
                            />
                            <span className="text-xs font-medium whitespace-nowrap overflow-hidden">
                              {child.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* <div className={cn("p-2 border-t border-primary/10", collapsed && "p-2")}>
        <PoweredByBatuk collapsed={collapsed} />
      </div> */}
    </>
  );

  return (
    <>
      <motion.aside
        animate={{ width: isCollapsed ? 80 : 225 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="sticky top-0 h-screen border-r border-primary/10 bg-white flex flex-col shrink-0 hidden lg:flex z-40"
      >
        {renderContent(isCollapsed)}
      </motion.aside>

      {isMobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
          <motion.aside
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-screen w-64 bg-white z-9999 flex flex-col lg:hidden shadow-2xl"
          >
            {renderContent(false)}
          </motion.aside>
        </>
      )}
    </>
  );
};
