"use client";
import { BrainCircuit, FileOutput, FileText} from "lucide-react";
import { ReactNode, useRef } from "react";
import { containerVariants, itemVariants } from "@/utils/constants";
import { MotionSection, MotionDiv } from "../common/motion";
import { motion, useInView } from "motion/react";
import ScrollHorizontal from "../ui/scrollAnimation";

type Step = {
  icon: ReactNode;
  number: string;
  label: string;
  description: string;
  color: string;
  glowColor: string;
};

export default function HowItWorksSection() {
  return (
    <>
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="relative bg-white dark:bg-[#080918]"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(99,102,241,0.03)_50%,transparent)]" />
        {/* Grid dots pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #6366f1 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 py-24 lg:pt-14 pb-0 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <MotionDiv
          variants={itemVariants}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/80 dark:bg-indigo-950/50 px-4 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-300 mb-6">
            How it Works
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
            Four steps to{" "}
            <span className="bg-[#7882E3] bg-clip-text text-transparent">
              instant clarity
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base lg:text-lg max-w-2xl mx-auto">
            From raw PDF to polished summary in under a minute. No setup, no
            learning curve — just results.
          </p>
        </MotionDiv>
        {/* Steps Grid */}

      </div>
    </MotionSection>
      <ScrollHorizontal />
    </>
  );
}
