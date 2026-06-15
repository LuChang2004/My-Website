import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Gamepad2,
  Crosshair,
  Bomb,
  Sparkles,
  Play,
  Shield,
  Heart,
  Zap,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const STORAGE_KEY = 'axiom-breach-tutorial-dismissed';

type Props = {
  open: boolean;
  onClose: () => void;
};

type StepId =
  | 'welcome'
  | 'start'
  | 'move'
  | 'aim'
  | 'fire'
  | 'bomb'
  | 'pickup-h'
  | 'pickup-w'
  | 'pickup-more'
  | 'boss'
  | 'ready';

type TutorialStep = {
  id: StepId;
  title: string;
  lead: string;
  doNow: string;
  tip?: string;
};

const STEPS: TutorialStep[] = [
  {
    id: 'welcome',
    title: '欢迎来到战场',
    lead: '你将在星空中驾驶战机，躲避弹幕、击落敌机、收集强化。',
    doNow: '接下来会用几步带你完成第一次上手，每步只学一件事。',
  },
  {
    id: 'start',
    title: '先开始一局',
    lead: '进入游戏后，你会先看到标题画面。',
    doNow: '点击画面，或按 Enter / 空格，即可开始战斗。',
    tip: '阵亡后同样用这两个键快速重来。',
  },
  {
    id: 'move',
    title: '第 1 步：移动',
    lead: '战机需要你在枪林弹雨中灵活走位。',
    doNow: '请按住 W A S D（或方向键）中的任意组合，想象自己在移动。',
    tip: '对角移动时速度不会变慢，放心斜向闪避。',
  },
  {
    id: 'aim',
    title: '第 2 步：瞄准',
    lead: '子弹会朝鼠标指针方向发射。',
    doNow: '在游戏里缓慢移动鼠标，让准星指向敌机来的方向。',
  },
  {
    id: 'fire',
    title: '第 3 步：射击',
    lead: '火力是生存的根本。',
    doNow: '按住鼠标左键不松手，持续向敌人开火。',
    tip: '左上角会显示当前武器名与等级（共 5 种武器，各 3 级）。',
  },
  {
    id: 'bomb',
    title: '第 4 步：炸弹清屏',
    lead: '被包围时不要慌——你还有杀手锏。',
    doNow: '记住：鼠标右键，或键盘 B 键，可瞬间清除全屏敌人。',
    tip: '开局 3 枚炸弹；用完可拾取 B 道具补充。适合 Boss 或怪潮。',
  },
  {
    id: 'pickup-h',
    title: '第 5 步：拾取道具',
    lead: '击毁敌机后，彩色光球会飘向你可以拾取的位置。',
    doNow: '飞过光球即可吸收。红色 H 回血，蓝色 S 补护盾。',
    tip: '护盾在不受击时会缓慢恢复。',
  },
  {
    id: 'pickup-w',
    title: '第 6 步：升级武器',
    lead: '金色 W 是最重要的成长之一。',
    doNow: '拾取 W：先升级当前武器；满级后自动切换下一种新武器。',
    tip: '五种武器：Blaster · Spread · Seeker · Plasma · Rail',
  },
  {
    id: 'pickup-more',
    title: '第 7 步：其余道具',
    lead: '还有两种辅助掉落别忘了。',
    doNow: '绿色 V 提升移速；橙色 B 增加一枚炸弹。',
  },
  {
    id: 'boss',
    title: '第 8 步：Boss 波',
    lead: '每坚持 5 波，会出现 Boss 战。',
    doNow: '屏幕会红色闪烁预警。集中火力、保留炸弹，击败它！',
  },
  {
    id: 'ready',
    title: '准备好了',
    lead: '你已经掌握基本操作。',
    doNow: '点击「开始游戏」进入战场；局内前 8 秒底部还有简要提示。',
    tip: '随时点右上角 ? 可重新查看本引导。',
  },
];

function Key({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <kbd
      className={`inline-flex items-center justify-center min-w-[2rem] h-9 px-2 border font-mono text-xs rounded-sm transition-all duration-300 ${
        active
          ? 'border-[#0ff] bg-[#0ff]/20 text-[#0ff] shadow-[0_0_12px_rgba(0,255,255,0.4)] scale-110'
          : 'border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.06)] text-[#666]'
      }`}
    >
      {children}
    </kbd>
  );
}

