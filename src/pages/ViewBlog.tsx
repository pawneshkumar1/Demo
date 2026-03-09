import React from 'react';
import { motion } from 'motion/react';
import { 
  ChevronRight, 
  Search, 
  Calendar, 
  Clock, 
  List, 
  ChevronDown, 
  Key, 
  Share2, 
  Link as LinkIcon, 
  Mail, 
  Layers 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ViewBlog = () => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <main className="min-h-screen pt-24 pb-12 bg-bg-light">
      {/* Breadcrumbs */}
      <div className="container-custom max-w-4xl mx-auto pt-8">
        <nav className="flex items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/blog" className="hover:text-primary transition-colors">Insights</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 font-medium truncate">Why Digital Gold is the Best Inflation Hedge</span>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="container-custom max-w-7xl mx-auto py-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
        {/* Blog Article */}
        <article className="max-w-4xl">
          {/* Hero Section */}
          <header className="mb-10">
            <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden mb-8 group">
              <img 
                alt="Digital gold visualization" 
                className="w-full h-full object-cover" 
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=2070"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <span className="bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Investment Tips
                </span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-800 font-display text-slate-900 mb-6 leading-tight">
              Why Digital Gold is the Best Inflation Hedge
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 py-4 border-y border-primary/10">
              <div className="flex items-center gap-3">
                <img 
                  alt="Sarah Chen" 
                  className="w-10 h-10 rounded-full border-2 border-primary/20 object-cover" 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100"
                />
                <div>
                  <p className="text-sm font-bold text-slate-900">Sarah Chen</p>
                  <p className="text-xs text-slate-500">Chief Investment Analyst</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> Oct 24, 2023
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} /> 5 min read
                </span>
              </div>
            </div>
          </header>

          {/* Table of Contents */}
          <section className="bg-primary/5 rounded-xl p-6 mb-10">
            <details className="group" open>
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                  <List size={20} /> Table of Contents
                </h2>
                <ChevronDown size={20} className="transition-transform group-open:rotate-180 text-primary" />
              </summary>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li><a className="hover:text-primary flex items-center gap-2" href="#intro">1. Understanding the Inflation Monster</a></li>
                <li><a className="hover:text-primary flex items-center gap-2" href="#why-gold">2. Why Gold Still Shines</a></li>
                <li><a className="hover:text-primary flex items-center gap-2" href="#digital-vs-physical">3. Digital vs. Physical: The Shift</a></li>
                <li><a className="hover:text-primary flex items-center gap-2" href="#liquidity">4. Instant Liquidity: The Modern Edge</a></li>
                <li><a className="hover:text-primary flex items-center gap-2" href="#takeaways">5. Final Investment Takeaways</a></li>
              </ul>
            </details>
          </section>

          {/* Article Content Body */}
          <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:leading-relaxed prose-li:leading-relaxed">
            <p className="text-xl leading-relaxed text-slate-700 first-letter:text-5xl first-letter:font-800 first-letter:text-primary first-letter:mr-3 first-letter:float-left" id="intro">
              As global economies face unprecedented volatility, investors are increasingly looking for ways to preserve their purchasing power. Traditionally, gold has been the sanctuary of choice. However, in the 21st century, "Digital Gold" has emerged not just as an alternative, but as a superior evolution of this ancient asset class.
            </p>
            
            <h2 className="text-3xl font-800 mt-12 mb-6 text-slate-900" id="why-gold">Understanding the Inflation Monster</h2>
            <p className="text-slate-700 mb-6">
              Inflation isn't just about rising prices; it's about the erosion of value. When the supply of fiat currency grows faster than the value of goods and services, your hard-earned savings lose their "firepower."
            </p>
            
            <div className="my-10">
              <figure>
                <img 
                  alt="Financial graph" 
                  className="rounded-xl shadow-lg border border-primary/10 w-full object-cover h-64" 
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000"
                />
                <figcaption className="text-center text-sm text-slate-500 mt-3 italic">
                  Historical correlation between gold prices and global inflation indices.
                </figcaption>
              </figure>
            </div>
            
            <h3 className="text-2xl font-800 mt-8 mb-4 text-slate-900">Why Gold Still Shines</h3>
            <p className="text-slate-700 mb-4">Unlike paper money, gold has an intrinsic scarcity. It cannot be printed on a whim. This finite supply is the cornerstone of its role as a store of value. Here are the three main reasons gold remains relevant:</p>
            
            <ul className="list-disc pl-6 space-y-3 my-6 text-slate-700">
              <li><strong>Limited Supply:</strong> There is only a finite amount of gold in the Earth's crust.</li>
              <li><strong>Universal Value:</strong> Recognized across every culture and country for thousands of years.</li>
              <li><strong>No Counterparty Risk:</strong> Physical gold doesn't depend on a government's promise to pay.</li>
            </ul>
            
            <h2 className="text-3xl font-800 mt-12 mb-6 text-slate-900" id="digital-vs-physical">The Evolution to Digital Gold</h2>
            <p className="text-slate-700 mb-6">Physical gold, while valuable, comes with significant "carrying costs." Storage, insurance, and the physical security required to protect gold bars are often prohibitive for the average retail investor.</p>
            
            <div className="bg-primary/5 border-l-4 border-primary p-6 my-8 rounded-r-xl">
              <p className="font-medium text-primary italic mb-0">"Digital gold provides the security of institutional vaults with the accessibility of a mobile app. It is gold reimagined for the smartphone generation."</p>
            </div>
            
            <h3 className="text-2xl font-800 mt-8 mb-4 text-slate-900" id="liquidity">Instant Liquidity: The Modern Edge</h3>
            <p className="text-slate-700 mb-6">Try selling a 1kg gold bar on a Saturday afternoon. It's nearly impossible. With Batuk's Digital Gold, you can buy or sell fractions of gold (as low as $1) instantly, 24/7. This granular accessibility makes it a practical tool for daily wealth management, not just long-term hoarding.</p>
            
            <section className="bg-primary/10 border border-primary/20 rounded-2xl p-8 my-12" id="takeaways">
              <h3 className="text-xl font-800 text-primary flex items-center gap-2 mb-4">
                <Key size={20} /> Key Takeaways
              </h3>
              <ol className="space-y-4 text-slate-700">
                <li className="flex gap-4">
                  <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-bold">1</span>
                  <span><strong>Low Barrier to Entry:</strong> Start investing with micro-amounts. You don't need to buy a whole bar.</span>
                </li>
                <li className="flex gap-4">
                  <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-bold">2</span>
                  <span><strong>Zero Storage Hassle:</strong> Batuk handles the security, insurance, and auditing of physical reserves.</span>
                </li>
                <li className="flex gap-4">
                  <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-bold">3</span>
                  <span><strong>Transparent Pricing:</strong> Real-time market rates mean you always know the exact value of your holdings.</span>
                </li>
              </ol>
            </section>
          </div>

          {/* Social Sharing */}
          <footer className="mt-12 pt-8 border-t border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Share this post</span>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-slate-600">
                  <Share2 size={18} />
                </button>
                {/* LinkedIn Icon */}
                <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-all text-slate-600">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                </button>
                {/* Twitter Icon */}
                <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-all text-slate-600">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg>
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

        {/* Sidebar */}
        <aside className="space-y-10">
          {/* Newsletter Signup */}
          <div className="bg-primary rounded-2xl p-6 text-white text-center shadow-xl shadow-primary/20">
            <Mail className="w-10 h-10 mx-auto mb-4 opacity-90" />
            <h3 className="text-xl font-bold mb-2 leading-tight">Stay ahead of the market</h3>
            <p className="text-white/80 text-sm mb-6">Subscribe to Batuk Insights for the latest in digital gold and investment strategies.</p>
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

          {/* Related Articles */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Layers className="text-primary" size={20} /> Related Articles
            </h3>
            <div className="space-y-6">
              <Link to="/blog/view" className="group block">
                <div className="aspect-video w-full overflow-hidden rounded-lg mb-3">
                  <img 
                    alt="Gold bars" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=500"
                  />
                </div>
                <h4 className="text-sm font-bold group-hover:text-primary transition-colors line-clamp-2">How to Build a Diversified Portfolio with Precious Metals</h4>
                <p className="text-xs text-slate-500 mt-2">4 min read</p>
              </Link>
              <Link to="/blog/view" className="group block">
                <div className="aspect-video w-full overflow-hidden rounded-lg mb-3">
                  <img 
                    alt="Crypto technology" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    src="https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=500"
                  />
                </div>
                <h4 className="text-sm font-bold group-hover:text-primary transition-colors line-clamp-2">Blockchain Security: Why Your Digital Gold is Safe</h4>
                <p className="text-xs text-slate-500 mt-2">6 min read</p>
              </Link>
            </div>
          </div>

          {/* Trending Topics */}
          <div className="pt-6 border-t border-primary/10">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Trending Topics</h3>
            <div className="flex flex-wrap gap-2">
              <Link to="/blog" className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium hover:bg-primary/10 hover:text-primary transition-all">#MarketAnalysis</Link>
              <Link to="/blog" className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium hover:bg-primary/10 hover:text-primary transition-all">#Security</Link>
              <Link to="/blog" className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium hover:bg-primary/10 hover:text-primary transition-all">#BatukApp</Link>
              <Link to="/blog" className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium hover:bg-primary/10 hover:text-primary transition-all">#Economy</Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};
