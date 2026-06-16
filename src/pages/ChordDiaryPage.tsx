import { useEffect } from 'react';
import ProjectBackButton from '../components/ProjectBackButton';
import DemoPreviewFrame from '../components/DemoPreviewFrame';

const projectSrc = `${import.meta.env.BASE_URL}projects/chord-diary/index.html`;

export default function ChordDiaryPage() {
  useEffect(() => {
    document.title = '和弦日记 — Chord Diary';
  }, []);

  return (
    <DemoPreviewFrame
      title="和弦日记 — Chord Diary"
      src={projectSrc}
      backgroundClassName="bg-[#e8e6e1]"
    >
      <ProjectBackButton />
    </DemoPreviewFrame>
  );
}