function StepVisual({ stepId }: { stepId: StepId }) {
  switch (stepId) {
    case 'welcome':
      return (
        <div className="flex flex-col items-center justify-center h-36 gap-2">
          <p className="font-mono text-2xl font-bold text-[#0ff] tracking-widest">AXIOM BREACH</p>
          <p className="text-[#888] text-xs font-mono">SPACE SHOOTER</p>
        </div>
      );
    case 'start':
      return (
        <div className="flex flex-col items-center justify-center h-36 gap-4">
          <div className="flex gap-2">
            <Key active>Enter</Key>
            <span className="text-[#555] self-center text-sm">或</span>
            <Key active>Space</Key>
          </div>
          <p className="text-[#0ff] text-sm animate-pulse font-sans-sc">点击屏幕</p>
        </div>
      );
    case 'move':
      return (
        <div className="flex flex-col items-center justify-center h-36 gap-3">
          <div className="grid grid-cols-3 gap-1.5">
            <div />
            <Key active>↑</Key>
            <div />
            <Key active>←</Key>
            <Key active>●</Key>
            <Key active>→</Key>
            <div />
            <Key active>↓</Key>
            <div />
          </div>
          <p className="text-[10px] text-[#666] font-mono">W A S D 同样有效</p>
        </div>
      );
    case 'aim':
      return (
        <div className="relative flex items-center justify-center h-36 w-full">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#f80]/50 flex items-center justify-center">
            <Crosshair className="w-8 h-8 text-[#f80]" />
          </div>
          <motion.div
            className="absolute w-3 h-3 rounded-full bg-[#f80] shadow-[0_0_10px_#f80]"
            animate={{ x: [40, -30, 50, 0], y: [-20, 25, -15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      );
    case 'fire':
      return (
        <div className="flex flex-col items-center justify-center h-36 gap-3">
          <motion.div
            animate={{ scale: [1, 0.92, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="px-6 py-3 border-2 border-[#0ff] bg-[#0ff]/10 rounded-sm"
          >
            <span className="text-[#0ff] text-sm font-sans-sc">按住左键</span>
          </motion.div>
          <div className="flex gap-1">
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#0ff]"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>
      );
    case 'bomb':
      return (
        <div className="flex flex-col items-center justify-center h-36 gap-4">
          <Bomb className="w-10 h-10 text-[#f96]" />
          <div className="flex gap-3 items-center">
            <span className="text-[#aaa] text-xs">右键</span>
            <span className="text-[#555]">或</span>
            <Key active>B</Key>
          </div>
          <p className="text-[#f96] text-xs font-mono">×3 清屏</p>
        </div>
      );
    case 'pickup-h':
      return (
        <div className="flex items-center justify-center gap-6 h-36">
          <PickupOrb label="H" color="#f66" icon={<Heart className="w-4 h-4" />} name="生命" />
          <PickupOrb label="S" color="#66f" icon={<Shield className="w-4 h-4" />} name="护盾" />
        </div>
      );
    case 'pickup-w':
      return (
        <div className="flex flex-col items-center justify-center h-36 gap-2">
          <PickupOrb label="W" color="#ff6" icon={<Zap className="w-5 h-5" />} name="武器升级" large />
          <p className="text-[10px] text-[#888] font-mono mt-2">Lv.1 → Lv.2 → Lv.3 → 新武器</p>
        </div>
      );
    case 'pickup-more':
      return (
        <div className="flex items-center justify-center gap-6 h-36">
          <PickupOrb label="V" color="#6f6" icon={<Gamepad2 className="w-4 h-4" />} name="加速" />
          <PickupOrb label="B" color="#f96" icon={<Bomb className="w-4 h-4" />} name="炸弹+1" />
        </div>
      );
    case 'boss':
      return (
        <motion.div
          className="flex flex-col items-center justify-center h-36 gap-2"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          <p className="text-[#f44] font-mono font-bold text-lg tracking-widest">⚠ BOSS ⚠</p>
          <p className="text-[#888] text-xs">每 5 波</p>
        </motion.div>
      );
    case 'ready':
      return (
        <div className="flex flex-col items-center justify-center h-36 gap-3">
          <Play className="w-12 h-12 text-[#0ff]" />
          <Sparkles className="w-5 h-5 text-[#ff6] -mt-8 ml-10" />
        </div>
      );
    default:
      return null;
  }
}

function PickupOrb({
  label,
  color,
  icon,
  name,
  large,
}: {
  label: string;
  color: string;
  icon: React.ReactNode;
  name: string;
  large?: boolean;
}) {
  return (
    <motion.div
      className={`flex flex-col items-center gap-2 ${large ? 'scale-110' : ''}`}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center border-2 text-white"
        style={{ borderColor: color, boxShadow: `0 0 16px ${color}55`, color }}
      >
        {icon}
      </div>
      <span className="font-mono font-bold text-sm" style={{ color }}>
        {label}
      </span>
      <span className="text-[10px] text-[#888]">{name}</span>
    </motion.div>
  );
}

export function shouldShowAxiomTutorial(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== '1';
  } catch {
    return true;
  }
}

export function dismissAxiomTutorialPermanently() {
  try {
    localStorage.setItem(STORAGE_KEY, '1');
  } catch {
    /* ignore */
  }
}

export default function AxiomBreachTutorial({ open, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [skipNext, setSkipNext] = useState(false);

  const total = STEPS.length;
  const current = STEPS[step];
  const isFirst = step === 0;
  const isLast = step === total - 1;
  const progress = ((step + 1) / total) * 100;

  useEffect(() => {
    if (open) setStep(0);
  }, [open]);

  if (!open || !current) return null;

  const handleFinish = () => {
    if (skipNext) dismissAxiomTutorialPermanently();
    onClose();
  };

  const handleSkipAll = () => {
    if (skipNext) dismissAxiomTutorialPermanently();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/88 backdrop-blur-sm">
      <div
        className="relative w-full max-w-md border border-[rgba(0,255,255,0.25)] bg-[#020818] text-[#e8e8e8] shadow-[0_0_40px_rgba(0,255,255,0.12)]"
        role="dialog"
        aria-labelledby="tutorial-step-title"
      >
        <div className="h-1 bg-[rgba(255,255,255,0.06)]">
          <motion.div
            className="h-full bg-[#0ff]"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
          <span className="font-mono text-[10px] text-[#0ff] tracking-widest">
            第 {step + 1} 步 / 共 {total} 步
          </span>
          <button
            type="button"
            onClick={handleSkipAll}
            className="text-[11px] text-[#666] hover:text-[#888] font-sans-sc transition-colors"
          >
            跳过引导
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 pt-5 pb-4"
          >
            <div className="rounded border border-[rgba(0,255,255,0.12)] bg-[rgba(0,255,255,0.03)] mb-5">
              <StepVisual stepId={current.id} />
            </div>

            <h2 id="tutorial-step-title" className="font-sans-sc text-lg font-semibold text-white mb-2">
              {current.title}
            </h2>
            <p className="text-[#999] text-[13px] leading-relaxed mb-4">{current.lead}</p>

            <div className="bg-[rgba(0,255,255,0.08)] border-l-2 border-[#0ff] px-4 py-3 mb-3">
              <p className="text-[10px] text-[#0ff] font-mono tracking-wider mb-1">现在请你</p>
              <p className="text-[#e0e0e0] text-[14px] leading-relaxed font-sans-sc">{current.doNow}</p>
            </div>

            {current.tip && (
              <p className="text-[#777] text-[12px] leading-relaxed font-sans-sc">💡 {current.tip}</p>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="px-6 pb-6">
          {isLast && (
            <label className="flex items-center gap-2 mb-4 text-[12px] text-[#888] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={skipNext}
                onChange={(e) => setSkipNext(e.target.checked)}
                className="accent-[#0ff]"
              />
              下次进入不再显示引导
            </label>
          )}

          <div className="flex gap-2">
            {!isFirst && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center justify-center gap-1 px-4 py-3 border border-[rgba(255,255,255,0.15)] text-[#aaa] hover:text-[#fff] hover:border-[rgba(255,255,255,0.3)] transition-colors font-sans-sc text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                上一步
              </button>
            )}
            <button
              type="button"
              onClick={() => (isLast ? handleFinish() : setStep((s) => s + 1))}
              className={`flex-1 flex items-center justify-center gap-1 py-3 font-mono text-sm tracking-widest text-[#020818] bg-[#0ff] hover:bg-[#7ff] transition-colors ${
                isFirst ? 'w-full' : ''
              }`}
            >
              {isLast ? '开始游戏' : '下一步'}
              {!isLast && <ChevronRight className="w-4 h-4 text-[#020818]" />}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSkipAll}
          aria-label="关闭"
          className="absolute top-11 right-3 w-7 h-7 flex items-center justify-center text-[#555] hover:text-[#0ff] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
