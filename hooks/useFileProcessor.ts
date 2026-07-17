"use client";

import { useCallback, useRef, useState } from "react";
import * as Comlink from "comlink";
import { validateFileBeforeRead, validatePageCount, isBrowserSupported } from "@/lib/validation/validatePdf";
import { withMinimumDuration } from "@/lib/utils";
import { AppProcessingError, createProcessingError, type ProcessingError } from "@/lib/errors/types";
import { decodeWorkerError } from "@/lib/pdf/errors";
import type { PdfWorkerApi } from "@/workers/pdf.worker";
import type { ProcessingStage, SourceFileInfo, SplitResult } from "@/types";

interface UseFileProcessorState {
  stage: ProcessingStage;
  sourceFile: SourceFileInfo | null;
  progress: { completed: number; total: number };
  result: SplitResult | null;
  error: ProcessingError | null;
}

const initialState: UseFileProcessorState = {
  stage: "idle",
  sourceFile: null,
  progress: { completed: 0, total: 0 },
  result: null,
  error: null,
};

export function useFileProcessor() {
  const [state, setState] = useState<UseFileProcessorState>(initialState);
  const workerRef = useRef<Worker | null>(null);

  const getWorker = useCallback(() => {
    if (!workerRef.current) {
      workerRef.current = new Worker(new URL("../workers/pdf.worker.ts", import.meta.url), {
        type: "module",
      });
    }
    return workerRef.current;
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const processFile = useCallback(
    async (file: File) => {
      const startedAt = performance.now();

      if (!isBrowserSupported()) {
        setState({
          ...initialState,
          stage: "error",
          error: createProcessingError("BROWSER_UNSUPPORTED"),
        });
        return;
      }

      try {
        setState({
          ...initialState,
          stage: "validating",
          sourceFile: { name: file.name, sizeBytes: file.size, pageCount: 0 },
        });

        validateFileBeforeRead(file);

        const arrayBuffer = await file.arrayBuffer();
        const worker = getWorker();
        const api = Comlink.wrap<PdfWorkerApi>(worker);

        const onProgress = Comlink.proxy((stage: ProcessingStage, completed: number, total: number) => {
          setState((prev) => ({ ...prev, stage, progress: { completed, total } }));
        });

        const result = await withMinimumDuration(api.splitPdf(arrayBuffer, file.name, onProgress));

        validatePageCount(result.pageCount);

        const processingTimeMs = performance.now() - startedAt;

        setState({
          stage: "success",
          sourceFile: { name: file.name, sizeBytes: file.size, pageCount: result.pageCount },
          progress: { completed: result.pageCount, total: result.pageCount },
          error: null,
          result: {
            source: { name: file.name, sizeBytes: file.size, pageCount: result.pageCount },
            pages: result.pages.map((p) => ({
              fileName: p.fileName,
              sizeBytes: p.sizeBytes,
              bytes: p.bytes,
              pageNumber: p.pageNumber,
            })),
            zipFileName: result.zipFileName,
            zipBytes: result.zipBytes,
            zipSizeBytes: result.zipSizeBytes,
            processingTimeMs,
          },
        });
      } catch (error) {
        let processingError: ProcessingError;

        if (error instanceof AppProcessingError) {
          processingError = error.processingError;
        } else if (error instanceof Error) {
          const workerCode = decodeWorkerError(error.message);
          processingError = createProcessingError(workerCode ?? "UNEXPECTED_ERROR");
        } else {
          processingError = createProcessingError("UNEXPECTED_ERROR");
        }

        setState((prev) => ({
          ...prev,
          stage: "error",
          error: processingError,
        }));
      }
    },
    [getWorker],
  );

  return { ...state, processFile, reset };
}
