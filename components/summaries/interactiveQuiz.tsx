'use client';
import { useState } from "react";
import { Button } from "../ui/button";
import { ArrowRight, RotateCcw, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Question {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export default function InteractiveQuiz({ 
  questions, 
  title, 
  summaryId 
}: { 
  questions: Question[]; 
  title: string; 
  summaryId: string; 
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showFinished, setShowFinished] = useState(false);

  const currentQuestion = questions[currentIdx];

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const handleNext = () => {
    if (selectedOption === currentQuestion.correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
    
    setIsAnswered(false);
    setSelectedOption(null);

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setShowFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowFinished(false);
  };

  // Completion view
  if (showFinished) {
    const finalScore = score + (selectedOption === currentQuestion.correctAnswerIndex ? 1 : 0);
    const scorePercentage = Math.round((finalScore / questions.length) * 100);

    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center shadow-xl flex flex-col items-center gap-6">
        <CheckCircle2 className="w-16 h-16 text-emerald-500" />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Quiz Completed!</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md">
          You finished the quiz for <strong>{title}</strong>.
        </p>
        <div className="bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 font-extrabold text-4xl py-6 px-10 rounded-2xl">
          {finalScore} / {questions.length} ({scorePercentage}%)
        </div>
        <div className="flex gap-4">
          <Button onClick={restartQuiz} className="flex gap-2">
            <RotateCcw className="w-4 h-4" /> Restart Quiz
          </Button>
          <Link href={`/summaries/${summaryId}`}>
            <Button variant="outline">Back to Summary</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-md">
      <div className="flex justify-between items-center mb-6 text-sm font-medium text-slate-400">
        <Link href={`/summaries/${summaryId}`} className="flex items-center gap-1 hover:text-slate-600 dark:hover:text-slate-200">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <span>Question {currentIdx + 1} of {questions.length}</span>
      </div>

      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 leading-snug">
        {currentQuestion.question}
      </h2>

      <div className="flex flex-col gap-3 mb-6">
        {currentQuestion.options.map((option, idx) => {
          let optionStyle = "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300";
          
          if (selectedOption === idx) {
            optionStyle = "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300";
          }
          if (isAnswered) {
            if (idx === currentQuestion.correctAnswerIndex) {
              optionStyle = "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300";
            } else if (selectedOption === idx) {
              optionStyle = "border-rose-500 bg-rose-50/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300";
            }
          }

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleOptionClick(idx)}
              className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex justify-between items-center ${optionStyle}`}
            >
              <span>{option}</span>
              {isAnswered && idx === currentQuestion.correctAnswerIndex && (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              )}
              {isAnswered && selectedOption === idx && idx !== currentQuestion.correctAnswerIndex && (
                <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 rounded-xl p-4 mb-6">
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Explanation</p>
          <p className="text-sm text-slate-600 dark:text-slate-300">{currentQuestion.explanation}</p>
        </div>
      )}

      <div className="flex justify-end">
        {!isAnswered ? (
          <Button 
            disabled={selectedOption === null}
            onClick={() => setIsAnswered(true)} 
            className="flex gap-2"
          >
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNext} className="flex gap-2">
            {currentIdx + 1 === questions.length ? "Finish Quiz" : "Next Question"} 
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
