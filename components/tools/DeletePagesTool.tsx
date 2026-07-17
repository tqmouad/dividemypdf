"use client";

import { useState } from "react";
import { UploadZone } from "@/components/upload/UploadZone";
import { SingleResultCard } from "@/components/download/SingleResultCard";
import { ErrorAlert } from "@/components/common/ErrorAlert";
import { GenericProcessing } from "@/components/split/GenericProcessing";
import { PageRangeInput } from "@/components/common/PageRangeInput";
import { useToolProcessor } from "@/hooks/useToolProcessor";
import { usePdfWorker } from "@/hooks/usePdfWorker";
import { validateFileBeforeRead } from "@/lib/validation/validatePdf";
import { parsePageRange } from "@/lib/pdf/pageRange";
import { sanitizeFileNameBase } from "@/lib/zip/createZip";
import type { SourceFileInfo } from "@/types";

export function DeletePagesTool() {
  const [file, setFile] = useState<File | null>(null);
  const [sourceFile, setSourceFile] = useState<SourceFileInfo | null>(null);
  const [rangeInput, setRangeInput] = useState("");
  const { stage, result, error, run, reset } = useToolProcessor();
  const getApi = usePdfWorker();

  const isProcessing = stage === "processing";

  const handleFile = async (f: File) => {
    try {
      validateFileBeforeRead(f);
      const buffer = await f.arrayBuffer();
      const pageCount = await getApi().getPageCount(buffer);
      setFile(f);
      setSourceFile({ name: f.name, sizeBytes: f.size, pageCount });
    } catch {
      setFile(null);
      setSourceFile(null);
    }
  };

  const handleDelete = () => {
    if (!file || !sourceFile) return;
    run(async () => {
      const started = performance.now();
      const pagesToDelete = parsePageRange(rangeInput, sourceFile.pageCount);
      const buffer = await file.arrayBuffer();
      const bytes = await getApi().deletePagesFromPdf(buffer, pagesToDelete);
      return {
        fileName: `${sanitizeFileNameBase(file.name)}-edited.pdf`,
        bytes,
        sizeBytes: bytes.byteLength,
        processingTimeMs: performance.now() - started,
        note: `${pagesToDelete.length} page${pagesToDelete.length > 1 ? "s" : ""} removed`,
      };
    });
  };

  const fullReset = () => {
    setFile(null);
    setSourceFile(null);
    setRangeInput("");
    reset();
  };

  if (stage === "success" && result) return <SingleResultCard result={result} onReset={fullReset} successMessage="Selected pages have been removed." resetLabel="Edit another PDF" />;
  if (stage === "error" && error) return <ErrorAlert error={error} onRetry={reset} />;
  if (isProcessing) return <GenericProcessing label="Deleting pages…" />;

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6">
      <UploadZone onFileSelected={handleFile} sourceFile={sourceFile} disabled={isProcessing} />
      {sourceFile && (
        <PageRangeInput value={rangeInput} onChange={setRangeInput} onSubmit={handleDelete} pageCount={sourceFile.pageCount} disabled={isProcessing} />
      )}
    </div>
  );
}
