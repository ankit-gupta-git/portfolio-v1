import BlobBackground from "./ui/BlobBackground";  // Blob Background component
import { useTheme } from "./ui/ThemeContext";  // Theme context to get theme state
import useLenisScroll from "../hooks/useLenisScroll";  // Import the smooth scroll hook
import BackToTopButton from "./ui/BackToTopButton"; // Import the BackToTopButton

export default function Layout({ children }) {
  const { isDark } = useTheme(); // Get current theme from context
  const lenis = useLenisScroll(); // Initialize smooth scrolling and get instance

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition duration-300 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Blob background - only in dark mode */}
      {isDark && <BlobBackground />}

      {/* Main content */}
      <div className="relative z-10">{children}</div>

      {/* Back to top button */}
      <BackToTopButton lenis={lenis} />
    </div>
  );
}
