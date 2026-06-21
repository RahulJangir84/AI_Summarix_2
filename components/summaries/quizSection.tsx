"use client"
import { Button } from "../ui/button";
import { BookOpenCheck } from "lucide-react";
import { useRouter } from "next/navigation";



export default function QuizSection({
    id
}:{
    id:string;
}){
  const router=useRouter();
    return(
        <div className=" ml-3 flex">
      <Button
        variant="ghost"
        size="sm"
        className="cursor-pointer"
        onClick={() => router.push(`/quiz/${id}`)}
      >
      
          < BookOpenCheck className="mr-1 lg:h-4 lg:w-4 md:h-4 md:w-4 sm:w-4 sm:h-4 h-3 w-3 text-indigo-600 dark:text-blue-400 transition-transform duration-300 group-hover:-translate-x-1" />
        <span className="lg:text-[16px] md:text-[14px] sm:text-[13px] text-[12px] font-medium text-indigo-600 dark:text-blue-400">
          Generate Quiz
        </span>
      </Button>
    </div>
    )

}