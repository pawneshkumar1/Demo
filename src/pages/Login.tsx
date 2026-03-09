import React from 'react';
import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <div className="bg-[#f7f6f8] text-slate-900 font-sans min-h-screen flex flex-col pt-16">
      {/* Main Content: Two Column Layout */}
      <main className="grow flex flex-col md:flex-row h-full">
        {/* Left Column: Illustration */}
        <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-[#5b2c90]/10 relative overflow-hidden items-center justify-center p-12">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#5b2c90] rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#5b2c90] rounded-full blur-[120px]"></div>
          </div>
          <div className="relative z-10 max-w-lg text-center">
            <div className="mb-10 aspect-square w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl">
              <img 
                alt="3D growth illustration" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk3WvyXSO7Y8vIHNKzYgBxurilemkMnmxOD5BXf7R4HMcUclCZJRuQIseZ36kL3vnvhB_COd5aMJRSAZtnzPFdLyui877fvS14oEE2rxJoq5B_Dlxx2fjKzp5S6SfiiIaf0Hs3Cm_24JJBn0baqkHO3RN0w41qi4dr4NsbLAXXG2vTYOq3XSsC-W-MLFkdHMakuyxZNJTBjiGQbSNqCo1DWUrKo4huGjRfxRI_zSnm0CzOkzfMhDXqMbhBJXamy1dzdfxCLm7KHBS4"
              />
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4 leading-tight">Gold, Reimagined for the Digital Era</h1>
            <p className="text-lg text-slate-600 leading-relaxed">Experience a seamless, secure, and modern way to build your wealth with curated gold investments.</p>
          </div>
        </div>

        {/* Right Column: Login Form */}
        <div className="flex-1 bg-white flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Get Started</h2>
              <p className="text-slate-500">Enter your email or username to login to your account.</p>
            </div>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="identifier">Email or Username</label>
                <input 
                  className="w-full h-14 px-4 rounded-lg border border-slate-200 bg-[#f7f6f8] focus:ring-2 focus:ring-[#5b2c90]/20 focus:border-[#5b2c90] outline-none transition-all form-shadow placeholder:text-slate-400" 
                  id="identifier" 
                  name="identifier" 
                  placeholder="e.g. alex@example.com" 
                  type="text"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-semibold text-slate-700" htmlFor="password">Password</label>
                  <a className="text-sm font-bold text-[#5b2c90] hover:underline" href="#">Forgot Password?</a>
                </div>
                <div className="relative group">
                  <input 
                    className="w-full h-14 px-4 rounded-lg border border-slate-200 bg-[#f7f6f8] focus:ring-2 focus:ring-[#5b2c90]/20 focus:border-[#5b2c90] outline-none transition-all form-shadow placeholder:text-slate-400" 
                    id="password" 
                    name="password" 
                    placeholder="Enter your password" 
                    type="password"
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors" type="button">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                </div>
              </div>
              <button className="w-full h-14 bg-[#5b2c90] text-white rounded-lg font-bold text-lg hover:bg-[#4a2475] transition-all transform active:scale-[0.98] shadow-lg shadow-[#5b2c90]/25" type="submit">
                Login
              </button>
            </form>
            <div className="mt-8 text-center">
              <p className="text-slate-500 text-sm">
                Don't have an account? <a className="text-[#5b2c90] font-bold hover:underline" href="#">Create an account</a>
              </p>
            </div>

            {/* Trust Badges Section */}
            <div className="mt-16 grid grid-cols-2 gap-6 pt-10 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#5b2c90]/10 flex items-center justify-center text-[#5b2c90]">
                  <span className="material-symbols-outlined text-[20px]">verified</span>
                </div>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Curated Investing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#5b2c90]/10 flex items-center justify-center text-[#5b2c90]">
                  <span className="material-symbols-outlined text-[20px]">devices</span>
                </div>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Completely Digitalised</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#5b2c90]/10 flex items-center justify-center text-[#5b2c90]">
                  <span className="material-symbols-outlined text-[20px]">security</span>
                </div>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Bank Grade Security</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#5b2c90]/10 flex items-center justify-center text-[#5b2c90]">
                  <span className="material-symbols-outlined text-[20px]">contact_support</span>
                </div>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Help Center</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
