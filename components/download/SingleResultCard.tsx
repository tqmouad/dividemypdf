"use client";

import { CheckCircle2, Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatBytes, formatDuration } from "@/lib/utils";
import type { ToolResult } from "@/types";

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

export function SingleResultCard({
  result,
  onReset,
  successMessage,
  resetLabel,
}: {
  result: ToolResult;
  onReset: () => void;
  successMessage: string;
  resetLabel: string;
}) {
  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-white p-8 text-center">
      <CheckCircle2 className="h-12 w-12 text-success" aria-hidden="true" />
      <div>
        <h2 tabIndex={-1} className="text-xl font-semibold text-text focus:outline-none">
          {successMessage}
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          {formatBytes(result.sizeBytes)} · {formatDuration(result.processingTimeMs)}
          {result.note ? ` · ${result.note}` : ""}
        </p>
      </div>

      <Button size="lg" onClick={() => downloadBytes(result.bytes, result.fileName)} className="w-full max-w-sm">
        <Download className="h-5 w-5" aria-hidden="true" />
        Download {result.fileName}
      </Button>

      <Button variant="ghost" onClick={onReset}>
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        {resetLabel}
      </Button>
    </div>
  );
}
