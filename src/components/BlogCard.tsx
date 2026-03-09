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
    <div className="group flex flex-col bg-white rounded-3xl overflow-hidden transition-all duration-500 border border-slate-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5">
      <div className="relative h-72 w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-110" 
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-6 left-6">
          <span className="bg-white/90 backdrop-blur-md text-ink text-[10px] uppercase tracking-[0.2em] font-extrabold px-4 py-2 rounded-full shadow-sm">
            {category}
          </span>
        </div>
        <button 
          onClick={handleShare}
          className="absolute top-6 right-6 bg-white/90 backdrop-blur-md text-ink hover:bg-primary hover:text-white p-3 rounded-full shadow-sm transition-all duration-300 z-10"
          title="Share"
        >
          <Share2 size={16} />
        </button>
      </div>
      <div className="p-10 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-slate-muted text-[10px] uppercase tracking-widest font-bold mb-6">
          <div className="flex items-center gap-2">
            <Calendar size={12} className="text-primary" />
            <span>{date}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-200" />
          <div className="flex items-center gap-2">
            <User size={12} className="text-primary" />
            <span>{author}</span>
          </div>
        </div>
        <Link to={link} className="text-ink text-2xl font-extrabold leading-tight mb-4 hover:text-primary transition-colors cursor-pointer block tracking-tight">
          {title}
        </Link>
        <p className="text-slate-muted text-base leading-relaxed mb-8 line-clamp-2 font-medium">
          {description}
        </p>
        <div className="mt-auto pt-8 border-t border-slate-50 flex justify-between items-center">
          <Link to={link} className="group/link flex items-center gap-3 text-ink font-extrabold text-xs uppercase tracking-widest">
            Explore Article
            <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-white group-hover/link:border-primary transition-all duration-300">
              <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-0.5" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
