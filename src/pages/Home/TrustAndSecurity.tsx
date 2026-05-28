import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Handshake,
  Lock,
  ChartNoAxesCombined,
  Zap,
  Coins,
} from "lucide-react";

export const TrustAndSecurity = () => {
  const scrollKeyframes = [
    "0%",
    "0%",
    "-33.33%",
    "-33.33%",
    "-66.66%",
    "-66.66%",
    "-100%",
  ];

  const scrollTimes = [0, 0.25, 0.3, 0.55, 0.6, 0.85, 1];

  // Orbit Icons
  const orbitIcons = [
    {
      icon: (
        <ShieldCheck size={32} className="text-emerald-500 drop-shadow-sm" />
      ),
    },
    {
      icon: <Handshake size={32} className="text-blue-500 drop-shadow-sm" />,
    },
    {
      icon: <Lock size={32} className="text-violet-500 drop-shadow-sm" />,
    },
    {
      icon: (
        <ChartNoAxesCombined
          size={32}
          className="text-orange-500 drop-shadow-sm"
        />
      ),
    },
    {
      icon: <Zap size={32} className="text-yellow-500 drop-shadow-sm" />,
    },
    {
      icon: <Coins size={32} className="text-primary drop-shadow-sm" />,
    },
  ];

  return (
    <section className="py-6 bg-slate-50 relative overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center w-full">
          {/* LEFT CONTENT */}
          <div className="space-y-4">
            {/* AUTO SCROLL HEADING */}
            <div className="h-16 overflow-hidden relative">
              <motion.div
                animate={{ y: scrollKeyframes }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: scrollTimes,
                }}
                className="flex flex-col"
              >
                <h1 className="text-3xl font-black tracking-tight text-primary leading-tight h-16 flex items-center">
                  Trust You Can Rely On
                </h1>

                <h1 className="text-3xl font-black tracking-tight text-primary leading-tight h-16 flex items-center">
                  Designed with Precision
                </h1>

                <h1 className="text-3xl font-black tracking-tight text-primary leading-tight h-16 flex items-center">
                  Secured with Excellence
                </h1>
              </motion.div>
            </div>

            {/* TRUST POINTS */}
            <div className="space-y-4">
              {[
                {
                  icon: "workspace_premium",
                  bg: "bg-yellow-100",
                  title: "24K 999 Purity Backed Gold & Silver",
                  desc: "Every purchase is linked to real 24K 999 purity gold and silver, sourced from trusted refiners like Augmont and MMTC, and securely stored for complete authenticity.",
                },
                {
                  icon: "shield",
                  bg: "bg-green-100",
                  title: "Secure & Insured Storage",
                  desc: "Your gold and silver holdings are stored in fully insured and protected vaults, ensuring maximum safety.",
                },
                {
                  icon: "receipt_long",
                  bg: "bg-blue-100",
                  title: "Transparent Transaction Records",
                  desc: "All transactions are securely recorded, giving you clear ownership and full transparency at every step.",
                },
                {
                  icon: "security",
                  bg: "bg-purple-100",
                  title: "Trusted Technology Infrastructure",
                  desc: "Our platform is built with advanced security protocols and reliable systems to keep every transaction safe.",
                },
              ].map((point, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-xl hover:bg-purple-50 transition-colors group"
                >
                  <div
                    className={`w-12 h-12 rounded-lg ${point.bg} flex items-center justify-center shrink-0`}
                  >
                    <span className="material-symbols-outlined text-primary">
                      {point.icon}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {point.title}
                    </h3>

                    <p className="text-slate-600 text-sm mt-1">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT ORBIT SECTION */}
          <div className="relative flex justify-center lg:justify-end items-center h-[400px] lg:h-[500px] w-full lg:pr-8">
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl scale-75 lg:translate-x-1/4"></div>

            <div className="relative w-[360px] h-[360px] flex items-center justify-center">
              <div className="absolute w-[220px] h-[220px] border border-primary/20 rounded-full"></div>
              <div className="absolute w-[300px] h-[300px] border border-primary/15 rounded-full"></div>
              {/* <div className="absolute w-[360px] h-[360px] border border-primary/10 rounded-full"></div> */}

              <div className="z-20 w-30 h-30 rounded-full bg-gradient-to-tr from-primary to-primary-container shadow-2xl flex flex-col items-center justify-center text-center p-6 border-4 border-white">
                <span className="text-yellow-400 font-semibold text-2xl leading-tight">
                  600+
                </span>

                <span className="text-white text-[10px] font-bold uppercase tracking-widest mt-1">
                  Trusted Partners
                </span>
              </div>

              {/* ROTATING ICONS */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute w-[360px] h-[360px] pointer-events-none"
              >
                {orbitIcons.map((item, i) => {
                  const angle = (i * 360) / orbitIcons.length;

                  // Alternate orbit distance
                  const radius = i % 2 === 0 ? 150 : 110;

                  return (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2"
                      style={{
                        transform: `
            translate(-50%, -50%)
            rotate(${angle}deg)
            translate(${radius}px)
          `,
                      }}
                    >
                      {/* ICON ALWAYS UPRIGHT */}
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 30,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="flex items-center justify-center"
                      >
                        <div
                          style={{
                            transform: `rotate(-${angle}deg)`,
                          }}
                          className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-xl flex items-center justify-center"
                        >
                          {item.icon}
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustAndSecurity;
