import { getActiveLimits } from "@/lib/config/limits";
import { AppProcessingError } from "@/lib/errors/types";

const BYTES_PER_MB = 1024 * 1024;

/**
 * Cheap, synchronous checks that don't require parsing the PDF.
 * Runs on the main thread before the file is handed to the worker.
 */
export function validateFileBeforeRead(file: File): void {
  const limits = getActiveLimits();

  const looksLikePdf =
    file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

  if (!looksLikePdf) {
    throw new AppProcessingError("NOT_A_PDF");
  }

  if (file.size === 0) {
    throw new AppProcessingError("EMPTY_FILE");
  }

  if (file.size > limits.maxFileSizeBytes) {
    throw new AppProcessingError("FILE_TOO_LARGE", {
      fileSizeMb: file.size / BYTES_PER_MB,
      maxSizeMb: limits.maxFileSizeBytes / BYTES_PER_MB,
    });
  }
}

/** Checks that require the parsed page count, run after the worker reads the file. */
export function validatePageCount(pageCount: number): void {
  const limits = getActiveLimits();

  if (pageCount === 0) {
    throw new AppProcessingError("EMPTY_FILE");
  }

  if (pageCount > limits.maxPages) {
    throw new AppProcessingError("TOO_MANY_PAGES", {
      pageCount,
      maxPages: limits.maxPages,
    });
  }
}

/** Feature-detects the browser APIs the app relies on. */
export function isBrowserSupported(): boolean {
  if (typeof window === "undefined") return true;
  return (
    typeof Worker !== "undefined" &&
    typeof Blob !== "undefined" &&
    typeof URL?.createObjectURL === "function"
  );
}
