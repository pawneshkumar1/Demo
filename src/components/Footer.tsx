import React from "react";
import { motion } from "motion/react";
import {
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  ShieldCheck,
  Facebook,
} from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/batukify",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/people/Batuk-App/61567131733842/?sk",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://in.linkedin.com/company/bharat-batuk-private-limited",
    },
    { name: "Twitter", icon: Twitter, url: "https://x.com/Batukify" },
  ];
  return (
    <footer className="bg-primary pt-8 pb-8 border-t border-white/10 text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <img
                src="/new-ui/logo.png"
                alt="Batuk Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-slate-300 leading-relaxed mb-8 font-medium">
              Empowering partners with secure digital gold and silver solutions
              for smarter wealth creation.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ name, icon: Icon, url }, i) => (
                <motion.a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${name}`}
                  whileHover={{
                    y: -5,
                    backgroundColor: "rgba(255,255,255,0.2)",
                  }}
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white transition-all border border-white/10"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-800 font-display text-white mb-8 ">
              Contact Us
            </h4>
            <ul className="space-y-6">
              <li className="flex gap-4 text-slate-300">
                <MapPin className="text-gold shrink-0" size={20} />
                <span className="text-sm font-medium">
                  Office No 2, 3rd floor, A-1, Sector 9, Noida, Uttar Pradesh-
                  201301
                </span>
              </li>
              <li className="flex gap-4 text-slate-300">
                <Mail className="text-gold shrink-0" size={20} />
                <span className="text-sm font-medium">connect@batuk.in</span>
              </li>
              {/* <li className="flex gap-4 text-slate-300">
                <Phone className="text-gold shrink-0" size={20} />
                <span className="text-sm font-medium">+91 (800) 123-4567</span>
              </li> */}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-lg font-800 font-display text-white mb-8 ">
              Explore
            </h4>
            <ul className="space-y-4">
              {[
                { name: "Home", path: "/" },
                { name: "Blog", path: "/blog" },
                { name: "Contact Us", path: "/contact-us" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-slate-300 hover:text-white transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-800 font-display text-white mb-8 ">
              Resources
            </h4>
            <ul className="space-y-4">
              {[
                { name: "FAQs", path: "/faqs" },
                { name: "Terms & Conditions", path: "/policy/terms" },
                { name: "Privacy Policy", path: "/policy/privacy" },
                { name: "Shipping Policy", path: "/policy/shipping" },
                // { name: "Refund Policy", path: "/policy/refund" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-slate-300 hover:text-white transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-300 font-medium">
            © Copyright 2026 Bharat Batuk Private Limited All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-800 uppercase">
              Secure SSL Encryption
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
