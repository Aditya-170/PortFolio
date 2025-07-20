"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCodeBranch, FaStar } from "react-icons/fa";

const PROJECTS = [
  {
    id: 1,
    title: "Next.js Portfolio",
    description: "A modern portfolio site built with Next.js, Tailwind CSS, and Framer Motion.",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&w=600&h=400&fit=crop",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    featured: true,
    github: "https://github.com/adityatiwari/nextjs-portfolio",
    demo: "https://nextjs-portfolio-demo.com",
    date: "2024-04-01",
    duration: "3 weeks",
    stars: 120,
    forks: 18,
    gif: "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif",
    caseStudy: "A deep dive into building a performant, animated portfolio with modern web tech.",
  },
  {
    id: 2,
    title: "Mobile Task Manager",
    description: "A cross-platform mobile app for task management, built with React Native.",
    image: "https://images.pexels.com/photos/4145196/pexels-photo-4145196.jpeg?auto=compress&w=600&h=400&fit=crop",
    tech: ["React Native", "Expo", "Redux"],
    featured: false,
    github: "https://github.com/adityatiwari/mobile-task-manager",
    demo: "https://expo.dev/@adityatiwari/task-manager",
    date: "2023-12-15",
    duration: "1 month",
    stars: 80,
    forks: 10,
    gif: "https://media.giphy.com/media/26ufnwz3wDUli7GU0/giphy.gif",
    caseStudy: "How I designed and shipped a productivity app for iOS and Android.",
  },
  {
    id: 3,
    title: "Desktop Markdown Editor",
    description: "A beautiful markdown editor for desktop, built with Electron.",
    image: "https://images.pexels.com/photos/4145195/pexels-photo-4145195.jpeg?auto=compress&w=600&h=400&fit=crop",
    tech: ["Electron", "React", "Node.js"],
    featured: false,
    github: "https://github.com/adityatiwari/markdown-editor",
    demo: "https://github.com/adityatiwari/markdown-editor/releases",
    date: "2023-09-10",
    duration: "2 months",
    stars: 60,
    forks: 7,
    gif: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
    caseStudy: "Lessons learned building a cross-platform desktop app.",
  },
  {
    id: 4,
    title: "Web Animation Playground",
    description: "A playground for experimenting with web animations and SVGs.",
    image: "https://images.pexels.com/photos/4145197/pexels-photo-4145197.jpeg?auto=compress&w=600&h=400&fit=crop",
    tech: ["React", "SVG", "GSAP"],
    featured: false,
    github: "https://github.com/adityatiwari/web-animation-playground",
    demo: "https://web-animation-playground.com",
    date: "2023-06-20",
    duration: "2 weeks",
    stars: 45,
    forks: 5,
    gif: "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif",
    caseStudy: "Creative coding with SVG and animation libraries.",
  },
];

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "Mobile", value: "mobile" },
  { label: "Desktop", value: "desktop" },
];

const TECH_COLORS = {
  "Next.js": "bg-black text-white",
  "Tailwind CSS": "bg-cyan-400 text-black",
  "Framer Motion": "bg-pink-500 text-white",
  "React Native": "bg-blue-500 text-white",
  "Expo": "bg-gray-800 text-white",
  "Redux": "bg-purple-600 text-white",
  "Electron": "bg-gray-700 text-white",
  "React": "bg-blue-400 text-white",
  "Node.js": "bg-green-600 text-white",
  "SVG": "bg-yellow-400 text-black",
  "GSAP": "bg-green-400 text-black",
};

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

function GlitchTitle({ children }) {
  return (
    <h1 className="relative text-5xl font-extrabold mb-10 text-white glitch-title">
      {children}
      <span aria-hidden className="absolute left-0 top-0 w-full h-full text-[#00fff7] opacity-60 glitch-title-1">{children}</span>
      <span aria-hidden className="absolute left-0 top-0 w-full h-full text-[#ff00ea] opacity-60 glitch-title-2">{children}</span>
    </h1>
  );
}

function TechBadge({ tech, idx, hovered }) {
  return (
    <motion.span
      className={`inline-block px-3 py-1 rounded-full text-xs font-bold mr-2 mb-2 transition-all duration-300 ${TECH_COLORS[tech] || "bg-gray-300 text-black"}`}
      initial={{ opacity: 0, y: 10 }}
      animate={hovered ? { opacity: 1, y: 0, scale: 1.1 } : { opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: hovered ? 0.2 + idx * 0.08 : 0, duration: 0.4 }}
    >
      {tech}
    </motion.span>
  );
}

