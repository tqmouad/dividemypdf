"use client";

import { useState } from "react";
import { UploadCloud, FileText } from "lucide-react";
import { SingleResultCard } from "@/components/download/SingleResultCard";
import { ErrorAlert } from "@/components/common/ErrorAlert";
import { GenericProcessing } from "@/components/split/GenericProcessing";
import { useToolProcessor } from "@/hooks/useToolProcessor";
import { convertWordToPdf } from "@/lib/pdf/wordToPdf";
import { sanitizeFileNameBase } from "@/lib/zip/createZip";
import { cn } from "@/lib/utils";

export function WordToPdfTool() {
  const [fileName, setFileName] = useState<string | null>(null);
  const { stage, result, error, run, reset } = useToolProcessor();
  const isProcessing = stage === "processing";

  const handleFile = (file: File) => {
    setFileName(file.name);
    run(async () => {
      const started = performance.now();
      const bytes = await convertWordToPdf(file);
      return {
        fileName: `${sanitizeFileNameBase(file.name)}.pdf`,
        bytes,
        sizeBytes: bytes.byteLength,
        processingTimeMs: performance.now() - started,
        note: "Converted from .docx",
      };
    });
  };

  const fullReset = () => {
    setFileName(null);
    reset();
  };

  if (stage === "success" && result) return <SingleResultCard result={result} onReset={fullReset} successMessage="Your document has been converted to PDF." resetLabel="Convert another document" />;
  if (stage === "error" && error) return <ErrorAlert error={error} onRetry={reset} />;
  if (isProcessing) return <GenericProcessing label="Converting to PDF…" />;

  return (
    <div className="mx-auto w-full max-w-xl">
      <label
        className={cn(
          "focus-ring flex min-h-[220px] w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-[20px] border-2 border-dashed border-border bg-bg-secondary p-8 text-center transition-colors hover:border-primary/40",
        )}
      >
        <input
          type="file"
          accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="sr-only"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        {fileName ? (
          <>
            <FileText className="h-10 w-10 text-primary" aria-hidden="true" />
            <p className="font-medium text-text">{fileName}</p>
          </>
        ) : (
          <>
            <UploadCloud className="h-10 w-10 text-text-secondary" aria-hidden="true" />
            <p className="text-lg font-medium text-text">Drag & drop your .docx file here</p>
            <p className="text-sm text-text-secondary">or click to choose a file</p>
          </>
        )}
      </label>
      <p className="mt-3 text-center text-xs text-text-secondary">
        Best results with text-based documents. Complex layouts may not convert perfectly.
      </p>
    </div>
  );
}
