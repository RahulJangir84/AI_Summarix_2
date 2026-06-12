import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { extractTextFromPdf } from "./ocr";

export async function fetchAndExtractPdfText(fileUrl: string) {
  const response = await fetch(fileUrl);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // trying normal extraction 
  const loader = new PDFLoader(new Blob([arrayBuffer]));
  const docs = await loader.load();
  let text = docs.map((doc) => doc.pageContent).join("\n").trim();

  // Fallback to OCR if text is empty or very short (likely handwritten or image-based PDF)
  if (text.length < 50) {
    console.log("OCR is being used");
    try {
      const ocrText = await extractTextFromPdf(buffer);
      if (ocrText.length > text.length) {
        text = ocrText;
      }
    } catch (error) {
      console.error("OCR fallback failed:", error);
    }
  }

  return text;
}
