"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrophy, FaCertificate, FaAward, FaMedal, FaShareAlt } from "react-icons/fa";

const ACHIEVEMENTS = [
  {
    id: 1,
    type: "professional",
    icon: <FaTrophy className="text-yellow-400" size={36} />,
    title: "Winner - Hackathon 2023",
    metric: 1,
    metricLabel: "st Place",
    description: "Led a team to victory in a 48-hour hackathon, building a real-time collaboration tool.",
    date: "2023-08-22",
  },
  {
    id: 2,
    type: "academic",
    icon: <FaCertificate className="text-blue-400" size={36} />,
    title: "Full Stack Web Development",
    metric: 100,
    metricLabel: "%",
    description: "Completed a comprehensive program covering frontend and backend web development.",
    date: "2023-11-10",
  },
  {
    id: 3,
    type: "academic",
    icon: <FaAward className="text-purple-400" size={36} />,
    title: "UI/UX Design Specialization",
    metric: 5,
    metricLabel: "Certs",
    description: "Mastered user experience and interface design principles.",
    date: "2022-12-15",
  },
  {
    id: 4,
    type: "professional",
    icon: <FaMedal className="text-green-400" size={36} />,
    title: "Certified JavaScript Developer",
    metric: 1,
    metricLabel: "Cert",
    description: "Demonstrated advanced JavaScript skills through hands-on challenges.",
    date: "2022-05-10",
  },
  {
    id: 5,
    type: "personal",
    icon: <FaTrophy className="text-pink-400" size={36} />,
    title: "Internship - Webify Solutions",
    metric: 3,
    metricLabel: "Months",
    description: "Worked as a frontend intern, improving site performance and accessibility.",
    date: "2021-07-01",
  },
];

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Academic", value: "academic" },
  { label: "Professional", value: "professional" },
  { label: "Personal", value: "personal" },
];

function MeshBackground() {
  return (
    <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  );
}

function AnimatedCounter({ to, duration = 1.5 }) {
  const [count, setCount] = useState(0);
  // Animate on intersection
  const onView = () => {
    let start = 0;
    const step = () => {
      start += 1;
      setCount((prev) => (prev < to ? prev + 1 : to));
      if (start < to) setTimeout(step, (duration * 1000) / to);
    };
    step();
  };
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={onView}
      className="text-4xl md:text-5xl font-extrabold text-[#10b981] drop-shadow-lg"
    >
      {count}
    </motion.span>
  );
}

