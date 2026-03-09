import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Twitter, Linkedin, Github, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white pt-32 pb-16 border-t border-slate-100 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <div className="w-5 h-5 border-2 border-white rounded-sm rotate-45" />
              </div>
              <span className="text-2xl font-800 font-display tracking-tighter text-ink">Batuk</span>
            </div>
            <p className="text-slate-muted leading-relaxed mb-10 text-base font-500">
              Empowering the next generation of investors through digital precision in gold and silver wealth creation.
            </p>
            <div className="flex gap-5">
              {[Instagram, Twitter, Linkedin, Github].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, backgroundColor: '#4A1D7A', color: '#fff' }}
                  className="w-12 h-12 rounded-2xl bg-bg-light flex items-center justify-center text-slate-muted transition-all duration-300 border border-slate-100 shadow-sm"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-800 uppercase tracking-[0.3em] text-ink mb-10">Contact</h4>
            <ul className="space-y-8">
              <li className="flex gap-5">
                <div className="w-10 h-10 rounded-xl bg-bg-light flex items-center justify-center text-primary shrink-0 border border-slate-100">
                  <MapPin size={18} />
                </div>
                <span className="text-sm text-slate-muted leading-relaxed font-500">Sector 62, Noida, <br />Uttar Pradesh, India</span>
              </li>
              <li className="flex gap-5">
                <div className="w-10 h-10 rounded-xl bg-bg-light flex items-center justify-center text-primary shrink-0 border border-slate-100">
                  <Mail size={18} />
                </div>
                <span className="text-sm text-slate-muted font-500">connect@batuk.in</span>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-800 uppercase tracking-[0.3em] text-ink mb-10">Explore</h4>
            <ul className="space-y-5">
              {['Digital Gold', 'Digital Silver', 'Savings Plan (SIP)', 'Buy-Back Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-muted hover:text-primary transition-colors font-500">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-800 uppercase tracking-[0.3em] text-ink mb-10">Resources</h4>
            <ul className="space-y-5">
              {['Investment Guide', 'Market Insights', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-muted hover:text-primary transition-colors font-500">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs text-slate-muted font-500">
            © 2024 Batuk FinTech Solutions Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-slate-muted">
            <ShieldCheck size={18} className="text-primary" />
            <span className="text-[10px] font-800 uppercase tracking-[0.2em]">Bank-Grade SSL Encryption</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
