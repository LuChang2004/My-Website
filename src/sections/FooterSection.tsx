import { motion } from 'framer-motion';

export default function FooterSection() {
  return (
    <footer id="footer" className="relative bg-[#FFFFFF] py-16 md:py-24">
      <motion.div className="absolute top-0 left-0 right-0 h-[1px] bg-[#c8102e]"
        animate={{ boxShadow: ['0 0 10px rgba(200,16,46,0.3)', '0 0 20px rgba(200,16,46,0.5)', '0 0 10px rgba(200,16,46,0.3)'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.p className="text-[clamp(1.4rem,3vw,2.2rem)] text-[#1A1A1A] mb-6 font-semibold font-sans-sc"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6 }}>
          最终肢体幻想
        </motion.p>

        <motion.div className="space-y-2 mb-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ duration: 0.6, delay: 0.2 }}>
          <p className="text-[#555555] text-[13px] font-sans-sc">陆畅 · 视觉传达设计-人工智能双学位</p>
          <p className="text-[#888888] text-[11px] font-space tracking-wider">2026春 设计技术 中期作业 · 2352463</p>
        </motion.div>

        <motion.div className="w-3 h-3 bg-[#c8102e] mx-auto mb-8"
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} />

        <motion.p className="text-[#888888] text-[11px] font-space tracking-wider"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ duration: 0.6, delay: 0.4 }}>
          &copy; 2026 Final Limb Fantasy. All Rights Reserved.
        </motion.p>

        <motion.p className="text-[#BBBBBB] text-[11px] mt-8 italic font-sans-sc"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ duration: 0.6, delay: 0.6 }}>
          "这台机器还在运转 —— 直到血液流干为止"
        </motion.p>
      </div>
    </footer>
  );
}
