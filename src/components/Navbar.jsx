"use client";
import { useState, useEffect } from "react";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Blog" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

function useDarkMode() {
  useEffect(() => {
    document.documentElement.classList.add("dark"); // Set dark mode by default
  }, []);
  const toggle = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };
  return toggle;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const toggleDarkMode = useDarkMode();

  useEffect(() => {
    // Set dark mode by default on mount
    document.documentElement.classList.add("dark");
    setIsDark(true);
    // Check localStorage for theme preference
    const theme = localStorage.getItem("theme");
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const handleToggle = () => {
    toggleDarkMode();
    setIsDark((v) => !v);
  };

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
        <div className="font-bold text-xl tracking-tight cursor-pointer" onClick={() => handleScroll("home")}>Buildfolio</div>
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleScroll(link.id)}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={handleToggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {isDark ? (
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.22a1 1 0 011.42 1.42l-.7.7a1 1 0 11-1.42-1.42l.7-.7zM18 9a1 1 0 100 2h-1a1 1 0 100-2h1zm-2.22 6.78a1 1 0 00-1.42 1.42l.7.7a1 1 0 001.42-1.42l-.7-.7zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-6.22-1.22a1 1 0 00-1.42 1.42l.7.7a1 1 0 001.42-1.42l-.7-.7zM4 11a1 1 0 100-2H3a1 1 0 100 2h1zm2.22-6.78a1 1 0 00-1.42-1.42l-.7.7a1 1 0 101.42 1.42l.7-.7zM10 6a4 4 0 100 8 4 4 0 000-8z" /></svg>
            ) : (
              <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
            )}
          </button>
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-black/95 border-t border-gray-200 dark:border-gray-800 px-4 py-2 flex flex-col gap-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleScroll(link.id)}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors px-2 py-2 rounded text-left focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
} 