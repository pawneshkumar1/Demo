import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import goldHeroImg from '../assets/gold_investment_hero.avif';

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 -z-10" />
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-10 w-24 h-24 bg-gold/10 rounded-3xl blur-xl -z-10"
      />
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-10"
      />

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-sm mb-6"
            >
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              <span className="text-xs font-700 uppercase tracking-wider text-slate-600">India's Premium Gold Platform</span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-800 font-display leading-[1.1] text-slate-900 mb-6">
              Boost your earnings with <span className="text-primary">Batuk</span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 mb-10 leading-relaxed max-w-lg">
              Experience unparalleled support, smart tools, and step-by-step assistance to grow your wealth through digital gold investments.
            </p>
            
            <div className="flex flex-wrap gap-3 md:gap-4">
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(91 44 143 / 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-white px-5 py-2.5 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-700 text-xs md:text-lg flex items-center gap-2 shadow-xl shadow-primary/20 transition-all relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">Get Started <ArrowRight className="w-4 h-4 md:w-5 md:h-5" /></span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shimmer" />
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent text-primary border-2 border-primary/20 px-5 py-2.5 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-700 text-xs md:text-lg hover:bg-primary/5 transition-all"
              >
                Become a Partner
              </motion.button>
            </div>

            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/100?u=${i}`}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-white"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <p className="text-sm text-slate-500 font-500">
                Joined by <span className="text-slate-900 font-700">10,000+</span> partners across India
              </p>
            </div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 border-8 border-white">
              <img
                src={goldHeroImg}
                alt="Gold Investment"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
            </div>
            
            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 glass-card p-4 rounded-2xl shadow-xl z-20 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                  <ArrowRight className="-rotate-45" size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-700 text-slate-400 uppercase">Daily Growth</p>
                  <p className="text-lg font-800 text-slate-900">+12.5%</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 glass-card p-4 rounded-2xl shadow-xl z-20 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold/20 text-gold rounded-full flex items-center justify-center">
                  <Play size={18} fill="currentColor" />
                </div>
                <div>
                  <p className="text-[10px] font-700 text-slate-400 uppercase">Gold Price</p>
                  <p className="text-lg font-800 text-slate-900">₹6,240/g</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
