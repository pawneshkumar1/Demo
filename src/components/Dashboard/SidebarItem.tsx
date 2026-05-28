import React from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
  collapsed?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active = false,
  onClick,
  collapsed = false,
}) => (
  <div
    onClick={onClick}
    title={collapsed ? label : undefined}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group relative",
      active
        ? "bg-primary text-white shadow-lg shadow-primary/20"
        : "text-slate-600 hover:bg-primary/5 hover:text-primary",
      collapsed && "justify-center px-0",
    )}
  >
    <Icon
      className={cn(
        "w-5 h-5 shrink-0",
        active ? "text-white" : "text-slate-600 group-hover:text-primary",
      )}
    />
    {!collapsed && (
      <span className="text-sm font-medium whitespace-nowrap overflow-hidden">
        {label}
      </span>
    )}
    {active && collapsed && (
      <motion.div
        layoutId="active-indicator"
        className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
      />
    )}
  </div>
);
