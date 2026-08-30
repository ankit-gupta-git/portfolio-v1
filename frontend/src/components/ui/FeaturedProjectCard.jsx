import React from "react";
import { FaGithub } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { LuCpu, LuLayers, LuDatabase, LuSparkles } from "react-icons/lu";

export const FeaturedProjectCard = ({ project, isDark }) => {
  const defaultArchitecture = [
    {
      title: "Agentic Generation",
      description: "Multi-file React & Next.js synthesis",
      icon: LuSparkles,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      title: "Gemini 3.5 Engine",
      description: "Automated reasoning & bug fixing",
      icon: LuCpu,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    },
    {
      title: "Live Sandbox Preview",
      description: "Instant in-browser execution environment",
      icon: LuLayers,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "Prisma & Supabase",
      description: "PostgreSQL DB & Clerk authentication",
      icon: LuDatabase,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  const architecture = project.architecture || defaultArchitecture;

  return (
    <div
      className={`relative w-full rounded-[2rem] p-6 sm:p-8 md:p-10 border transition-all duration-500 shadow-2xl backdrop-blur-xl mb-14 ${
        isDark
          ? "bg-[#0b0f17]/90 border-white/10 hover:border-blue-500/30 shadow-blue-950/20"
          : "bg-white/90 border-slate-200/90 hover:border-blue-300 shadow-blue-500/5"
      }`}
    >
      {/* Ambient background glow */}
      <div
        className={`absolute top-1/4 -right-10 w-96 h-96 rounded-full blur-[100px] pointer-events-none ${
          isDark ? "bg-blue-600/15" : "bg-blue-400/10"
        }`}
      />

      {/* Featured Header Title */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h3
          className={`text-3xl sm:text-4xl md:text-5xl font-bold font-dxgrafik mb-3 ${
            isDark
              ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-gray-400"
              : "text-slate-900"
          }`}
        >
          {project.title.split("–")[0].trim()}
        </h3>
        <p
          className={`text-sm sm:text-base leading-relaxed ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {project.description}
        </p>
      </div>

      {/* Two-Column Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* LEFT: Browser Window Mockup Frame */}
        <div className="lg:col-span-7 group relative">
          <div
            className={`rounded-2xl overflow-hidden border shadow-2xl transition-all duration-500 ${
              isDark
                ? "bg-slate-950 border-white/10 group-hover:border-blue-500/40"
                : "bg-slate-900 border-slate-300 group-hover:border-blue-400"
            }`}
          >
            {/* Mockup Browser Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              </div>
              <div className="px-4 py-1 rounded-md bg-black/40 text-gray-400 text-xs font-mono border border-white/5 truncate max-w-[200px] sm:max-w-[280px]">
                {project.live ? project.live.replace("https://", "").replace(/\/$/, "") : "app-preview.live"}
              </div>
              <div className="w-10" />
            </div>

            {/* Live Screenshot Viewport */}
            <div className="relative aspect-video overflow-hidden bg-slate-950">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Status Chips Overlay */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur-md border ${
                    isDark
                      ? "bg-black/70 text-gray-200 border-white/20"
                      : "bg-black/70 text-white border-white/20"
                  }`}
                >
                  {project.status || "Fullstack"}
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full backdrop-blur-md border bg-emerald-950/70 border-emerald-500/40 text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Architecture Feature Cards & Action CTA Buttons */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
          {/* 4 Feature Architecture Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {architecture.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                    isDark
                      ? "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]"
                      : "bg-slate-50 border-slate-200/90 hover:border-slate-300 hover:bg-slate-100/80"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className={`p-2 rounded-lg border ${item.color}`}>
                      <Icon className="text-base" />
                    </div>
                    <h4
                      className={`text-sm font-bold tracking-tight ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {item.title}
                    </h4>
                  </div>
                  <p
                    className={`text-xs leading-relaxed ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Prominent Action CTA Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 min-w-[140px] py-3 px-5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${
                isDark
                  ? "bg-white hover:bg-gray-100 text-slate-950 shadow-white/10 hover:shadow-white/20"
                  : "bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20"
              }`}
            >
              <span>Live Demo</span>
              <FiArrowUpRight className="text-lg" />
            </a>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 min-w-[140px] py-3 px-5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border transition-all duration-300 ${
                isDark
                  ? "bg-white/5 hover:bg-white/10 text-white border-white/15"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"
              }`}
            >
              <FaGithub className="text-lg" />
              <span>Source</span>
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM: Tech Stack Badges Row */}
      <div
        className={`mt-8 pt-6 border-t flex flex-wrap items-center gap-2 ${
          isDark ? "border-white/10" : "border-slate-200"
        }`}
      >
        <span
          className={`text-xs font-mono uppercase tracking-wider font-semibold mr-2 ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Tech Stack:
        </span>
        {project.tech.map((tech, idx) => (
          <span
            key={idx}
            className={`text-xs font-medium px-3 py-1 rounded-lg border transition-colors ${
              isDark
                ? "bg-white/5 text-gray-300 border-white/10 hover:border-blue-400/40"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:border-blue-400"
            }`}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProjectCard;
