import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router';
import PdfScrollViewer from '../components/PdfScrollViewer';
import { getPdfProject } from '../data/pdfProjects';

export default function PdfProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? getPdfProject(projectId) : undefined;

  useEffect(() => {
    if (!project) return;
    document.title = `${project.title} — Works`;
  }, [project]);

  if (!project) {
    return <Navigate to="/works" replace />;
  }

  const pdfSrc = `${import.meta.env.BASE_URL}projects/pdfs/${project.file}`;

  return (
    <div className="min-h-screen w-full bg-white">
      <PdfScrollViewer src={pdfSrc} title={project.title} />
    </div>
  );
}
