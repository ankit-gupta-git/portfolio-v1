import React, { useEffect } from "react";
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

const Hero = () => {
  const { isDark, setIsDark } = useTheme();

  useEffect(() => {
    // No scroll progress logic needed
    return () => {};
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 z-50"
        style={{
          background: isDark
            ? "linear-gradient(to right, #2563eb, #9333ea, #db2777)"
            : "linear-gradient(to right, #159ccb, #0f7a9e, #0d5a7a)",
          transformOrigin: "0%",
          // Optionally, you can set scaleX to scrollProgress if you want to keep the progress bar effect
        }}
      />

      <section
        id="home"
        className={`min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-12 lg:px-20 relative transition duration-300 ${
          !isDark
            ? "bg-gradient-to-br from-[#f1faff] via-[#e6f0ff] to-[#ffffff]"
            : ""
        } ${isDark ? "mt-16 sm:mt-20 md:mt-0" : "mt-20 sm:mt-24 md:mt-0"}`}
      >
        {/* Theme Toggle Switch */}
        <button
          onClick={() => setIsDark(!isDark)}
          className={`absolute top-6 right-6 z-50 w-12 h-6 sm:w-16 sm:h-8 rounded-full p-1 transition-colors duration-300 ease-in-out ${
            isDark
              ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
              : "bg-gradient-to-r from-[#159ccb] to-[#0f7a9e]"
          }`}
        >
          <div
            className="w-4 h-4 sm:w-6 sm:h-6 rounded-full flex items-center justify-center bg-white shadow-lg"
            style={{
              transform: `translateX(${
                isDark ? (window.innerWidth < 640 ? 24 : 32) : 0
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
          {/* RIGHT SIDE - IMAGE */}
          <div className="flex justify-center order-1 md:order-2">
            <div
              className={`relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full p-1 shadow-lg ${
                isDark
                  ? "bg-gradient-to-tr from-blue-600 to-purple-600"
                  : "bg-gradient-to-tr from-[#159ccb] to-[#0f7a9e]"
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
          </div>

          {/* LEFT SIDE */}
          <div
            className={`space-y-6 order-2 md:order-1 ${
              isDark ? "text-white" : "text-[#111827]"
            } transition duration-300`}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold flex flex-col gap-2 text-center md:text-left">
              <span>Hi, I'm</span>
              <span
                className={`${
                  isDark ? "text-blue-500" : "text-[#159ccb]"
                } font-dxgrafik`}
              >
                Ankit Gupta
              </span>
            </h1>
            <h2
              className={`text-lg sm:text-xl md:text-2xl font-medium ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Full Stack Developer | Aspiring SDE
            </h2>
            <p
              className={`max-w-xl text-sm sm:text-base md:text-lg ${
                isDark ? "text-gray-400" : "text-gray-700"
              }`}
            >
              I turn ideas into code and messy problems into clean commits. I'm
              a full-stack developer, Java enthusiast, and 5x hackathoner who
              loves building real-world tech with a touch of AI. Right now, I'm
              exploring how smart systems can solve everyday challenges. Always
              up for connecting and creating something impactful—let's build
              together!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
              <a
                href="/Ankit_Gupta_SDE_Resume.pdf"
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg transition relative group overflow-hidden ${
                  isDark
                    ? "bg-black/30 backdrop-blur-md border-2 border-blue-500/50"
                    : "bg-white/80 backdrop-blur-md border-2 border-[#159ccb]/30 shadow-sm"
                }`}
              >
                <span
                  className={`absolute inset-0 bg-gradient-to-r from-[#159ccb] to-[#0f7a9e] opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300`}
                ></span>
                <span
                  className={`relative z-10 flex items-center gap-2 ${
                    isDark
                      ? "text-white"
                      : "text-[#159ccb] group-hover:text-white group-active:text-white"
                  }`}
                >
                  View CV <HiOutlineDocumentArrowDown className="text-lg" />
                </span>
              </a>
              <a
                href="https://leetcode.com/ankitguptaa17"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg transition relative group overflow-hidden ${
                  isDark
                    ? "bg-black/30 backdrop-blur-md border-2 border-orange-500/50"
                    : "bg-white/80 backdrop-blur-md border-2 border-orange-600/30 shadow-sm"
                }`}
              >
                <span
                  className={`absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-600 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300`}
                ></span>
                <span
                  className={`relative z-10 flex items-center gap-2 ${
                    isDark
                      ? "text-white"
                      : "text-orange-600 group-hover:text-white group-active:text-white"
                  }`}
                >
                  LeetCode <FaCode className="text-lg" />
                </span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-8 pt-2 justify-center md:justify-start">
              {/* GitHub */}
              <a
                href="https://github.com/ankit-gupta-git"
                target="_blank"
                rel="noreferrer"
                className="transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 hover:rotate-[6deg] hover:text-blue-500"
              >
                <FaGithub className="text-[1.6rem]" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/iamankit-gupta"
                target="_blank"
                rel="noreferrer"
                className="transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 hover:-rotate-[6deg] hover:text-blue-500"
              >
                <FaLinkedin className="text-[1.6rem]" />
              </a>

              {/* X (Twitter) */}
              <a
                href="https://twitter.com/ankitgupta_79"
                target="_blank"
                rel="noreferrer"
                className="transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 hover:rotate-[4deg] hover:text-blue-500"
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
