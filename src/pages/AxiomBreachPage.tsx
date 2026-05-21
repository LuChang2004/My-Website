import { useEffect, useState } from 'react';
import { HelpCircle } from 'lucide-react';
import ProjectBackButton from '../components/ProjectBackButton';
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
    <div className="fixed inset-0 bg-black">
      <ProjectBackButton />

      <button
        type="button"
        onClick={() => setShowTutorial(true)}
        aria-label="查看操作说明"
        className="fixed top-4 right-4 z-[100] w-10 h-10 rounded-full border border-[rgba(255,255,255,0.2)] bg-black/80 flex items-center justify-center text-[#888888] hover:text-[#0ff] hover:border-[rgba(0,255,255,0.4)] transition-colors"
      >
        <HelpCircle className="w-[18px] h-[18px]" strokeWidth={1.5} />
      </button>

      <AxiomBreachTutorial open={showTutorial} onClose={() => setShowTutorial(false)} />

      <iframe
        title="AXIOM BREACH"
        src={gameSrc}
        className="w-full h-full border-0"
        allow="autoplay"
      />
    </div>
  );
}
