import React from "react";
import { motion } from "motion/react";
import { SectionHeader } from "./SectionHeader";
import { Button } from "./Button";
import goldIcon from "../assets/icons/Offerings/GoldIcon.avif";
import goldSIP from "../assets/icons/Offerings/GoldSIP.avif";
import spotGold from "../assets/icons/Offerings/spotGold.avif";

export const Offerings = () => {
  const products = [
    {
      title: "Digital Gold",
      tag: "Secure",
      image: goldIcon,
      description: [
        "Buy and Sell Gold & Silver digitally starting from Rs. 100.",
        "Secure, insured storage accessible via our intuitive app.",
      ],
    },
    {
      title: "Gold & Silver SIP",
      tag: "Popular",
      image: goldSIP,
      description: [
        "Regular contributions to build your gold and silver savings.",
        "Benefit from cost averaging and align with long-term financial goals.",
      ],
    },
    {
      title: "Jewellery",
      tag: "Premium",
      image: spotGold,
      description: [
        "High-quality certified gold coins, bars, and stunning jewellery.",
        "Delivered securely and insured, cheaper than market prices.",
      ],
    },
  ];

  return (
    <section className="py-12 bg-bg-light">
      <div className="container-custom">
        <SectionHeader
          title={
            <>
              Batuk's <span className="text-primary">Offerings</span>
            </>
          }
          subtitle="Explore our curated selection of gold and silver products designed for maximum security."
          align="center"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -15 }}
              className="group bg-white rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
            >
              <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-800 font-display text-slate-900">
                    {product.title}
                  </h3>
                </div>
                <div className="text-slate-600 mb-8 leading-relaxed space-y-2">
                  {product.description.map((sentence, descIndex) => (
                    <div key={descIndex} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 flex-shrink-0" />
                      <p className="text-sm md:text-base">{sentence}</p>
                    </div>
                  ))}
                </div>
                <Button fullWidth variant="primary" size="md">
                  Register Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
