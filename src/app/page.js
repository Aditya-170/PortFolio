"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

export default function Home() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-blue-900">
      {/* Removed animated background particles */}
      <section id="home" className="relative z-10 w-full min-h-screen flex flex-col justify-center items-center py-24">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-center bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
          Hi, I'm Aditya Tiwari(HOD)
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-700 dark:text-gray-200 text-center">
          Creative Full Stack Developer
        </h2>
        <div className="text-xl sm:text-2xl font-mono text-blue-700 dark:text-blue-300 mb-8 h-10 text-center">
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
          className="inline-block px-8 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition text-lg mt-4"
        >
          View My Work
        </a>
      </section>
      <section id="about" className="relative w-full min-h-screen flex flex-col justify-center items-center py-24 bg-gray-50 dark:bg-gray-900 z-10">
        <div className="max-w-4xl w-full flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
          <div className="flex flex-col items-center md:items-start md:w-1/3 w-full">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-400 shadow-lg mb-4 md:mb-6 md:mr-0"
            />
            <h2 className="text-3xl font-bold mb-2 text-center md:text-left">Aditya Tiwari</h2>
            <p className="text-gray-700 dark:text-gray-200 text-center md:text-left mb-4">
              Passionate full stack developer with a knack for building beautiful, performant web apps. Always learning, always creating.
            </p>
            <a
              href="/resume-placeholder.pdf"
              download
              className="inline-block px-6 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition text-base mt-2"
            >
              Download Resume
            </a>
          </div>
          <div className="flex-1 w-full md:w-2/3 mt-8 md:mt-0">
            <h3 className="text-xl font-semibold mb-6 text-blue-600 dark:text-blue-300">Timeline</h3>
            <ol className="relative border-l-4 border-blue-200 dark:border-blue-700 pl-6 space-y-10">
              <li className="relative">
                <span className="absolute -left-7 top-1 w-5 h-5 bg-blue-500 border-4 border-white dark:border-gray-800 rounded-full shadow"></span>
                <div className="bg-blue-50 dark:bg-blue-900/40 rounded-lg p-5 shadow-sm">
                  <h4 className="font-bold text-lg mb-1 text-blue-700 dark:text-blue-200">Senior Developer @ TechNova</h4>
                  <time className="block mb-1 text-xs font-medium text-gray-500">2022 - Present</time>
                  <p className="text-base text-gray-600 dark:text-gray-300">Leading a team to build scalable SaaS solutions for global clients.</p>
                </div>
              </li>
              <li className="relative">
                <span className="absolute -left-7 top-1 w-5 h-5 bg-blue-500 border-4 border-white dark:border-gray-800 rounded-full shadow"></span>
                <div className="bg-blue-50 dark:bg-blue-900/40 rounded-lg p-5 shadow-sm">
                  <h4 className="font-bold text-lg mb-1 text-blue-700 dark:text-blue-200">B.Sc. Computer Science, State University</h4>
                  <time className="block mb-1 text-xs font-medium text-gray-500">2018 - 2022</time>
                  <p className="text-base text-gray-600 dark:text-gray-300">Graduated with honors, specialized in web development and UI/UX design.</p>
                </div>
              </li>
              <li className="relative">
                <span className="absolute -left-7 top-1 w-5 h-5 bg-blue-500 border-4 border-white dark:border-gray-800 rounded-full shadow"></span>
                <div className="bg-blue-50 dark:bg-blue-900/40 rounded-lg p-5 shadow-sm">
                  <h4 className="font-bold text-lg mb-1 text-blue-700 dark:text-blue-200">Intern @ Webify Solutions</h4>
                  <time className="block mb-1 text-xs font-medium text-gray-500">Summer 2021</time>
                  <p className="text-base text-gray-600 dark:text-gray-300">Worked on frontend features and improved site performance by 30%.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>
      <section id="skills" className="w-full min-h-screen flex flex-col justify-center items-center py-24">
        <h1 className="text-4xl font-bold mb-8">Skills</h1>
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Frontend */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center group transition-transform hover:scale-105">
            <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-300">Frontend</h2>
            <SkillBar skill="React" percent={90} info="Advanced with hooks, context, and performance optimization." />
            <SkillBar skill="Next.js" percent={85} info="SSR, SSG, API routes, and advanced routing." />
            <SkillBar skill="Tailwind CSS" percent={80} info="Rapid prototyping and custom design systems." />
            <SkillBar skill="JavaScript" percent={92} info="ES6+, async/await, and modern patterns." />
          </div>
          {/* Backend */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center group transition-transform hover:scale-105">
            <h2 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-300">Backend</h2>
            <SkillBar skill="Node.js" percent={88} info="REST APIs, Express, and real-time apps." />
            <SkillBar skill="MongoDB" percent={80} info="Schema design, aggregation, and performance." />
            <SkillBar skill="PostgreSQL" percent={75} info="Relational data modeling and queries." />
            <SkillBar skill="Firebase" percent={70} info="Authentication, Firestore, and hosting." />
          </div>
          {/* Tools */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center group transition-transform hover:scale-105">
            <h2 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-300">Tools</h2>
            <SkillBar skill="Git & GitHub" percent={90} info="Branching, PRs, and team workflows." />
            <SkillBar skill="Figma" percent={70} info="UI/UX design and prototyping." />
            <SkillBar skill="Vercel" percent={80} info="Deployment, serverless, and analytics." />
            <SkillBar skill="Jest" percent={65} info="Unit and integration testing." />
          </div>
        </div>
      </section>
      <section id="projects" className="w-full min-h-screen flex flex-col justify-center items-center py-24 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-4xl font-bold mb-8">Projects</h1>
        <ProjectSection />
      </section>
      <section id="blog" className="w-full min-h-screen flex flex-col justify-center items-center py-24">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <BlogSection />
      </section>
      <section id="achievements" className="w-full min-h-screen flex flex-col justify-center items-center py-24 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-4xl font-bold mb-8">Achievements & Certifications</h1>
        <AchievementsSection />
      </section>
      <section id="contact" className="w-full min-h-screen flex flex-col justify-center items-center py-24">
        <h1 className="text-4xl font-bold mb-8">Contact</h1>
        <ContactSection />
      </section>
    </div>
  );
}

