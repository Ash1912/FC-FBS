"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useAnimationControls,
  useInView,
  useScroll,
  useTransform,
  easeOut,
} from "framer-motion";
import Hero1 from "./Hero1";

const Hero: React.FC = () => {
  const textSegments = [
    { text: "Empowering", color: "text-[var(--text-secondary)]" },
    { text: "Financial", color: "text-[var(--primary)]" },
    { text: "Literacy", color: "text-[var(--primary)]" },
    { text: "at FOSTIIMA", color: "text-[var(--text-secondary)]" },
  ];

  const controls = useAnimationControls();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60, rotateY: -15 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
    },
  };

  useEffect(() => {
    // Start the animation only after component is mounted
    const animateLoop = async () => {
      try {
        await controls.start("visible");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await controls.start("hidden");
        animateLoop();
      } catch (error) {
        console.error("Animation error:", error);
      }
    };
    
    // Small delay to ensure component is fully mounted
    const timer = setTimeout(() => {
      animateLoop();
    }, 100);
    
    return () => {
      clearTimeout(timer);
      controls.stop();
    };
  }, [controls]);

  return (
    <>
      <section
        ref={ref}
        className="min-h-[100vh] pt-[140px] h-auto pb-20 bg-gradient-to-br from-[var(--bg-gradient-from)] via-[var(--bg-gradient-via)] via-[var(--bg-gradient-via)] to-[var(--bg-gradient-to)] relative overflow-hidden z-10"
      >
        <motion.div
          className="absolute bottom-40 left-1/4 w-12 h-12 bg-green-200 rounded-full opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 40, 0],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="w-full px-4 md:max-w-7xl md:mx-auto flex flex-col items-center text-center gap-10">
          <motion.div
            className="max-w-3xl"
            variants={fadeInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.8, ease: easeOut }}
            style={{ y: y1 }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-[var(--text-secondary)]"
              variants={containerVariants}
              initial="hidden"
              animate={controls}
              aria-label="Hero heading"
            >
              {textSegments.map((segment, segmentIndex) => (
                <span key={segmentIndex} className={segment.color}>
                  {segment.text.split("").map((char, charIndex) => (
                    <motion.span
                      key={`${segmentIndex}-${charIndex}`}
                      variants={letterVariants}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                  {segmentIndex === 0 || segmentIndex === 1 ? <br /> : null}
                  {segmentIndex === 2 ? " " : null}
                </span>
              ))}
            </motion.h1>
            <motion.p
              className="mt-4 sm:mt-6 text-[var(--text-muted)] text-base sm:text-lg max-w-xl mx-auto"
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
            >
              From budgets to workshops — we ensure every rupee empowers our
              FOSTIIMA Finance community.
            </motion.p>
          </motion.div>

          {/* Vitt-Manthan 2026 Event Card Section */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex flex-col md:flex-row items-center justify-between gap-6 
             rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-6xl mx-auto 
             border border-[var(--border-color)] overflow-hidden -mt-14
             hover:-translate-y-2 transition-transform duration-500 bg-[var(--card-bg)]"
          >
            {/* 🔮 Animated Gradient Background */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/20 via-[var(--primary-light)]/20 to-[var(--primary-dark)]/20 
                animate-gradient-x bg-[length:400%_400%] opacity-70"
            />

            {/* Soft glow overlay */}
            <div className="absolute inset-0 bg-[var(--card-bg)]/60 backdrop-blur-xl rounded-3xl" />

            {/* Left Content */}
            <div className="flex-1 text-center md:text-left space-y-4 z-10">
              <motion.h2
                initial={{ x: -40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] text-transparent bg-clip-text"
              >
                VITT-MANTHAN <span className="text-[var(--text-primary)]">2026</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="text-[var(--text-secondary)] text-[17px] md:text-[18px] leading-relaxed md:max-w-lg font-medium space-y-1"
              >
                ⚡{" "}
                <b className="text-[var(--primary)]">
                  The Ultimate Budget Debate Showdown!
                </b>
                <br />
                📅{" "}
                <span className="text-[var(--text-primary)]">
                  09th March 2026 🏛️ | <b>2:00 PM</b> | Seminar Hall
                </span>
                <br />
                🎤{" "}
                <b className="text-[var(--primary)]">
                  12 Teams. Intense Arguments. Strategic Cross-Questioning.
                </b>
                <br />
                🏆{" "}
                <b className="text-[var(--text-primary)]">
                  Witness ideas clash, perspectives evolve, and champions rise!
                </b>
              </motion.p>

              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="mt-3"
              >
                <a
                  href="https://fc-fbs-voting-system.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-2.5 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] 
  text-white font-semibold rounded-full shadow-md hover:shadow-[var(--neon-glow)] 
  transition-all duration-300 inline-block"
                >
                  🗳️ VITT-MANTHAN 26 Voting
                </a>
              </motion.div>
            </div>

            {/* Right Side: QR Code */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-2 z-10"
            >
              <div className="relative p-4 bg-[var(--card-bg)] rounded-2xl shadow-lg hover:shadow-[var(--neon-glow)] transition-all duration-300">
                <Image
                  src="/images/FC-FBS Voting System.png"
                  alt="VITT-MANTHAN 2026 QR"
                  width={200}
                  height={200}
                  className="rounded-xl relative z-10 w-[180px] md:w-[220px] h-auto"
                />
              </div>
              <p className="text-xs font-semibold text-[var(--text-primary)] tracking-wide uppercase">
                📱 Scan to Vote
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <Hero1 />
    </>
  );
};

export default Hero;