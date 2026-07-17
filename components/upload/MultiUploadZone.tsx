"use client";

import { useCallback, useRef, useState } from "react";
import { UploadCloud, FileText, X } from "lucide-react";
import { cn, formatBytes } from "@/lib/utils";

interface MultiUploadZoneProps {
  files: File[];
  onFilesAdded: (files: File[]) => void;
  onFileRemoved: (index: number) => void;
  accept: string;
  label: string;
  hint: string;
  disabled?: boolean;
}

export function MultiUploadZone({ files, onFilesAdded, onFileRemoved, accept, label, hint, disabled }: MultiUploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (fileList?.length) onFilesAdded(Array.from(fileList));
    },
    [onFilesAdded],
  );

  return (
    <div className="w-full">
      <div
        role="button"
        tabIndex={0}
        aria-label={label}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !disabled) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragOver(false); if (!disabled) handleFiles(e.dataTransfer.files); }}
        className={cn(
          "focus-ring flex min-h-[200px] w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-[20px] border-2 border-dashed p-8 text-center transition-all duration-200 ease-out",
          isDragOver ? "border-primary bg-primary/5 scale-[1.01]" : "border-border bg-bg-secondary hover:border-primary/40",
          disabled && "pointer-events-none opacity-60",
        )}
      >
        <input ref={inputRef} type="file" accept={accept} multiple className="sr-only" onChange={(e) => handleFiles(e.target.files)} disabled={disabled} />
        <UploadCloud className={cn("h-10 w-10", isDragOver ? "text-primary scale-110" : "text-text-secondary")} aria-hidden="true" />
        <p className="text-lg font-medium text-text">{label}</p>
        <p className="text-sm text-text-secondary">{hint}</p>
      </div>

      {files.length > 0 && (
        <ul className="mt-4 divide-y divide-border rounded-xl border border-border">
          {files.map((file, index) => (
            <li key={`${file.name}-${index}`} className="flex items-center justify-between gap-3 px-4 py-3">
              <span className="flex min-w-0 items-center gap-2">
                <FileText className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="truncate text-sm text-text">{file.name}</span>
                <span className="shrink-0 text-xs text-text-secondary">{formatBytes(file.size)}</span>
              </span>
              <button
                onClick={() => onFileRemoved(index)}
                aria-label={`Remove ${file.name}`}
                className="focus-ring shrink-0 rounded-lg p-1.5 text-text-secondary hover:bg-bg-secondary hover:text-error"
                disabled={disabled}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
