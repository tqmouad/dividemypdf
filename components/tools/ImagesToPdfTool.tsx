"use client";

import { useState } from "react";
import { MultiUploadZone } from "@/components/upload/MultiUploadZone";
import { SingleResultCard } from "@/components/download/SingleResultCard";
import { ErrorAlert } from "@/components/common/ErrorAlert";
import { GenericProcessing } from "@/components/split/GenericProcessing";
import { Button } from "@/components/ui/Button";
import { useToolProcessor } from "@/hooks/useToolProcessor";
import { usePdfWorker } from "@/hooks/usePdfWorker";

export function ImagesToPdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const { stage, result, error, run, reset } = useToolProcessor();
  const getApi = usePdfWorker();

  const isProcessing = stage === "processing";

  const handleConvert = () => {
    run(async () => {
      const started = performance.now();
      const images = await Promise.all(
        files.map(async (f) => ({ bytes: await f.arrayBuffer(), isPng: f.type === "image/png" })),
      );
      const bytes = await getApi().imagesToPdfFile(images);
      return {
        fileName: "images.pdf",
        bytes,
        sizeBytes: bytes.byteLength,
        processingTimeMs: performance.now() - started,
        note: `${files.length} image${files.length > 1 ? "s" : ""} combined`,
      };
    });
  };

  const fullReset = () => {
    setFiles([]);
    reset();
  };

  if (stage === "success" && result) return <SingleResultCard result={result} onReset={fullReset} successMessage="Your images have been combined into a PDF." resetLabel="Convert more images" />;
  if (stage === "error" && error) return <ErrorAlert error={error} onRetry={reset} />;
  if (isProcessing) return <GenericProcessing label="Building your PDF…" />;

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6">
      <MultiUploadZone
        files={files}
        onFilesAdded={(f) => setFiles((prev) => [...prev, ...f])}
        onFileRemoved={(i) => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
        accept="image/jpeg,image/png,.jpg,.jpeg,.png"
        label="Drag & drop images here"
        hint="JPG or PNG — order is preserved"
      />
      <Button size="lg" onClick={handleConvert} disabled={files.length === 0} className="w-full max-w-sm">
        Convert to PDF
      </Button>
    </div>
  );
}
