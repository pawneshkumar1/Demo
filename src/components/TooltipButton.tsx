import React, { useRef, useState, useEffect } from "react";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import { cn } from "../lib/utils";

interface TooltipButtonProps extends React.ComponentPropsWithoutRef<
  typeof Button
> {
  tooltip: string;
  tooltipDirection?: "top" | "bottom" | "left" | "right";
  tooltipClassName?: string;
  containerClassName?: string;
}

const tooltipPosition = {
  top: "left-1/2 top-0 -translate-x-1/2 -translate-y-full",
  bottom: "left-1/2 bottom-0 -translate-x-1/2 translate-y-full",
  left: "left-0 top-1/2 -translate-x-full -translate-y-1/2",
  right: "right-0 top-1/2 translate-x-full -translate-y-1/2",
};

export const TooltipButton: React.FC<TooltipButtonProps> = ({
  tooltip,
  tooltipDirection = "bottom",
  tooltipClassName,
  containerClassName,
  className,
  ...props
}) => {
  const [adjustedDirection, setAdjustedDirection] = useState(tooltipDirection);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const hasChildren = React.Children.count(props.children) > 0;
  const ButtonComponent = hasChildren ? Button : IconButton;

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();

    // Assume tooltip dimensions (can be adjusted based on content)
    const tooltipWidth = 200; // approximate max width
    const tooltipHeight = 30; // approximate height

    const directions = {
      top: {
        left: containerRect.left + containerRect.width / 2 - tooltipWidth / 2,
        top: containerRect.top - tooltipHeight - 5,
        fits: containerRect.top - tooltipHeight - 5 >= 0,
      },
      bottom: {
        left: containerRect.left + containerRect.width / 2 - tooltipWidth / 2,
        top: containerRect.bottom + 5,
        fits: containerRect.bottom + tooltipHeight + 5 <= window.innerHeight,
      },
      left: {
        left: containerRect.left - tooltipWidth - 5,
        top: containerRect.top + containerRect.height / 2 - tooltipHeight / 2,
        fits: containerRect.left - tooltipWidth - 5 >= 0,
      },
      right: {
        left: containerRect.right + 5,
        top: containerRect.top + containerRect.height / 2 - tooltipHeight / 2,
        fits: containerRect.right + tooltipWidth + 5 <= window.innerWidth,
      },
    };

    // Find the first direction that fits, preferring the original
    const preferredOrder = [tooltipDirection, "top", "bottom", "left", "right"];
    const bestDirection =
      preferredOrder.find((dir) => directions[dir].fits) || tooltipDirection;

    setAdjustedDirection(bestDirection);
  }, [tooltipDirection]);

  return (
    <div
      ref={containerRef}
      className={cn("group relative inline-flex", containerClassName)}
    >
      <ButtonComponent
        {...props}
        className={cn("!h-9 !w-9 rounded-lg", className)}
      />
      <span
        ref={tooltipRef}
        className={cn(
          "pointer-events-none absolute z-50 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[11px] font-semibold text-white opacity-0 transition-all duration-150",
          tooltipPosition[adjustedDirection],
          "group-hover:opacity-100",
          tooltipClassName,
        )}
      >
        {tooltip}
      </span>
    </div>
  );
};
