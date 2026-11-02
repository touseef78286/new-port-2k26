import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Cpu, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface HeroEditorialProps {
  morphProgress: number;
  onExploreClick: () => void;
  onOpenResume: () => void;
}

export function HeroEditorial({
  morphProgress,
  onExploreClick,
  onOpenResume,
}: HeroEditorialProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth scroll-driven dissolution factor (1.0 at hero -> 0.0 when scrolling down to statement 1)
  const dissolveFactor = Math.min(1.0, Math.max(0.0, morphProgress / 0.55));
  const photoOpacity = Math.max(0, 1.0 - dissolveFactor * 1.5);
  const photoScale = 1.0 + dissolveFactor * 0.08;

  return (
    <section
      id="story"
      className="relative min-h-[94vh] flex flex-col justify-between px-6 sm:px-12 lg:px-16 pt-28 pb-12 z-10"
    >
      {/* 2-Column Split: Editorial Copy Left (7 cols) + Unobstructed Transparent Portrait Right (5 cols) */}
      <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Left Column: Typography, Mission, Action Buttons & Metrics */}
        <div className="lg:col-span-7 flex flex-col justify-center z-20 pointer-events-auto order-2 lg:order-1">
          {/* Status Kicker */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/25 w-fit mb-5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f5ff]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-cyan-300">
              AI Systems Engineer · Solutions Architect
            </span>
          </div>

          {/* Hero Name Display */}
          <h1 className="font-heading font-black text-6xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-none mb-6">
            {PERSONAL_INFO.name}
          </h1>

          {/* Subtitle / Core Engineering Thesis */}
          <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-sans mb-8">
            Architecting deterministic, evidence-grounded AI systems and high-throughput automation platforms that solve real enterprise problems.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <button
              onClick={onExploreClick}
              className="px-7 py-3.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(0,240,255,0.35)] hover:shadow-[0_0_35px_rgba(0,240,255,0.55)] flex items-center gap-2.5 active:scale-95"
            >
              <Cpu className="w-4 h-4 text-slate-950" />
              <span>Explore Selected Systems</span>
            </button>

            <button
              onClick={onOpenResume}
              className="px-6 py-3.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-medium tracking-wide transition-all flex items-center gap-2 active:scale-95 hover:border-slate-500"
            >
              <span>Curriculum Vitae</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Quantitative Proof Metrics Strip */}
          <div className="pt-8 border-t border-slate-800/80 flex items-center gap-8 sm:gap-12">
            <div>
              <div className="font-heading font-black text-2xl sm:text-3xl text-white">
                99.9%
              </div>
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                Pipeline Uptime
              </div>
            </div>

            <div className="h-8 w-px bg-slate-800" />

            <div>
              <div className="font-heading font-black text-2xl sm:text-3xl text-cyan-300">
                35+
              </div>
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                Agent Swarms
              </div>
            </div>

            <div className="h-8 w-px bg-slate-800" />

            <div>
              <div className="font-heading font-black text-2xl sm:text-3xl text-white">
                &lt;14ms
              </div>
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                Mean Latency
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 100% Transparent Cutout Portrait - Never Overlapped by Text */}
        <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end z-10 pointer-events-none order-1 lg:order-2">
          <div
            className="relative w-full max-w-[360px] sm:max-w-[440px] lg:max-w-[500px] flex items-center justify-center transition-transform duration-200 ease-out"
            style={{
              opacity: photoOpacity,
              transform: `perspective(1000px) rotateY(${mouse.x * 4}deg) rotateX(${-mouse.y * 3}deg) scale(${photoScale})`,
            }}
          >
            {/* Ambient Cyan Aura behind portrait (no hard box) */}
            <div className="absolute w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] bg-cyan-500/15 rounded-full blur-[80px] pointer-events-none" />

            {/* Seamless Transparent Portrait with bottom soft gradient falloff */}
            <img
              src="/assets/portrait_bust_transparent.png"
              alt="Zenith · AI Systems Engineer"
              className="w-full h-auto object-contain select-none filter drop-shadow-[0_0_35px_rgba(0,240,255,0.22)]"
              style={{
                maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
              }}
            />
          </div>
        </div>

      </div>

      {/* Bottom Scroll Cue */}
      <div className="max-w-7xl mx-auto w-full pt-6 flex items-center justify-between text-xs text-slate-500 font-mono tracking-wider pointer-events-auto">
        <a
          href="#about"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowDown className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
          <span>Scroll to explore narrative &amp; systems</span>
        </a>
        <div className="hidden sm:flex items-center gap-2 text-slate-600">
          <Sparkles className="w-3.5 h-3.5 text-cyan-500/60" />
          <span>Interactive WebGL Particle Synthesis</span>
        </div>
      </div>
    </section>
  );
}
