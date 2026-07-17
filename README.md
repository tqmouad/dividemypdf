# DivideMyPDF

Split a PDF into individual one-page PDF files — entirely inside your browser. No uploads, no accounts, no waiting.

## Stack
Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · pdf-lib · JSZip · Comlink (Web Worker RPC) · lucide-react

## Why client-side?
All PDF parsing, splitting, and ZIP generation runs inside a Web Worker (`workers/pdf.worker.ts`) so the UI thread never blocks and your file never leaves your device.

## Getting started
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Build
```bash
npm run build && npm start
```

## Folder structure
```
app/            routes (/, /split-pdf, /about, /privacy, robots, sitemap, manifest)
components/     upload, split, download, common, layout, seo, ui
lib/            config (limits/tiers), errors (typed error system), validation, pdf, zip, utils
hooks/          useFileProcessor — the shared processing state machine
workers/        pdf.worker.ts — off-main-thread PDF/ZIP pipeline
types/          shared types
```

## Adding a future tool (e.g. Merge PDF)
1. Add the operation to `lib/pdf/` (e.g. `merge.ts`).
2. Extend `workers/pdf.worker.ts` with a new exposed method.
3. Reuse `UploadZone`, `ErrorAlert`, `ProcessingProgress`, and the error-type system as-is.
4. Add `app/merge-pdf/page.tsx` following the `split-pdf` page as a template.

## Current limits (free tier)
Configured centrally in `lib/config/limits.ts` — 10 pages, 20 MB per file.

## Known scope limits (by design, for the MVP)
- Password-protected PDFs are rejected with a clear error (not supported yet).
- Format-conversion tools (PDF↔Word, etc.) are on the roadmap but will likely need a different processing path than the pure-client pdf-lib pipeline used here — see the architecture note in the project analysis.
