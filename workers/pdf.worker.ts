import * as Comlink from "comlink";
import { parsePdf, splitIntoPages } from "@/lib/pdf/split";
import { buildZipFromPages } from "@/lib/zip/createZip";
import { classifyPdfError, encodeWorkerError } from "@/lib/pdf/errors";
import { mergePdfs } from "@/lib/pdf/merge";
import { compressPdf } from "@/lib/pdf/compress";
import { deletePages } from "@/lib/pdf/deletePages";
import { imagesToPdf, type ImageInput } from "@/lib/pdf/imagesToPdf";
import type { ProcessingStage } from "@/types";

export interface WorkerSplitResult {
  pageCount: number;
  pages: { fileName: string; pageNumber: number; sizeBytes: number; bytes: Uint8Array }[];
  zipBytes: Uint8Array;
  zipFileName: string;
  zipSizeBytes: number;
}

export type ProgressCallback = (stage: ProcessingStage, completed: number, total: number) => void;

const api = {
  /**
   * Full pipeline: parse -> split -> zip. Runs entirely inside the worker
   * so the main thread never blocks, regardless of file size.
   */
  async splitPdf(
    fileBytes: ArrayBuffer,
    originalFileName: string,
    onProgress: ProgressCallback,
  ): Promise<WorkerSplitResult> {
    try {
      onProgress("reading", 0, 1);
      const parsed = await parsePdf(fileBytes);

      onProgress("splitting", 0, parsed.pageCount);
      const rawPages = await splitIntoPages(parsed, (completed, total) => {
        onProgress("splitting", completed, total);
      });

      onProgress("zipping", 0, 1);
      const { zipBytes, zipFileName } = await buildZipFromPages(rawPages, originalFileName);

      return {
        pageCount: parsed.pageCount,
        pages: rawPages.map((p) => ({
          fileName: `page-${p.pageNumber}.pdf`,
          pageNumber: p.pageNumber,
          sizeBytes: p.bytes.byteLength,
          bytes: p.bytes,
        })),
        zipBytes,
        zipFileName,
        zipSizeBytes: zipBytes.byteLength,
      };
    } catch (error) {
      const code = classifyPdfError(error);
      throw new Error(encodeWorkerError(code));
    }
  },

  /** Lightweight parse-only call, used to get page count during the "reading" stage if needed standalone. */
  async getPageCount(fileBytes: ArrayBuffer): Promise<number> {
    const parsed = await parsePdf(fileBytes);
    return parsed.pageCount;
  },

  async mergePdfFiles(filesBytes: ArrayBuffer[]): Promise<Uint8Array> {
    try {
      return await mergePdfs(filesBytes);
    } catch (error) {
      throw new Error(encodeWorkerError(classifyPdfError(error)));
    }
  },

  async compressPdfFile(fileBytes: ArrayBuffer): Promise<{ bytes: Uint8Array; originalSizeBytes: number; compressedSizeBytes: number }> {
    try {
      return await compressPdf(fileBytes);
    } catch (error) {
      throw new Error(encodeWorkerError(classifyPdfError(error)));
    }
  },

  async deletePagesFromPdf(fileBytes: ArrayBuffer, pageNumbers: number[]): Promise<Uint8Array> {
    try {
      return await deletePages(fileBytes, pageNumbers);
    } catch (error) {
      throw new Error(encodeWorkerError(classifyPdfError(error)));
    }
  },

  async imagesToPdfFile(images: ImageInput[]): Promise<Uint8Array> {
    try {
      return await imagesToPdf(images);
    } catch {
      throw new Error(encodeWorkerError("PROCESSING_FAILED"));
    }
  },
};

export type PdfWorkerApi = typeof api;

Comlink.expose(api);
