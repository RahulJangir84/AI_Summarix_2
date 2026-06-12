"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const LayoutTextFlip = ({
  text = "",
  words = [""],
  duration = 3000,
}: {
  text?: string;
  words: string[];
  duration?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [duration, words.length]);

  return (
    <>
      {text && (
        <motion.span layoutId="subtext" className="font-bold">
          {text}
        </motion.span>
      )}

      <motion.span
        layout
        className="relative inline-flex overflow-hidden rounded-md 
                   border border-transparent bg-white px-2 py-1 
                   font-bold shadow-sm ring-1 ring-black/10 text-indigo-600
                   dark:bg-neutral-800 dark:text-indigo-400/90 dark:ring-white/10"
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentIndex}
            initial={{ y: "-100%", filter: "blur(8px)", opacity: 0 }}
            animate={{ y: "0%", filter: "blur(0px)", opacity: 1 }}
            exit={{ y: "100%", filter: "blur(8px)", opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className={cn("inline-block whitespace-nowrap")}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
};
