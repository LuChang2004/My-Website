import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';
import ScrollingBanner from '../components/ScrollingBanner';
import OptimizedImage from '../components/OptimizedImage';

/* ===== Lightbox ===== */
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#FFFFFF]/95 backdrop-blur-sm flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        className="absolute top-5 right-5 text-[#1A1A1A] hover:text-[#c8102e] transition-colors"
        onClick={onClose}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      <motion.div
        className="max-w-lg w-full mx-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={src} alt={alt} className="w-full h-auto block" />
      </motion.div>
    </motion.div>
  );
}

/* Pill标签: 黑底白字 */
function PillLabel({ text }: { text: string }) {
  return (
    <motion.span
      className="inline-block bg-[#1A1A1A] text-white font-sans-sc text-[12px] px-3 py-1 tracking-wide font-bold"
      whileHover={{ scale: 1.05, backgroundColor: '#c8102e' }}
      transition={{ duration: 0.2 }}
    >
      {text}
    </motion.span>
  );
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  );
}

/* 图片组件：懒加载 + 编号 + 悬停放大 */
function ArtImage({ src, alt, number, className = '', onClick }: { src: string; alt: string; number?: string; className?: string; onClick?: () => void }) {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <OptimizedImage src={src} alt={alt} className="block w-full h-auto" onClick={onClick} />
      {number && (
        <span className="absolute bottom-2 left-2 z-10 bg-transparent border border-[#1A1A1A] text-[#1A1A1A] font-space text-[10px] px-1.5 py-[1px] tracking-wider pointer-events-none">
          {number}
        </span>
      )}
    </motion.div>
  );
}

function ParallaxSection({ children, speed = 0.3, className = '' }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [60 * speed, -60 * speed]);
  return <motion.div ref={ref} style={{ y }} className={className}>{children}</motion.div>;
}

