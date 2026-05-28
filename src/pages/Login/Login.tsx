import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "../../components/SectionHeader";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { loginUser } from "../../features/auth/authApi";
import { clearAuthError } from "../../features/auth/authSlice";
import type { AppDispatch, RootState } from "../../redux/store";

import slider1 from "../../assets/images/LoginSlider/LoginSlider1.avif";
import slider2 from "../../assets/images/LoginSlider/LoginSlider2.avif";
import slider3 from "../../assets/images/LoginSlider/LoginSlider3.avif";

const SLIDE_IMAGES = [slider1, slider2, slider3];

export const Login = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  // Navigate to dashboard on successful login
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    const identifier = email.trim();
    const currentPassword = password.trim();

    if (!identifier) {
      setValidationError("Please enter your email or username.");
      return;
    }

    if (!currentPassword) {
      setValidationError("Please enter your password.");
      return;
    }

    let payloadIdentifier = identifier;
    if (identifier.includes("@")) {
      payloadIdentifier = identifier.toLowerCase();
    } else {
      payloadIdentifier = identifier.toUpperCase();
    }

    dispatch(
      loginUser({ email: payloadIdentifier, password: currentPassword }),
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDE_IMAGES.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-primary/5 text-slate-900 min-h-screen flex flex-col pt-16">
      <main className="grow flex flex-col md:flex-row h-full">
        {/* LEFT SIDE SLIDER */}
        <div className="hidden md:flex md:w-[50%] bg-primary/5 relative overflow-hidden items-center justify-center p-12">
          {/* Background glow */}
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#5b2c90] rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#5b2c90] rounded-full blur-[120px]"></div>
          </div>

          <div className="relative z-10 max-w-lg text-center w-full">
            {/* IMAGE SLIDER */}
            <div className="mb-10 aspect-square w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl bg-white relative">
              <AnimatePresence mode="wait">
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
              </AnimatePresence>
            </div>

            {/* SLIDER DOTS */}
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

        {/* RIGHT SIDE LOGIN FORM */}
        <div className="flex-1 md:w-[50%] bg-primary/5 flex flex-col items-center justify-center p-12">
          <div className="w-full max-w-md">
            <SectionHeader
              title={
                <>
                  Get <span className="text-primary">Started</span>
                </>
              }
              subtitle="Enter your email or username to login to your account."
              align="center"
              className="mb-10"
            />

            {(error || validationError) && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium text-center">
                {error || validationError}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input
                id="identifier"
                name="identifier"
                label="Email or Username"
                placeholder="name@example.com"
                type="text"
                size="md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label
                    className="text-sm font-bold text-slate-700"
                    htmlFor="password"
                  >
                    Password
                  </label>

                  <Link
                    className="text-sm font-bold text-primary hover:underline"
                    to="/forgot-password"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Input
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                  size="md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                fullWidth
                size="md"
                variant="primary"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-600 text-sm font-medium">
                Don't have an account?{" "}
                <Link
                  className="text-primary font-bold hover:underline"
                  to="/register"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
