"use client";
import { MotionSection, MotionDiv, MotionP } from "../common/motion";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import Link from "next/link";
import { containerVariants, itemVariants } from "@/utils/constants";
import { ArrowRight } from "lucide-react";

const words = [
  { text: "Ready" },
  { text: "to" },
  { text: "Save" },
  { text: "Hours" },
  { text: "of" },
  { text: "Reading" },
  { text: "Time?" },
];

export default function CTASection() {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.005 }}
      className="relative overflow-hidden pt-6 sm:pt-8 pb-14 sm:pb-20 bg-white dark:bg-gradient-to-b dark:from-[#090A1A] dark:to-[#1C2236]"
    >
      <div className="flex flex-col items-center justify-center mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Typewriter heading */}
        <MotionDiv variants={itemVariants} className="w-full flex justify-center">
          <TypewriterEffectSmooth words={words} />
        </MotionDiv>

        {/* Subtext */}
        <MotionP
          variants={itemVariants}
          className="text-neutral-500 dark:text-[#8198b6]
            text-sm sm:text-base lg:text-lg
            max-w-xs sm:max-w-xl lg:max-w-3xl"
        >
          Transform lengthy documents into clear, actionable insights with our
          AI-powered summarizer.
        </MotionP>

        {/* CTA Button */}
        <MotionDiv
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center"
        >
          <Link href="/sign-in">
            <button className="group relative inline-flex items-center gap-2 rounded-full px-10 py-4 mt-7 text-base font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/40 hover:shadow-2xl overflow-hidden bg-[#3B438D]">
              <span className="relative z-10 flex items-center gap-2">
                Get Started Free
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-[#3B438D] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          </Link>
        </MotionDiv>

      </div>

      {/* Bottom border glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
    </MotionSection>
  );
}