import { User, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { UIMessage } from "ai";

export function ChatMessage({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";

  const text =
    message.parts
      ?.filter((p) => p.type === "text")
      .map((p) => p.text)
      .join("") || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-end gap-2.5 w-full ${isUser ? "flex-row-reverse" : ""}`}
    >

      <div
        className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center mb-0.5 shadow-sm ${
          isUser
            ? "bg-indigo-600"
            : "bg-white border border-indigo-100 dark:bg-indigo-900 dark:border-slate-400 shadow-indigo-100 dark:shadow-none"
        }`}
      >
        {isUser
          ? <User size={15} className="text-white" />
          : <Sparkles size={15} className="text-indigo-500" />
        }
      </div>
      <div className={`flex flex-col text-sm max-w-[80%] gap-1 ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`px-4 py-2.5 text-[14.5px] leading-relaxed ${
            isUser
              ? "bg-indigo-600 text-white rounded-2xl rounded-br-sm shadow-md shadow-indigo-200 dark:shadow-none"
              : "bg-white border border-slate-100 dark:border-gray-800 dark:bg-indigo-900 dark:text-slate-300  text-slate-700 rounded-2xl rounded-bl-sm shadow-sm"
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{text}</p>
          ) : (
            <div className="prose prose-sm max-w-none break-words">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ children }) {
                    return (
                      <code className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded-md text-[12px] font-mono border border-indigo-100">
                        {children}
                      </code>
                    );
                  },
                  h1: ({ children }) => <h1 className="text-base font-bold text-slate-800 mb-1 dark:text-slate-400">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-sm font-semibold text-slate-800 mb-1 dark:text-slate-400">{children}</h2>,
                  p: ({ children }) => <p className="mb-1.5 last:mb-0 text-slate-700 dark:text-slate-400">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-4 mb-1.5 space-y-0.5 dark:text-slate-400">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-4 mb-1.5 space-y-0.5 dark:text-slate-400">{children}</ol>,
                  li: ({ children }) => <li className="text-slate-600 dark:text-slate-400">{children}</li>,
                  strong: ({ children }) => <strong className="text-slate-900 font-semibold dark:text-indigo-400">{children}</strong>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-2 border-indigo-300 pl-3 text-slate-500 italic my-1.5">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {text}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}