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
      <div className="relative h-full flex flex-col bg-black bg-opacity-30 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
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
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
            {project.title}
          </h3>
          <div className="relative">
            <p 
              ref={checkTextOverflow}
              className={`text-gray-300 text-sm mb-1 ${isExpanded ? '' : 'line-clamp-2'} transition-all duration-300`}
            >
              {project.description}
            </p>
            {needsExpansion && (
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-400 text-xs hover:underline focus:outline-none"
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>
 
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4 mt-2">
            {project.tech.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs bg-white/10 text-gray-200 px-2.5 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
 
          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
            <div className="flex space-x-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="GitHub Repository"
              >
                <FaGithub className="w-4 h-4 text-white" />
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Live Demo"
              >
                <FaExternalLinkAlt className="w-4 h-4 text-white" />
              </a>
            </div>
            <span className="text-xs text-gray-400">
              {project.tech[0]} • {project.tech[1]}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
 
export default ProjectCard;