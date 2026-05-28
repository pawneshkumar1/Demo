import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle } from "lucide-react";

export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  amount?: string;
  destination?: string;
  referenceId?: string;
  userId?: string;
  statusLabel?: string;
  message?: React.ReactNode;
}

export const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  title,
  amount,
  destination,
  referenceId,
  userId,
  statusLabel,
  message,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-sm rounded-[2rem] p-4 shadow-2xl overflow-hidden flex flex-col items-center text-center"
          >
            {/* Decorative Gradient Background */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-50 to-white -z-10" />

            {/* Large Green Checkmark with Glow */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-emerald-400/20 blur-2xl rounded-full scale-150" />
              <div className="relative w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <CheckCircle
                  className="text-white w-12 h-12"
                  strokeWidth={2.5}
                />
              </div>
            </div>

            {/* Content */}
            <h2 className="text-2xl font-black text-slate-900  mb-2">
              {title}
            </h2>
            <div className="text-slate-600 text-sm mb-8 leading-relaxed">
              {message || (
                <>
                  Your transfer of{" "}
                  <span className="font-bold text-primary">{amount}</span> to{" "}
                  <span className="font-bold text-slate-900">
                    {destination}
                  </span>{" "}
                  has been confirmed and processed.
                </>
              )}
            </div>

            {/* Transaction Details Pill */}
            {(referenceId || userId || statusLabel) && (
              <div className="w-full bg-slate-50 rounded-2xl p-4 mb-8 flex flex-col gap-2 border border-slate-100">
                {referenceId && (
                  <div className="flex justify-between text-[10px] font-bold  uppercase text-slate-400">
                    <span>REFERENCE ID</span>
                    <span className="text-slate-900">{referenceId}</span>
                  </div>
                )}
                {userId && (
                  <div className="flex justify-between text-[10px] font-bold  uppercase text-slate-400">
                    <span>USER ID</span>
                    <span className="text-slate-900">{userId}</span>
                  </div>
                )}
                {statusLabel && (
                  <div className="flex justify-between text-[10px] font-bold  uppercase text-slate-400">
                    <span>STATUS</span>
                    <span className="text-emerald-600">{statusLabel}</span>
                  </div>
                )}
              </div>
            )}

            {/* Primary Action */}
            <button
              onClick={onClose}
              className="w-full bg-primary py-4 rounded-xl text-white font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98]"
            >
              Done
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
