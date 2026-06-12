"use client";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { forwardRef } from "react";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading:boolean;
}

//upload form input triggers the onSubmit function
const UploadFormInput=forwardRef<HTMLFormElement,UploadFormInputProps>(({onSubmit,isLoading},ref)=>{
  return (
    <form className="flex flex-col gap-6 mt-4" onSubmit={onSubmit} ref={ref}>
      <div className="flex justify-end items-center gap-4">
        <Input type="file" accept="application/pdf" name="file" id="file" required disabled={isLoading} className={`isLoading ? 'cursor-not-allowed opacity-50' : '' , border-slate-600`} />
        <Button className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-300 dark:hover:bg-indigo-400 cursor-pointer" disabled={isLoading}>
          {isLoading ?
          (<> <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Processing...</> 
            )
            : 'Upload your PDF'}
        </Button>
      </div>
    </form>
  )
} 
);

UploadFormInput.displayName="UploadFormInput";
export default UploadFormInput;