const projectsData = [
  {
    title: "Portfolio Website",
    image: "https://source.unsplash.com/400x300/?website,design",
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    github: "https://github.com/example/portfolio",
    demo: "https://portfolio.example.com",
    description: "A personal portfolio website to showcase my work, skills, and blog posts. Fully responsive and built with Next.js and Tailwind CSS.",
    category: "Frontend",
  },
  {
    title: "Chat App",
    image: "https://source.unsplash.com/400x300/?chat,app",
    tech: ["React", "Node.js", "Socket.io"],
    github: "https://github.com/example/chat-app",
    demo: "https://chat.example.com",
    description: "A real-time chat application with group and private messaging, built using React, Node.js, and Socket.io.",
    category: "Full Stack",
  },
  {
    title: "E-commerce Dashboard",
    image: "https://source.unsplash.com/400x300/?dashboard,ecommerce",
    tech: ["Next.js", "MongoDB", "Chart.js"],
    github: "https://github.com/example/ecommerce-dashboard",
    demo: "https://dashboard.example.com",
    description: "An admin dashboard for managing products, orders, and analytics for an e-commerce platform.",
    category: "Backend",
  },
  {
    title: "Blog Platform",
    image: "https://source.unsplash.com/400x300/?blog,writing",
    tech: ["React", "Firebase", "Markdown"],
    github: "https://github.com/example/blog-platform",
    demo: "https://blog.example.com",
    description: "A markdown-based blog platform with authentication and live preview, built with React and Firebase.",
    category: "Frontend",
  },
];

const categories = ["All", ...Array.from(new Set(projectsData.map(p => p.category)))];

