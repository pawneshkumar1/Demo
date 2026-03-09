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
    <section className="py-16 bg-white overflow-hidden border-b border-slate-100">
      <div className="container-custom mb-12 text-center">
        <p className="text-xs font-800 uppercase tracking-[0.3em] text-slate-400">Trusted by leading institutions</p>
      </div>
      
      <div className="flex relative">
        <motion.div
          animate={{ x: [0, -1500] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 md:gap-24 items-center whitespace-nowrap"
        >
          {[...partners, ...partners].map((partner, index) => (
            <div key={index} className="flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-8 md:h-12 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
