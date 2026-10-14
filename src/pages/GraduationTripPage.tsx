import { useEffect } from 'react';
import DemoPreviewFrame from '../components/DemoPreviewFrame';
import ProjectBackButton from '../components/ProjectBackButton';

const projectSrc = `${import.meta.env.BASE_URL}projects/graduation-trip/index.html`;

export default function GraduationTripPage() {
  useEffect(() => {
    document.title = '毕业搭子 - 毕业旅行拼团规划工具';
  }, []);

  return (
    <DemoPreviewFrame
      title="毕业搭子 - 毕业旅行拼团规划工具"
      src={projectSrc}
      backgroundClassName="bg-[#d8d8d4]"
    >
      <ProjectBackButton />
    </DemoPreviewFrame>
  );
}
