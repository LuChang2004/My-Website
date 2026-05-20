import { motion } from 'framer-motion';

export default function HeroVisual() {
  // Fixed spacing
  const gapTop = 0.82;
  const gapBot = 0.91;

  const containerMaxW = 480;
  const scale = containerMaxW / 1972;

  const topH = Math.round(1047 * scale);
  const maskH = Math.round(1257 * scale);

  const maskOffset = topH * gapTop;
  const botOffset = maskOffset + maskH * gapBot;
  const totalH = botOffset + Math.round(1007 * scale);

  return (
    <div
      className="relative mx-auto"
      style={{ width: containerMaxW, height: totalH }}
    >
      {/* LAYER 3: Brain Bottom — back */}
      <div
        className="absolute z-[10]"
        style={{
          left: (containerMaxW - Math.round(1878 * scale)) / 2,
          top: botOffset,
          width: Math.round(1878 * scale),
          height: Math.round(1007 * scale),
        }}
      >
        <img
          src="/images/brain_bottom_new.png"
          alt="大脑下半部分"
          className="block w-full h-full"
          style={{ objectFit: 'contain' }}
          draggable={false}
        />
      </div>

      {/* LAYER 2: Mask — middle, floating */}
      <motion.div
        className="absolute z-[20]"
        style={{
          left: (containerMaxW - Math.round(1803 * scale)) / 2,
          top: maskOffset,
          width: Math.round(1803 * scale),
          height: maskH,
        }}
        animate={{ y: [0, -16, 0, 12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img
          src="/images/mask_new.png"
          alt="面具"
          className="block w-full h-full"
          style={{ objectFit: 'contain' }}
          draggable={false}
        />
      </motion.div>

      {/* LAYER 1: Brain Top — front */}
      <div
        className="absolute z-[40]"
        style={{
          left: (containerMaxW - Math.round(1972 * scale)) / 2,
          top: 0,
          width: Math.round(1972 * scale),
          height: topH,
        }}
      >
        <img
          src="/images/brain_top_new.png"
          alt="大脑上半部分"
          className="block w-full h-full"
          style={{ objectFit: 'contain' }}
          draggable={false}
        />
      </div>
    </div>
  );
}
