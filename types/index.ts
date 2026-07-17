export interface SourceFileInfo {
  name: string;
  sizeBytes: number;
  pageCount: number;
}

export interface GeneratedPage {
  /** e.g. "page-1.pdf" */
  fileName: string;
  sizeBytes: number;
  /** In-memory bytes for the individual page PDF. */
  bytes: Uint8Array;
  pageNumber: number;
}

export interface SplitResult {
  source: SourceFileInfo;
  pages: GeneratedPage[];
  zipFileName: string;
  zipBytes: Uint8Array;
  zipSizeBytes: number;
  processingTimeMs: number;
}

export type ToolStage = "idle" | "validating" | "processing" | "success" | "error";

export const TOOL_STAGE_LABEL: Record<ToolStage, string> = {
  idle: "",
  validating: "Validating files…",
  processing: "Processing…",
  success: "Done",
  error: "Something went wrong",
};

export interface ToolResult {
  fileName: string;
  bytes: Uint8Array;
  sizeBytes: number;
  processingTimeMs: number;
  /** Optional extra info to display, e.g. compression ratio. */
  note?: string;
}

export type ProcessingStage =
  | "idle"
  | "validating"
  | "ready"
  | "reading"
  | "splitting"
  | "zipping"
  | "success"
  | "error";

export const PROCESSING_STAGE_LABEL: Record<ProcessingStage, string> = {
  idle: "",
  validating: "Validating PDF…",
  ready: "Ready to split",
  reading: "Reading PDF…",
  splitting: "Splitting pages…",
  zipping: "Preparing ZIP…",
  success: "Done",
  error: "Something went wrong",
};
