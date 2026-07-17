import { AppProcessingError } from "@/lib/errors/types";

/** Parses "1,3,5-7" into a sorted, deduped array of 1-based page numbers. */
export function parsePageRange(input: string, pageCount: number): number[] {
  const cleaned = input.trim();
  if (!cleaned) throw new AppProcessingError("PROCESSING_FAILED");

  const pages = new Set<number>();

  for (const part of cleaned.split(",").map((p) => p.trim()).filter(Boolean)) {
    const rangeMatch = part.match(/^(\d+)\s*-\s*(\d+)$/);
    if (rangeMatch) {
      const start = Number(rangeMatch[1]);
      const end = Number(rangeMatch[2]);
      for (let i = Math.min(start, end); i <= Math.max(start, end); i++) pages.add(i);
      continue;
    }
    if (/^\d+$/.test(part)) {
      pages.add(Number(part));
      continue;
    }
    throw new AppProcessingError("PROCESSING_FAILED");
  }

  const result = [...pages].filter((p) => p >= 1 && p <= pageCount).sort((a, b) => a - b);
  if (result.length === 0) throw new AppProcessingError("PROCESSING_FAILED");
  if (result.length >= pageCount) throw new AppProcessingError("PROCESSING_FAILED");

  return result;
}
