import Link from "next/link";
import { Button } from "../ui/button";
import { Calendar, ChevronLeft, Clock, Sparkles } from "lucide-react";

export default function SummaryHeader({title,created_at,readingTime}:{
    title:string;
    created_at:string;
    readingTime:number;
}) {
    return (
        <div>
       <div className="flex items-center lg:px-10 sm:px-6 md:px-8 pt-8 justify-between mb-6">

  <div className="flex items-center gap-5 flex-wrap">
    <div className="flex items-center gap-2 px-3 py-[3px] sm:px-4 lg:px-6 lg:py-2 sm:py-1 rounded-full 
      bg-linear-to-r from-indigo-100 via-blue-100 to-indigo-100 
      border border-indigo-200/40 shadow-sm 
      hover:shadow-md transition-all duration-300">

      <Sparkles className="lg:h-4 lg:w-4 md:h-4 md:w-4 sm:w-4 sm:h-4 h-3 w-3 text-indigo-600" />

      <span className="lg:text-[15px] md:text-[13px] sm:text-[12px] text-[10px] font-semibold bg-linear-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
        AI Summary
      </span>
    </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-[3px] sm:px-4 lg:px-6 lg:py-2 sm:py-1 rounded-full 
      bg-linear-to-r from-indigo-100 via-blue-100 to-indigo-100 
      border border-indigo-200/40 shadow-sm 
      hover:shadow-md transition-all duration-300">
        <Calendar className="lg:h-4 lg:w-4 md:h-4 md:w-4 sm:w-4 sm:h-4 h-3 w-3 text-indigo-600" />
        <span className="lg:text-[15px] md:text-[13px] sm:text-[12px] text-[10px] font-semibold bg-linear-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
          {new Date(created_at).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}
        </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-[3px] sm:px-4 lg:px-6 lg:py-2 sm:py-1 rounded-full 
      bg-linear-to-r from-indigo-100 via-blue-100 to-indigo-100 
      border border-indigo-200/40 shadow-sm 
      hover:shadow-md transition-all duration-300">
        <Clock className="lg:h-4 lg:w-4 md:h-4 md:w-4 sm:w-4 sm:h-4 h-3 w-3 text-indigo-600" />
        <span className="lg:text-[15px] md:text-[13px] sm:text-[12px] text-[10px] font-semibold bg-linear-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
          {readingTime} min Read
        </span>
        </div>
      </div>
  </div>


 <Link href="/dashboard">
  <Button
    variant="ghost"
    size="sm"
    className="
      group flex items-center gap-2 rounded-full py-[3px] lg:px-6 lg:py-5 
      bg-linear-to-r from-indigo-100 via-blue-100 to-indigo-100 backdrop-blur-md border border-indigo-200/40
      shadow-sm hover:shadow-lg hover:scale-[1.03] transition-all duration-300
    "
  >
    <ChevronLeft
      className="
        h-3 w-3 sm:h-4 sm:w-4 text-indigo-600
        transition-transform duration-300 group-hover:-translate-x-1
      "
    />

    <span className="text-[11px] sm:text-sm lg:text-base font-medium text-gray-700">
      Back <span className="hidden sm:inline">to Summaries</span>
    </span>
  </Button>
</Link>

</div>
      <h1 className="lg:text-3xl md:text-2xl sm:text-xl text-lg pl-10 font-bold">{title}</h1>
    </div>
    );
}