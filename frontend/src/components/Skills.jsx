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

  return (
    <section
      id="skills"
      className={`py-32 px-10 font-figtree ${
        !isDark ? "bg-gradient-to-br from-[#f1faff] via-[#e6f0ff] to-[#ffffff]" : ""
      }`}
    >
      <div className="max-w-8xl mx-auto">
        <h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`text-4xl sm:text-5xl md:text-6xl font-bold text-center font-dxgrafik mb-8 pb-4 ${
            isDark
              ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-800"
              : "text-[#111827]"
          }`}
        >
          Skills & Technologies
        </h2>

        <p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`text-center mb-16 text-base sm:text-lg font-figtree ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          My technical toolkit for building modern and scalable applications
        </p>

        {/* Cards Grid */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {skills.map((group, index) => (
            <div
              key={index}
              whileHover={{ 
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className={`rounded-2xl ${
                isDark
                  ? "bg-gradient-to-b from-[#181818] to-[#0f0f0f] border border-neutral-800 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                  : "bg-white/90 backdrop-blur-[20px] border border-white/50 shadow-lg hover:shadow-xl"
              } transition-all duration-300`}
            >
              {/* Card Header */}
              <div
                className={`p-6 rounded-t-2xl flex items-center gap-4 ${
                  isDark
                    ? "bg-gradient-to-r from-teal-800/20 to-purple-800/20 border border-teal-800/30 shadow-[0_0_20px_rgba(56,189,248,0.1)]"
                    : "bg-gradient-to-r from-[#cceeff] to-[#eae2ff]"
                }`}
              >
                <div
                  whileHover={{ rotate: 360 }}
                  whileTap={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-14 rounded-xl flex items-center justify-center
                    ${isDark
                      ? "bg-gradient-to-br from-teal-600/30 to-purple-600/30 border border-teal-400/20 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                      : "bg-gradient-to-br from-[#159ccb]/30 to-[#0f7a9e]/30 border border-[#159ccb]/20 shadow-[0_0_15px_rgba(21,156,203,0.2)]"
                    }
                  `}
                >
                  {group.icon}
                </div>
                <h3
                  className={`text-2xl font-semibold font-heading font-dxgrafik ${
                    isDark ? "text-white" : "text-[#111827]"
                  }`}
                >
                  {group.category}
                </h3>
              </div>

              {/* Divider */}
              <div
                className={`h-[1px] ${
                  isDark ? "bg-neutral-700" : "bg-gray-200"
                }`}
              ></div>

              {/* Card Body */}
              <div className="p-6">
                <div className="flex flex-wrap gap-4">
                  {group.items.map((skill, i) => (
                    <div
                      key={i}
                      whileHover="hover"
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-3 px-4 py-2 rounded-md ${
                        isDark
                          ? "bg-[#1e1e1e] hover:shadow-[0_0_8px_rgba(255,255,255,0.15)]"
                          : "bg-[#f9f9fb] hover:shadow-md"
                      } transition-all duration-300`}
                    >
                      <span 
                        whileHover={{ rotate: 360 }}
                        whileTap={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="text-lg"
                      >
                        {skill.icon}
                      </span>
                      <span
                        className={`text-base font-figtree ${
                          isDark ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Text Box */}
        <div
          className={`rounded-2xl p-6 mt-12 mx-auto max-w-3xl text-center text-base sm:text-lg font-figtree ${
            isDark
              ? "bg-[#181818] text-gray-200 shadow-[0_0_7px_7px_rgba(11,36,51,0.5)]"
              : "bg-white text-gray-700 shadow-lg"
          } transition-all duration-300 flex items-center justify-center`}
        >
          I'm always curious to explore new technologies, constantly expanding my toolkit to tackle challenges more creatively and effectively.
        </div>
      </div>
    </section>
  );
};

export default Skills;