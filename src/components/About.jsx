"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";

// MeshBackground copied from Contact section
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

const PERSONALITY_BADGES = [
  { label: "Innovative", color: "bg-[#10b981] text-white" },
  { label: "Team Player", color: "bg-[#f59e0b] text-white" },
  { label: "Lifelong Learner", color: "bg-blue-500 text-white" },
  { label: "Problem Solver", color: "bg-purple-500 text-white" },
];

const YEARS_EXPERIENCE = 2;

function AnimatedCounter({ to, duration = 2 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = () => {
      start += 1;
      setCount((prev) => (prev < to ? prev + 1 : to));
      if (start < to) setTimeout(step, (duration * 1000) / to);
    };
    step();
  }, [to]);
  return <span>{count}+</span>;
}

function FloatingBadge({ label, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className={`px-4 py-2 rounded-full font-semibold shadow-lg text-sm ${color}`}
      style={{ zIndex: 2 }}
    >
      {label}
    </motion.div>
  );
}

export default function About() {
  const photoRef = useRef(null);
  const [photoTilt, setPhotoTilt] = useState({ x: 0, y: 0 });
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Parallax effect for background (optional, can be removed for simplicity)
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const y = rect.top / window.innerHeight;
      controls.start({ backgroundPositionY: `${y * 60}px` });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  // Photo tilt effect
  const handlePhotoMove = (e) => {
    const rect = photoRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setPhotoTilt({ x, y });
  };
  const handlePhotoLeave = () => setPhotoTilt({ x: 0, y: 0 });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-center py-24 overflow-hidden"
      style={{ background: "transparent" }}
    >
      <MeshBackground />
      <motion.div
        className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full gap-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex-1 flex flex-col items-start justify-center px-6 md:px-16 mb-12 md:mb-0">
          <h1 className="text-5xl font-extrabold text-foreground mb-4">About Me</h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-xl"> I'm a 3rd-year Computer Science undergraduate at NIT Jamshedpur with a strong foundation in full-stack development, machine learning, and computer science fundamentals. I build intelligent, scalable web platforms and enjoy solving real-world problems through tech. Passionate about clean code, continuous learning, and meaningful impact.</p>
          <div className="flex items-center gap-8 mb-8">
            <div className="flex flex-col items-center">
              <span className="text-5xl font-bold text-primary">
                <AnimatedCounter to={YEARS_EXPERIENCE} />
              </span>
              <span className="text-base text-muted-foreground font-mono">Years Experience</span>
            </div>
            <div className="flex flex-wrap gap-3 relative min-h-[48px]">
              {PERSONALITY_BADGES.map((badge, i) => (
                <FloatingBadge key={badge.label} label={badge.label} color={badge.color} delay={0.3 + i * 0.2} />
              ))}
            </div>
          </div>
          <button
            className="relative px-8 py-3 rounded-full bg-primary text-white font-bold shadow-lg hover:bg-secondary transition text-lg mt-6 overflow-hidden"
          >
            <a href="/resume_portfolio.pdf" download>
              Download Resume
            </a>
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center mt-12 md:mt-0">
          <motion.div
            ref={photoRef}
            className="relative w-64 h-64 rounded-full overflow-hidden shadow-2xl border-4 border-primary group glass-card"
            style={{
              transform: `rotateY(${photoTilt.x}deg) rotateX(${-photoTilt.y}deg) scale(1.04)`,
              transition: "transform 0.2s cubic-bezier(.22,1,.36,1)",
              background: "radial-gradient(circle at 60% 40%, #10b98144 0%, transparent 100%)",
            }}
            onMouseMove={handlePhotoMove}
            onMouseLeave={handlePhotoLeave}
          >
            <Image
              src="/image_portfolio.jpg"
              alt="Personal Photo"
              fill
              className="object-cover group-hover:scale-105 group-hover:blur-[1px] transition duration-500"
              priority
            />
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              initial={{ opacity: 0.5 }}
              whileHover={{ opacity: 0.8, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              style={{
                background:
                  "radial-gradient(circle at 60% 40%, #10b98188 0%, transparent 70%)",
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
