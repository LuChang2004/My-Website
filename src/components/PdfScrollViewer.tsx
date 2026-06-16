import { useEffect, useRef, useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// #region agent log
function debugPdfLog(
  location: string,
  message: string,
  data: Record<string, unknown>,
  hypothesisId: string,
) {
  fetch('http://127.0.0.1:7734/ingest/c4aa5d67-1b6b-4384-b0db-0dac920ad961', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '5d41c5' },
    body: JSON.stringify({
      sessionId: '5d41c5',
      location,
      message,
      data,
      hypothesisId,
      timestamp: Date.now(),
    }),
  }).catch(() => {});
}
// #endregion

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
          // #region agent log
          if (pageNumber === 1) {
            debugPdfLog(
              'PdfScrollViewer.tsx:PdfPage',
              'page1 intersection triggered',
              { pageNumber, isIntersecting: entry.isIntersecting, intersectionRatio: entry.intersectionRatio },
              'H3',
            );
          }
          // #endregion
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
      try {
        // #region agent log
        if (pageNumber === 1) {
          debugPdfLog(
            'PdfScrollViewer.tsx:PdfPage',
            'page1 render start',
            { pageNumber, width, shouldRender },
            'H4',
          );
        }
        // #endregion
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
          canvasContext: context,
          viewport,
          transform,
        }).promise;
        // #region agent log
        if (pageNumber === 1) {
          debugPdfLog(
            'PdfScrollViewer.tsx:PdfPage',
            'page1 render success',
            { pageNumber, displayWidth, displayHeight, cssScale, outputScale },
            'H2',
          );
        }
        // #endregion
      } catch (err) {
        // #region agent log
        if (pageNumber === 1) {
          debugPdfLog(
            'PdfScrollViewer.tsx:PdfPage',
            'page1 render error',
            { pageNumber, error: err instanceof Error ? err.message : String(err) },
            'H2',
          );
        }
        // #endregion
      }
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
      // #region agent log
      debugPdfLog(
        'PdfScrollViewer.tsx:width',
        'page width updated',
        { clientWidth: container.clientWidth, nextWidth },
        'H4',
      );
      // #endregion
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
        // #region agent log
        debugPdfLog(
          'PdfScrollViewer.tsx:load',
          'pdf load start',
          { src, workerSrc: pdfjs.GlobalWorkerOptions.workerSrc, host: window.location.host },
          'H1',
        );
        // #endregion
        const task = pdfjs.getDocument(src);
        const document = await task.promise;
        if (cancelled) {
          document.destroy();
          return;
        }

        // #region agent log
        debugPdfLog(
          'PdfScrollViewer.tsx:load',
          'pdf load success',
          { src, numPages: document.numPages },
          'H1',
        );
        // #endregion
        setPdf(document);
        setPageCount(document.numPages);
      } catch (err) {
        // #region agent log
        debugPdfLog(
          'PdfScrollViewer.tsx:load',
          'pdf load error',
          { src, error: err instanceof Error ? err.message : String(err) },
          'H1',
        );
        // #endregion
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
