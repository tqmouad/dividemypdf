"use client";

import { useCallback, useEffect, useRef } from "react";
import * as Comlink from "comlink";
import type { PdfWorkerApi } from "@/workers/pdf.worker";

export function usePdfWorker() {
  const workerRef = useRef<Worker | null>(null);
  const apiRef = useRef<Comlink.Remote<PdfWorkerApi> | null>(null);

  useEffect(() => {
    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
      apiRef.current = null;
    };
  }, []);

  const getApi = useCallback(() => {
    if (!apiRef.current) {
      const worker = new Worker(new URL("../workers/pdf.worker.ts", import.meta.url), { type: "module" });
      workerRef.current = worker;
      apiRef.current = Comlink.wrap<PdfWorkerApi>(worker);
    }
    return apiRef.current;
  }, []);

  return getApi;
}
