import { resolvePublicAssetSrc } from '../utils/resolvePublicAssetSrc';
import { getBilibiliEmbedUrl, getBilibiliWatchUrl, isBilibiliVideoUrl } from '../utils/videoEmbed';
import './ExternalVideo.css';

type ExternalVideoProps = {
  src: string;
  className?: string;
  videoClassName?: string;
  iframeClassName?: string;
  title?: string;
};

export default function ExternalVideo({
  src,
  className = '',
  videoClassName = '',
  iframeClassName = '',
  title = '视频播放',
}: ExternalVideoProps) {
  if (isBilibiliVideoUrl(src)) {
    const embedUrl = getBilibiliEmbedUrl(src);
    const watchUrl = getBilibiliWatchUrl(src);
    if (!embedUrl) return null;

    return (
      <div className={`external-video external-video--bilibili ${className}`.trim()}>
        <div className="external-video__iframe-wrap">
          <iframe
            src={embedUrl}
            title={title}
            className={`external-video__iframe ${iframeClassName}`.trim()}
            allow="autoplay; fullscreen"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          {watchUrl && (
            <a
              className="external-video__fallback"
              href={watchUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              若无法播放，前往 B 站观看
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <video
      className={videoClassName}
      src={resolvePublicAssetSrc(src)}
      controls
      playsInline
      preload="metadata"
    >
      您的浏览器不支持视频播放。
    </video>
  );
}
