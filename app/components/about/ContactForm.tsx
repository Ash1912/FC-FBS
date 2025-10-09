"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

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
        className="w-[90%] max-w-[900px] bg-gradient-radial-ellipse-60-40 rounded-[32px] shadow-[0_4px_32px_#e6e0fa33] p-12 flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <div className="text-[40px] font-extrabold text-[#3c3450] mb-2 text-center">
          Get In <span className="text-[#8C5BFF]">Touch</span>
        </div>
        <div className="text-[#6d6a7c] text-[20px] font-normal mb-8 text-center">
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
              style={{
              flex: 1,
              padding: "16px 18px",
              fontSize: 18,
              borderRadius: 8,
              border: "1.5px solid #b9aaff",
              outline: "none",
              background: "#fff",
              color: "#313053",
              fontWeight: 500,
              transition: "border 0.2s",
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
          style={{
            width: "100%",
            padding: "16px 18px",
            fontSize: 18,
            borderRadius: 8,
            border: "1.5px solid #b9aaff",
            outline: "none",
            background: "#fff",
            color: "#313053",
            fontWeight: 500,
            marginBottom: 18,
            transition: "border 0.2s",
          }}
        />

        <input
          type="tel"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-4 text-[18px] rounded-[8px] border border-[#b9aaff] outline-none bg-white text-[#313053] font-medium mb-4 transition-colors duration-200"
        />

        <textarea
          placeholder="Enter your message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          rows={4}
          className="w-full px-4 py-4 text-[18px] rounded-[8px] border border-[#b9aaff] outline-none bg-white text-[#313053] font-medium mb-7 resize-y transition-colors duration-200"
        />

        <button
          type="submit"
          className="w-full bg-[#8C5BFF] text-white border-none rounded-[10px] text-[22px] font-semibold py-3 cursor-pointer shadow-[0_2px_8px_#8C5BFF22] transition-colors duration-200"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
