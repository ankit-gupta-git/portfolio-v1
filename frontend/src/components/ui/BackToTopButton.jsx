import { useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    let ticking = false;

    const toggleVisibility = () => {
      const shouldShow = window.scrollY > 300;
      setIsVisible((prev) => (prev !== shouldShow ? shouldShow : prev));
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(toggleVisibility);
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to top smoothly
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-24 right-8 z-50">
      {isVisible && (
        <button
          onClick={handleScrollToTop}
          className={`p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200
            ${isDark
              ? 'bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-500'
              : 'bg-white text-gray-800 border border-gray-300 shadow hover:bg-gray-100 focus:ring-blue-400'}
          `}
          aria-label="Go to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19V5m-7 7l7-7 7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default BackToTopButton; 