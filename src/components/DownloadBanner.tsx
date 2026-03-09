import React from 'react';
import { motion } from 'motion/react';
import { Apple, PlayCircle, ShieldCheck } from 'lucide-react';

export const DownloadBanner = () => {
  return (
    <section className="py-24">
      <div className="container-custom">
        <div className="relative bg-gradient-to-br from-primary to-primary-soft rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/30">
          {/* Decorative Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.3),transparent)]" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center p-12 lg:p-24 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-800 font-display text-white mb-6 leading-tight">
                Download the <br /> Batuk App
              </h2>
              <p className="text-base sm:text-lg text-white/80 mb-10 leading-relaxed max-w-md">
                Invest in gold and silver on the go. Secure, simple, and always at your fingertips. Join 100,000+ investors today.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 md:px-8 md:py-4 rounded-2xl flex items-center gap-3 hover:bg-white/20 transition-all relative overflow-hidden group shadow-lg"
                >
                  <div className="relative z-10 flex items-center gap-3">
                    <PlayCircle size={28} />
                    <div className="text-left">
                      <p className="text-[10px] font-700 uppercase opacity-70">Get it on</p>
                      <p className="text-base md:text-lg font-800">Google Play</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shimmer" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 md:px-8 md:py-4 rounded-2xl flex items-center gap-3 hover:bg-white/20 transition-all relative overflow-hidden group shadow-lg"
                >
                  <div className="relative z-10 flex items-center gap-3">
                    <Apple size={28} />
                    <div className="text-left">
                      <p className="text-[10px] font-700 uppercase opacity-70">Download on the</p>
                      <p className="text-base md:text-lg font-800">App Store</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shimmer" />
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative w-64 h-[500px] bg-slate-900 rounded-[3rem] border-[10px] border-slate-800 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20" />
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600"
                  alt="App UI"
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              </div>
              
              {/* Floating Element */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 -left-10 glass-card p-4 rounded-2xl shadow-xl hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center">
                    <ShieldCheck size={16} />
                  </div>
                  <p className="text-sm font-800 text-slate-900">Verified Secure</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
