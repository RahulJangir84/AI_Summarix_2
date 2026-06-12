import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default function UploadHeader() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6">
      <Badge
                variant="outline"
                className="relative cursor-default px-4 py-1.5 text-sm font-medium 
    text-indigo-600 border-indigo-200 bg-indigo-50 hover:bg-indigo-100 
    dark:text-slate-300 dark:border-slate-700 dark:bg-slate-900 
    dark:hover:bg-slate-800 transition-colors gap-2 rounded-full"
              >
                <Sparkles
                  className="h-4 w-4 fill-indigo-600 text-indigo-600 
    dark:fill-slate-400 dark:text-slate-400 animate-pulse"
                />

                <span className="dark:text-slate-300">AI-Powered Content Creation</span>
              </Badge>
      <h1 className="text-4xl font-bold tracking-tight dark:text-[#D2D2D7] text-gray-900 sm:text-5xl mt-3">
        Start Uploading{" "}
        <span className="relative text-indigo-600 dark:text-[#7882E3]">
          Your PDF&apos;s
          <span className="absolute left-0 -bottom-1 w-full h-1 bg-indigo-200 rounded-full"></span>
        </span>
      </h1>
      <p className="text-lg dark:text-slate-200 text-gray-600 max-w-2xl text-center">
        Upload your PDF files and get a summary in minutes.
      </p>
    </div>
  );
}
