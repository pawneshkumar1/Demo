import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";

import rupee from "../../assets/icons/TrustMetrics/rupee.avif";
import handShake from "../../assets/icons/TrustMetrics/Handshake.avif";
import briefcase from "../../assets/icons/TrustMetrics/briefcase.avif";

const CountUp = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration * 60);

      const timer = setInterval(() => {
        start += increment;

        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
};

export const SavingsManaged = () => {
  const metrics = [
    {
      icon: rupee,
      value: 50,
      iconColor: "text-primary",
      gradient: "from-purple-100 to-white",
      prefix: "",
      suffix: "k+",
      label: "App Downloads",
      description: "Trusted by users across India",
    },
    {
      icon: handShake,
      value: 600,
      iconColor: "text-slate-500",
      gradient: "from-slate-100 to-white",
      prefix: "",
      suffix: "+",
      label: "Trusted Partners",
      description: "Across 25 states and 100+ cities",
    },
    {
      icon: briefcase,
      value: 5,
      iconColor: "text-primary",
      gradient: "from-purple-100 to-white",
      prefix: "",
      suffix: "+",
      label: "Platform Offerings",
      description: "Smart ways to buy, save & digital gold and silver",
    },
  ];

  return (
    <section className="py-10 bg-white">
      <div className="container-custom">
        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
              }}
              className={`p-6 rounded-[2rem] bg-gradient-to-br ${metric.gradient} flex flex-col items-center text-center border border-white shadow-sm transition-all duration-300`}
            >
              <div className="flex items-start gap-4 w-full mb-1">
                {/* Icon */}
                <div className=" flex items-center justify-center shrink-0">
                  <img
                    src={metric.icon}
                    alt={metric.label}
                    loading="lazy"
                    className="w-20 h-20 object-contain"
                  />
                </div>

                {/* Value + Label (column) */}
                <div className="flex flex-col justify-center items-center text-center h-full">
                  <h3 className="text-2xl font-bold text-black">
                    {metric.prefix}
                    <CountUp end={metric.value} />
                    {metric.suffix}
                  </h3>

                  <p className="text-md font-semibold text-black ">
                    {metric.label}
                  </p>
                </div>
              </div>

              {/* Description (full width below) */}
              <p className="text-sm text-black/70 leading-relaxed text-center w-full">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// import { useRef, useState, useEffect } from "react";
// import { motion, useInView } from "motion/react";

// import rupee from "../../assets/icons/TrustMetrics/rupee.avif";
// import handShake from "../../assets/icons/TrustMetrics/Handshake.avif";
// import briefcase from "../../assets/icons/TrustMetrics/briefcase.avif";

// const CountUp = ({ end, duration = 2 }: { end: number; duration?: number }) => {
//   const [count, setCount] = useState(0);
//   const ref = useRef<HTMLSpanElement | null>(null);
//   const isInView = useInView(ref, { once: true });

//   useEffect(() => {
//     if (isInView) {
//       let start = 0;
//       const increment = end / (duration * 60);

//       const timer = setInterval(() => {
//         start += increment;

//         if (start >= end) {
//           setCount(end);
//           clearInterval(timer);
//         } else {
//           setCount(Math.floor(start));
//         }
//       }, 1000 / 60);

//       return () => clearInterval(timer);
//     }
//   }, [isInView, end, duration]);

//   return <span ref={ref}>{count}</span>;
// };

// export const SavingsManaged = () => {
//   const metrics = [
//     {
//       icon: rupee,
//       value: 1,
//       iconColor: "text-primary",
//       gradient: "from-purple-100 to-white",
//       prefix: "",
//       suffix: "L+",
//       label: "App Downloads",
//       description: "Trusted by users across India",
//     },
//     {
//       icon: handShake,
//       value: 1000,
//       iconColor: "text-slate-500",
//       gradient: "from-slate-100 to-white",
//       prefix: "",
//       suffix: "+",
//       label: "Trusted Partners",
//       description: "Across 25 states and 100+ cities",
//     },
//     {
//       icon: briefcase,
//       value: 5,
//       iconColor: "text-primary",
//       gradient: "from-purple-100 to-white",
//       prefix: "",
//       suffix: "+",
//       label: "Platform Offerings",
//       description: "Smart ways to buy, save & digital gold and silver",
//     },
//   ];

//   return (
//     <section className="py-10 bg-white">
//       <div className="container-custom">
//         {/* Cards */}
//         <div className="grid md:grid-cols-3 gap-4">
//           {metrics.map((metric, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, scale: 0.95 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1 }}
//               whileHover={{
//                 y: -8,
//                 boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
//               }}
//               className={`p-6 rounded-[2rem] bg-gradient-to-br ${metric.gradient} flex flex-col items-center text-center border border-white shadow-sm transition-all duration-300`}
//             >
//               <div className="flex items-center justify-start w-full gap-4 mb-4">
//                 <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md">
//                   <img
//                     src={metric.icon}
//                     alt={metric.label}
//                     loading="lazy"
//                     className="w-8 h-8 object-contain"
//                   />
//                 </div>

//                 <h3 className="text-3xl font-bold text-black">
//                   {metric.prefix}
//                   <CountUp end={metric.value} />
//                   {metric.suffix}
//                 </h3>
//               </div>

//               <p className="text-lg font-semibold text-black mb-2 text-left w-full">
//                 {metric.label}
//               </p>

//               <p className="text-sm text-black/70 leading-relaxed text-left w-full">
//                 {metric.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };
