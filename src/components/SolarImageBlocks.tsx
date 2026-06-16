import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import type { SolarBlock } from '../data/solarSpecialContent';
import { resolvePublicAssetSrc } from '../utils/resolvePublicAssetSrc';

type SolarImageHeightContextValue = {
  heights: Record<string, number>;
  setHeight: (id: string, height: number) => void;
};

const SolarImageHeightContext = createContext<SolarImageHeightContextValue | null>(null);

export function SolarImageHeightProvider({ children }: { children: ReactNode }) {
  const [heights, setHeights] = useState<Record<string, number>>({});

  const setHeight = useCallback((id: string, height: number) => {
    setHeights((prev) => {
      if (prev[id] === height) return prev;
      return { ...prev, [id]: height };
    });
  }, []);

  return (
    <SolarImageHeightContext.Provider value={{ heights, setHeight }}>
      {children}
    </SolarImageHeightContext.Provider>
  );
}

function useSolarImageHeightContext() {
  return useContext(SolarImageHeightContext);
}

export function useSolarImageHeight(id: string) {
  const ctx = useSolarImageHeightContext();
  return ctx?.heights[id];
}

function SolarImageCaption({ children }: { children: string }) {
  return <span className="ss-image-caption">{children}</span>;
}

export { SolarImageCaption };

function imageSizeClass(
  size: CenterImageBlock['size'],
  prefix: 'ss-image-frame' | 'ss-center-image',
): string {
  if (size === 'quarter') return `${prefix}--quarter`;
  if (size === 'sixteenth') return `${prefix}--sixteenth`;
  return '';
}

type CenterImageBlock = Extract<SolarBlock, { kind: 'centerImage' }>;

export function SolarCenterImageBlock({ block }: { block: CenterImageBlock }) {
  const ctx = useSolarImageHeightContext();
  const imgRef = useRef<HTMLImageElement>(null);
  const src = resolvePublicAssetSrc(block.src);

  useEffect(() => {
    const img = imgRef.current;
    if (!img || !block.imageId || !ctx) return;

    const report = () => ctx.setHeight(block.imageId!, img.getBoundingClientRect().height);
    report();

    const observer = new ResizeObserver(report);
    observer.observe(img);
    return () => observer.disconnect();
  }, [block.imageId, block.src, ctx]);

  const className = ['ss-center-image', imageSizeClass(block.size, 'ss-center-image')].filter(Boolean).join(' ');

  return block.caption ? (
    <figure className={['ss-image-frame', imageSizeClass(block.size, 'ss-image-frame')].filter(Boolean).join(' ')}>
      <SolarImageCaption>{block.caption}</SolarImageCaption>
      <div className="ss-image-display">
        <img ref={imgRef} src={src} alt={block.alt} loading="lazy" decoding="async" />
      </div>
    </figure>
  ) : (
    <figure className={className}>
      <img ref={imgRef} src={src} alt={block.alt} loading="lazy" decoding="async" />
    </figure>
  );
}

type HorizontalScrollImageBlock = Extract<SolarBlock, { kind: 'horizontalScrollImage' }>;

export function SolarHorizontalScrollImageBlock({ block }: { block: HorizontalScrollImageBlock }) {
  const matchedHeight = useSolarImageHeight(block.matchHeightTo);
  const height = matchedHeight ? matchedHeight * (block.heightScale ?? 1) : undefined;
  const src = resolvePublicAssetSrc(block.src);

  return (
    <div className="ss-image-frame ss-image-frame--panorama">
      {block.caption && <SolarImageCaption>{block.caption}</SolarImageCaption>}
      <div
        className="ss-panorama-scroll"
        style={height ? { height } : undefined}
        role="region"
        aria-label={`${block.alt}，可左右滑动查看`}
        tabIndex={0}
      >
        <img src={src} alt={block.alt} loading="lazy" decoding="async" draggable={false} />
      </div>
    </div>
  );
}
