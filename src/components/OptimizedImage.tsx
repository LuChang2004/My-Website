import { useEffect, useRef, useState } from 'react';

function resolveSrc(src: string) {
  if (src.startsWith('http')) return src;
  const path = src.startsWith('/') ? src.slice(1) : src;
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path}`;
}

type OptimizedImageProps = {
  src: string;
  alt: string;
  className?: string;
  /** 首屏关键图，提前加载 */
  priority?: boolean;
  onClick?: () => void;
};

export default function OptimizedImage({
  src,
  alt,
  className = 'block w-full h-auto',
  priority = false,
  onClick,
}: OptimizedImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [loaded, setLoaded] = useState(false);
  const resolvedSrc = resolveSrc(src);

  useEffect(() => {
    if (priority) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '480px 0px', threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [priority]);

  return (
    <div
      ref={containerRef}
      className={`relative ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {!loaded && (
        <div
          className="w-full min-h-[120px] bg-[rgba(26,26,26,0.04)] animate-pulse"
          aria-hidden
        />
      )}
      {shouldLoad && (
        <img
          src={resolvedSrc}
          alt={alt}
          decoding="async"
          loading={priority ? 'eager' : 'lazy'}
          {...(priority ? { fetchPriority: 'high' as const } : { fetchPriority: 'low' as const })}
          onLoad={() => setLoaded(true)}
          className={`${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
}
