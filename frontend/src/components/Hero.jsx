import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaSun,
  FaMoon,
  FaCode,
} from "react-icons/fa6";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { useTheme } from "./ui/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const { isDark, setIsDark } = useTheme();

  // Optimized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        type: "tween"
      }
    }
  };

  return (
    <section
      id="home"
      className={`min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-12 lg:px-20 relative transition duration-300 ${
        !isDark ? "bg-gradient-to-br from-blue-50 to-white" : ""
      } ${isDark ? "mt-16 sm:mt-20 md:mt-0" : "mt-20 sm:mt-24 md:mt-0"}`}
    >
      {/* Theme Toggle Switch */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsDark(!isDark)}
        className={`absolute top-6 right-6 z-50 w-12 h-6 sm:w-16 sm:h-8 rounded-full p-1 transition-colors duration-300 ease-in-out ${
          isDark 
            ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" 
            : "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
        }`}
      >
        <motion.div
          className="w-4 h-4 sm:w-6 sm:h-6 rounded-full flex items-center justify-center bg-white shadow-lg"
          animate={{
            x: isDark ? (window.innerWidth < 640 ? 24 : 32) : 0,
            transition: { 
              type: "spring", 
              stiffness: 400, 
              damping: 25,
              mass: 0.8
            }
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isDark ? "sun" : "moon"}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.15 }}
            >
              {isDark ? (
                <FaSun className="text-yellow-500 text-xs sm:text-sm" />
              ) : (
                <FaMoon className="text-gray-800 text-xs sm:text-sm" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.button>

      <motion.div 
        className="max-w-7xl w-full grid md:grid-cols-2 gap-10 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* RIGHT SIDE - IMAGE */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center order-1 md:order-2"
        >
          <div
            className={`relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full p-1 shadow-lg ${
              isDark
                ? "bg-gradient-to-tr from-blue-600 to-purple-600"
                : "bg-gradient-to-tr from-blue-400 to-purple-400"
            }`}
          >
            <div
              className={`w-full h-full rounded-full p-1 ${
                isDark ? "bg-black" : "bg-white"
              }`}
            >
              <img
                src="/for-twitter.jpg"
                alt="Ankit Gupta"
                className="rounded-full object-cover w-full h-full"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </motion.div>

        {/* LEFT SIDE */}
        <motion.div
          variants={itemVariants}
          className={`space-y-6 order-2 md:order-1 ${
            isDark ? "text-white" : "text-gray-800"
          } transition duration-300`}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold flex flex-col gap-2 text-center md:text-left">
            <motion.span variants={itemVariants}>Hi, I'm</motion.span>
            <motion.span 
              variants={itemVariants}
              className={`${isDark ? "text-blue-500" : "text-blue-600"}`}
            >
              Ankit Gupta
            </motion.span>
          </h1>
          <motion.h2
            variants={itemVariants}
            className={`text-lg sm:text-xl md:text-2xl font-medium ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Full Stack Developer | Aspiring SDE
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className={`max-w-xl text-sm sm:text-base md:text-lg ${
              isDark ? "text-gray-400" : "text-gray-700"
            }`}
          >
            I turn ideas into code and chaos into clean commits. Full-stack dev,
            Java junkie, and 5x hackathoner building real-world tech with a hint
            of AI. Currently exploring how smart systems can solve not-so-smart
            problems. Let's connect and create something amazing together!
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg transition relative group ${
                isDark
                  ? "bg-black/30 backdrop-blur-md border-2 border-blue-500/50"
                  : "bg-white/30 backdrop-blur-md border-2 border-blue-500/50"
              }`}
            >
              <span
                className={`absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></span>
              <span className="relative z-10 flex items-center gap-2">
                View CV <HiOutlineDocumentArrowDown className="text-lg" />
              </span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://leetcode.com/ankitguptaa17"
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg transition relative group ${
                isDark
                  ? "bg-black/30 backdrop-blur-md border-2 border-orange-500/50"
                  : "bg-white/30 backdrop-blur-md border-2 border-orange-500/50"
              }`}
            >
              <span
                className={`absolute inset-0 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></span>
              <span className="relative z-10 flex items-center gap-2">
                LeetCode <FaCode className="text-lg" />
              </span>
            </motion.a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            variants={itemVariants}
            className={`flex gap-5 pt-4 text-2xl justify-center md:justify-start ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <motion.a
              whileHover={{ scale: 1.2, y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              href="https://github.com/ankit-gupta-git"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub className="hover:text-blue-700 transition" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              href="https://www.linkedin.com/in/ankitgupta-tech"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin className="hover:text-blue-700 transition" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              href="https://x.com/ankitgupta_79"
              target="_blank"
              rel="noreferrer"
            >
              <FaXTwitter className="hover:text-blue-700 transition" />
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;