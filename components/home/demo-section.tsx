"use client";
import { containerVariants, itemVariants } from "@/utils/constants";
import { MotionSection, MotionDiv } from "../common/motion";
import CompareDemo from "../compare-demo";

export default function DemoSection() {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.005 }}
      className="relative overflow-hidden bg-white dark:bg-[#080918]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-500/10 dark:bg-indigo-600/8 blur-[130px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/10 dark:bg-violet-600/8 blur-[120px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-12 left-8 rotate-[-6deg] font-mono text-xs text-indigo-600 dark:text-indigo-400 leading-relaxed">
          <div>{"{"}</div>
          <div>&nbsp;&nbsp;`&quot;summary`&quot;: `&quot;AI-powered...&quot;`,</div>
          <div>&nbsp;&nbsp;`&quot;pages`&quot;: 42,</div>
          <div>&nbsp;&nbsp;`&quot;time`&quot;: `&quot;2.3s&quot;`</div>
          <div>{"}"}</div>
        </div>
        <div className="absolute bottom-20 right-10 rotate-[4deg] font-mono text-xs text-violet-600 dark:text-violet-400 leading-relaxed">
          <div>uploadPDF(file)</div>
          <div>&nbsp;&nbsp;.then(getSummary)</div>
          <div>&nbsp;&nbsp;.then(render)</div>
        </div>
        <div className="absolute top-1/2 left-2 rotate-[-3deg] font-mono text-xs text-blue-600 dark:text-blue-400 leading-relaxed hidden lg:block">
          <div>Processing...</div>
          <div>const insight =</div>
          <div>&nbsp;&nbsp;await analyze(pdf)</div>
        </div>
        <div className="absolute bottom-170 right-10 rotate-[45deg] font-mono text-xs text-violet-600 dark:text-violet-400 leading-relaxed">
          <div>uploadPDF(file)</div>
          <div>&nbsp;&nbsp;.then(getSummary)</div>
          <div>&nbsp;&nbsp;.then(render)</div>
        </div>
      </div>

      <div className="relative z-10 py-20 lg:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">

          <MotionDiv variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/80 dark:bg-indigo-950/50 px-4 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-300">
              Live Demo
            </div>
          </MotionDiv>

          <MotionDiv variants={itemVariants} className="mb-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight max-w-3xl mx-auto">
              See the{" "}
              <span className="bg-[#7882E3] bg-clip-text text-transparent">
                transformation
              </span>{" "}
              in action
            </h2>
          </MotionDiv>

          <MotionDiv variants={itemVariants} className="mb-16">
            <p className="text-slate-600 dark:text-slate-400 text-base lg:text-lg max-w-xl mx-auto">
              Drag the slider to compare the raw PDF against the AI-generated
              summary — same content, 10x easier to read.
            </p>
          </MotionDiv>

          <MotionDiv
            variants={itemVariants}
            className="relative"
          >
            <div className="absolute -inset-1 rounded-3xl bg-[#666bae] opacity-20 dark:opacity-30 blur-lg" />
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl">
              <CompareDemo />
            </div>
          </MotionDiv>
        </div>
      </div>
    </MotionSection>
  );
}
