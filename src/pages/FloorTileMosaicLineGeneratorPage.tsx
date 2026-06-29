import { useEffect } from 'react';
import ProjectBackButton from '../components/ProjectBackButton';
import DemoPreviewFrame from '../components/DemoPreviewFrame';

const projectSrc = `${import.meta.env.BASE_URL}projects/floor-tile-mosaic-line-generator/index.html`;

export default function FloorTileMosaicLineGeneratorPage() {
  useEffect(() => {
    document.title = 'Floor Tile Mosaic Line Generator — Works';
  }, []);

  return (
    <DemoPreviewFrame
      title="Floor Tile Mosaic Line Generator"
      src={projectSrc}
      backgroundClassName="bg-white"
    >
      <ProjectBackButton />
    </DemoPreviewFrame>
  );
}
