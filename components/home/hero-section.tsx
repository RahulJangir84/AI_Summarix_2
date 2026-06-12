import { LayoutTextFlip } from "../ui/layout-text-flip";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
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
      viewport={{ once: true, amount: 0.25 }}
      className="relative w-full overflow-hidden bg-white/50 dark:bg-slate-950"
    >
      <div className="relative flex min-h-[75vh] md:min-h-screen w-full flex-col items-center justify-center pt-24 pb-12 md:pt-0 md:pb-0 overflow-hidden">
        <BackgroundRippleEffect />

        <div className="mt-0 w-full">
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 my-6 sm:my-10 flex flex-col items-center text-center">

            {/* Badge */}
            <div className="mb-5 sm:mb-8 flex justify-center">
              <Badge
                variant="outline"
                className="relative cursor-default px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium
                  text-indigo-600 border-indigo-200 bg-indigo-50 hover:bg-indigo-100
                  dark:text-slate-300 dark:border-slate-700 dark:bg-slate-900
                  dark:hover:bg-slate-800 transition-colors gap-1.5 sm:gap-2 rounded-full"
              >
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-indigo-600 text-indigo-600 dark:fill-slate-400 dark:text-slate-400 animate-pulse" />
                <span className="dark:text-slate-300">Powered by AI</span>
              </Badge>
            </div>

            {/* Heading */}
            <MotionH1
              variants={itemVariants}
              className="max-w-4xl font-extrabold tracking-tight dark:text-[#d2d2d7] text-slate-900
                text-2xl sm:text-3xl md:text-4xl lg:text-6xl
                my-2 sm:my-3 mb-4 sm:mb-6
                flex flex-col md:flex-row gap-2 sm:gap-3 items-center justify-center"
            >
              <span className="whitespace-nowrap">Transform PDFs into</span>
              <span className="inline-flex">
                <LayoutTextFlip
                  text=""
                  words={["Concise", "Crispier", "Accurate", "Compact"]}
                />
                <span className="ml-1.5 sm:ml-2 text-black dark:text-[#d2d2d7]">
                  Summaries
                </span>
              </span>
            </MotionH1>

            {/* Subheading */}
            <MotionP
              variants={itemVariants}
              className="mx-auto max-w-xs sm:max-w-xl lg:max-w-2xl
                text-sm sm:text-base lg:text-xl
                my-3 sm:my-5 mb-6 sm:mb-10
                text-slate-600 dark:text-slate-100/80 leading-relaxed"
            >
              Upload your documents and get instant, intelligent breakdowns of
              the content in seconds.
            </MotionP>

            {/* CTA Button */}
            <MotionDiv
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
            >
              <Button
                size="lg"
                className="hover:cursor-pointer w-full sm:w-auto
                  h-10 sm:h-11 px-6 sm:px-8
                  text-white text-sm sm:text-base
                  bg-slate-800 hover:bg-slate-700
                  dark:bg-[#707be0] dark:text-slate-900 dark:hover:bg-[#7882E3]/80
                  shadow-md transition-all duration-200"
              >
                {userId ? (
                  <Link href="/upload">Try Summarix</Link>
                ) : (
                  <Link href="/sign-in">Try Summarix</Link>
                )}
              </Button>
            </MotionDiv>

            {/* Social proof */}
            <div className="mt-10 sm:mt-16 flex flex-col items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-500">
              <div className="flex flex-row items-center justify-center w-full mb-1 sm:mb-2">
                <AnimatedTooltip items={people} />
              </div>
              <p className="font-semibold">
                Trusted by 1,000+ students and researchers
              </p>
            </div>

          </div>
        </div>
      </div>
    </MotionSection>
  );
}