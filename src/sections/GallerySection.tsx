import { useRef, useState, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Upload, Edit3, Check } from 'lucide-react';

interface Artwork {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
}

const defaultArtworks: Artwork[] = [
  { id: 1, title: '感官礼物', subtitle: 'Sensory Gift', image: '/images/work_01_sensory.png', description: '感官像是一种来自于上帝的礼物，就像情人节收到的鲜花一样珍贵。' },
  { id: 2, title: '人的動物性', subtitle: 'Human Animality', image: '/images/work_02_animality.png', description: '奶牛人、金钱豹人、鱼人——我们所有。' },
  { id: 3, title: '眼泪碗', subtitle: 'Bowl of Tears', image: '/images/work_03_tears_bowl.png', description: '盛满泪水的碗，悲伤最柔软的出口。' },
  { id: 4, title: '能量池', subtitle: 'Energy Pool', image: '/images/work_04_energy.png', description: '我养了一株会说话的花，代价是我自己的鲜血。' },
  { id: 5, title: '休闲时光', subtitle: 'Leisure Time', image: '/images/work_05_leisure.png', description: '三个简笔人带着猫，享受与机器无关的闲暇。' },
  { id: 6, title: 'How we shed tears?', subtitle: 'Tears & Rain', image: '/images/work_06_tears_brain.png', description: '眼泪是大脑在下雨，泪腺是排水管道。' },
  { id: 7, title: '平衡系統', subtitle: 'Balance System', image: '/images/work_07_balance.png', description: '维持这台机器运转的微妙平衡。' },
  { id: 8, title: '脏话 / 闭嘴', subtitle: 'Swear / Shut Up', image: '/images/work_08b_mouth.png', description: '使用暴力往往能快速让人闭嘴。骂人的话总是离不开生殖器。' },
  { id: 9, title: '偷窺鏡', subtitle: 'Peeping Mirror', image: '/images/work_10_peep.png', description: '窥视这台机器的内部运转。' },
];

function loadFromStorage(): Artwork[] {
  try {
    const saved = localStorage.getItem('flf_gallery_v3');
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }
  return defaultArtworks.map(a => ({ ...a }));
}

function saveToStorage(data: Artwork[]) {
  localStorage.setItem('flf_gallery_v3', JSON.stringify(data));
}

