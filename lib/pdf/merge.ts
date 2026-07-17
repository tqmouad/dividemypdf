import { PDFDocument } from "pdf-lib";

export async function mergePdfs(filesBytes: ArrayBuffer[]): Promise<Uint8Array> {
  const merged = await PDFDocument.create();

  for (const bytes of filesBytes) {
    const doc = await PDFDocument.load(bytes, { updateMetadata: false });
    const pages = await merged.copyPages(doc, doc.getPageIndices());
    pages.forEach((page) => merged.addPage(page));
  }

  return merged.save();
}
