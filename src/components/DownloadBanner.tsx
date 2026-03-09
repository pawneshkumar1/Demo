import React from 'react';
import { motion } from 'motion/react';
import { Apple, PlayCircle, ShieldCheck } from 'lucide-react';

export const DownloadBanner = () => {
  return (
    <section className="py-32">
      <div className="container-custom">
        <div className="relative bg-ink rounded-[4rem] overflow-hidden shadow-[0_48px_96px_-16px_rgba(0,0,0,0.3)]">
          {/* Decorative Background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(124,77,255,0.15),transparent_70%)]" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,rgba(197,160,89,0.1),transparent_50%)]" />
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center p-16 lg:p-32 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-gold font-800 uppercase tracking-[0.3em] text-[10px] mb-8"
              >
                Mobile Experience
              </motion.div>
              <h2 className="text-5xl lg:text-7xl font-800 font-display text-white mb-8 leading-[0.95] tracking-tighter">
                Invest <br /> <span className="text-primary-soft">Anywhere.</span>
              </h2>
              <p className="text-xl text-white/50 mb-12 leading-relaxed max-w-md font-500">
                The most sophisticated digital gold platform, now in the palm of your hand. Secure, elegant, and powerful.
              </p>
              
              <div className="flex flex-wrap gap-6">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 text-white px-8 py-4 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-all shadow-xl"
                >
                  <PlayCircle size={32} className="text-primary-soft" />
                  <div className="text-left">
                    <p className="text-[10px] font-800 uppercase tracking-widest opacity-50">Get it on</p>
                    <p className="text-lg font-800 tracking-tight">Google Play</p>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 text-white px-8 py-4 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-all shadow-xl"
                >
                  <Apple size={32} className="text-primary-soft" />
                  <div className="text-left">
                    <p className="text-[10px] font-800 uppercase tracking-widest opacity-50">Download on the</p>
                    <p className="text-lg font-800 tracking-tight">App Store</p>
                  </div>
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative w-72 h-[580px] bg-black rounded-[3.5rem] border-[12px] border-white/5 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-white/5 rounded-b-3xl z-20" />
                <img
                  src="https://images.unsplash.com/photo-1556656793-062ff9878258?auto=format&fit=crop&q=80&w=600"
                  alt="App UI"
                  className="w-full h-full object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
              </div>
              
              {/* Floating Element */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-24 -left-12 glass-card px-6 py-4 rounded-2xl shadow-2xl hidden md:block border-white/10"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-500/20">
                    <ShieldCheck size={20} />
                  </div>
                  <p className="text-xs font-800 text-ink uppercase tracking-widest">Bank Grade Security</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
