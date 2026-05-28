// import React, { useRef } from "react";
// import { motion } from "motion/react";
// import { SectionHeader } from "./SectionHeader";
// import { cn } from "../lib/utils";
// import {
//   Star,
//   Percent,
//   Headphones,
//   BarChart3,
//   Rocket,
//   Megaphone,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// interface WhyPartnerProps {
//   theme?: "light" | "dark";
// }

// export const WhyPartner: React.FC<WhyPartnerProps> = ({ theme = "dark" }) => {
//   const isDark = theme === "dark";
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const features = [
//     {
//       icon: <Star className="text-gold" size={24} />,
//       title: "Exclusive Access",
//       description:
//         "Access our Partner Portal for seamless integration, featuring free software support, a web portal, SAL encryption, and AWD.",
//     },
//     {
//       icon: <Percent className="text-gold" size={24} />,
//       title: "Attractive Referrals",
//       description:
//         "Enjoy competitive referral fees with attractive earning potential.",
//     },
//     {
//       icon: <Headphones className="text-gold" size={24} />,
//       title: "Enhanced Support",
//       description: "Access dedicated account management and support.",
//     },
//     {
//       icon: <BarChart3 className="text-gold" size={24} />,
//       title: "Insightful Analytics",
//       description: "Access detailed performance reports and insights.",
//     },
//     {
//       icon: <Rocket className="text-gold" size={24} />,
//       title: "Comprehensive Onboarding",
//       description: "Receive full onboarding support.",
//     },
//     {
//       icon: <Megaphone className="text-gold" size={24} />,
//       title: "Marketing Support",
//       description: "We provide complete marketing support.",
//     },
//   ];

//   // 🔥 Scroll logic
//   const handleScroll = (direction: "left" | "right") => {
//     if (!scrollRef.current) return;

//     const container = scrollRef.current;
//     const card = container.querySelector(".card") as HTMLElement;

//     if (!card) return;

//     const cardWidth = card.offsetWidth + 24; // gap included

//     let itemsToScroll = 1;

//     if (window.innerWidth >= 1024) {
//       itemsToScroll = 3; // lg
//     } else if (window.innerWidth >= 768) {
//       itemsToScroll = 2; // md
//     }

//     const scrollAmount = cardWidth * itemsToScroll;

//     container.scrollBy({
//       left: direction === "right" ? scrollAmount : -scrollAmount,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <section
//       className={cn(
//         "py-12 overflow-hidden relative",
//         isDark ? "bg-primary text-white" : "bg-white text-slate-900",
//       )}
//     >
//       <div className="container-custom relative z-10">
//         <SectionHeader
//           title={
//             <>
//               Why <span className="text-yellow-400">Partner</span> with Us?
//             </>
//           }
//           subtitle="Join India's fastest-growing fintech ecosystem."
//           align="center"
//           theme={isDark ? "dark" : "light"}
//         />

//         {/* Navigation Buttons */}
//         <div className="flex justify-end gap-3 mb-6">
//           <button
//             onClick={() => handleScroll("left")}
//             className="p-2 rounded-full bg-white/10 hover:bg-white/20"
//           >
//             <ChevronLeft />
//           </button>
//           <button
//             onClick={() => handleScroll("right")}
//             className="p-2 rounded-full bg-white/10 hover:bg-white/20"
//           >
//             <ChevronRight />
//           </button>
//         </div>

//         {/* Carousel */}
//         <div
//           ref={scrollRef}
//           className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
//         >
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               className={cn(
//                 "card flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[30%] p-5 rounded-[1.5rem] border",
//                 isDark
//                   ? "bg-white/5 border-white/10"
//                   : "bg-slate-50 border-slate-200",
//               )}
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
//                 {feature.icon}
//               </div>

//               <h3 className="text-xl font-bold mb-3">{feature.title}</h3>

//               <p className={cn(isDark ? "text-white/80" : "text-slate-600")}>
//                 {feature.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

import React from "react";
import { motion } from "motion/react";
import { SectionHeader } from "./SectionHeader";
import { cn } from "../lib/utils";
import {
  Star,
  Percent,
  Headphones,
  BarChart3,
  Rocket,
  Megaphone,
} from "lucide-react";

interface WhyPartnerProps {
  theme?: "light" | "dark";
}

export const WhyPartner: React.FC<WhyPartnerProps> = ({ theme = "dark" }) => {
  const isDark = theme === "dark";

  const features = [
    {
      icon: <Star className="text-gold" size={24} />,
      title: "Exclusive Access",
      description:
        "Access our Partner Portal for seamless integration, featuring free software support, a web portal, SAL encryption, and Automated Workflow Distribution (AWD).",
    },
    {
      icon: <Percent className="text-gold" size={24} />,
      title: "Attractive Referrals",
      description:
        "Enjoy competitive referral fees with attractive earning potential.",
    },
    {
      icon: <Headphones className="text-gold" size={24} />,
      title: "Enhanced Support",
      description:
        "Access dedicated account management and support for optimal performance.",
    },
    {
      icon: <BarChart3 className="text-gold" size={24} />,
      title: "Insightful Analytics",
      description:
        "Access detailed performance reports and insights to monitor and enhance your success.",
    },
    {
      icon: <Rocket className="text-gold" size={24} />,
      title: "Comprehensive Onboarding",
      description:
        "Receive full onboarding support to help you effectively promote Digital Gold.",
    },
    {
      icon: <Megaphone className="text-gold" size={24} />,
      title: "Marketing Support",
      description:
        "We provide complete marketing support to promote Digital Gold.",
    },
  ];

  return (
    <section
      className={cn(
        "py-12 overflow-hidden relative transition-colors duration-300",
        isDark ? "bg-primary text-white" : "bg-white text-slate-900",
      )}
    >
      {/* Decorative Circles */}
      <div
        className={cn(
          "absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl",
          isDark ? "bg-primary-soft/20" : "bg-primary/10",
        )}
      />
      <div
        className={cn(
          "absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl",
          isDark ? "bg-gold/10" : "bg-gold/20",
        )}
      />

      <div className="container-custom relative z-10">
        <SectionHeader
          title={
            <>
              Why <span className="text-yellow-400">Partner</span> with Us?
            </>
          }
          subtitle="Join India's fastest-growing fintech ecosystem and provide your clients with the best investment tools."
          align="center"
          theme={isDark ? "dark" : "light"}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.03)",
              }}
              className={cn(
                "p-5 rounded-[1.5rem] border transition-all duration-300",
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-slate-50 border-slate-200",
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-6",
                  isDark ? "bg-white/10" : "bg-primary/10",
                )}
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3
                className={cn(
                  "text-xl font-800 font-display mb-4",
                  isDark ? "text-white" : "text-slate-900",
                )}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p
                className={cn(
                  "leading-relaxed",
                  isDark ? "text-white/80" : "text-slate-600",
                )}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
