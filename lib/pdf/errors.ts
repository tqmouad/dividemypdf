import { EncryptedPDFError } from "pdf-lib";
import type { ProcessingErrorCode } from "@/lib/errors/types";

/** Prefix used to smuggle a classified error code across the Worker boundary as a plain string message. */
export const WORKER_ERROR_PREFIX = "WORKER_ERR::";

export function classifyPdfError(error: unknown): ProcessingErrorCode {
  if (error instanceof EncryptedPDFError) {
    return "PASSWORD_PROTECTED";
  }

  const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();

  if (message.includes("encrypt")) return "PASSWORD_PROTECTED";
  if (message.includes("out of memory") || message.includes("allocation failed")) {
    return "PROCESSING_FAILED";
  }
  // pdf-lib throws a variety of parse errors for malformed input
  // (bad trailer, missing xref, unexpected token, etc.) — all map to CORRUPTED_PDF.
  return "CORRUPTED_PDF";
}

export function encodeWorkerError(code: ProcessingErrorCode): string {
  return `${WORKER_ERROR_PREFIX}${code}`;
}

export function decodeWorkerError(message: string): ProcessingErrorCode | null {
  if (!message.startsWith(WORKER_ERROR_PREFIX)) return null;
  return message.slice(WORKER_ERROR_PREFIX.length) as ProcessingErrorCode;
}
