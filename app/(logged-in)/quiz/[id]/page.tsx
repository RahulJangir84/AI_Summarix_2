import { getSummaryById } from "@/lib/summary";
import generateQuiz from "@/lib/quiz";
import InteractiveQuiz from "@/components/summaries/interactiveQuiz";
import { redirect } from "next/navigation";

interface QuizPageProps {
  params: Promise<{ id: string }>;
}

export default async function QuizPage({ params }: QuizPageProps) { 
    const { id } = await params;
    const summary = await getSummaryById(id);
    if (!summary || !summary.original_file_url) {
        redirect("/dashboard");
    }

    const quizData = await generateQuiz(summary.original_file_url);

    return (
        <div className="container mx-auto px-4 py-22 max-w-3xl">
            <InteractiveQuiz 
              questions={quizData.questions || quizData} 
              title={summary.title} 
              summaryId={id}
            />
        </div>
    );
}
