import React, { useEffect, useMemo, useState } from "react";
import {
  FileText,
  ScrollText,
  Presentation,
  MonitorPlay,
  HelpCircle,
  Headphones,
  MessageCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { ProductSheet } from "./ProductSheet";
import { Manual } from "./Manual";
import { PPT } from "./PPT";
import { Tutorials } from "./Tutorials";
import { FAQs } from "./Faqs";
import {
  getKnowledgeCollaterals,
  getKnowledgeTutorials,
} from "../../features/knowledge/knowledgeApi";
import type { AppDispatch, RootState } from "../../redux/store";
import type { CollateralItem } from "../../features/knowledge/knowledgeSlice";
import { DraggableChat } from "@/src/components/DraggableChat";

type ResourceType = "product_sheet" | "manual" | "ppt" | "tutorials" | "faqs";

interface Resource {
  id: ResourceType;
  icon: React.ElementType;
  label: string;
  link?: string;
}

const panelComponents: Partial<Record<ResourceType, React.FC>> = {
  product_sheet: ProductSheet,
  manual: Manual,
  ppt: PPT,
  tutorials: Tutorials,
  faqs: FAQs,
};

const buildViewerLink = (item?: CollateralItem) => {
  if (!item?.pdfUrl) {
    return undefined;
  }

  return item.type === "ppt"
    ? `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(item.pdfUrl)}`
    : item.pdfUrl;
};

const mapCollateralResources = (collaterals: CollateralItem[]): Resource[] => {
  const pdfItems = collaterals.filter((item) => item.type === "pdf");
  const pptItem = collaterals.find((item) => item.type === "ppt");

  const productSheetItem =
    pdfItems.find((item) =>
      item.collateral_name.toLowerCase().includes("product"),
    ) || pdfItems[0];

  const manualItem =
    pdfItems.find(
      (item) =>
        item._id !== productSheetItem?._id &&
        (item.collateral_name.toLowerCase().includes("manual") ||
          item.collateral_name.toLowerCase().includes("portal")),
    ) || pdfItems.find((item) => item._id !== productSheetItem?._id);

  return [
    {
      id: "product_sheet",
      icon: FileText,
      label: productSheetItem?.collateral_name || "Product Sheet",
      link: buildViewerLink(productSheetItem),
    },
    {
      id: "manual",
      icon: ScrollText,
      label: manualItem?.collateral_name || "Partner Portal Manual",
      link: buildViewerLink(manualItem),
    },
    {
      id: "ppt",
      icon: Presentation,
      label: pptItem?.collateral_name || "Partner Portal PPT",
      link: buildViewerLink(pptItem),
    },
    { id: "tutorials", icon: MonitorPlay, label: "Tutorial Video" },
    { id: "faqs", icon: HelpCircle, label: "FAQs" },
  ];
};

export const Knowledge: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { collaterals } = useSelector((state: RootState) => state.knowledge);
  const [activeId, setActiveId] = useState<ResourceType>("product_sheet");
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    dispatch(getKnowledgeCollaterals() as any);
    dispatch(getKnowledgeTutorials() as any);
  }, [dispatch]);

  const resources = useMemo(
    () => mapCollateralResources(collaterals),
    [collaterals],
  );

  useEffect(() => {
    const activeResource = resources.find(
      (resource) => resource.id === activeId,
    );
    if (
      activeResource?.link ||
      activeId === "tutorials" ||
      activeId === "faqs"
    ) {
      return;
    }

    const firstAvailable = resources.find(
      (resource) =>
        resource.link || resource.id === "tutorials" || resource.id === "faqs",
    );

    if (firstAvailable && firstAvailable.id !== activeId) {
      setActiveId(firstAvailable.id);
    }
  }, [activeId, resources]);

  const activeResource = resources.find((resource) => resource.id === activeId);
  const ActivePanel = panelComponents[activeId];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 mx-auto w-full"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
            <nav className="space-y-0.5">
              {resources.map((res) => {
                const Icon = res.icon;
                const isActive = activeId === res.id;
                return (
                  <button
                    key={res.id}
                    onClick={() => setActiveId(res.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200 text-left group relative border-l-4",
                      isActive
                        ? "bg-primary/10 text-primary border-primary translate-x-1"
                        : "text-slate-600 border-transparent hover:bg-slate-100 hover:text-primary",
                    )}
                  >
                    <Icon
                      size={18}
                      className={cn(
                        "shrink-0 transition-colors",
                        isActive
                          ? "text-primary"
                          : "text-slate-400 group-hover:text-primary",
                      )}
                    />
                    <span
                      className={cn(
                        "font-semibold flex-1",
                        isActive && "text-primary",
                      )}
                    >
                      {res.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="bg-primary rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group mb-4">
            <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <Headphones size={120} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Need more help?</h3>
            <p className="text-white/70 text-sm mb-4 leading-relaxed">
              Our dedicated partner support team is available 24/7 to assist
              with technical or financial inquiries.
            </p>
            <button
              onClick={() => {
                const nextState = !isChatOpen;

                setIsChatOpen(nextState);

                const tawk = (window as any).Tawk_API;

                if (tawk?.addEvent) {
                  tawk.addEvent(nextState ? "chat_opened" : "chat_closed", {
                    page: window.location.pathname,
                    source: "header_button",
                    time: new Date().toISOString(),
                  });
                }
              }}
              className="w-full bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <MessageCircle size={16} />
              Contact Support
            </button>
          </div>
        </div>

        <div className="lg:col-span-8 h-[600px] lg:h-auto min-h-[600px] mb-4">
          <AnimatePresence mode="wait">
            {activeResource?.link ? (
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full h-full bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100"
              >
                <iframe
                  src={activeResource.link}
                  title={activeResource.label}
                  className="w-full h-full border-0"
                />
              </motion.div>
            ) : ActivePanel ? (
              <ActivePanel key={activeId} />
            ) : null}
          </AnimatePresence>
        </div>
      </div>
      <DraggableChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </motion.div>
  );
};
