'use client'
import { ExternalLink, FileText } from "lucide-react";
import { Button } from "../ui/button";
import DownloadButton from "./downloadButton";

export default function SourceInfo({original_file_url, file_name, title, summary_text, created_at}: {
    original_file_url: string;
    file_name: string;
    title: string;
    summary_text: string;
    created_at: string;
}) {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 lg:gap-12 pt-5 text-sm text-muted-foreground flex-wrap">

            <div className="flex items-center justify-center gap-1.5">
                <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                <p className="text-[12px] sm:text-[13px] lg:text-[15px] truncate max-w-[180px] sm:max-w-[240px] lg:max-w-none">
                    Source: {file_name}
                </p>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
                <Button
                    className="px-2 sm:px-3 text-[12px] sm:text-[13px] lg:text-[15px] text-indigo-600 hover:text-indigo-700"
                    variant="ghost"
                    size="sm"
                    asChild
                >
                    <a href={original_file_url} className="dark:text-blue-400" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 dark:text-blue-400 shrink-0" />
                        <span className="whitespace-nowrap">View Original</span>
                    </a>
                </Button>

                <DownloadButton file_name={file_name} created_at={created_at} title={title} summary_text={summary_text}/>
            </div>

        </div>
    );
}