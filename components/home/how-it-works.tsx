import { BrainCircuit, FileOutput, FileText, MoveRight } from "lucide-react";
import { ReactNode } from "react";
import { containerVariants, itemVariants } from "@/utils/constants";
import { MotionSection, MotionDiv, MotionH2, MotionH3 } from "../common/motion";
type Step = {
  icon: ReactNode;
  label: string;
  description: string;
};
export default function HowItWorksSection() {
  const steps: Step[] = [
    {
      icon: (
        <FileText
          strokeWidth={1.5}
          className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 dark:text-indigo-400/90"
        />
      ),
      label: "Upload PDF",
      description: "Simply drag and drop your PDF file or click to upload.",
    },
    {
      icon: (
        <BrainCircuit
          strokeWidth={1.5}
           className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 dark:text-indigo-400/90"
        />
      ),
      label: "AI Analysis",
      description:
        "Our advanced AI processes and analyzes your document instantly",
    },
    {
      icon: (
        <FileOutput
          strokeWidth={1.5}
           className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 dark:text-indigo-400/90"
        />
      ),
      label: "Get Summary",
      description: "Receive a clear ,consie summary of your document",
    },
  ];
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="relative overflow-hidden pt-4"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-white to-indigo-100  dark:bg-gradient-to-b dark:from-[#020618] dark:via-[#020618] dark:to-[#1d2337] dark:via-25%" />

      {/* Gradient Blobs */}
      <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-indigo-400/20 dark:bg-slate-950/50 blur-3xl" />
      <div className="absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-purple-400/20 dark:bg-slate-800/10 blur-3xl" />
      <div className="relative z-10 py-12 lg:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-6 lg:pt-12">
        <div className="text-center mb-14">
          <MotionH2 variants={itemVariants} className="text-xl font-bold uppercase mb-4 text-indigo-600 dark:text-slate-400 font-sans tracking-wider">
            How it works
          </MotionH2>
          <MotionH3 variants={itemVariants} className="lg:text-3xl md:text-2xl sm:text-xl text-xl max-w-2xl mx-auto font-bold mb-4 dark:text-[#d2d2d7]">
            Transform any PDF into as easy-to-digest summary in three simple
            steps
          </MotionH3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          {steps.map((step, index) => (
            <MotionDiv
              variants={itemVariants}
              key={index}
              className="relative flex items-stretch"
            >
              <StepItem {...step} />
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-8 transform -translate-y-1/2 z-10">
                  <MoveRight
                    size={32}
                    strokeWidth={1.5}
                    className="text-indigo-600 dark:text-slate-500"
                  ></MoveRight>
                </div>
              )}
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function StepItem({ icon, label, description }: Step) {
  return (
    <div
      className="relative p-6 rounded-2xl bg-white dark:bg-slate-900/40
border border-indigo-200/80 dark:border-slate-800
shadow-[0_8px_30px_-20px_rgba(0,0,0,0.25)]
transition-all duration-300
hover:-translate-y-[2px]
hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.3)] 
group w-[90%] md:w-full mx-auto"
    >
      <div className="flex flex-col gap-4 h-full items-center">
        <div className="flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 rounded-2xl bg-linear-to-br from-indigo-500/10 to-transparent group-hover:bg-indigo-500/20 transition-colors">
          <div className="text-indigo-600 dark:text-slate-300 ">{icon}</div>
        </div>
        <div className="flex flex-col gap-1 flex-1 justify-between">
          <h4 className="text-center text-base sm:text-lg lg:text-xl font-bold dark:text-[#d2d2d7]">
            {label}
          </h4>
          <p className="text-center text-xs sm:text-sm text-gray-600 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
