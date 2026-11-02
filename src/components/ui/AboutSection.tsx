import { Shield, Zap, Compass, Cpu, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export function AboutSection() {
  const axioms = [
    {
      num: '01',
      title: 'Deterministic Over Speculative',
      desc: 'Treating foundation models as probabilistic calculation units wrapped inside strictly-typed state machines with deterministic validation guards.',
    },
    {
      num: '02',
      title: 'Evidence-Grounded Retrieval',
      desc: 'Enforcing token-level source attribution and multi-pass citation verification to eliminate hallucinations before responses leave memory.',
    },
    {
      num: '03',
      title: 'Asynchronous Multi-Agent Swarms',
      desc: 'Orchestrating specialized research, analysis, and validation agents with semantic routing, retry semantics, and circuit breakers.',
    },
    {
      num: '04',
      title: 'Production Observability & SLA',
      desc: 'Tracing every prompt token, tool invocation, and latency span to maintain 99.9% pipeline uptime and sub-second p95 responsiveness.',
    },
  ];

  return (
    <section id="about" className="relative py-32 px-6 sm:px-12 lg:px-16 z-10 pointer-events-auto border-t border-slate-900/60">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <div className="text-xs uppercase tracking-[0.25em] text-cyan-400 font-mono mb-3">
            01. Background &amp; Engineering Philosophy
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight max-w-3xl">
            Engineering deterministic systems for an indeterminate world.
          </h2>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait & Profile (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#060a12] shadow-2xl flex items-center justify-center p-4">
              <img
                src="/assets/portrait_bust_transparent.png"
                alt="Zenith AI Systems Engineer"
                className="w-full h-auto object-contain select-none filter drop-shadow-[0_0_30px_rgba(0,240,255,0.2)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030508] via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="font-heading font-black text-2xl text-white">
                  {PERSONAL_INFO.name}
                </div>
                <div className="text-xs font-mono text-cyan-400 mt-0.5">
                  AI Systems Engineer · Aspiring AI Solutions Architect
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-sans">
              <p>
                Currently a Software Engineering student focused on building high-scale autonomous AI architectures.
                My mission is to design fault-tolerant, cost-efficient infrastructure that bridges research models with production enterprise reliability.
              </p>
              <div className="pt-2 flex flex-col gap-2 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  <span>BS Software Engineering (Distributed Systems Focus)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  <span>35+ Production Autonomous Pipelines Deployed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Target: AI Solutions Architect (Enterprise Grade)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Engineering Axioms (7 cols) */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-slate-800/80">
            {axioms.map((ax) => (
              <div key={ax.num} className="py-8 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4 sm:gap-8 items-start">
                <span className="font-mono text-xs text-cyan-400 font-semibold tracking-wider pt-1">
                  {ax.num}
                </span>
                <div>
                  <h3 className="font-heading font-bold text-xl text-white mb-2 tracking-tight">
                    {ax.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {ax.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
