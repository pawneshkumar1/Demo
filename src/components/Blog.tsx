import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogCard } from './BlogCard';

export const Blog = () => {
  const blogPosts = [
    {
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=600",
      category: "Investment Tips",
      date: "Oct 12, 2023",
      author: "Admin",
      title: "Why Digital Gold is the Best Inflation Hedge",
      description: "Learn how digital gold protects your purchasing power in volatile markets and why it's becoming a preferred asset class.",
      link: "/blog/view"
    },
    {
      image: "https://images.unsplash.com/photo-1589750670744-dc9633e0f124?auto=format&fit=crop&q=80&w=600",
      category: "Market Update",
      date: "Oct 10, 2023",
      author: "Sarah J.",
      title: "Understanding Gold SIPs for Long-term Wealth",
      description: "A comprehensive guide to building generational wealth through systematic investment plans in 24k digital gold.",
      link: "/blog/view"
    },
    {
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600",
      category: "Analysis",
      date: "Oct 08, 2023",
      author: "Finance Team",
      title: "Silver Market Trends: 2024 Outlook",
      description: "An in-depth analysis of silver's recent performance and the surge in industrial demand for digital silver assets.",
      link: "/blog/view"
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary font-extrabold uppercase tracking-[0.3em] text-[10px] mb-4"
            >
              Market Insights
            </motion.div>
            <h2 className="text-5xl lg:text-6xl font-extrabold font-display text-ink mb-6 tracking-tighter">
              Latest <span className="text-gradient">Perspectives</span>
            </h2>
            <p className="text-xl text-slate-muted leading-relaxed font-medium">
              Expert analysis and market updates to help you navigate the world of digital assets.
            </p>
          </div>
          <Link to="/blog">
            <motion.button
              whileHover={{ x: 5 }}
              className="text-ink font-extrabold text-sm uppercase tracking-widest flex items-center gap-3 group"
            >
              Read More <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-ink group-hover:text-white transition-all"><ArrowRight size={18} /></div>
            </motion.button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogPosts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};
