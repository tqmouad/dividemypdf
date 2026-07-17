import JSZip from "jszip";
import type { RawSplitPage } from "@/lib/pdf/split";

/** Sanitizes a user-supplied filename fragment for safe reuse in a generated download name. */
export function sanitizeFileNameBase(originalName: string): string {
  const withoutExtension = originalName.replace(/\.pdf$/i, "");
  return (
    withoutExtension
      .normalize("NFKD")
      .replace(/[^\w\- ]+/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 80) || "document"
  );
}

export interface ZipBuildResult {
  zipBytes: Uint8Array;
  zipFileName: string;
}

export async function buildZipFromPages(
  pages: RawSplitPage[],
  originalFileName: string,
): Promise<ZipBuildResult> {
  const zip = new JSZip();

  for (const page of pages) {
    const fileName = `page-${page.pageNumber}.pdf`;
    zip.file(fileName, page.bytes);
  }

  const zipBytes = await zip.generateAsync({
    type: "uint8array",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });

  const base = sanitizeFileNameBase(originalFileName);
  return { zipBytes, zipFileName: `${base}-split.zip` };
}
