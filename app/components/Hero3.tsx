"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { easeOut } from "framer-motion";
import Footer from "./Footer";
import { useSearchParams } from "next/navigation";

const Hero3: React.FC = () => {
  const searchParams = useSearchParams();
  const waitlistEmail = searchParams.get("waitlist");
  const [formData, setFormData] = useState({
    email: waitlistEmail || "",
    name: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  React.useEffect(() => {
    if (waitlistEmail) {
      const el = document.getElementById("waitlist-form-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [waitlistEmail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setSuccess(true);
      setFormData({ email: "", name: "", message: "" });
    } else {
      alert("Failed to send. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <div
        id="waitlist-form-section"
        className="w-full bg-gradient-to-br from-[var(--bg-gradient-from)] via-[var(--bg-gradient-via)] to-[var(--bg-gradient-to)] py-24 px-4 flex justify-center items-center"
      >
        <motion.div
          className="w-full max-w-xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <p className="text-sm font-black text-[var(--primary)] uppercase mb-3 tracking-wide">
            Get <span className="text-[var(--primary-light)]">Involved</span>
          </p>

          <h2 className="text-[2.75rem] leading-tight md:text-[3rem] font-extrabold text-[var(--text-primary)] mb-5">
            Join Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)]">
              Finance Events
            </span>
          </h2>

          <p className="text-[var(--text-muted)] text-base md:text-lg mb-10">
            Be part of the FOSTIIMA Finance Committee workshops, seminars, and
            interactive events. Collaborate with peers, gain hands-on
            experience, and help organize impactful finance-focused activities
            on campus.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <motion.input
              name="email"
              type="email"
              placeholder="Enter Your Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-6 py-4 rounded-[12px] border border-[var(--border-color)] bg-[var(--input-bg)] placeholder-[var(--text-dim)] text-[var(--text-primary)] text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
            <motion.input
              name="name"
              type="text"
              placeholder="Enter Your Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-6 py-4 rounded-[12px] border border-[var(--border-color)] bg-[var(--input-bg)] placeholder-[var(--text-dim)] text-[var(--text-primary)] text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
            <motion.input
              name="message"
              type="text"
              placeholder="Enter Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-6 py-4 rounded-[12px] border border-[var(--border-color)] bg-[var(--input-bg)] placeholder-[var(--text-dim)] text-[var(--text-primary)] text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />

            <motion.button
  type="submit"
  disabled={loading}
  className="w-full py-5 font-bold rounded-2xl text-lg transition-all duration-300 relative overflow-hidden group border-2"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  style={{
    background: 'var(--button-primary)',
    borderColor: 'var(--primary-light)',
    boxShadow: 'var(--neon-glow)',
  }}
>
  {/* Theme-aware overlay for better contrast */}
  <span 
    className="absolute inset-0 rounded-2xl transition-opacity duration-300"
    style={{
      background: 'var(--accent-glow)',
      opacity: 0.1,
    }}
  />
  
  {/* Animated gradient background on hover */}
  <span 
    className="absolute inset-0 bg-gradient-to-r from-[#9D4EDD] via-[#C77DFF] to-[#9D4EDD] opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
    style={{ borderRadius: '1rem' }}
  />
  
  {/* Neon glow effect */}
  <span 
    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    style={{
      boxShadow: '0 0 40px rgba(199, 125, 255, 0.9), 0 0 80px rgba(157, 78, 221, 0.5)',
    }} 
  />
  
  {/* Pulsing ring animation */}
  <span 
    className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 animate-ping"
    style={{ borderColor: 'var(--primary-light)' }}
  />
  
  {/* Button content */}
  <span className="relative z-10 flex items-center justify-center gap-3">
    {loading ? (
      <>
        <svg className="animate-spin h-6 w-6" style={{ color: 'var(--primary-light)' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="tracking-wider" style={{ color: 'var(--primary-light)' }}>PROCESSING...</span>
      </>
    ) : (
      <>
        <span className="text-2xl group-hover:scale-110 transition-transform">🚀</span>
        <span className="tracking-wider font-black bg-gradient-to-r from-white to-[#C77DFF] bg-clip-text text-transparent">
          JOIN THE WAITLIST
        </span>
        <span className="text-2xl group-hover:scale-110 transition-transform">⚡</span>
      </>
    )}
  </span>
</motion.button>
            {success && (
              <p className="text-green-600 font-medium">
                Thank you! Your interest has been recorded.
              </p>
            )}
          </form>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Hero3;
