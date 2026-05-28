import React, { ReactNode, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  FileText,
  Shield,
  RefreshCw,
  Truck,
  AlertCircle,
} from "lucide-react";
import { SectionHeader } from "../../components/SectionHeader";
import { RootState, AppDispatch } from "../../redux/store";
import { getPolicy } from "../../features/policy/policyApi";
import { cn } from "../../lib/utils";
import { Button } from "../../components/Button";

type PolicyType = "terms" | "privacy" | "shipping" | "refund";

const policyConfig: Record<
  PolicyType,
  { title: ReactNode; icon: typeof FileText; description: string }
> = {
  terms: {
    title: (
      <>
        Terms & <span className="text-yellow-400">Conditions</span>
      </>
    ),
    icon: FileText,
    description:
      "Please read these terms and conditions carefully before using our services.",
  },
  refund: {
    title: (
      <>
        Refund <span className="text-yellow-400">Policy</span>
      </>
    ),
    icon: RefreshCw,
    description:
      "Learn about our refund and return policies for purchases made on Batuk.",
  },
  privacy: {
    title: (
      <>
        Privacy <span className="text-yellow-400">Policy</span>
      </>
    ),
    icon: Shield,
    description: "How we collect, use, and protect your personal information.",
  },
  shipping: {
    title: (
      <>
        Shipping <span className="text-yellow-400">Policy</span>
      </>
    ),
    icon: Truck,
    description:
      "Information about delivery times, shipping methods, and tracking.",
  },
};

const policyTypes: PolicyType[] = ["terms", "privacy", "shipping", "refund"];

const Policy = () => {
  const { type } = useParams<{ type: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { currentPolicy, loading, error } = useSelector(
    (state: RootState) => state.policy,
  );

  const currentType = (type as PolicyType) || "terms";
  const config = policyConfig[currentType] || policyConfig.terms;

  useEffect(() => {
    if (!type || !policyConfig[type as PolicyType]) return;
    dispatch(getPolicy(type as string));
  }, [type, dispatch]);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleRetry = () => {
    if (type) dispatch(getPolicy(type as string));
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-primary/5 py-6 md:py-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 -z-0" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              title={config.title}
              subtitle={config.description}
              align="center"
            />
          </motion.div>
        </div>
      </section>

      {/* Policy Tabs */}
      <section className="bg-white border-b border-slate-200 sticky top-16 z-20 backdrop-blur-md bg-white/80">
        <div className="container-custom">
          <div className="flex justify-center gap-2 overflow-x-auto py-4 no-scrollbar">
            {policyTypes.map((pType) => {
              const pConfig = policyConfig[pType];
              const PIcon = pConfig.icon;
              const isActive = currentType === pType;
              return (
                <Link
                  key={pType}
                  to={`/policy/${pType}`}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300",
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "bg-slate-100 text-slate-600 hover:bg-primary/10 hover:text-primary",
                  )}
                >
                  <PIcon size={18} />
                  <span>{pConfig.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-6">
        <div className="container-custom">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-600">
              <Loader2 size={48} className="animate-spin text-primary mb-4" />
              <p className="font-medium">Loading policy details...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
                <AlertCircle size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Something went wrong
              </h3>
              <p className="text-slate-600 max-w-sm mb-8">{error}</p>
              <Button onClick={handleRetry} className="min-w-[160px]">
                Try Again
              </Button>
            </div>
          ) : currentPolicy ? (
            <motion.div
              className="bg-white rounded-3xl p-6 shadow-xl shadow-primary/5 border border-slate-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="text-slate-600 leading-relaxed
                [&_h1]:text-3xl [&_h1]:font-black [&_h1]:text-slate-900 [&_h1]:mb-6 [&_h1]:pb-4 [&_h1]:border-b-2 [&_h1]:border-primary/10
                [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-10 [&_h2]:mb-4
                [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:mt-8 [&_h3]:mb-3
                [&_p]:mb-4 [&_p]:last:mb-0
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2
                [&_li]:text-slate-600
                [&_strong]:text-slate-900 [&_strong]:font-bold
                [&_a]:text-primary [&_a]:underline [&_a]:font-bold hover:[&_a]:text-primary-soft
                [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-6 [&_blockquote]:bg-primary/5 [&_blockquote]:py-4 [&_blockquote]:pr-4 [&_blockquote]:rounded-r-lg"
                dangerouslySetInnerHTML={{ __html: currentPolicy.content }}
              />

              {currentPolicy.updatedAt && (
                <div className="mt-12 pt-8 border-t border-slate-100">
                  <p className="text-sm font-medium text-slate-400 italic">
                    Last updated: {formatDate(currentPolicy.updatedAt)}
                  </p>
                </div>
              )}
            </motion.div>
          ) : null}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mb-4">
        <div className="container-custom">
          <motion.div
            className="bg-white rounded-[1.5rem] p-6 text-center border border-slate-100 shadow-xl shadow-primary/5 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -translate-x-12 -translate-y-12" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gold/5 rounded-full translate-x-12 translate-y-12" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                Have Questions?
              </h2>
              <p className="text-base text-slate-600 mb-10 leading-relaxed font-medium">
                If you have any questions about our policies or need
                clarification on any terms, please don't hesitate to reach out.
              </p>
              <div className="flex flex-row flex-wrap gap-3 justify-center">
                <Link
                  to="/contact-us"
                  className="flex-1 sm:flex-none flex items-center justify-center px-6 h-[45px] text-[12px] rounded-lg font-semibold bg-primary text-white hover:scale-[1.05] active:scale-95 transition-all w-full sm:w-auto shadow-lg shadow-primary/10 cursor-pointer"
                >
                  Contact Us
                </Link>

                <a
                  href="mailto:connect@batuk.in"
                  className="flex-1 sm:flex-none flex items-center justify-center px-6 h-[45px] text-[12px] rounded-lg font-semibold border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:scale-[1.05] active:scale-95 transition-all w-full sm:w-auto cursor-pointer"
                >
                  Email Support
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Policy;
