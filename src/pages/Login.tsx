import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Lock, AlertCircle } from 'lucide-react';
import { useError } from '../context/ErrorContext';

export const Login = () => {
  const { showError } = useError();

  const handleTestError = () => {
    showError('This is a test error message to demonstrate the centralized error handling system.', 'error');
  };

  return (
    <main className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-bg-light relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 -z-10" />
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-10 w-24 h-24 bg-gold/10 rounded-3xl blur-xl -z-10"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-10"
      />

      <div className="container-custom max-w-md w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl shadow-primary/10 p-8 border border-slate-100"
        >
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 mx-auto mb-4">
              <div className="w-6 h-6 border-2 border-white rounded-sm rotate-45" />
            </div>
            <h1 className="text-2xl font-800 font-display text-slate-900">Welcome Back</h1>
            <p className="text-slate-500 mt-2 text-sm">Log in to your Batuk account</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-600 text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-600 text-slate-700">Password</label>
                <a href="#" className="text-xs font-600 text-primary hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-white py-3.5 rounded-xl font-700 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all relative overflow-hidden group mt-6"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Log In <ArrowRight size={18} />
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shimmer" />
            </motion.button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-50 text-center">
            <button 
              onClick={handleTestError}
              className="text-xs font-700 text-slate-400 hover:text-red-500 flex items-center justify-center gap-2 mx-auto transition-colors"
            >
              <AlertCircle size={14} />
              Test Error Toast
            </button>
            <p className="text-sm text-slate-500 mt-6">
              Don't have an account?{' '}
              <a href="#" className="font-700 text-primary hover:underline">Sign up</a>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
};
