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
        className="w-full bg-gradient-to-br bg-gradient-to-tr from-[#faf5ff] via-[#f3e8ff] via-[#e9d5ff] to-[#c4b5fd] py-24 px-4 flex justify-center items-center"
      >
        <motion.div
          className="w-full max-w-xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <p className="text-sm font-black text-purple-600 uppercase mb-3 tracking-wide">
            Get <span className="text-purple-400">Involved</span>
          </p>

          <h2 className="text-[2.75rem] leading-tight md:text-[3rem] font-extrabold text-gray-900 mb-5">
            Join Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-700">
              Events
            </span>
          </h2>

          <p className="text-gray-700 text-base md:text-lg mb-10">
            Join us to plan and support exciting campus events while ensuring
            clear and responsible budgeting.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <motion.input
              name="email"
              type="email"
              placeholder="Enter Your Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-6 py-4 rounded-[12px] border border-[#e0d8ff] bg-white placeholder-gray-500 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <motion.input
              name="name"
              type="text"
              placeholder="Enter Your Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-6 py-4 rounded-[12px] border border-[#e0d8ff] bg-white placeholder-gray-500 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <motion.input
              name="message"
              type="text"
              placeholder="Enter Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-6 py-4 rounded-[12px] border border-[#e0d8ff] bg-white placeholder-gray-500 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#9e7dff] hover:bg-[#8d6aff] text-white font-medium rounded-[10px] text-lg transition shadow-md"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {loading ? "Sending..." : "Join the waitlist"}
            </motion.button>
            {success && (
              <p className="text-green-600 font-medium">
                Message sent successfully!
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
