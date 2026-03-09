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
    <section className="py-24 bg-primary text-white overflow-hidden relative">
      {/* Decorative Circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-soft/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-800 font-display mb-6"
          >
            Why Partner with Us?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-primary-soft max-w-2xl mx-auto"
          >
            Join India's fastest-growing fintech ecosystem and provide your clients with the best investment tools.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-800 font-display mb-4">{feature.title}</h3>
              <p className="text-primary-soft leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
