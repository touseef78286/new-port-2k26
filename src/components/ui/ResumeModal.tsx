import { useState } from 'react';
import { X, Download, Printer, Copy, Check, FileText, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyText = () => {
    const resumeText = `
ZENITH - AI Systems Engineer & Automation Builder
Aspiring AI Solutions Architect
Email: ${PERSONAL_INFO.email} | Location: Remote / Global
GitHub: ${PERSONAL_INFO.github} | LinkedIn: ${PERSONAL_INFO.linkedin}

PROFILE:
Software Engineering student specializing in production multi-agent AI systems, evidence-grounded RAG architectures, and enterprise full-stack platforms.

KEY PROJECTS:
1. Global Problem Automation: Multi-agent information intelligence engine processing 1.2M events/day with Qdrant vector clustering.
2. SignalBridge AI: Incident response & observability platform with hybrid knowledge graphs, reducing MTTR by 72%.
3. Anas Dental Services: Full-stack healthcare practice management portal in Next.js 14 and PostgreSQL.

SKILLS:
- Languages: Python, TypeScript, SQL, Go, C++
- Frameworks & AI: Next.js, React, FastAPI, LangChain, CrewAI, LlamaIndex, Docker, PostgreSQL, Supabase, Pinecone, Redis
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md pointer-events-auto">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#080d17] border border-cyan-500/40 shadow-2xl flex flex-col text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-20 px-6 py-4 bg-[#0a101d]/95 border-b border-slate-800 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <FileText className="w-4 h-4" />
            <span>EXECUTIVE CURRICULUM VITAE // ZENITH</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-medium hover:bg-slate-800 transition-colors"
              title="Copy resume text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 font-semibold text-xs hover:bg-cyan-300 transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
              aria-label="Close resume modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Paper */}
        <div className="p-6 sm:p-10 space-y-6 text-xs sm:text-sm leading-relaxed">
          {/* Header Identity */}
          <div className="border-b border-slate-800 pb-6">
            <h1 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-cyan-400 font-semibold text-base mt-1">
              AI Systems Engineer · Automation Builder · Aspiring AI Solutions Architect
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mt-3">
              <span>Email: {PERSONAL_INFO.email}</span>
              <span>•</span>
              <span>Focus: Enterprise AI, RAG &amp; Swarms</span>
              <span>•</span>
              <span>Availability: Immediate</span>
            </div>
          </div>

          {/* Core Summary */}
          <div>
            <h2 className="font-heading font-bold text-xs uppercase tracking-wider text-cyan-300 mb-2 font-mono">
              Professional Summary
            </h2>
            <p className="text-slate-300">
              High-velocity software engineer and creative technologist specializing in autonomous agent architectures,
              evidence-grounded retrieval-augmented generation (RAG), and high-throughput automation pipelines.
              Track record of constructing reliable, deterministic wrappers around probabilistic foundation models.
            </p>
          </div>

          {/* Education & Trajectory */}
          <div>
            <h2 className="font-heading font-bold text-xs uppercase tracking-wider text-cyan-300 mb-2 font-mono">
              Education &amp; Foundations
            </h2>
            <div className="p-4 rounded-xl bg-[#050912] border border-slate-800/80">
              <div className="flex justify-between items-baseline font-semibold text-white">
                <span>Bachelor of Science in Software Engineering</span>
                <span className="text-xs text-cyan-400 font-mono">In Progress</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Concentration: Distributed Systems, Machine Learning Systems, Database Architecture, Algorithmic Analysis.
              </p>
            </div>
          </div>

          {/* Featured Systems Architecture Experience */}
          <div>
            <h2 className="font-heading font-bold text-xs uppercase tracking-wider text-cyan-300 mb-3 font-mono">
              Key Engineered Platforms
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#050912] border border-slate-800/80">
                <div className="flex justify-between items-baseline font-semibold text-white">
                  <span>Global Problem Automation — Lead AI Engineer</span>
                  <span className="text-xs text-slate-400 font-mono">2024 - Present</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Architected asynchronous ingestion pipeline handling 1.2M daily web events. Deployed 6 autonomous
                  agents coordinating real-time clustering, adversarial fact-checking, and webhook dispatch.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#050912] border border-slate-800/80">
                <div className="flex justify-between items-baseline font-semibold text-white">
                  <span>SignalBridge AI — Systems Architect</span>
                  <span className="text-xs text-slate-400 font-mono">2024</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Built an incident observability triage platform indexing 450 GB/day of traces and logs. Implemented
                  hybrid knowledge graph and dense vector search, reducing mean time to resolution by 72%.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#050912] border border-slate-800/80">
                <div className="flex justify-between items-baseline font-semibold text-white">
                  <span>Anas Dental Services — Full-Stack Lead</span>
                  <span className="text-xs text-slate-400 font-mono">2023 - 2024</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Engineered modern Next.js 14 web application with PostgreSQL row-level locks, edge SSR caching,
                  and automated multi-channel patient notification pipelines.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Tooling */}
          <div>
            <h2 className="font-heading font-bold text-xs uppercase tracking-wider text-cyan-300 mb-2 font-mono">
              Technical Matrix
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div>
                <strong className="text-white">Languages:</strong> Python, TypeScript, SQL, Go, C++
              </div>
              <div>
                <strong className="text-white">AI / Agents:</strong> LangChain, CrewAI, LlamaIndex, Gemini SDK
              </div>
              <div>
                <strong className="text-white">Databases:</strong> PostgreSQL, Supabase, Qdrant, Pinecone, Redis
              </div>
              <div>
                <strong className="text-white">DevOps / Cloud:</strong> Docker, Git, CI/CD Actions, Linux, AWS
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
