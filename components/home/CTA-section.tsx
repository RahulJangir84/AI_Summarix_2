"use client";
import { MotionSection, MotionDiv, MotionP } from "../common/motion";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import Link from "next/link";
import { containerVariants, itemVariants } from "@/utils/constants";

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
      className="relative overflow-hidden pt-6 sm:pt-8 pb-14 sm:pb-20 bg-white dark:bg-gradient-to-b dark:from-[#1C2236] dark:to-[#1C2236]"
    >
      <div className="flex flex-col items-center justify-center mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Typewriter heading */}
        <MotionDiv variants={itemVariants} className="w-full flex justify-center">
          <TypewriterEffectSmooth words={words} />
        </MotionDiv>

        {/* Subtext */}
        <MotionP
          variants={itemVariants}
          className="text-neutral-500 dark:text-[#D2D2D7]
            text-sm sm:text-base lg:text-xl
            max-w-xs sm:max-w-xl lg:max-w-3xl
            mt-3 sm:mt-4"
        >
          Transform lengthy documents into clear, actionable insights with our
          AI-powered summarizer.
        </MotionP>

        {/* CTA Button */}
        <MotionDiv
          variants={itemVariants}
          className="mt-6 sm:mt-8"
        >
          <button className="hover:cursor-pointer
            w-36 sm:w-40 h-10 sm:h-11
            rounded-xl text-base sm:text-lg
            bg-slate-900 text-white
            dark:bg-slate-300 dark:text-slate-900 dark:hover:bg-slate-400
            border border-transparent
            shadow-md transition-all duration-200 hover:bg-slate-700">
            <Link href="/sign-in" className="flex items-center justify-center w-full h-full">
              Join now
            </Link>
          </button>
        </MotionDiv>

      </div>
    </MotionSection>
  );
}