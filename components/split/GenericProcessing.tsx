import { Loader2 } from "lucide-react";

export function GenericProcessing({ label = "Processing…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-bg-secondary p-10 text-center" aria-live="polite">
      <Loader2 className="h-10 w-10 animate-spin text-primary" aria-hidden="true" />
      <p className="font-medium text-text">{label}</p>
      <p className="text-sm text-text-secondary">This usually takes just a moment.</p>
    </div>
  );
}
