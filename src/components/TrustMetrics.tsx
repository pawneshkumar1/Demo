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
    <section className="py-32 bg-white relative">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-12">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="relative group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-bg-light rounded-[2rem] flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                  {React.cloneElement(metric.icon as React.ReactElement<{ className?: string }>, { 
                    className: "transition-colors duration-500 group-hover:text-white" 
                  })}
                </div>
                <h3 className="text-5xl font-800 font-display text-ink mb-3 tracking-tighter">
                  {index === 0 && '₹'}
                  <CountUp end={metric.value} />
                  {metric.suffix}
                </h3>
                <p className="text-xs font-800 text-primary uppercase tracking-[0.2em] mb-4">{metric.label}</p>
                <p className="text-base text-slate-muted leading-relaxed max-w-[250px] font-500">{metric.description}</p>
              </div>
              {index < metrics.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 w-px h-24 bg-slate-100 -translate-y-1/2" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
