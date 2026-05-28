import React from "react";
import { cn } from "../lib/utils";
import { Button } from "./Button";

export interface IconButtonProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Button>, "children"> {
  icon: React.ReactNode;
  label?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  variant = "secondary",
  size = "sm",
  className,
  ...props
}) => {
  return (
    <Button
      icon={icon}
      iconPosition="left"
      variant={variant}
      size={size}
      aria-label={label}
      className={cn(
        "h-10 w-10 min-w-0 p-0 rounded-xl justify-center",
        className,
      )}
      {...props}
    />
  );
};
