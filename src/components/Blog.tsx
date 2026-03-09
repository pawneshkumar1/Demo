import React from 'react';
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
    <section className="py-24 bg-bg-light">
      <div className="container-custom">
        <div className="mb-12 text-left max-w-2xl">
          <h2 className="text-4xl lg:text-5xl font-800 font-display text-slate-900 mb-4 leading-tight tracking-tight">
            Insights &amp; <span className="text-primary">Market Trends</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/blog" className="inline-flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-bold transition-all duration-300 border border-primary/20 group">
            View All Articles
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
