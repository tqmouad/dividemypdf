"use client";

/**
 * Unlike every other tool in this app, Word→PDF cannot run inside the
 * Web Worker: rendering HTML to a PDF requires the DOM and a canvas,
 * neither of which exist in a worker context. This is an intentional,
 * documented exception to the "everything in a worker" rule — see
 * project notes on why format-conversion tools are architecturally
 * different from page-manipulation tools.
 */
export async function convertWordToPdf(file: File): Promise<Uint8Array> {
  const mammoth = await import("mammoth");
  const { jsPDF } = await import("jspdf");
  // html2canvas is used internally by jsPDF's .html() plugin.
  await import("html2canvas");

  const arrayBuffer = await file.arrayBuffer();
  const { value: html } = await mammoth.convertToHtml({ arrayBuffer });

  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-99999px";
  container.style.top = "0";
  container.style.width = "760px";
  container.style.fontFamily = "Arial, sans-serif";
  container.style.fontSize = "14px";
  container.style.lineHeight = "1.5";
  container.innerHTML = html;
  document.body.appendChild(container);

  try {
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    const pdfBytes: Uint8Array = await new Promise((resolve, reject) => {
      doc.html(container, {
        x: 24,
        y: 24,
        width: 547, // A4 width (595pt) minus margins
        windowWidth: 760,
        callback: (pdf) => {
          try {
            resolve(new Uint8Array(pdf.output("arraybuffer")));
          } catch (err) {
            reject(err);
          }
        },
      });
    });

    return pdfBytes;
  } finally {
    document.body.removeChild(container);
  }
}
