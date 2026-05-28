import React, { useEffect } from "react";
import {
  Calendar,
  Clock,
  Share2,
  Link as LinkIcon,
  Mail,
  Layers,
  Loader,
  AlertCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogDetails,
  fetchBlogList,
  fetchCategoryList,
} from "../../features/blog/blogApi";
import { clearBlogDetails } from "../../features/blog/blogSlice";
import type { AppDispatch, RootState } from "../../redux/store";

export const ViewBlog = () => {
  const { title_url } = useParams<{ title_url: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { currentBlog, blogList, categories, loading, error } = useSelector(
    (state: RootState) => state.blog,
  );

  useEffect(() => {
    if (title_url) {
      dispatch(fetchBlogDetails(title_url));
    }

    if (blogList.length === 0) dispatch(fetchBlogList());
    if (categories.length === 0) dispatch(fetchCategoryList());

    return () => {
      dispatch(clearBlogDetails());
    };
  }, [dispatch, title_url, blogList.length, categories.length]);

  // ✅ SEO meta
  useEffect(() => {
    if (currentBlog?.title) {
      document.title = `Batuk | ${currentBlog.title}`;

      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", currentBlog.description || "");

      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", currentBlog.metatag || "");
    }

    return () => {
      document.title = "Batuk Partner Portal";
    };
  }, [currentBlog]);

  // ✅ DATE LOGIC (IMPORTANT FIX)
  const isOldBlog =
    currentBlog &&
    new Date(currentBlog.createdAt).getTime() <
      new Date("2026-01-01").getTime();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  const formattedDate = currentBlog
    ? new Date(currentBlog.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const categoryName = currentBlog
    ? categories.find((c) => c._id === currentBlog.categoryId)?.categoryName ||
      "General"
    : "General";

  const relatedArticles = blogList
    .filter((b) => b.title_url !== title_url)
    .slice(0, 2);

  // ⏳ Loading
  if (loading && !currentBlog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-bg-light">
        <Loader className="animate-spin text-primary" size={48} />
        <p className="text-slate-600 font-bold">Loading article...</p>
      </div>
    );
  }

  // ❌ Error
  if (error || (!currentBlog && !loading)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-bg-light px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center text-red-500">
          <AlertCircle size={40} />
        </div>
        <h2 className="text-2xl font-black text-slate-900">
          Article Not Found
        </h2>
        <p className="text-slate-600 max-w-md">
          {error ||
            "The article you're looking for might have been moved or deleted."}
        </p>
        <Link
          to="/blog"
          className="px-8 py-3 bg-primary text-white rounded-xl font-bold"
        >
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-14 pb-1 bg-bg-light">
      {isOldBlog ? (
        // ✅ OLD BLOG → ONLY CONTENT
        <div
          className="prose prose-slate max-w-none blog-content-area"
          dangerouslySetInnerHTML={{ __html: currentBlog?.content || "" }}
        />
      ) : (
        // ✅ NEW BLOG → FULL LAYOUT
        <div className="container-custom py-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
          <article className="max-w-4xl">
            {/* HEADER */}
            <header className="mb-4">
              <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden mb-5 group">
                <img
                  alt={currentBlog?.title}
                  className="w-full h-full object-cover"
                  src={
                    currentBlog?.image ||
                    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=2070"
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <span className="bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-bold uppercase ">
                    {categoryName}
                  </span>
                </div>
              </div>

              <h1 className="text-2xl font-bold font-display text-slate-900 mb-4 leading-tight">
                {currentBlog?.title}
              </h1>

              <div className="flex flex-wrap justify-between items-center gap-6 py-4 border-y border-primary/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    BA
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Batuk Advisor
                    </p>
                    <p className="text-xs text-slate-600">
                      Expert Wealth Analysis
                    </p>
                  </div>
                </div>
                <div className="items-center gap-4 text-sm text-slate-600 px-2">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {formattedDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> 5 min read
                  </span>
                </div>
              </div>
            </header>
            {/* CONTENT */}
            <div
              className="prose prose-slate max-w-none blog-content-area"
              dangerouslySetInnerHTML={{ __html: currentBlog?.content || "" }}
            />

            {/* FOOTER */}
            <footer className="mt-4 pt-4 border-t border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-slate-600 uppercase ">
                  Share this post
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: currentBlog?.title,
                          url: window.location.href,
                        });
                      }
                    }}
                    className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-slate-600"
                  >
                    <Share2 size={18} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-all text-slate-600">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-all text-slate-600">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="text-sm font-bold text-primary flex items-center gap-1 hover:underline"
                >
                  <LinkIcon size={16} /> Copy Link
                </button>
              </div>
            </footer>
          </article>
          {/* SIDEBAR */}
          <aside className="space-y-6">
            <div className="bg-primary rounded-2xl p-6 text-white text-center shadow-xl shadow-primary/20">
              <Mail className="w-10 h-10 mx-auto mb-4 opacity-90" />
              <h3 className="text-xl font-bold mb-2 leading-tight">
                Stay ahead of the market
              </h3>
              <p className="text-white/80 text-sm mb-6">
                Subscribe to Batuk Insights for the latest in digital gold and
                investment strategies.
              </p>
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  className="w-full px-4 py-2.5 rounded-lg border-none bg-white/10 placeholder-white/60 text-white text-sm focus:ring-2 focus:ring-white outline-none"
                  placeholder="Email address"
                  type="email"
                />
                <button className="w-full bg-white text-primary font-bold py-2.5 rounded-lg text-sm hover:bg-slate-100 transition-colors">
                  Subscribe Now
                </button>
              </form>
            </div>

            {relatedArticles.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Layers className="text-primary" size={20} /> Related Articles
                </h3>
                <div className="space-y-6">
                  {relatedArticles.map((article) => (
                    <Link
                      key={article._id}
                      to={`/blog/${article.title_url}`}
                      className="group block"
                    >
                      <div className="aspect-video w-full overflow-hidden rounded-lg mb-3">
                        <img
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          src={article.image}
                        />
                      </div>
                      <h4 className="text-sm font-bold group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-2">5 min read</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-primary/10">
              <h3 className="text-sm font-bold text-slate-600 uppercase  mb-4">
                Trending Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/blog"
                  className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium hover:bg-primary/10 hover:text-primary transition-all"
                >
                  #MarketAnalysis
                </Link>
                <Link
                  to="/blog"
                  className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium hover:bg-primary/10 hover:text-primary transition-all"
                >
                  #Security
                </Link>
                <Link
                  to="/blog"
                  className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium hover:bg-primary/10 hover:text-primary transition-all"
                >
                  #BatukApp
                </Link>
                <Link
                  to="/blog"
                  className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium hover:bg-primary/10 hover:text-primary transition-all"
                >
                  #Economy
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};
