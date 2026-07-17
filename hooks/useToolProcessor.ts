"use client";

import { useCallback, useState } from "react";
import { AppProcessingError, createProcessingError, type ProcessingError } from "@/lib/errors/types";
import { decodeWorkerError } from "@/lib/pdf/errors";
import { withMinimumDuration } from "@/lib/utils";
import type { ToolResult, ToolStage } from "@/types";

interface State {
  stage: ToolStage;
  result: ToolResult | null;
  error: ProcessingError | null;
}

const initialState: State = { stage: "idle", result: null, error: null };

export function useToolProcessor() {
  const [state, setState] = useState<State>(initialState);

  const reset = useCallback(() => setState(initialState), []);

  const run = useCallback(async (task: () => Promise<ToolResult>) => {
    setState({ stage: "processing", result: null, error: null });
    try {
      const result = await withMinimumDuration(task());
      setState({ stage: "success", result, error: null });
    } catch (error) {
      let processingError: ProcessingError;
      if (error instanceof AppProcessingError) {
        processingError = error.processingError;
      } else if (error instanceof Error) {
        const code = decodeWorkerError(error.message);
        processingError = createProcessingError(code ?? "UNEXPECTED_ERROR");
      } else {
        processingError = createProcessingError("UNEXPECTED_ERROR");
      }
      setState({ stage: "error", result: null, error: processingError });
    }
  }, []);

  return { ...state, run, reset };
}
