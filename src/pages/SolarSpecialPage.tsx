import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react';
import ProjectBackButton from '../components/ProjectBackButton';
import { solarSpecialMeta, solarSpecialSections, type SolarBlock } from '../data/solarSpecialContent';
import { SOLAR_DESIGN_WIDTH, solarColors, solarType } from '../data/solarSpecialTypography';
import ExternalVideo from '../components/ExternalVideo';
import { resolvePublicAssetSrc } from '../utils/resolvePublicAssetSrc';
import './SolarSpecialPage.css';

const STAR_COUNT = 420;
const STAR_SPREAD = 3200;
const STAR_SIZE = 3;

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function scaledStyle(token: {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
}): CSSProperties {
  return {
    fontFamily: token.fontFamily,
    fontSize: `calc(${token.fontSize}px * var(--ss-scale))`,
    fontWeight: token.fontWeight,
    lineHeight: token.lineHeight,
    color: solarColors.text,
    margin: 0,
  };
}

function SolarText({
  token,
  children,
  className = '',
  as: Tag = 'p',
}: {
  token: (typeof solarType)[keyof typeof solarType];
  children: ReactNode;
  className?: string;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'span' | 'div';
}) {
  return (
    <Tag className={className} style={scaledStyle(token)}>
      {children}
    </Tag>
  );
}

