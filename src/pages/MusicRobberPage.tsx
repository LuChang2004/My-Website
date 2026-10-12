import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { pageLayers, showcaseLayers, wireframeLayers } from './music-robber/latestLayers';
import type { DesignLayer } from './music-robber/designLayers';
import './MusicRobberPage.css';

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 20364;
const wireframeContent = wireframeLayers.map(layer => ({ ...layer, x: layer.x - 118 }));
const WIREFRAME_WIDTH = Math.ceil(Math.max(...wireframeContent.map(layer => layer.x + layer.w))) + 48;

function WireframeGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; ratio: number } | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const move = (direction: number) => {
    const element = scrollRef.current;
    if (element) element.scrollLeft += direction * element.clientWidth * 0.7;
  };
  return (
    <section className="music-design-wireframes music-design-section" aria-label="交互线框图" style={{ height: 1066 }}>
      <div ref={scrollRef} className="music-wireframe-scroll" tabIndex={0} role="region"
        aria-label="交互线框图，可左右滚动" aria-describedby="music-wireframe-hint"
        onScroll={event => {
          const element = event.currentTarget;
          setEdges({ start: element.scrollLeft <= 1, end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 1 });
        }}
        onDragStart={event => event.preventDefault()}
        onPointerDown={event => {
          if (event.pointerType !== 'mouse' || event.button !== 0) return;
          const element = event.currentTarget;
          drag.current = { x: event.clientX, left: element.scrollLeft, ratio: element.clientWidth / element.getBoundingClientRect().width };
          element.setPointerCapture(event.pointerId);
        }}
        onPointerMove={event => {
          if (drag.current) event.currentTarget.scrollLeft = drag.current.left - (event.clientX - drag.current.x) * drag.current.ratio;
        }}
        onPointerUp={() => { drag.current = null; }}
        onPointerCancel={() => { drag.current = null; }}
        onLostPointerCapture={() => { drag.current = null; }}>
        <div className="music-wireframe-content" style={{ width: WIREFRAME_WIDTH }}>
          <Layers layers={wireframeContent} />
        </div>
      </div>
      <div className="music-wireframe-controls">
        <span id="music-wireframe-hint">左右滑动，查看完整交互流程</span>
        <button type="button" aria-label="向左查看线框图" disabled={edges.start} onClick={() => move(-1)}>←</button>
        <button type="button" aria-label="向右查看线框图" disabled={edges.end} onClick={() => move(1)}>→</button>
      </div>
    </section>
  );
}

/** Preserve the composition of diagrams and device collages without flattening text. */
function Layers({ layers }: { layers: DesignLayer[] }) {
  return layers.map(({ id, x, y, w, h, Component, contents }) =>
    contents ? <Component key={id} /> : (
      <div key={id} className="music-design-layer"
        data-figma-layer={id}
        style={{ left: x, top: y, width: w, height: h }}>
        <Component />
      </div>
    ),
  );
}

function Section({ ids, top, height, label, className = '' }: {
  ids: string[]; top: number; height: number; label: string; className?: string;
}) {
  const layers = pageLayers.filter(layer => ids.includes(layer.id))
    .map(layer => ({ ...layer, y: layer.y - top }));
  return (
    <section aria-label={label} className={`music-design-section ${className}`} style={{ height }}>
      <Layers layers={layers} />
    </section>
  );
}

export default function MusicRobberPage() {
  const viewport = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(() => Math.min(window.innerWidth, DESIGN_WIDTH) / DESIGN_WIDTH);
  useLayoutEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / DESIGN_WIDTH));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    document.title = 'Music Robber — Works';
  }, []);

  return (
    <main className="music-robber-page" aria-label="Music Robber 项目介绍">
      <h1 className="sr-only">Music Robber：通过交互重构音乐发现</h1>
      <div className="music-design-viewport" ref={viewport} style={{ height: DESIGN_HEIGHT * scale }}>
        <div className="music-design-canvas" style={{ transform: `scale(${scale})` }}>
          <Section ids={['5:3224', '5:3225', '5:3226']} top={0} height={1146} label="Music Robber" />
          <div className="music-design-gap" style={{ height: 96 }} />
          <Section ids={['6:2327']} top={1242} height={232} label="01 项目概览" />
          <div className="music-design-gap" style={{ height: 128 }} />
          <Section ids={['6:2335']} top={1602} height={586} label="02 项目背景" />
          <div className="music-design-gap" style={{ height: 128 }} />
          <Section ids={['6:2341']} top={2316} height={246} label="03 问题定义" />
          <div className="music-design-gap" style={{ height: 128 }} />
          <Section ids={['6:2350', '11:6272', '11:6273', '11:6275']} top={2690} height={636} label="04 项目目标" />
          <div className="music-design-gap" style={{ height: 128 }} />
          <Section ids={['6:2381']} top={3454} height={254} label="05 解决思路" />
          <div className="music-design-gap" style={{ height: 128 }} />
          <Section ids={['6:2393', '6:2397', '6:2400', '6:2403', '11:6411']} top={3836} height={554} label="06 核心机制" />
          <div className="music-design-gap" style={{ height: 128 }} />
          <Section ids={['6:2421', '6:2424', '11:6443', '6:2435', '6:2436']} top={4518} height={1494} label="07 关键用户流程" />
          <div className="music-design-gap" style={{ height: 32 }} />
          <WireframeGallery />
          <div className="music-design-gap" style={{ height: 128 }} />
          <Section ids={['6:2480', '6:2483', '6:2484']} top={7238} height={395} label="08 MVP 与功能取舍" />
          <div className="music-design-gap" style={{ height: 139 }} />
          <Section ids={['6:2491']} top={7772} height={408} label="09 概念验证方案" />
          <div className="music-design-gap" style={{ height: 128 }} />
          <Section ids={['6:2507']} top={8308} height={666} label="10 成功指标与风险边界" />
          <div className="music-design-gap" style={{ height: 113 }} />
          <Section ids={['6:2451']} top={9087} height={82} label="11 界面展示" />
          <div className="music-design-gap" style={{ height: 40 }} />
          <section className="music-design-showcase music-design-section" aria-label="高保真界面展示" style={{ height: 8419 }}>
            <Layers layers={showcaseLayers} />
          </section>
          <div className="music-design-gap" style={{ height: 128 }} />
          <Section ids={['11:8980']} top={17756} height={1238} label="手机界面组合效果" />
          <div className="music-design-gap" style={{ height: 96 }} />
          <Section ids={['11:10258']} top={19090} height={898} label="最终界面陈列" />
          <div className="music-design-gap" style={{ height: 376 }} />
        </div>
      </div>
    </main>
  );
}
