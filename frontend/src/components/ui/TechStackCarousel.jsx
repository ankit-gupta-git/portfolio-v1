import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "./ThemeContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const techStack = [
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Vite", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" },
];

const Carousel = ({ direction = "left", isDark }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tappedIdx, setTappedIdx] = useState(null);
  const listRef = useRef(null);
  const [listWidth, setListWidth] = useState(0);
  const techItemsRef = useRef([]);

  useEffect(() => {
    if (listRef.current) {
      setListWidth(listRef.current.scrollWidth / 2);
    }
  }, []);

  // GSAP animations for tech items
  useEffect(() => {
    // Stagger animation for tech items
    gsap.fromTo(techItemsRef.current,
      { 
        opacity: 0, 
        y: 30, 
        scale: 0.8,
        rotation: direction === "left" ? -15 : 15
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.3,
        stagger: 0.03,
        ease: "power2.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [direction]);

  return (
    <div className="overflow-hidden relative py-2">
      <div
        ref={listRef}
        className={`flex gap-16 whitespace-nowrap animate-scroll-${direction}`}
        style={{
          animationPlayState: isHovered ? 'paused' : 'running',
          animationDuration: listWidth ? `${listWidth / 80}s` : '15s',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setHoveredIdx(null); }}
      >
        {[...techStack, ...techStack].map((tech, idx) => {
          // Only apply tap effect on mobile (max-width: 640px)
          const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
          const isTapped = tappedIdx === idx;

          return (
            <div
              key={idx}
              ref={el => techItemsRef.current[idx] = el}
              className={`flex flex-col items-center min-w-[90px] sm:min-w-[110px] md:min-w-[130px] transition-all duration-300 hover:scale-110`}
              onMouseEnter={() => {
                setHoveredIdx(idx);
                // GSAP hover animation
                gsap.to(techItemsRef.current[idx], {
                  scale: 1.15,
                  y: -5,
                  duration: 0.2,
                  ease: "power2.out"
                });
              }}
              onMouseLeave={() => {
                setHoveredIdx(null);
                // GSAP reset animation
                gsap.to(techItemsRef.current[idx], {
                  scale: 1,
                  y: 0,
                  duration: 0.2,
                  ease: "power2.out"
                });
              }}
              onTouchStart={() => {
                if (isMobile) setTappedIdx(idx);
              }}
              onTouchEnd={() => {
                if (isMobile) setTimeout(() => setTappedIdx(null), 350);
              }}
            >
              <img
                src={tech.logo}
                alt={tech.name}
                className={`h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 object-contain mb-2 transition-all duration-300
                  ${isDark ? "grayscale hover:grayscale-0" : ""}
                  ${hoveredIdx === idx && isDark ? 'z-10' : ''}
                  ${isTapped ? "ring-4 ring-[#159ccb] bg-white/10" : ""}
                `}
                style={isTapped ? { filter: "none", background: "linear-gradient(135deg,#159ccb,#0f7a9e,#0d5a7a)", borderRadius: "9999px" } : {}}
              />
              <span className={`text-xs sm:text-sm md:text-base font-medium transition-colors duration-300 ${
                isDark ? "text-gray-200" : "text-[#111827]"
              } ${hoveredIdx === idx ? 'text-[#159ccb] font-semibold' : ''}`}>
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TechStackCarousel = () => {
  const { isDark } = useTheme();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const carouselRef = useRef(null);

  // GSAP animations for the section
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%", // Changed from 80% to 90% - triggers earlier
        end: "bottom 10%",
        toggleActions: "play none none reverse"
      }
    });

    // Section entrance animation
    tl.fromTo(sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.4 }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.3 },
      "-=0.2"
    )
    .fromTo(carouselRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.4 },
      "-=0.15"
    );

    // Cleanup
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className={`w-full py-12 bg-transparent ${
        !isDark ? "bg-gradient-to-br from-[#f1faff] via-[#e6f0ff] to-[#ffffff]" : ""
      }`}
    >
      <h3 
        ref={titleRef}
        className={`text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-10 font-dxgrafik ${
          isDark
            ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-800"
            : "text-[#111827]"
        }`}
      >
        Tech Stack
      </h3>
      <div ref={carouselRef}>
        <Carousel direction="left" isDark={isDark} />
        <div className="mt-8">
          <Carousel direction="right" isDark={isDark} />
        </div>
      </div>
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TechStackCarousel;
