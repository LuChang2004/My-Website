import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Quote {
  text: string;
  source: string;
}

const quotes: Quote[] = [
  { text: '眼泪是大脑在下雨，泪腺是排水管道。', source: 'How we shed tears?' },
  { text: '我养了一株会说话的花，代价是我自己的鲜血。', source: '能量池' },
  { text: '使用暴力往往能快速让人闭嘴。', source: '闭嘴' },
];

export default function QuotesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  return (
    <section id="quotes" ref={sectionRef} className="relative bg-[#F5F5F0] py-[100px] md:py-[140px] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="w-full h-full" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #1A1A1A 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="font-space text-[12px] tracking-[0.3em] text-[#c8102e] uppercase">Black Humor</span>
          {/* H2: 简体 */}
          <h2 className="text-[clamp(1.4rem,3vw,2.2rem)] text-[#1A1A1A] font-semibold mt-4 tracking-wide font-sans-sc">
            黑色幽默语录
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {quotes.map((quote, i) => (
            <motion.div key={i} className="relative text-center md:text-left"
              initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}>
              <motion.span className="text-[#c8102e] text-[3.5rem] leading-none block mb-3 select-none font-serif-sc"
                animate={isInView ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 1.2, delay: 0.5 + i * 0.2, repeat: Infinity, repeatDelay: 3 }}>
                "
              </motion.span>
              <p className="text-[#1A1A1A] text-[15px] leading-relaxed italic mb-5 font-sans-sc">
                {quote.text}
              </p>
              <div className="border-t border-[rgba(26,26,26,0.06)] pt-4">
                <span className="text-[#c8102e] text-[12px] font-sans-sc block">{quote.source}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-16 text-center" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 1 }}>
          <div className="inline-block border border-[rgba(200,16,46,0.15)] px-6 py-4 bg-[#FFFFFF]">
            <p className="text-[#888888] text-[11px] font-sans-sc">
              <span className="text-[#c8102e] mr-2">※</span>骂人的话总是离不开生殖器
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
