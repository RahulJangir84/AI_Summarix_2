import { Button } from "../ui/button";
import Link from "next/link";
export default function EmptySummary() {
  return (
    <div className="flex flex-col items-center justify-center h-70 rounded-2xl w-full">
      <h1 className="text-2xl font-semibold">
        You don&apos;t have any summaries yet
      </h1>
      <p className="text-gray-500 text-lg mt-2">
        Upload your pdf to summarize
      </p>
      <Link href="/upload" className="mt-4">
        <Button className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
          Upload PDF
        </Button>
      </Link>
    </div>
  );
}
