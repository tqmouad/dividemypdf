import { PDFDocument } from "pdf-lib";

export interface CompressResult {
  bytes: Uint8Array;
  originalSizeBytes: number;
  compressedSizeBytes: number;
}

/**
 * Re-serializes the PDF using object streams, which removes redundant
 * structure (duplicate objects, unused metadata, uncompressed cross-ref
 * tables). This is a safe, lossless pass — it does not recompress
 * embedded images, so savings vary: often meaningful on text/form-heavy
 * PDFs, modest on image-heavy ones.
 */
export async function compressPdf(bytes: ArrayBuffer): Promise<CompressResult> {
  const doc = await PDFDocument.load(bytes, { updateMetadata: false });

  const compressed = await doc.save({
    useObjectStreams: true,
    addDefaultPage: false,
  });

  return {
    bytes: compressed,
    originalSizeBytes: bytes.byteLength,
    compressedSizeBytes: compressed.byteLength,
  };
}