function ProjectCard({ project, idx, onOpen, hoveredId, setHoveredId }) {
  const isFeatured = project.featured;
  const hovered = hoveredId === project.id;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.12, duration: 0.7, type: "spring" }}
      whileHover={{ rotateY: 8, rotateX: -4, scale: 1.04, zIndex: 2, boxShadow: "0 8px 32px 0 #10b98133" }}
      className={`relative group cursor-pointer flex flex-col justify-between rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${isFeatured ? "col-span-2 row-span-2" : ""}`}
      style={{ minHeight: isFeatured ? 420 : 320, background: "rgba(0,0,0,0.15)" }}
      onMouseEnter={() => setHoveredId(project.id)}
      onMouseLeave={() => setHoveredId(null)}
      onClick={() => onOpen(project)}
    >
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {project.gif && hovered && (
          <motion.img
            src={project.gif}
            alt="Demo gif"
            className="absolute inset-0 w-full h-full object-cover z-10 opacity-90 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          {project.tech.map((tech, i) => (
            <TechBadge key={tech} tech={tech} idx={i} hovered={hovered} />
          ))}
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#10b981] transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-200 text-base mb-3 flex-1">
          {project.description}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 rounded-full bg-[#10b981] text-white font-semibold shadow hover:bg-[#f59e0b] transition mr-2">
            <FaExternalLinkAlt className="mr-2" /> Live Demo
          </a>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 rounded-full bg-gray-900 text-white font-semibold shadow hover:bg-gray-700 transition">
            <FaGithub className="mr-2" /> GitHub
          </a>
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
          <span>{new Date(project.date).toLocaleDateString()}</span>
          <span>•</span>
          <span>{project.duration}</span>
        </div>
        <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
          <span><FaStar className="inline mr-1 text-yellow-400" /> {project.stars} Stars</span>
          <span><FaCodeBranch className="inline mr-1 text-blue-400" /> {project.forks} Forks</span>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 max-w-2xl w-full flex flex-col items-center relative backdrop-blur-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-[#10b981] text-2xl font-bold">&times;</button>
            <img src={project.image} alt={project.title} className="w-full h-64 object-cover rounded-xl mb-6" />
            <h2 className="text-3xl font-bold mb-2 text-white">{project.title}</h2>
            <p className="text-gray-200 mb-4 text-center">{project.caseStudy}</p>
            <div className="flex gap-3 mb-4">
              {project.tech.map((tech, i) => (
                <TechBadge key={tech} tech={tech} idx={i} hovered={true} />
              ))}
            </div>
            <div className="flex gap-4">
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 rounded-full bg-[#10b981] text-white font-semibold shadow hover:bg-[#f59e0b] transition mr-2">
                <FaExternalLinkAlt className="mr-2" /> Live Demo
              </a>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 rounded-full bg-gray-900 text-white font-semibold shadow hover:bg-gray-700 transition">
                <FaGithub className="mr-2" /> GitHub
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Project() {
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  // Filtered projects
  const filtered = filter === "all"
    ? PROJECTS
    : PROJECTS.filter(p =>
        (filter === "web" && p.tech.includes("Next.js")) ||
        (filter === "mobile" && p.tech.includes("React Native")) ||
        (filter === "desktop" && p.tech.includes("Electron"))
      );
  const featured = filtered.find(p => p.featured) || filtered[0];
  const others = filtered.filter(p => p.id !== featured.id);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-24 bg-transparent px-4 md:px-12">
      <MeshBackground />
      <div className="relative z-10 flex flex-col items-center w-full">
        <h1 className="text-5xl font-extrabold mb-10 text-foreground glitch-title">Projects</h1>
        {/* Filter buttons */}
        <div className="flex gap-4 mt-4 relative">
          <div className="absolute bottom-0 left-0 h-1 bg-[#10b981] rounded-full transition-all duration-300" style={{ width: 80, transform: `translateX(${FILTERS.findIndex(f => f.value === filter) * 90}px)` }} />
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-6 py-2 rounded-full font-semibold border-2 transition text-white/90 ${filter === f.value ? "bg-gradient-to-r from-[#10b981] to-[#f59e0b] border-transparent" : "border-white/30 bg-white/10 hover:bg-[#10b981]/10"}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      {/* Featured project spotlight */}
      <div className="w-full mb-12">
        {loading ? (
          <div className="w-full h-96 rounded-3xl animate-pulse" style={{ background: "rgba(0,0,0,0.10)" }} />
        ) : (
          <ProjectCard project={featured} idx={0} onOpen={setModal} hoveredId={hoveredId} setHoveredId={setHoveredId} />
        )}
      </div>
      {/* Project grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-2 md:px-8">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-80 rounded-2xl animate-pulse" style={{ background: "rgba(0,0,0,0.10)" }} />
            ))
          : others.map((project, idx) => (
              <ProjectCard key={project.id} project={project} idx={idx + 1} onOpen={setModal} hoveredId={hoveredId} setHoveredId={setHoveredId} />
            ))}
      </div>
      {/* Modal */}
      <ProjectModal project={modal} onClose={() => setModal(null)} />
    </section>
  );
}

/* Glitch effect utility classes (add to global CSS):
.glitch-title { position: relative; }
.glitch-title-1 { left: 2px; top: 2px; animation: glitch1 1.2s infinite linear alternate-reverse; }
.glitch-title-2 { left: -2px; top: -2px; animation: glitch2 1.2s infinite linear alternate-reverse; }
@keyframes glitch1 { 0% { opacity: 0.6; } 20% { opacity: 1; left: 4px; } 40% { left: 2px; } 60% { left: 6px; } 80% { left: 2px; } 100% { opacity: 0.6; } }
@keyframes glitch2 { 0% { opacity: 0.6; } 20% { opacity: 1; left: -4px; } 40% { left: -2px; } 60% { left: -6px; } 80% { left: -2px; } 100% { opacity: 0.6; } }
*/