function ProjectSection() {
  const [selected, setSelected] = useState("All");
  const [modal, setModal] = useState(null);
  const filtered = selected === "All" ? projectsData : projectsData.filter(p => p.category === selected);
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-2 rounded-full font-medium border transition-colors text-sm ${selected === cat ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900"}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {filtered.map((proj, idx) => (
          <div key={proj.title} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col group hover:scale-105 transition-transform">
            <img src={proj.image} alt={proj.title} className="w-full h-48 object-cover" />
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-2">{proj.title}</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {proj.tech.map(t => (
                  <span key={t} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-mono">{t}</span>
                ))}
              </div>
              <div className="flex gap-3 mt-auto">
                <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 underline text-sm">GitHub</a>
                <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 underline text-sm">Live Demo</a>
                <button onClick={() => setModal(idx)} className="ml-auto px-3 py-1 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700 transition">Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {modal !== null && (
        <ProjectModal project={filtered[modal]} onClose={() => setModal(null)} />
      )}
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-lg w-full p-8 relative animate-fadeIn">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 text-2xl font-bold">&times;</button>
        <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded mb-4" />
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {project.tech.map(t => (
            <span key={t} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-mono">{t}</span>
          ))}
        </div>
        <p className="text-gray-700 dark:text-gray-200 mb-4">{project.description}</p>
        <div className="flex gap-4">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded text-sm font-semibold hover:bg-blue-100 dark:hover:bg-blue-900 transition">GitHub</a>
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-semibold hover:bg-blue-700 transition">Live Demo</a>
        </div>
      </div>
    </div>
  );
}

const blogPosts = [
  {
    title: "How to Build a Stunning Portfolio with Next.js",
    date: "2024-05-01",
    excerpt: "Learn how to create a modern, responsive portfolio using Next.js, Tailwind CSS, and shadcn/ui.",
    content: `# How to Build a Stunning Portfolio with Next.js\n\nNext.js makes it easy to build fast, SEO-friendly web apps. Combine it with Tailwind CSS and shadcn/ui for a beautiful developer experience.\n\n## Steps\n- Scaffold your app with \`create-next-app\`\n- Add Tailwind CSS for utility-first styling\n- Use shadcn/ui for accessible, customizable components\n- Deploy on Vercel for best performance\n\nHappy coding!`,
  },
  {
    title: "Mastering React State Management",
    date: "2024-04-15",
    excerpt: "A deep dive into state management patterns in React, from useState to Redux and beyond.",
    content: `# Mastering React State Management\n\nManaging state in React can be simple or complex depending on your app's needs.\n\n## Popular Approaches\n- useState and useContext for local/global state\n- Redux for large-scale apps\n- Zustand and Jotai for modern alternatives\n\nChoose the right tool for your project!`,
  },
  {
    title: "Deploying Your App with Vercel",
    date: "2024-03-28",
    excerpt: "A step-by-step guide to deploying your Next.js app on Vercel for free.",
    content: `# Deploying Your App with Vercel\n\nVercel offers seamless deployment for Next.js apps.\n\n1. Connect your GitHub repo\n2. Import your project\n3. Configure environment variables\n4. Deploy and enjoy!\n\nYour site is live in minutes.`,
  },
];

function BlogSection() {
  const [modal, setModal] = useState(null);
  return (
    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
      {blogPosts.map((post, idx) => (
        <div key={post.title} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col hover:scale-105 transition-transform">
          <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
          <span className="text-sm text-gray-500 mb-2">{new Date(post.date).toLocaleDateString()}</span>
          <p className="text-gray-700 dark:text-gray-200 mb-4">{post.excerpt}</p>
          <button
            onClick={() => setModal(idx)}
            className="mt-auto px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition"
          >
            Read More
          </button>
        </div>
      ))}
      {modal !== null && (
        <BlogModal post={blogPosts[modal]} onClose={() => setModal(null)} />
      )}
    </div>
  );
}