function AchievementCard({ ach, idx, onExpand, expanded }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ delay: idx * 0.15, duration: 0.7, type: "spring" }}
      whileHover={{ rotate: [0, (Math.random() > 0.5 ? 7 : -7)], scale: 1.06, zIndex: 2, boxShadow: "0 8px 32px 0 #10b98133" }}
      className={`relative group cursor-pointer flex flex-col justify-between bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6 min-h-[260px] backdrop-blur-xl overflow-hidden transition-all duration-300 ${expanded ? "z-30" : "z-10"} min-w-[260px] max-w-[320px] h-[320px]`}
      onClick={() => onExpand(ach.id)}
    >
      {/* Date badge */}
      <span className="absolute top-4 right-4 bg-[#10b981]/30 text-xs font-bold px-3 py-1 rounded-full border border-white/40 backdrop-blur-md text-white shadow">
        {new Date(ach.date).toLocaleDateString()}
      </span>
      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.2, y: -8 }}
        className="mb-4 flex items-center justify-center"
      >
        {ach.icon}
      </motion.div>
      {/* Counter */}
      <div className="flex items-end gap-2 mb-2">
        <AnimatedCounter to={ach.metric} />
        <span className="text-lg font-bold text-[#f59e0b] drop-shadow">{ach.metricLabel}</span>
      </div>
      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
        {ach.title}
      </h3>
      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-white/90 text-base mb-2"
      >
        {ach.description}
      </motion.p>
      {/* Share button */}
      <motion.button
        whileHover={{ scale: 1.2, rotate: 10 }}
        className="absolute bottom-4 right-4 bg-[#10b981]/30 p-2 rounded-full border border-white/40 text-white shadow hover:bg-[#f59e0b]/50 transition"
        onClick={e => { e.stopPropagation(); navigator.share && navigator.share({ title: ach.title, text: ach.description }); }}
        aria-label="Share achievement"
      >
        <FaShareAlt />
      </motion.button>
      {/* Expand overlay */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-8 rounded-2xl z-40"
          >
            <h4 className="text-2xl font-bold text-white mb-4">{ach.title}</h4>
            <p className="text-white/90 text-lg mb-4 text-center">{ach.description}</p>
            <button className="mt-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#10b981] to-[#f59e0b] text-white font-semibold shadow hover:scale-105 transition" onClick={e => { e.stopPropagation(); onExpand(null); }}>Close</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Achievements() {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);
  const [timeline, setTimeline] = useState(false);

  // Filtered achievements
  const filtered = filter === "all" ? ACHIEVEMENTS : ACHIEVEMENTS.filter(a => a.type === filter);

  // Custom layout: 3 in first row, 2 in second
  const firstRow = filtered.slice(0, 3);
  const secondRow = filtered.slice(3, 5);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-24 bg-transparent px-4 md:px-12">
      <div className="relative z-10 flex flex-col items-center w-full">
        <h1 className="text-5xl font-extrabold mb-10 text-foreground">Achievements</h1>
        {/* Filters and timeline toggle */}
        <div className="flex flex-wrap gap-4 mb-8 items-center">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-5 py-2 rounded-full font-semibold border-2 transition text-white/90 ${filter === f.value ? "bg-gradient-to-r from-[#10b981] to-[#f59e0b] border-transparent" : "border-white/30 bg-white/10 hover:bg-[#10b981]/10"}`}
            >
              {f.label}
            </button>
          ))}
          <button
            onClick={() => setTimeline(v => !v)}
            className="ml-4 px-5 py-2 rounded-full font-semibold border-2 border-white/30 text-white/90 bg-white/10 hover:bg-[#10b981]/10 transition"
          >
            {timeline ? "Grid View" : "Timeline View"}
          </button>
        </div>
        {/* Achievements Grid or Timeline */}
        <div className="w-full">
          <AnimatePresence mode="popLayout">
            {!timeline ? (
              <div className="flex flex-col gap-8">
                <div className="flex flex-row gap-8 justify-center px-2 md:px-8">
                  {firstRow.map((ach, idx) => (
                    <AchievementCard key={ach.id} ach={ach} idx={idx} onExpand={setExpanded} expanded={expanded === ach.id} />
                  ))}
                </div>
                {secondRow.length > 0 && (
                  <div className="flex flex-row gap-8 justify-center px-2 md:px-8">
                    {secondRow.map((ach, idx) => (
                      <AchievementCard key={ach.id} ach={ach} idx={idx + 3} onExpand={setExpanded} expanded={expanded === ach.id} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-8 timeline-view">
                {filtered.map((ach, idx) => (
                  <AchievementCard key={ach.id} ach={ach} idx={idx} onExpand={setExpanded} expanded={expanded === ach.id} />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// Glassmorphism utility class
// Add this to your global CSS if not present:
// .glass-card { backdrop-filter: blur(16px); background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18); }
// .masonry-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); grid-auto-rows: minmax(260px, auto); gap: 2rem; }
// .timeline-view > * { border-left: 4px solid #8b5cf6; margin-left: 2rem; padding-left: 2rem; position: relative; }
// .timeline-view > *:before { content: ""; position: absolute; left: -2.5rem; top: 1.5rem; width: 1.5rem; height: 1.5rem; background: linear-gradient(120deg, #8b5cf6, #3b82f6); border-radius: 50%; box-shadow: 0 0 0 4px #fff3; }
