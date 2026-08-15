import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { AppleHelloEnglishEffect } from "./ui/apple-hello-effect";

const Loader = ({ onLoadingComplete }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const isExitingRef = useRef(false);

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

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventDefaultKeys);

      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.cursor = "";
      document.documentElement.style.cursor = "";
    };
  }, []);

  const triggerOpeningAnimation = () => {
    if (isExitingRef.current) return;
    isExitingRef.current = true;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const curveHeight = height * 0.35;

    const tl = gsap.timeline({
      onComplete: () => {
        if (onLoadingComplete) onLoadingComplete();
      },
    });

    // 1. Brief subtle pulse on completed "hello"
    tl.to(textRef.current, {
      scale: 1.06,
      filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 35px rgba(59, 130, 246, 0.5))",
      duration: 0.2,
      ease: "power2.out",
    })
    // 2. Expand & cinematic blur dissolve as the curtain opens
    .to(textRef.current, {
      scale: 1.25,
      opacity: 0,
      filter: "blur(18px)",
      duration: 0.45,
      ease: "power3.in",
    });

    // 3. Curved SVG Arch Curtain Lift Reveal
    if (pathRef.current) {
      tl.to(
        pathRef.current,
        {
          attr: {
            d: `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height - curveHeight} 0 ${height} Z`,
          },
          duration: 0.35,
          ease: "power2.in",
        },
        "-=0.35"
      )
      .to(pathRef.current, {
        attr: {
          d: `M0 0 L${width} 0 L${width} 0 Q${width / 2} 0 0 0 Z`,
        },
        duration: 0.65,
        ease: "power4.out",
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
      tl.to(
        containerRef.current,
        {
          y: "-100%",
          duration: 0.85,
          ease: "power4.inOut",
        },
        "-=0.3"
      );
    }
  };

  const initialD = typeof window !== "undefined"
    ? `M0 0 L${window.innerWidth} 0 L${window.innerWidth} ${window.innerHeight} Q${window.innerWidth / 2} ${window.innerHeight} 0 ${window.innerHeight} Z`
    : "";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-screen z-[99999] select-none pointer-events-auto overflow-hidden bg-black flex items-center justify-center"
    >
      {/* SVG Background Overlay Curtain */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none fill-black"
      >
        <path ref={pathRef} d={initialD} />
      </svg>

      {/* Center Calm & Minimalist Apple Hello Effect */}
      <div ref={textRef} className="relative z-10 flex items-center justify-center p-4 w-full max-w-lg">
        <AppleHelloEnglishEffect
          speed={0.9}
          className="w-full h-16 sm:h-20 md:h-24 text-white"
          style={{
            filter: "drop-shadow(0 0 12px rgba(255, 255, 255, 0.75)) drop-shadow(0 0 24px rgba(255, 255, 255, 0.25))",
          }}
          onAnimationComplete={() => {
            setTimeout(triggerOpeningAnimation, 150);
          }}
        />
      </div>
    </div>
  );
};

export default Loader;