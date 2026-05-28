import React from "react";
import { FileText, Download, Eye } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../../components/Button";

export const ProductSheet: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.25 }}
    className="flex flex-col items-center justify-center gap-6 py-16 text-center"
  >
    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
      <FileText size={40} />
    </div>
    <div>
      <h3 className="text-2xl font-black text-slate-900">Product Sheet</h3>
      <p className="text-slate-600 mt-2 text-sm">
        PDF · 4.2 MB · Last updated Mar 2026
      </p>
    </div>
    <p className="text-slate-600 text-sm max-w-md">
      A comprehensive overview of the Batuk Partner Platform, covering all key
      features, commission structures, and onboarding steps.
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
