import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';


export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const titleChars = "最終肢體幻想".split('');
  const subtitleChars = "FINAL LIMB FANTASY".split('');

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[#FFFFFF]"
    >
      {/* Two-column layout */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

          {/* LEFT: Video - no border, larger */}
          <motion.div
            className="w-full md:w-[55%] flex items-center justify-center"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full">
              <video
                src="/images/dance.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto block"
              />
            </div>
          </motion.div>

          {/* RIGHT: Title & Text */}
          <div className="w-full md:w-[45%] text-center md:text-left">
            {/* H1 */}
            <div className="overflow-hidden mb-3">
              <h1 className="text-[#1A1A1A] flex flex-wrap justify-center md:justify-start font-sans-sc">
                {titleChars.map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block text-[clamp(2.2rem,5.5vw,4rem)] font-bold leading-none tracking-tight"
                    initial={{ y: '100%', opacity: 0, color: '#c8102e' }}
                    animate={isLoaded ? { y: 0, opacity: 1, color: '#1A1A1A' } : {}}
                    transition={{
                      duration: 0.8,
                      delay: 0.5 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>
            </div>

            {/* Subtitle */}
            <div className="overflow-hidden mb-6">
              <div className="font-space flex flex-wrap justify-center md:justify-start tracking-[0.3em]">
                {subtitleChars.map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block text-[clamp(0.55rem,1.3vw,0.8rem)] text-[#888888] font-medium"
                    initial={{ y: '100%', opacity: 0 }}
                    animate={isLoaded ? { y: 0, opacity: 1 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 1 + i * 0.03,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <p className="text-[#666666] text-[14px] font-sans-sc font-light tracking-wider">
                视觉设计/概念设计/系列插画
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Slogan with glitch emphasis */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <div className="relative inline-block">
          {/* Red accent line */}
          <motion.div
            className="absolute -left-3 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-[#c8102e]"
            animate={{ height: ['0%', '0%', '100%'] }}
            transition={{ duration: 2, delay: 3, ease: 'easeOut' }}
          />
          {/* Main text with subtle pulse */}
          <motion.p
            className="text-[#1A1A1A] text-[clamp(0.7rem,1.5vw,1rem)] font-sans-sc tracking-wider whitespace-nowrap pl-1"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          >
            {'这台机器还在运转，'.split('').map((char, i) => (
              <motion.span
                key={`a-${i}`}
                className="inline-block"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8 + i * 0.04, duration: 0.3 }}
              >
                {char}
              </motion.span>
            ))}
            <motion.span
              className="text-[#c8102e] font-medium"
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
            >
              {'直到血液流干为止'.split('').map((char, i) => (
                <motion.span
                  key={`b-${i}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.2 + i * 0.05, duration: 0.3 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
