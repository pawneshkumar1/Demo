import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Twitter, Linkedin, Github, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-slate-100">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45" />
              </div>
              <span className="text-xl font-800 font-display tracking-tight text-primary">Batuk</span>
            </div>
            <p className="text-slate-500 leading-relaxed mb-8">
              Empowering investors through digital precision in gold and silver wealth creation. Reimagining investment for the modern age.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Linkedin, Github].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, color: '#5B2C8F' }}
                  className="w-10 h-10 rounded-xl bg-bg-light flex items-center justify-center text-slate-400 transition-all"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-800 font-display text-slate-900 mb-8">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex gap-4 text-slate-500">
                <MapPin className="text-primary shrink-0" size={20} />
                <span className="text-sm">Sector 62, Noida, Uttar Pradesh, India</span>
              </li>
              <li className="flex gap-4 text-slate-500">
                <Mail className="text-primary shrink-0" size={20} />
                <span className="text-sm">connect@batuk.in</span>
              </li>
              <li className="flex gap-4 text-slate-500">
                <Phone className="text-primary shrink-0" size={20} />
                <span className="text-sm">+91 (800) 123-4567</span>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-lg font-800 font-display text-slate-900 mb-8">Explore</h4>
            <ul className="space-y-4">
              {['Digital Gold', 'Digital Silver', 'Savings Plan (SIP)', 'Buy-Back Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-800 font-display text-slate-900 mb-8">Resources</h4>
            <ul className="space-y-4">
              {['Investment Guide', 'Market Insights', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-400">
            © 2024 Batuk FinTech Solutions Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-800 uppercase tracking-widest">Secure SSL Encryption</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
