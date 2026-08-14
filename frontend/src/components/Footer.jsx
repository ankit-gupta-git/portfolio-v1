import React from "react";
import { useTheme } from "./ui/ThemeContext";
import { FaGithub, FaLinkedin, FaXTwitter, FaArrowUp, FaEnvelope, FaLocationDot } from "react-icons/fa6";
import { Sparkles, CircleDot } from "lucide-react";
import LiveClock from "./ui/LiveClock";

const Footer = () => {
  const { isDark } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Problem Solving", href: "#problem-solving" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/ankit-gupta-git", icon: <FaGithub /> },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/iamankit-gupta", icon: <FaLinkedin /> },
    { name: "X / Twitter", url: "https://twitter.com/ankitgupta_79", icon: <FaXTwitter /> },
    { name: "Email", url: "mailto:ankitguptag79@gmail.com", icon: <FaEnvelope /> },
  ];

  return (
    <footer className="relative w-full pt-12 pb-2 overflow-hidden">
      {/* 1. Curved Container Div Card (Ref: 100xDevs style) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={`relative rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-10 md:p-12 transition-all duration-500 border backdrop-blur-xl ${
            isDark
              ? "bg-neutral-950/80 border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.12)]"
              : "bg-white/90 border-gray-200/80 shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
          }`}
        >
          {/* Top Arc Ambient Glow */}
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-32 rounded-full blur-[80px] pointer-events-none ${
              isDark ? "bg-gradient-to-r from-blue-600/20 via-indigo-500/20 to-purple-600/20" : "bg-gradient-to-r from-blue-400/15 via-indigo-300/15 to-cyan-300/15"
            }`}
          />

          {/* Grid Layout inside Curved Div */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-8 border-b border-white/10 dark:border-white/10 border-gray-200">
            {/* Left Column: Brand & Info */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xl md:text-2xl font-syne font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                  <span>Ankit Kumar Gupta</span>
                  <Sparkles className="w-4 h-4 text-blue-500" />
                </h3>
                <p className="mt-3 text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
                  Full-Stack Software Engineer crafting scalable web applications, high-performance APIs, and interactive digital experiences.
                </p>
              </div>

              {/* Status & Location Pill */}
              <div className="mt-6 flex flex-wrap items-center gap-2.5 text-xs font-medium">
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${
                    isDark
                      ? "bg-white/5 border-white/10 text-gray-300"
                      : "bg-gray-100 border-gray-200 text-gray-700"
                  }`}
                >
                  <FaLocationDot className="text-blue-500" />
                  <span>India</span>
                  <span className="text-gray-400">|</span>
                  <LiveClock />
                </span>

                <span
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${
                    isDark
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                      : "bg-emerald-50 border-emerald-200 text-emerald-700"
                  }`}
                >
                  <CircleDot className="w-2 h-2 fill-emerald-500 text-emerald-500 animate-pulse" />
                  <span>Available for work</span>
                </span>
              </div>
            </div>

            {/* Middle Column: Quick Links */}
            <div className="md:col-span-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-500 mb-4">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-xs md:text-sm">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Socials & Back to Top */}
            <div className="md:col-span-4 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-500 mb-4">
                  Connect
                </h4>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95 ${
                        isDark
                          ? "bg-white/5 hover:bg-blue-600/20 border-white/10 hover:border-blue-500/50 text-gray-200 hover:text-white"
                          : "bg-gray-50 hover:bg-blue-50 border-gray-200 hover:border-blue-300 text-gray-800 hover:text-blue-600"
                      }`}
                    >
                      <span className="text-blue-500 text-sm">{social.icon}</span>
                      <span>{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Back to Top */}
              <div className="mt-6 pt-4 flex items-center justify-between">
                <button
                  onClick={scrollToTop}
                  className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95 cursor-pointer ${
                    isDark
                      ? "bg-white/10 hover:bg-blue-600 hover:border-blue-500 text-white border-white/15"
                      : "bg-gray-900 text-white hover:bg-blue-600 border-gray-800 shadow-sm"
                  }`}
                >
                  <span>Back to top</span>
                  <FaArrowUp className="text-xs" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Meta inside Curved Div */}
          <div className="relative z-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} <span className="font-semibold text-gray-700 dark:text-gray-200">Ankit Kumar Gupta</span>. All rights reserved.
            </p>
            <p className="font-mono text-gray-400 dark:text-gray-500">
              portfolio-v1
            </p>
          </div>
        </div>
      </div>

      {/* 2. Scalable Vector SVG Typography - Short Punchy Gesture THANKS */}
      <div className="w-full px-2 sm:px-4 md:px-8 mt-4 md:mt-6 select-none flex justify-center items-center">
        <svg
          viewBox="0 0 1000 160"
          className="w-full h-auto max-h-[220px]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Dark Mode Gradient: White -> Grey -> Deep Dark */}
            <linearGradient id="thanksGradDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="45%" stopColor="#9CA3AF" />
              <stop offset="100%" stopColor="#171717" />
            </linearGradient>

            {/* Light Mode Gradient: Dark -> Mid Grey -> Light Grey */}
            <linearGradient id="thanksGradLight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#111827" />
              <stop offset="50%" stopColor="#4B5563" />
              <stop offset="100%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <text
            x="50%"
            y="50%"
            dominantBaseline="central"
            textAnchor="middle"
            fill={isDark ? "url(#thanksGradDark)" : "url(#thanksGradLight)"}
            className="font-syne font-extrabold text-[145px] tracking-tight uppercase"
          >
            THANKS
          </text>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
