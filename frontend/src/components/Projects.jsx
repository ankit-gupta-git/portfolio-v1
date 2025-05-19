import React, { useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ui/ThemeContext";

import "swiper/css";

const projects = [
  {
    title: "NAPSTER - Movie Recommendation",
    description: "AI-powered movie recommender based on user preferences and real-time trends.",
    tech: ["React", "Tailwind", "Node.js", "API"],
    github: "https://github.com/ankit-gupta-git/Napster",
    live: "https://ankit-gupta-git.github.io/Napster/",
    image: "/ProjectImg/napster.png",
  },
  {
    title: "Wanderlust - Airbnb Clone",
    description: "A full-stack rental platform with booking and listing features.",
    tech: ["MERN", "Tailwind", "JWT"],
    github: "https://github.com/ankitwanderlust",
    live: "https://wanderlustbnb.netlify.app",
    image: "/ProjectImg/travel.jpg",
  },
  {
    title: "NGO FoodSaver",
    description: "Distributes leftover food from events to NGOs. Built with Firebase + React.",
    tech: ["React", "Firebase", "Framer Motion"],
    github: "https://github.com/ankitngosaver",
    live: "https://ngosaver.netlify.app",
    image: "/ProjectImg/orphan.png",
  },
  {
    title: "E-Commerce Store",
    description: "A fully functional e-commerce platform with payment integration.",
    tech: ["React", "Redux", "Stripe"],
    github: "https://github.com/ankitecommerce",
    live: "https://ecommerce-ankit.netlify.app",
    image: "/ProjectImg/ecommerce.jpg",
  },
  {
    title: "Aranya - Wildlife Exploration",
    description: "AI + blockchain-based wildlife conservation & plantation tracking platform.",
    tech: ["React", "Three.js", "Aptos", "IPFS"],
    github: "#",
    live: "#",
    image: "/ProjectImg/wildlife.jpg",
  },
];

const Projects = () => {
  const { isDark } = useTheme();
  const [modalProject, setModalProject] = useState(null);

  // Animation variants for grid items
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section
      id="projects"
      className={`py-20 px-6 md:px-16 relative ${
        !isDark ? "bg-gradient-to-b from-blue-50 to-white" : ""
      }`}
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`text-4xl sm:text-5xl md:text-6xl font-bold text-center ${
          isDark
            ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-800"
            : "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-gray-800"
        } mb-4 pb-2`}
      >
        Projects
      </motion.h2>
      <div className="flex flex-col items-center mb-8 sm:mb-12">
        <h3 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-center flex items-center gap-2`}>
          <span className={`${isDark 
            ? 'bg-gradient-to-r from-cyan-200 via-pink-200 to-yellow-200' 
            : 'bg-gradient-to-r from-cyan-600 via-pink-500 to-yellow-500'} bg-clip-text text-transparent`}>Yeah, I work hard</span>
          <span role="img" aria-label="briefcase">💼</span>
        </h3>
        <p className={`mt-3 sm:mt-4 text-sm sm:text-md text-center ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Each project is unique. Here are some of my works.
        </p>
      </div>

      {/* Projects Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className={`h-auto flex flex-col justify-between ${
              isDark
                ? "bg-[#171717] border border-white/10"
                : "bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg"
            } rounded-xl sm:rounded-2xl p-4 sm:p-7`}
          >
            <div className="w-full h-40 sm:h-44 overflow-hidden rounded-lg mb-4 sm:mb-5 relative group">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover object-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/400x300?text=Project+Image";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="text-white text-lg font-semibold mb-2">{project.title}</h4>
                  <p className="text-gray-200 text-sm line-clamp-2">{project.description}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 min-h-[120px] sm:min-h-[140px]">
              <h3 className={`text-lg sm:text-xl font-semibold line-clamp-1 ${
                isDark ? "text-blue-400" : "text-blue-600"
              }`}>{project.title}</h3>
              <p className={`mt-2 sm:mt-3 text-xs sm:text-sm line-clamp-3 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}>
                {project.description}
              </p>
              {project.description.length > 100 && (
                <button
                  onClick={() => setModalProject(project)}
                  className={`text-xs ${
                    isDark ? "text-blue-400" : "text-blue-600"
                  } underline mt-1`}
                >
                  Show more
                </button>
              )}

              <div className="flex flex-wrap mt-4 sm:mt-5 gap-2 sm:gap-3">
                {project.tech.map((techItem, i) => (
                  <span
                    key={i}
                    className={`${
                      isDark
                        ? "bg-sky-900/50 text-sky-300"
                        : "bg-blue-50 text-blue-600"
                    } px-2 sm:px-3 py-1 text-xs sm:text-sm rounded whitespace-nowrap`}
                  >
                    {techItem}
                  </span>
                ))}
              </div>
            </div>

            <div className={`flex space-x-3 sm:space-x-4 mt-4 sm:mt-5 ${
              isDark ? "text-sky-300" : "text-blue-600"
            }`}>
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all text-xs sm:text-sm flex-1 justify-center ${
                  isDark 
                    ? "bg-[#171717] hover:bg-[#1f1f1f] text-sky-300 hover:text-white border border-sky-900/50" 
                    : "bg-gray-100 hover:bg-gray-200 text-blue-600 hover:text-blue-700 border border-gray-200"
                }`}
              >
                <FaGithub className="text-lg sm:text-xl" />
                <span className="font-medium">GitHub</span>
              </a>
              <a 
                href={project.live} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all text-xs sm:text-sm flex-1 justify-center ${
                  isDark 
                    ? "bg-sky-900/50 hover:bg-sky-800 text-sky-300 hover:text-white" 
                    : "bg-blue-500 hover:bg-blue-600 text-white hover:text-white"}
                }`}
              >
                <FaExternalLinkAlt className="text-lg sm:text-xl" />
                <span className="font-medium">Live Demo</span>
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {modalProject && (
          <motion.div
            className="fixed inset-0 z-50 bg-transparent flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalProject(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className={`${
                isDark
                  ? "bg-black/10 backdrop-blur-lg border border-white/20"
                  : "bg-white/90 backdrop-blur-lg border border-gray-200 shadow-xl"
              } rounded-2xl p-6 max-w-2xl w-full relative`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3 className={`text-3xl font-bold ${
                isDark ? "text-blue-300" : "text-blue-600"
              } mb-4`}>{modalProject.title}</h3>
              <img
                src={modalProject.image}
                alt={modalProject.title}
                className="w-full h-56 object-cover rounded-lg mb-4"
              />
              <p className={`text-lg ${
                isDark ? "text-gray-200" : "text-gray-600"
              } mb-4`}>{modalProject.description}</p>
              <div className="flex flex-wrap gap-3 mb-4">
                {modalProject.tech.map((tech, i) => (
                  <span
                    key={i}
                    className={`${
                      isDark
                        ? "bg-blue-900 text-blue-300"
                        : "bg-blue-100 text-blue-600"
                    } px-3 py-2 rounded-lg`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className={`flex space-x-6 text-xl ${
                isDark ? "text-blue-300" : "text-blue-500"
              }`}>
                <a href={modalProject.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="hover:text-white" />
                </a>
                <a href={modalProject.live} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt className="hover:text-white" />
                </a>
              </div>
              <button
                onClick={() => setModalProject(null)}
                className={`absolute top-2 right-3 text-xl ${
                  isDark ? "text-white" : "text-gray-600"}
                } hover:text-red-500`}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
