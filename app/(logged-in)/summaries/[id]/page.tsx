import SummaryHeader from "@/components/summaries/summary-card-header";
import { getSummaryById } from "@/lib/summary";
import SourceInfo from "@/components/summaries/source-info";
import SummarySlider from "@/components/summaries/summary-slider";
import ChatWidget from "@/components/chat/chat-widget";

export default async function Page({params,}: {
  params: Promise<{ id: string }>;
}){
  const { id } = await params;
  const summary=await getSummaryById(id);
  if(!summary){
    return (
      <div>
        Summary not found
      </div>
    );
  }
  const {title,summary_text,file_name,created_at,word_count,original_file_url}=summary;
  const readingTime=Math.ceil((word_count||0)/100);

  
  return (
    <div className="container mx-auto flex flex-col gap-4">
        <div className="px-4 bg-linear-to-b from-indigo-100/40 to-indigo-200/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
            <div className="flex flex-col">
                <SummaryHeader title={title} created_at={created_at.toDateString()} readingTime={readingTime}/>
                <SourceInfo original_file_url={original_file_url} file_name={file_name} title={title} summary_text={summary_text} created_at={created_at.toDateString()}/>
                <SummarySlider summary={summary_text}/>
            </div>
            <ChatWidget summaryText={summary_text} />
        </div>
    </div>
  );
}