import React, { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";
import { Github } from "lucide-react";
import { useTheme } from "./ThemeContext";

const GITHUB_USERNAME = "ankit-gupta-git";

const MyTooltip = ({ content, children, isDark }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <span
          className={`absolute left-1/2 -top-8 -translate-x-1/2 z-50 px-2 py-1 text-xs rounded shadow-lg whitespace-nowrap pointer-events-none ${
            isDark
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          {content}
          <span
            className={`absolute left-1/2 top-full -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
              isDark ? "border-t-gray-900" : "border-t-white"
            }`}
          ></span>
        </span>
      )}
    </span>
  );
};

const GithubContributions = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredActivity, setHoveredActivity] = useState(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="w-full min-h-[60vh] flex flex-col items-center justify-center py-10 sm:py-16 px-2">
      <h1
        className={`text-3xl sm:text-5xl md:text-7xl font-bold bg-clip-text mb-2 sm:mb-4 text-center font-dxgrafik ${
          isDark
            ? "text-transparent bg-gradient-to-r from-gray-300 to-gray-600"
            : "text-gray-800"
        }`}
      >
        GitHub Contributions
      </h1>
      <h2
        className={`text-lg sm:text-2xl md:text-3xl font-semibold bg-clip-text mb-4 sm:mb-8 text-center ${
          isDark
            ? "text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
            : "text-purple-700"
        }`}
      >
        Contribution Activity
      </h2>
      <div
        className={`rounded-xl p-2 sm:p-4 md:p-6 mb-6 sm:mb-8 w-full max-w-full overflow-x-auto flex justify-center ${
          isDark ? "bg-opacity-70" : "bg-white"
        }`}
      >
        <div className="min-w-[320px] sm:min-w-[400px] md:min-w-[600px]">
          <GitHubCalendar
            username={GITHUB_USERNAME}
            colorScheme={isDark ? "dark" : "light"}
            blockSize={isMobile ? 10 : 16}
            blockMargin={4}
            fontSize={isMobile ? 8 : 14}
            renderBlock={(block, activity) =>
              React.cloneElement(block, {
                onMouseEnter: () => setHoveredActivity(activity),
                onMouseLeave: () => setHoveredActivity(null),
                children: (
                  <MyTooltip
                    content={`${activity.count} contributions on ${new Date(
                      activity.date
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}`}
                    isDark={isDark}
                  >
                    {block.props.children}
                  </MyTooltip>
                ),
              })
            }
          />
          <p
            className={`mt-2 sm:mt-4 text-center min-h-[1.5em] text-base sm:text-lg ${
              isDark ? "text-white" : "text-gray-700"
            }`}
          >
            {hoveredActivity
              ? `${hoveredActivity.count} contributions on ${new Date(
                  hoveredActivity.date
                ).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}`
              : "Real-time contributions in the last year"}
          </p>
        </div>
      </div>
      <a
        href={`https://github.com/${GITHUB_USERNAME}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg font-semibold rounded-lg shadow-md transition-colors duration-200 ${
          isDark
            ? "bg-[#0e1013] text-white hover:bg-[#3b3f4a]"
            : "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300"
        }`}
      >
        <Github className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
        View GitHub Profile
      </a>
    </section>
  );
};

export default GithubContributions;
