import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";

import img1 from "../../assets/images/get-started-1.avif";
import img2 from "../../assets/images/get-started-2.avif";

const images = [img1, img2];

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-24 pb-10 overflow-hidden">
      {/* Background shape */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 -z-10" />

      {/* Floating blob */}
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-10"
      />

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl font-black leading-tight text-slate-900 mb-6">
              Grow Your Earnings <br />
              with <span className="text-primary">Batuk</span>
            </h1>

            <p className="text-slate-600 text-md mb-8 max-w-lg leading-relaxed">
              Partner with one of India’s fastest-growing digital gold & silver
              platforms and earn attractive referral when your network buys 24K
              999 pure digital gold and silver.
            </p>

            <p className="text-md text-black font-semibold mb-3">
              Start Your Partner Journey Today
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="md" icon={<ArrowRight className="w-5 h-5" />}>
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT SIDE (CARD STYLE IMAGE SLIDER) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex justify-center lg:justify-end"
          >
            {/* Card wrapper (same style as your metrics cards) */}
            <motion.div
              whileHover={{
                y: -8,
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
              }}
              className="w-[90%] max-w-[420px] rounded-[2rem] 
              bg-gradient-to-br from-purple-100 to-white 
              border border-white shadow-sm transition-all duration-300"
            >
              {/* Inner container */}
              <div className="relative rounded-[1.75rem] overflow-hidden">
                {/* Aspect ratio placeholder */}
                <img
                  src={images[0]}
                  alt="placeholder"
                  className="w-full h-auto opacity-0 invisible"
                />

                {/* Slider */}
                <AnimatePresence>
                  <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt="Gold Investment"
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8 }}
                  />
                </AnimatePresence>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { ArrowRight, Play } from "lucide-react";
// import { Button } from "../../components/Button";
// import { Link } from "react-router-dom";
// import img1 from "../../assets/images/get-started-1.avif";
// import img2 from "../../assets/images/get-started-2.avif";

// const images = [img1, img2];

// export const Hero = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Auto slide logic
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % images.length);
//     }, 3000); // 3 sec

//     return () => clearInterval(interval);
//   }, []);
//   return (
//     <section className="relative pt-23 pb-8 overflow-hidden">
//       <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 -z-10" />
//       <motion.div
//         animate={{
//           y: [0, 20, 0],
//           rotate: [0, -5, 0],
//         }}
//         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//         className="absolute bottom-1/4 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-10"
//       />

//       <div className="container-custom">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Left Content */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h3 className="text-3xl font-black font-display leading-[1.1]  text-slate-900 mb-6">
//               Grow Your Earnings <br />
//               with <span className="text-primary">Batuk</span>
//             </h3>

//             <p className="text-slate-600 text-md mt-1 mb-10 max-w-lg">
//               Partner with one of India’s fastest-growing digital gold & silver
//               platforms and earn attractive referral when your network buys 24K
//               999 pure digital gold and silver.
//             </p>

//             <p className="text-md text-black font-semibold mb-2">
//               Start Your Partner Journey Today
//             </p>
//             <div className="flex flex-wrap gap-3 md:gap-4">
//               <Link to="/register">
//                 <Button size="md" icon={<ArrowRight className="w-5 h-5" />}>
//                   Get Started
//                 </Button>
//               </Link>
//             </div>
//           </motion.div>

//           {/* Right Illustration (Auto Slider) */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1, ease: "easeOut" }}
//             className="relative w-full flex justify-center lg:justify-end mt-12 lg:mt-0"
//           >
//             {/* Slider sizing wrapper */}
//             <div className="relative w-[90%] max-w-[360px] sm:max-w-[400px] lg:max-w-[420px]">
//               <div className="relative z-10 rounded-3xl overflow-hidden bg-slate-50 shadow-2xl shadow-primary/10 border-[6px] sm:border-8 border-white">
//                 {/* Invisible placeholder locks responsive height to the first image's aspect ratio */}
//                 <img
//                   src={images[0]}
//                   alt="layout placeholder"
//                   className="w-full h-auto opacity-0 invisible"
//                   aria-hidden="true"
//                 />

//                 <AnimatePresence>
//                   <motion.img
//                     key={currentIndex}
//                     src={images[currentIndex]}
//                     alt="Gold Investment"
//                     className="absolute inset-0 w-full h-full object-cover"
//                     initial={{ opacity: 0, scale: 1.05 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.95 }}
//                     transition={{ duration: 1, ease: "easeInOut" }}
//                   />
//                 </AnimatePresence>

//                 <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-tr from-primary/20 to-transparent" />
//               </div>

//               {/* Floating Card (Positioned relative to the slider wrapper) */}
//               {/* <motion.div
//                 animate={{ y: [0, 15, 0] }}
//                 transition={{
//                   duration: 5,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                   delay: 1,
//                 }}
//                 className="absolute -bottom-8 -left-4 sm:-left-12 glass-card p-4 rounded-2xl shadow-2xl shadow-primary/5 z-20 hidden md:block bg-white/80 backdrop-blur-lg border border-white/40"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-gold/20 text-gold rounded-full flex items-center justify-center">
//                     <Play size={18} fill="currentColor" />
//                   </div>
//                   <div className="text-left">
//                     <p className="text-[10px] font-700 text-slate-400 uppercase">
//                       Gold Price
//                     </p>
//                     <p className="text-lg font-800 text-slate-900 leading-none mt-0.5">
//                       ₹6,240/g
//                     </p>
//                   </div>
//                 </div>
//               </motion.div> */}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };
