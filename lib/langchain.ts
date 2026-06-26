import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { extractTextFromPdf } from "./ocr";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { logger } from "./logger";

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
})


export async function getPdfBufferAndText(fileUrl: string) {
  logger.info({ fileUrl },"Fetching PDF from URL:");
  const response = await fetch(fileUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch PDF: ${response.statusText} (URL: ${fileUrl})`);
  }
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // trying normal extraction 
  const loader = new PDFLoader(new Blob([arrayBuffer]));
  const docs = await loader.load();
  const chunks = await splitter.splitDocuments(docs);
  let text = chunks.map(chunk => chunk.pageContent).join("\n");
  return { buffer, text };
}

export async function fetchAndExtractPdfText(fileUrl: string) {
  const { buffer, text: pdfText } = await getPdfBufferAndText(fileUrl);
  let text = pdfText;
  // Fallback to OCR if text is empty or very short (likely handwritten or image-based PDF)
  if (text.trim().length < 50) {
    logger.info("OCR is being used");
    try {
      const ocrText = await extractTextFromPdf(buffer);

      if (ocrText.length > text.length) {
        text = ocrText;
      }
    } catch (error) {
      logger.error({error,fileUrl } ,"OCR fallback extraction failed");
    }
  }

  return text;
}



