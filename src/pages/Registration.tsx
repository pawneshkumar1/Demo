import React from 'react';
import { motion } from 'motion/react';
import { User, Building2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Registration = () => {
  const partnerTypes = [
    {
      id: 'individual',
      title: 'Individual Partner',
      description: 'Register as an individual consultant or agent to start your journey.',
      icon: <User size={32} />,
      link: '/register/individual',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      id: 'entity',
      title: 'Entity Partner',
      description: 'Register your company or organization as a corporate partner.',
      icon: <Building2 size={32} />,
      link: '#',
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 bg-bg-light">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-800 font-display text-slate-900 mb-4"
          >
            Become a <span className="text-primary">Partner</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            Choose the partnership type that best fits your profile
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {partnerTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Link 
                to={type.link}
                className="group block bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-primary/5 hover:shadow-primary/10 hover:border-primary/20 transition-all h-full"
              >
                <div className={`w-16 h-16 ${type.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {type.icon}
                </div>
                <h3 className="text-2xl font-800 font-display text-slate-900 mb-4">{type.title}</h3>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  {type.description}
                </p>
                <div className="flex items-center gap-2 text-primary font-700">
                  Get Started <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};
