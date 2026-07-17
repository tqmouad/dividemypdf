"use client";

import { useState } from "react";
import { UploadZone } from "@/components/upload/UploadZone";
import { SingleResultCard } from "@/components/download/SingleResultCard";
import { ErrorAlert } from "@/components/common/ErrorAlert";
import { GenericProcessing } from "@/components/split/GenericProcessing";
import { useToolProcessor } from "@/hooks/useToolProcessor";
import { usePdfWorker } from "@/hooks/usePdfWorker";
import { validateFileBeforeRead } from "@/lib/validation/validatePdf";
import { formatBytes } from "@/lib/utils";
import { sanitizeFileNameBase } from "@/lib/zip/createZip";
import type { SourceFileInfo } from "@/types";

export function CompressTool() {
  const [sourceFile, setSourceFile] = useState<SourceFileInfo | null>(null);
  const { stage, result, error, run, reset } = useToolProcessor();
  const getApi = usePdfWorker();

  const isProcessing = stage === "processing";

  const handleFile = (file: File) => {
    setSourceFile({ name: file.name, sizeBytes: file.size, pageCount: 0 });
    run(async () => {
      const started = performance.now();
      validateFileBeforeRead(file);
      const buffer = await file.arrayBuffer();
      const api = getApi();
      const { bytes, originalSizeBytes, compressedSizeBytes } = await api.compressPdfFile(buffer);

      const savedPct = Math.max(0, Math.round((1 - compressedSizeBytes / originalSizeBytes) * 100));
      return {
        fileName: `${sanitizeFileNameBase(file.name)}-compressed.pdf`,
        bytes,
        sizeBytes: compressedSizeBytes,
        processingTimeMs: performance.now() - started,
        note: savedPct > 0 ? `${savedPct}% smaller than the original ${formatBytes(originalSizeBytes)}` : "Already well optimized",
      };
    });
  };

  const fullReset = () => {
    setSourceFile(null);
    reset();
  };

  if (stage === "success" && result) return <SingleResultCard result={result} onReset={fullReset} successMessage="Your PDF has been compressed." resetLabel="Compress another PDF" />;
  if (stage === "error" && error) return <ErrorAlert error={error} onRetry={reset} />;
  if (isProcessing) return <GenericProcessing label="Compressing PDF…" />;

  return (
    <div className="mx-auto w-full max-w-xl">
      <UploadZone onFileSelected={handleFile} sourceFile={sourceFile} disabled={isProcessing} />
    </div>
  );
}
