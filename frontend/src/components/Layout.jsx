import { Sparkles } from "./ui/sparkles";  // Sparkles component
import BlobBackground from "./ui/BlobBackground";  // Blob Background component
import { useTheme } from "./ui/ThemeContext";  // Theme context to get theme state

export default function Layout({ children }) {
  const { isDark } = useTheme(); // Get current theme from context

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition duration-300 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Sparkles for night mode */}
      {isDark && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Sparkles
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#ffffff"
          />
        </div>
      )}

      {/* Blob background - only in dark mode */}
      {isDark && <BlobBackground />}

      {/* Main content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
