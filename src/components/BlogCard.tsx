import React from "react";
import { Calendar, User, ArrowRight, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

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
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.origin + link);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100">
      {/* Image Section */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-50">
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-primary/90 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-1 rounded-full shadow-sm">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Author + Share */}
        <div className="flex items-center justify-between gap-2 text-primary text-sm mb-3 transition-colors duration-300">
          <div className="flex justify-center items-center gap-2">
            <User size={18} />
            <span>{author}</span>
          </div>

          <button
            onClick={handleShare}
            className="bg-primary text-white hover:bg-yellow-400 hover:text-primary p-1.5 rounded-full shadow-sm transition-all duration-300 z-10"
            title="Share"
          >
            <Share2 size={16} />
          </button>
        </div>

        {/* Title */}
        <Link
          to={link}
          className="text-primary hover:text-yellow-400 text-sm font-semibold mb-1 cursor-pointer line-clamp-1 transition-colors duration-300"
        >
          {title}
        </Link>

        {/* Description */}
        <p className="text-primary text-xs leading-relaxed mb-2 line-clamp-2 transition-colors duration-300">
          {description}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-2 border-t border-slate-100 flex justify-between items-center">
          {/* Read More */}
          <Link
            to={link}
            className="group/link flex items-center gap-2 text-primary hover:text-yellow-400 font-bold text-sm transition-colors duration-300"
          >
            Read More
            <ArrowRight
              size={16}
              className="transition-transform duration-300 hover/link:translate-x-1"
            />
          </Link>

          {/* Date */}
          <div className="flex items-center gap-1 text-primary transition-colors duration-300">
            <Calendar size={14} />
            <span className="text-[10px]">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// import React from "react";
// import { Calendar, User, ArrowRight, Share2 } from "lucide-react";
// import { Link } from "react-router-dom";

// export interface BlogCardProps {
//   image: string;
//   category: string;
//   date: string;
//   author: string;
//   title: string;
//   description: string;
//   link: string;
// }

// export const BlogCard: React.FC<BlogCardProps> = ({
//   image,
//   category,
//   date,
//   author,
//   title,
//   description,
//   link,
// }) => {
//   const handleShare = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: title,
//           text: description,
//           url: window.location.origin + link,
//         });
//       } catch (error) {
//         console.error("Error sharing:", error);
//       }
//     } else {
//       // Fallback: copy to clipboard
//       navigator.clipboard.writeText(window.location.origin + link);
//       alert("Link copied to clipboard!");
//     }
//   };

//   return (
//     <div className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100">
//       <div className="relative h-44 w-full overflow-hidden bg-slate-50">
//         <div
//           className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105"
//           style={{ backgroundImage: `url(${image})` }}
//         />
//         <div className="absolute top-4 left-4">
//           <span className="bg-primary/90 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-1 rounded-full shadow-sm">
//             {category}
//           </span>
//         </div>
//       </div>
//       <div className="p-4 flex flex-col flex-1">
//         <div className="flex items-center justify-between gap-2 text-slate-600 text-sm mb-3">
//           <div className="flex justify-center items-center gap-2">
//             <User size={18} />
//             <span>{author}</span>
//           </div>
//           <button
//             onClick={handleShare}
//             className="bg-yellow-400 backdrop-blur-sm text-slate-600 hover:text-primary p-2 rounded-full shadow-sm transition-colors z-10"
//             title="Share"
//           >
//             <Share2 size={16} />
//           </button>
//         </div>
//         <Link
//           to={link}
//           className="text-slate-900 text-sm font-semibold mb-1 cursor-pointer line-clamp-1"
//         >
//           {title}
//         </Link>
//         <p className="text-slate-600 text-xs leading-relaxed mb-2 line-clamp-2">
//           {description}
//         </p>
//         <div className="mt-auto pt-2 border-t border-slate-50 flex justify-between items-center">
//           <Link
//             to={link}
//             className="group/link flex items-center gap-2 text-primary font-bold text-sm "
//           >
//             Read More
//             <ArrowRight
//               size={16}
//               className="transition-transform group-hover/link:translate-x-1"
//             />
//           </Link>
//           <div className="flex items-center gap-1">
//             <Calendar size={14} />
//             <span className="text-slate-600 text-[10px]">{date}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
