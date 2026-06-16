import { Monitor, Smartphone } from 'lucide-react';
import { useState, type ReactNode } from 'react';

type PreviewMode = 'desktop' | 'mobile';

type DemoPreviewFrameProps = {
  title: string;
  src: string;
  backgroundClassName: string;
  allow?: string;
  children?: ReactNode;
};

export default function DemoPreviewFrame({
  title,
  src,
  backgroundClassName,
  allow = 'autoplay',
  children,
}: DemoPreviewFrameProps) {
  const [mode, setMode] = useState<PreviewMode>('desktop');
  const isMobilePreview = mode === 'mobile';

  return (
    <div className={`fixed inset-0 ${backgroundClassName}`}>
      {children}

      <div className="fixed right-4 top-4 z-[100] flex h-11 overflow-hidden rounded-full border border-black/10 bg-white/90 shadow-sm backdrop-blur">
        <button
          type="button"
          onClick={() => setMode('desktop')}
          aria-label="网页端预览"
          aria-pressed={!isMobilePreview}
          className={`flex h-11 w-11 items-center justify-center transition-colors ${
            !isMobilePreview ? 'bg-[#1A1A1A] text-white' : 'text-[#767676] hover:text-[#1A1A1A]'
          }`}
        >
          <Monitor className="h-[18px] w-[18px]" strokeWidth={1.6} />
        </button>
        <button
          type="button"
          onClick={() => setMode('mobile')}
          aria-label="移动端预览"
          aria-pressed={isMobilePreview}
          className={`flex h-11 w-11 items-center justify-center transition-colors ${
            isMobilePreview ? 'bg-[#1A1A1A] text-white' : 'text-[#767676] hover:text-[#1A1A1A]'
          }`}
        >
          <Smartphone className="h-[18px] w-[18px]" strokeWidth={1.6} />
        </button>
      </div>

      <div
        className={`absolute inset-0 flex items-center justify-center ${
          isMobilePreview ? 'px-4 py-[72px]' : ''
        }`}
      >
        <div
          className={
            isMobilePreview
              ? 'h-full max-h-[844px] w-[390px] max-w-full overflow-hidden rounded-[32px] border border-black/15 bg-white shadow-2xl'
              : 'h-full w-full'
          }
        >
          <iframe
            title={title}
            src={src}
            className="h-full w-full border-0"
            allow={allow}
          />
        </div>
      </div>
    </div>
  );
}
