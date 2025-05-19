import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ui/ThemeContext";

const About = () => {
  const { isDark } = useTheme();
  const [currentText, setCurrentText] = useState(0);
  const carouselTexts = [
    "explore new places",
    "play video games",
    "watch movies & series",
    "do editing",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % carouselTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      className={`relative z-10 py-24 px-6 md:px-12 text-center ${
        !isDark ? "bg-gradient-to-b from-blue-50 to-white" : "bg-transparent"
      }`}
    >
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`text-4xl sm:text-5xl md:text-6xl font-bold ${
          isDark
            ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-800"
            : "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-gray-800"
        } mb-12`}
      >
        About Me
      </motion.h2>

      {/* About Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`max-w-4xl mx-auto px-8 py-20 rounded-3xl ${
          isDark
            ? "border border-white/20 bg-white/5 backdrop-blur-[20px] shadow-[0_12px_48px_0_rgba(255,255,255,0.1)]"
            : "border border-gray-200 bg-white/80 backdrop-blur-[20px] shadow-lg"
        } text-left transition-all duration-300 hover:shadow-xl`}
      >
        {/* Who Am I */}
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-2xl font-bold text-transparent bg-clip-text ${
            isDark
              ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
          } pb-4`}
        >
          Who Am I?
        </motion.h1>

        {/* Introduction */}
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`text-3xl font-semibold mb-6 ${
            isDark ? "text-white" : "text-gray-800"
          }`}
        >
          I'm a passionate developer and a curious Engineer.
        </motion.h3>

        {/* Paragraphs */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`mb-6 leading-relaxed text-lg ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          I love exploring diverse tech stacks — be it crafting web apps with the MERN stack, solving algorithmic challenges with Java (DSA), or building robust backend systems using MySQL and MongoDB. My hands-on experience with Git, Firebase, and REST APIs keeps me grounded in real-world development.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className={`mb-6 leading-relaxed text-lg ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Currently, I’m exploring Generative AI as a beginner, discovering ways to integrate it into systems and unlock new possibilities. To me, every project is an opportunity to learn, innovate, and make ideas happen.
        </motion.p>

        {/* Carousel Text */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={`leading-relaxed text-lg ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          When I'm not coding, I usually{" "}
          <motion.span
            key={currentText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`${
              isDark ? "text-pink-400" : "text-pink-500"
            } font-medium`}
          >
            {carouselTexts[currentText]}
          </motion.span>
          .
        </motion.p>
      </motion.div>
    </section>
  );
};

export default About;