import { useState, useEffect } from "react";
import { useTheme } from "./ui/ThemeContext";
import { Sparkles } from "./ui/sparkles";

const About = () => {
  const { isDark } = useTheme();
  const [currentText, setCurrentText] = useState(0);
  const [animate, setAnimate] = useState(true);
  const carouselTexts = [
    "explore new places",
    "play video games",
    "watch movies & series",
    "do editing",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setCurrentText((prev) => (prev + 1) % carouselTexts.length);
        setAnimate(true);
      }, 200); // match transition duration
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      className={`relative z-10 py-24 px-6 md:px-12 text-center ${
        !isDark ? "bg-gradient-to-br from-[#f1faff] via-[#e6f0ff] to-[#ffffff]" : "bg-transparent"
      }`}
    >
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
      {/* Section Title */}
      <h2
        className={`text-4xl sm:text-5xl md:text-6xl font-bold ${
          isDark
            ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-800"
            : "text-[#111827]"
        } mb-12 font-dxgrafik`}
      >
        About Me
      </h2>

      {/* About Content */}
      <div
        className={`max-w-4xl mx-auto px-8 py-20 rounded-3xl ${
          isDark
            ? "border border-white/20 bg-white/5 backdrop-blur-[20px] shadow-[0_12px_48px_0_rgba(255,255,255,0.1)]"
            : "bg-white/90 backdrop-blur-[20px] shadow-lg border border-white/50"
        } text-left transition-all duration-300 hover:shadow-xl`}
      >
        {/* Who Am I */}
        <div className="pb-4">
          <h1
            className={`text-3xl font-bold text-transparent bg-clip-text ${
              isDark
                ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                : "bg-gradient-to-r from-[#159ccb] to-[#0f7a9e]"
            } font-dxgrafik`}
          >
            Who Am I?
          </h1>
        </div>

        {/* Introduction */}
        <h3
          className={`text-3xl font-semibold mb-6 ${
            isDark ? "text-white" : "text-[#111827]"
          } font-dxgrafik`}
        >
          I'm a passionate developer and a curious Engineer.
        </h3>

        {/* Paragraphs */}
        <p
          className={`mb-6 leading-relaxed text-lg ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          I love exploring diverse tech stacks — be it crafting web apps with the MERN stack, solving algorithmic challenges with Java (DSA), or building robust backend systems using MySQL and MongoDB. My hands-on experience with Git, Firebase, and REST APIs keeps me grounded in real-world development.
        </p>

        <p
          className={`mb-6 leading-relaxed text-lg ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Currently, I'm exploring Generative AI as a beginner, discovering ways to integrate it into systems and unlock new possibilities. To me, every project is an opportunity to learn, innovate, and make ideas happen.
        </p>

        {/* Carousel Text */}
        <p
          className={`leading-relaxed text-lg ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          When I'm not coding, I usually{" "}
          <span>
            <span
              className={`${
                isDark ? "text-pink-400" : "text-[#159ccb]"
              } font-medium inline-block transition-all duration-300 ease-in-out
                ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
            >
              {carouselTexts[currentText]}
            </span>
          </span>
        </p>
      </div>
    </section>
  );
};

export default About;