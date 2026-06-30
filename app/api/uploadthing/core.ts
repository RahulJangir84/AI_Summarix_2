import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { hasReachedUploadLimit } from "@/lib/user";
import { toast } from "sonner";
import { logger } from "@/lib/logger";
const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(async ({ req }) => {
      const user = await currentUser();
      // if user is not signed in
      if (!user) throw new UploadThingError("Unauthorized");
      
      const email = user.emailAddresses?.[0]?.emailAddress;
      if (!email) throw new UploadThingError("Unauthorized");

      const { hasReachedLimit } = await hasReachedUploadLimit(user.id, email);

      if (hasReachedLimit) {
        toast.error("Upload limit reached. Please upgrade your plan.");
        throw new UploadThingError("Upload limit reached. Please upgrade your plan.");
      }
      // return to be used in onUploadComplete
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      logger.info({userId: metadata.userId},"Upload complete for userId:");
      logger.info({fileUrl: file.ufsUrl},"File url:");
      return {
        userId: metadata.userId,
        file: { url: file.ufsUrl, name: file.name },
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
