import React from "react";
import { Presentation, Download, Eye } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../../components/Button";

export const PPT: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.25 }}
    className="flex flex-col items-center justify-center gap-6 py-16 text-center"
  >
    <div className="w-20 h-20 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500">
      <Presentation size={40} />
    </div>
    <div>
      <h3 className="text-2xl font-black text-slate-900">Partner Portal PPT</h3>
      <p className="text-slate-600 mt-2 text-sm">
        PPT · 12 MB · Last updated Jan 2026
      </p>
    </div>
    <p className="text-slate-600 text-sm max-w-md">
      A presentation-ready deck covering the Batuk Partner Program — ideal for
      client pitches, team training, or onboarding sessions.
    </p>
    <div className="flex gap-3">
      <Button
        icon={<Eye size={16} />}
        variant="ghost"
        className="border border-slate-200"
      >
        Preview
      </Button>
      <Button icon={<Download size={16} />}>Download PPT</Button>
    </div>
  </motion.div>
);
