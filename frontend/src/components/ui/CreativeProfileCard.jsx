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
      x: (y / (rect.height / 2)) * -10,
      y: (x / (rect.width / 2)) * 10,
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
      className="relative flex items-center justify-center p-4 select-none"
      style={{ perspective: 1000 }}
    >
      {/* Ambient Soft Glow Aura Background */}
      <div
        className={`absolute w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full blur-[70px] pointer-events-none transition-all duration-700 ${
          isDark
            ? "bg-gradient-to-tr from-blue-600/30 via-indigo-500/25 to-purple-600/30"
            : "bg-gradient-to-tr from-cyan-400/30 via-blue-400/25 to-indigo-300/25"
        }`}
      />

      {/* Main Minimalist Profile Card */}
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`relative z-10 w-64 h-72 sm:w-72 sm:h-80 md:w-80 md:h-96 rounded-[2.2rem] p-2 transition-all duration-300 shadow-2xl backdrop-blur-xl ${
          isDark
            ? "bg-gradient-to-b from-white/10 via-white/5 to-white/0 border border-white/15 shadow-black/60"
            : "bg-gradient-to-b from-white/90 via-white/60 to-white/30 border border-slate-200/90 shadow-blue-500/5"
        }`}
      >
        {/* Inner Portrait Wrapper */}
        <div className="w-full h-full rounded-[1.8rem] overflow-hidden relative group">
          <img
            src={profileImgUrl}
            alt="Ankit Gupta"
            className="w-full h-full object-cover pointer-events-none select-none transition-transform duration-700 ease-out group-hover:scale-105"
            width={320}
            height={384}
          />

          {/* Ultra-subtle bottom gradient overlay for depth */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
              isDark
                ? "bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                : "bg-gradient-to-t from-slate-950/50 via-slate-900/5 to-transparent"
            }`}
          />

          {/* Minimalist Top Status Pill */}
          <div className="absolute top-3 left-3 z-20">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border flex items-center gap-2 shadow-lg transition-all duration-300 ${
                isDark
                  ? "bg-black/50 border-white/20 text-gray-200"
                  : "bg-white/80 border-slate-200 text-slate-800"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span className="tracking-tight text-[11px] sm:text-xs font-medium">Available for roles</span>
            </motion.div>
          </div>

          {/* Minimalist Bottom Tech Badge Bar */}
          <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between gap-2">
            <div
              className={`px-3 py-1.5 rounded-2xl text-xs font-medium backdrop-blur-md border flex items-center gap-1.5 shadow-lg ${
                isDark
                  ? "bg-black/50 border-white/20 text-gray-200"
                  : "bg-white/80 border-slate-200 text-slate-800"
              }`}
            >
              <RiSparklingFill className="text-amber-400 text-xs" />
              <span className="text-[11px] font-mono tracking-tight">MERN + GenAI</span>
            </div>

            {/* Micro Tech Icons */}
            <div
              className={`px-2.5 py-1.5 rounded-2xl text-xs backdrop-blur-md border flex items-center gap-2.5 shadow-lg ${
                isDark
                  ? "bg-black/50 border-white/20 text-gray-300"
                  : "bg-white/80 border-slate-200 text-slate-700"
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
