"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SKILL_CATEGORIES = [
  {
    label: "Frontend",
    skills: [
      { name: "HTML", percent: 95, level: "Expert", years: 5, projects: 20 },
      { name: "CSS", percent: 92, level: "Expert", years: 5, projects: 20 },
      { name: "JavaScript", percent: 90, level: "Expert", years: 5, projects: 18 },
      { name: "React", percent: 88, level: "Advanced", years: 4, projects: 15 },
      { name: "Next.js", percent: 85, level: "Advanced", years: 3, projects: 10 },
      { name: "Tailwind CSS", percent: 80, level: "Advanced", years: 3, projects: 8 },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js", percent: 85, level: "Advanced", years: 4, projects: 12 },
      { name: "Express", percent: 80, level: "Advanced", years: 4, projects: 10 },
      { name: "MongoDB", percent: 78, level: "Intermediate", years: 3, projects: 8 },
      { name: "PostgreSQL", percent: 70, level: "Intermediate", years: 2, projects: 5 },
      { name: "Firebase", percent: 65, level: "Intermediate", years: 2, projects: 4 },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "Git & GitHub", percent: 90, level: "Expert", years: 5, projects: 25 },
      { name: "Figma", percent: 70, level: "Intermediate", years: 2, projects: 6 },
      { name: "Vercel", percent: 80, level: "Advanced", years: 3, projects: 10 },
      { name: "Jest", percent: 65, level: "Intermediate", years: 2, projects: 4 },
    ],
  },
];

const SOFT_SKILLS = [
  { name: "Communication", size: 2.2 },
  { name: "Teamwork", size: 2 },
  { name: "Creativity", size: 1.8 },
  { name: "Problem Solving", size: 2.1 },
  { name: "Adaptability", size: 1.7 },
  { name: "Leadership", size: 1.9 },
  { name: "Time Management", size: 1.6 },
  { name: "Empathy", size: 1.5 },
];

const CERTIFICATIONS = [
  { name: "Meta Full Stack", badge: "https://img.shields.io/badge/Meta-Full%20Stack-blue?logo=meta" },
  { name: "Google UI/UX", badge: "https://img.shields.io/badge/Google-UI%2FUX-green?logo=google" },
  { name: "HackerRank JS", badge: "https://img.shields.io/badge/HackerRank-JavaScript-brightgreen?logo=hackerrank" },
];

const LEARNING = [
  { name: "TypeScript", percent: 40 },
  { name: "GraphQL", percent: 25 },
];

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

function CircularProgress({ percent, color, size = 80, stroke = 8, children }) {
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  return (
    <svg width={size} height={size} className="block mx-auto">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#e5e7eb"
        strokeWidth={stroke}
        fill="none"
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={circ}
        strokeDashoffset={circ}
        animate={{ strokeDashoffset: circ * (1 - percent / 100) }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 8px ${color})` }}
      />
      {children}
    </svg>
  );
}

function SkillPopover({ skill, open }) {
  // Removed SkillPopover and AnimatePresence logic
  return null;
}

function SkillCategory({ category, open, onToggle }) {
  return (
    <motion.div
      className="mb-8 bg-white/10 border border-white/20 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
      initial={false}
      animate={{ height: open ? "auto" : 64 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <button
        className="w-full flex items-center justify-between px-8 py-4 text-xl font-bold text-white focus:outline-none"
        onClick={onToggle}
      >
        {category.label}
        <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.3 }}>
          ▶
        </motion.span>
      </button>
      {open && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-8 pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {category.skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="relative flex flex-col items-center group cursor-pointer bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 mb-2 backdrop-blur-xl"
              whileHover={{ scale: 1.08, boxShadow: "0 8px 32px 0 #10b98133" }}
              transition={{ duration: 0.2 }}
            >
              <CircularProgress percent={skill.percent} color="#10b981" size={90}>
                <text
                  x="50%"
                  y="54%"
                  textAnchor="middle"
                  fontSize="1.2em"
                  fill="#10b981"
                  fontWeight="bold"
                >
                  {skill.percent}%
                </text>
              </CircularProgress>
              <div className="mt-3 text-lg font-semibold text-white">{skill.name}</div>
              <div className="text-xs text-[#f59e0b] mb-1">{skill.level}</div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

function TagCloud() {
  return (
    <div className="flex flex-wrap justify-center gap-4 py-8">
      {SOFT_SKILLS.map((skill, i) => (
        <motion.span
          key={skill.name}
          className="inline-block px-4 py-2 rounded-full font-bold text-white bg-gradient-to-r from-[#10b981] to-[#f59e0b] shadow-lg cursor-pointer"
          style={{ fontSize: `${skill.size}em` }}
          whileHover={{ scale: 1.15, backgroundColor: "#10b981" }}
          transition={{ duration: 0.2 }}
        >
          {skill.name}
        </motion.span>
      ))}
    </div>
  );
}

function Certifications() {
  return (
    <div className="flex flex-wrap gap-6 justify-center py-8">
      {CERTIFICATIONS.map((cert, i) => (
        <motion.img
          key={cert.name}
          src={cert.badge}
          alt={cert.name}
          className="h-12 drop-shadow-lg rounded-xl bg-white/80 p-2 border-2 border-[#10b981]"
          initial={{ y: 0 }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

function LearningProgress() {
  return (
    <div className="flex flex-col items-center py-8">
      <h3 className="text-lg font-bold text-white mb-4">Currently Learning</h3>
      <div className="flex gap-6">
        {LEARNING.map((skill, i) => (
          <motion.div
            key={skill.name}
            className="flex flex-col items-center bg-white/10 border border-white/20 rounded-2xl shadow-lg p-4 backdrop-blur-xl"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          >
            <CircularProgress percent={skill.percent} color="#f59e0b" size={70}>
              <text
                x="50%"
                y="54%"
                textAnchor="middle"
                fontSize="1em"
                fill="#f59e0b"
                fontWeight="bold"
              >
                {skill.percent}%
              </text>
            </CircularProgress>
            <div className="mt-2 text-white text-sm font-semibold">{skill.name}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-24 bg-transparent px-4 md:px-12">
      <MeshBackground />
      <div className="relative z-10 flex flex-col items-center w-full">
        <h1 className="text-5xl font-extrabold mb-10 text-foreground">Skills</h1>
        {/* Skill categories accordion */}
        <div className="w-full max-w-5xl">
          {SKILL_CATEGORIES.map((cat, i) => (
            <SkillCategory
              key={cat.label}
              category={cat}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </div>
        {/* Soft skills tag cloud */}
        <h2 className="text-3xl font-bold text-white mt-16 mb-4">Soft Skills</h2>
        <TagCloud />
        {/* Certifications */}
        <h2 className="text-3xl font-bold text-white mt-16 mb-4">Certifications & Badges</h2>
        <Certifications />
        {/* Learning progress */}
        <LearningProgress />
      </div>
    </section>
  );
}