function BlogModal({ post, onClose }) {
  function renderMarkdown(md) {
    return md
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-2">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-2">$1</h2>')
      .replace(/^\- (.*$)/gim, '<li>$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
      .replace(/\n/g, '<br />');
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-lg w-full p-8 relative animate-fadeIn overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 text-2xl font-bold">&times;</button>
        <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
        <span className="text-sm text-gray-500 mb-4 block">{new Date(post.date).toLocaleDateString()}</span>
        <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
      </div>
    </div>
  );
}

const achievements = [
  {
    title: "Full Stack Web Development",
    issuer: "Coursera / Meta",
    date: "2023-11-10",
    image: "https://images.pexels.com/photos/4145196/pexels-photo-4145196.jpeg?auto=compress&w=400&h=300&fit=crop",
    description: "Completed a comprehensive program covering frontend and backend web development."
  },
  {
    title: "Winner - Hackathon 2023",
    issuer: "TechNova Hackfest",
    date: "2023-08-22",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&w=400&h=300&fit=crop",
    description: "Led a team to victory in a 48-hour hackathon, building a real-time collaboration tool."
  },
  {
    title: "UI/UX Design Specialization",
    issuer: "Google / Coursera",
    date: "2022-12-15",
    image: "https://images.pexels.com/photos/4145195/pexels-photo-4145195.jpeg?auto=compress&w=400&h=300&fit=crop",
    description: "Mastered user experience and interface design principles."
  },
  {
    title: "Internship - Webify Solutions",
    issuer: "Webify Solutions",
    date: "2021-07-01",
    image: "https://images.pexels.com/photos/1181672/pexels-photo-1181672.jpeg?auto=compress&w=400&h=300&fit=crop",
    description: "Worked as a frontend intern, improving site performance and accessibility."
  },
  {
    title: "Certified JavaScript Developer",
    issuer: "HackerRank",
    date: "2022-05-10",
    image: "https://images.pexels.com/photos/4145197/pexels-photo-4145197.jpeg?auto=compress&w=400&h=300&fit=crop",
    description: "Demonstrated advanced JavaScript skills through hands-on challenges."
  },
];

function AchievementsSection() {
  return (
    <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {achievements.map((ach, idx) => (
        <div
          key={ach.title}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col items-center p-4 group transition-transform hover:scale-105 cursor-pointer relative"
        >
          <img
            src={ach.image}
            alt={ach.title}
            className="w-full h-40 object-cover rounded mb-4 group-hover:scale-110 transition-transform duration-300"
          />
          <h3 className="text-lg font-bold mb-1 text-center">{ach.title}</h3>
          <span className="text-sm text-blue-600 dark:text-blue-300 mb-1">{ach.issuer}</span>
          <span className="text-xs text-gray-500 mb-2">{new Date(ach.date).toLocaleDateString()}</span>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 bg-white/90 dark:bg-gray-900/90 flex flex-col items-center justify-center p-4 rounded-xl text-center pointer-events-none">
            <p className="text-gray-700 dark:text-gray-200 text-sm mb-2">{ach.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const socialLinks = [
  { label: "GitHub", url: "https://github.com/alexcarter", icon: "M12 2C6.48 2 2 6.58 2 12.26c0 4.49 2.87 8.3 6.84 9.64.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0112 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0022 12.26C22 6.58 17.52 2 12 2z" },
  { label: "LinkedIn", url: "https://linkedin.com/in/alexcarter", icon: "M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" },
  { label: "Twitter", url: "https://twitter.com/alexcarterdev", icon: "M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.29 3.9A12.13 12.13 0 013 4.8a4.28 4.28 0 001.32 5.71c-.7-.02-1.36-.21-1.94-.53v.05a4.28 4.28 0 003.43 4.19c-.33.09-.68.14-1.04.14-.25 0-.5-.02-.74-.07a4.29 4.29 0 004 2.98A8.6 8.6 0 012 19.54a12.13 12.13 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19-.01-.39-.02-.58A8.72 8.72 0 0024 4.59a8.48 8.48 0 01-2.54.7z" },
];

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
      return;
    }
    // Placeholder for EmailJS/backend integration
    setTimeout(() => {
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    }, 1000);
  };
  return (
    <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-center">
      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows={5}
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.message}
          onChange={handleChange}
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">Message sent successfully!</div>}
        <button
          type="submit"
          className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition text-base mt-2"
        >
          Send Message
        </button>
      </form>
      <div className="flex gap-6 mt-8">
        {socialLinks.map(link => (
          <a
            key={link.label}
            href={link.url}
          target="_blank"
          rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            aria-label={link.label}
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d={link.icon} />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
