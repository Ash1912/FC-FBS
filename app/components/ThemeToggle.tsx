"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";

const ThemeToggle: React.FC = () => {
  const {  toggleTheme } = useTheme();

  return (
    <motion.button
      className="theme-toggle"
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      aria-label="Toggle theme"
    >
      <span className="toggle-icon">☀️</span>
      <span className="toggle-icon">🌙</span>
      <div className="toggle-ball"></div>
    </motion.button>
  );
};

export default ThemeToggle;