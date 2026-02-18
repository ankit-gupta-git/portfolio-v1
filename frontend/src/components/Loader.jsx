// In Loader.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loader = ({ onLoadingComplete }) => {
  const fullText = "hello.";
  const [text, setText] = useState("");
  const [fadeOut, setFadeOut] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [progress, setProgress] = useState(0);

  // Progress bar animation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  // Typing effect
  useEffect(() => {
    if (text.length < fullText.length) {
      const t = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 160);
      return () => clearTimeout(t);
    }

    // After typing complete → fade out
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 900);

    // End loader
    const endTimer = setTimeout(() => {
      setShowLoader(false);
      onLoadingComplete();
    }, 1600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, [text, onLoadingComplete]);

  // Interactive elements
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          className={`fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center transition-all duration-1000 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div 
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              className="text-6xl font-gyst text-white mb-8 relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                scale: isHovered ? 1.05 : 1,
                rotate: isHovered ? [0, -5, 5, -5, 0] : 0
              }}
              transition={{ 
                duration: 0.6,
                rotate: { 
                  duration: 0.8,
                  repeat: isHovered ? Infinity : 0,
                  repeatType: "reverse"
                }
              }}
            >
              {text}
              <motion.span
                className="inline-block w-1 h-12 bg-blue-500 ml-1"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ 
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            </motion.div>

            {/* Animated progress bar */}
            <motion.div 
              className="h-1 bg-gray-700 rounded-full overflow-hidden mt-4 w-64"
              initial={{ width: 0 }}
              animate={{ width: 256 }}
              transition={{ duration: 3, ease: "easeInOut" }}
            >
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Interactive message */}
            <motion.p 
              className="text-gray-400 mt-4 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {progress < 100 ? "Loading your experience..." : "Ready to go!"}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;