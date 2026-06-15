import { useEffect, useRef, useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

type PdfScrollViewerProps = {
  src: string;
  className?: string;
};

type PdfPageProps = {
  pdf: pdfjs.PDFDocumentProxy;
  pageNumber: number;
  width: number;
};

function PdfPage({ pdf, pageNumber, width }: PdfPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [pageHeight, setPageHeight] = useState(Math.round(width * 1.414));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: '480px 0px' },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldRender || !canvasRef.current) return;

    let cancelled = false;

    (async () => {
      const page = await pdf.getPage(pageNumber);
      if (cancelled) return;

      const baseViewport = page.getViewport({ scale: 1 });
      const cssScale = width / baseViewport.width;
      const viewport = page.getViewport({ scale: cssScale });
      const outputScale = window.devicePixelRatio || 1;
      const canvas = canvasRef.current;
      if (!canvas || cancelled) return;

      const context = canvas.getContext('2d');
      if (!context) return;

      const displayWidth = Math.floor(viewport.width);
      const displayHeight = Math.floor(viewport.height);

      canvas.width = Math.floor(displayWidth * outputScale);
      canvas.height = Math.floor(displayHeight * outputScale);
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
      setPageHeight(displayHeight);

      const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined;

      await page.render({
        canvas,
        canvasContext: context,
        viewport,
        transform,
      }).promise;
    })();

    return () => {
      cancelled = true;
    };
  }, [shouldRender, pdf, pageNumber, width]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-white"
      style={{ minHeight: shouldRender ? undefined : pageHeight }}
    >
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}

export default function PdfScrollViewer({ src, className = '' }: PdfScrollViewerProps) {
  const [pdf, setPdf] = useState<pdfjs.PDFDocumentProxy | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [pageWidth, setPageWidth] = useState(960);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateWidth = () => {
      const nextWidth = Math.min(1080, Math.max(320, container.clientWidth));
      setPageWidth(nextWidth);
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setPdf(null);
    setPageCount(0);

    (async () => {
      try {
        const task = pdfjs.getDocument(src);
        const document = await task.promise;
        if (cancelled) {
          document.destroy();
          return;
        }

        setPdf(document);
        setPageCount(document.numPages);
      } catch {
        if (!cancelled) {
          setError('PDF 加载失败，请稍后重试。');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [src]);

  useEffect(() => {
    return () => {
      pdf?.destroy();
    };
  }, [pdf]);

  return (
    <div ref={containerRef} className={className}>
      {loading && <p className="py-24 text-center text-sm text-[#767676]">正在加载作品…</p>}
      {error && <p className="py-24 text-center text-sm text-[#c8102e]">{error}</p>}
      {pdf &&
        Array.from({ length: pageCount }, (_, index) => (
          <PdfPage key={`${src}-${index + 1}`} pdf={pdf} pageNumber={index + 1} width={pageWidth} />
        ))}
    </div>
  );
}
