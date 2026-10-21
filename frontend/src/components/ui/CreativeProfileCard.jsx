import React from "react";

const profileImgUrl = "https://ik.imagekit.io/zlbgvcgef/portfolio-v1/myprofile.png";

export const CreativeProfileCard = ({ isDark }) => {
  return (
    <div
      className="relative flex items-center justify-center select-none w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[440px] aspect-square p-4 sm:p-6"
    >
      {/* Soft Ambient Radial Aura Glow */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 rounded-full blur-[75px] sm:blur-[90px] pointer-events-none transition-colors duration-700 ${
          isDark
            ? "bg-gradient-to-tr from-blue-600/30 via-indigo-600/25 to-purple-600/20"
            : "bg-gradient-to-tr from-cyan-400/30 via-blue-300/30 to-indigo-300/25"
        }`}
      />

      {/* Main Circular Avatar Vessel - 100% STILL, NO ROTATION */}
      <div
        className="relative z-10 w-[82%] h-[82%] flex items-center justify-center pointer-events-none"
      >
        {/* Outer Dashed Orbit Ring - STILL with Radiant Glow */}
        <div
          aria-hidden="true"
          className={`absolute -inset-2.5 sm:-inset-3.5 rounded-full border-2 border-dashed pointer-events-none transition-colors duration-500 ${
            isDark
              ? "border-blue-400/70 shadow-[0_0_16px_rgba(56,189,248,0.5)] [filter:drop-shadow(0_0_6px_rgba(56,189,248,0.6))]"
              : "border-[#159ccb]/75 shadow-[0_0_12px_rgba(21,156,203,0.5)] [filter:drop-shadow(0_0_5px_rgba(21,156,203,0.6))]"
          }`}
        />

        {/* Solid / Gradient Ring Border Wrapper */}
        <div
          className={`w-full h-full rounded-full p-[3px] sm:p-[4px] transition-all duration-300 shadow-2xl ${
            isDark
              ? "bg-gradient-to-tr from-blue-500 via-indigo-500 to-cyan-400 shadow-blue-500/25"
              : "bg-gradient-to-tr from-[#159ccb] via-[#0f7a9e] to-sky-400 shadow-[#159ccb]/30"
          }`}
        >
          {/* Inner Circular Photo Container - COMPLETELY STILL */}
          <div className="w-full h-full rounded-full overflow-hidden bg-slate-900/40 relative">
            <img
              src={profileImgUrl}
              alt="Ankit Kumar Gupta"
              loading="eager"
              width={400}
              height={400}
              className="w-full h-full object-cover object-center select-none pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeProfileCard;
