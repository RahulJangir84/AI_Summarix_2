import UploadHeader from "@/components/upload/upload-header";
import UploadForm from "@/components/upload/upload-form";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { hasReachedUploadLimit } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MessageSquareWarning } from "lucide-react";
export default async function Page() {
  const user=await currentUser();
  const userId=user?.id;
  if (!userId) {
      return redirect('/sign-in');
  }
  const email=user?.emailAddresses?.[0]?.emailAddress;
  if(!email){
      return redirect('/sign-in');
  }
  const {hasReachedLimit}=await hasReachedUploadLimit(userId,email);
  if(hasReachedLimit){
    return redirect('/dashboard');
  }
  return (
      <section className="relative h-full w-full overflow-hidden">
        <BackgroundBeamsWithCollision>
        <div className="flex flex-col items-center justify-center text-center gap-6">
        <UploadHeader />
        <UploadForm />
        <div className="mt-2">
          <div className="flex items-center gap-2">
            <MessageSquareWarning className="w-4 h-4 text-gray-600 dark:text-slate-400" />
            <p className="text-sm dark:text-slate-400 text-gray-600">You will automatically redirected to dashboard after successful upload</p>
          </div>
        </div>
        </div>
      </BackgroundBeamsWithCollision>
    </section>
  );
}
