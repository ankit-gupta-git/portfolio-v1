import React, { useEffect, useRef } from "react";
import gsap from "gsap";
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
import CreativeProfileCard from "./ui/CreativeProfileCard";

const Hero = ({ isLoading = false }) => {
  const { isDark, setIsDark } = useTheme();
  const progressBarRef = useRef(null);
  const heroRef = useRef(null);
  const profileContainerRef = useRef(null);

  // Scroll Progress Bar
  useEffect(() => {
    let ticking = false;

    const updateProgressBar = () => {
      const totalScroll = window.scrollY || document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scroll = windowHeight === 0 ? 0 : totalScroll / windowHeight;
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${scroll})`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgressBar);
        ticking = true;
      }
    };

    updateProgressBar();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP Entrance Animations
  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.to(".gsap-hero-anim", { opacity: 1, duration: 0.3 });
        if (profileContainerRef.current) {
          gsap.to(profileContainerRef.current, { opacity: 1, duration: 0.3 });
        }
        return;
      }

      // Master Staggered Entrance for Hero Content
      gsap.fromTo(
        ".gsap-hero-anim",
        { opacity: 0, y: 35, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
        }
      );

      // Entrance for Sarthak-style Profile Visual
      if (profileContainerRef.current) {
        gsap.fromTo(
          profileContainerRef.current,
          { opacity: 0, scale: 0.9, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.3,
            ease: "power3.out",
            delay: 0.2,
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, [isLoading]);

  // GSAP Magnetic Effect for Hovering Elements
  const handleMagneticMove = (e) => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35;

    gsap.to(target, {
      x: x,
      y: y,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMagneticLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        ref={progressBarRef}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-1 z-50 transition-colors duration-300"
        style={{
          background: isDark
            ? "linear-gradient(to right, #2563eb, #9333ea, #db2777)"
            : "linear-gradient(to right, #159ccb, #0f7a9e, #0d5a7a)",
          transformOrigin: "0%",
          transform: "scaleX(0)",
        }}
      />

      <section
        ref={heroRef}
        id="home"
        className={`min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-12 lg:px-20 relative transition duration-300 ${
          !isDark
            ? "bg-gradient-to-br from-[#f1faff] via-[#e6f0ff] to-[#ffffff]"
            : ""
        } ${isDark ? "pt-32 sm:pt-20 md:pt-24 lg:pt-28" : "pt-32 sm:pt-24 md:pt-24 lg:pt-28"}`}
      >
        {/* Day/Night Theme Toggle Switch - EXACTLY AS PREVIOUS */}
        <button
          onClick={() => setIsDark(!isDark)}
          onMouseMove={handleMagneticMove}
          onMouseLeave={handleMagneticLeave}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className={`absolute top-24 sm:top-6 right-6 z-50 w-12 h-6 sm:w-16 sm:h-8 rounded-full p-1 transition-colors duration-300 ease-in-out cursor-pointer ${
            isDark
              ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
              : "bg-gradient-to-r from-[#159ccb] to-[#0f7a9e]"
          }`}
        >
          <div
            className="w-4 h-4 sm:w-6 sm:h-6 rounded-full flex items-center justify-center bg-white shadow-lg"
            style={{
              transform: `translateX(${
                isDark
                  ? typeof window !== "undefined" && window.innerWidth < 640
                    ? 24
                    : 32
                  : 0
              }px)`,
              transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {isDark ? (
              <FaSun className="text-yellow-500 text-xs sm:text-sm" />
            ) : (
              <FaMoon className="text-gray-800 text-xs sm:text-sm" />
            )}
          </div>
        </button>

        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-10 items-center">
          {/* RIGHT SIDE - SARTHAK-STYLE CLEAN PORTRAIT WITH GSAP ANIMATION */}
          <div
            ref={profileContainerRef}
            className="flex justify-center order-1 md:order-2"
          >
            <CreativeProfileCard isDark={isDark} />
          </div>

          {/* LEFT SIDE - STAGGERED GSAP ENTRANCE CONTENT */}
          <div
            className={`space-y-6 order-2 md:order-1 ${
              isDark ? "text-white" : "text-[#111827]"
            } transition duration-300`}
          >
            {/* Main Heading with Exact Instrument Serif Font from Reference */}
            <h1 className="gsap-hero-anim flex flex-col gap-1 text-center md:text-left">
              <span className={`text-xl sm:text-2xl md:text-3xl font-normal ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Hi, I'm
              </span>
              <span
                className={`font-instrument text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[5.8rem] font-normal tracking-[-0.03em] leading-[1.05] ${
                  isDark ? "text-[#f1eee8]" : "text-[#111827]"
                } flex items-baseline gap-3.5 justify-center md:justify-start`}
              >
                <span>Ankit</span>
                <span className="italic font-normal">
                  Gupta
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <h2
              className={`gsap-hero-anim text-lg sm:text-xl md:text-2xl font-medium ${
                isDark ? "text-gray-400" : "text-gray-600"
              } text-center md:text-left`}
            >
              Full-Stack Developer | MERN | Generative AI
            </h2>

            {/* Narrative Paragraph */}
            <p
              className={`gsap-hero-anim max-w-xl text-sm sm:text-base md:text-lg ${
                isDark ? "text-gray-400" : "text-gray-700"
              } text-center md:text-left leading-relaxed`}
            >
              I build scalable full-stack products — from system design and APIs to responsive, high-performance frontends. With experience shipping production applications, winning hackathons, and solving 500+ DSA problems, I focus on writing code that scales and performs in real-world environments. Currently exploring Generative AI and intelligent agents to build smarter, more efficient systems. Always open to opportunities where I can contribute and create meaningful impact.
            </p>

            {/* CTA Buttons - EXACT PREVIOUS GRADIENTS AND HOVER ANIMATIONS */}
            <div className="gsap-hero-anim flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
              {/* View CV Button */}
              <a
                href="https://drive.google.com/file/d/1VSDsphVfNGgTigWoql8lBjk8K1y-3Q-C/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg transition relative group overflow-hidden ${
                  isDark
                    ? "bg-black/30 backdrop-blur-md border-2 border-blue-500/50"
                    : "bg-white/80 backdrop-blur-md border-2 border-[#159ccb]/30 shadow-sm"
                }`}
              >
                <span
                  className="absolute inset-0 bg-gradient-to-r from-[#159ccb] to-[#0f7a9e] opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"
                ></span>
                <span
                  className={`relative z-10 flex items-center gap-2 font-medium ${
                    isDark
                      ? "text-white"
                      : "text-[#159ccb] group-hover:text-white group-active:text-white"
                  }`}
                >
                  View CV <HiOutlineDocumentArrowDown className="text-lg" />
                </span>
              </a>

              {/* LeetCode Button */}
              <a
                href="https://leetcode.com/ankitguptaa17"
                target="_blank"
                rel="noreferrer"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg transition relative group overflow-hidden ${
                  isDark
                    ? "bg-black/30 backdrop-blur-md border-2 border-orange-500/50"
                    : "bg-white/80 backdrop-blur-md border-2 border-orange-600/30 shadow-sm"
                }`}
              >
                <span
                  className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-600 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"
                ></span>
                <span
                  className={`relative z-10 flex items-center gap-2 font-medium ${
                    isDark
                      ? "text-white"
                      : "text-orange-600 group-hover:text-white group-active:text-white"
                  }`}
                >
                  LeetCode <FaCode className="text-lg" />
                </span>
              </a>
            </div>

            {/* Social Links with GSAP Magnetic Hover - EXACT PREVIOUS STYLING */}
            <div className="gsap-hero-anim flex gap-8 pt-2 justify-center md:justify-start">
              {/* GitHub */}
              <a
                href="https://github.com/ankit-gupta-git"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className="transition-colors duration-300 hover:text-blue-500 flex items-center justify-center p-2"
              >
                <FaGithub className="text-[1.6rem]" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/iamankit-gupta"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className="transition-colors duration-300 hover:text-blue-500 flex items-center justify-center p-2"
              >
                <FaLinkedin className="text-[1.6rem]" />
              </a>

              {/* X (Twitter) */}
              <a
                href="https://twitter.com/ankitgupta_79"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className="transition-colors duration-300 hover:text-blue-500 flex items-center justify-center p-2"
              >
                <FaXTwitter className="text-[1.6rem]" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
