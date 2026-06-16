import { useEffect } from 'react';
import ProjectBackButton from '../components/ProjectBackButton';
import DemoPreviewFrame from '../components/DemoPreviewFrame';

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
    <DemoPreviewFrame
      title="Taylor Swift — Career in Data"
      src={projectSrc}
      backgroundClassName="bg-[#f5f4f8]"
    >
      <ProjectBackButton />
    </DemoPreviewFrame>
  );
}
