import { useEffect } from 'react';

export default function MeetNotePage() {
  useEffect(() => { document.title = 'MeetNote — 增长质量分析报告'; }, []);
  return <iframe title="MeetNote 合成数据商业分析报告" src={`${import.meta.env.BASE_URL}projects/meetnote/index.html`} style={{ width: '100%', height: '100dvh', border: 0, display: 'block' }} />;
}
