import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import img1 from "../assets/images/get-started-1.avif";
import img2 from "../assets/images/get-started-2.avif";
// import img3 from "../assets/images/get-started-3.avif";

const images = [img1, img2 /*, img3*/];

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // 3 sec

    return () => clearInterval(interval);
  }, []);
  return (
    <section className="relative pt-25 pb-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 -z-10" />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
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
              <span className="text-xs font-700 uppercase  text-slate-600">
                India's Gold Platform
              </span>
            </motion.div>

            <h3 className="text-3xl lg:text-5xl font-black font-display leading-[1.1]  text-slate-900 mb-6">
              Boost your earnings <br />
              with <span className="text-primary">Batuk</span>
            </h3>

            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg">
              Experience unparalleled support, smart tools, and step-by-step
              assistance to grow your wealth through digital gold investments.
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4">
              <Link to="/register">
                <Button size="md" icon={<ArrowRight className="w-5 h-5" />}>
                  Get Started
                </Button>
              </Link>
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
              <p className="text-sm text-slate-600 font-500">
                Joined by{" "}
                <span className="text-slate-900 font-700">10,000+</span>{" "}
                partners across India
              </p>
            </div>
          </motion.div>

          {/* Right Illustration (Auto Slider) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative max-w-lg mx-auto"
          >
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 border-8 border-white">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt="Gold Investment"
                className="w-full h-auto"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.6 }}
              />

              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
            </div>

            {/* Floating Card (UNCHANGED) */}
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-10 -left-10 glass-card p-4 rounded-2xl shadow-xl z-20 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold/20 text-gold rounded-full flex items-center justify-center">
                  <Play size={18} fill="currentColor" />
                </div>
                <div>
                  <p className="text-[10px] font-700 text-slate-400 uppercase">
                    Gold Price
                  </p>
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
