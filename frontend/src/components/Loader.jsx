import { useEffect, useState } from "react";

const Loader = ({ onLoadingComplete }) => {
  const fullText = "hello.";
  const [text, setText] = useState("");
  const [fadeOut, setFadeOut] = useState(false);

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
      onLoadingComplete();
    }, 1600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, [text, onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">
      {/* Blob-like splashes */}
      <div className="absolute inset-0">
        <div className="absolute w-[350px] h-[350px] bg-pink-500 opacity-30 blur-[60px] top-[-80px] right-[-80px] rounded-full animate-blob"></div>
        <div className="absolute w-[280px] h-[280px] bg-sky-400 opacity-20 blur-[60px] top-[40%] left-[-100px] rounded-full animate-blob delay-2000"></div>
        <div className="absolute w-[280px] h-[280px] bg-purple-600 opacity-20 blur-[60px] top-[50%] right-[-100px] rounded-full animate-blob delay-3000"></div>
        <div className="absolute w-[300px] h-[300px] bg-orange-400 opacity-20 blur-[60px] bottom-[-100px] left-1/2 transform -translate-x-1/2 rounded-full animate-blob delay-4000"></div>
      </div>
      <div
        className={`
          text-[125px]
          transition-all duration-700 ease-out
          ${fadeOut ? "opacity-0 scale-95" : "opacity-100 scale-100"}
        `}
        style={{
          fontFamily: '"Sacramento", cursive',
          background: 'linear-gradient(45deg, #ff69b4, #ff1493, #dc143c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '2px 2px 4px rgba(255, 105, 180, 0.5)',
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default Loader;
