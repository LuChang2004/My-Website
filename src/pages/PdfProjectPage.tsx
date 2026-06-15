import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router';
import PdfScrollViewer from '../components/PdfScrollViewer';
import ProjectBackButton from '../components/ProjectBackButton';
import { getPdfProject } from '../data/pdfProjects';

export default function PdfProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? getPdfProject(projectId) : undefined;

  useEffect(() => {
    if (project) {
      document.title = `${project.title} — Works`;
    }
  }, [project]);

  if (!project) {
    return <Navigate to="/works" replace />;
  }

  const pdfSrc = `${import.meta.env.BASE_URL}projects/pdfs/${project.file}`;

  return (
    <div className="min-h-screen bg-white">
      <ProjectBackButton />
      <main className="mx-auto w-full max-w-[1080px] px-4 pb-16 pt-20">
        <header className="mb-10">
          <p className="m-0 font-['Roboto',sans-serif] text-sm text-[#969696]">{project.meta}</p>
          <h1 className="m-0 mt-2 font-['Noto_Sans_SC',sans-serif] text-[32px] font-bold leading-tight text-black">
            {project.title}
          </h1>
          <p className="m-0 mt-3 max-w-[720px] font-['Noto_Sans_SC',sans-serif] text-base leading-7 text-[#767676]">
            {project.description}
          </p>
        </header>
        <PdfScrollViewer src={pdfSrc} />
      </main>
    </div>
  );
}
