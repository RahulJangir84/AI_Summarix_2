"use client";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { deleteSummaryAction } from "@/actions/delete_summary";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
interface deleteSummaryProps {
  summaryId: string;
}
export default function DeleteButton({ summaryId }: deleteSummaryProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting,setIsDeleting]=useState(false);
  const deleteSummary = async () => {
    try {
      setIsDeleting(true);
      const result = await deleteSummaryAction(summaryId);
      if (!result.success) {
        toast.error("Error",{
          description:"Failed to delete summary",
        });
      }
      else{
        toast.success("Summary Deleted",{
          description:"Summary has been deleted successfully",
        });
      }
      setOpen(false); //closing the dialog on success
    } catch (error) {
      toast.error("Error",{
        description:"Failed to delete summary",
      });
      console.log("Error deleting summary", error);
    }
    finally{
      setIsDeleting(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 bg-gray-100 hover:text-indigo-700 hover:bg-indigo-300 dark:bg-red-700/80 dark:hover:bg-red-500/70"
        >
          <Trash2 className="h-4 w-4 dark:text-black " />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this summary? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              disabled={isDeleting}
              className="hover:cursor-pointer"
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
          disabled={isDeleting}
          className="hover:cursor-pointer"
            type="button"
            variant="destructive"
            onClick={deleteSummary}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
