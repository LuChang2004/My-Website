import { resolvePublicAssetSrc } from '../utils/resolvePublicAssetSrc';
import { getBilibiliEmbedUrl, isBilibiliVideoUrl } from '../utils/videoEmbed';
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
    if (!embedUrl) return null;

    return (
      <div className={`external-video external-video--bilibili ${className}`.trim()}>
        <iframe
          src={embedUrl}
          title={title}
          className={`external-video__iframe ${iframeClassName}`.trim()}
          allowFullScreen
          referrerPolicy="no-referrer"
        />
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
