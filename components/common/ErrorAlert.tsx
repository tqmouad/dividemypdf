import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { ProcessingError } from "@/lib/errors/types";

export function ErrorAlert({ error, onRetry }: { error: ProcessingError; onRetry: () => void }) {
  return (
    <div role="alert" className="flex flex-col items-center gap-3 rounded-2xl border border-error/30 bg-error/5 p-8 text-center">
      <AlertTriangle className="h-10 w-10 text-error" aria-hidden="true" />
      <p className="text-lg font-semibold text-text">{error.title}</p>
      <p className="text-text-secondary">{error.message}</p>
      <p className="text-sm text-text-secondary">{error.solution}</p>
      {error.retryable && (
        <Button variant="secondary" onClick={onRetry} className="mt-2">
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Try again
        </Button>
      )}
    </div>
  );
}
