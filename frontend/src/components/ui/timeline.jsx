import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useTheme } from "./ThemeContext";

const Timeline = ({ data }) => {
  const { isDark } = useTheme();
  const timelineRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      setLineHeight(rect.height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start 10%", "end 50%"],
  });

  const animatedLineHeight = useTransform(scrollYProgress, [0, 1], [0, lineHeight]);
  const animatedOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={scrollContainerRef} className="w-full relative overflow-hidden">
      {/* Heading */}
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`text-2xl md:text-4xl font-bold mb-4 ${
            isDark
              ? "text-white bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-400"
              : "text-gray-800"
          }`}
        >
          Journey Through Time
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`text-sm md:text-base max-w-xl font-figtree ${
            isDark ? "text-neutral-400" : "text-gray-600"
          }`}
        >
          A chronicle of my professional evolution and key milestones.
        </motion.p>
      </div>

      {/* Timeline Entries */}
      <div ref={timelineRef} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
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
          </motion.div>
        ))}

        {/* Scroll Line */}
        <div
          className={`absolute left-8 top-0 w-[2px] ${
            isDark
              ? "bg-gradient-to-b from-transparent via-neutral-800 to-transparent"
              : "bg-gradient-to-b from-transparent via-gray-300 to-transparent"
          }`}
          style={{ height: `${lineHeight}px` }}
        >
          <motion.div
            style={{ height: animatedLineHeight, opacity: animatedOpacity }}
            className={`absolute inset-x-0 top-0 ${
              isDark
                ? "bg-gradient-to-b from-blue-500 via-purple-500 to-transparent"
                : "bg-gradient-to-b from-blue-400 via-purple-400 to-transparent"
            } rounded-full`}
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
