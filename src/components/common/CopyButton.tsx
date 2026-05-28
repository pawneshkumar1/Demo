import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "react-hot-toast";

interface CopyButtonProps {
  text?: string;
  showText?: boolean; // optional: show value next to icon
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  showText = false,
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!text) return;

    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        onClick={handleCopy}
        className="hover:bg-slate-100 cursor-pointer rounded hover:text-primary transition-colors p-1"
        title="Copy"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>

      {showText && <span>{text || "N/A"}</span>}
    </div>
  );
};
