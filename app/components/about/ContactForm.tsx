"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Message sent!");
        setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      } else toast.error("Failed to send message");
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <section id="contact" className="w-full flex justify-center items-center mt-12">
      <form
        className="w-[90%] max-w-[900px] rounded-[32px] shadow-[0_4px_32px_var(--card-shadow)] p-12 flex flex-col items-center"
        style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
        }}
        onSubmit={handleSubmit}
      >
        <div className="text-[40px] font-extrabold text-[var(--text-primary)] mb-2 text-center">
          Get In <span className="text-[var(--primary)]">Touch</span>
        </div>
        <div className="text-[var(--text-muted)] text-[20px] font-normal mb-8 text-center">
          Have questions about events? <br />
          Reach out to ensure clarity, transparency, and smooth collaboration.
        </div>

        {/* Name Fields */}
        <div className="flex gap-6 w-full mb-4 flex-wrap about-contact-names-row">
          {["First", "Last"].map((type) => (
            <input
              key={type}
              type="text"
              placeholder={`Enter your ${type} Name`}
              required
              value={formData[type.toLowerCase() + "Name" as "firstName" | "lastName"]}
              onChange={(e) =>
                setFormData({ ...formData, [type.toLowerCase() + "Name"]: e.target.value })
              }
              className="flex-1 p-4 text-[18px] rounded-lg outline-none transition-all duration-300 focus:scale-[1.02]"
              style={{
                border: "1.5px solid var(--border-color)",
                background: "var(--input-bg)",
                color: "var(--text-primary)",
                fontWeight: 500,
              }}
            />
          ))}
        </div>

        <input
          type="email"
          placeholder="Enter your email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-4 text-[18px] rounded-lg outline-none mb-4 transition-all duration-300 focus:scale-[1.02]"
          style={{
            border: "1.5px solid var(--border-color)",
            background: "var(--input-bg)",
            color: "var(--text-primary)",
            fontWeight: 500,
          }}
        />

        <input
          type="tel"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full p-4 text-[18px] rounded-lg outline-none mb-4 transition-all duration-300 focus:scale-[1.02]"
          style={{
            border: "1.5px solid var(--border-color)",
            background: "var(--input-bg)",
            color: "var(--text-primary)",
            fontWeight: 500,
          }}
        />

        <textarea
          placeholder="Enter your message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          rows={4}
          className="w-full p-4 text-[18px] rounded-lg outline-none mb-7 resize-y transition-all duration-300 focus:scale-[1.02]"
          style={{
            border: "1.5px solid var(--border-color)",
            background: "var(--input-bg)",
            color: "var(--text-primary)",
            fontWeight: 500,
          }}
        />

        <motion.button
          type="submit"
          className="w-full font-bold rounded-[10px] text-[22px] py-3 cursor-pointer transition-all duration-300 relative overflow-hidden group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            background: 'var(--button-primary)',
            color: 'white',
            boxShadow: 'var(--neon-glow)',
          }}
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            }} />
          <span className="relative z-10">
            Send Message
          </span>
        </motion.button>
      </form>
    </section>
  );
}