import { useEffect } from 'react';
import { Link } from 'react-router';

const gameSrc = `${import.meta.env.BASE_URL}games/axiom-breach/index.html`;

export default function AxiomBreachPage() {
  useEffect(() => {
    document.title = 'AXIOM BREACH — luchang.fun';
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black">
      <Link
        to="/"
        className="fixed top-4 left-4 z-[100] font-space text-[10px] tracking-widest text-[#888888] hover:text-[#c8102e] transition-colors bg-black/80 border border-[rgba(255,255,255,0.15)] px-3 py-1.5"
      >
        ← 返回
      </Link>
      <iframe
        title="AXIOM BREACH"
        src={gameSrc}
        className="w-full h-full border-0"
        allow="autoplay"
      />
    </div>
  );
}
