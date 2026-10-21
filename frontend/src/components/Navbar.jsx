import React, { useState, useEffect, useRef } from "react";
import { FiMenu, FiX, FiTerminal } from "react-icons/fi";
import { FaSun, FaMoon } from "react-icons/fa6";
import { useTheme } from "./ui/ThemeContext";
import { gsap } from "gsap";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Problem Solving", href: "#problemsolving" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

const Navbar = ({ onTerminalClick }) => {
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");

  const navbarRef = useRef(null);
  const welcomeTextRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = `#${entry.target.id}`;
          const matchingLink = navLinks.find((link) => link.href === id);
          if (matchingLink) {
            setActive(matchingLink.name);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    navLinks.forEach((link) => {
      const section = document.querySelector(link.href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
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
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[60] w-full max-w-5xl px-2">
      <div
        ref={navbarRef}
        className={`backdrop-blur-xl backdrop-saturate-150 border rounded-xl flex items-center px-6 py-3 shadow-lg transition-all duration-300 ${
          isDark
            ? "bg-white/10 border-white/20"
            : "bg-white/40 border border-transparent shadow-lg"
        }`}
      >
        {/* Mobile Header Row */}
        <div className="flex md:hidden items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className={`text-2xl cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 ${
                isDark ? "text-white hover:text-blue-400" : "text-gray-800 hover:text-blue-600"
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>

            <span
              ref={welcomeTextRef}
              className={`text-sm font-medium bg-gradient-to-r ${
                isDark
                  ? "from-blue-400 to-purple-500 text-transparent bg-clip-text"
                  : "from-blue-600 to-purple-600 text-transparent bg-clip-text"
              }`}
            >
              Welcome
            </span>
          </div>

          <button
            onClick={() => onTerminalClick && onTerminalClick()}
            aria-label="Open Interactive Terminal"
            className="p-1.5 rounded-lg bg-gray-100/30 dark:bg-white/10 text-emerald-400 cursor-pointer"
          >
            <FiTerminal className="w-4 h-4" />
          </button>
        </div>

        {/* NAVIGATION + TERMINAL BUTTON */}
        <nav className="hidden md:flex items-center justify-center w-full">
          <div className="flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`whitespace-nowrap text-sm font-medium transition-all duration-300 hover:scale-105 ${
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

            {/* Terminal Button */}
            <button
              onClick={() => onTerminalClick && onTerminalClick()}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gray-100/30 dark:bg-white/10 hover:bg-gray-200/50 dark:hover:bg-white/20 transition-all duration-200 cursor-pointer border border-transparent dark:border-white/10"
              title="Open Interactive Terminal"
            >
              <FiTerminal className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-medium text-emerald-500 dark:text-emerald-400">Terminal</span>
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
              className="text-lg font-medium whitespace-nowrap hover:text-blue-400 transition-all duration-300 hover:scale-105"
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
