import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTheme } from "./ui/ThemeContext"; // Assuming you have this context for theme

const Navbar = () => {
  const { isDark } = useTheme(); // Using context for theme
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 100; // Adjust offset for better accuracy
      navLinks.forEach((link) => {
        const section = document.querySelector(link.href);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            setActive(link.name);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-xl px-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`backdrop-blur-md border rounded-2xl flex justify-between items-center px-6 py-2 shadow-lg ${
          isDark
            ? "bg-glass-dark border-white/10" // Keep glassmorphic look in dark mode
            : "bg-white/40 border border-transparent backdrop-blur-lg shadow-lg" // Gradient for light mode
        }`}
      >
        {/* Mobile Menu Button and Welcome Text */}
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`md:hidden text-2xl cursor-pointer transition-colors duration-300 ${
              isDark ? "text-white hover:text-blue-400" : "text-gray-800 hover:text-blue-600"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </motion.div>
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`md:hidden text-sm font-medium bg-gradient-to-r ${
              isDark 
                ? "from-blue-400 to-purple-500 text-transparent bg-clip-text" 
                : "from-blue-600 to-purple-600 text-transparent bg-clip-text"
            }`}
          >
            Welcome
          </motion.span>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex justify-center items-center gap-10 w-full py-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition ${
                active === link.name ? "text-blue-500" : isDark ? "text-white" : "text-black"
              } hover:text-blue-400`}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </motion.div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className={`md:hidden mt-4 backdrop-blur-xl rounded-xl py-6 px-8 flex flex-col items-center gap-6 ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium hover:text-blue-400"
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
