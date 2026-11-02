import { useState } from 'react';
import { ARCHITECTURE_BLUEPRINT } from '../../data/portfolioData';
import { ArchitectureNode } from '../../types';

export function ArchitectureBlueprint() {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(ARCHITECTURE_BLUEPRINT[0]);

  return (
    <section id="architecture" className="relative py-32 px-6 sm:px-12 lg:px-16 z-10 pointer-events-auto border-t border-slate-900/60">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <div className="text-xs uppercase tracking-[0.25em] text-cyan-400 font-mono mb-3">
            03. Systems Architecture Specification
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight max-w-3xl">
            Enterprise multi-agent &amp; RAG topological blueprint.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 max-w-2xl font-sans leading-relaxed">
            Production intelligence architectures designed around deterministic state boundaries, verifiable citation provenance, and zero data leakage.
          </p>
        </div>

        {/* 6-Node Architecture Flowchart (Clean Agency Monograph Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {ARCHITECTURE_BLUEPRINT.map((node, idx) => {
            const isSelected = selectedNode.id === node.id;

            return (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`text-left p-8 rounded-2xl border transition-all flex flex-col justify-between h-52 group cursor-pointer ${
                  isSelected
                    ? 'bg-[#080d18] border-cyan-400/80 shadow-[0_0_30px_rgba(0,240,255,0.12)]'
                    : 'bg-[#060a12]/80 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-3">
                    <span className="text-cyan-400 font-semibold tracking-wider">
                      0{idx + 1} · STAGE
                    </span>
                    <span className="text-slate-400 tabular-nums">
                      {node.latency}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white mb-2 tracking-tight group-hover:text-cyan-200 transition-colors">
                    {node.role}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-sans">
                    {node.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>{node.tech.slice(0, 2).join(' · ')}</span>
                  <span className={isSelected ? 'text-cyan-400 font-semibold' : 'text-slate-400 group-hover:text-slate-200'}>
                    Inspect
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Node Detailed Specification */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#060a12] border border-slate-800">
          <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-4 pb-8 border-b border-slate-800">
            <div>
              <div className="text-xs font-mono text-cyan-400 mb-1 tracking-wider uppercase">
                Active Inspection · Latency Profile {selectedNode.latency}
              </div>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
                {selectedNode.title}
              </h3>
              <div className="text-slate-400 text-sm mt-1 font-mono">
                {selectedNode.role}
              </div>
            </div>

            <div className="text-xs font-mono text-slate-400 tracking-wider">
              INVARIANT: ZERO TOKEN DRIFT
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Operational Invariant &amp; Isolation
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {selectedNode.description}
              </p>
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Protocol &amp; Tooling Layer
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-cyan-300">
                {selectedNode.tech.map((t, idx) => (
                  <span key={t}>
                    {t}{idx < selectedNode.tech.length - 1 ? ' · ' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
