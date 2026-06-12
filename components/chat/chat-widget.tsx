"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Trash2, GripHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage } from "./chat-message";
import ChatInput from "../speech/chatInput";
import useVoiceInput from "@/hook/speech-hook";
interface ChatWidgetProps {
  summaryText: string;
}

export default function ChatWidget({ summaryText }: ChatWidgetProps) {
  
  const [isOpen, setIsOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [dimensions, setDimensions] = useState({ width: 420, height: 560 });
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = window.innerWidth - 24 - e.clientX;
      const newHeight = window.innerHeight - 24 - e.clientY;
      setDimensions({
        width: Math.max(340, Math.min(newWidth, window.innerWidth * 0.9)),
        height: Math.max(400, Math.min(newHeight, window.innerHeight * 0.85)),
      });
    };
    const handleMouseUp = () => setIsResizing(false);
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const { messages, status, sendMessage, setMessages, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { summary_text: summaryText },
    }),
  });

  const clearChat = () => {
    stop();
    setMessages([]);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const isLoading = status === "streaming" || status === "submitted";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        .chat-scroll::-webkit-scrollbar { width: 4px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: #e0e7ff; border-radius: 99px; }
        .chat-scroll::-webkit-scrollbar-thumb:hover { background: #a5b4fc; }
      `}</style>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" style={{ fontFamily: "'DM Sans', sans-serif" }}>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: dimensions.width, height: dimensions.height }}
              className="mb-4 relative flex flex-col rounded-2xl overflow-hidden 
shadow-2xl shadow-indigo-200/60 dark:shadow-black/40 
border border-slate-100 dark:border-white/10"
            >
              {/* Background */}
              <div className="absolute inset-0 bg-slate-50" />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-white to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

              {/* Resize handle */}
              <div
                onMouseDown={handleMouseDown}
                className="absolute  top-2 left-2 z-50 cursor-nwse-resize p-1 group opacity-100"
              >
                <GripHorizontal size={18} className="text-indigo-800 group-hover:text-indigo-900 transition-colors" />
              </div>

              {/* Header */}
              <div className="relative flex items-center justify-between px-5 pt-8 pb-2 bg-white border-b border-slate-100 dark:bg-gray-900/50 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md dark:bg-blue-800 dark:shadow-none shadow-indigo-200">
                    <MessageCircle size={15} className="text-white" />
                  </div>
                  <div>
                    <p className="text-slate-800 text-[13px] font-semibold leading-none mb-0.5 dark:text-slate-400">Document Assistant</p>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full transition-colors ${isLoading ? "bg-indigo-400 animate-pulse" : "bg-emerald-400"}`} />
                      <span className="text-[11px] text-slate-400 font-medium">{isLoading ? "Thinking…" : "Ready"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {messages.length > 0 && (
                    <button
                      onClick={clearChat}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                      title="Clear conversation"
                    >
                      <Trash2 size={17} />
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="relative flex-1 overflow-y-auto p-4 flex flex-col gap-3 chat-scroll">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center gap-3 text-center px-8">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 dark:bg-slate-900 dark:border-slate-700 flex items-center justify-center shadow-sm">
                      <MessageCircle size={22} className="text-indigo-400 dark:text-blue-700" />
                    </div>
                    <div>
                      <p className="text-slate-700 text-[17px] font-semibold mb-1 dark:text-slate-400">Ask about your document</p>
                      <p className="text-slate-400 text-[15px] leading-relaxed dark:text-slate-500">
                        I&apos;ve read the full document and can answer questions, summarize sections, or find specific details.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center mt-1">
                      {["Summarize this", "Key takeaways?", "Main topics?"].map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => sendMessage({ text: prompt })}
                          className="text-[14px] px-3 py-1.5 rounded-lg dark:text-blue-500 bg-white border dark:bg-slate-900 dark:border-slate-700 border-indigo-100 text-indigo-500 font-medium hover:bg-indigo-50 hover:border-indigo-300 transition-all shadow-sm"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                ):(
                  messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))
                )}

                {/* Typing indicator */}
                {status === "submitted" && messages[messages.length - 1]?.role === "user" && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-end gap-2.5"
                  >
                    <div className="w-7 h-7 rounded-full bg-white border border-indigo-100 dark:bg-slate-900 dark:border-slate-700 flex items-center justify-center shrink-0 shadow-sm">
                      <Loader2 size={13} className="text-indigo-500 animate-spin" />
                    </div>
                    <div className="px-4 py-3 bg-white border border-slate-100 dark:bg-slate-900 dark:border-slate-700 rounded-2xl rounded-bl-sm shadow-sm">
                      <div className="flex gap-1 items-center h-4">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-indigo-300"
                            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="relative px-4 py-3 bg-white border-t dark:bg-slate-900 dark:border-slate-700 border-slate-100">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!input.trim() || isLoading) return;
                    sendMessage({ text: input });
                    setInput("");
                  }}
                  className="flex items-center gap-2 bg-slate-50 border border-slate-200 dark:bg-slate-700 dark:border-slate-600 rounded-xl px-4 py-2.5 focus-within:border-indigo-400 focus-within:bg-white focus-within:shadow-sm focus-within:shadow-indigo-100 transition-all"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    placeholder={isLoading ? "Waiting for response…" : "Ask a question…"}
                    className="flex-1 bg-transparent text-[14px] text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="w-7 h-7 rounded-lg bg-indigo-600 dark:bg-blue-600 hover:bg-indigo-700 disabled:opacity-30 dark:opacity-80 disabled:hover:bg-indigo-600 flex items-center justify-center transition-all shrink-0 shadow-sm shadow-indigo-200"
                  >
                    <Send size={13} className="text-white dark:text-white" />
                    
                    {/* <ChatInput/> */}

                  </button>
                    
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-300/50 flex items-center justify-center transition-colors dark:shadow-none dark:bg-blue-600/80"
        >
          {messages.length > 0 && !isOpen && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white" />
          )}
          <AnimatePresence mode="popLayout">
            {isOpen?(
              <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                <X size={22} className="text-white" />
              </motion.div>
            ):(
              <motion.div key="chat" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }}>
                <MessageCircle size={22} className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}