/* ===== Main Component ===== */
export default function ArtworkScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState('');

  const openLightbox = (src: string, alt: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
  };

  const closeLightbox = () => {
    setLightboxSrc(null);
    setLightboxAlt('');
  };

  return (
    <section id="gallery" ref={sectionRef} className="relative bg-[#FFFFFF]">
      {/* Top scrolling banner */}
      <ScrollingBanner src="/images/group3.png" rows={3} speed={18} direction="left" opacity={0.7} />

      {/* Section header */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-[80px] md:pt-[100px] pb-4">
        <motion.div
          className="flex items-end justify-between mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="font-space text-[12px] tracking-[0.2em] text-[#c8102e] uppercase block mb-2">
              Gallery
            </span>
            <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] text-[#1A1A1A] font-semibold font-sans-sc">
              画廊
            </h2>
          </div>
          <LayoutGrid className="w-5 h-5 text-[#c8102e]" />
        </motion.div>
        <motion.div
          className="h-[1px] bg-[#c8102e]"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
        />
      </div>

      <div className="max-w-[680px] mx-auto px-5 md:px-8">

        {/* 01 感官礼物 */}
        <ParallaxSection speed={0.2}>
          <FadeIn className="py-8">
            <PillLabel text="感官礼物" />
            <div className="mt-6 flex justify-center">
              <ArtImage src="/images/work_01_sensory.png" alt="感官礼物" number="01" className="w-[100%]" />
            </div>
            <p className="text-[#555555] text-[12px] leading-relaxed mt-5 text-right">
              感官像是一种来自于上帝的礼物，就像情<br />人节收到的鲜花一样珍贵。
            </p>
          </FadeIn>
        </ParallaxSection>

        {/* 02 人的动物性 — 三图纵向排列 + 各自灯箱 */}
        <ParallaxSection speed={0.35}>
          <FadeIn className="py-10">
            <PillLabel text="人的动物性" />
            <div className="mt-6 flex flex-col items-center gap-6">
              <div className="flex flex-col items-center gap-2 w-[35%]">
                <ArtImage
                  src="/images/frame10.png"
                  alt="奶牛人"
                  number="02a"
                  className="w-full"
                  onClick={() => openLightbox('/images/frame10.png', '奶牛人')}
                />
                <span className="text-[#555555] text-[13px] font-sans-sc">奶牛人</span>
              </div>
              <div className="flex flex-col items-center gap-2 w-[35%]">
                <ArtImage
                  src="/images/frame11.png"
                  alt="金钱豹人"
                  number="02b"
                  className="w-full"
                  onClick={() => openLightbox('/images/frame11.png', '金钱豹人')}
                />
                <span className="text-[#555555] text-[13px] font-sans-sc">金钱豹人</span>
              </div>
              <div className="flex flex-col items-center gap-2 w-[35%]">
                <ArtImage
                  src="/images/frame12.png"
                  alt="鱼人"
                  number="02c"
                  className="w-full"
                  onClick={() => openLightbox('/images/frame12.png', '鱼人')}
                />
                <span className="text-[#555555] text-[13px] font-sans-sc">鱼人</span>
              </div>
            </div>
          </FadeIn>
        </ParallaxSection>

        {/* 03 感官碗 */}
        <ParallaxSection speed={0.25}>
          <FadeIn className="py-10">
            <PillLabel text="感官盛宴" />
            <div className="mt-6 flex justify-center">
              <ArtImage src="/images/work_03_tears_bowl.png" alt="感官盛宴" number="03" className="w-[48%]" />
            </div>
          </FadeIn>
        </ParallaxSection>

        {/* 04 能量池 */}
        <ParallaxSection speed={0.15}>
          <FadeIn className="py-10">
            <PillLabel text="能量池" />
            <div className="mt-6 flex flex-row items-end gap-4">
              <p className="text-[#555555] text-[12px] leading-relaxed flex-1 pb-2">
                我养了一株会说话的花，代价是我自己的鲜血
              </p>
              <div className="flex-shrink-0 w-[32%]">
                <ArtImage src="/images/work_04_energy.png" alt="能量池" number="04" className="w-full" />
              </div>
            </div>
          </FadeIn>
        </ParallaxSection>

        {/* 05 休闲时光 */}
        <ParallaxSection speed={0.3}>
          <FadeIn className="py-10">
            <PillLabel text="休闲时光" />
            <div className="mt-6 flex justify-center">
              <ArtImage src="/images/work_05_leisure.png" alt="休闲时光" number="05" className="w-[60%]" />
            </div>
          </FadeIn>
        </ParallaxSection>

        {/* 06 How we shed tears? */}
        <ParallaxSection speed={0.2}>
          <FadeIn className="py-10">
            <PillLabel text="How we shed tears?" />
            <div className="mt-6 flex flex-col items-center">
              <ArtImage src="/images/work_06_tears_brain.png" alt="眼泪" number="06" className="w-[50%]" />
              <p className="text-[#555555] text-[12px] leading-relaxed mt-4 text-right w-full max-w-[280px]">
                眼泪是大脑在下雨，泪腺是排水管道
              </p>
            </div>
          </FadeIn>
        </ParallaxSection>

        {/* 07 蓄电池 */}
        <ParallaxSection speed={0.4}>
          <FadeIn className="py-10">
            <PillLabel text="蓄电池" />
            <div className="mt-6 flex justify-center">
              <ArtImage src="/images/work_07_battery.png" alt="蓄电池" number="07" className="w-[200%]" />
            </div>
            <p className="text-[#888888] text-[12px] leading-relaxed mt-4 font-sans-sc text-center">
              将双腿插入池中获取能量
            </p>
          </FadeIn>
        </ParallaxSection>

        {/* 08 脏话 / 闭嘴 */}
        <ParallaxSection speed={0.15}>
          <FadeIn className="py-10">
            <div className="flex gap-2 mb-5">
              <PillLabel text="脏话" />
              <PillLabel text="闭嘴" />
            </div>
            <div className="flex flex-row gap-16 items-start justify-center">
              <div className="w-[42%]">
                <ArtImage src="/images/work_08b_mouth.png" alt="脏话" number="08a" className="w-full" />
                <p className="text-[#555555] text-[12px] mt-3 text-center">骂人的话总是离不开生殖器</p>
              </div>
              <div className="w-[42%]">
                <ArtImage src="/images/work_08a_fist.png" alt="闭嘴" number="08b" className="w-full" />
                <p className="text-[#555555] text-[12px] mt-3 text-center">使用暴力往往能快速让人闭嘴</p>
              </div>
            </div>
          </FadeIn>
        </ParallaxSection>

        {/* 09 苍蝇拍 */}
        <ParallaxSection speed={0.35}>
          <FadeIn className="py-10">
            <PillLabel text="苍蝇拍：塑料诞生之前" />
            <div className="mt-6 flex justify-center">
              <ArtImage src="/images/work_09_flyswatter.png" alt="苍蝇拍" number="09" className="w-[32%]" />
            </div>
          </FadeIn>
        </ParallaxSection>

        {/* 10 偷窥镜 */}
        <ParallaxSection speed={0.25}>
          <FadeIn className="py-10">
            <PillLabel text="偷窥镜" />
            <div className="mt-6 flex justify-center">
              <ArtImage src="/images/work_10_peep.png" alt="偷窥镜" number="10" className="w-[50%]" />
            </div>
          </FadeIn>
        </ParallaxSection>

        {/* 11 人立方 */}
        <ParallaxSection speed={0.3}>
          <FadeIn className="py-10">
            <PillLabel text="人立方" />
            <div className="mt-6 flex justify-center">
              <ArtImage src="/images/work_11a_cube.png" alt="人立方" number="11" className="w-[55%]" />
            </div>
          </FadeIn>
        </ParallaxSection>

      </div>

      {/* Bottom scrolling banner */}
      <ScrollingBanner src="/images/group3.png" rows={3} speed={22} direction="right" opacity={0.7} />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <Lightbox src={lightboxSrc} alt={lightboxAlt} onClose={closeLightbox} />
        )}
      </AnimatePresence>
    </section>
  );
}


