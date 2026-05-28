import React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface ValidationErrorProps {
  message: string;
  className?: string;
}

export const ValidationError: React.FC<ValidationErrorProps> = ({ message, className }) => {
  if (!message) return null;

  return (
    <div className={cn("flex items-center gap-1.5 text-red-500 mt-1 animate-in fade-in slide-in-from-top-1", className)}>
      <AlertCircle size={14} />
      <span className="text-xs font-medium">{message}</span>
    </div>
  );
};
