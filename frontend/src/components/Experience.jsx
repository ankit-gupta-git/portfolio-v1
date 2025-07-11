import React from "react";
import {
  Award,
  Code2,
  Laptop,
  MapPin,
  SendHorizontal
} from "lucide-react"; 
import Timeline from "./ui/timeline";
import { useTheme } from "./ui/ThemeContext";
import { motion } from "framer-motion";
import { FaCircle } from "react-icons/fa6";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";

const Experience = () => {
  const { isDark } = useTheme();

  const experiences = [
    {
      title: "2023 - Present",
      content: (
        <div className="flex items-start gap-2 sm:gap-3">
          {/* Laptop icon: adjusted size and alignment */}
          <Laptop className={`w-6 h-6 sm:w-5 sm:h-8 mt-1.5 ${isDark ? "text-blue-500" : "text-[#159ccb]"}`} />
          <div className="flex-1 pl-1">
            <h3 className={`text-base sm:text-lg font-semibold mb-2 ${isDark ? "text-white" : "text-[#111827]"}`}>Bachelor of Technology in CSE - AIML</h3>
            <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
              <MapPin className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? "text-gray-400" : "text-gray-600"}`} />
              <p className={`text-sm sm:text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Quantum University, Roorkee, IN</p>
            </div>
            <p className={`text-sm sm:text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Pursuing a comprehensive education in Computer Science and Engineering with a specialization in Artificial Intelligence and Machine Learning. Building strong problem-solving skills through core CS fundamentals, algorithms, data structures, machine learning models, and full-stack development, with hands-on projects and real-world applications.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Hackathons",
      content: (
        <div className="flex items-start gap-2 sm:gap-3">
          {/* Code2 icon: 2x bigger on mobile, normal on desktop */}
          <Code2 className={`w-8 h-5 sm:w-5 sm:h-7 mt-1 ${isDark ? "text-blue-500" : "text-[#159ccb]"}`} />
          <div className="flex-1">
            <h3 className={`text-base sm:text-lg font-semibold mb-2 ${isDark ? "text-white" : "text-[#111827]"}`}>Hackathon Team Lead</h3>
            <p className={`text-sm sm:text-sm mb-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Aug 2023 - May 2025</p>
            <ul className={`list-none pl-0 space-y-2 ${isDark ? "text-gray-300 text-sm sm:text-sm" : "text-gray-700 text-sm sm:text-sm"}`}>
              <li>Actively participated in multiple hackathons, developing impactful tech solutions and leading cross-functional teams.</li>
              <li>
                <div className="flex items-start gap-1 sm:gap-2">
                  <SendHorizontal className={`mt-1 w-3 h-3 sm:w-3 sm:h-3 flex-shrink-0 text-blue-400 ${isDark ? "glow-blue" : ""}`} />
                  <span>Developed AI-powered healthcare systems with chatbot integration and real-time monitoring.</span>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-1 sm:gap-2">
                  <SendHorizontal className={`mt-1 w-3 h-3 sm:w-3 sm:h-3 flex-shrink-0 text-blue-400 ${isDark ? "glow-blue" : ""}`} />
                  <span>Built decentralized platforms using blockchain and geospatial tech for wildlife conservation.</span>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-1 sm:gap-2">
                  <SendHorizontal className={`mt-1 w-3 h-3 sm:w-3 sm:h-3 flex-shrink-0 text-blue-400 ${isDark ? "glow-blue" : ""}`} />
                  <span>Designed interactive, user-centric interfaces using React.js, Tailwind CSS, and Three.js.</span>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-1 sm:gap-2">
                  <SendHorizontal className={`mt-1 w-3 h-3 sm:w-3 sm:h-3 flex-shrink-0 text-blue-400 ${isDark ? "glow-blue" : ""}`} />
                  <span>Integrated real-time data handling with Firebase and IoT devices like Arduino Uno.</span>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-1 sm:gap-2">
                  <SendHorizontal className={`mt-1 w-3 h-3 sm:w-3 sm:h-3 flex-shrink-0 text-blue-400 ${isDark ? "glow-blue" : ""}`} />
                  <span>Achieved top positions, including 1st place at the Annual Fest Hackathon and 2nd at Health Track.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Awards & Recognition",
      content: (
        <div className="flex items-start gap-2 sm:gap-3">
          {/* Award icon: smaller on desktop, normal on mobile */}
          <Award className={`w-5 h-8 sm:w-6 sm:h-6 mt-1 ${isDark ? "text-blue-500" : "text-[#159ccb]"}`} />
          <div className="flex-1">
            <h3 className={`text-base sm:text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-[#111827]"}`}>Hackathon Achievements</h3>
            {(() => {
              const hackathonAwardsData = [
                {
                  title: "Annual Fest Hackathon Winner - \"Swastha\" (Remote Healthcare Monitoring System)",
                  description:"A remote healthcare monitoring system utilizing IoT and Arduino Uno, featuring real-time vitals tracking, an AI-driven medical chatbot, and a live assistant for enhanced user support.",
                  tags: ["Winner", "Real-time", "Remote Healthcare", "IoT"],
                  certificate: "https://drive.google.com/file/d/1v59ZqExnFulLg3lcRDj4F7PWkq4vfBhC/view?usp=sharing"
                },
                {
                  title: "Top 30 at Galgotias International Hackathon - \"Aranya\" (Decentralized Wildlife Conservation Platform)",
                  description: "A decentralized wildlife conservation platform using blockchain, AI, and geospatial tech, featuring GPS-tagged plantation NFTs, a 3D interactive biodiversity map, AI-driven animal chatbots, and real-time data integration.",
                  tags: ["Top 30", "Blockchain", "AI", "Geospatial Tech", "Leadership"],
                  certificate: "https://drive.google.com/file/d/1iyJCumva4HqNKTeKeCWDn9WGenN4zed3/view?usp=sharing"
                }
              ];

              return (
                <ul className="space-y-6">
                  {hackathonAwardsData.map((award, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <FaCircle className={`w-3 h-3 sm:w-2.5 sm:h-2.5 mt-2 flex-shrink-0 ${isDark ? "text-blue-500" : "text-[#159ccb]"}`} />
                      <div>
                        <h4 className={`text-base sm:text-lg font-semibold ${isDark ? "text-white" : "text-[#111827]"}`}>{award.title}</h4>
                        <p className={`mt-1 text-sm sm:text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>{award.description}</p>
                        {/* Tags */}
                        {award.tags && award.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {award.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-sm sm:text-sm font-medium ${isDark ? "bg-[#1e293b]/70 text-blue-400" : "bg-[#cceeff] text-[#159ccb]"}`}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        {/* Certificate Link */}
                        {award.certificate && (
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={award.certificate}
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-lg text-sm transition relative group overflow-hidden ${
                              isDark
                                ? "bg-black/30 backdrop-blur-md border border-blue-500/50"
                                : "bg-white/80 backdrop-blur-md border border-[#159ccb]/30 shadow-sm"
                            }`}
                          >
                            <span
                              className={`absolute inset-0 bg-gradient-to-r from-[#159ccb] to-[#0f7a9e] opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300`}
                            ></span>
                            <span className={`relative z-10 flex items-center gap-2 ${
                              isDark ? "text-white" : "text-[#159ccb] group-hover:text-white group-active:text-white"
                            }`}>
                              View Certificate <HiOutlineDocumentArrowDown className="text-sm" />
                            </span>
                          </motion.a>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              );
            })()}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="experience"
      className={`relative py-20 px-2 sm:px-4 md:px-10 overflow-hidden ${
        !isDark ? "bg-gradient-to-br from-[#f1faff] via-[#e6f0ff] to-[#ffffff]" : ""
      }`}
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`text-4xl sm:text-5xl md:text-6xl font-bold text-center font-dxgrafik ${
          isDark
            ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-800"
            : "text-[#111827]"
        } mb-12 sm:mb-16 pb-4 sm:pb-8`}
      >
        Experience
      </motion.h2>

      <div className="max-w-[95%] sm:max-w-[90%] md:max-w-[85%] mx-auto">
        <Timeline data={experiences} />
      </div>
    </section>
  );
};

export default Experience;