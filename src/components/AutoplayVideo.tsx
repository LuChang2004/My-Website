import { useEffect, useRef, useCallback, useState } from 'react';

import { resolvePublicAssetSrc } from '../utils/resolvePublicAssetSrc';

function resolveVideoSrc(src: string) {
  return resolvePublicAssetSrc(src);
}

type AutoplayVideoProps = {
  src: string;
  className?: string;
  /** 首屏视频：立即加载并播放 */
  priority?: boolean;
};

export default function AutoplayVideo({
  src,
  className = 'w-full h-auto block',
  priority = false,
}: AutoplayVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const resolvedSrc = resolveVideoSrc(src);
  const [shouldLoad, setShouldLoad] = useState(priority);

  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;
    if (video.readyState >= 2) {
      video.play().catch(() => {});
    }
  }, [shouldLoad]);

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
      { rootMargin: '320px 0px', threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [priority]);

  useEffect(() => {
    if (!shouldLoad) return;
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => tryPlay();
    video.addEventListener('loadeddata', onReady);
    video.addEventListener('canplay', onReady);

    const playObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else if (!priority) video.pause();
      },
      { threshold: 0.2 }
    );
    playObserver.observe(video);

    const unlock = () => tryPlay();
    document.addEventListener('pointerdown', unlock, { once: true, passive: true });
    window.addEventListener('scroll', unlock, { once: true, passive: true });

    tryPlay();

    return () => {
      video.removeEventListener('loadeddata', onReady);
      video.removeEventListener('canplay', onReady);
      playObserver.disconnect();
    };
  }, [resolvedSrc, shouldLoad, tryPlay, priority]);

  return (
    <div ref={containerRef} className="relative w-full min-h-[120px]">
      {!shouldLoad && (
        <div className="w-full min-h-[120px] bg-[rgba(26,26,26,0.04)] animate-pulse" aria-hidden />
      )}
      {shouldLoad && (
        <video
          ref={videoRef}
          src={resolvedSrc}
          autoPlay
          loop
          muted
          playsInline
          preload={priority ? 'auto' : 'none'}
          {...(priority ? { fetchPriority: 'high' as const } : {})}
          className={className}
        />
      )}
    </div>
  );
}
