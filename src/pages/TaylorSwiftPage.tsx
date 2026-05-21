import { useEffect } from 'react';
import { Link } from 'react-router';

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
      <Link
        to="/"
        className="fixed top-4 left-4 z-[100] font-space text-[10px] tracking-widest text-[#666666] hover:text-[#c8102e] transition-colors bg-white/90 border border-[rgba(26,26,26,0.1)] px-3 py-1.5 shadow-sm"
      >
        ← 返回
      </Link>
      <iframe
        title="Taylor Swift — Career in Data"
        src={projectSrc}
        className="w-full h-full border-0"
        allow="autoplay"
      />
    </div>
  );
}
