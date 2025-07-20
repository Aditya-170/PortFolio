"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import About from "../components/About";
import Skills from "../components/Skills";
import Project from "../components/Project";
import Blog from "../components/Blog";
import Achievements from "../components/Achievements";
import Contact from "../components/Contact";
import { motion } from "framer-motion";

function Typewriter({ words, speed = 100, pause = 1200 }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);
  const [pauseTyping, setPauseTyping] = useState(false);

  useEffect(() => {
    if (pauseTyping) {
      const timeout = setTimeout(() => setPauseTyping(false), pause);
      return () => clearTimeout(timeout);
    }
    if (subIndex === words[index].length + 1 && !deleting) {
      setPauseTyping(true);
      setDeleting(true);
      return;
    }
    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, pauseTyping, words, speed, pause]);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((v) => !v), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <span>
      {words[index].substring(0, subIndex)}
      <span className={blink ? "opacity-100" : "opacity-0"}>|</span>
    </span>
  );
}

function SkillBar({ skill, percent, info }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="w-full mb-4 last:mb-0"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="font-medium text-gray-700 dark:text-gray-200">{skill}</span>
        <span className="font-mono text-sm text-gray-500 dark:text-gray-400">{percent}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-700"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      {hover && (
        <div className="mt-2 text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 rounded p-2 shadow transition-opacity duration-300">
          {info}
        </div>
      )}
    </div>
  );
}

function MeshBackground() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M0 300 Q400 100 800 300 T1600 300"
          stroke="#10b98122"
          strokeWidth="80"
          initial={{ pathLength: 0.8 }}
          animate={{ pathLength: [0.8, 1, 0.8] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M0 400 Q400 600 800 400 T1600 400"
          stroke="#f59e0b22"
          strokeWidth="80"
          initial={{ pathLength: 0.7 }}
          animate={{ pathLength: [0.7, 1, 0.7] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ background: "linear-gradient(120deg, #0f2027 0%, #2c5364 100%)" }}>
      <section id="home" className="relative z-10 w-full min-h-screen flex flex-col justify-center items-center py-24 overflow-hidden">
        <MeshBackground />
        <motion.div
          className="relative z-10 w-full max-w-2xl mx-auto glass-card p-12 flex flex-col items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-center bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-lg">
            Hi, I'm Ujjwal Kumar Singh
          </h1>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-foreground text-center">
            Creative Full Stack Developer and AI Enthusiast
          </h2>
          <div className="text-xl sm:text-2xl font-mono text-primary mb-8 h-10 text-center">
            <Typewriter
              words={[
                "Building stunning web experiences.",
                "React, Next.js, Node.js, Tailwind CSS.",
                "Let's create something amazing!",
              ]}
              speed={70}
              pause={1200}
            />
          </div>
          <a
            href="#projects"
            className="inline-block px-8 py-3 rounded-full bg-primary text-white font-bold shadow-lg hover:bg-secondary transition text-lg mt-4"
          >
            View My Work
          </a>
        </motion.div>
      </section>
      <div className="section-divider">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 40 Q360 0 720 40 T1440 40 V80 H0 V40 Z" fill="url(#gradient1)"/><defs><linearGradient id="gradient1" x1="0" y1="0" x2="1440" y2="80" gradientUnits="userSpaceOnUse"><stop stopColor="#10b981"/><stop offset="0.5" stopColor="#f59e0b"/><stop offset="1" stopColor="#6366f1"/></linearGradient></defs></svg>
      </div>
      {/* About Section */}
      <section id="about">
        <About />
      </section>
      <div className="section-divider">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 40 Q360 80 720 40 T1440 40 V0 H0 V40 Z" fill="url(#gradient2)"/><defs><linearGradient id="gradient2" x1="0" y1="0" x2="1440" y2="80" gradientUnits="userSpaceOnUse"><stop stopColor="#6366f1"/><stop offset="0.5" stopColor="#10b981"/><stop offset="1" stopColor="#f59e0b"/></linearGradient></defs></svg>
      </div>
      {/* Skills Section */}
      <section id="skills">
        <Skills />
      </section>
      <div className="section-divider">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 40 Q360 0 720 40 T1440 40 V80 H0 V40 Z" fill="url(#gradient1)"/><defs><linearGradient id="gradient1" x1="0" y1="0" x2="1440" y2="80" gradientUnits="userSpaceOnUse"><stop stopColor="#10b981"/><stop offset="0.5" stopColor="#f59e0b"/><stop offset="1" stopColor="#6366f1"/></linearGradient></defs></svg>
      </div>
      {/* Projects Section */}
      <section id="projects">
        <Project />
      </section>
      <div className="section-divider">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 40 Q360 80 720 40 T1440 40 V0 H0 V40 Z" fill="url(#gradient2)"/><defs><linearGradient id="gradient2" x1="0" y1="0" x2="1440" y2="80" gradientUnits="userSpaceOnUse"><stop stopColor="#6366f1"/><stop offset="0.5" stopColor="#10b981"/><stop offset="1" stopColor="#f59e0b"/></linearGradient></defs></svg>
      </div>
      {/* Blog Section */}
      <section id="blog">
        <Blog />
      </section>
      <div className="section-divider">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 40 Q360 0 720 40 T1440 40 V80 H0 V40 Z" fill="url(#gradient1)"/><defs><linearGradient id="gradient1" x1="0" y1="0" x2="1440" y2="80" gradientUnits="userSpaceOnUse"><stop stopColor="#10b981"/><stop offset="0.5" stopColor="#f59e0b"/><stop offset="1" stopColor="#6366f1"/></linearGradient></defs></svg>
      </div>
      {/* Achievements Section */}
      <section id="achievements">
        <Achievements />
      </section>
      <div className="section-divider">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 40 Q360 80 720 40 T1440 40 V0 H0 V40 Z" fill="url(#gradient2)"/><defs><linearGradient id="gradient2" x1="0" y1="0" x2="1440" y2="80" gradientUnits="userSpaceOnUse"><stop stopColor="#6366f1"/><stop offset="0.5" stopColor="#10b981"/><stop offset="1" stopColor="#f59e0b"/></linearGradient></defs></svg>
      </div>
      {/* Contact Section */}
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}
