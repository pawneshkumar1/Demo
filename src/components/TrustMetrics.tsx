import React from 'react';
import { motion, useInView } from 'motion/react';
import { Wallet, Users, LayoutGrid } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

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
      icon: <Wallet className="text-primary" size={24} />,
      value: 5,
      suffix: ' Crore+',
      label: 'Savings Managed',
      description: 'Wealth secured by Batuk partners'
    },
    {
      icon: <Users className="text-primary" size={24} />,
      value: 500,
      suffix: '+',
      label: 'Trusted Partners',
      description: 'Across 15 states and 1000 cities'
    },
    {
      icon: <LayoutGrid className="text-primary" size={24} />,
      value: 5,
      suffix: '+',
      label: 'Investment Products',
      description: 'Diverse offerings for every goal'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2rem] bg-bg-light border border-slate-100 group transition-all duration-300"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                {metric.icon}
              </div>
              <h3 className="text-4xl font-800 font-display text-slate-900 mb-2">
                {index === 0 && '₹'}
                <CountUp end={metric.value} />
                {metric.suffix}
              </h3>
              <p className="text-lg font-700 text-primary mb-2">{metric.label}</p>
              <p className="text-sm text-slate-500 leading-relaxed">{metric.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
