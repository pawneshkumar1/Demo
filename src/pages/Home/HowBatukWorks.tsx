import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/src/components/SectionHeader";
import { UserPlus, Share2, ShoppingCart, WalletCards } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Register as a Partner",
    icon: <UserPlus size={36} className="text-purple-500 drop-shadow-sm" />,
    cardDesc: "Sign up and get instant access to the Batuk partner platform.",
    gradient: "from-purple-100 to-white",
  },
  {
    id: "02",
    title: "Share with Your Network",
    icon: <Share2 size={36} className="text-indigo-500 drop-shadow-sm" />,
    cardDesc:
      "Introduce digital gold, silver, SIP, and gifting options to your clients.",
    gradient: "from-indigo-100 to-white",
  },
  {
    id: "03",
    title: "Clients Buy & Save",
    icon: <ShoppingCart size={36} className="text-slate-500 drop-shadow-sm" />,
    cardDesc:
      "Your network purchases digital gold, silver, jewellery, or SIP plans through the platform. You benefit when transactions happen.",
    gradient: "from-slate-100 to-white",
  },
  {
    id: "04",
    title: "Earn Referral",
    icon: <WalletCards size={36} className="text-purple-500 drop-shadow-sm" />,
    cardDesc: "Earn an attractive referral on every successful transaction.",
    gradient: "from-purple-50 to-white",
  },
];

// const steps = [
//   {
//     id: "01",
//     title: "Register as a Partner",
//     icon: "how_to_reg",
//     cardDesc: "Sign up and get instant access to the Batuk partner platform.",
//     // securityTag: "AES-256 Encryption Active",
//     gradient: "from-purple-100 to-white",
//   },
//   {
//     id: "02",
//     title: "Share with Your Network",
//     icon: "share",
//     cardDesc:
//       " Introduce digital gold, silver, SIP, and gifting options to your clients.",
//     // securityTag: "Unique Referral Tracking",
//     gradient: "from-indigo-100 to-white",
//   },
//   {
//     id: "03",
//     title: "Clients Buy & Save",
//     icon: "shopping_cart",
//     cardDesc:
//       "Your network purchases digital gold, silver, jewellery, or SIP plans through the platform. You benefit when transactions happen.",
//     // securityTag: "Vaulted Assets Insured",
//     gradient: "from-slate-100 to-white",
//   },
//   {
//     id: "04",
//     title: "Earn Referral",
//     icon: "payments",
//     cardDesc: " Earn an attractive referral on every successful transaction.",
//     // securityTag: "Automated Payouts",
//     gradient: "from-purple-50 to-white",
//   },
// ];

export const HowBatukWorks = ({ theme = "dark" }: { theme?: string }) => {
  const isDark = theme === "dark";

  const [activeStep, setActiveStep] = useState(0);
  const total = steps.length;

  return (
    <section className="py-12 bg-primary overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-6">
          <SectionHeader
            title={
              <>
                Boost Your{" "}
                <span className="text-yellow-400">Business Growth</span> with{" "}
                <span className="text-yellow-400">Batuk</span>
              </>
            }
            subtitle="Grow with us as a partner and unlock new earning opportunities while helping customers buy digital gold & silver, jewellery, and gifting solutions."
            align="center"
            theme={isDark ? "dark" : "light"}
          />
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* LEFT SIDE */}
          <div className="space-y-2 lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl w-fit border border-slate-200 shadow-sm"
            >
              <span className="text-xs font-700  uppercase">
                How Batuk Works
              </span>
            </motion.div>
            {steps.map((step, index) => (
              <div
                key={step.id}
                onMouseEnter={() => setActiveStep(index)}
                onClick={() => setActiveStep(index)}
                className={`cursor-pointer pl-4 py-4 border-l-4 rounded-r-2xl transition-all duration-300
                  ${
                    activeStep === index
                      ? `border-yellow-400 bg-gradient-to-br ${step.gradient} shadow`
                      : `border-transparent hover:border-yellow-400 hover:bg-gradient-to-br ${step.gradient}`
                  }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`text-lg font-bold ${
                      activeStep === index
                        ? "text-primary/40"
                        : "text-slate-300"
                    }`}
                  >
                    {step.id}
                  </span>

                  <h3
                    className={`text-lg font-semibold ${
                      activeStep === index ? "text-black" : "text-slate-400"
                    }`}
                  >
                    {step.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE CAROUSEL */}
          <div className="lg:col-span-8 flex justify-center overflow-hidden px-2 sm:px-0">
            <div className="relative w-full max-w-[1000px] h-[320px] flex items-center justify-center">
              {steps.map((step, index) => {
                const position = (index - activeStep + total) % total;

                let x: any = 0;
                let y: any = 0;
                let scale = 0.9;
                let opacity = 0;
                let zIndex = 0;
                let filter = "blur(0px)";

                if (position === 0) {
                  // ✅ Center
                  x = 0;
                  y = 0;
                  scale = 1;
                  opacity = 1;
                  zIndex = 4;
                } else if (position === 1) {
                  // 👉 Right
                  x = "35%";
                  y = 0;
                  scale = 0.95;
                  opacity = 0.8;
                  zIndex = 3;
                } else if (position === 2) {
                  // 👉👉 Deep Right (4th card)
                  x = "60%";
                  y = 0;
                  scale = 0.85;
                  opacity = 0.3;
                  zIndex = 1;
                  filter = "blur(3px)";
                } else if (position === total - 1) {
                  // 👈 Left
                  x = "-35%";
                  y = 0;
                  scale = 0.95;
                  opacity = 0.8;
                  zIndex = 3;
                }

                return (
                  <motion.div
                    key={step.id}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(e, info) => {
                      if (info.offset.x < -50) {
                        setActiveStep((prev) => (prev + 1) % total);
                      } else if (info.offset.x > 50) {
                        setActiveStep((prev) => (prev - 1 + total) % total);
                      }
                    }}
                    animate={{ x, y, scale, opacity, zIndex, filter }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                    className="absolute w-[90%] sm:w-[300px] lg:w-[340px]"
                  >
                    {/* CARD */}
                    <div
                      className={`p-6 rounded-[2rem] bg-gradient-to-br ${step.gradient} 
  border border-white shadow-sm flex flex-col justify-center items-center text-center h-[240px]`}
                    >
                      {/* Icon + Title */}
                      <div className="flex flex-col items-center gap-4 mb-4">
                        <div className="flex items-center justify-center">
                          <span
                            className="material-symbols-outlined text-primary flex justify-center items-center text-2xl"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            {step.icon}
                          </span>
                        </div>

                        <h4 className="text-lg font-semibold text-on-background">
                          {step.title}
                        </h4>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {step.cardDesc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowBatukWorks;
