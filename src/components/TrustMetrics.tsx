import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";

import rupee from "../assets/icons/TrustMetrics/rupee.avif";
import handShake from "../assets/icons/TrustMetrics/Handshake.avif";
import briefcase from "../assets/icons/TrustMetrics/briefcase.avif";

const CountUp = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
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

export const TrustMetrics = () => {
  const metrics = [
    {
      icon: rupee,
      value: 5,
      suffix: " Crore+",
      label: "Savings Managed",
      description: "Wealth secured by Batuk partners",
    },
    {
      icon: handShake,
      value: 500,
      suffix: "+",
      label: "Trusted Partners",
      description: "Across 15 states and 1000 cities",
    },
    {
      icon: briefcase,
      value: 5,
      suffix: "+",
      label: "Batuk Offerings",
      description: "Diverse offerings for every goal",
    },
  ];

  return (
    <section className="py-10 bg-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="p-3 sm:p-4 text-center rounded-3xl bg-gray-50 border border-slate-100 group transition-all duration-300 hover:shadow-xl"
            >
              {/* Icon */}
              <div className="flex items-center justify-center mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <img
                    src={metric.icon}
                    alt={metric.label}
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Number */}
              <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                {index === 0 && "₹"}
                <CountUp end={metric.value} />
                {metric.suffix}
              </h3>

              {/* Label */}
              <p className="text-base sm:text-lg font-semibold text-primary mb-2">
                {metric.label}
              </p>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xs mx-auto">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
