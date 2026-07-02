import { LayoutTextFlip } from "../ui/layout-text-flip";
import { Zap, ChevronRight } from "lucide-react";
import Link from "next/link";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { BackgroundRippleEffect } from "../ui/background-ripple-effect";
import { auth } from "@clerk/nextjs/server";
import { MotionDiv, MotionH1, MotionP, MotionSection } from "../common/motion";
import { containerVariants, itemVariants } from "@/utils/constants";

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image: "https://res.cloudinary.com/ddjgnyubn/image/upload/v1774559900/image_jlygqt.jpg",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image: "https://res.cloudinary.com/ddjgnyubn/image/upload/v1774559899/photo-1438761681033-6461ffad8d80_pwg2y2.jpg",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image: "https://res.cloudinary.com/ddjgnyubn/image/upload/v1774559898/photo-1580489944761-15a19d654956_chm0fa.jpg",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image: "https://res.cloudinary.com/ddjgnyubn/image/upload/v1774559898/image_igq6ix.jpg",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    image: "https://res.cloudinary.com/ddjgnyubn/image/upload/w_100,h_100,c_fill,q_auto,f_auto/image_jlygqt",
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    image: "https://res.cloudinary.com/ddjgnyubn/image/upload/v1774559898/image_igq6ix.jpg",
  },
];

export default async function HeroSection() {
  const { userId } = await auth();

  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="relative w-full overflow-hidden bg-white dark:bg-[#080918]"
    >
      {/* Glowing Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-indigo-500/20 dark:bg-[#080918] blur-[120px]" />
        <div className="absolute top-1/3 -left-32 h-[400px] w-[400px] rounded-full bg-violet-500/15 dark:bg-[#080918] blur-[100px]" />
        <div className="absolute top-1/2 -right-32 h-[350px] w-[350px] rounded-full bg-blue-500/15 dark:bg-[#080918] blur-[100px]" />
      </div>

      <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
        <BackgroundRippleEffect />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center mt-16">

          {/* Top Badge */}
          <MotionDiv variants={itemVariants} className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-300/50 dark:border-indigo-500/30 bg-indigo-50/80 dark:bg-indigo-950/50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:text-indigo-300 backdrop-blur-sm shadow-sm">
              <div className="relative flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <Zap className="h-3.5 w-3.5 fill-indigo-600 dark:fill-indigo-400" />
              </div>
              Powered by AI
            </div>
          </MotionDiv>

          {/* Heading */}
          <MotionH1
            variants={itemVariants}
            className="max-w-5xl font-extrabold tracking-tight text-black dark:text-[#e6e6e6]
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl
              leading-[1.1] mb-6"
          >
            Transform PDFs into{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">
                <LayoutTextFlip
                  text=""
                  words={["Concise", "Crispier", "Accurate", "Compact"]}
                />
              </span>
            </span>{" "}
            <span className="text-black dark:text-[#e6e6e6]">Summaries</span>
          </MotionH1>

          {/* Subheading */}
          <MotionP
            variants={itemVariants}
            className="mx-auto max-w-2xl text-base sm:text-lg lg:text-xl text-slate-500 dark:text-slate-400 mb-10 leading-relaxed"
          >
            Upload any PDF and get an AI-generated summary in seconds. Save hours
            of reading — get the key insights instantly.
          </MotionP>

          {/* CTA Button */}
          <MotionDiv
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mb-16"
          >
            <Link href={userId ? "/upload" : "/sign-in"}>
              <button className="group relative inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold text-slate-50 shadow-lg transition-all duration-300 hover:scale-105 bg-[#444da2]">
                <span className="relative z-10 flex items-center gap-2">
                  Try Summarix Free
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="bg-[#444da2] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            </Link>

            <Link href="/#pricing">
              <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm px-8 py-3.5 text-base font-semibold text-slate-700 dark:text-slate-300 shadow-sm transition-all duration-300 hover:scale-105 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md">
                View Pricing
              </button>
            </Link>
          </MotionDiv>

          {/* Social Proof */}
          <MotionDiv
            variants={itemVariants}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex flex-row items-center justify-center">
              <AnimatedTooltip items={people} />
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Trusted by 1,000+</span>
              students and researchers
            </div>
          </MotionDiv>
        </div>
      </div>
    </MotionSection>
  );
}