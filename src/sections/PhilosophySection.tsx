import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 });

  return (
    <section id="philosophy" ref={sectionRef} className="relative bg-[#FFFFFF] py-[100px] md:py-[140px]">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12">
          <motion.div
            className="flex items-end justify-between mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div>
              <span className="font-space text-[12px] tracking-[0.2em] text-[#c8102e] uppercase block mb-2">
                Philosophy
              </span>
              <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] text-[#1A1A1A] font-semibold font-sans-sc">
                创作理念
              </h2>
            </div>
            <Sparkles className="w-5 h-5 text-[#c8102e]" />
          </motion.div>
          <motion.div
            className="h-[1px] bg-[#c8102e]"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left' }}
          />
        </div>

        {/* Paragraphs */}
        <div className="space-y-8">
          {[
            "如果把人体视作一台精巧的机器，五官、皮肤就是传感器，大脑是CPU和GPU的集合体。在AI时代，这一特征更指向了关于人的另一种迷思——人类是否是某种更高维生物的智能。",
            "在《最终肢体幻想》这一系列插画中，我把血液视作能源、大脑作为机器中枢，人的五官、四肢、内脏成为可拆解的零件。",
            "我企图在插画中融入哲学性的思考，重构肢体的意义，让我们思考人的存在本身。",
          ].map((text, i) => (
            <motion.p key={i} className="text-[#555555] text-[15px] leading-[1.9] font-sans-sc"
              initial={{ opacity: 0, y: 25 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}>
              {text}
            </motion.p>
          ))}
        </div>

        {/* Footnote */}
        <motion.div className="mt-14 pt-6 border-t border-[rgba(26,26,26,0.06)]"
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 1 }}>
          <p className="text-[#999999] text-[12px] font-sans-sc italic">
            <span className="text-[#c8102e] mr-2">*</span>当然，这也为插画赋予了一定的恐怖氛围
          </p>
        </motion.div>

        {/* Video — same size as landing hero (55% of max-w-6xl) */}
        <motion.div
          className="mt-16 w-full max-w-6xl mx-auto flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-full md:w-[55%]">
            <video
              src="/images/philosophy_shapes.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto block"
            />
          </div>
        </motion.div>

        {/* System labels */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { label: 'SENSORY', name: '感官系统', desc: '传感器阵列' },
            { label: 'BRAIN', name: '大脑中枢', desc: 'CPU / GPU' },
            { label: 'BLOOD', name: '血液循环', desc: '能源输送' },
            { label: 'LIMB', name: '四肢躯干', desc: '机械结构' },
          ].map((item, i) => (
            <motion.div key={i} className="border border-[rgba(26,26,26,0.06)] p-4 hover:border-[rgba(200,16,46,0.3)] transition-colors duration-300 bg-white"
              initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}>
              <span className="font-space text-[10px] tracking-widest text-[#c8102e] block mb-1">{item.label}</span>
              <span className="text-[#1A1A1A] text-[13px] font-sans-sc block mb-1">{item.name}</span>
              <span className="text-[#888888] text-[11px] font-sans-sc">{item.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
