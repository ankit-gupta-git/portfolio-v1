import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ui/ThemeContext";
import { FaMedium, FaExternalLinkAlt, FaCalendarAlt, FaClock } from "react-icons/fa";

const Blog = () => {
  const { isDark } = useTheme();

  // Sample blog data - replace with your actual Medium blog posts
  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable Microservices with Spring Boot",
      description: "Learn how to design and implement robust microservices architecture using Spring Boot, Docker, and Kubernetes for enterprise applications.",
      topic: "Backend Development",
      readTime: "8 min read",
      publishDate: "Dec 15, 2024",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop",
      mediumUrl: "https://medium.com/@yourusername/building-scalable-microservices",
      tags: ["Spring Boot", "Microservices", "Docker"]
    },
    {
      id: 2,
      title: "Mastering React Hooks: A Deep Dive",
      description: "Explore advanced React Hooks patterns, custom hooks, and best practices for building modern React applications with clean, reusable code.",
      topic: "Frontend Development",
      readTime: "12 min read",
      publishDate: "Dec 10, 2024",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      mediumUrl: "https://medium.com/@yourusername/mastering-react-hooks",
      tags: ["React", "JavaScript", "Hooks"]
    },
    {
      id: 3,
      title: "AI-Powered Chatbots: From Concept to Deployment",
      description: "Build intelligent chatbots using natural language processing and machine learning techniques for enhanced user experiences.",
      topic: "Artificial Intelligence",
      readTime: "15 min read",
      publishDate: "Dec 5, 2024",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
      mediumUrl: "https://medium.com/@yourusername/ai-powered-chatbots",
      tags: ["AI", "NLP", "Chatbots"]
    },
    {
      id: 4,
      title: "Optimizing Database Performance in Production",
      description: "Discover advanced database optimization techniques, indexing strategies, and query performance tuning for high-traffic applications.",
      topic: "Database",
      readTime: "10 min read",
      publishDate: "Nov 28, 2024",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop",
      mediumUrl: "https://medium.com/@yourusername/database-optimization",
      tags: ["Database", "Performance", "SQL"]
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section
      id="blog"
      className={`py-20 px-6 md:px-12 lg:px-20 transition duration-300 ${
        isDark ? "" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 font-dxgrafik ${
            isDark ? "text-white" : "text-gray-900"
          }`}>
            Blog & Insights
          </h2>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}>
            Sharing knowledge and experiences through technical writing. 
            Explore my thoughts on software development, AI, and emerging technologies.
          </p>
        </motion.div>

        {/* Blog Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 ${
                isDark 
                  ? "bg-gray-800 hover:bg-gray-700" 
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              {/* Blog Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Topic Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDark 
                      ? "bg-blue-600/90 text-white" 
                      : "bg-blue-600 text-white"
                  }`}>
                    {post.topic}
                  </span>
                </div>

                {/* Medium Icon */}
                <div className="absolute top-4 right-4">
                  <FaMedium className={`text-2xl ${
                    isDark ? "text-white" : "text-white"
                  }`} />
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-3 line-clamp-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  {post.title}
                </h3>
                
                <p className={`text-sm mb-4 line-clamp-3 ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}>
                  {post.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        isDark 
                          ? "bg-gray-700 text-gray-300" 
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt />
                    <span>{post.publishDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Read More Button */}
                <motion.a
                  href={post.mediumUrl}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isDark
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  Read on Medium
                  <FaExternalLinkAlt className="text-sm" />
                </motion.a>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Blogs CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mt-12"
        >
          <motion.a
            href="https://medium.com/@yourusername"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-200 ${
              isDark
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            }`}
          >
            <FaMedium className="text-xl" />
            View All Articles on Medium
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog; 