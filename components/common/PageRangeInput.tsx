"use client";

import { Button } from "@/components/ui/Button";

export function PageRangeInput({
  value,
  onChange,
  onSubmit,
  pageCount,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  pageCount: number;
  disabled?: boolean;
}) {
  return (
    <div className="w-full max-w-sm">
      <label htmlFor="page-range" className="block text-sm font-medium text-text">
        Pages to delete ({pageCount} total)
      </label>
      <input
        id="page-range"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. 2, 4, 6-8"
        disabled={disabled}
        className="focus-ring mt-2 w-full rounded-xl border border-border px-4 py-2.5 text-text placeholder:text-text-secondary"
      />
      <p className="mt-1.5 text-xs text-text-secondary">Separate pages with commas, use a dash for ranges.</p>
      <Button onClick={onSubmit} disabled={disabled || !value.trim()} className="mt-4 w-full">
        Delete Pages
      </Button>
    </div>
  );
}
