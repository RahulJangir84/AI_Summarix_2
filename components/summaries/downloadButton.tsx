"use client";
import { Button } from "../ui/button";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { marked } from "marked";
import { toast } from "sonner";

export default function DownloadButton({
  file_name,
  created_at,
  title,
  summary_text,
}: {
  file_name: string;
  created_at: string;
  title: string;
  summary_text: string;
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPdf = async () => {
    try {
      setIsDownloading(true);
      //html2pdf gives issue with the lab component where it does not render the markdown content properly, when downloading ,the project is using the tailwind css v4 which generated moder css using color spaces like oklch() and lab() which are not supported by the html2pdf library
      //so we are using the window.print() method to print the content
      const htmlContent = await marked.parse(summary_text); //convert markdown to html

      const htmlDocument = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>${title || "Summary"}</title>
            <style>
              body {
                font-family: system-ui, -apple-system, sans-serif;
                color: #333;
                background: #ffffff;
                padding: 40px;
                margin: 0;
              }
              h1 { color: #4f46e5; font-size: 25px; margin-bottom: 10px; }
              .meta-box {
                color: #666; font-size: 14px; margin-bottom: 30px;
                border-bottom: 1px solid #eee; padding-bottom: 20px;
              }
              .content { font-size: 15px; color: #444; line-height: 1.6; }
              ul { margin-left: 20px; list-style-type: disc; margin-bottom: 15px; }
              ol { margin-left: 20px; list-style-type: decimal; margin-bottom: 15px; }
              li { margin-bottom: 6px; }
              h3 { color: #4f46e5; margin-top: 20px; margin-bottom: 10px; }
              h4 { color: #4f46e5; margin-top: 20px; margin-bottom: 10px; }
              strong { color: #111; font-weight: 600; }
              p { margin-bottom: 15px; }
              
              /* Optimize for printing to PDF */
              @media print {
                @page { margin: 1cm; }
                body { padding: 0; }
              }
            </style>
          </head>
          <body>
            <h1>${title}</h1>
            <div class="meta-box">
              <strong>Generated on:</strong> ${new Date(created_at).toLocaleDateString()}<br/>
              <strong>Original File:</strong> ${file_name}
            </div>
            <div class="content">
              ${htmlContent}
            </div>
            <script>
            // this script will open the print dialog
               window.onload = function() {
                 window.focus();
                 window.print();
               }
            </script>
          </body>
        </html>
      `;

      // Create an invisible iframe to host the print document
      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.width = "0px";
      iframe.style.height = "0px";
      iframe.style.border = "none";
      document.body.appendChild(iframe);

      //write html document to iframe
      const iframeDoc = iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(htmlDocument);
        iframeDoc.close();
      }

      setTimeout(() => {
        document.body.removeChild(iframe);
        setIsDownloading(false);
      }, 2000);

    } catch (error) {
      console.error("Failed to generate PDF", error);
      setIsDownloading(false);
    }
  };

  return (
    <div className=" ml-3 flex">
      <Button
        variant="ghost"
        size="sm"
        className="cursor-pointer"
        onClick={downloadPdf}
        disabled={isDownloading}
      >
        {isDownloading ? (
          <Loader2 className="mr-1 lg:h-4 lg:w-4 md:h-4 md:w-4 sm:w-4 sm:h-4 h-3 w-3 text-indigo-600 animate-spin dark:text-blue-400" />
        ) : (
          <Download className="mr-1 lg:h-4 lg:w-4 md:h-4 md:w-4 sm:w-4 sm:h-4 h-3 w-3 text-indigo-600 dark:text-blue-400 transition-transform duration-300 group-hover:-translate-x-1" />
        )}

        <span className="lg:text-[16px] md:text-[14px] sm:text-[13px] text-[12px] font-medium text-indigo-600 dark:text-blue-400">
          {isDownloading ? "Preparing PDF..." : "Download"} <span className="hidden sm:inline">Summary</span>
        </span>
      </Button>
    </div>
  );
}
