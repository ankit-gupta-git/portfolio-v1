import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const greetings = [
  "Hello",
  "नमस्ते",
  "ہیلو",
  "Hola",
  "Bonjour",
  "Hallo",
  "Ciao",
  "Привет",
  "你好",
  "مرحبا"
];

const Loader = ({ onLoadingComplete }) => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const counterRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    // Lock scroll during intro
    window.scrollTo(0, 0);

    const preventScroll = (e) => e.preventDefault();
    const preventDefaultKeys = (e) => {
      const keys = ["Space", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"];
      if (keys.includes(e.code)) e.preventDefault();
    };

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.cursor = "none";
    document.documentElement.style.cursor = "none";

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventDefaultKeys, { passive: false });

    // Smooth counter animation from 0 to 100%
    const counterObj = { value: 0 };
    gsap.to(counterObj, {
      value: 100,
      duration: 2.1,
      ease: "power1.inOut",
      onUpdate: () => {
        setProgress(Math.round(counterObj.value));
      },
    });

    // Word cycling interval (190ms per word)
    let wordIdx = 0;
    const intervalId = setInterval(() => {
      wordIdx++;
      if (wordIdx < greetings.length) {
        setIndex(wordIdx);
      } else {
        clearInterval(intervalId);
        triggerCurtainExit();
      }
    }, 190);

    const triggerCurtainExit = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onLoadingComplete) onLoadingComplete();
        },
      });

      // Text scale up & cinematic blur out
      tl.to(textRef.current, {
        scale: 1.15,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.4,
        ease: "power2.in",
      })
      .to(
        counterRef.current,
        {
          opacity: 0,
          y: 15,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.3"
      );

      // SVG Curved Arch Exit (Luxury Curtain Reveal)
      const height = window.innerHeight;
      const width = window.innerWidth;
      const curveHeight = height * 0.3;

      if (pathRef.current) {
        tl.to(pathRef.current, {
          attr: {
            d: `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height - curveHeight} 0 ${height} Z`
          },
          duration: 0.4,
          ease: "power2.in"
        })
        .to(pathRef.current, {
          attr: {
            d: `M0 0 L${width} 0 L${width} 0 Q${width / 2} 0 0 0 Z`
          },
          duration: 0.6,
          ease: "power4.out"
        })
        .to(
          containerRef.current,
          {
            opacity: 0,
            duration: 0.1,
            pointerEvents: "none",
          },
          "-=0.1"
        );
      } else {
        tl.to(containerRef.current, {
          y: "-100%",
          duration: 0.9,
          ease: "power4.inOut",
        });
      }
    };

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventDefaultKeys);

      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.cursor = "";
      document.documentElement.style.cursor = "";
    };
  }, [onLoadingComplete]);

  // GSAP micro-entrance per greeting word change
  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 14, filter: "blur(5px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.16, ease: "power2.out" }
      );
    }
  }, [index]);

  const initialD = typeof window !== "undefined"
    ? `M0 0 L${window.innerWidth} 0 L${window.innerWidth} ${window.innerHeight} Q${window.innerWidth / 2} ${window.innerHeight} 0 ${window.innerHeight} Z`
    : "";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-screen z-[99999] select-none pointer-events-auto overflow-hidden bg-transparent"
    >
      {/* SVG Background Overlay Curtain */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none fill-black"
      >
        <path ref={pathRef} d={initialD} />
      </svg>

      {/* Main Content Area */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-8 sm:p-12 md:p-16">
        {/* Top Spacer / Status */}
        <div className="flex justify-between items-center text-xs font-mono text-gray-500 uppercase tracking-widest">
          <span>PORTFOLIO v1.0</span>
          <span>ANKIT GUPTA</span>
        </div>

        {/* Center Greetings */}
        <div className="flex items-center justify-center my-auto">
          <h1
            ref={textRef}
            className="text-center font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight font-dxgrafik flex items-center justify-center gap-3 sm:gap-4"
          >
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-500 animate-pulse shadow-[0_0_12px_rgba(59,130,246,0.8)] inline-block" />
            <span>{greetings[index]}</span>
          </h1>
        </div>

        {/* Bottom Percentage Counter */}
        <div
          ref={counterRef}
          className="flex justify-between items-end text-sm sm:text-base font-mono text-gray-400 border-t border-white/10 pt-4"
        >
          <span className="text-xs text-blue-400/80 uppercase tracking-wider">Loading System</span>
          <span className="text-2xl sm:text-3xl font-bold text-white font-mono">
            {progress < 10 ? `0${progress}` : progress}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;