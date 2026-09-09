import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { RiSparklingFill } from "react-icons/ri";
import { SiReact, SiNodedotjs, SiMongodb } from "react-icons/si";

const profileImgUrl = "https://ik.imagekit.io/zlbgvcgef/portfolio-v1/myimg.webp";

export const CreativeProfileCard = ({ isDark }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Smooth subtle mouse parallax tilt
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setTilt({
      x: (y / (rect.height / 2)) * -8,
      y: (x / (rect.width / 2)) * 8,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center p-2 sm:p-4 select-none"
      style={{ perspective: 1000 }}
    >
      {/* Ambient Soft Glow Aura Background */}
      <div
        className={`absolute w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full blur-[80px] pointer-events-none transition-all duration-700 ${
          isDark
            ? "bg-gradient-to-tr from-blue-500/25 via-indigo-500/20 to-purple-500/20"
            : "bg-gradient-to-tr from-cyan-300/30 via-blue-300/20 to-indigo-200/25"
        }`}
      />

      {/* Main Minimalist Profile Card */}
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`relative z-10 w-64 h-72 sm:w-72 sm:h-80 md:w-80 md:h-96 rounded-[2rem] p-1.5 transition-all duration-300 shadow-xl ${
          isDark
            ? "bg-slate-900/60 border border-white/10 shadow-black/40 backdrop-blur-xl"
            : "bg-white/80 border border-slate-200/80 shadow-slate-300/50 backdrop-blur-xl"
        }`}
      >
        {/* Inner Portrait Wrapper */}
        <div className="w-full h-full rounded-[1.7rem] overflow-hidden relative group bg-slate-900/10">
          <img
            src={profileImgUrl}
            alt="Ankit Gupta"
            className="w-full h-full object-cover object-center pointer-events-none select-none transition-transform duration-700 ease-out group-hover:scale-105"
            width={320}
            height={384}
          />

          {/* Clean minimal lighting overlay - no heavy dark gradient */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
              isDark
                ? "bg-gradient-to-t from-black/35 via-transparent to-transparent"
                : "bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"
            }`}
          />

          {/* Minimalist Top Status Pill */}
          <div className="absolute top-3 left-3 z-20">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border flex items-center gap-2 shadow-md transition-all duration-300 ${
                isDark
                  ? "bg-slate-950/60 border-white/15 text-slate-100"
                  : "bg-white/90 border-slate-200 text-slate-800"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span className="tracking-tight text-[11px] sm:text-xs font-medium">Available for roles</span>
            </motion.div>
          </div>

          {/* Minimalist Bottom Tech Badge Bar */}
          <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between gap-2">
            <div
              className={`px-3 py-1.5 rounded-xl text-xs font-medium backdrop-blur-md border flex items-center gap-1.5 shadow-md ${
                isDark
                  ? "bg-slate-950/60 border-white/15 text-slate-100"
                  : "bg-white/90 border-slate-200 text-slate-800"
              }`}
            >
              <RiSparklingFill className="text-amber-400 text-xs" />
              <span className="text-[11px] font-mono tracking-tight font-medium">MERN + GenAI</span>
            </div>

            {/* Micro Tech Icons */}
            <div
              className={`px-2.5 py-1.5 rounded-xl text-xs backdrop-blur-md border flex items-center gap-2.5 shadow-md ${
                isDark
                  ? "bg-slate-950/60 border-white/15 text-slate-200"
                  : "bg-white/90 border-slate-200 text-slate-700"
              }`}
            >
              <SiReact className="hover:text-cyan-400 transition-colors text-xs" title="React" />
              <SiNodedotjs className="hover:text-emerald-400 transition-colors text-xs" title="Node.js" />
              <SiMongodb className="hover:text-green-500 transition-colors text-xs" title="MongoDB" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreativeProfileCard;
