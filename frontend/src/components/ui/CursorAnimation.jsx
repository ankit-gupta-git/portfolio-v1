import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CursorAnimation = () => {
  const cursorRef = useRef(null);
  const cursorTrailRef = useRef(null);
  const cursorGlowRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorTrail = cursorTrailRef.current;
    const cursorGlow = cursorGlowRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let trailX = 0;
    let trailY = 0;
    let glowX = 0;
    let glowY = 0;

    let lastMouseX = 0;
    let lastMouseY = 0;
    let isMoving = false;
    let hideTimeout = null;

    // Show/hide helpers
    const showCursor = () => {
      if (cursor) cursor.style.opacity = 1;
      if (cursorTrail) cursorTrail.style.opacity = 1;
      if (cursorGlow) cursorGlow.style.opacity = 0.4;
    };
    const hideCursor = () => {
      if (cursor) cursor.style.opacity = 0;
      if (cursorTrail) cursorTrail.style.opacity = 0;
      if (cursorGlow) cursorGlow.style.opacity = 0;
    };

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMoving) {
        isMoving = true;
        showCursor();
      }
      if (hideTimeout) clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        isMoving = false;
        hideCursor();
      }, 200);
    };

    // Animation loop
    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.08;
      cursorY += (mouseY - cursorY) * 0.08;
      trailX += (cursorX - trailX) * 0.12;
      trailY += (cursorY - trailY) * 0.12;
      glowX += (trailX - glowX) * 0.06;
      glowY += (trailY - glowY) * 0.06;
      if (cursor) {
        gsap.set(cursor, {
          x: cursorX - 25,
          y: cursorY - 25,
        });
      }
      if (cursorTrail) {
        gsap.set(cursorTrail, {
          x: trailX - 20,
          y: trailY - 20,
        });
      }
      if (cursorGlow) {
        gsap.set(cursorGlow, {
          x: glowX - 30,
          y: glowY - 30,
        });
      }
      requestAnimationFrame(animateCursor);
    };

    // Hover effects for interactive elements
    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 2,
        duration: 0.4,
        ease: "elastic.out(1, 0.3)",
      });
      gsap.to(cursorTrail, {
        scale: 1.5,
        duration: 0.4,
        ease: "elastic.out(1, 0.3)",
      });
      gsap.to(cursorGlow, {
        scale: 1.8,
        opacity: 0.8,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.4,
        ease: "elastic.out(1, 0.3)",
      });
      gsap.to(cursorTrail, {
        scale: 1,
        duration: 0.4,
        ease: "elastic.out(1, 0.3)",
      });
      gsap.to(cursorGlow, {
        scale: 1,
        opacity: 0.4,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, [role='button'], .cursor-hover"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Start animation
    animateCursor();
    // Hide cursor initially
    hideCursor();
    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <>
      {/* Cursor glow */}
      <div
        ref={cursorGlowRef}
        className="fixed top-0 left-0 w-16 h-16 pointer-events-none z-[9997]"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.2) 30%, rgba(236, 72, 153, 0.1) 60%, transparent 100%)",
          borderRadius: "50%",
          filter: "blur(8px)",
          transform: "translate(-50%, -50%)",
          opacity: 0.4,
        }}
      />

      {/* Cursor trail */}
      <div
        ref={cursorTrailRef}
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9998]"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(147, 51, 234, 0.4) 50%, rgba(236, 72, 153, 0.2) 80%, transparent 100%)",
          borderRadius: "50%",
          filter: "blur(3px)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Main cursor blob */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9999]"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.9) 0%, rgba(147, 51, 234, 0.7) 40%, rgba(236, 72, 153, 0.5) 70%, rgba(255, 255, 255, 0.3) 100%)",
          borderRadius: "50%",
          filter: "blur(1px)",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(147, 51, 234, 0.3), 0 0 60px rgba(236, 72, 153, 0.2)",
        }}
      />
    </>
  );
};

export default CursorAnimation; 