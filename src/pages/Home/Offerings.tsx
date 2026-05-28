import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/src/components/SectionHeader";

import digitalGoldIcon from "@/src/assets/icons/Offerings/DigitalGold.avif";
import digitalSilverIcon from "@/src/assets/icons/Offerings/DigitalSilver.avif";
import goldSipIcon from "@/src/assets/icons/Offerings/GoldSIP.avif";
import silverSipIcon from "@/src/assets/icons/Offerings/SilverSip.avif";
import jewelleryIcon from "@/src/assets/icons/Offerings/Jewellery.avif";
import giftCardIcon from "@/src/assets/icons/Offerings/GiftCard.avif";

export const Offerings = () => {
  const products = [
    {
      title: "Digital Gold",
      icon: digitalGoldIcon,
      gradient: "from-amber-100/50 to-white",
      description:
        "Buy 24K digital gold online securely backed by trusted MMTC-PAMP & Augmont refinery. Buy, sell, redeem or gift anytime with ease.",
    },
    {
      title: "Digital Silver",
      icon: digitalSilverIcon,
      gradient: "from-slate-100 to-white",
      description:
        "Buy 999 pure digital silver online securely backed by trusted MMTC-PAMP & Augmont refinery. Buy, sell, redeem or gift anytime with ease.",
    },
    {
      title: "Gold SIP (Daily / Weekly / Monthly)",
      icon: goldSipIcon,
      gradient: "from-purple-100 to-white",
      description:
        "Automate gold savings with goal-based SIP plans from ₹100. Choose daily, weekly, or monthly and grow consistently",
    },
    {
      title: "Silver SIP (Daily / Weekly / Monthly)",
      icon: silverSipIcon,
      gradient: "from-indigo-50 to-white",
      description:
        "Build consistent silver savings with flexible SIP plans — daily, weekly, or monthly.",
    },
    {
      title: "Jewellery",
      icon: jewelleryIcon,
      gradient: "from-yellow-50 to-white",
      description:
        "Shop BIS-hallmarked gold jewellery and coins. High-quality, machine-made designs for every celebration.",
    },
    {
      title: "Gift Cards",
      icon: giftCardIcon,
      gradient: "from-purple-50 to-white",
      description:
        "Gift digital gold or silver instantly. A meaningful and secure gift starting from just ₹100 for every occasion.",
    },
  ];

  return (
    <section className="py-12 bg-background container-custom">
      {/* Hero Content Header */}
      <div className="mb-6">
        <SectionHeader
          title={
            <>
              Batuk <span className="text-yellow-400">Offerings</span>
            </>
          }
          subtitle="Start your gold and silver savings journey with our comprehensive
          range of products designed for every investor."
          align="center"
        />
      </div>

      {/* Solutions Bento Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
              }}
              className={`p-4 rounded-[2rem] bg-gradient-to-br ${product.gradient} flex flex-col items-center text-center border border-white shadow-sm transition-all duration-300`}
            >
              <div className="flex items-center flex-col justify-center w-full gap-2 mb-2">
                <div className="w-15 h-15 overflow-hidden">
                  <img
                    src={product.icon}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <h3 className="text-lg font-semibold text-on-background tracking-tight">
                  {product.title}
                </h3>
              </div>
              <p className="text-sm text-slate-600">{product.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offerings;
