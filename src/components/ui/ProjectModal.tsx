import { X, ExternalLink, Github, CheckCircle2, Cpu, Database, Activity, ShieldCheck, ArrowRight } from 'lucide-react';
import { ProjectItem } from '../../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md pointer-events-auto">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#070b14] border border-cyan-500/30 shadow-[0_0_50px_rgba(0,240,255,0.15)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-20 px-6 py-4 bg-[#080d19]/95 border-b border-slate-800 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">
              {project.category}
            </span>
            <span className="text-slate-400 text-xs font-mono hidden sm:inline">
              SYSTEM ARCHITECTURE AUDIT
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Title & Subtitle */}
          <div>
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mb-2">
              {project.title}
            </h3>
            <p className="text-cyan-300 font-medium text-base mb-4">
              {project.subtitle}
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Impact Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-xl bg-[#040810] border border-slate-800">
            {project.impactMetrics.map((metric, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-heading font-extrabold text-xl sm:text-2xl text-cyan-400">
                  {metric.value}
                </span>
                <span className="text-[11px] font-mono text-slate-400 uppercase mt-0.5">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

          {/* Architectural Overview */}
          <div>
            <h4 className="font-heading font-bold text-lg text-white mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Architectural Blueprint &amp; Data Pipeline</span>
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {project.architectureOverview}
            </p>

            {/* Pipeline Flow Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.architectureSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#090e1a] border border-slate-800/80 hover:border-cyan-500/30 transition-all flex flex-col gap-1.5"
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                    <span className="w-5 h-5 rounded-md bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{step.title}</span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges Solved */}
          <div>
            <h4 className="font-heading font-bold text-lg text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Technical Bottlenecks &amp; Solutions</span>
            </h4>
            <div className="space-y-2.5">
              {project.challengesSolved.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#090e1a]/70 border border-slate-800/70 flex items-start gap-3 text-xs sm:text-sm text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div>
            <h4 className="font-heading font-bold text-sm text-slate-400 uppercase tracking-wider mb-2.5 font-mono">
              Technologies &amp; Protocols Deployed
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-mono text-slate-400">
              AUDITED FOR PRODUCTION SCALE
            </div>
            <div className="flex items-center gap-3">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Source Code</span>
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-semibold transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                >
                  <span>Live Platform Preview</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
