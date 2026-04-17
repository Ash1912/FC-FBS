"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useInView,
  easeOut,
  useScroll,
  useTransform,
} from "framer-motion";
import Hero3 from "./Hero3";
import {
  CheckCircle,
  Video,
  Headphones,
  Mail,
  User,
  Building2,
  Link as LinkIcon,
  Send,
} from "lucide-react";

const Hero2: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.02, 1]);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    pgp: "",
    section: "",
  });

  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, name, pgp } = formData;

    if (email && name && pgp) {
      setSuccessMsg(
        "🎉 You're on the list! Finance Committee is coming your way soon. Hang tight!"
      );
      setFormData({ email: "", name: "", pgp: "", section: "" });
    } else {
      setSuccessMsg("❌ Please fill all required fields.");
    }
  };

  const features = [
    {
      label: "Transparent budget planning and tracking",
      icon: <CheckCircle size={18} className="text-[var(--primary)]" />,
    },
    {
      label: "Support for campus events and student initiatives",
      icon: <Video size={18} className="text-[var(--primary)]" />,
    },
    {
      label: "Responsible allocation of funds for student welfare",
      icon: <Headphones size={18} className="text-[var(--primary)]" />,
    },
  ];

  return (
    <>
      <div
        ref={sectionRef}
        className="flex h-auto flex-col md:flex-row items-center justify-between p-6 md:p-12 bg-gradient-to-tr from-[var(--bg-gradient-from)] via-[var(--bg-gradient-via)] via-[var(--bg-gradient-via)] to-[var(--bg-gradient-to)] min-h-[400px] relative overflow-hidden"
      >
        <motion.div
          className="absolute top-20 left-1/3 w-24 h-24 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 40, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-20 h-20 rounded-full opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            y: [0, -30, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="text-left max-w-lg ml-4 md:ml-16 relative z-10"
          initial={{ opacity: 0, x: -60, rotateY: -15 }}
          animate={{
            opacity: isInView ? 1 : 0,
            x: isInView ? 0 : -60,
            rotateY: isInView ? 0 : -15,
          }}
          transition={{
            duration: 0.8,
            ease: easeOut,
          }}
          style={{ y: y1 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-6 leading-tight"
            initial={{ opacity: 0, y: 60, rotateX: -15 }}
            animate={{
              opacity: isInView ? 1 : 0,
              y: isInView ? 0 : 60,
              rotateX: isInView ? 0 : -15,
            }}
            transition={{
              duration: 0.8,
              ease: easeOut,
            }}
          >
            Ready to Support{" "}
            <span className="text-[var(--primary)]">Student Initiatives?</span>
          </motion.h1>
          <motion.p
            className="text-base md:text-lg text-[var(--text-muted)] mb-8"
            initial={{ opacity: 0, y: 60 }}
            animate={{
              opacity: isInView ? 1 : 0,
              y: isInView ? 0 : 60,
            }}
            transition={{
              duration: 0.8,
              ease: easeOut,
              delay: 0.2,
            }}
          >
            Supporting campus events and initiatives with clear, accountable
            financial planning for every student.
          </motion.p>
          <motion.ul
            className="text-[var(--text-secondary)] space-y-6 text-base md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{
              duration: 0.8,
              ease: easeOut,
              delay: 0.4,
            }}
          >
            {features.map((item, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isInView ? 1 : 0,
                  x: isInView ? 0 : -20,
                }}
                transition={{
                  duration: 0.5,
                  ease: easeOut,
                  delay: 0.6 + index * 0.1,
                }}
                whileHover={{ x: 5, scale: 1.02 }}
              >
                <div className="w-8 h-8 rounded-md bg-[var(--primary)]/20 flex items-center justify-center">
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
        <motion.div
          className="mt-12 md:mt-0 w-full max-w-md bg-[var(--card-bg-secondary)] p-8 rounded-2xl shadow-xl relative z-10 border border-[var(--border-color)]"
          initial={{ opacity: 0, x: 60, rotateY: 15 }}
          animate={{
            opacity: isInView ? 1 : 0,
            x: isInView ? 0 : 60,
            rotateY: isInView ? 0 : 15,
          }}
          transition={{
            duration: 0.8,
            ease: easeOut,
            delay: 0.3,
          }}
          style={{ y: y2, scale }}
          whileHover={{
            boxShadow: "var(--neon-glow)",
            y: -5,
          }}
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {[
              {
                name: "email",
                type: "email",
                placeholder: "Enter your Email",
                icon: <Mail size={18} />,
              },
              {
                name: "name",
                type: "text",
                placeholder: "Full Name",
                icon: <User size={18} />,
              },
              {
                name: "pgp",
                type: "text",
                placeholder: "PGP",
                icon: <Building2 size={18} />,
              },
              {
                name: "section",
                type: "text",
                placeholder: "Section (Optional)",
                icon: <LinkIcon size={18} />,
              },
            ].map((input, index) => (
              <motion.input
                key={index}
                name={input.name}
                type={input.type}
                placeholder={input.placeholder}
                value={formData[input.name as keyof typeof formData]}
                onChange={handleChange}
                className="w-full py-4 px-5 rounded-lg bg-[var(--input-bg)] text-[var(--text-primary)] text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)] border border-[var(--border-color)]"
                whileFocus={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{
                  duration: 0.5,
                  ease: easeOut,
                  delay: 0.5 + index * 0.1,
                }}
              />
            ))}

            <motion.button
              type="submit"
              className="w-full py-4 bg-[var(--button-primary)] text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, ease: easeOut, delay: 0.9 }}
            >
              <Send size={18} />
              Start Free Trial
            </motion.button>
          </form>
          {successMsg && (
            <motion.p
              className="text-sm mt-4 font-medium text-green-600"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {successMsg}
            </motion.p>
          )}
        </motion.div>
      </div>
      <Hero3 />
    </>
  );
};

export default Hero2;