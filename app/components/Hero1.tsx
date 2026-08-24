// components/Hero1.tsx
"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useInView,
  easeOut,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Hero2 from "./Hero2";

interface TiltCardProps {
  title: string;
  description: string;
  icon: string;
  image: string;
  linkText?: string;
  index: number;
}

const TiltCard: React.FC<TiltCardProps> = ({
  title,
  description,
  image,
  linkText = "Learn more →",
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(x, springConfig);
  const rotateY = useSpring(y, springConfig);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    const maxTilt = 20;
    const tiltX = -(mouseY / (rect.height / 2)) * maxTilt;
    const tiltY = (mouseX / (rect.width / 2)) * maxTilt;
    x.set(tiltX);
    y.set(tiltY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="bg-[var(--card-bg)] rounded-xl shadow-lg p-8 text-center w-full border border-[var(--border-color)] relative overflow-hidden group"
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        boxShadow: `${rotateY.get() * 0.1}px ${rotateX.get() * 0.1}px ${
          10 + Math.abs(rotateX.get()) * 0.2 + Math.abs(rotateY.get()) * 0.2
        }px var(--card-shadow)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.05,
        boxShadow: "var(--neon-glow)",
        y: -10,
        borderColor: "var(--primary)",
      }}
      initial={{ opacity: 0, y: 60, scale: 0.9, rotateX: -15 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 60,
        scale: isInView ? 1 : 0.9,
        rotateX: isInView ? 0 : -15,
      }}
      transition={{
        duration: 0.8,
        ease: easeOut,
        delay: index * 0.1,
      }}
    >
      {/* Animated Background Glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle at center, var(--primary-light) 0%, transparent 70%)",
          opacity: 0.05,
        }}
      />

      {/* Icon - No background, just the original image */}
      <motion.div
        className="relative w-16 h-16 mx-auto mb-3"
        initial={{ rotate: 0, scale: 0.8 }}
        animate={{
          rotate: isInView ? 0 : 0,
          scale: isInView ? 1 : 0.8,
        }}
        transition={{
          duration: 0.8,
          ease: easeOut,
        }}
      >
        <motion.div
          className="relative w-full h-full"
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain"
            sizes="64px"
            priority={index < 3}
            style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.08))" }}
          />
        </motion.div>
      </motion.div>

      {/* Creative Ring Animation - adjusted position */}
      <motion.div
        className="absolute top-[68px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 pointer-events-none"
        style={{ borderColor: "var(--primary)", opacity: 0.06 }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.06, 0.12, 0.06],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.2,
        }}
      />

      {/* Content - Reduced gap */}
      <div className="relative z-10 mt-1">
        <h3 className="text-2xl font-semibold text-[var(--text-primary)]">{title}</h3>
        <p className="mt-2 text-[var(--text-muted)] text-base leading-relaxed">{description}</p>
        
        <motion.a
          href="#"
          className="mt-3 inline-flex items-center gap-1.5 text-[var(--primary)] text-base font-medium hover:underline"
          whileHover={{ x: 5, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {linkText}
          <motion.span
            className="inline-block"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.a>
      </div>

      {/* Decorative Bottom Gradient Line */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 rounded-full"
        style={{ background: "linear-gradient(90deg, transparent, var(--primary), transparent)" }}
        initial={{ width: 0, opacity: 0 }}
        whileHover={{ width: "80%", opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

const Hero1: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);

  const cards = [
    {
      title: "Finance Workshops",
      description:
        "We organize interactive finance workshops to help students understand budgeting, investing, and financial planning.",
      icon: "📊",
      image: "/icons/budget.png",
    },
    {
      title: "Seminars & Talks",
      description:
        "Expert-led seminars and guest lectures provide insights into financial markets, personal finance, and career opportunities.",
      icon: "📜",
      image: "/icons/record.png",
    },
    {
      title: "Campus Events",
      description:
        "We plan and fund student-led events focused on finance, competitions, and experiential learning activities.",
      icon: "🎉",
      image: "/icons/event.png",
    },
    {
      title: "Finance Challenges",
      description:
        "Interactive competitions and quizzes on finance concepts to encourage student participation and learning.",
      icon: "⚖️",
      image: "/icons/resources.png",
    },
    {
      title: "Networking Sessions",
      description:
        "Events that connect students with finance professionals, alumni, and mentors for guidance and growth.",
      icon: "🤝",
      image: "/icons/welfare.png",
    },
    {
      title: "Skill Development Workshops",
      description:
        "Hands-on workshops designed to enhance financial literacy and practical skills for career and personal growth.",
      icon: "🚀",
      image: "/icons/growth.png",
    },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Decorative Background Elements */}
      <motion.div
        className="absolute bottom-20 right-1/3 w-24 h-24 rounded-full opacity-30"
        style={{ background: "var(--primary-light)" }}
        animate={{
          scale: [1, 1.4, 1],
          y: [0, -30, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-40 left-10 w-16 h-16 rounded-full opacity-20"
        style={{ background: "var(--primary)" }}
        animate={{
          scale: [1, 1.3, 1],
          y: [0, 20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.h1
          className="mt-6 max-sm:mt-10 text-3xl md:text-4xl font-extrabold text-[var(--text-secondary)] leading-tight text-center"
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
          style={{ y }}
        >
          Finance Committee – FOSTIIMA Chapter{" "}
          <span className="text-[var(--primary)]">
            Organizing Student Finance Events
          </span>
        </motion.h1>
        <motion.p
          className="mt-4 max-sm:mt-8 text-[var(--text-muted)] text-lg max-w-2xl mx-auto text-center translate-x-2 sm:translate-x-4 md:translate-x-6"
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
          From workshops to seminars, we organize events that enhance financial
          knowledge, practical skills, and student engagement across FOSTIIMA.
        </motion.p>

        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{ scale }}
        >
          {cards.slice(0, 3).map((card, index) => (
            <TiltCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              image={card.image}
              index={index}
            />
          ))}
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{ scale }}
        >
          {cards.slice(3).map((card, index) => (
            <TiltCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              image={card.image}
              index={index + 3}
            />
          ))}
        </motion.div>

        <motion.div
          className="mt-20 bg-[var(--card-bg)] rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-[var(--border-color)]"
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 60,
            scale: isInView ? 1 : 0.9,
          }}
          transition={{
            duration: 0.8,
            ease: easeOut,
            delay: 0.6,
          }}
          whileHover={{
            boxShadow: "var(--neon-glow)",
            y: -5,
            borderColor: "var(--primary)",
          }}
        >
          <div className="max-w-md">
            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text-primary)] leading-tight">
              Discover Our Events
            </h2>
            <p className="mt-4 text-[var(--text-muted)] text-lg">
              Explore how the Finance Committee brings finance-focused events,
              workshops, and competitions to life for FOSTIIMA students.
            </p>
            <ul className="mt-6 space-y-2 text-[var(--text-muted)]">
              <li className="flex items-center">
                <span className="mr-2 text-green-600">✔</span> Interactive finance workshops
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-green-600">✔</span> Seminars and guest lectures
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-green-600">✔</span> Competitions, quizzes, and networking sessions
              </li>
            </ul>
            <motion.button
              className="mt-6 cursor-pointer text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden group/btn"
              style={{
                background: "var(--button-primary)",
                boxShadow: "var(--neon-glow)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                }}
              />
              <span className="relative z-10">Learn More</span>
            </motion.button>
          </div>

          <div className="w-full md:w-1/2 h-[300px] bg-[var(--card-bg-secondary)] rounded-lg flex items-center justify-center border border-[var(--border-color)] relative overflow-hidden">
            <video
              src="/icons/actionvideo.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-[90%] sm:w-[85%] h-[85%] rounded-2xl object-cover"
            />
            {/* Creative Play Button Overlay */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className="w-14 h-14 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm border-2 border-white/20"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <div className="h-12"></div>
      <Hero2 />
    </section>
  );
};

export default Hero1;