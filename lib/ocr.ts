import vision from "@google-cloud/vision";
import { pdf } from "pdf-to-img";

function getVisionClient() {
  return new vision.ImageAnnotatorClient();
}

export async function extractTextFromPdf(pdfBuffer: Buffer): Promise<string> {
  const client = getVisionClient();
  const pageTexts: string[] = [];

  // pdf-to-img handles rendering internally — no canvas setup needed
  const doc = await pdf(pdfBuffer, { scale: 3 });

  for await (const pageImageBuffer of doc) {
    const [result] = await client.documentTextDetection({
      image: { content: pageImageBuffer },
    });

    const pageText = result.fullTextAnnotation?.text ?? "";
    pageTexts.push(pageText);
  }

  if (pageTexts.length === 0) {
    throw new Error("Failed to extract text from PDF using OCR");
  }

  return pageTexts.join("\n\n--- Page Break ---\n\n");
}