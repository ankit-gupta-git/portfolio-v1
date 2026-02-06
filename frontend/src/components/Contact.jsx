import React, { useRef, useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FiUser, FiMail, FiEdit3, FiSend, FiMessageCircle } from "react-icons/fi";
import { useForm, ValidationError } from '@formspree/react';
import { useTheme } from "./ui/ThemeContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const { isDark } = useTheme();
  
  // Refs for GSAP animations
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const formLeftRef = useRef(null);
  const formRightRef = useRef(null);
  const submitButtonRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [state, handleSubmit] = useForm("meogakgz");

  // GSAP animations
  useEffect(() => {
    // Check if all refs are available before creating animations
    if (!sectionRef.current || !titleRef.current || !descriptionRef.current || !formLeftRef.current || !formRightRef.current) {
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%", // Changed from 80% to 90% - triggers earlier
        end: "bottom 10%",
        toggleActions: "play none none reverse"
      }
    });

    // Section entrance animation
    tl.fromTo(sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.4 }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.3 },
      "-=0.3"
    )
    .fromTo(descriptionRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.3 },
      "-=0.2"
    )
    .fromTo(formLeftRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.35 },
      "-=0.2"
    )
    .fromTo(formRightRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.35 },
      "-=0.25"
    );

    // Cleanup
    return () => {
      if (tl) {
        tl.kill();
      }
    };
  }, []);

  if (state.succeeded) {
    return (
      <section className={`py-20 px-4 text-center ${isDark ? "text-white" : "text-[#111827]"}`}>
        <h2 className="text-4xl font-bold mb-4">Thanks for reaching out!</h2>
        <p className={isDark ? "text-gray-400" : "text-gray-600"}>I'll get back to you as soon as possible.</p>
      </section>
    );
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`pt-20 pb-16 px-4 md:px-10 text-center ${
        !isDark ? "bg-gradient-to-br from-[#f1faff] via-[#e6f0ff] to-[#ffffff]" : ""
      }`}
    >
      <h2
        ref={titleRef}
        className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 ${
          isDark ? "text-white" : "text-[#111827]"
        }`}
      >
        Let's{" "}
        <span className={`text-transparent bg-clip-text ${
          isDark
            ? "bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500"
            : "bg-gradient-to-r from-[#159ccb] to-[#0f7a9e]"
        }`}>
          get in touch!
        </span>
      </h2>
      <p 
        ref={descriptionRef}
        className={`mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        Let's connect and build something amazing together. Feel free to reach out!
      </p>

      <form onSubmit={handleSubmit} className="mx-w-4xl w-full grid md:grid-cols-2 gap-10 items-start">
        <div
          ref={formLeftRef}
          className={`p-6 rounded-xl space-y-5 shadow-lg transition-all duration-300 hover:scale-105 ${
            isDark
              ? "bg-black/40 backdrop-blur-md border border-white/10 text-white"
              : "bg-white/90 backdrop-blur-[20px] border border-white/50 text-[#111827] shadow-xl"
          }`}
        >
          <h2 className={`text-xl font-semibold flex items-center gap-2 ${
            isDark ? "text-blue-400" : "text-[#159ccb]"
          }`}>
            <FiUser /> Your Details
          </h2>

          <div className="space-y-1">
            <label className={`text-sm flex items-center gap-2 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}>
              <FiUser /> Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className={`w-full px-4 py-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#159ccb] transition-all ${
                isDark
                  ? "bg-black/30 border border-white/10 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  : "bg-white/50 border border-gray-200 text-[#111827] shadow-[0_0_10px_rgba(21,156,203,0.2)]"
              }`}
            />
          </div>

          <div className="space-y-1">
            <label className={`text-sm flex items-center gap-2 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}>
              <FiMail /> Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className={`w-full px-4 py-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#159ccb] transition-all ${
                isDark
                  ? "bg-black/30 border border-white/10 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  : "bg-white/50 border border-gray-200 text-[#111827] shadow-[0_0_10px_rgba(21,156,203,0.2)]"
              }`}
            />
          </div>

          <div className="space-y-1">
            <label className={`text-sm flex items-center gap-2 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}>
              <FiEdit3 /> Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Email Subject"
              required
              className={`w-full px-4 py-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#159ccb] transition-all ${
                isDark
                  ? "bg-black/30 border border-white/10 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  : "bg-white/50 border border-gray-200 text-[#111827] shadow-[0_0_10px_rgba(21,156,203,0.2)]"
              }`}
            />
          </div>
        </div>

        <div
          ref={formRightRef}
          className={`p-6 rounded-xl relative shadow-lg transition-all duration-300 hover:scale-105 ${
            isDark
              ? "bg-black/50 backdrop-blur-sm border border-white/10 text-white"
              : "bg-white/90 backdrop-blur-[20px] border border-white/50 text-[#111827] shadow-xl"
          }`}
        >
          <h2 className={`text-xl font-semibold flex items-center gap-2 mb-2 ${
            isDark ? "text-blue-400" : "text-[#159ccb]"
          }`}>
            <FiMessageCircle /> Your Message
          </h2>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message..."
            required
            className={`w-full h-96 px-4 py-3 rounded-md resize-none placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#159ccb] transition-all ${
              isDark
                ? "bg-black/30 border border-white/10 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                : "bg-white/50 border border-gray-200 text-[#111827] shadow-[0_0_10px_rgba(21,156,203,0.2)]"
            }`}
          ></textarea>

          {formData.email && (
            <button
              ref={submitButtonRef}
              type="submit"
              disabled={state.submitting}
              className={`absolute top-2 right-6 px-5 py-2 rounded-md flex items-center gap-2 transition-all hover:scale-105 ${
                isDark
                  ? "bg-black/30 backdrop-blur-md border border-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                  : "bg-white/80 backdrop-blur-md border border-[#159ccb]/30 text-[#159ccb] shadow-[0_0_10px_rgba(21,156,203,0.2)]"
              }`}
            >
              <FiSend /> {state.submitting ? "Sending..." : "Send"}
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default Contact;
