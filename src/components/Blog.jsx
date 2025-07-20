"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaBookmark, FaRegBookmark, FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";

const BLOG_POSTS = [
  {
    id: 1,
    title: "How to Build a Stunning Portfolio with Next.js",
    excerpt: "Learn how to create a modern, responsive portfolio using Next.js, Tailwind CSS, and shadcn/ui.",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&w=600&h=400&fit=crop",
    date: "2024-05-01",
    readTime: "5 min read",
    author: "Ujjwal Singh",
    authorImg: "https://randomuser.me/api/portraits/men/32.jpg",
    category: "Development",
    content: `# How to Build a Stunning Portfolio with Next.js\n\nNext.js makes it easy to build fast, SEO-friendly web apps. Combine it with Tailwind CSS and shadcn/ui for a beautiful developer experience.\n\n## Steps\n- Scaffold your app with \`create-next-app\`\n- Add Tailwind CSS for utility-first styling\n- Use shadcn/ui for accessible, customizable components\n- Deploy on Vercel for best performance\n\nHappy coding!`,
    featured: true,
    likes: 12,
    bookmarked: false,
  },
  {
    id: 2,
    title: "Mastering React State Management",
    excerpt: "A deep dive into state management patterns in React, from useState to Redux and beyond.",
    image: "https://images.pexels.com/photos/4145196/pexels-photo-4145196.jpeg?auto=compress&w=600&h=400&fit=crop",
    date: "2024-04-15",
    readTime: "7 min read",
    author: "Ujjwal Singh",
    authorImg: "https://randomuser.me/api/portraits/men/32.jpg",
    category: "React",
    content: `# Mastering React State Management\n\nManaging state in React can be simple or complex depending on your app's needs.\n\n## Popular Approaches\n- useState and useContext for local/global state\n- Redux for large-scale apps\n- Zustand and Jotai for modern alternatives\n\nChoose the right tool for your project!`,
    featured: false,
    likes: 8,
    bookmarked: false,
  },
  {
    id: 3,
    title: "Deploying Your App with Vercel",
    excerpt: "A step-by-step guide to deploying your Next.js app on Vercel for free.",
    image: "https://images.pexels.com/photos/4145195/pexels-photo-4145195.jpeg?auto=compress&w=600&h=400&fit=crop",
    date: "2024-03-28",
    readTime: "4 min read",
    author: "Ujjwal Singh",
    authorImg: "https://randomuser.me/api/portraits/men/32.jpg",
    category: "Deployment",
    content: `# Deploying Your App with Vercel\n\nVercel offers seamless deployment for Next.js apps.\n\n1. Connect your GitHub repo\n2. Import your project\n3. Configure environment variables\n4. Deploy and enjoy!\n\nYour site is live in minutes.`,
    featured: false,
    likes: 5,
    bookmarked: false,
  },
  {
    id: 4,
    title: "UI/UX Design Principles for Developers",
    excerpt: "Essential UI/UX design tips for developers to create user-friendly interfaces.",
    image: "https://images.pexels.com/photos/4145197/pexels-photo-4145197.jpeg?auto=compress&w=600&h=400&fit=crop",
    date: "2024-03-10",
    readTime: "6 min read",
    author: "Ujjwal Singh",
    authorImg: "https://randomuser.me/api/portraits/men/32.jpg",
    category: "Design",
    content: `# UI/UX Design Principles for Developers\n\nLearn the basics of UI/UX to improve your web apps.\n\n- Consistency\n- Feedback\n- Accessibility\n- Visual hierarchy\n\nMake your apps delightful!`,
    featured: false,
    likes: 6,
    bookmarked: false,
  },
];

const CATEGORIES = [
  "All",
  ...Array.from(new Set(BLOG_POSTS.map((p) => p.category))),
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

function AnimatedUnderline() {
  return (
    <motion.div
      layoutId="underline"
      className="h-1 w-24 bg-gradient-to-r from-[#10b981] to-[#f59e0b] rounded-full mt-2 mb-8"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.7 }}
    />
  );
}

