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
          <motion.div
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
          </motion.div>
        </div>
      </section>
      <Hero1 />
    </>
  );
};

export default Hero;
