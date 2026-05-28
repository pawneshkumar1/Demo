import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "../components/SectionHeader";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-primary/5 py-6 md:py-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 -z-0" />
        <div className="container-custom text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              title={
                <>
                  Get in <span className="text-yellow-400">Touch</span>
                </>
              }
              subtitle="Have questions about investing or partnership? Our team is here to help you navigate your journey."
              align="center"
            />
          </motion.div>
        </div>
      </section>
      <section className="container-custom py-6">
        {/* Main Content: Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Office Address Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-primary">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg text-primary">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    location_on
                  </span>
                </div>

                <div>
                  <h3 className="text-md font-semibold text-primary mb-1">
                    Office Address
                  </h3>

                  <p className="text-slate-900 font-semibold text-xs mt-1">
                    Office No 2, 3rd floor, A-1, Sector 9,
                  </p>

                  <p className="text-slate-900 font-semibold text-xs">
                    Noida, Uttar Pradesh- 201301
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-50 p-3 rounded-lg text-yellow-600">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    mail
                  </span>
                </div>

                <div>
                  <h3 className="text-md font-semibold text-yellow-600 mb-1">
                    Direct Communication
                  </h3>

                  <p className="text-slate-900 font-semibold text-xs">
                    connect@batuk.in
                  </p>
                </div>
              </div>
            </div>

            {/* Support Hours Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-primary">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg text-primary">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    schedule
                  </span>
                </div>

                <div>
                  <h3 className="text-md font-semibold text-primary mb-1">
                    Support Hours
                  </h3>

                  <p className="text-slate-900 font-semibold text-xs">
                    10:00 AM to 06:00 PM
                  </p>

                  <p className="text-slate-900 font-semibold text-xs mt-1">
                    Monday to Friday
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-8">
            <div className="bg-white p-6 rounded-xl shadow-xl border border-slate-100">
              <form className="space-y-2" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="John Doe"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    size="md"
                  />

                  <Input
                    label="Email Address"
                    placeholder="john@example.com"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    size="md"
                  />
                </div>

                <Input
                  label="Subject"
                  placeholder="How can we help?"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  size="md"
                />

                <Input
                  label="Message"
                  placeholder="How can we help you today?"
                  multiline
                  rows={3}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  size="lg"
                />

                <Button
                  size="lg"
                  className="w-full bg-primary text-white py-4 rounded-xl font-semibold tracking-wide text-sm flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all shadow-md uppercase disabled:opacity-70"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  <span>{loading ? "Sending..." : "Send Message"}</span>
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Help Center Section */}
        <section className="mt-6">
          <div className="relative overflow-hidden rounded-2xl p-8 bg-purple-900 text-white">
            {/* Background Decoration */}
            <div className="absolute -right-10 -bottom-10 opacity-10">
              <span
                className="material-symbols-outlined text-[200px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                help_center
              </span>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl text-center md:text-left">
                <h2 className="text-xl font-semibold mb-3 text-white">
                  Quick answers to common queries
                </h2>
                <p className="text-white text-sm opacity-90">
                  Our comprehensive Help Center covers everything from ledger
                  security to physical gold redemption processes.
                </p>
              </div>
              <a
                className="bg-yellow-500 text-white px-8 py-3 rounded-md text-sm flex items-center gap-2 hover:bg-yellow-600 transition-colors group"
                href="/new-ui/faqs"
              >
                Browse FAQs
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};
