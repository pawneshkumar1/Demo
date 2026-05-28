import React from "react";
import { ScrollText, Download, Eye } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../../components/Button";

export const Manual: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.25 }}
    className="flex flex-col items-center justify-center gap-6 py-16 text-center"
  >
    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
      <ScrollText size={40} />
    </div>
    <div>
      <h3 className="text-2xl font-black text-slate-900">
        Partner Portal Manual
      </h3>
      <p className="text-slate-600 mt-2 text-sm">
        PDF · 8.1 MB · Last updated Feb 2026
      </p>
    </div>
    <p className="text-slate-600 text-sm max-w-md">
      Step-by-step instructions for using every feature of the Batuk Partner
      Portal — from onboarding clients to tracking earnings and generating
      invoices.
    </p>
    <div className="flex gap-3">
      <Button
        icon={<Eye size={16} />}
        variant="ghost"
        className="border border-slate-200"
      >
        Preview
      </Button>
      <Button icon={<Download size={16} />}>Download PDF</Button>
    </div>
  </motion.div>
);
