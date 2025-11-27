import React, { useState, useEffect, useRef } from "react";
import { FiMenu, FiX, FiTerminal } from "react-icons/fi";
import { useTheme } from "./ui/ThemeContext";
import { gsap } from "gsap";

const Navbar = ({ onTerminalClick }) => {
  const { isDark } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");

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
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActive(link.name);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  useEffect(() => {
    gsap.fromTo(
      navbarRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.3 }
    );

    gsap.fromTo(
      welcomeTextRef.current,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.25, delay: 0.1 }
    );
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (menuOpen) {
      gsap.to(mobileMenuRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.15,
        ease: "power2.in",
      });
    }
  }, [menuOpen]);

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[60] w-full max-w-3xl px-2">
      <div
        ref={navbarRef}
        className={`backdrop-blur-xl backdrop-saturate-150 border rounded-xl flex items-center px-6 py-3 shadow-lg transition-all duration-300 ${
          isDark
            ? "bg-white/10 border-white/20"
            : "bg-white/40 border border-transparent shadow-lg"
        }`}
      >
        {/* Mobile Menu Button + Welcome */}
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

        {/* NAVIGATION + TERMINAL BUTTON */}
        <nav className="hidden md:flex items-center justify-center w-full">
          <div className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  active === link.name
                    ? "text-blue-500"
                    : isDark
                    ? "text-white"
                    : "text-black"
                } hover:text-blue-400`}
              >
                {link.name}
              </a>
            ))}

            {/* Terminal Button - SAME SPACING */}
            <button
              onClick={() => onTerminalClick && onTerminalClick()}
              className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-gray-100/20 dark:bg-white/10 hover:bg-gray-200/30 dark:hover:bg-white/20 transition-colors cursor-pointer"
            >
              <FiTerminal className="w-5 h-5 text-green-500 animate-pulse" />
              <span className="text-sm font-medium text-green-500">Terminal</span>
            </button>
          </div>
        </nav>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          ref={mobileMenuRef}
          className={`md:hidden mt-4 backdrop-blur-2xl backdrop-saturate-150 rounded-xl py-6 px-8 flex flex-col items-center gap-6 transition-all duration-300 ${
            isDark ? "bg-white/10 text-white" : "bg-white/40 text-black"
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
