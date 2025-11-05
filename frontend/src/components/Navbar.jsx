import React, { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useTheme } from "./ui/ThemeContext";
import { gsap } from "gsap";

const Navbar = () => {
  const { isDark } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");
  
  // Refs for GSAP animations
  const navbarRef = useRef(null);
  const welcomeTextRef = useRef(null);
  const mobileMenuRef = useRef(null);

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
      const scrollY = window.scrollY + 100;
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

  // GSAP animations
  useEffect(() => {
    // Check if refs are available before creating animations
    if (!navbarRef.current || !welcomeTextRef.current) {
      return;
    }

    // Navbar entrance animation
    gsap.fromTo(navbarRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
    );

    // Welcome text animation
    gsap.fromTo(welcomeTextRef.current,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.25, delay: 0.1, ease: "power2.out" }
    );
  }, []);

  // Mobile menu animations
  useEffect(() => {
    if (!mobileMenuRef.current) {
      return;
    }

    if (menuOpen) {
      gsap.to(mobileMenuRef.current, {
        y: 0, opacity: 1, duration: 0.2, ease: "power2.out"
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        y: -20, opacity: 0, duration: 0.15, ease: "power2.in"
      });
    }
  }, [menuOpen]);

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[60] w-full max-w-xl px-4">
      <div
        ref={navbarRef}
        className={`backdrop-blur-md border rounded-xl flex justify-between items-center px-6 py-2 shadow-lg transition-all duration-300 ${
          isDark
            ? "bg-glass-dark border-white/10"
            : "bg-white/40 border border-transparent backdrop-blur-lg shadow-lg"
        }`}
      >
        {/* Mobile Menu Button and Welcome Text */}
        <div className="flex items-center gap-3">
          <div 
            className={`md:hidden text-2xl cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 ${
              isDark ? "text-white hover:text-blue-400" : "text-gray-800 hover:text-blue-600"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </div>
          <span 
            ref={welcomeTextRef}
            className={`md:hidden text-sm font-medium bg-gradient-to-r ${
              isDark 
                ? "from-blue-400 to-purple-500 text-transparent bg-clip-text" 
                : "from-blue-600 to-purple-600 text-transparent bg-clip-text"
            }`}
          >
            Welcome
          </span>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex justify-center items-center gap-10 w-full py-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                active === link.name ? "text-blue-500" : isDark ? "text-white" : "text-black"
              } hover:text-blue-400`}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={mobileMenuRef}
          className={`md:hidden mt-4 backdrop-blur-xl rounded-xl py-6 px-8 flex flex-col items-center gap-6 transition-all duration-300 ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium hover:text-blue-400 transition-all duration-300 hover:scale-105"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
