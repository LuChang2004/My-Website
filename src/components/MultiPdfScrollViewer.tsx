import { useEffect, useRef, useState } from 'react';
import PdfCanvasPage from './PdfCanvasPage';

type Slide = {
  id: string;
  src: string;
};

type MultiPdfScrollViewerProps = {
  slides: Slide[];
  className?: string;
};

export default function MultiPdfScrollViewer({ slides, className = '' }: MultiPdfScrollViewerProps) {
  const [pageWidth, setPageWidth] = useState(1080);
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

  return (
    <div ref={containerRef} className={className}>
      {slides.map((slide, index) => (
        <section
          key={slide.id}
          id={slide.id}
          className={index < slides.length - 1 ? 'mb-1' : ''}
          aria-label={`第 ${index + 1} 页`}
        >
          <PdfCanvasPage src={slide.src} width={pageWidth} />
        </section>
      ))}
    </div>
  );
}
