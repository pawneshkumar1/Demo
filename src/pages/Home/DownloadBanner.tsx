import React from "react";
import { motion } from "motion/react";
import downloadApp from "../../assets/images/DownloadBanner/Download_app.avif";
import QRCode from "../../assets/images/DownloadBanner/downloadQR.png";

export const DownloadBanner = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero-style Light Section */}
      <section className="w-full bg-primary/5 py-12 relative overflow-hidden border-y border-slate-100">
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
                Trusted & Secure Platform
              </span>
            </motion.div>

            <div className="flex flex-col gap-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-3xl font-black font-display leading-[1.1]  text-slate-900"
              >
                Download the {""}
                <span className="text-primary">Batuk App</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-md text-slate-600 max-w-lg leading-relaxed font-medium"
              >
                Buy, save, and manage 24K 999 purity digital gold and silver
                anytime.
              </motion.p>
            </div>

            {/* QR + DOWNLOAD BUTTONS */}
            <div className="rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-4 w-fit">
              {/* QR CODE */}
              <div className="flex items-center justify-center">
                <img
                  src={QRCode} // put your QR image path here
                  alt="QR Code"
                  className="w-32 h-32 object-contain bg-white p-2 rounded-lg"
                />
              </div>

              {/* Divider + OR */}
              <div className="hidden sm:flex flex-col items-center justify-center text-white">
                <div className="w-[1px] h-10 bg-primary mb-2"></div>
                <span className="font-bold text-lg text-primary">OR</span>
                <div className="w-[1px] h-10 bg-primary mt-2"></div>
              </div>

              {/* Mobile OR */}
              <div className="sm:hidden text-white font-bold text-lg">OR</div>

              {/* DOWNLOAD BUTTONS */}
              <div className="flex flex-col gap-3 w-full sm:w-auto">
                {/* Android */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.batuk.application&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-4 py-2 bg-black rounded-lg text-white shadow-lg w-full"
                  >
                    <i className="fa-brands fa-google-play text-2xl"></i>

                    <div className="text-left leading-tight">
                      <p className="text-[10px] uppercase font-semibold">
                        Download the app
                      </p>
                      <p className="text-lg font-bold">Google Play</p>
                    </div>
                  </motion.button>
                </a>

                {/* iOS */}
                <a
                  href="https://apps.apple.com/in/app/batuk-digital-gold-silver/id6478106976"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-4 py-2 bg-black rounded-lg text-white shadow-lg w-full"
                  >
                    <i className="fa-brands fa-apple text-2xl"></i>

                    <div className="text-left leading-tight">
                      <p className="text-[10px] uppercase font-semibold">
                        Download the app
                      </p>
                      <p className="text-lg font-bold">App Store</p>
                    </div>
                  </motion.button>
                </a>
              </div>
            </div>
            {/* STATS */}
            {/* <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-8 mt-4"
            >
              <div>
                <p className="text-2xl font-black">50k+</p>
                <p className="text-xs text-slate-600 font-bold uppercase">
                  Downloads
                </p>
              </div>

              <div className="h-10 w-px bg-slate-200"></div>

              <div>
                <p className="text-2xl font-black">4.9/5</p>
                <p className="text-xs text-slate-600 font-bold uppercase">
                  App Rating
                </p>
              </div>
            </motion.div> */}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex justify-center items-center lg:justify-end"
          >
            <img
              src={downloadApp}
              alt="Batuk App Preview"
              className="w-full object-contain"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};
