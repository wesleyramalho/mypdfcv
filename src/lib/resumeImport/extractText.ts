export async function extractTextFromPDF(file: File): Promise<string> {
  // Use legacy build — v5 standard build requires Uint8Array.toHex() not yet in most browsers
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const pages: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    // Use Y position to detect line breaks (preserves document structure)
    let lastY: number | null = null;
    const chunks: string[] = [];

    for (const item of content.items) {
      if (!("str" in item)) continue;
      const textItem = item as {
        str: string;
        transform?: number[];
        hasEOL?: boolean;
      };
      const y = textItem.transform?.[5];

      // New line when Y coordinate changes significantly
      if (lastY !== null && y !== undefined && Math.abs(y - lastY) > 2) {
        chunks.push("\n");
      } else if (chunks.length > 0 && !chunks[chunks.length - 1].endsWith(" ")) {
        chunks.push(" ");
      }

      chunks.push(textItem.str);
      if (y !== undefined) lastY = y;

      // Respect explicit end-of-line markers
      if (textItem.hasEOL) {
        chunks.push("\n");
        lastY = null;
      }
    }

    pages.push(chunks.join(""));
  }

  return pages.join("\n\n");
}

export async function extractTextFromDOCX(file: File): Promise<string> {
  const mammoth = await import("mammoth");
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}
