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
    <section className="py-32 bg-bg-light relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary font-extrabold uppercase tracking-[0.3em] text-[10px] mb-4"
            >
              Our Collections
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl lg:text-6xl font-extrabold font-display text-ink mb-6 tracking-tighter"
            >
              Exquisite <span className="text-gradient">Offerings</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-muted leading-relaxed"
            >
              Discover a world of secure investments and timeless beauty, crafted for those who demand the best.
            </motion.p>
          </div>
          <motion.button
            whileHover={{ x: 5 }}
            className="text-ink font-extrabold text-sm uppercase tracking-widest flex items-center gap-3 group"
          >
            Explore All <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-ink group-hover:text-white transition-all"><ArrowRight size={18} /></div>
          </motion.button>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-700 group-hover:shadow-primary/20">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
                <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full text-[10px] font-extrabold text-white uppercase tracking-[0.2em]">
                  {product.tag}
                </div>

                <div className="absolute bottom-0 left-0 w-full p-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md text-white rounded-2xl flex items-center justify-center border border-white/20">
                      {product.icon}
                    </div>
                    <h3 className="text-3xl font-extrabold font-display text-white tracking-tight">{product.title}</h3>
                  </div>
                  <p className="text-white/70 mb-8 leading-relaxed font-medium">
                    {product.description}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 rounded-2xl bg-white text-ink font-extrabold text-xs uppercase tracking-widest shadow-xl transition-all duration-300"
                  >
                    Get Started
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
