"use client";

import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Sparkles, FileText } from "lucide-react";

function FullContent({ text }: { text: string }) {
  return (
    <ScrollArea className="markdown-content h-[350px] sm:h-[420px] lg:h-[500px]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node: _node, ...props }) => (
            <h2 className="text-xl sm:text-2xl font-bold text-indigo-800 dark:text-indigo-400/80 mb-3 mt-5 first:mt-0" {...props} />
          ),
          h2: ({ node: _node, ...props }) => (
            <h3 className="text-lg sm:text-xl font-bold text-indigo-800 dark:text-indigo-400/80 mb-2 mt-4 first:mt-0" {...props} />
          ),
          h3: ({ node: _node, ...props }) => (
            <h4 className="text-base sm:text-lg font-semibold text-indigo-800 dark:text-indigo-400/80 mb-2 mt-3 first:mt-0" {...props} />
          ),
          p: ({ node: _node, ...props }) => (
            <p className="text-gray-700 dark:text-slate-300 text-[0.93rem] sm:text-[0.98rem] leading-[1.8] sm:leading-[1.9] mb-3 sm:mb-4" {...props} />
          ),
          ul: ({ node: _node, ...props }) => (
            <ul className="ml-4 sm:ml-5 list-disc space-y-1 sm:space-y-1.5 mb-3 sm:mb-4 text-gray-700 dark:text-slate-300" {...props} />
          ),
          ol: ({ node: _node, ...props }) => (
            <ol className="ml-4 sm:ml-5 list-decimal space-y-1 sm:space-y-1.5 mb-3 sm:mb-4 text-gray-700 dark:text-slate-300" {...props} />
          ),
          li: ({ node: _node, ...props }) => (
            <li className="text-[0.92rem] sm:text-[0.97rem] leading-relaxed pl-1 dark:text-slate-300" {...props} />
          ),
          strong: ({ node: _node, ...props }) => (
            <strong className="font-semibold text-gray-900 dark:text-slate-300" {...props} />
          ),
          hr: ({ node: _node, ...props }) => (
            <hr className="my-4 sm:my-6 border-indigo-100" {...props} />
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </ScrollArea>
  );
}

export default function SummaryPage({ summary }: { summary: string }) {
  const wordCount = useMemo(
    () => summary.trim().split(/\s+/).length,
    [summary],
  );

  const readingTime = Math.max(1, Math.round(wordCount / 70));

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 sm:mt-8 px-3 sm:px-4 lg:px-0">
      <div className="relative bg-gradient-to-br from-white to-indigo-50/40 dark:bg-linear-to-b dark:from-[#1E293B] dark:to-[#273449] rounded-2xl sm:rounded-3xl shadow-xl shadow-indigo-100/60 border border-indigo-100 dark:border-slate-700 dark:shadow-none overflow-hidden">

        {/* Background blobs */}
        <div className="pointer-events-none absolute -top-16 -right-16 w-40 sm:w-56 h-40 sm:h-56 rounded-full bg-indigo-200/20 blur-3xl dark:bg-[#1E293B]" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 w-40 sm:w-56 h-40 sm:h-56 rounded-full bg-violet-200/20 blur-3xl dark:bg-[#273449]" />

        {/* Header */}
        <div className="relative flex items-center justify-between px-4 sm:px-6 lg:px-8 pt-5 sm:pt-7 pb-4 sm:pb-5 border-b border-indigo-100/70">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-indigo-600 dark:bg-indigo-700/60 shadow-md shadow-indigo-300/40 dark:shadow-none shrink-0">
              <BookOpen size={14} className="text-white dark:text-slate-300 sm:hidden" />
              <BookOpen size={16} className="text-white dark:text-slate-300 hidden sm:block" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs font-semibold text-indigo-500 dark:text-indigo-400/80 uppercase tracking-widest">
                AI Summary
              </p>
              <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium dark:text-slate-300/60">
                {readingTime} min read · {wordCount.toLocaleString()} words
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Sparkles size={12} className="text-indigo-400 dark:text-indigo-500/80 sm:hidden" />
            <Sparkles size={13} className="text-indigo-400 dark:text-indigo-500/80 hidden sm:block" />
            <span className="text-xs sm:text-sm font-bold text-indigo-700 dark:text-indigo-500/80">
              Scroll View
            </span>
          </div>
        </div>

        {/* Full Content */}
        <div className="relative px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
          <FullContent text={summary} />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-1.5 mt-3 sm:mt-4">
        <FileText size={12} className="text-gray-700 dark:text-slate-400" />
        <span className="text-[11px] text-gray-700 font-medium dark:text-slate-400">
          AI-generated full summary
        </span>
      </div>
    </div>
  );
}