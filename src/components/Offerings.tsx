import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, TrendingUp, Gem } from 'lucide-react';

export const Offerings = () => {
  const products = [
    {
      title: 'Digital Gold',
      tag: 'Secure',
      image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=600',
      description: 'Buy 24K 99.9% pure gold at live market rates starting from ₹1.',
      icon: <ShieldCheck size={20} />
    },
    {
      title: 'Gold & Silver SIP',
      tag: 'Popular',
      image: 'https://images.unsplash.com/photo-1589750670744-dc9633e0f124?auto=format&fit=crop&q=80&w=600',
      description: 'Automate your wealth creation with daily, weekly, or monthly SIPs.',
      icon: <TrendingUp size={20} />
    },
    {
      title: 'Jewellery',
      tag: 'Premium',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600',
      description: 'Exquisite physical collections with guaranteed buy-back and purity.',
      icon: <Gem size={20} />
    }
  ];

  return (
    <section className="py-24 bg-bg-light">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-800 font-display text-slate-900 mb-4"
            >
              Batuk's Offerings
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-600"
            >
              Explore our curated selection of gold and silver investment products designed for maximum security.
            </motion.p>
          </div>
          <motion.button
            whileHover={{ x: 5 }}
            className="text-primary font-700 flex items-center gap-2 hover:underline"
          >
            View All Products <ArrowRight size={18} />
          </motion.button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -15 }}
              className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-800 text-primary uppercase tracking-widest">
                  {product.tag}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center">
                    {product.icon}
                  </div>
                  <h3 className="text-2xl font-800 font-display text-slate-900">{product.title}</h3>
                </div>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  {product.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 md:py-4 rounded-2xl bg-primary text-white font-700 text-sm md:text-base shadow-md shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Register Now</span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shimmer" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
