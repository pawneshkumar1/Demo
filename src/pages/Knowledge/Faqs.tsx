import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { Accordion } from "../../components/Accordion";

type FaqMode = "partner" | "user";

interface FaqItem {
  id: number;
  question: string;
  answer?: React.ReactNode;
}

const partnerFaqs: FaqItem[] = [
  {
    id: 1,
    question: "How do I register on the Batuk Partner Portal?",
    answer: (
      <div>
        <p className="mb-3">To register on the Batuk Partner Portal, follow these essential steps:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Visit the official <span className="font-bold text-primary">Royal Ledger Partnership</span> page.</li>
          <li>Click on the "Become a Partner" button in the top right corner.</li>
          <li>Fill in your business details including entity name, tax ID, and contact person.</li>
          <li>Verify your email address through the secure link sent to your inbox.</li>
          <li>Complete the secondary authentication setup for enhanced portal security.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 2,
    question: "How can I add a new client through the portal?",
    answer: (
      <p>
        Navigate to the <span className="font-bold text-primary">Investors</span> section from the sidebar, click "Add New Investor", fill in the client's name, email and mobile number. Both fields must be OTP-verified before the record can be saved.
      </p>
    ),
  },
  {
    id: 3,
    question: "How do I complete the KYC process for a client?",
    answer: (
      <p>
        Open the Investors table, find the target client row and click <span className="font-bold text-primary">Complete KYC</span>. Follow the multi-step guided wizard to upload Aadhaar, PAN and bank account details. The approval typically takes 1–2 business days.
      </p>
    ),
  },
  {
    id: 4,
    question: "What are the commission payout schedules?",
    answer: (
      <p>
        Commissions are calculated on the <span className="font-bold text-primary">1st of every month</span> for the previous month's transactions and are transferred to your registered bank account within 5 working days.
      </p>
    ),
  },
  {
    id: 5,
    question: "How do I generate referral fee statements?",
    answer: (
      <p>
        Go to the <span className="font-bold text-primary">Invoice</span> page, select the desired month and year, then click Search. Click <span className="font-bold text-primary">View Invoice</span> to preview a PDF, or use the Export button to download as CSV.
      </p>
    ),
  },
];

const userFaqs: FaqItem[] = [
  {
    id: 1,
    question: "How do I start a Gold SIP?",
    answer: (
      <p>
        Log in to the Batuk app, navigate to <span className="font-bold text-primary">SIP → Create SIP</span>, choose Gold or Silver, select your investment amount, frequency and start date, then confirm with your UPI PIN.
      </p>
    ),
  },
  {
    id: 2,
    question: "How is gold price determined?",
    answer: (
      <p>
        Gold prices are updated in real-time based on the <span className="font-bold text-primary">MCX spot rate</span> plus applicable GST and platform charges. The price you see at checkout is the exact price you pay.
      </p>
    ),
  },
  {
    id: 3,
    question: "Can I convert my digital gold to physical gold?",
    answer: (
      <p>
        Yes. Once you accumulate <span className="font-bold text-primary">1 gram or more</span>, you can request delivery of physical gold coins or bars through the Batuk app. Standard delivery timelines are 7–10 business days.
      </p>
    ),
  },
];


export const FAQs: React.FC = () => {
  const [mode, setMode] = useState<FaqMode>("partner");
  const [openId, setOpenId] = useState<number | null>(1);
  const faqs = mode === "partner" ? partnerFaqs : userFaqs;
  const toggle = (id: number) => setOpenId(openId === id ? null : id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="space-y-4"
    >
      {/* Mode Toggle */}
      <div className="flex justify-center">
        <div className="bg-slate-200/60 p-1.5 rounded-xl flex items-center shadow-inner">
          {(["partner", "user"] as FaqMode[]).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setOpenId(null); }}
              className={cn(
                "px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200",
                mode === m
                  ? "bg-white text-primary shadow-sm"
                  : "text-slate-600 hover:text-primary",
              )}
            >
              {m === "partner" ? "Partner FAQs" : "User FAQs"}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-3"
        >
          <Accordion
            items={faqs}
            openId={openId}
            onToggle={(id) => toggle(id as number)}
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
