import React from 'react';
import { ArrowUpCircle, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export const RecentSIPs: React.FC = () => {
  const sips = [
    { title: 'Gold SIP Credit', date: 'Oct 24, 2023 • 2:30 PM', amount: '₹5,000', detail: '+0.84 g', icon: ArrowUpCircle, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Silver SIP Credit', date: 'Oct 18, 2023 • 11:15 AM', amount: '₹2,500', detail: '+34.1 g', icon: ArrowUpCircle, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Upcoming Gold SIP', date: 'Nov 01, 2023', amount: '₹5,000', detail: '', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', upcoming: true },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-bold">Recent SIPs</h4>
        <span className="text-[10px] font-bold text-primary cursor-pointer hover:underline">View All</span>
      </div>
      <div className="space-y-4">
        {sips.map((sip, i) => (
          <div key={i} className={cn("flex items-center gap-3", sip.upcoming && "opacity-50")}>
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", sip.bg, sip.color)}>
              <sip.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold leading-none mb-1 truncate">{sip.title}</p>
              <p className="text-[10px] text-slate-400 font-medium">{sip.date}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[13px] font-black text-slate-900">{sip.amount}</p>
              {sip.detail && <p className="text-[10px] text-green-500 font-bold">{sip.detail}</p>}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
