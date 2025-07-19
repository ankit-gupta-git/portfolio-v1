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

  useEffect(() => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      setLineHeight(rect.height);
    }
  }, []);

  // GSAP animations
  useEffect(() => {
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

    // Scroll line animation
    gsap.fromTo(scrollLineRef.current,
      { scaleY: 0, transformOrigin: "top" },
      {
        scaleY: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Cleanup
    return () => {
      tl.kill();
    };
  }, [data]);

  return (
    <div ref={scrollContainerRef} className="w-full relative overflow-hidden">
      {/* Heading */}
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10 relative z-10">
        <h2
          ref={headingRef}
          className={`text-2xl md:text-4xl font-bold mb-4 ${
            isDark
              ? "text-white bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-400"
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
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            {/* Dot & Sticky Title */}
            <div className="sticky top-20 z-40 self-start flex flex-col md:flex-row items-center max-w-xs lg:max-w-sm md:w-full">
              <div className="relative h-10 w-10">
                <div className={`absolute left-3 w-10 h-10 rounded-full ${
                  isDark
                    ? "bg-neutral-950 border border-neutral-800"
                    : "bg-white border border-gray-200 shadow-md"
                } flex items-center justify-center`}>
                  <div className={`h-4 w-4 p-2 rounded-full ${
                    isDark
                      ? "bg-blue-500/50 border border-blue-500"
                      : "bg-blue-400 border border-blue-500"
                  }`} />
                </div>
              </div>
              <h3 className={`hidden md:block text-xl md:pl-20 md:text-4xl font-bold bg-clip-text text-transparent ${
                isDark
                  ? "bg-gradient-to-r from-blue-500/50 to-purple-500/50"
                  : "bg-gradient-to-r from-blue-600 to-purple-600"
              }`}>
                {item.title}
              </h3>
            </div>

            {/* Content */}
            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <h3 className={`md:hidden block text-2xl mb-4 text-left font-bold bg-clip-text text-transparent ${
                isDark
                  ? "bg-gradient-to-r from-blue-500/50 to-purple-500/50"
                  : "bg-gradient-to-r from-blue-600 to-purple-600"
              }`}>
                {item.title}
              </h3>
              <div className={`prose font-figtree ${
                isDark ? "prose-invert text-neutral-300" : "text-gray-600"
              }`}>{item.content}</div>
            </div>
          </div>
        ))}

        {/* Scroll Line */}
        <div
          ref={scrollLineRef}
          className={`absolute left-8 top-0 w-[2px] ${
            isDark
              ? "bg-gradient-to-b from-transparent via-neutral-800 to-transparent"
              : "bg-gradient-to-b from-transparent via-gray-300 to-transparent"
          }`}
          style={{ height: `${lineHeight}px` }}
        >
          <div
            className={`absolute inset-x-0 top-0 ${
              isDark
                ? "bg-gradient-to-b from-blue-500 via-purple-500 to-transparent"
                : "bg-gradient-to-b from-blue-400 via-purple-400 to-transparent"
            } rounded-full`}
            style={{ height: `${lineHeight}px` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
