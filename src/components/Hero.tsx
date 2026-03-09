import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative pt-40 pb-24 lg:pt-56 lg:pb-40 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 -z-10" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(91,44,143,0.03),transparent_50%)] -z-10" />
      
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-[15%] w-48 h-48 bg-gold/5 rounded-full blur-3xl -z-10"
      />
      
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-white/50 backdrop-blur-sm px-5 py-2 rounded-full border border-white/40 shadow-sm mb-8"
            >
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-ink/60">Premium Digital Gold Platform</span>
            </motion.div>
            
            <h1 className="text-6xl lg:text-[5.5rem] font-extrabold leading-[0.95] text-ink mb-8 tracking-tighter">
              Wealth <br />
              <span className="text-gradient">Reimagined.</span>
            </h1>
            
            <p className="text-xl text-slate-muted mb-12 leading-relaxed max-w-lg font-medium">
              Experience the future of digital gold. Secure, transparent, and built for the next generation of investors.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-primary text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest shadow-2xl shadow-primary/30 transition-all relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-3">Start Investing <ArrowRight className="w-4 h-4" /></span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-ink border border-slate-200 px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"
              >
                Our Story
              </motion.button>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-100 flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-bg-light overflow-hidden shadow-sm">
                    <img
                      src={`https://i.pravatar.cc/100?u=${i + 10}`}
                      alt="User"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm text-ink font-bold">10,000+ Partners</p>
                <p className="text-xs text-slate-muted font-medium uppercase tracking-wider">Growing across India</p>
              </div>
            </div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border-[12px] border-white">
              <img
                src="https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=800&auto=format&fit=crop"
                alt="Gold Bars"
                className="w-full h-[600px] object-cover scale-110 hover:scale-100 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
            </div>
            
            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 -right-8 glass-card px-8 py-6 rounded-[2rem] z-20 hidden md:block"
            >
              <p className="text-[10px] font-extrabold text-slate-muted uppercase tracking-[0.2em] mb-1">Market Cap</p>
              <p className="text-3xl font-extrabold text-ink tracking-tighter">₹2.4T</p>
              <div className="mt-2 flex items-center gap-2 text-emerald-500 text-xs font-bold">
                <ArrowRight className="-rotate-45" size={14} />
                <span>+18.4%</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-12 -left-8 glass-card px-8 py-6 rounded-[2rem] z-20 hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold text-white rounded-2xl flex items-center justify-center shadow-lg shadow-gold/30">
                  <Play size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-slate-muted uppercase tracking-[0.2em]">Live Price</p>
                  <p className="text-2xl font-extrabold text-ink tracking-tighter">₹6,240.50</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
