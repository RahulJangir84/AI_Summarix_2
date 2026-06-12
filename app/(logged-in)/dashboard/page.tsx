import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import SummaryCard from "@/components/summaries/summary-card";
import { getSummaries } from "@/lib/summary";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import EmptySummary from "@/components/summaries/empty-summary";
import { hasReachedUploadLimit } from "@/lib/user";

export default async function Dashboard() {
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) return redirect('/sign-in');

    const summaries = await getSummaries(userId);
    const email = user?.emailAddresses?.[0]?.emailAddress;
    if (!email) return redirect('/sign-in');

    const { hasReachedLimit, currentCount, limit, planName } = await hasReachedUploadLimit(userId, email);

    return (
        <main className="min-h-screen pt-5 bg-linear-to-b dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 dark:via-80%">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24">

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 sm:mb-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-linear-to-r from-gray-600 to-gray-900 bg-clip-text dark:text-[#D2D2D7] text-transparent">
                            Your summaries
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600 dark:text-slate-300">
                            All the summaries you&apos;ve created will appear here
                        </p>
                    </div>

                    {!hasReachedLimit && (
                        <div className="shrink-0">
                            <Button
                                size="lg"
                                className="hover:cursor-pointer h-10 px-4 sm:px-6 text-white text-sm sm:text-base bg-indigo-600/90 hover:bg-indigo-700 dark:bg-[#a5b4fc] dark:hover:bg-[#8490f8] shadow-lg shadow-indigo-600/20"
                            >
                                <Link className="flex items-center dark:text-slate-900" href="/upload">
                                    <Plus className="mr-1.5 h-4 w-4" />
                                    New Summary
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>

                {/* Usage banner */}
                <div className="mb-6 bg-indigo-100 border border-indigo-200 rounded-lg p-3 sm:p-4 text-indigo-800">
                    <p className="text-xs sm:text-sm leading-relaxed">
                        You&apos;ve used {currentCount} out of {limit} uploads on the{" "}
                        <span className="font-medium">{planName ?? "Free"} Plan</span>.{" "}
                        <Link
                            href="/#pricing"
                            className="underline font-medium underline-offset-4 inline-flex items-center gap-0.5 hover:text-indigo-600 transition-colors"
                        >
                            Upgrade to Pro
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>{" "}
                        for unlimited uploads.
                    </p>
                </div>

                {summaries.length === 0 ? (
                    <EmptySummary />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {summaries.map((summary, index) => (
                            <SummaryCard key={index} summary={summary} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}