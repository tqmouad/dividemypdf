/**
 * Categorized, typed errors. Every future tool reuses this shape so the
 * UI can render errors exhaustively with `switch` and TypeScript will
 * flag any unhandled case at compile time.
 */

export type ProcessingErrorCode =
  | "NOT_A_PDF"
  | "FILE_TOO_LARGE"
  | "TOO_MANY_PAGES"
  | "EMPTY_FILE"
  | "CORRUPTED_PDF"
  | "PASSWORD_PROTECTED"
  | "BROWSER_UNSUPPORTED"
  | "PROCESSING_FAILED"
  | "UNEXPECTED_ERROR";

export interface ProcessingError {
  code: ProcessingErrorCode;
  /** Short, human title shown as the error card heading. */
  title: string;
  /** Plain-language explanation of what happened. */
  message: string;
  /** What the person can do about it. */
  solution: string;
  /** Whether a "Try again" action makes sense for this error. */
  retryable: boolean;
}

interface ErrorContext {
  pageCount?: number;
  maxPages?: number;
  fileSizeMb?: number;
  maxSizeMb?: number;
}

export function createProcessingError(
  code: ProcessingErrorCode,
  context: ErrorContext = {},
): ProcessingError {
  switch (code) {
    case "NOT_A_PDF":
      return {
        code,
        title: "Unsupported file type",
        message: "This file doesn't look like a PDF.",
        solution: "Choose a file with a .pdf extension and try again.",
        retryable: true,
      };
    case "FILE_TOO_LARGE":
      return {
        code,
        title: "File is too large",
        message: context.fileSizeMb
          ? `This file is ${context.fileSizeMb.toFixed(1)} MB. The free version supports files up to ${context.maxSizeMb ?? 20} MB.`
          : `The free version supports files up to ${context.maxSizeMb ?? 20} MB.`,
        solution: "Compress the PDF first, or try a smaller file.",
        retryable: true,
      };
    case "TOO_MANY_PAGES":
      return {
        code,
        title: "Too many pages",
        message: context.pageCount
          ? `This PDF contains ${context.pageCount} pages. The free version supports up to ${context.maxPages ?? 10} pages.`
          : `The free version supports up to ${context.maxPages ?? 10} pages.`,
        solution: "Split the document into smaller parts first, or try a shorter PDF.",
        retryable: true,
      };
    case "EMPTY_FILE":
      return {
        code,
        title: "Empty file",
        message: "This PDF doesn't contain any readable pages.",
        solution: "Check the file and try uploading a different PDF.",
        retryable: true,
      };
    case "CORRUPTED_PDF":
      return {
        code,
        title: "We couldn't read this PDF",
        message: "The file appears to be damaged or isn't a valid PDF.",
        solution: "Try re-exporting or re-saving the PDF, then upload it again.",
        retryable: true,
      };
    case "PASSWORD_PROTECTED":
      return {
        code,
        title: "This PDF is password-protected",
        message: "Encrypted PDFs can't be split until the password is removed.",
        solution: "Remove the password from the PDF, then upload it again.",
        retryable: true,
      };
    case "BROWSER_UNSUPPORTED":
      return {
        code,
        title: "Browser not supported",
        message: "Your browser is missing features required to process PDFs locally.",
        solution: "Try the latest version of Chrome, Edge, Firefox, or Safari.",
        retryable: false,
      };
    case "PROCESSING_FAILED":
      return {
        code,
        title: "Processing failed",
        message: "Something went wrong while splitting this PDF.",
        solution: "Try again. If the problem continues, try a different file.",
        retryable: true,
      };
    case "UNEXPECTED_ERROR":
    default:
      return {
        code: "UNEXPECTED_ERROR",
        title: "Unexpected error",
        message: "Something unexpected happened.",
        solution: "Please try again.",
        retryable: true,
      };
  }
}

export class AppProcessingError extends Error {
  readonly processingError: ProcessingError;

  constructor(code: ProcessingErrorCode, context: ErrorContext = {}) {
    const processingError = createProcessingError(code, context);
    super(processingError.message);
    this.name = "AppProcessingError";
    this.processingError = processingError;
  }
}
