import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useTheme } from './ui/ThemeContext';

const ProjectCard = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);
  const { isDark } = useTheme();

  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    if (descRef.current) {
      const hasOverflow = descRef.current.scrollHeight > descRef.current.clientHeight;
      setNeedsExpansion(hasOverflow);
    }
  }, [project.description]);

  // GSAP 3D Tilt & Radial Spotlight Effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(cardRef.current, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      ease: 'power2.out',
      duration: 0.4,
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: x,
        y: y,
        opacity: 1,
        duration: 0.2,
        ease: 'power1.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotationX: 0,
      rotationY: 0,
      ease: 'power3.out',
      duration: 0.6,
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        duration: 0.4,
      });
    }
  };

  // GSAP Magnetic Effect for Buttons
  const handleMagneticMove = (e) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;

    gsap.to(target, {
      x: x,
      y: y,
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  const handleMagneticLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  return (
    <div className="h-full group perspective-1000">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative h-full flex flex-col backdrop-blur-md rounded-2xl overflow-hidden transition-shadow duration-300 shadow-lg group-hover:shadow-2xl ${
          isDark
            ? "bg-[#111827]/80 border border-white/10 group-hover:border-blue-500/40"
            : "bg-white/95 border border-gray-100 group-hover:border-blue-400/40"
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Dynamic GSAP Radial Mouse Spotlight Follower */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-0 z-10 transition-opacity duration-300"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.05) 50%, transparent 80%)'
              : 'radial-gradient(circle, rgba(21, 156, 203, 0.12) 0%, rgba(59, 130, 246, 0.04) 50%, transparent 80%)',
          }}
        />

        {/* Decorative Top Gradient Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

        {/* Project Image */}
        <div className="relative h-56 w-full overflow-hidden">
          <div
            className={`absolute inset-0 z-10 transition-opacity duration-300 ${
              isDark
                ? "bg-gradient-to-t from-[#111827]/90 via-transparent to-transparent"
                : "bg-gradient-to-t from-white/90 via-transparent to-transparent"
            }`}
          />
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Status Badge */}
          {project.status && (
            <div className="absolute top-4 right-4 z-20">
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-md ${
                  isDark
                    ? "bg-black/50 text-blue-300 border border-blue-500/30 shadow-md"
                    : "bg-white/80 text-blue-600 border border-blue-200 shadow-sm"
                }`}
              >
                {project.status}
              </span>
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="flex-1 flex flex-col p-6 z-20 -mt-8 relative">
          <h3
            className={`text-2xl font-bold mb-3 line-clamp-1 transition-colors duration-300 ${
              isDark ? "text-white group-hover:text-blue-400" : "text-gray-800 group-hover:text-blue-600"
            }`}
          >
            {project.title}
          </h3>

          <div className="relative mb-5 flex-1">
            <p
              ref={descRef}
              className={`text-sm leading-relaxed transition-all duration-300 ${
                isDark ? "text-gray-300" : "text-gray-600"
              } ${isExpanded ? '' : 'line-clamp-3'}`}
            >
              {project.description}
            </p>
            {needsExpansion && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`mt-2 text-xs font-semibold inline-flex items-center gap-1 focus:outline-none transition-colors ${
                  isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                }`}
              >
                {isExpanded ? 'Show less' : 'Read more'}
                <span className="text-[10px]">{isExpanded ? '▲' : '▼'}</span>
              </button>
            )}
          </div>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech, idx) => (
              <span
                key={idx}
                className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                  isDark
                    ? "bg-white/5 text-gray-300 border border-white/5 group-hover:bg-white/10"
                    : "bg-gray-50 text-gray-600 border border-gray-100 group-hover:bg-gray-100"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons with GSAP Magnetic Hover */}
          <div
            className={`flex justify-between items-center mt-auto pt-5 border-t ${
              isDark ? "border-white/10" : "border-gray-100"
            }`}
          >
            <div className="flex space-x-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className={`p-2.5 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                  isDark
                    ? "bg-white/10 hover:bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-700"
                }`}
                aria-label="GitHub Repository"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className={`p-2.5 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                  isDark
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30"
                }`}
                aria-label="Live Demo"
              >
                <FaExternalLinkAlt className="w-4 h-4" />
              </a>
            </div>
            {project.tech.length > 2 && (
              <span
                className={`text-xs font-mono font-medium opacity-60 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {project.tech.length} Techs utilized
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;