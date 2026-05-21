import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

type ProjectBackButtonProps = {
  /** 与血光标作品集一致时设为 true */
  hideSystemCursor?: boolean;
  className?: string;
};

export default function ProjectBackButton({
  hideSystemCursor = false,
  className = '',
}: ProjectBackButtonProps) {
  return (
    <Link
      to="/"
      aria-label="返回项目列表"
      className={`fixed top-4 left-4 z-[100] w-11 h-11 rounded-full border border-[rgba(26,26,26,0.15)] bg-white/90 flex items-center justify-center text-[#1A1A1A] hover:border-[#c8102e] hover:text-[#c8102e] transition-colors duration-200 shadow-sm ${className}`}
      style={hideSystemCursor ? { cursor: 'none' } : undefined}
    >
      <ArrowLeft className="w-[18px] h-[18px]" strokeWidth={1.5} />
    </Link>
  );
}
