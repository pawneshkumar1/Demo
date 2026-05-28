import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ArrowLeft, MailCheck } from "lucide-react";
import { SectionHeader } from "../../../components/SectionHeader";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { forgotPassword } from "../../../features/auth/authApi";
import { clearAuthError } from "../../../features/auth/authSlice";
import type { AppDispatch, RootState } from "../../../redux/store";

import slider1 from "../../../assets/images/LoginSlider/LoginSlider1.avif";
import slider2 from "../../../assets/images/LoginSlider/LoginSlider2.avif";
import slider3 from "../../../assets/images/LoginSlider/LoginSlider3.avif";

const SLIDE_IMAGES = [slider1, slider2, slider3];

export const ForgotPassword = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, message, forgotPasswordSuccess } = useSelector(
    (state: RootState) => state.auth,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      dispatch(forgotPassword({ email: email.trim() }));
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDE_IMAGES.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-primary/5 text-slate-900 min-h-screen flex flex-col pt-16">
      <main className="grow flex flex-col md:flex-row h-full">
        <div className="hidden md:flex md:w-[50%] bg-primary/5 relative overflow-hidden items-center justify-center p-12">
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#5b2c90] rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#5b2c90] rounded-full blur-[120px]"></div>
          </div>

          <div className="relative z-10 max-w-lg text-center w-full">
            <div className="mb-10 aspect-square w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl bg-white relative">
              <div>
                <motion.img
                  key={currentSlide}
                  src={SLIDE_IMAGES[currentSlide]}
                  alt={`Slide ${currentSlide + 1}`}
                  className="w-full h-full object-cover absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                />
              </div>
            </div>

            <div className="flex justify-center gap-2">
              {SLIDE_IMAGES.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === currentSlide
                      ? "w-8 bg-primary"
                      : "w-2 bg-primary/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 md:w-[50%] bg-primary/5 flex flex-col items-center justify-center p-12">
          <div className="w-full max-w-md">
            <SectionHeader
              title={
                <>
                  Forgot <span className="text-primary">Password</span>
                </>
              }
              subtitle="Enter your registered email and we will send you a password reset link."
              align="center"
              className="mb-6"
            />

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium text-center">
                {error}
              </div>
            )}

            {forgotPasswordSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-white p-6 shadow-2xl shadow-primary/10 border border-primary/10 text-center space-y-4"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <MailCheck size={30} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-slate-900">
                    Check your inbox
                  </h2>
                  <p className="text-sm font-medium leading-6 text-slate-600">
                    {message}
                  </p>
                </div>
              </motion.div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <Input
                  id="email"
                  name="email"
                  label="Registered Email"
                  placeholder="name@example.com"
                  type="email"
                  size="md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Button
                  type="submit"
                  fullWidth
                  size="md"
                  variant="primary"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            )}

            <div className="mt-8 text-center">
              <p className="text-slate-600 text-sm font-medium">
                Remember your password?{" "}
                <Link
                  className="text-primary font-bold hover:underline"
                  to="/login"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
