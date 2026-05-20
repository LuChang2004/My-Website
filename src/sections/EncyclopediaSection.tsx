import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, BookOpen, MessageCircle, Share2, Download, Send } from 'lucide-react';

const commentKey = (id: number) => `flf_enc_comment_${id}`;

function NumberBadge({ id, className = '' }: { id: number; className?: string }) {
  return (
    <span
      className={`bg-[#1A1A1A] text-white font-space tracking-wider ${className}`}
    >
      {String(id).padStart(2, '0')}
    </span>
  );
}

function CircleIconButton({
  label,
  onClick,
  active,
  children,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`w-11 h-11 rounded-full border flex items-center justify-center transition-colors duration-200 ${
        active
          ? 'border-[#c8102e] text-[#c8102e] bg-[#c8102e]/8'
          : 'border-[rgba(26,26,26,0.15)] text-[#1A1A1A] hover:border-[#c8102e] hover:text-[#c8102e] hover:bg-[#c8102e]/5'
      }`}
    >
      {children}
    </button>
  );
}

async function downloadArtwork(entry: EncEntry) {
  const res = await fetch(entry.image);
  const blob = await res.blob();
  const ext = entry.image.split('.').pop() || 'png';
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${entry.titleEn.replace(/\s+/g, '-')}.${ext}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function shareArtwork(entry: EncEntry) {
  const url = `${window.location.origin}${window.location.pathname}#work-${entry.id}`;
  const payload = {
    title: `${entry.title} — Final Limb Fantasy`,
    text: entry.description,
    url,
  };
  if (navigator.share) {
    try {
      await navigator.share(payload);
      return;
    } catch (err) {
      if ((err as DOMException).name === 'AbortError') return;
    }
  }
  await navigator.clipboard.writeText(url);
}

interface EncEntry {
  id: number;
  title: string;
  titleEn: string;
  image: string;
  description: string;
}

const entries: EncEntry[] = [
  { id: 1, title: '感官礼物', titleEn: 'Sensory Gift', image: '/images/work_01_sensory.png', description: '感官像是一种来自于上帝的礼物，就像情人节收到的鲜花一样珍贵。' },
  { id: 2, title: '人的动物性', titleEn: 'Human Animality', image: '/images/work_02_animality.png', description: '奶牛人、金钱豹人、鱼人——我们所有。' },
  { id: 3, title: '休闲时光', titleEn: 'Leisure Time', image: '/images/work_05_leisure.png', description: '三个简笔人带着猫，享受闲暇。' },
  { id: 4, title: 'How we shed tears?', titleEn: 'Tears & Rain', image: '/images/work_06_tears_brain.png', description: '眼泪是大脑在下雨，泪腺是排水管道。' },
  { id: 5, title: '能量池', titleEn: 'Energy Pool', image: '/images/work_04_energy.png', description: '我养了一株会说话的花，代价是我自己的鲜血。' },
  { id: 6, title: '平衡系统', titleEn: 'Balance System', image: '/images/work_07_balance.png', description: '维持这台机器运转的微妙平衡。' },
  { id: 7, title: '脏话 / 闭嘴', titleEn: 'Swear / Shut Up', image: '/images/work_08b_mouth.png', description: '使用暴力往往能快速让人闭嘴。骂人的话总是离不开生殖器。' },
  { id: 8, title: '苍蝇拍', titleEn: 'Fly Swatter', image: '/images/work_09_flyswatter.png', description: '苍蝇拍：塑料诞生之前。' },
  { id: 9, title: '偷窥镜', titleEn: 'Peeping Mirror', image: '/images/work_10_peep.png', description: '窥视这台机器的内部运转。' },
  { id: 10, title: '人立方', titleEn: 'Human Cube', image: '/images/work_11a_cube.png', description: '由无数碎片组成的人。' },
  { id: 11, title: '眼泪碗', titleEn: 'Bowl of Tears', image: '/images/work_03_tears_bowl.png', description: '盛满泪水的碗，承载着悲伤的出口。' },
  { id: 12, title: '暴力语法', titleEn: 'Violence Grammar', image: '/images/work_08a_fist.png', description: '拳头是最原始的语言，暴力是语法。' },
];

function Lightbox({ entry, onClose, onPrev, onNext }: {
  entry: EncEntry; onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [sharePulse, setSharePulse] = useState(false);

  useEffect(() => {
    setCommentOpen(false);
    try {
      setCommentText(localStorage.getItem(commentKey(entry.id)) ?? '');
    } catch {
      setCommentText('');
    }
  }, [entry.id]);

  const saveComment = useCallback(() => {
    try {
      if (commentText.trim()) {
        localStorage.setItem(commentKey(entry.id), commentText.trim());
      } else {
        localStorage.removeItem(commentKey(entry.id));
      }
    } catch { /* ignore */ }
    setCommentOpen(false);
  }, [commentText, entry.id]);

  const hasComment = commentText.trim().length > 0;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#FFFFFF]/95 backdrop-blur-sm flex items-center justify-center"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button className="absolute top-5 right-5 text-[#1A1A1A] hover:text-[#c8102e] transition-colors z-10" onClick={onClose}>
        <X className="w-7 h-7" />
      </button>
      <button className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A1A] hover:text-[#c8102e] transition-colors z-10" onClick={(e) => { e.stopPropagation(); onPrev(); }}>
        <ChevronLeft className="w-9 h-9" />
      </button>
      <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1A1A1A] hover:text-[#c8102e] transition-colors z-10" onClick={(e) => { e.stopPropagation(); onNext(); }}>
        <ChevronRight className="w-9 h-9" />
      </button>

      <motion.div
        className="max-w-md w-full mx-4 flex flex-col items-center text-center"
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-[60%] mb-6 relative">
          <img src={entry.image} alt={entry.title} className="w-full h-auto" />
          <NumberBadge
            id={entry.id}
            className="absolute bottom-2 left-2 text-[10px] px-1.5 py-0.5"
          />
        </div>
        <p className="text-2xl text-[#1A1A1A] mb-1 font-sans-sc font-semibold">{entry.title}</p>
        <span className="font-space text-[13px] text-[#888888] tracking-wider block mb-4">{entry.titleEn}</span>
        <p className="text-[#555555] text-[13px] leading-relaxed border-l-2 border-[#c8102e] pl-4 text-left max-w-xs font-sans-sc">
          {entry.description}
        </p>

        <div className="flex items-center justify-center gap-4 mt-8">
          <CircleIconButton
            label="评论"
            active={commentOpen || hasComment}
            onClick={() => setCommentOpen((o) => !o)}
          >
            <MessageCircle className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </CircleIconButton>
          <CircleIconButton
            label="分享"
            active={sharePulse}
            onClick={async () => {
              await shareArtwork(entry);
              setSharePulse(true);
              window.setTimeout(() => setSharePulse(false), 1200);
            }}
          >
            <Share2 className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </CircleIconButton>
          <CircleIconButton label="下载" onClick={() => downloadArtwork(entry)}>
            <Download className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </CircleIconButton>
        </div>

        <AnimatePresence>
          {commentOpen && (
            <motion.div
              className="w-full max-w-xs mt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="写下你的想法…"
                  rows={3}
                  className="w-full resize-none border border-[rgba(26,26,26,0.12)] bg-white text-[#1A1A1A] text-[13px] font-sans-sc p-3 pr-12 focus:outline-none focus:border-[#c8102e] transition-colors"
                  autoFocus
                />
                <button
                  type="button"
                  aria-label="保存评论"
                  onClick={saveComment}
                  className="absolute right-2 bottom-2 w-8 h-8 rounded-full border border-[rgba(26,26,26,0.15)] flex items-center justify-center text-[#1A1A1A] hover:border-[#c8102e] hover:text-[#c8102e] transition-colors"
                >
                  <Send className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function EncyclopediaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = () => setSelectedIndex(i => i === null ? null : i === 0 ? entries.length - 1 : i - 1);
  const handleNext = () => setSelectedIndex(i => i === null ? null : i === entries.length - 1 ? 0 : i + 1);

  return (
    <section id="encyclopedia" ref={sectionRef} className="relative bg-[#FFFFFF] py-[100px] md:py-[140px]">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 mb-12">
        <motion.div className="flex items-end justify-between mb-4"
          initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div>
            <span className="font-space text-[12px] tracking-[0.2em] text-[#c8102e] uppercase block mb-2">Encyclopedia</span>
            <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] text-[#1A1A1A] font-semibold font-sans-sc">作品图鉴</h2>
          </div>
          <BookOpen className="w-5 h-5 text-[#c8102e]" />
        </motion.div>
        <motion.div className="h-[1px] bg-[#c8102e]"
          initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} style={{ transformOrigin: 'left' }} />
      </div>

      {/* Grid — fewer columns + wider container ≈ 1.5× preview size */}
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
          {entries.map((entry, i) => (
            <motion.div key={entry.id} className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              onClick={() => setSelectedIndex(i)}>
              <div className="relative aspect-square bg-white border border-[rgba(26,26,26,0.06)] overflow-hidden group-hover:border-[rgba(200,16,46,0.4)] transition-colors duration-300">
                <motion.img src={entry.image} alt={entry.title}
                  className="w-full h-full object-contain p-4 md:p-5"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  loading="lazy" />
                <NumberBadge
                  id={entry.id}
                  className="absolute bottom-2 left-2 text-[10px] px-2 py-0.5"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(200,16,46,0.08)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="mt-2.5">
                <span className="text-[13px] md:text-[14px] text-[#1A1A1A] group-hover:text-[#c8102e] transition-colors font-sans-sc">
                  {entry.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <Lightbox entry={entries[selectedIndex]} onClose={() => setSelectedIndex(null)} onPrev={handlePrev} onNext={handleNext} />
        )}
      </AnimatePresence>
    </section>
  );
}
