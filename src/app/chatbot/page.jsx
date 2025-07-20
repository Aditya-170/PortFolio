"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CursorTrail from "@/components/CursorTrail";
const botTypingDelay = 10;

export default function GeminiChatBot() {
    const [messages, setMessages] = useState([
        {
            type: "bot",
            text: "👋 Hey! I'm Aditya's portfolio AI. Ask me about any of his projects, tech stack, or achievements.",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [typingBotMessage, setTypingBotMessage] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, typingBotMessage]);

    const typeBotMessage = async (text) => {
        let typed = "";
        for (let i = 0; i < text.length; i++) {
            typed += text[i];
            setTypingBotMessage(typed);
            await new Promise((r) => setTimeout(r, botTypingDelay));
        }

        setMessages((prev) => [...prev, { type: "bot", text }]);
        setTypingBotMessage("");
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userPrompt = input;
        setInput("");
        setMessages((prev) => [...prev, { type: "user", text: userPrompt }]);
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userPrompt }),
            });

            const data = await res.json();
            await typeBotMessage(data.botReply || "Hmm... I couldn't respond.");
        } catch (err) {
            await typeBotMessage("❌ Error connecting to the AI server.");
        }

        setLoading(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") sendMessage();
    };

    return (
        <>
            <CursorTrail />
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{
                    scale: 1.01,
                    boxShadow: "0px 0px 30px rgba(168, 85, 247, 0.5)",
                }}
                className="backdrop-blur-lg bg-white/70 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-700 drop-shadow-[0_0_10px_rgba(168,85,247,0.4)] rounded-3xl p-6 max-w-xl mt-10 mb-10 mx-auto w-full"
            >
             
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-transparent bg-clip-text">
                    💬 Ask Ujjwal's AI Assistant
                </h2>

                <div className="h-[400px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-purple-200 dark:scrollbar-thumb-purple-400 dark:scrollbar-track-purple-900 rounded-lg space-y-4 pr-2">

                    <AnimatePresence>
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: msg.type === "user" ? 100 : -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className={`p-3 rounded-2xl max-w-[80%] break-words text-sm whitespace-pre-line ${msg.type === "user"
                                    ? "bg-gradient-to-tr from-purple-400 to-purple-600 text-white ml-auto text-right"
                                    : "bg-purple-100 dark:bg-purple-800 text-black dark:text-white text-left"
                                    }`}
                            >
                                {msg.text}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {typingBotMessage && (
                        <motion.div
                            key="typing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-purple-100 dark:bg-purple-800 text-black dark:text-white text-left p-3 rounded-2xl max-w-[80%] text-sm break-words"
                        >
                            {typingBotMessage}
                            <span className="animate-pulse">|</span>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <motion.div
                    className="flex gap-2 items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about Rakshaa, GreenKart..."
                        className="flex-1 p-3 rounded-xl border border-purple-300 dark:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-purple-950 text-sm text-black dark:text-white"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={loading}
                        className="px-5 py-2 bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white rounded-xl font-semibold hover:scale-105 transition shadow-lg"
                    >
                        {loading ? "..." : "Send"}
                    </button>
                </motion.div>
            </motion.div>
        </>
    );
}
