import { useState } from 'react';
import { Mail, Github, Linkedin, Copy, Check, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface ContactSectionProps {
  onOpenResume: () => void;
}

export function ContactSection({ onOpenResume }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-32 px-6 sm:px-12 lg:px-16 z-10 pointer-events-auto border-t border-slate-900/60">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <div className="text-xs uppercase tracking-[0.25em] text-cyan-400 font-mono mb-3">
            05. Direct Collaboration
          </div>
          <h2 className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-none mb-6">
            LET&apos;S BUILD SOMETHING MEANINGFUL.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
            Whether architecting enterprise multi-agent pipelines, mitigating RAG hallucination bottlenecks,
            or designing high-throughput automation—reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Contact Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-2xl bg-[#060a12] border border-slate-800">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Direct Communication
              </div>
              <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-[#030508] border border-slate-800">
                <span className="text-xs sm:text-sm font-mono text-white truncate">
                  {PERSONAL_INFO.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0"
                  title="Copy email address"
                  aria-label="Copy email"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex-1 text-center py-3 px-5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Launch Email Client
                </a>
                <button
                  onClick={onOpenResume}
                  className="py-3 px-5 rounded-full bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 text-xs font-medium transition-colors"
                >
                  Curriculum Vitae
                </button>
              </div>
            </div>

            {/* Verified Channels */}
            <div className="p-8 rounded-2xl bg-[#060a12] border border-slate-800 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Verified Repositories
              </div>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#030508] hover:bg-slate-900 border border-slate-800 text-xs text-white transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-4 h-4 text-slate-400" />
                  <span>GitHub Repositories</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#030508] hover:bg-slate-900 border border-slate-800 text-xs text-white transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-4 h-4 text-slate-400" />
                  <span>LinkedIn Professional Profile</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Right: Clean Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#060a12] border border-slate-800">
              <h3 className="font-heading font-black text-2xl text-white mb-2">
                Initiate Project Transmission
              </h3>
              <p className="text-xs text-slate-400 font-mono mb-8">
                Responses typically dispatched within 24 business hours.
              </p>

              {formSubmitted ? (
                <div className="p-8 rounded-xl bg-[#030508] border border-cyan-500/30 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-950 flex items-center justify-center mx-auto text-cyan-400">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-bold text-xl text-white">
                    Transmission Acknowledged
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto font-sans leading-relaxed">
                    Thank you. Your inquiry has been received. Zenith will review the architectural specifications and respond promptly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="text-xs font-mono text-cyan-400 hover:underline pt-2 block mx-auto"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-2">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Zenith"
                        className="w-full px-4 py-3 rounded-xl bg-[#030508] border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-2">
                        Your Work Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="touseefpanjtan52@gmail.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#030508] border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-2">
                      System &amp; Architectural Requirements
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your technical challenges, high-concurrency needs, or collaboration vision..."
                      className="w-full px-4 py-3 rounded-xl bg-[#030508] border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Transmit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Minimal Editorial Footer */}
        <footer className="mt-32 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            <span>© 2026 ZENITH. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <span>UPTIME 99.9%</span>
            <span>·</span>
            <span>THREE.JS &amp; TAILWIND</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