function SolarStarfield() {
  const stars = useMemo(() => {
    const rng = mulberry32(0x5f4c4152);
    return Array.from({ length: STAR_COUNT }, () => ({
      x: rng() * STAR_SPREAD,
      y: rng() * STAR_SPREAD,
    }));
  }, []);

  return (
    <div className="ss-starfield" aria-hidden="true">
      <div className="ss-starfield-rotate">
        {stars.map((star, index) => (
          <span
            key={index}
            className="ss-star"
            style={{
              left: star.x,
              top: star.y,
              width: STAR_SIZE,
              height: STAR_SIZE,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function BlockRenderer({ block }: { block: SolarBlock }) {
  if (block.kind === 'placeholder') {
    return null;
  }

  if (block.kind === 'subsection') {
    return (
      <div className="ss-subsection">
        <div className="ss-subheading">
          <SolarText token={solarType.subSectionTitle} as="h3">
            {block.cn}
          </SolarText>
          {block.en && (
            <SolarText token={solarType.subSectionTitleEn} as="span">
              {block.en}
            </SolarText>
          )}
        </div>
        <div className="ss-subsection-body">
          {block.blocks.map((child, index) => (
            <BlockRenderer key={`${block.cn}-${index}`} block={child} />
          ))}
        </div>
      </div>
    );
  }

  if (block.kind === 'pillSubheading') {
    return (
      <div className="ss-pill-subheading">
        <span className="ss-keyword-pill">
          <SolarText token={solarType.label} as="span">
            {block.cn}
          </SolarText>
        </span>
        {block.en && (
          <SolarText token={solarType.subSectionTitleEn} as="span">
            {block.en}
          </SolarText>
        )}
      </div>
    );
  }

  if (block.kind === 'keywordPills') {
    return (
      <div className="ss-keywords">
        {block.items.map((item) => (
          <span key={item} className="ss-keyword-pill">
            <SolarText token={solarType.label} as="span">
              {item}
            </SolarText>
          </span>
        ))}
      </div>
    );
  }

  if (block.kind === 'keywords') {
    return (
      <div className="ss-keywords">
        {block.items.map((item) => (
          <SolarText key={item} token={/^[A-Za-z0-9]/.test(item) ? solarType.labelEn : solarType.label} as="span">
            {item}
          </SolarText>
        ))}
      </div>
    );
  }

  if (block.kind === 'paragraphs') {
    return (
      <div className="ss-paragraphs">
        {block.items.map((text) => (
          <SolarText key={text} token={solarType.body} as="p">
            {text}
          </SolarText>
        ))}
      </div>
    );
  }

  if (block.kind === 'bulletGroup') {
    return (
      <ul className="ss-list">
        {block.items.map((item) => (
          <li key={item}>
            <SolarText token={solarType.body} as="span">
              {item}
            </SolarText>
          </li>
        ))}
      </ul>
    );
  }

  if (block.kind === 'flow') {
    return (
      <ol className="ss-flow">
        {block.steps.map((step) => (
          <li key={step}>
            <SolarText token={/^[A-Za-z]/.test(step) ? solarType.flowLabelEn : solarType.flowLabel} as="span">
              {step}
            </SolarText>
          </li>
        ))}
      </ol>
    );
  }

  if (block.kind === 'centerImage') {
    const src = resolvePublicAssetSrc(block.src);
    return (
      <figure className="ss-center-image">
        <img src={src} alt={block.alt} loading="lazy" decoding="async" />
      </figure>
    );
  }

  if (block.kind === 'motionVideos') {
    return (
      <div className="ss-motion-videos">
        {block.rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`ss-motion-video-row ss-motion-video-row--${row.columns}${row.width === 'half' ? ' ss-motion-video-row--half' : ''}`}
          >
            {row.items.map((item) => (
                <article key={item.title} className="ss-motion-video">
                  <div className="ss-motion-video-head">
                    <SolarText token={solarType.featureTitleEn} as="h3" className="ss-motion-video-title">
                      {item.title}
                    </SolarText>
                    {item.description && (
                      <SolarText token={solarType.body} as="p" className="ss-motion-video-desc">
                        {item.description}
                      </SolarText>
                    )}
                  </div>
                  <div className="ss-center-video">
                    <ExternalVideo
                      src={item.src}
                      className="ss-motion-video-player"
                      videoClassName="ss-motion-video-player"
                      title={item.title}
                    />
                  </div>
                </article>
              ))}
          </div>
        ))}
      </div>
    );
  }

  if (block.kind === 'artFeatures') {
    return (
      <div className="ss-art-grid">
        {block.items.map((feature) => (
          <article key={feature.title} className="ss-art-feature">
            <SolarText token={solarType.featureTitleEn} as="h3">
              {feature.title}
            </SolarText>
            <SolarText token={solarType.body} as="p">
              {feature.description}
            </SolarText>
          </article>
        ))}
      </div>
    );
  }

  return null;
}

function useSolarScale(rootRef: RefObject<HTMLElement | null>) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const update = () => {
      setScale(Math.min(1, root.clientWidth / SOLAR_DESIGN_WIDTH));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(root);
    return () => observer.disconnect();
  }, [rootRef]);

  return scale;
}

function useSolarFonts() {
  useEffect(() => {
    const links = [
      {
        id: 'solar-font-futura',
        href: 'https://fonts.cdnfonts.com/css/futura-pt',
      },
    ];

    const created = links.map(({ id, href }) => {
      if (document.getElementById(id)) return null;
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
      return link;
    });

    return () => {
      created.forEach((link) => link?.remove());
    };
  }, []);
}

export default function SolarSpecialPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = useSolarScale(containerRef);

  useSolarFonts();

  useEffect(() => {
    document.title = 'Solar Special — 太阳系特调';
    document.body.classList.add('solar-special-active');
    return () => document.body.classList.remove('solar-special-active');
  }, []);

  const { titleEn, titleCn, term, course } = solarSpecialMeta;

  return (
    <div className="solar-special-page">
      <SolarStarfield />
      <ProjectBackButton className="solar-back-btn" />
      <div className="solar-special-scroll">
        <div ref={containerRef} className="solar-special-canvas" style={{ ['--ss-scale' as string]: scale }}>
          <header id="ss-cover" className="ss-cover">
            <SolarText token={solarType.coverTitleEn} as="h1" className="ss-cover-title-en">
              {titleEn}
            </SolarText>
            <SolarText token={solarType.coverTitleCn} as="p" className="ss-cover-title-cn">
              {titleCn}
            </SolarText>
            <div className="ss-cover-meta">
              <SolarText token={solarType.meta} as="span">
                {term}
              </SolarText>
              <SolarText token={solarType.metaCn} as="span">
                {course}
              </SolarText>
            </div>
          </header>

          {solarSpecialSections.map((section) => (
            <section key={section.id} id={section.id} className="ss-section">
              <div className="ss-section-heading">
                <span className="ss-section-heading-bar" aria-hidden="true" />
                <div className="ss-section-heading-text">
                  <SolarText token={solarType.sectionTitleCn} as="h2">
                    {section.titleCn}
                  </SolarText>
                  {section.titleEn && (
                    <SolarText token={solarType.sectionTitleEn} as="p" className="ss-section-heading-en">
                      {section.titleEn}
                    </SolarText>
                  )}
                </div>
              </div>
              <div className="ss-section-body">
                {section.blocks.map((block, index) => (
                  <BlockRenderer key={`${section.id}-${index}`} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
