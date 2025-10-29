"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
    { text: "Empowering", color: "text-gray-700" },
    { text: "Financial", color: "text-[#7C55D7]" },
    { text: "Literacy", color: "text-[#7C55D7]" },
    { text: "at FOSTIIMA", color: "text-gray-700" },
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
    const animateLoop = async () => {
      await controls.start("visible");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await controls.start("hidden");
      animateLoop();
    };
    animateLoop();
    return () => controls.stop();
  }, [controls]);

  return (
    <>
      <section
        ref={ref}
        className="min-h-[100vh] pt-[140px] h-auto pb-20 bg-gradient-to-br from-[#faf5ff] via-[#f3e8ff] via-[#e9d5ff] to-[#c4b5fd]
 relative overflow-hidden z-10"
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
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-700"
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
              className="mt-4 sm:mt-6 text-gray-600 text-base sm:text-lg max-w-xl mx-auto"
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
            >
              From budgets to workshops — we ensure every rupee empowers our
              FOSTIIMA Finance community.
            </motion.p>
          </motion.div>
          {/* <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.8, ease: easeOut }}
            aria-label="Demo image"
            className="bg-transparent"
          >
            <Image
              src="/images/landingimg.png"
              alt="Hero demo visual"
              width={900}
              height={700}
              className="object-cover w-full h-auto"
              priority
            />
          </motion.div> */}
          {/* FinQuest 2025 Event Card Section - Animated Creative Version */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex flex-col md:flex-row items-center justify-between gap-6 
             rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-6xl mx-auto 
             border border-purple-200/50 overflow-hidden -mt-14
             hover:-translate-y-2 transition-transform duration-500"
          >
            {/* 🔮 Animated Gradient Background */}
            <div
              className="absolute inset-0 bg-[linear-gradient(135deg,#f8f5ff,#e9d5ff,#d8b4fe,#c084fc,#a855f7)] 
                animate-gradient-x bg-[length:400%_400%] opacity-70"
            />

            {/* Soft glow overlay */}
            <div className="absolute inset-0 bg-white/60 backdrop-blur-xl rounded-3xl" />

            {/* Left Content */}
            <div className="flex-1 text-center md:text-left space-y-4 z-10">
              <motion.h2
                initial={{ x: -40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-[#7C55D7] to-[#A06AF9] text-transparent bg-clip-text"
              >
                FinQuest <span className="text-gray-800">2025</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="text-gray-700 text-[17px] md:text-[18px] leading-relaxed md:max-w-lg font-medium space-y-1"
              >
                ⚡{" "}
                <b className="text-[#7C55D7]">
                  Get ready for the ultimate finance showdown!
                </b>
                <br />
                📅{" "}
                <span className="text-gray-800">
                  Semi-Final: <b>4th Nov 🏁</b> | Grand Finale:{" "}
                  <b>6th Nov 🏆</b>
                </span>
                <br />
                💰{" "}
                <b className="text-[#7C55D7]">
                  Compete, learn, and showcase your financial brilliance!
                </b>
                <br />
                🔥{" "}
                <b className="text-gray-800">
                  Mark your calendars — your financial IQ is about to shine!
                </b>
              </motion.p>

              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="mt-3"
              >
                <Link
                  href="/finquest/register"
                  className="px-7 py-2.5 bg-gradient-to-r from-[#7C55D7] to-[#A06AF9] 
               text-white font-semibold rounded-full shadow-md hover:shadow-purple-300/50 
               transition-all duration-300 inline-block"
                >
                  🚀 Register Now
                </Link>
              </motion.div>
            </div>

            {/* Right Side: QR Code */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-2 z-10"
            >
              <div className="relative p-2 bg-white rounded-2xl shadow-lg hover:shadow-purple-300/40 transition-all duration-300">
                <div className="absolute -inset-1 bg-gradient-to-tr from-[#A06AF9] to-[#7C55D7] rounded-2xl blur opacity-30" />
                <Image
                  src="/images/finquest-qr.png"
                  alt="FinQuest 2025 QR"
                  width={140}
                  height={140}
                  className="rounded-xl relative z-10"
                />
              </div>
              <p className="text-xs font-semibold text-gray-800 tracking-wide uppercase">
                📱 Scan to Register
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
