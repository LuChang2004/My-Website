import { useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';

export default function HubPage() {
  useEffect(() => {
    document.title = 'luchang.fun — 陆畅';
  }, []);

  return (
    <div className="hub-site min-h-[100dvh] bg-[#FFFFFF] text-[#1A1A1A]">
      <header className="max-w-3xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-space text-[12px] tracking-[0.25em] text-[#c8102e] uppercase block mb-3">
            Portfolio Hub
          </span>
          <h1 className="text-[clamp(2rem,5vw,3rem)] font-semibold font-sans-sc tracking-tight mb-3">
            luchang.fun
          </h1>
          <p className="text-[#666666] text-[15px] font-sans-sc leading-relaxed max-w-md">
            陆畅的作品与实验集合入口。选择下方项目进入详情。
          </p>
        </motion.div>
        <motion.div
          className="h-[1px] bg-[#c8102e] mt-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
        />
      </header>

      <main className="max-w-3xl mx-auto px-6 md:px-12 pb-24">
        <ul className="flex flex-col gap-5">
          {projects.map((project, i) => (
            <motion.li
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
            >
              {project.comingSoon || !project.href ? (
                <ProjectCardPlaceholder project={project} />
              ) : (
                <Link to={project.href} className="block group">
                  <ProjectCard project={project} interactive />
                </Link>
              )}
            </motion.li>
          ))}
        </ul>
      </main>

      <footer className="max-w-3xl mx-auto px-6 md:px-12 pb-12 text-center">
        <p className="text-[#BBBBBB] text-[11px] font-space tracking-wider">
          © {new Date().getFullYear()} Lu Chang
        </p>
      </footer>
    </div>
  );
}

function ProjectCard({
  project,
  interactive = false,
}: {
  project: (typeof projects)[0];
  interactive?: boolean;
}) {
  return (
    <article
      className={`border border-[rgba(26,26,26,0.08)] bg-white p-6 md:p-8 transition-colors duration-300 ${
        interactive ? 'group-hover:border-[rgba(200,16,46,0.35)]' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="font-space text-[11px] tracking-[0.2em] text-[#c8102e] uppercase block mb-2">
            {project.titleEn}
          </span>
          <h2 className="text-[clamp(1.25rem,3vw,1.75rem)] font-semibold font-sans-sc mb-2 group-hover:text-[#c8102e] transition-colors">
            {project.title}
          </h2>
          <p className="text-[#555555] text-[14px] leading-relaxed font-sans-sc">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-space tracking-wider text-[#888888] border border-[rgba(26,26,26,0.1)] px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {interactive && (
          <span className="flex-shrink-0 w-10 h-10 rounded-full border border-[rgba(26,26,26,0.12)] flex items-center justify-center text-[#1A1A1A] group-hover:border-[#c8102e] group-hover:text-[#c8102e] transition-colors">
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
          </span>
        )}
      </div>
    </article>
  );
}

function ProjectCardPlaceholder({ project }: { project: (typeof projects)[0] }) {
  return (
    <article className="border border-dashed border-[rgba(26,26,26,0.12)] bg-[rgba(26,26,26,0.02)] p-6 md:p-8 opacity-70">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="font-space text-[11px] tracking-[0.2em] text-[#BBBBBB] uppercase block mb-2">
            {project.titleEn}
          </span>
          <h2 className="text-[clamp(1.1rem,2.5vw,1.5rem)] font-semibold font-sans-sc text-[#888888] mb-2">
            {project.title}
          </h2>
          <p className="text-[#999999] text-[13px] font-sans-sc">{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-space tracking-wider text-[#BBBBBB] border border-[rgba(26,26,26,0.08)] px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <span className="text-[10px] font-space text-[#BBBBBB] tracking-widest uppercase flex-shrink-0">
          Soon
        </span>
      </div>
    </article>
  );
}
