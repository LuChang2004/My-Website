import { useEffect } from 'react';
import ProjectBackButton from '../components/ProjectBackButton';

const projectSrc = `${import.meta.env.BASE_URL}projects/taylor-swift/index.html`;

export default function TaylorSwiftPage() {
  useEffect(() => {
    document.title = 'Taylor Swift — Career in Data';
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#f5f4f8]">
      <ProjectBackButton />
      <iframe
        title="Taylor Swift — Career in Data"
        src={projectSrc}
        className="w-full h-full border-0"
        allow="autoplay"
      />
    </div>
  );
}
