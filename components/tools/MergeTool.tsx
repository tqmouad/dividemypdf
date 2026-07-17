"use client";

import { useState } from "react";
import { MultiUploadZone } from "@/components/upload/MultiUploadZone";
import { SingleResultCard } from "@/components/download/SingleResultCard";
import { ErrorAlert } from "@/components/common/ErrorAlert";
import { GenericProcessing } from "@/components/split/GenericProcessing";
import { Button } from "@/components/ui/Button";
import { useToolProcessor } from "@/hooks/useToolProcessor";
import { usePdfWorker } from "@/hooks/usePdfWorker";
import { validateFileBeforeRead } from "@/lib/validation/validatePdf";
import { AppProcessingError } from "@/lib/errors/types";

export function MergeTool() {
  const [files, setFiles] = useState<File[]>([]);
  const { stage, result, error, run, reset } = useToolProcessor();
  const getApi = usePdfWorker();

  const isProcessing = stage === "processing";

  const handleMerge = () => {
    run(async () => {
      const started = performance.now();
      if (files.length < 2) throw new AppProcessingError("PROCESSING_FAILED");
      files.forEach(validateFileBeforeRead);

      const buffers = await Promise.all(files.map((f) => f.arrayBuffer()));
      const api = getApi();
      const bytes = await api.mergePdfFiles(buffers);

      return {
        fileName: "merged.pdf",
        bytes,
        sizeBytes: bytes.byteLength,
        processingTimeMs: performance.now() - started,
        note: `${files.length} files merged`,
      };
    });
  };

  const fullReset = () => {
    setFiles([]);
    reset();
  };

  if (stage === "success" && result) return <SingleResultCard result={result} onReset={fullReset} successMessage="Your PDFs have been merged into one file." resetLabel="Merge another set of PDFs" />;
  if (stage === "error" && error) return <ErrorAlert error={error} onRetry={reset} />;
  if (isProcessing) return <GenericProcessing label="Merging PDFs…" />;

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6">
      <MultiUploadZone
        files={files}
        onFilesAdded={(f) => setFiles((prev) => [...prev, ...f])}
        onFileRemoved={(i) => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
        accept="application/pdf,.pdf"
        label="Drag & drop PDFs here"
        hint="or click to choose files — order is preserved"
      />
      <Button size="lg" onClick={handleMerge} disabled={files.length < 2} className="w-full max-w-sm">
        Merge PDFs
      </Button>
    </div>
  );
}
