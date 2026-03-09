import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const IndividualPartnerRegistration = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="bg-[#f7f6f8] dark:bg-[#19141e] text-slate-900 dark:text-slate-100 font-sans min-h-screen flex flex-col pt-16">
      <main className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-64px)] w-full">
        {/* Left Column: Illustration */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 bg-[#5b2c90]/5">
          <div className="max-w-md text-center space-y-8">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl bg-white flex items-center justify-center p-8">
              <img 
                alt="Financial growth 3D visualization" 
                className="w-full h-full object-contain" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeQAF2b0816Qk8pr8hMAJnpYMzMpWkTw30MX97rU8HX-ovtQBLQlMSJVmD-DMKs6aioD7h3PpOKerur2ZqXLfnXLnAr1dS8FVKPWVDO_Z4aTrygdtzLZgSeJzH6jIfV6k3mCxiVIMtXqjwKKCaZm900V1awfrYLwggk65qsBkUtrKf0aqa859-1xXYH3ayUiiNB4T2hmfRtKiI3sBvxmSWhhiBR_XVPoIyFLHsuWAlfmsYZF6qpj7haNzplFTullS1I8PUP1kI1A8b"
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Empower Your Financial Future</h1>
              <p className="text-slate-600 dark:text-slate-400">Join thousands of partners making digital gold accessible to everyone. Start your journey with Batuk today.</p>
            </div>
            <div className="flex gap-4 justify-center">
              <div className={`w-2 h-2 rounded-full ${step === 1 ? 'bg-[#5b2c90]' : 'bg-[#5b2c90]/30'}`}></div>
              <div className={`w-2 h-2 rounded-full ${step === 2 ? 'bg-[#5b2c90]' : 'bg-[#5b2c90]/30'}`}></div>
              <div className={`w-2 h-2 rounded-full ${step >= 3 ? 'bg-[#5b2c90]' : 'bg-[#5b2c90]/30'}`}></div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="flex-1 flex flex-col p-6 md:p-12 lg:p-20 bg-white dark:bg-[#19141e]">
          <div className="max-w-xl mx-auto w-full">
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#5b2c90]">Step {step} of 4</span>
                <span className="text-xs font-bold text-slate-500">{step * 25}% Complete</span>
              </div>
              <div className="flex gap-2">
                <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-[#5b2c90]' : 'bg-[#5b2c90]/10 dark:bg-slate-800'}`}></div>
                <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-[#5b2c90]' : 'bg-[#5b2c90]/10 dark:bg-slate-800'}`}></div>
                <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-[#5b2c90]' : 'bg-[#5b2c90]/10 dark:bg-slate-800'}`}></div>
                <div className={`h-1.5 flex-1 rounded-full ${step >= 4 ? 'bg-[#5b2c90]' : 'bg-[#5b2c90]/10 dark:bg-slate-800'}`}></div>
              </div>
              <div className="mt-8 flex justify-between text-[10px] md:text-xs font-medium text-slate-400">
                <span className={step >= 1 ? 'text-[#5b2c90]' : ''}>Personal Info</span>
                <span className={step >= 2 ? 'text-[#5b2c90]' : ''}>Address Details</span>
                <span className={step >= 3 ? 'text-[#5b2c90]' : ''}>Bank Details</span>
                <span className={step >= 4 ? 'text-[#5b2c90]' : ''}>Verification</span>
              </div>
            </div>

            {step === 1 && (
              <>
                <div className="mb-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">Register as Individual Partner</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Please provide your legal details as per your ID documents.</p>
                </div>

                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">person</span>
                        <input 
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-[#5b2c90] focus:border-transparent outline-none transition-all placeholder:text-slate-400" 
                          placeholder="John Doe" 
                          type="text"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">mail</span>
                        <input 
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-[#5b2c90] focus:border-transparent outline-none transition-all placeholder:text-slate-400" 
                          placeholder="john@example.com" 
                          type="email"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Date of Birth</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">calendar_today</span>
                        <input 
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-[#5b2c90] focus:border-transparent outline-none transition-all text-slate-700 dark:text-slate-300" 
                          type="date"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone Number</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">call</span>
                        <input 
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-[#5b2c90] focus:border-transparent outline-none transition-all placeholder:text-slate-400" 
                          placeholder="+1 (555) 000-0000" 
                          type="tel"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
                        <input 
                          className="w-full pl-10 pr-12 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-[#5b2c90] focus:border-transparent outline-none transition-all placeholder:text-slate-400" 
                          placeholder="••••••••" 
                          type="password"
                          required
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#5b2c90] transition-colors" type="button">
                          <span className="material-symbols-outlined text-xl">visibility</span>
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Confirm Password</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock_reset</span>
                        <input 
                          className="w-full pl-10 pr-12 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-[#5b2c90] focus:border-transparent outline-none transition-all placeholder:text-slate-400" 
                          placeholder="••••••••" 
                          type="password"
                          required
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#5b2c90] transition-colors" type="button">
                          <span className="material-symbols-outlined text-xl">visibility</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6">
                    <button className="w-full bg-[#5b2c90] hover:bg-[#5b2c90]/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-[#5b2c90]/20 transform active:scale-[0.98] transition-all flex items-center justify-center gap-2" type="submit">
                      Next Step
                      <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </button>
                  </div>
                </form>
              </>
            )}

            {step === 2 && (
              <>
                <div className="mb-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">Address Details</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Please provide your Address information to proceed.</p>
                </div>

                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Address</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-4 text-slate-400 text-xl">home</span>
                        <textarea 
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-[#5b2c90] focus:border-transparent outline-none transition-all placeholder:text-slate-400 min-h-[100px]" 
                          placeholder="Enter Your Address" 
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">State</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">map</span>
                          <input 
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-[#5b2c90] focus:border-transparent outline-none transition-all placeholder:text-slate-400" 
                            placeholder="State" 
                            type="text"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">City</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">location_city</span>
                          <input 
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-[#5b2c90] focus:border-transparent outline-none transition-all placeholder:text-slate-400" 
                            placeholder="City" 
                            type="text"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Pincode</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">pin_drop</span>
                          <input 
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-[#5b2c90] focus:border-transparent outline-none transition-all placeholder:text-slate-400" 
                            placeholder="6-digit Pincode" 
                            type="text"
                            maxLength={6}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Aadhar No. (Optional)</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">badge</span>
                          <input 
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-[#5b2c90] focus:border-transparent outline-none transition-all placeholder:text-slate-400" 
                            placeholder="Enter Aadhar no" 
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">PAN no.</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">credit_card</span>
                          <input 
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-[#5b2c90] focus:border-transparent outline-none transition-all placeholder:text-slate-400 uppercase" 
                            placeholder="Enter PAN (XXXXX1234X)" 
                            type="text"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 flex gap-4">
                    <button 
                      onClick={prevStep}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2" 
                      type="button"
                    >
                      <span className="material-symbols-outlined text-xl">arrow_back</span>
                      Back
                    </button>
                    <button className="flex-[2] bg-[#5b2c90] hover:bg-[#5b2c90]/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-[#5b2c90]/20 transform active:scale-[0.98] transition-all flex items-center justify-center gap-2" type="submit">
                      Next Step
                      <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </button>
                  </div>
                </form>
              </>
            )}

            {step === 3 && (
              <>
                <div className="mb-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">Bank Details</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Please provide your bank information to proceed.</p>
                </div>

                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Account Holder's Name (Optional)</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">account_circle</span>
                        <input 
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-[#5b2c90] focus:border-transparent outline-none transition-all placeholder:text-slate-400" 
                          placeholder="Enter Account Holder's Name" 
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Account No. (Optional)</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">account_balance_wallet</span>
                        <input 
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-[#5b2c90] focus:border-transparent outline-none transition-all placeholder:text-slate-400" 
                          placeholder="Enter Account No." 
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Confirm Account No. (Optional)</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">account_balance_wallet</span>
                        <input 
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-[#5b2c90] focus:border-transparent outline-none transition-all placeholder:text-slate-400" 
                          placeholder="Confirm Account No." 
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">IFSC Code (Optional)</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">account_balance</span>
                        <input 
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-[#5b2c90] focus:border-transparent outline-none transition-all placeholder:text-slate-400 uppercase" 
                          placeholder="Enter IFSC Code" 
                          type="text"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <div className="flex items-center h-5">
                      <input 
                        id="terms" 
                        type="checkbox" 
                        className="w-4 h-4 text-[#5b2c90] border-slate-300 rounded focus:ring-[#5b2c90]" 
                        required
                      />
                    </div>
                    <label htmlFor="terms" className="text-sm text-slate-500 dark:text-slate-400">
                      Please accept our <Link to="#" className="text-[#5b2c90] font-bold hover:underline">terms & conditions</Link>
                    </label>
                  </div>

                  <div className="pt-6 flex gap-4">
                    <button 
                      onClick={prevStep}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2" 
                      type="button"
                    >
                      <span className="material-symbols-outlined text-xl">arrow_back</span>
                      Back
                    </button>
                    <button className="flex-[2] bg-[#5b2c90] hover:bg-[#5b2c90]/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-[#5b2c90]/20 transform active:scale-[0.98] transition-all flex items-center justify-center gap-2" type="submit">
                      Next Step
                      <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </button>
                  </div>
                </form>
              </>
            )}

            {step === 4 && (
              <>
                <div className="mb-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">OTP Verification</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">A verification code has been sent to your phone number and email.</p>
                </div>

                <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert('Registration Successful!'); }}>
                  <div className="space-y-6">
                    {/* Email Verification */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-end">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Verification</label>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Code sent to pk001@gmail.com</span>
                      </div>
                      <div className="grid grid-cols-6 gap-2">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <input 
                            key={i}
                            type="text"
                            maxLength={1}
                            className="w-full aspect-square text-center text-xl font-bold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-[#5b2c90] focus:border-transparent outline-none transition-all"
                            required
                          />
                        ))}
                      </div>
                    </div>

                    {/* Mobile Verification */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-end">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Mobile Verification</label>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Code sent to 4567890987</span>
                      </div>
                      <div className="grid grid-cols-6 gap-2">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <input 
                            key={i}
                            type="text"
                            maxLength={1}
                            className="w-full aspect-square text-center text-xl font-bold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-[#5b2c90] focus:border-transparent outline-none transition-all"
                            required
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-500">
                    <span className="material-symbols-outlined text-lg">timer</span>
                    <span>Expiring in: <span className="text-[#5b2c90]">02:00</span></span>
                  </div>

                  <div className="pt-6 flex gap-4">
                    <button 
                      onClick={prevStep}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2" 
                      type="button"
                    >
                      <span className="material-symbols-outlined text-xl">arrow_back</span>
                      Back
                    </button>
                    <button className="flex-[2] bg-[#5b2c90] hover:bg-[#5b2c90]/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-[#5b2c90]/20 transform active:scale-[0.98] transition-all flex items-center justify-center gap-2" type="submit">
                      Submit
                      <span className="material-symbols-outlined text-xl">check_circle</span>
                    </button>
                  </div>
                </form>
              </>
            )}

            <div className="mt-8 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Already have an account? 
                <Link className="text-[#5b2c90] font-bold hover:underline ml-1" to="/login">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
