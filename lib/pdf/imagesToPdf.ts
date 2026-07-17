import { PDFDocument } from "pdf-lib";

export interface ImageInput {
  bytes: ArrayBuffer;
  isPng: boolean;
}

export async function imagesToPdf(images: ImageInput[]): Promise<Uint8Array> {
  const doc = await PDFDocument.create();

  for (const image of images) {
    const embedded = image.isPng ? await doc.embedPng(image.bytes) : await doc.embedJpg(image.bytes);
    const page = doc.addPage([embedded.width, embedded.height]);
    page.drawImage(embedded, { x: 0, y: 0, width: embedded.width, height: embedded.height });
  }

  return doc.save();
}
