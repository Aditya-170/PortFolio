"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter, FaCheckCircle, FaCopy } from "react-icons/fa";

const CONTACT_INFO = [
  {
    label: "Email",
    value: "ujjwalchauhan654@gmail.com",
    icon: <FaEnvelope className="text-[#10b981]" size={22} />,
    type: "email",
  },
  {
    label: "Phone",
    value: "+91 9341658004",
    icon: <FaPhone className="text-[#f59e0b]" size={22} />,
    type: "phone",
  },
  {
    label: "Location",
    value: "Jamshedpur, Jharkhand",
    icon: <FaMapMarkerAlt className="text-blue-400" size={22} />,
    type: "location",
  },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/ujjwal",
    icon: <FaLinkedin size={22} />,
    color: "#0e76a8",
  },
  {
    label: "GitHub",
    url: "https://github.com/Ujjwal-singh32",
    icon: <FaGithub size={22} />,
    color: "#333",
  },
  {
    label: "Twitter",
    url: "https://twitter.com/adityatiwari",
    icon: <FaTwitter size={22} />,
    color: "#1da1f2",
  },
];

function MeshBackground() {
  // Subtle animated mesh pattern using SVG
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

function FloatingLabelInput({ label, type, name, value, onChange, error, onBlur, required }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative mb-6">
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={e => { setFocused(false); onBlur && onBlur(e); }}
        required={required}
        className={`block w-full px-4 pt-6 pb-2 bg-transparent border-b-2 text-white text-lg appearance-none focus:outline-none transition-all duration-300
          ${focused ? "border-[#10b981] shadow-[0_2px_16px_0_#10b98144]" : "border-gray-500"}
          ${error ? "border-red-500" : ""}`}
        autoComplete="off"
      />
      <label
        htmlFor={name}
        className={`absolute left-4 top-2 text-base pointer-events-none transition-all duration-300
          ${focused || value ? "text-[#10b981] text-xs -translate-y-3 scale-90" : "text-gray-400"}
          ${error ? "text-red-500" : ""}`}
      >
        {label}
      </label>
      {error && <span className="absolute right-0 top-2 text-xs text-red-500">{error}</span>}
    </div>
  );
}

function ContactInfoCard({ label, value, icon, type, onCopy, copied }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0 8px 32px 0 rgba(16,185,129,0.15)" }}
      className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-2xl p-5 mb-4 shadow-lg cursor-pointer group relative"
      onClick={() => type !== "location" && onCopy(value)}
      title={type !== "location" ? `Copy ${label}` : undefined}
    >
      <span className="text-2xl group-hover:scale-125 transition-transform duration-200">
        {icon}
      </span>
      <div className="flex-1">
        <span className="block text-white font-semibold text-lg mb-1">{label}</span>
        <span className="block text-gray-200 text-base">{value}</span>
      </div>
      {type !== "location" && (
        <span className="ml-2">
          {copied ? <FaCheckCircle className="text-[#10b981]" /> : <FaCopy className="text-gray-400 group-hover:text-[#10b981] transition-colors" />}
        </span>
      )}
    </motion.div>
  );
}

function SocialIcon({ icon, url, color, label }) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2, y: -4 }}
      className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white text-xl mr-3 shadow hover:shadow-xl transition"
      style={{ color }}
      onClick={e => {
        if (!window.confirm(`Open ${label} in a new tab?`)) e.preventDefault();
      }}
      aria-label={label}
    >
      {icon}
    </motion.a>
  );
}

function ResponseBadge() {
  return (
    <span className="inline-block px-4 py-1 rounded-full bg-[#10b981]/80 text-white text-xs font-bold shadow border border-white/20 animate-pulse">
      Response time: &lt;24h
    </span>
  );
}

function ThankYouModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <span className="text-4xl mb-4">🎉</span>
            <h2 className="text-2xl font-bold mb-2 text-[#10b981]">Thank you!</h2>
            <p className="text-gray-700 dark:text-gray-200 mb-4 text-center">Your message has been sent. I'll get back to you soon.</p>
            <motion.button
              className="mt-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#10b981] to-[#f59e0b] text-white font-semibold shadow hover:scale-105 transition"
              whileHover={{ scale: 1.08 }}
              onClick={onClose}
            >
              Close
            </motion.button>
            {/* Confetti animation (simple emoji burst) */}
            <motion.div
              className="absolute inset-0 pointer-events-none flex flex-wrap justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {Array.from({ length: 18 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-2xl"
                  style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: [-10, 60 + Math.random() * 40], opacity: [1, 0] }}
                  transition={{ duration: 1.2, delay: i * 0.05 }}
                >
                  🎊
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name required";
  if (!form.email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) errors.email = "Valid email required";
  if (!form.subject.trim()) errors.subject = "Subject required";
  if (!form.message.trim()) errors.message = "Message required";
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState({});

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(validate({ ...form, [e.target.name]: e.target.value }));
  };
  const handleBlur = e => {
    setTouched(t => ({ ...t, [e.target.name]: true }));
    setErrors(validate(form));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });

    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", email: "", subject: "", message: "" });
        setTouched({});
      } else {
        console.error("Email send failed.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (val) => {
    navigator.clipboard.writeText(val);
    setCopied(c => ({ ...c, [val]: true }));
    setTimeout(() => setCopied(c => ({ ...c, [val]: false })), 1200);
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-24 bg-transparent px-4 md:px-12">
      <MeshBackground />
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-stretch gap-12">
        {/* Left: Details */}
        <div className="flex-1 flex flex-col justify-center items-start md:items-start mb-10 md:mb-0">
          <h1 className="text-5xl font-extrabold mb-6 text-foreground">Contact</h1>
          <p className="text-lg text-gray-200 mb-4 max-w-md">I'd love to hear from you. Fill out the form or use the info below to get in touch.</p>
          <ResponseBadge />
          <div className="mt-8 w-full max-w-xs">
            {CONTACT_INFO.map((info) => (
              <ContactInfoCard key={info.label} {...info} onCopy={handleCopy} copied={copied[info.value]} />
            ))}
          </div>
          <div className="flex gap-2 mt-6">
            {SOCIALS.map(s => (
              <SocialIcon key={s.label} {...s} />
            ))}
          </div>
        </div>
        {/* Right: Form */}
        <motion.form
          className="flex-1 max-w-lg w-full bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 backdrop-blur-xl flex flex-col justify-center"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <FloatingLabelInput
            label="Name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && errors.name}
            required
          />
          <FloatingLabelInput
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
            required
          />
          <FloatingLabelInput
            label="Subject"
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.subject && errors.subject}
            required
          />
          <FloatingLabelInput
            label="Message"
            type="text"
            name="message"
            value={form.message}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.message && errors.message}
            required
          />
          <motion.button
            type="submit"
            className={`mt-4 px-8 py-3 rounded-full font-bold text-lg shadow-lg transition-all flex items-center justify-center
              ${loading ? "bg-gradient-to-r from-[#10b981] to-[#f59e0b] text-white" : "bg-[#10b981] hover:bg-[#f59e0b] text-white"}`}
            whileHover={{ scale: loading ? 1 : 1.06 }}
            disabled={loading}
          >
            {loading ? (
              <motion.span
                className="inline-block w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mr-2"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              />
            ) : null}
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>
      </div>
      {/* Thank you modal */}
      <ThankYouModal open={success} onClose={() => setSuccess(false)} />
    </section>
  );
}
