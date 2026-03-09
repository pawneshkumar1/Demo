import React from 'react';
import { motion } from 'motion/react';
import { Star, Percent, Headphones, BarChart3, Rocket, Megaphone } from 'lucide-react';

export const WhyPartner = () => {
  const features = [
    {
      icon: <Star className="text-gold" size={24} />,
      title: 'Exclusive Access',
      description: 'Early access to new products, features, and beta releases before the general public.'
    },
    {
      icon: <Percent className="text-gold" size={24} />,
      title: 'Attractive Referrals',
      description: 'Industry-leading commission structure with recurring earnings on every investment.'
    },
    {
      icon: <Headphones className="text-gold" size={24} />,
      title: 'Enhanced Support',
      description: 'Dedicated relationship manager to help you navigate through queries and operations.'
    },
    {
      icon: <BarChart3 className="text-gold" size={24} />,
      title: 'Insightful Analytics',
      description: 'A comprehensive dashboard to track your performance and client portfolios in real-time.'
    },
    {
      icon: <Rocket className="text-gold" size={24} />,
      title: 'Comprehensive Onboarding',
      description: 'Easy-to-follow training modules to get you up and running in less than 24 hours.'
    },
    {
      icon: <Megaphone className="text-gold" size={24} />,
      title: 'Marketing Support',
      description: 'Ready-to-use creative assets, banners, and social media templates for your branding.'
    }
  ];

  return (
    <section className="py-32 bg-ink text-white overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(124,77,255,0.1),transparent_50%)]" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(197,160,89,0.05),transparent_50%)]" />

      <div className="container-custom relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-gold font-extrabold uppercase tracking-[0.3em] text-[10px] mb-6"
          >
            Partnership Benefits
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-6xl font-extrabold font-display mb-8 tracking-tighter"
          >
            Elevate Your <span className="text-primary-soft">Business</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/60 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Join India's most sophisticated fintech ecosystem and provide your clients with world-class investment tools.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group p-12 rounded-[3rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-white/10">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-extrabold font-display mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