function ReadingProgress({ targetRef }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleScroll = () => {
      if (!targetRef.current) return;
      const rect = targetRef.current.getBoundingClientRect();
      const winHeight = window.innerHeight;
      const total = rect.height - winHeight / 2;
      const scrolled = Math.min(Math.max(winHeight / 2 - rect.top, 0), total);
      setProgress(total > 0 ? scrolled / total : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [targetRef]);
  return (
    <div className="absolute top-0 left-0 w-full h-1 bg-gray-200/40">
      <div
        className="h-1 bg-gradient-to-r from-[#10b981] to-[#f59e0b]"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

function BlogCard({ post, onOpen, idx }) {
  const [liked, setLiked] = useState(post.likes > 0);
  const [bookmarked, setBookmarked] = useState(post.bookmarked);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.15, duration: 0.7, type: "spring" }}
      whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 #10b98133" }}
      className="relative rounded-2xl shadow-2xl overflow-hidden flex flex-col cursor-pointer group transition-all duration-300"
      onClick={() => onOpen(post)}
      style={{ background: "rgba(0,0,0,0.15)" }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#10b981]/80 text-white group-hover:bg-[#f59e0b]/90 transition-colors duration-300">
          {post.category}
        </span>
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <motion.button
            whileTap={{ scale: 1.2 }}
            className="bg-white/80 p-2 rounded-full shadow hover:bg-[#10b981]/20"
            onClick={e => { e.stopPropagation(); setLiked(v => !v); }}
            aria-label="Like post"
          >
            {liked ? <FaHeart className="text-pink-500" /> : <FaRegHeart className="text-gray-400" />}
          </motion.button>
          <motion.button
            whileTap={{ scale: 1.2 }}
            className="bg-white/80 p-2 rounded-full shadow hover:bg-[#10b981]/20"
            onClick={e => { e.stopPropagation(); setBookmarked(v => !v); }}
            aria-label="Bookmark post"
          >
            {bookmarked ? <FaBookmark className="text-[#10b981]" /> : <FaRegBookmark className="text-gray-400" />}
          </motion.button>
          <motion.button
            whileTap={{ scale: 1.2 }}
            className="bg-white/80 p-2 rounded-full shadow hover:bg-[#10b981]/20"
            onClick={e => { e.stopPropagation(); navigator.share && navigator.share({ title: post.title, text: post.excerpt }); }}
            aria-label="Share post"
          >
            <FaShareAlt className="text-gray-500" />
          </motion.button>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-1 text-white group-hover:text-[#10b981] transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-200 text-base mb-2 flex-1">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <img src={post.authorImg} alt={post.author} className="w-8 h-8 rounded-full object-cover" />
          <span className="text-sm text-gray-400">{post.author}</span>
          <span className="text-xs text-gray-400">{new Date(post.date).toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  );
}

function FeaturedPost({ post, onOpen }) {
  const heroRef = useRef();
  const inView = useInView(heroRef, { once: true });
  return (
    <motion.div
      ref={heroRef}
      className="relative w-full h-[340px] md:h-[420px] rounded-3xl overflow-hidden shadow-2xl mb-12 cursor-pointer group"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      onClick={() => onOpen(post)}
      style={{ background: "rgba(0,0,0,0.10)" }}
    >
      <div className="absolute inset-0 z-0">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          style={{ willChange: "transform" }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        <ReadingProgress targetRef={heroRef} />
      </div>
      <div className="absolute bottom-0 left-0 p-8 z-10 w-full">
        <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-bold bg-[#10b981]/80 text-white group-hover:bg-[#f59e0b]/90 transition-colors duration-300">
          {post.category}
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-lg">
          {post.title}
        </h2>
        <p className="text-lg text-white/90 mb-3 max-w-2xl drop-shadow">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-4 text-white/80 text-sm">
          <span>{post.readTime}</span>
          <span>•</span>
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white/10 border border-white/20 rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative animate-fadeIn overflow-y-auto max-h-[90vh] backdrop-blur-xl">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-[#10b981] text-2xl font-bold">&times;</button>
        <h3 className="text-2xl font-bold mb-2 text-white">{post.title}</h3>
        <span className="text-sm text-gray-400 mb-4 block">{new Date(post.date).toLocaleDateString()}</span>
        <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
      </div>
    </div>
  );
}

export default function Blog() {
  const [modal, setModal] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  // Filtered posts
  const posts = BLOG_POSTS.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      (p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase()))
  );
  const featured = posts.find((p) => p.featured) || posts[0];
  const recent = posts.filter((p) => p.id !== featured.id).slice(0, 3);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-24 bg-transparent px-4 md:px-12">
      <MeshBackground />
      <div className="relative z-10 flex flex-col items-center w-full">
        <h1 className="text-5xl font-extrabold mb-10 text-foreground">Blog</h1>
        <AnimatedUnderline />
        {/* Search and filter */}
        <div className="flex gap-4 mt-4 mb-16">
          <motion.input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="px-5 py-2 rounded-full border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#10b981] w-48 backdrop-blur-xl"
            whileFocus={{ width: 220 }}
            transition={{ duration: 0.3 }}
          />
          <div className="flex gap-2">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors border-2 ${category === cat ? "bg-gradient-to-r from-[#10b981] to-[#f59e0b] text-white border-transparent" : "border-white/30 bg-white/10 text-white hover:bg-[#10b981]/10"}`}
                whileHover={{ scale: 1.08, backgroundColor: "#10b981" }}
                transition={{ duration: 0.2 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
      {/* Featured post */}
      <div className="w-full mt-8">
        <FeaturedPost post={featured} onOpen={setModal} />
      </div>
      {/* Recent posts grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 px-2 md:px-8">
        {recent.map((post, idx) => (
          <BlogCard key={post.id} post={post} onOpen={setModal} idx={idx} />
        ))}
      </div>
      {/* View all posts button */}
      <motion.button
        className="mt-12 px-8 py-3 rounded-full bg-[#10b981] text-white font-semibold shadow-lg hover:bg-[#f59e0b] transition text-lg flex items-center gap-3 group"
        whileHover={{ scale: 1.08 }}
      >
        View All Posts
        <motion.span
          className="inline-block"
          animate={{ x: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          →
        </motion.span>
      </motion.button>
      {/* Modal */}
      <AnimatePresence>
        {modal && <BlogModal post={modal} onClose={() => setModal(null)} />}
      </AnimatePresence>
    </section>
  );
}
