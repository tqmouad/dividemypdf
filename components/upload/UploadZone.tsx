"use client";

import { useCallback, useRef, useState } from "react";
import { UploadCloud, FileText } from "lucide-react";
import { cn, formatBytes } from "@/lib/utils";
import { getActiveLimits } from "@/lib/config/limits";
import type { SourceFileInfo } from "@/types";

interface UploadZoneProps {
  onFileSelected: (file: File) => void;
  sourceFile: SourceFileInfo | null;
  disabled?: boolean;
}

export function UploadZone({ onFileSelected, sourceFile, disabled }: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const limits = getActiveLimits();

  const handleFiles = useCallback(
    (files: FileList | null) => {
      const file = files?.[0];
      if (file) onFileSelected(file);
    },
    [onFileSelected],
  );

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Upload a PDF file. Drag and drop, or press Enter to choose a file."
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !disabled) {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        if (!disabled) handleFiles(e.dataTransfer.files);
      }}
      className={cn(
        "focus-ring group relative flex min-h-[280px] w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-[20px] border-2 border-dashed p-10 text-center transition-all duration-200 ease-out",
        isDragOver ? "border-primary bg-primary/5 scale-[1.01]" : "border-border bg-bg-secondary hover:border-primary/40",
        disabled && "pointer-events-none opacity-60",
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
        disabled={disabled}
      />

      {sourceFile ? (
        <>
          <FileText className="h-12 w-12 text-primary" aria-hidden="true" />
          <div>
            <p className="font-medium text-text">{sourceFile.name}</p>
            <p className="text-sm text-text-secondary">{formatBytes(sourceFile.sizeBytes)}</p>
          </div>
        </>
      ) : (
        <>
          <UploadCloud
            className={cn("h-12 w-12 transition-transform duration-200", isDragOver ? "text-primary scale-110" : "text-text-secondary")}
            aria-hidden="true"
          />
          <div>
            <p className="text-lg font-medium text-text">Drag & drop your PDF here</p>
            <p className="mt-1 text-sm text-text-secondary">or click to choose a file</p>
          </div>
          <p className="text-xs text-text-secondary">
            PDF only · Up to {limits.maxPages} pages · Up to {limits.maxFileSizeBytes / (1024 * 1024)} MB
          </p>
        </>
      )}
    </div>
  );
}
