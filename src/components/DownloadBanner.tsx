import React from "react";
import { motion } from "motion/react";

export const DownloadBanner = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero-style Light Section */}
      <section className="w-full bg-primary/5 py-6 relative overflow-hidden border-y border-slate-100">
        {/* Skewed Background Element (Matching Hero) */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 -z-0" />

        {/* Animated Background Blobs */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-10 w-24 h-24 bg-gold/10 rounded-3xl blur-xl -z-0"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-0"
        />
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-4 items-center relative z-10">
          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-4 text-slate-900"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full w-fit border border-slate-200 shadow-sm"
            >
              <i className="fa-solid fa-circle-check text-sm text-gold"></i>
              <span className="text-xs font-700  uppercase text-slate-600">
                Verified Secure Protocol
              </span>
            </motion.div>

            <div className="flex flex-col gap-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-3xl lg:text-5xl font-black font-display leading-[1.1]  text-slate-900"
              >
                Download the <br />
                <span className="text-primary">Batuk App</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg lg:text-xl text-slate-600 max-w-lg leading-relaxed font-medium"
              >
                Invest in gold and silver on the go. Secure, simple, and always
                at your fingertips. Join 100,000+ investors today.
              </motion.p>
            </div>

            {/* DOWNLOAD BUTTONS */}
            <div className="flex flex-row gap-4">
              {/* Android */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex w-1/2 sm:w-auto items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2.5 sm:py-3 bg-slate-900 border border-slate-800 rounded-xl text-white shadow-xl justify-center sm:justify-start"
              >
                <i className="fa-brands fa-google-play text-lg sm:text-3xl"></i>
                <div className="text-left">
                  <p className="text-[8px] sm:text-[10px] uppercase font-bold text-slate-400">
                    Get it on
                  </p>
                  <p className="text-xs sm:text-lg font-bold">Google Play</p>
                </div>
              </motion.button>

              {/* iOS */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex w-1/2 sm:w-auto items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2.5 sm:py-3 bg-slate-900 border border-slate-800 rounded-xl text-white shadow-xl justify-center sm:justify-start"
              >
                <i className="fa-brands fa-apple text-lg sm:text-3xl"></i>
                <div className="text-left">
                  <p className="text-[8px] sm:text-[10px] uppercase font-bold text-slate-400">
                    Download on the
                  </p>
                  <p className="text-xs sm:text-lg font-bold">App Store</p>
                </div>
              </motion.button>
            </div>

            {/* Stats Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center gap-8 mt-4"
            >
              <div>
                <p className="text-3xl font-black text-slate-900">100k+</p>
                <p className="text-xs text-slate-600 font-bold uppercase">
                  Active Users
                </p>
              </div>
              <div className="h-10 w-px bg-slate-200"></div>
              <div>
                <p className="text-3xl font-black text-slate-900">4.9/5</p>
                <p className="text-xs text-slate-600 font-bold uppercase">
                  App Rating
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Smartphone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex justify-center items-center lg:justify-end"
          >
            <div className="relative z-20 w-72 lg:w-80 aspect-[10/19] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl overflow-hidden ring-4 ring-white/5">
              {/* Screen Content (Simulated App UI) */}
              <div className="absolute inset-0 bg-white flex flex-col">
                <div className="h-6 w-1/3 bg-slate-800 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-2xl z-30"></div>
                <div className="p-6 pt-10 flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <i className="fa-solid fa-bars text-slate-400"></i>
                    <span className="font-bold text-slate-800 text-sm">
                      Portfolio
                    </span>
                    <i className="fa-solid fa-bell text-slate-400"></i>
                  </div>

                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl p-6 text-white shadow-lg shadow-yellow-500/20"
                  >
                    <p className="text-[10px] opacity-80">Total Balance</p>
                    <p className="text-xl font-bold">₹12,4500.00</p>
                    <div className="mt-4 flex justify-between items-end">
                      <p className="text-[8px] font-mono whitespace-nowrap">
                        **** 4432
                      </p>
                      <span className="fa-solid fa-credit-card text-sm"></span>
                    </div>
                  </motion.div>

                  <div className="flex flex-col gap-3">
                    <p className="text-xs font-bold text-slate-800">
                      Gold Market (24h)
                    </p>
                    <div className="h-28 bg-slate-50 rounded-xl relative overflow-hidden border border-slate-100">
                      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-yellow-100 to-transparent"></div>
                      <svg
                        className="absolute bottom-4 left-0 w-full h-12"
                        preserveAspectRatio="none"
                        viewBox="0 0 100 100"
                      >
                        <motion.path
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 1.5, delay: 1 }}
                          d="M0,80 Q25,20 50,60 T100,10"
                          fill="none"
                          stroke="#eab308"
                          strokeWidth="4"
                        ></motion.path>
                      </svg>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex-1 bg-[#5b2c90] text-white p-2 rounded-lg text-center text-[10px] font-bold">
                      Buy Gold
                    </div>
                    <div className="flex-1 bg-slate-100 text-slate-800 p-2 rounded-lg text-center text-[10px] font-bold">
                      Sell
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative Shapes */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl -z-10"
            ></motion.div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-2xl -z-10"></div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
