import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useTheme } from './ui/ThemeContext';

const ProjectCard = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);
  const { isDark } = useTheme();

  const checkTextOverflow = (e) => {
    if (e) {
      const hasOverflow = e.scrollHeight > e.clientHeight;
      setNeedsExpansion(hasOverflow);
    }
  };

  return (
    <motion.div
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="h-full group"
    >
      <div className={`relative h-full flex flex-col backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-300 shadow-lg group-hover:shadow-2xl ${
          isDark 
            ? "bg-[#111827]/80 border border-white/10 group-hover:border-blue-500/30" 
            : "bg-white/95 border border-gray-100 group-hover:border-blue-400/30"
        }`}
      >
        {/* Decorative Top Gradient Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

        {/* Project Image */}
        <div className="relative h-56 w-full overflow-hidden">
          {/* Overlay gradient inside image container for a seamless look */}
          <div className={`absolute inset-0 z-10 transition-opacity duration-300 ${isDark ? "bg-gradient-to-t from-[#111827]/90 via-transparent to-transparent" : "bg-gradient-to-t from-white/90 via-transparent to-transparent"}`} />
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Status Badge */}
          {project.status && (
            <div className="absolute top-4 right-4 z-20">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-md ${
                isDark 
                  ? "bg-black/40 text-blue-300 border border-blue-500/30" 
                  : "bg-white/70 text-blue-600 border border-blue-200"
              }`}>
                {project.status}
              </span>
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="flex-1 flex flex-col p-6 z-20 -mt-8 relative">
          <h3 className={`text-2xl font-bold mb-3 line-clamp-1 transition-colors duration-300 ${
            isDark ? "text-white group-hover:text-blue-400" : "text-gray-800 group-hover:text-blue-600"
          }`}>
            {project.title}
          </h3>
          
          <div className="relative mb-5 flex-1">
            <p 
              ref={checkTextOverflow}
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

          {/* Tech Stack */}
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

          {/* Action Buttons */}
          <div className={`flex justify-between items-center mt-auto pt-5 border-t ${
            isDark ? "border-white/10" : "border-gray-100"
          }`}>
            <div className="flex space-x-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-1 ${
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
                className={`p-2.5 rounded-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-1 ${
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
              <span className={`text-xs font-mono font-medium opacity-60 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}>
                {project.tech.length} Techs utilized
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;