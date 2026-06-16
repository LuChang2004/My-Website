import { useEffect, useState } from 'react';
import { HelpCircle } from 'lucide-react';
import ProjectBackButton from '../components/ProjectBackButton';
import DemoPreviewFrame from '../components/DemoPreviewFrame';
import AxiomBreachTutorial, {
  shouldShowAxiomTutorial,
} from '../components/AxiomBreachTutorial';

const gameSrc = `${import.meta.env.BASE_URL}games/axiom-breach/index.html`;

export default function AxiomBreachPage() {
  const [showTutorial, setShowTutorial] = useState(shouldShowAxiomTutorial);

  useEffect(() => {
    document.title = 'AXIOM BREACH — luchang.fun';
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <DemoPreviewFrame
      title="AXIOM BREACH"
      src={gameSrc}
      backgroundClassName="bg-black"
    >
      <ProjectBackButton />

      <button
        type="button"
        onClick={() => setShowTutorial(true)}
        aria-label="查看操作说明"
        className="fixed right-[116px] top-4 z-[100] flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(255,255,255,0.2)] bg-black/80 text-[#888888] transition-colors hover:border-[rgba(0,255,255,0.4)] hover:text-[#0ff]"
      >
        <HelpCircle className="w-[18px] h-[18px]" strokeWidth={1.5} />
      </button>

      <AxiomBreachTutorial open={showTutorial} onClose={() => setShowTutorial(false)} />
    </DemoPreviewFrame>
  );
}
