import { useEffect, useRef, useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

type PdfCanvasPageProps = {
  src: string;
  width: number;
  className?: string;
  onRenderComplete?: (height: number) => void;
};

export default function PdfCanvasPage({
  src,
  width,
  className = '',
  onRenderComplete,
}: PdfCanvasPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [pageHeight, setPageHeight] = useState(Math.round(width * 0.5625));
  const [error, setError] = useState<string | null>(null);

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
      try {
        const task = pdfjs.getDocument(src);
        const document = await task.promise;
        if (cancelled) {
          document.destroy();
          return;
        }

        const page = await document.getPage(1);
        if (cancelled) {
          document.destroy();
          return;
        }

        const baseViewport = page.getViewport({ scale: 1 });
        const cssScale = width / baseViewport.width;
        const viewport = page.getViewport({ scale: cssScale });
        const outputScale = window.devicePixelRatio || 1;
        const canvas = canvasRef.current;
        if (!canvas || cancelled) {
          document.destroy();
          return;
        }

        const context = canvas.getContext('2d');
        if (!context) {
          document.destroy();
          return;
        }

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

        document.destroy();

        if (!cancelled) {
          onRenderComplete?.(displayHeight);
        }
      } catch {
        if (!cancelled) {
          setError('页面加载失败');
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [shouldRender, src, width, onRenderComplete]);

  return (
    <div
      ref={containerRef}
      className={`w-full bg-black ${className}`}
      style={{ minHeight: shouldRender ? undefined : pageHeight }}
    >
      {error ? (
        <p className="py-24 text-center text-sm text-[#c8102e]">{error}</p>
      ) : (
        <canvas ref={canvasRef} className="mx-auto block" />
      )}
    </div>
  );
}
