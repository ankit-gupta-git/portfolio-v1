import { useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";

const BackToTopButton = ({ lenis }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const toggleVisibility = (e) => {
      if (e.scroll > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    let handleScroll;

    if (lenis) {
      lenis.on('scroll', toggleVisibility);
    } else {
      handleScroll = () => {
        if (window.pageYOffset > 100) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (lenis) {
        lenis.off('scroll', toggleVisibility);
      } else if (handleScroll) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [lenis]);

  // Scroll to top smoothly
  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fixed bottom-24 right-8 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
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