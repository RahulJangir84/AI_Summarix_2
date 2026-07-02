"use client";
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { toast } from "sonner";
import {
  generatePdfSummary,
  saveSummaryToDatabase,
} from "@/actions/upload-action";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

// Validate the file before uploading
const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 24 * 1024 * 1024,
      "File size must be less than 24MB",
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF",
    ),
});
export default function UploadForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { startUpload} = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.info("Uploaded successfully");
    },
    onUploadError: (err) => {
      toast.error("Upload failed", {
        description: err.message,
      });
    },
    onUploadBegin: () => {
      // Loading state is already shown via isLoading
      console.info("Upload started");
    },
  });

  // handlesubmit is called when form is submitted
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //stops browser reload

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;
      //validation
      const validatedFields = schema.safeParse({ file });
      if (!validatedFields.success) {
        toast.error("Invalid file", {
          description: validatedFields.error.message,
        });
        setIsLoading(false);
        return;
      }

      toast.success("Uploading PDF...", {
        description: "Please wait while we upload your PDF",
      });

      //upload file to uploadthing
      //Behind the scenes:
      // Client asks server for presigned URL
      // UploadThing returns secure URL
      // File uploads directly to CDN
      // Final file URL is returned
      const resp = await startUpload([file]);
      if (!resp || resp.length === 0) {
        toast.error("Something went wrong", {
          description: "Please try again with a different file",
        });
        setIsLoading(false);
        return;
      }

      toast.success("Processing PDF...", {
        description: "Please wait while we process your PDF",
      });

      //parse the pdf using langchain
      const summary = await generatePdfSummary(resp);
      console.info({summary},"Summary generated from PDF");

      let data;
      if (summary) {
        data = summary.data ?? null;
      } else {
        data = null;
      }
      console.info({data},"Data received from summary generation");
      
      if (data) {
        let storeResponse: { success: boolean; message: string; data?: { id: string } | null } | undefined;
        toast.success("Saving PDF..", {
          description: "Please wait while we save your summary",
        });

        // upload to database if summary is not null
        if (data.summary) {
          storeResponse = await saveSummaryToDatabase({
          summary: data.summary,
            pdfUrl: resp[0].serverData.file.url, //got the uploadthing
          title: data.title,
          pdfName: file.name,
        });

          if (storeResponse && storeResponse.success && storeResponse.data) {
            toast.success("Summary Generated", {
              description:
                "Your PDF has been saved successfully summarized and saved",
            });

            formRef.current?.reset();
            //redirect to summary page as soon as summary is saved
             router.push(`/summaries/${storeResponse.data.id}`);
      } else {
            toast.error("Error saving summary", {
              description: storeResponse?.message || "Failed to save summary",
        });
          }
        }
      }
    } catch (error) {
      toast.error("Something went wrong", {
        description: error instanceof Error ? error.message : "Please try again",
      });
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    //handlesubmit runs when form is submitted in uploadforminput
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto ">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
