import { useState, useEffect, useCallback, useRef } from 'react';
import Lenis from 'lenis';
import { ParticleCanvas } from './components/3d/ParticleCanvas';
import { Navbar } from './components/ui/Navbar';
import { HeroEditorial } from './components/ui/HeroEditorial';
import { AboutSection } from './components/ui/AboutSection';
import { ProjectsSection } from './components/ui/ProjectsSection';
import { ArchitectureBlueprint } from './components/ui/ArchitectureBlueprint';
import { SkillsSection } from './components/ui/SkillsSection';
import { ContactSection } from './components/ui/ContactSection';
import { ResumeModal } from './components/ui/ResumeModal';
import { PARTICLE_THEMES } from './data/portfolioData';

export default function App() {
  const [morphProgress, setMorphProgress] = useState(0.0);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('story');
  const [sectionProgress, setSectionProgress] = useState(0.0);

  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.8,
    });
    lenisRef.current = lenis;

    // Synchronize Lenis scroll stream with 3D particle morphing
    lenis.on('scroll', ({ progress }: { progress: number }) => {
      let computedProgress = 0.0;
      if (progress <= 0.08) {
        computedProgress = (progress / 0.08) * 0.2;
      } else if (progress <= 0.28) {
        computedProgress = 0.2 + ((progress - 0.08) / 0.20) * 0.8;
      } else if (progress <= 0.52) {
        computedProgress = 1.0 + ((progress - 0.28) / 0.24) * 1.0;
      } else if (progress <= 0.78) {
        computedProgress = 2.0 + ((progress - 0.52) / 0.26) * 1.0;
      } else {
        computedProgress = 3.0 + ((progress - 0.78) / 0.22) * 1.0;
      }

      computedProgress = Math.min(4.0, Math.max(0.0, computedProgress));
      setMorphProgress(computedProgress);

      // Active Section Detection & Intra-Section Progress Tracking
      const sections = ['story', 'about', 'projects', 'architecture', 'skills', 'contact'];
      let foundSection = 'story';
      let intraProgress = 0.0;

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.15) {
            foundSection = sec;
            const scrollableRange = Math.max(1, rect.height - window.innerHeight * 0.4);
            const distanceScrolled = -rect.top;
            intraProgress = Math.min(1.0, Math.max(0.0, distanceScrolled / scrollableRange));
            break;
          }
        }
      }

      setActiveSection(foundSection);
      setSectionProgress(intraProgress);
    });

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleNavigate = useCallback((href: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(href, { offset: href === '#story' ? 0 : -40, duration: 1.4 });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleExploreClick = () => {
    handleNavigate('#projects');
  };

  return (
    <div className="relative min-h-screen bg-[#030508] text-slate-100 selection:bg-cyan-500/25 selection:text-cyan-200">
      {/* 1. Background 3D WebGL Canvas with GLSL Shaders & Fluid Particle Dynamics */}
      <ParticleCanvas
        targetMorphProgress={morphProgress}
        theme={PARTICLE_THEMES[0]}
        density="high"
        dispersion={1.4}
        turbulence={1.0}
      />

      {/* 2. Top Header Navigation with Subtle Active Progress Ring */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        activeSection={activeSection}
        sectionProgress={sectionProgress}
        onNavigate={handleNavigate}
      />

      {/* 3. Main Editorial Sections */}
      <main className="relative z-10">
        {/* Stage 0: Agency Editorial Hero with Native Sharpness & 3D Magnetic Particles */}
        <HeroEditorial
          morphProgress={morphProgress}
          onExploreClick={handleExploreClick}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Stage 1: The Architect & Engineering Foundations */}
        <AboutSection />

        {/* Stage 2: Featured Production Case Studies */}
        <ProjectsSection />

        {/* Stage 3: Systems Architecture Blueprint */}
        <ArchitectureBlueprint />

        {/* Stage 4: Engineering Toolchain */}
        <SkillsSection />

        {/* Stage 5: Contact & Collaboration */}
        <ContactSection
          onOpenResume={() => setIsResumeOpen(true)}
        />
      </main>

      {/* 4. Executive Curriculum Vitae Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
