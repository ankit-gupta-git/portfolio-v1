import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);

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
      className="h-full"
    >
      <div className="
        relative h-full flex flex-col 
        bg-gradient-to-br from-gray-50 to-white 
        dark:from-gray-900/80 dark:to-black/80 
        backdrop-blur-md 
        border border-gray-200 dark:border-white/10 
        rounded-2xl overflow-hidden 
        shadow-lg hover:shadow-xl transition-all duration-300
      ">
        {/* Project Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Project Content */}
        <div className="flex-1 flex flex-col p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-1">
            {project.title}
          </h3>
          
          <div className="relative">
            <p 
              ref={checkTextOverflow}
              className={`text-gray-700 dark:text-gray-300 text-sm mb-1 ${isExpanded ? '' : 'line-clamp-2'} transition-all duration-300`}
            >
              {project.description}
            </p>
            {needsExpansion && (
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-xs font-medium hover:underline focus:outline-none transition-colors"
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>

          {/* Tech Stack – improved light mode look */}
          <div className="flex flex-wrap gap-2 mb-4 mt-3">
            {project.tech.map((tech, idx) => (
              <span
                key={idx}
                className="
                  text-xs font-medium 
                  bg-gray-100/90 text-gray-800 
                  dark:bg-white/10 dark:text-gray-200 
                  px-3 py-1.5 rounded-full 
                  border border-gray-200/70 dark:border-white/5
                "
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons – cleaner light mode */}
          <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200 dark:border-white/10">
            <div className="flex space-x-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  p-2.5 rounded-xl 
                  bg-gray-100/80 hover:bg-gray-200/80 
                  dark:bg-white/10 dark:hover:bg-white/20 
                  transition-all duration-300 shadow-sm hover:shadow
                "
                aria-label="GitHub Repository"
              >
                <FaGithub className="w-4 h-4 text-gray-700 dark:text-white" />
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  p-2.5 rounded-xl 
                  bg-gray-100/80 hover:bg-gray-200/80 
                  dark:bg-white/10 dark:hover:bg-white/20 
                  transition-all duration-300 shadow-sm hover:shadow
                "
                aria-label="Live Demo"
              >
                <FaExternalLinkAlt className="w-4 h-4 text-gray-700 dark:text-white" />
              </a>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              {project.tech[0]} • {project.tech[1]}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;