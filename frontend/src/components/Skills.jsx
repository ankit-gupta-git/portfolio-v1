import React from "react";
import {
  FaReact,
  FaJs,
  FaGitAlt,
  FaDocker,
  FaLinux,
  FaProjectDiagram,
  FaNodeJs,
  FaDatabase,
  FaPython,
  FaGithub,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiMysql,
  SiMongodb,
  SiExpress,
  SiJupyter,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiPostman,
} from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ui/ThemeContext";

const skills = [
  {
    category: "Frontend Development",
    icon: <FaReact className="text-sky-400 text-3xl" />,
    items: [
      { name: "React", icon: <FaReact className="text-sky-400" /> },
      { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss className="text-cyan-400" />,
      },
      { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
    ],
  },
  {
    category: "Backend Development",
    icon: <FaNodeJs className="text-green-500 text-3xl" />,
    items: [
      { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
      { name: "Express.js", icon: <SiExpress className="text-gray-400" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-green-400" /> },
      { name: "REST APIs", icon: <FaDatabase className="text-blue-400" /> },
    ],
  },
  {
    category: "AI & ML Technologies",
    icon: <FaProjectDiagram className="text-rose-400 text-3xl" />,
    items: [
      { name: "Python", icon: <FaPython className="text-blue-500" /> },
      { name: "NumPy", icon: <SiNumpy className="text-yellow-500" /> },
      { name: "Pandas", icon: <SiPandas className="text-blue-600" /> },
      { name: "Scikit-learn", icon: <SiScikitlearn className="text-orange-500" /> },
      { name: "Jupyter", icon: <SiJupyter className="text-orange-600" /> },
    ],
  },
  {
    category: "Tools & Technologies",
    icon: <FaGitAlt className="text-orange-500 text-3xl" />,
    items: [
      { name: "Git", icon: <FaGitAlt className="text-orange-500" /> },
      { name: "Docker", icon: <FaDocker className="text-blue-400" /> },
      { name: "Linux", icon: <FaLinux className="text-yellow-400" /> },
      { name: "Postman", icon: <SiPostman className="text-orange-600" /> },
      { name: "GitHub", icon: <FaGithub className="text-gray-400" /> },
    ],
  },
];

const Skills = () => {
  const { isDark } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <section
      id="skills"
      className={`py-32 px-10 ${
        !isDark ? "bg-gradient-to-b from-blue-50 to-white" : ""
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-8xl mx-auto"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-4xl sm:text-5xl md:text-6xl font-bold text-center font-heading ${
            isDark
              ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-800"
              : "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-gray-800"
          } bg-clip-text text-transparent mb-8 pb-4`}
        >
          Skills & Technologies
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-center mb-16 text-base sm:text-lg font-sans ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          My technical toolkit for building modern and scalable applications
        </motion.p>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-12 md:grid-cols-2 lg:grid-cols-4"
        >
          {skills.map((group, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className={`rounded-2xl ${
                isDark
                  ? "bg-gradient-to-b from-[#181818] to-[#0f0f0f] border border-neutral-800 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                  : "bg-white border border-gray-200 shadow-lg hover:shadow-xl"
              } transition-all duration-300`}
            >
              {/* Card Header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`p-6 rounded-t-2xl flex items-center gap-4 ${
                  isDark
                    ? "bg-gradient-to-r from-teal-800/20 to-purple-800/20 border border-teal-800/30 shadow-[0_0_20px_rgba(56,189,248,0.1)]"
                    : "bg-gradient-to-r from-blue-100 to-indigo-100"
                }`}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-14 rounded-xl flex items-center justify-center
                    ${isDark
                      ? "bg-gradient-to-br from-teal-600/30 to-purple-600/30 border border-teal-400/20 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                      : "bg-gradient-to-br from-blue-400/30 to-indigo-600/30 border border-blue-600/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                    }
                  `}
                >
                  {group.icon}
                </motion.div>
                <h3
                  className={`text-2xl font-semibold font-heading ${
                    isDark ? "text-white" : "text-gray-800"
                  }`}
                >
                  {group.category}
                </h3>
              </motion.div>

              {/* Divider */}
              <div
                className={`h-[1px] ${
                  isDark ? "bg-neutral-700" : "bg-gray-200"
                }`}
              ></div>

              {/* Card Body */}
              <div className="p-6">
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  className="flex flex-wrap gap-4"
                >
                  {group.items.map((skill, i) => (
                    <motion.div
                      key={i}
                      variants={skillItemVariants}
                      whileHover="hover"
                      className={`flex items-center gap-3 px-4 py-2 rounded-md ${
                        isDark
                          ? "bg-[#1e1e1e] hover:shadow-[0_0_8px_rgba(255,255,255,0.15)]"
                          : "bg-gray-50 hover:shadow-md"
                      } transition-all duration-300`}
                    >
                      <motion.span 
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="text-lg"
                      >
                        {skill.icon}
                      </motion.span>
                      <span
                        className={`text-base font-sans ${
                          isDark ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Text Box with Static Shadow Glow Only */}
        <div
          className={`rounded-2xl p-6 mt-12 mx-auto max-w-3xl text-center text-base sm:text-lg font-sans ${isDark
            ? "bg-[#181818] text-gray-200 shadow-[0_0_7px_7px_rgba(11,36,51,0.5)]"
            : "bg-white text-gray-700 shadow-lg"
          } transition-all duration-300 flex items-center justify-center`}
        >
          I’m always curious to explore new technologies, constantly expanding my toolkit to tackle challenges more creatively and effectively.
        </div>

      </motion.div>
    </section>
  );
};

export default Skills;