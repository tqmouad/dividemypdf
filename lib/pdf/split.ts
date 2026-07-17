import { PDFDocument } from "pdf-lib";

export interface RawSplitPage {
  pageNumber: number;
  bytes: Uint8Array;
}

export interface ParsedPdf {
  pageCount: number;
  doc: PDFDocument;
}

/** Loads a PDF from raw bytes. Throws pdf-lib's native errors on bad input. */
export async function parsePdf(bytes: ArrayBuffer): Promise<ParsedPdf> {
  const doc = await PDFDocument.load(bytes, {
    // We deliberately do NOT set ignoreEncryption: true — encrypted PDFs
    // should surface as a clear "password protected" error, not silently
    // process (and likely fail later, or worse, succeed on garbage data).
    updateMetadata: false,
  });
  return { doc, pageCount: doc.getPageCount() };
}

/**
 * Splits a parsed PDF into one single-page PDF per page.
 * `onProgress` is called after each page is generated, for progress UI.
 */
export async function splitIntoPages(
  parsed: ParsedPdf,
  onProgress?: (completed: number, total: number) => void,
): Promise<RawSplitPage[]> {
  const { doc, pageCount } = parsed;
  const results: RawSplitPage[] = [];

  for (let i = 0; i < pageCount; i++) {
    const newDoc = await PDFDocument.create();
    const [copiedPage] = await newDoc.copyPages(doc, [i]);
    newDoc.addPage(copiedPage);
    const bytes = await newDoc.save();
    results.push({ pageNumber: i + 1, bytes });
    onProgress?.(i + 1, pageCount);
  }

  return results;
}
