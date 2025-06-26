import React from "react";
import { useTheme } from "./ui/ThemeContext";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const { isDark } = useTheme();

  return (
    <footer className={`py-6 text-center mt-10 ${
      !isDark ? "bg-gradient-to-b from-blue-50 to-white" : "bg-transparent"
    }`}>
      <div className={`${isDark ? "border-t border-gray-700" : ""} w-full pt-6 mb-4`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-6 text-xl text-gray-500 dark:text-gray-400">
            <a
              href="https://github.com/ankit-gupta-git"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/iamankit-gupta"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com/ankitgupta_79"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <p className={`text-sm ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}>
          &copy; {new Date().getFullYear()} Ankit Kumar Gupta. All rights reserved.
        </p>
        <p className={`${isDark ? "text-gray-300" : "text-gray-500"} text-sm font-medium animate-pulse`}>
          🚧 Portfolio in Progress - Crafting Something Amazing! 🚧
        </p>
      </div>
    </footer>
  );
};

export default Footer;
