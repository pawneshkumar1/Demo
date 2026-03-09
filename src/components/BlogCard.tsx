import React from 'react';
import { Calendar, User, ArrowRight, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface BlogCardProps {
  image: string;
  category: string;
  date: string;
  author: string;
  title: string;
  description: string;
  link: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  image,
  category,
  date,
  author,
  title,
  description,
  link,
}) => {
  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: window.location.origin + link,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.origin + link);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100">
      <div className="relative h-56 w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105" 
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary/90 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-sm">
            {category}
          </span>
        </div>
        <button 
          onClick={handleShare}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-700 hover:text-primary p-2 rounded-full shadow-sm transition-colors z-10"
          title="Share"
        >
          <Share2 size={16} />
        </button>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-slate-500 text-xs mb-3">
          <Calendar size={14} />
          <span>{date}</span>
          <span className="mx-1">•</span>
          <User size={14} />
          <span>{author}</span>
        </div>
        <Link to={link} className="text-slate-900 text-xl font-bold leading-snug mb-3 hover:text-primary transition-colors cursor-pointer block">
          {title}
        </Link>
        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {description}
        </p>
        <div className="mt-auto pt-4 border-t border-slate-50 flex justify-between items-center">
          <Link to={link} className="group/link flex items-center gap-2 text-primary font-bold text-sm tracking-tight">
            Read More
            <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
          </Link>
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-gold"></div>
            <div className="w-1 h-1 rounded-full bg-gold/50"></div>
            <div className="w-1 h-1 rounded-full bg-gold/20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
