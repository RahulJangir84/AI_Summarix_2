"use client";
import { Compare } from "@/components/ui/compare";
import { useTheme } from "next-themes";
export default function CompareDemo() {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col gap-1">
    <div className="p-4 border rounded-3xl bg-white dark:bg-indigo-900 border-neutral-200 dark:border-neutral-800 px-4">
      <Compare
        firstImage={theme === "dark" || theme === "system" ? "/imagecopy2.png" : "/image.png"}
        secondImage={theme === "dark" || theme === "system" ? "/imagecopy.png" : "/image2.png"}
        firstImageClassName="object-cover object-left-top"
        secondImageClassname="object-cover object-left-top"
        className="h-[340px] w-[360px] lg:h-[460px] lg:w-[700px] sm:h-[350px] sm:w-[470px] md:h-[450px] md:w-[570px]"
        slideMode="hover"
      />
    </div>
    <div className="flex items-center justify-evenly gap-1">
      <p className="text-sm font-semibold text-gray-500">
        Original PDF
      </p>
      <p className="text-sm font-semibold text-gray-500">
        Summarized PDF
      </p>
    </div>
    </div>
  );
}