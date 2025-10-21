import React, { useRef, useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Timeline = ({ data }) => {
  const { isDark } = useTheme();
  const timelineRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);

  // Refs for GSAP animations
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const timelineItemsRef = useRef([]);
  const scrollLineRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      setLineHeight(rect.height);
    }
  }, []);

  // Ensure line height updates on resize / content changes
  useEffect(() => {
    if (!timelineRef.current) return;
    const ro = new ResizeObserver(() => {
      const rect = timelineRef.current.getBoundingClientRect();
      setLineHeight(Math.ceil(rect.height));
      // refresh ScrollTrigger because size/positions changed
      ScrollTrigger.refresh();
    });
    ro.observe(timelineRef.current);

    // also update once after a short delay for images/font load
    const t = setTimeout(() => {
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        setLineHeight(Math.ceil(rect.height));
        ScrollTrigger.refresh();
      }
    }, 300);

    return () => {
      ro.disconnect();
      clearTimeout(t);
    };
  }, [data]);

  // GSAP animations
  useEffect(() => {
    // Check if all refs are available before creating animations
    if (!scrollContainerRef.current || !headingRef.current || !descriptionRef.current || !timelineRef.current || !scrollLineRef.current) {
      return;
    }

    // Capture card refs for cleanup
    const cardRefsForCleanup = cardRefs.current;

    // kill any previous triggers/animations attached to these elements to avoid duplicates
    ScrollTrigger.getAll().forEach(st => {
      // optional: keep other triggers, but remove ones tied to this timelineRef
      if (st.vars && st.trigger === timelineRef.current) st.kill();
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Heading animations
    tl.fromTo(headingRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.25 }
    )
    .fromTo(descriptionRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.25 },
      "-=0.15"
    );

    // Timeline items stagger animation
    if (timelineItemsRef.current && timelineItemsRef.current.length > 0) {
      gsap.fromTo(timelineItemsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Individual card glow animations on scroll
    if (cardRefs.current && cardRefs.current.length > 0) {
      const currentCardRefs = cardRefs.current;
      currentCardRefs.forEach((cardRef) => {
        if (cardRef) {
          ScrollTrigger.create({
            trigger: cardRef,
            start: "top 80%",
            end: "bottom 20%",
            onEnter: () => {
              cardRef.classList.add('scroll-glow');
            },
            onLeave: () => {
              cardRef.classList.remove('scroll-glow');
            },
            onEnterBack: () => {
              cardRef.classList.add('scroll-glow');
            },
            onLeaveBack: () => {
              cardRef.classList.remove('scroll-glow');
            }
          });
        }
      });
    }

    // Scroll line animation - ensure transformOrigin and scrub so it grows smoothly
    // set initial state
    // ensure the element is visually collapsed before the animation starts
    gsap.set(scrollLineRef.current, { transformOrigin: "top center", scaleY: 0, willChange: "transform" });

    const lineAnim = gsap.to(scrollLineRef.current, {
      scaleY: 1,
      ease: "none",
      // use scrub: true so the line growth is tied 1:1 to scroll (slower & smooth)
      scrollTrigger: {
        trigger: timelineRef.current,
        // start earlier, end later to stretch the animation across more scroll distance
        start: "top 95%",
        end: "bottom 10%",
        scrub: true,
        // markers: true, // enable to debug if needed
      }
    });

    // Cleanup
    return () => {
      if (tl) {
        tl.kill();
      }
      if (lineAnim) {
        lineAnim.kill();
      }
      // Clean up individual card ScrollTriggers
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars && cardRefsForCleanup.some(cardRef => cardRef === st.trigger)) {
          st.kill();
        }
      });
      
      // Remove glow classes from cards
      cardRefsForCleanup.forEach(cardRef => {
        if (cardRef) {
          cardRef.classList.remove('scroll-glow');
        }
      });
    };
  }, [data, lineHeight]);

  return (
    <div ref={scrollContainerRef} className="w-full relative overflow-hidden">
      {/* Heading */}
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10 relative z-10">
        <h2
          ref={headingRef}
          className={`text-2xl md:text-4xl font-bold mb-4 ${
            isDark
              ? "bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-400"
              : "text-gray-800"
          }`}
        >
          Journey Through Time
        </h2>
        <p
          ref={descriptionRef}
          className={`text-sm md:text-base max-w-xl font-figtree ${
            isDark ? "text-neutral-400" : "text-gray-600"
          }`}
        >
          A chronicle of my professional evolution and key milestones.
        </p>
      </div>

      {/* Timeline Entries */}
      <div ref={timelineRef} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            ref={el => timelineItemsRef.current[index] = el}
            className="flex justify-start pt-8 md:pt-32 lg:pt-40 md:gap-8 lg:gap-10"
          >
            {/* Dot & Sticky Title */}
            <div className="sticky top-12 md:top-20 z-40 self-start flex flex-col md:flex-row items-center max-w-xs lg:max-w-sm md:w-full">
              <div className="relative h-8 w-8 md:h-10 md:w-10">
                <div className={`absolute left-0 md:left-3 w-8 h-8 md:w-10 md:h-10 rounded-full ${
                  isDark
                    ? "bg-gradient-to-br from-blue-900/80 to-cyan-900/80 border border-blue-500/50"
                    : "bg-white border border-blue-300 shadow-md"
                } flex items-center justify-center`}>
                  <div className={`h-3 w-3 md:h-4 md:w-4 p-1.5 md:p-2 rounded-full ${
                    isDark
                      ? "bg-gradient-to-br from-blue-400 to-cyan-400 border border-blue-300"
                      : "bg-gradient-to-br from-blue-500 to-cyan-500 border border-blue-400"
                  }`} />
                </div>
              </div>
              <h3 className={`hidden md:block text-base md:text-xl lg:text-3xl md:pl-12 lg:pl-16 font-bold text-white ${
                isDark
                  ? "text-white"
                  : "text-gray-800"
              }`}>
                {item.title}
              </h3>
            </div>

            {/* Content */}
            <div className="relative w-full pl-12 md:pl-4 pr-4">
              <h3 className={`md:hidden block text-lg sm:text-xl mb-3 text-left font-bold text-white ${
                isDark
                  ? "text-white"
                  : "text-gray-800"
              }`}>
                {item.title}
              </h3>
              <div 
                ref={el => cardRefs.current[index] = el}
                className={`experience-card-glow ${
                  isDark 
                    ? "bg-white/2 backdrop-blur-xl border border-white/8" 
                    : "bg-white/10 backdrop-blur-xl border border-white/20"
                }`}
              >
                <div className="experience-card-content">
                  <div className={`prose font-figtree ${
                    isDark ? "prose-invert text-neutral-300" : "text-gray-600"
                  }`}>{item.content}</div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Scroll Line */}
        <div
          ref={scrollLineRef}
          className={`absolute left-4 md:left-8 top-0 w-[2px] ${
            isDark
              ? "bg-gradient-to-b from-transparent via-blue-800/30 to-transparent"
              : "bg-gradient-to-b from-transparent via-blue-200 to-transparent"
          }`}
          style={{ height: `${lineHeight}px`, transformOrigin: "top center" }}
        >
          <div
            className={`absolute inset-x-0 top-0 rounded-full ${
              isDark
                ? "bg-gradient-to-b from-blue-400 via-cyan-400 to-transparent"
                : "bg-gradient-to-b from-blue-500 via-cyan-500 to-transparent"
            }`}
            style={{ height: `${lineHeight}px` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;