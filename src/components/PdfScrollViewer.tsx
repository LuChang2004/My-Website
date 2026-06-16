type PdfScrollViewerProps = {
  src: string;
  title?: string;
  className?: string;
};

export default function PdfScrollViewer({
  src,
  title = 'PDF 作品',
  className = '',
}: PdfScrollViewerProps) {
  return (
    <section className={`pdf-viewer ${className}`} aria-label={title}>
      <object
        data={`${src}#view=FitH`}
        type="application/pdf"
        className="h-full min-h-[72vh] w-full bg-white"
      >
        <div className="flex min-h-[56vh] flex-col items-center justify-center gap-4 bg-[#f7f7f7] px-6 text-center">
          <p className="m-0 font-['Noto_Sans_SC',sans-serif] text-sm leading-6 text-[#767676]">
            当前浏览器没有直接显示 PDF，请打开原文件查看。
          </p>
          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#1A1A1A] px-5 font-['Noto_Sans_SC',sans-serif] text-sm text-white transition-colors hover:bg-[#c8102e]"
          >
            打开 PDF
          </a>
        </div>
      </object>
    </section>
  );
}
