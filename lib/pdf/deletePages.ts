import { PDFDocument } from "pdf-lib";

/** `pageNumbersToDelete` are 1-based. */
export async function deletePages(bytes: ArrayBuffer, pageNumbersToDelete: number[]): Promise<Uint8Array> {
  const doc = await PDFDocument.load(bytes, { updateMetadata: false });
  const indicesToDelete = new Set(pageNumbersToDelete.map((n) => n - 1));

  // Remove from the end so earlier indices stay valid as we go.
  [...indicesToDelete]
    .sort((a, b) => b - a)
    .forEach((index) => doc.removePage(index));

  return doc.save();
}
