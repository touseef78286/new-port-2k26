import { useState } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';

interface NavbarProps {
  onOpenResume: () => void;
  activeSection: string;
  sectionProgress: number; // 0.0 to 1.0 within the currently active section
  onNavigate?: (href: string) => void;
}

export function Navbar({ onOpenResume, activeSection, sectionProgress, onNavigate }: NavbarProps) {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clickedId, setClickedId] = useState<string | null>(null);

  const toggleSound = () => {
    const active = audioSynth.toggleMute();
    setIsAudioActive(active);
    if (active) {
      audioSynth.playMorphChime(1.2);
    }
  };

  const navLinks = [
    { label: 'Overview', href: '#story', id: 'story' },
    { label: 'Engineering', href: '#about', id: 'about' },
    { label: 'Case Studies', href: '#projects', id: 'projects' },
    { label: 'Architecture', href: '#architecture', id: 'architecture' },
    { label: 'Toolchain', href: '#skills', id: 'skills' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();

    // Trigger haptic-like visual spring feedback
    setClickedId(id);
    audioSynth.playMorphChime(1.35);

    setTimeout(() => {
      setClickedId((current) => (current === id ? null : current));
    }, 450);

    if (onNavigate) {
      onNavigate(href);
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // SVG Progress Ring Constants
  const radius = 6.5;
  const circumference = 2 * Math.PI * radius; // ~40.84

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 py-5 pointer-events-auto border-b border-slate-900/60 bg-[#030508]/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark with Spring Tactile Physics */}
        <a
          href="#story"
          onClick={(e) => handleLinkClick(e, '#story', 'brand')}
          className="font-heading font-black text-xl tracking-tight text-white hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 spring-tactile"
        >
          ZENITH
        </a>

        {/* Zone 2: Clean single-line text links with subtle progress ring and spring-based haptics */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-widest font-mono">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            const isClicked = clickedId === link.id;
            const currentProgress = isActive ? Math.min(1.0, Math.max(0.02, sectionProgress)) : 0;
            const strokeDashoffset = circumference - currentProgress * circumference;

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href, link.id)}
                className={`group relative flex items-center gap-2.5 whitespace-nowrap py-1 spring-tactile select-none cursor-pointer ${
                  isActive ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                } ${isClicked ? 'scale-95 text-cyan-300' : ''}`}
              >
                {/* Micro SVG Progress Ring with Spring Haptic Ripple */}
                <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                  {/* Subtle Expanding Haptic Ripple Pulse on Click */}
                  {isClicked && (
                    <span className="absolute inset-0 rounded-full border border-cyan-400 bg-cyan-400/20 animate-haptic-ring pointer-events-none" />
                  )}

                  <svg className="w-full h-full -rotate-90" viewBox="0 0 18 18">
                    {/* Background track circle */}
                    <circle
                      cx="9"
                      cy="9"
                      r={radius}
                      className={isActive ? 'stroke-slate-800' : 'stroke-transparent'}
                      strokeWidth="1.5"
                      fill="none"
                    />
                    {/* Active progress stroke */}
                    {isActive && (
                      <circle
                        cx="9"
                        cy="9"
                        r={radius}
                        className="stroke-cyan-400 transition-all duration-100 ease-out"
                        strokeWidth="1.75"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                      />
                    )}
                  </svg>

                  {/* Micro center status dot */}
                  <span
                    className={`absolute w-1 h-1 rounded-full transition-transform duration-200 ${
                      isClicked ? 'scale-150 bg-cyan-400' : isActive ? 'bg-cyan-300 shadow-[0_0_6px_rgba(0,240,255,0.8)]' : 'bg-transparent group-hover:bg-slate-600'
                    }`}
                  />
                </div>

                <span
                  className={`transition-colors duration-150 ${
                    isActive ? 'text-cyan-200' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                >
                  {link.label}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Sound + Resume) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleSound}
            aria-label="Toggle ambient audio"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 bg-slate-900/60 transition-colors whitespace-nowrap spring-tactile"
          >
            {isAudioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[11px]">AUDIO ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[11px]">AUDIO OFF</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-slate-950 bg-white hover:bg-slate-200 transition-colors whitespace-nowrap shadow-sm spring-tactile"
          >
            <span>Curriculum Vitae</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 spring-tactile"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 p-5 rounded-2xl bg-[#060a12] border border-slate-800 shadow-2xl flex flex-col gap-3">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  handleLinkClick(e, link.href, link.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between text-sm font-medium py-1.5 spring-tactile ${
                  isActive ? 'text-cyan-300' : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="text-[10px] font-mono text-cyan-400">
                    {Math.round(sectionProgress * 100)}%
                  </span>
                )}
              </a>
            );
          })}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenResume();
            }}
            className="w-full mt-2 py-2.5 rounded-xl bg-white text-slate-950 font-bold text-xs uppercase tracking-wider text-center spring-tactile"
          >
            View Curriculum Vitae
          </button>
        </div>
      )}
    </header>
  );
}
