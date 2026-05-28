import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

export interface AccordionItemData {
  id: string | number;
  question: string;
  answer?: React.ReactNode;
}

interface AccordionItemProps {
  item: AccordionItemData;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
  questionClassName?: string;
  answerClassName?: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  item,
  isOpen,
  onToggle,
  className,
  questionClassName,
  answerClassName,
}) => (
  <div
    className={cn(
      "bg-white rounded-xl shadow-sm overflow-hidden border-l-4 transition-all duration-200",
      isOpen
        ? "border-primary shadow-md"
        : "border-transparent hover:border-primary/20",
      className,
    )}
  >
    <button
      onClick={onToggle}
      className={cn(
        "w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors gap-4",
        questionClassName,
      )}
    >
      <span className="text-base font-bold text-slate-900">
        {item.question}
      </span>
      {isOpen ? (
        <ChevronUp className="text-primary shrink-0" size={20} />
      ) : (
        <ChevronDown className="text-slate-400 shrink-0" size={20} />
      )}
    </button>
    <AnimatePresence initial={false}>
      {isOpen && item.answer && (
        <motion.div
          key="answer"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div
            className={cn(
              "px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4",
              answerClassName,
            )}
          >
            {item.answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

interface AccordionProps {
  items: AccordionItemData[];
  openId?: string | number | null;
  onToggle: (id: string | number) => void;
  containerClassName?: string;
  itemClassName?: string;
  questionClassName?: string;
  answerClassName?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  openId,
  onToggle,
  containerClassName,
  itemClassName,
  questionClassName,
  answerClassName,
}) => {
  return (
    <div className={cn("space-y-3", containerClassName)}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => onToggle(item.id)}
          className={itemClassName}
          questionClassName={questionClassName}
          answerClassName={answerClassName}
        />
      ))}
    </div>
  );
};
