"use client";
import { BrainCircuit, FileOutput, FileText, ArrowRight } from "lucide-react";
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

const steps: Step[] = [
  {
    icon: <FileText strokeWidth={1.5} className="h-7 w-7" />,
    number: "01",
    label: "Upload Your PDF",
    description:
      "Drag and drop any PDF — research papers, textbooks, reports, legal docs. We handle any format up to 50MB.",
    color: "from-indigo-500 to-indigo-600",
    glowColor: "rgba(99,102,241,0.3)",
  },
  {
    icon: <BrainCircuit strokeWidth={1.5} className="h-7 w-7" />,
    number: "02",
    label: "AI Analyzes in Seconds",
    description:
      "Gemini AI reads, understands, and distills the key insights, arguments, and takeaways from your document.",
    color: "from-violet-500 to-purple-600",
    glowColor: "rgba(139,92,246,0.3)",
  },
  {
    icon: <FileOutput strokeWidth={1.5} className="h-7 w-7" />,
    number: "03",
    label: "Get Your Summary",
    description:
      "Receive a beautifully structured, easy-to-read summary you can save, share, or export as Markdown.",
    color: "from-blue-500 to-indigo-500",
    glowColor: "rgba(59,130,246,0.3)",
  },
];

function StepCard({ step, index }: { step: Step; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col"
    >
      {/* Card */}
      <div className="relative flex flex-col gap-5 p-7 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm transition-all duration-500 hover:border-white/15 hover:bg-white/6 hover:-translate-y-2 h-full">
        {/* Glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
          style={{ background: step.glowColor }}
        />

        {/* Step number */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold tracking-widest text-slate-600 dark:text-slate-500 uppercase">
            Step {step.number}
          </span>
          {/* Icon */}
          <div
            className={`flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br ${step.color} text-white shadow-lg`}
          >
            {step.icon}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-2">{step.label}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
        </div>

        {/* Bottom accent line */}
        <div
          className={`h-px w-0 group-hover:w-full transition-all duration-700 bg-gradient-to-r ${step.color} rounded-full mt-auto`}
        />
      </div>
    </motion.div>
  );
}

export default function HowItWorksSection() {
  return (
    <>
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="relative bg-[#080918]"
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
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/50 px-4 py-1.5 text-sm font-medium text-indigo-300 mb-6">
            How it Works
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            Four steps to{" "}
            <span className="bg-[#7882E3] bg-clip-text text-transparent">
              instant clarity
            </span>
          </h2>
          <p className="text-slate-400 text-base lg:text-lg max-w-2xl mx-auto">
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
