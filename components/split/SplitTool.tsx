"use client";

import { useFileProcessor } from "@/hooks/useFileProcessor";
import { UploadZone } from "@/components/upload/UploadZone";
import { ProcessingProgress } from "@/components/split/ProcessingProgress";
import { ResultCard } from "@/components/download/ResultCard";
import { ErrorAlert } from "@/components/common/ErrorAlert";
import { ShieldCheck, Zap, Lock, Globe2 } from "lucide-react";

const TRUST_INDICATORS = [
  { icon: Lock, label: "Files never leave your device" },
  { icon: Zap, label: "Fast browser processing" },
  { icon: Globe2, label: "Works on any modern browser" },
];

export function SplitTool() {
  const { stage, sourceFile, progress, result, error, processFile, reset } = useFileProcessor();

  const isProcessing = stage === "validating" || stage === "reading" || stage === "splitting" || stage === "zipping";

  return (
    <div className="mx-auto w-full max-w-xl">
      {stage === "success" && result ? (
        <ResultCard result={result} onReset={reset} />
      ) : stage === "error" && error ? (
        <ErrorAlert error={error} onRetry={reset} />
      ) : isProcessing ? (
        <ProcessingProgress stage={stage} progress={progress} />
      ) : (
        <UploadZone onFileSelected={processFile} sourceFile={sourceFile} disabled={isProcessing} />
      )}

      {stage === "idle" && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-secondary">
          {TRUST_INDICATORS.map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-1.5">
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
      )}

      {stage === "idle" && (
        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-text-secondary">
          <ShieldCheck className="h-3.5 w-3.5 text-success" aria-hidden="true" />
          Your files never leave your device. All processing happens securely in your browser.
        </p>
      )}
    </div>
  );
}
