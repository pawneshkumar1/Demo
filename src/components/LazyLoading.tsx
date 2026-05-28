import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

interface LazyLoadingProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  minHeight?: string;
}

export const LazyLoading: React.FC<LazyLoadingProps> = ({
  children,
  fallback,
  className,
  minHeight = "200px",
}) => {
  const defaultFallback = (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full transition-all duration-300",
        className,
      )}
      style={{ minHeight }}
    >
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-xs font-black text-primary/60 uppercase tracking-widest animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );

  return <Suspense fallback={fallback || defaultFallback}>{children}</Suspense>;
};

export default LazyLoading;
