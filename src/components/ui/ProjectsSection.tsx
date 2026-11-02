import { useState } from 'react';
import { ArrowUpRight, Cpu, Activity } from 'lucide-react';
import { FEATURED_PROJECTS } from '../../data/portfolioData';
import { ProjectItem } from '../../types';
import { ProjectModal } from './ProjectModal';

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="relative py-32 px-6 sm:px-12 lg:px-16 z-10 pointer-events-auto border-t border-slate-900/60">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <div className="text-xs uppercase tracking-[0.25em] text-cyan-400 font-mono mb-3">
            02. Featured Case Studies
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight max-w-3xl">
            Production systems built for scale, speed, and determinism.
          </h2>
        </div>

        {/* Case Studies List (Agency Style with generous vertical rhythm) */}
        <div className="space-y-12">
          {FEATURED_PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className="group p-8 sm:p-10 rounded-2xl bg-[#060a12]/80 border border-slate-800/80 hover:border-slate-700 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                {/* Left: Project Narrative */}
                <div className="max-w-2xl">
                  {/* Clean unboxed category kicker */}
                  <div className="text-xs font-mono text-cyan-400 mb-2 tracking-wider">
                    0{idx + 1} · {project.category.toUpperCase()}
                  </div>

                  <h3 className="font-heading font-black text-3xl sm:text-4xl text-white mb-2 tracking-tight group-hover:text-cyan-200 transition-colors">
                    {project.title}
                  </h3>
                  <div className="text-sm font-medium text-slate-400 mb-6 font-mono">
                    {project.subtitle}
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans mb-6">
                    {project.description}
                  </p>

                  {/* Clean Unboxed Tags with Typographic Separator */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-8">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tag} className="flex items-center gap-2">
                        <span>{tag}</span>
                        {tIdx < project.tags.length - 1 && <span className="text-slate-600">·</span>}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white border border-slate-700/80 text-xs font-medium tracking-wide transition-all"
                  >
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Inspect Architecture &amp; Metrics</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>

                {/* Right: Quantitative Evidence Block */}
                <div className="lg:w-80 shrink-0 p-6 rounded-xl bg-[#03060a] border border-slate-800/80 flex flex-col justify-between">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 pb-2 border-b border-slate-800">
                    Production Metrics
                  </div>

                  <div className="space-y-4">
                    {project.impactMetrics.map((metric, mIdx) => (
                      <div key={mIdx}>
                        <div className="font-heading font-black text-2xl text-cyan-300">
                          {metric.value}
                        </div>
                        <div className="text-xs font-sans text-slate-400 mt-0.5">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
