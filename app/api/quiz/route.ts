// app/api/quiz/route.ts
import generateQuiz from "@/lib/quiz";
export async function POST(req: Request) {
  const { pdfUrl } = await req.json();
    const quiz = await generateQuiz(pdfUrl);

    return Response.json(quiz);
}