"use client";

import { CheckCircle2, Download, FileText, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatBytes, formatDuration } from "@/lib/utils";
import type { SplitResult } from "@/types";

function downloadBytes(bytes: Uint8Array, fileName: string) {
  const blob = new Blob([bytes as BlobPart], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function ResultCard({ result, onReset }: { result: SplitResult; onReset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-white p-8 text-center">
      <CheckCircle2 className="h-12 w-12 text-success" aria-hidden="true" />
      <div>
        <h2 tabIndex={-1} className="text-xl font-semibold text-text focus:outline-none">
          Your PDF has been successfully divided into individual pages.
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          {result.source.pageCount} pages · {formatBytes(result.zipSizeBytes)} ZIP · {formatDuration(result.processingTimeMs)}
        </p>
      </div>

      <Button size="lg" onClick={() => downloadBytes(result.zipBytes, result.zipFileName)} className="w-full max-w-sm">
        <Download className="h-5 w-5" aria-hidden="true" />
        Download ZIP
      </Button>

      <ul className="w-full max-w-sm divide-y divide-border rounded-xl border border-border text-left">
        {result.pages.map((page) => (
          <li key={page.fileName} className="flex items-center justify-between gap-3 px-4 py-3">
            <span className="flex min-w-0 items-center gap-2">
              <FileText className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span className="truncate text-sm text-text">{page.fileName}</span>
              <span className="shrink-0 text-xs text-text-secondary">{formatBytes(page.sizeBytes)}</span>
            </span>
            <button
              onClick={() => downloadBytes(page.bytes, page.fileName)}
              aria-label={`Download ${page.fileName}`}
              className="focus-ring shrink-0 rounded-lg p-1.5 text-text-secondary hover:bg-bg-secondary hover:text-primary"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>

      <Button variant="ghost" onClick={onReset}>
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        Split another PDF
      </Button>
    </div>
  );
}
