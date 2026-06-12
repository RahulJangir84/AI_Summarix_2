import { FileText } from "lucide-react";
import { Card } from "../ui/card";
import DeleteButton from "./delete-button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

import { Summary } from "@/lib/summary";

export default function SummaryCard({ summary }: { summary: Summary }) {
  return (
    <div>
      <Card className="relative h-full">
        <div className="absolute top-2 right-2">
          <DeleteButton summaryId={summary.id} />
        </div>
        <Link href={`summaries/${summary.id}`} className="block p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400"></FileText>
              <div className="flex-1 min-w-0">
                <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate w-4/5 dark:text-slate-200">
                  {summary.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-slate-400">{formatDistanceToNow(new Date(summary.created_at), { addSuffix: true })}</p>
              </div>
            </div>
            <p className="line-clamp-2 text-sm sm:text-base pl-2 text-gray-600 dark:text-slate-300">
              {summary.summary_text}
            </p>
            <div>
              <span className="flex justify-between items-center mt-2 sm:mt-4">
                <div
                  className={cn(
                    "capitalize rounded-full px-3 py-1 text-xs font-medium",
                    summary.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  )}
                >
                  {summary.status}
                </div>
              </span>
            </div>
          </div>
        </Link>
      </Card>
    </div>
  );
}
