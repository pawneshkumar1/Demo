import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "../../components/SectionHeader";
import { cn } from "../../lib/utils";
import {
  Star,
  Percent,
  Headphones,
  BarChart3,
  Rocket,
  Megaphone,
  ChartNoAxesCombined,
  LockKeyhole,
  Headset,
  TrendingUp,
} from "lucide-react";

export const WhyPartner: React.FC = () => {
  const features = [
    {
      icon: (
        <ChartNoAxesCombined
          size={36}
          className="text-yellow-500 drop-shadow-sm"
        />
      ),
      title: "High Growth Potential",
      description:
        "Benefit from every successful transaction across the platform.",
      bg: "bg-gradient-to-br from-yellow-50 to-orange-50/50 text-slate-800",
    },
    {
      icon: <LockKeyhole size={36} className="text-slate-400 drop-shadow-sm" />,
      title: "Exclusive Access",
      description:
        "Access a simple and transparent partner portal to track transactions and activity with ease.",
      bg: "bg-gradient-to-br from-slate-100 to-slate-50 text-slate-800",
    },
    {
      icon: <Headset size={36} className="text-purple-500 drop-shadow-sm" />,
      title: "Enhanced Support",
      description:
        "Get expert assistance and dedicated support to guide you at every step of your partner journey.",
      bg: "bg-gradient-to-br from-purple-50 to-indigo-50/50 text-slate-800",
    },
    {
      icon: <TrendingUp size={36} className="text-blue-500 drop-shadow-sm" />,
      title: "Performance Insights",
      description:
        "Monitor your performance with clear reports and insights to help you grow faster.",
      bg: "bg-gradient-to-br from-blue-50 to-cyan-50/50 text-slate-800",
    },
    {
      icon: <Rocket size={36} className="text-emerald-500 drop-shadow-sm" />,
      title: "Comprehensive Onboarding",
      description:
        "Get started smoothly with a simple onboarding process and complete guidance.",
      bg: "bg-gradient-to-br from-emerald-50 to-teal-50/50 text-slate-800",
    },
    {
      icon: <Megaphone size={36} className="text-pink-500 drop-shadow-sm" />,
      title: "Marketing Support",
      description:
        "We provide banners, creatives, and marketing resources to help you promote Batuk with ease.",
      bg: "bg-gradient-to-br from-pink-50 to-rose-50/50 text-slate-800",
    },
  ];

  return (
    <section className="py-12 overflow-hidden relative bg-slate-50 text-slate-900">
      {/* Decorative Circle */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl bg-primary/10" />

      <div className="container-custom relative z-10 w-full">
        {/* Header */}
        <div className="mb-6">
          <SectionHeader
            title={
              <>
                Why <span className="text-yellow-400">Partner</span> with Us?
              </>
            }
            subtitle="Become a Batuk partner and help your network explore smarter ways to buy and save in Digital Gold & Silver, SIP plans, and jewellery."
            align="center"
            theme="light"
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{
                y: -5,
                scale: 1.02,
              }}
              className={`p-5 rounded-[2rem] bg-gradient-to-br ${feature.bg} flex flex-col items-center text-center border border-white shadow-sm transition-all duration-300`}
            >
              <div className="flex items-center justify-start w-full gap-4 mb-4">
                <span className={`material-symbols-outlined text-2xl`}>
                  {feature.icon}
                </span>

                <h3 className="text-lg font-bold text-on-background tracking-tight text-left">
                  {feature.title}
                </h3>
              </div>
              <p className="text-sm text-slate-600 text-left">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// import React from "react";
// import { motion } from "framer-motion";
// import { SectionHeader } from "../../components/SectionHeader";
// import { cn } from "../../lib/utils";
// import {
//   Star,
//   Percent,
//   Headphones,
//   BarChart3,
//   Rocket,
//   Megaphone,
// } from "lucide-react";

// interface WhyPartnerProps {
//   theme?: "light" | "dark";
// }

// export const WhyPartner: React.FC<WhyPartnerProps> = ({ theme = "dark" }) => {
//   const isDark = theme === "dark";

//   const features = [
//     {
//       icon: <Star size={36} className="text-yellow-500 drop-shadow-sm" />,
//       title: "High Growth Potential",
//       description:
//         "Benefit from every successful transaction across the platform.",
//       lightBg:
//         "bg-gradient-to-br from-yellow-50 to-orange-50/50 text-slate-800",
//       darkBg: "bg-white/5 border-yellow-500/20 hover:border-yellow-500/50",
//     },
//     {
//       icon: <Percent size={36} className="text-slate-400 drop-shadow-sm" />,
//       title: "Exclusive Access",
//       description:
//         "Access a simple and transparent partner portal to track transactions and activity with ease.",
//       lightBg: "bg-gradient-to-br from-slate-100 to-slate-50 text-slate-800",
//       darkBg: "bg-white/5 border-slate-400/20 hover:border-slate-400/50",
//     },
//     {
//       icon: <Headphones size={36} className="text-purple-500 drop-shadow-sm" />,
//       title: "Enhanced Support",
//       description:
//         "Get expert assistance and dedicated support to guide you at every step of your partner journey.",
//       lightBg:
//         "bg-gradient-to-br from-purple-50 to-indigo-50/50 text-slate-800",
//       darkBg: "bg-white/5 border-purple-500/20 hover:border-purple-500/50",
//     },
//     {
//       icon: <BarChart3 size={36} className="text-blue-500 drop-shadow-sm" />,
//       title: "Performance Insights",
//       description:
//         "Monitor your performance with clear reports and insights to help you grow faster.",
//       lightBg: "bg-gradient-to-br from-blue-50 to-cyan-50/50 text-slate-800",
//       darkBg: "bg-white/5 border-blue-500/20 hover:border-blue-500/50",
//     },
//     {
//       icon: <Rocket size={36} className="text-emerald-500 drop-shadow-sm" />,
//       title: "Comprehensive Onboarding",
//       description:
//         "Get started smoothly with a simple onboarding process and complete guidance.",
//       lightBg: "bg-gradient-to-br from-emerald-50 to-teal-50/50 text-slate-800",
//       darkBg: "bg-white/5 border-emerald-500/20 hover:border-emerald-500/50",
//     },
//     {
//       icon: <Megaphone size={36} className="text-pink-500 drop-shadow-sm" />,
//       title: "Marketing Support",
//       description:
//         "We provide banners, creatives, and marketing resources to help you promote Batuk with ease.",
//       lightBg: "bg-gradient-to-br from-pink-50 to-rose-50/50 text-slate-800",
//       darkBg: "bg-white/5 border-pink-500/20 hover:border-pink-500/50",
//     },
//   ];

//   return (
//     <section
//       className={cn(
//         "py-12 overflow-hidden relative transition-colors duration-300",
//         isDark ? "bg-primary text-white" : "bg-slate-50 text-slate-900",
//       )}
//     >
//       {/* Decorative Circles */}
//       <div
//         className={cn(
//           "absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl",
//           isDark ? "bg-primary-soft/20" : "bg-primary/10",
//         )}
//       />

//       <div className="container-custom relative z-10 w-full">
//         <div className="mb-6">
//           <SectionHeader
//             title={
//               <>
//                 Why <span className="text-yellow-400">Partner</span> with Us?
//               </>
//             }
//             subtitle="Become a Batuk partner and help your network explore smarter ways to buy and save in Digital Gold & Silver, SIP plans, and jewellery."
//             align="center"
//             theme={isDark ? "dark" : "light"}
//           />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1, duration: 0.5 }}
//               whileHover={{
//                 y: -5,
//                 scale: 1.02,
//               }}
//               className={cn(
//                 "p-4 rounded-[1.5rem] border shadow-xl flex flex-col items-center text-center transition-all duration-300",
//                 isDark ? feature.darkBg : feature.lightBg,
//                 !isDark && "shadow-slate-200/50 border-white/50",
//               )}
//             >
//               {/* Icon */}
//               <div className="mb-4 flex items-center justify-center">
//                 {feature.icon}
//               </div>

//               {/* Title */}
//               <h3
//                 className={cn(
//                   "text-xl font-bold font-display mb-3",
//                   isDark ? "text-white" : "text-slate-900",
//                 )}
//               >
//                 {feature.title}
//               </h3>

//               {/* Description */}
//               <p
//                 className={cn(
//                   "text-sm font-medium leading-relaxed",
//                   isDark ? "text-white/80" : "text-slate-600",
//                 )}
//               >
//                 {feature.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };
