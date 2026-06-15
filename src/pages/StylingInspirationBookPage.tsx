import { useEffect } from 'react';
import ProjectBackButton from '../components/ProjectBackButton';
import {
  getStylingInspirationAssetSrc,
  stylingInspirationBookBrief,
  stylingInspirationBookCollageImages,
  stylingInspirationBookMeta,
  stylingInspirationBookVideos,
} from '../data/stylingInspirationBookContent';
import './StylingInspirationBookPage.css';

export default function StylingInspirationBookPage() {
  useEffect(() => {
    document.title = `${stylingInspirationBookMeta.title} — Works`;
  }, []);

  return (
    <div className="sib-page min-h-screen">
      <ProjectBackButton />
      <main className="sib-main mx-auto w-full max-w-[1080px] px-4 pb-20 pt-20 md:px-6">
        <header className="mb-12">
          <p className="m-0 font-['Roboto',sans-serif] text-sm text-[#969696]">{stylingInspirationBookMeta.meta}</p>
          <h1 className="m-0 mt-2 font-['Roboto',sans-serif] text-[32px] font-bold leading-tight text-black md:text-[40px]">
            {stylingInspirationBookMeta.title}
          </h1>
          <p className="m-0 mt-2 font-['Noto_Sans_SC',sans-serif] text-lg text-[#767676]">
            {stylingInspirationBookMeta.titleCn}
          </p>
          <p className="m-0 mt-4 max-w-[720px] font-['Noto_Sans_SC',sans-serif] text-base leading-7 text-[#666666]">
            {stylingInspirationBookMeta.description}
          </p>
        </header>

        <section id="sib-video" className="sib-section mb-16">
          <p className="sib-section-label">Video</p>
          {stylingInspirationBookVideos.map((video) => (
            <div key={video.id} className="sib-video-wrap">
              <video
                className="sib-video"
                src={getStylingInspirationAssetSrc(video.file)}
                controls
                playsInline
                preload="metadata"
              >
                您的浏览器不支持视频播放。
              </video>
            </div>
          ))}
        </section>

        <section id="sib-brief" className="sib-section mb-16">
          <p className="sib-section-label">{stylingInspirationBookBrief.heading}</p>
          <div className="sib-brief">
            {stylingInspirationBookBrief.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section id="sib-collage" className="sib-section">
          <p className="sib-section-label">Collage Material</p>
          <div className="sib-collage-grid">
            {stylingInspirationBookCollageImages.map((image) => (
              <figure key={image.id} className="sib-collage-item">
                <span className="sib-collage-caption">{image.caption}</span>
                <img
                  src={getStylingInspirationAssetSrc(image.file)}
                  alt={image.caption}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
