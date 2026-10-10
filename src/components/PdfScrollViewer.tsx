import { useEffect, useRef, useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import PdfCanvasPage from './PdfCanvasPage';

type PdfScrollViewerProps = {
  src: string;
  title?: string;
  className?: string;
};

export default function PdfScrollViewer({
  src,
  title = 'PDF 作品',
  className = '',
}: PdfScrollViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [document, setDocument] = useState<PDFDocumentProxy | null>(null);
  const [pageWidth, setPageWidth] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateWidth = () => setPageWidth(Math.max(1, container.clientWidth));
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let active = true;
    const task = pdfjs.getDocument(src);

    task.promise
      .then((nextDocument) => {
        if (active) {
          setDocument(nextDocument);
          setError(false);
        } else {
          nextDocument.destroy();
        }
      })
      .catch(() => {
        if (active) setError(true);
      });

    return () => {
      active = false;
      task.destroy();
    };
  }, [src]);

  return (
    <main
      className={`min-h-screen w-full bg-white lg:px-32 ${className}`}
      aria-label={title}
    >
      <div ref={containerRef} className="w-full">
        {error ? (
          <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="m-0 font-['Noto_Sans_SC',sans-serif] text-sm leading-6 text-[#767676]">
              PDF 加载失败，请打开原文件查看。
            </p>
            <a
              href={src}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#1A1A1A] px-5 font-['Noto_Sans_SC',sans-serif] text-sm text-white transition-colors hover:bg-[#c8102e]"
            >
              打开 PDF
            </a>
          </div>
        ) : (
          document &&
          Array.from({ length: document.numPages }, (_, index) => (
            <PdfCanvasPage
              key={index + 1}
              document={document}
              pageNumber={index + 1}
              width={pageWidth}
              className="bg-white"
            />
          ))
        )}
      </div>
    </main>
  );
}
