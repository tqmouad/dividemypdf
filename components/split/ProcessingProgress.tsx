import { Loader2 } from "lucide-react";
import { PROCESSING_STAGE_LABEL, type ProcessingStage } from "@/types";

interface ProcessingProgressProps {
  stage: ProcessingStage;
  progress: { completed: number; total: number };
}

export function ProcessingProgress({ stage, progress }: ProcessingProgressProps) {
  const pct = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : stage === "reading" ? 20 : 60;

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-bg-secondary p-10 text-center" aria-live="polite">
      <Loader2 className="h-10 w-10 animate-spin text-primary" aria-hidden="true" />
      <p className="font-medium text-text">{PROCESSING_STAGE_LABEL[stage]}</p>
      <div className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-border">
        <div className="h-full rounded-full bg-primary transition-all duration-300 ease-out" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-sm text-text-secondary">This usually takes just a moment.</p>
    </div>
  );
}
