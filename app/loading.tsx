import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-16 w-16 rounded-full border-4 border-indigo-100"></div>
          <Loader2 className="h-16 w-16 animate-spin text-indigo-600 relative z-10" />
        </div>
        <p className="text-lg font-medium text-gray-500 animate-pulse tracking-wide">
          Loading content...
        </p>
      </div>
    </div>
  );
}
