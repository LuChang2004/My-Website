import { useEffect } from 'react';
import ProjectBackButton from '../components/ProjectBackButton';

const projectSrc = `${import.meta.env.BASE_URL}projects/chord-diary/index.html`;

export default function ChordDiaryPage() {
  useEffect(() => {
    document.title = '和弦日记 — Chord Diary';
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#e8e6e1]">
      <ProjectBackButton />
      <iframe
        title="和弦日记 — Chord Diary"
        src={projectSrc}
        className="w-full h-full border-0"
        allow="autoplay"
      />
    </div>
  );
}