function Lightbox({ artwork, onClose, onPrev, onNext }: {
  artwork: Artwork; onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  return (
    <motion.div className="fixed inset-0 z-50 bg-[#FFFFFF]/95 backdrop-blur-sm flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <button className="absolute top-6 right-6 text-[#1A1A1A] hover:text-[#c8102e] transition-colors z-10" onClick={onClose}><X className="w-8 h-8" /></button>
      <button className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-[#1A1A1A] hover:text-[#c8102e] transition-colors z-10" onClick={(e) => { e.stopPropagation(); onPrev(); }}><ChevronLeft className="w-10 h-10" /></button>
      <button className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-[#1A1A1A] hover:text-[#c8102e] transition-colors z-10" onClick={(e) => { e.stopPropagation(); onNext(); }}><ChevronRight className="w-10 h-10" /></button>
      <motion.div className="max-w-4xl w-full mx-4 flex flex-col md:flex-row items-center gap-8" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
        <div className="flex-1 flex items-center justify-center">
          <img src={artwork.image} alt={artwork.title} className="max-w-full max-h-[60vh] object-contain border border-[rgba(26,26,26,0.08)]" />
        </div>
        <div className="md:w-[280px] text-left">
          <span className="font-space text-xs tracking-widest text-[#c8102e] block mb-2">{String(artwork.id).padStart(2, '0')}</span>
          <p className="font-serif-sc text-2xl md:text-3xl text-[#1A1A1A] mb-1">{artwork.title}</p>
          <span className="font-space text-sm text-[#888888] tracking-wider block mb-6">{artwork.subtitle}</span>
          <p className="font-sans-sc text-[#444444] text-sm leading-relaxed border-l-2 border-[#c8102e] pl-4">{artwork.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const [galleryData, setGalleryData] = useState<Artwork[]>(loadFromStorage);
  const [isEditing, setIsEditing] = useState(() => {
    const saved = localStorage.getItem('flf_editing_done_v3');
    return saved !== 'true';
  });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);

  const updateField = useCallback((index: number, field: keyof Artwork, value: string) => {
    setGalleryData(prev => {
      const next = prev.map((a, i) => i === index ? { ...a, [field]: value } : a);
      saveToStorage(next);
      return next;
    });
  }, []);

  const handleImageUpload = useCallback((index: number, file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setGalleryData(prev => {
          const next = prev.map((a, i) => i === index ? { ...a, image: result } : a);
          saveToStorage(next);
          return next;
        });
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOver(null);
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(index, file);
  }, [handleImageUpload]);

  const finishEditing = useCallback(() => {
    setIsEditing(false);
    localStorage.setItem('flf_editing_done_v3', 'true');
  }, []);

  const reenterEditMode = useCallback(() => {
    setIsEditing(true);
    localStorage.removeItem('flf_editing_done_v3');
  }, []);

  const handlePrev = () => { if (selectedIndex !== null) setSelectedIndex(selectedIndex === 0 ? galleryData.length - 1 : selectedIndex - 1); };
  const handleNext = () => { if (selectedIndex !== null) setSelectedIndex(selectedIndex === galleryData.length - 1 ? 0 : selectedIndex + 1); };

  return (
    <section ref={sectionRef} className="relative bg-[#FFFFFF] py-[120px] md:py-[160px]">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-16">
        <motion.div className="flex items-end justify-between mb-4" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div>
            <span className="font-space text-xs tracking-[0.2em] text-[#c8102e] uppercase block mb-2">Gallery</span>
            <h2 className="font-serif-sc text-[clamp(1.8rem,4vw,3rem)] text-[#1A1A1A] font-semibold">作品畫廊</h2>
          </div>
          <div className="flex items-center gap-4">
            {!isEditing && (
              <button onClick={reenterEditMode} className="flex items-center gap-2 px-4 py-2 border border-[#c8102e] text-[#c8102e] hover:bg-[#c8102e] hover:text-white transition-all text-sm font-space tracking-wider">
                <Edit3 className="w-4 h-4" /> 编辑
              </button>
            )}
            <span className="font-space text-xs text-[#888888] tracking-wider hidden md:block">{galleryData.length} WORKS</span>
          </div>
        </motion.div>
        <motion.div className="h-[1px] bg-[#c8102e]" initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} style={{ transformOrigin: 'left' }} />

        {/* Edit mode banner */}
        <AnimatePresence>
          {isEditing && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-6 flex items-center justify-between bg-[#F5F5F0] border border-[rgba(200,16,46,0.3)] px-6 py-4">
              <div>
                <p className="font-sans-sc text-sm text-[#1A1A1A] font-medium">编辑模式 — 点击作品卡片上传图片并编辑信息</p>
                <p className="font-sans-sc text-xs text-[#888888] mt-1">支持拖拽上传图片。完成后点击下方「完成编辑」按钮。</p>
              </div>
              <button onClick={finishEditing} className="flex items-center gap-2 px-6 py-3 bg-[#c8102e] text-white hover:bg-[#a00c24] transition-colors text-sm font-space tracking-wider">
                <Check className="w-4 h-4" /> 完成编辑
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {galleryData.map((artwork, i) => (
            <motion.div
              key={artwork.id}
              className={isEditing ? '' : 'group cursor-pointer'}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={isEditing ? undefined : () => setSelectedIndex(i)}
            >
              {isEditing ? (
                /* Edit Mode Card */
                <div className="border border-[rgba(200,16,46,0.3)] bg-[#F5F5F0] p-4">
                  {/* Image Upload Area */}
                  <div
                    className={`relative aspect-[3/4] mb-4 border-2 border-dashed transition-colors overflow-hidden flex items-center justify-center ${dragOver === i ? 'border-[#c8102e] bg-[rgba(200,16,46,0.05)]' : 'border-[rgba(26,26,26,0.15)] bg-white'}`}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(i); }}
                    onDragLeave={() => setDragOver(null)}
                    onDrop={(e) => handleDrop(e, i)}
                  >
                    {artwork.image.startsWith('data:') || !artwork.image.includes('image_') ? (
                      <img src={artwork.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <img src={artwork.image} alt="" className="w-full h-full object-cover" />
                    )}
                    {/* Upload overlay */}
                    <label className="absolute inset-0 flex flex-col items-center justify-center bg-[rgba(255,255,255,0.7)] opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                      <Upload className="w-8 h-8 text-[#c8102e] mb-2" />
                      <span className="font-sans-sc text-xs text-[#666666]">点击或拖拽上传</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(i, f); }} />
                    </label>
                  </div>
                  {/* Text Fields */}
                  <div className="space-y-3">
                    <div>
                      <span className="font-space text-[10px] text-[#c8102e] tracking-wider">{String(artwork.id).padStart(2, '0')}</span>
                      <input
                        type="text"
                        value={artwork.title}
                        onChange={(e) => updateField(i, 'title', e.target.value)}
                        className="w-full font-serif-sc text-base text-[#1A1A1A] border-b border-[rgba(26,26,26,0.15)] bg-transparent focus:border-[#c8102e] outline-none py-1 transition-colors"
                      />
                    </div>
                    <input
                      type="text"
                      value={artwork.subtitle}
                      onChange={(e) => updateField(i, 'subtitle', e.target.value)}
                      className="w-full font-space text-xs text-[#888888] tracking-wider border-b border-[rgba(26,26,26,0.15)] bg-transparent focus:border-[#c8102e] outline-none py-1 transition-colors"
                      placeholder="英文副标题"
                    />
                    <textarea
                      value={artwork.description}
                      onChange={(e) => updateField(i, 'description', e.target.value)}
                      className="w-full font-sans-sc text-sm text-[#444444] border border-[rgba(26,26,26,0.15)] bg-white focus:border-[#c8102e] outline-none p-2 resize-none transition-colors"
                      rows={2}
                      placeholder="作品描述..."
                    />
                  </div>
                </div>
              ) : (
                /* Display Mode Card */
                <>
                  <div className="relative aspect-[3/4] bg-[#F5F5F0] border border-[rgba(26,26,26,0.08)] overflow-hidden group-hover:border-[rgba(200,16,46,0.4)] transition-colors duration-400">
                    <img src={artwork.image} alt={artwork.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(200,16,46,0.3)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                      <p className="font-serif-sc text-white text-lg">{artwork.title}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <div>
                      <span className="font-space text-xs text-[#c8102e] tracking-wider mr-2">{String(artwork.id).padStart(2, '0')}</span>
                      <span className="font-sans-sc text-sm text-[#1A1A1A]">{artwork.title}</span>
                    </div>
                    <span className="font-space text-[10px] text-[#888888] tracking-wider">{artwork.subtitle}</span>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <Lightbox artwork={galleryData[selectedIndex]} onClose={() => setSelectedIndex(null)} onPrev={handlePrev} onNext={handleNext} />
        )}
      </AnimatePresence>
    </section>
  );
}
