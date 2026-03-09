import React from 'react';
import { motion } from 'motion/react';

export const Partners = () => {
  const partners = [
    { name: 'Google', logo: 'https://logos.hunter.io/google.com' },
    { name: 'Amazon', logo: 'https://logos.hunter.io/amazon.com' },
    { name: 'Microsoft', logo: 'https://logos.hunter.io/microsoft.com' },
    { name: 'Apple', logo: 'https://logos.hunter.io/apple.com' },
    { name: 'Netflix', logo: 'https://logos.hunter.io/netflix.com' },
    { name: 'Spotify', logo: 'https://logos.hunter.io/spotify.com' },
    { name: 'Adobe', logo: 'https://logos.hunter.io/adobe.com' },
    { name: 'Slack', logo: 'https://logos.hunter.io/slack.com' },
    { name: 'Shopify', logo: 'https://logos.hunter.io/shopify.com' },
    { name: 'Uber', logo: 'https://logos.hunter.io/uber.com' },
    { name: 'Airbnb', logo: 'https://logos.hunter.io/airbnb.com' },
    { name: 'Dropbox', logo: 'https://logos.hunter.io/dropbox.com' },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="container-custom mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] font-800 uppercase tracking-[0.4em] text-slate-muted"
        >
          Institutional Grade Partnerships
        </motion.div>
      </div>
      
      <div className="flex relative">
        <div className="absolute left-0 top-0 w-40 h-full bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 w-40 h-full bg-gradient-to-l from-white to-transparent z-10" />
        
        <motion.div
          animate={{ x: [0, -1500] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="flex gap-24 md:gap-32 items-center whitespace-nowrap"
        >
          {[...partners, ...partners].map((partner, index) => (
            <div key={index} className="flex items-center justify-center grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-8 md:h-10 w-auto object-contain filter brightness-0"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
