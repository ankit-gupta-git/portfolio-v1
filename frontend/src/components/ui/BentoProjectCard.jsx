import React from "react";
import { FaGithub } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

export const BentoProjectCard = ({ project, isDark, className = "" }) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border transition-all duration-500 hover:shadow-2xl flex flex-col justify-between p-6 sm:p-7 min-h-[340px] ${
        isDark
          ? "bg-[#0c1017] border-white/15 hover:border-blue-500/50 shadow-black/60"
          : "bg-white border-slate-200/90 hover:border-blue-400 shadow-slate-200/60"
      } ${className}`}
    >
      {/* Background Screenshot with Visible Preview & Balanced Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-105 ${
            isDark
              ? "opacity-65 group-hover:opacity-80"
              : "opacity-60 group-hover:opacity-80"
          }`}
        />
        {/* Gradient Mask to ensure great image visibility while keeping text crisp */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
            isDark
              ? "bg-gradient-to-t from-[#0c1017] via-[#0c1017]/75 to-[#0c1017]/30"
              : "bg-gradient-to-t from-white via-white/80 to-white/35"
          }`}
        />
      </div>

      {/* TOP HEADER: Status Badges & Quick Action Links */}
      <div className="relative z-10 flex items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur-md border ${
              isDark
                ? "bg-black/70 text-gray-200 border-white/20"
                : "bg-white/90 text-slate-800 border-slate-300"
            }`}
          >
            {project.status || "Fullstack"}
          </span>

          <span className="px-2.5 py-1 text-xs font-medium rounded-full backdrop-blur-md border bg-emerald-950/80 border-emerald-500/50 text-emerald-400 flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
            Live
          </span>
        </div>

        {/* Top-Right Action Link Buttons */}
        <div className="flex items-center gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 shadow-md ${
                isDark
                  ? "bg-black/70 text-gray-200 border-white/20 hover:bg-white hover:text-black hover:border-white"
                  : "bg-white/90 text-slate-800 border-slate-300 hover:bg-slate-900 hover:text-white"
              }`}
              aria-label="GitHub Source"
            >
              <FaGithub className="text-base" />
            </a>
          )}

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 shadow-md ${
                isDark
                  ? "bg-black/70 text-gray-200 border-white/20 hover:bg-blue-600 hover:text-white hover:border-blue-500"
                  : "bg-white/90 text-slate-800 border-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-500"
              }`}
              aria-label="Live Demo"
            >
              <FiArrowUpRight className="text-lg" />
            </a>
          )}
        </div>
      </div>

      {/* MIDDLE: Title & Description with Shadow for Readability */}
      <div className="relative z-10 my-auto drop-shadow-sm">
        <h3
          className={`text-xl sm:text-2xl font-bold font-dxgrafik mb-2 tracking-tight transition-colors duration-300 ${
            isDark ? "text-white group-hover:text-blue-400" : "text-slate-950 group-hover:text-blue-600"
          }`}
        >
          {project.title.split("–")[0].trim()}
        </h3>
        <p
          className={`text-xs sm:text-sm leading-relaxed line-clamp-3 font-medium ${
            isDark ? "text-gray-200" : "text-slate-700"
          }`}
        >
          {project.description}
        </p>
      </div>

      {/* BOTTOM: Tech Stack Tags */}
      <div className="relative z-10 mt-6 pt-4 border-t flex flex-wrap gap-1.5 border-white/15">
        {project.tech.map((tech, idx) => (
          <span
            key={idx}
            className={`text-[11px] font-medium px-2.5 py-1 rounded-md border backdrop-blur-md transition-colors ${
              isDark
                ? "bg-black/60 text-gray-200 border-white/15 group-hover:border-white/25"
                : "bg-white/80 text-slate-800 border-slate-300 group-hover:border-slate-400"
            }`}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BentoProjectCard;
