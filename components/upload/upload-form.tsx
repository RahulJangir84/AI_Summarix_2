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
import router from "next/router";
//to validate the file
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

//

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("Uploaded successfully");
    },
    onUploadError: (err) => {
      console.error("error occured while uploading", err);
      toast.error("Error occured while uploading", {
        description: err.message,
      });
    },
    onUploadBegin: (fileName) => {
      console.log("Upload has begun for", fileName);
    },
  });

  // handlesubmit is called when form is submitted
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //stops browser reload

    try {
      setIsLoading(true);
      console.log("submitted");
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
      console.log({ summary });

      let data;
      if (summary) {
        data = summary.data ?? null;
      } else {
        data = null;
      }
      console.log({data});
      
      if (data) {
        let storeResponse: any;
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

          if (storeResponse.success) {
            toast.success("Summary Generated", {
              description:
                "Your PDF has been saved successfully summarized and saved",
            });

            formRef.current?.reset();
            //redirect to summary page as soon as summary is saved
            router.push(`/summary/${storeResponse.data.id}`);
          } else {
            toast.error("Error saving summary", {
              description: storeResponse.message,
            });
          }
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error Occured", error);
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
