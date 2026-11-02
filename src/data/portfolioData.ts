import { ProjectItem, SkillItem, ArchitectureNode, ParticleTheme } from '../types';

export const PERSONAL_INFO = {
  name: 'ZENITH',
  role: 'AI Systems Engineer & Automation Builder',
  targetRole: 'Aspiring AI Solutions Architect',
  shortBio: 'Engineering high-throughput, evidence-grounded AI architectures, robust automation pipelines, and production-grade full-stack platforms.',
  location: 'Global / Remote',
  email: 'shahshafaatrasoolo@gmail.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  status: 'Open to AI Solutions Architect & Systems Engineering Roles',
  stats: [
    { label: 'Pipeline Reliability', value: '99.9%' },
    { label: 'Workflows Automated', value: '35+' },
    { label: 'Mean Latency Reduct.', value: '64%' },
    { label: 'Production Models', value: '18+' },
  ],
};

export const STORY_STAGES = [
  {
    id: 'portrait',
    title: 'The Architect',
    quote: 'Zenith · AI Systems Engineer & Automation Builder',
    description: 'Human intuition meets synthetic cognition. Hover to interact with point cloud.',
  },
  {
    id: 'statement1',
    title: 'Core Mission',
    quote: 'I BUILD INTELLIGENT SYSTEMS THAT SOLVE REAL PROBLEMS.',
    description: 'Moving beyond naive chat wrappers to deterministic, fault-tolerant enterprise automation.',
  },
  {
    id: 'statement2',
    title: 'Discipline Fusion',
    quote: 'Software Engineering × AI × Automation',
    description: 'Rigorous distributed systems design combined with modern probabilistic inference engines.',
  },
  {
    id: 'neural',
    title: 'Cognitive Topology',
    quote: 'Multi-Agent Autonomous Neural Constellation',
    description: 'Decentralized agent coordination with semantic routing and self-healing fallback loops.',
  },
  {
    id: 'statement3',
    title: 'Call to Action',
    quote: "LET'S BUILD SOMETHING MEANINGFUL",
    description: 'Architecting scalable intelligent infrastructure together.',
  },
];

export const PARTICLE_THEMES: ParticleTheme[] = [
  {
    id: 'cyan',
    name: 'Electric Cyan',
    primaryColor: '#00f0ff',
    secondaryColor: '#38bdf8',
    glowColor: 'rgba(0, 240, 255, 0.4)',
    accentHex: 0x00f0ff,
  },
  {
    id: 'violet',
    name: 'Quantum Violet',
    primaryColor: '#a855f7',
    secondaryColor: '#c084fc',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    accentHex: 0xa855f7,
  },
  {
    id: 'emerald',
    name: 'Cyber Emerald',
    primaryColor: '#10b981',
    secondaryColor: '#34d399',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    accentHex: 0x10b981,
  },
  {
    id: 'silver',
    name: 'Hyper Silver',
    primaryColor: '#f1f5f9',
    secondaryColor: '#94a3b8',
    glowColor: 'rgba(241, 245, 249, 0.3)',
    accentHex: 0xf1f5f9,
  },
];

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'global-problem-automation',
    title: 'Global Problem Automation',
    subtitle: 'AI Automation & Information Intelligence Engine',
    category: 'Autonomous Multi-Agent Systems',
    description: 'A distributed intelligence pipeline designed to monitor multi-source unstructured web streams, distill emergent global patterns, detect structural risks, and dispatch automated actionable briefs to decision-makers in real time.',
    impactMetrics: [
      { label: 'Data Ingestion Rate', value: '1.2M events/day' },
      { label: 'Triage Time Saved', value: '88%' },
      { label: 'Signal-to-Noise Ratio', value: '99.4%' },
      { label: 'Autonomous Agents', value: '6 Specialized' },
    ],
    tags: ['Python', 'FastAPI', 'LangChain', 'CrewAI', 'Qdrant Vector DB', 'Docker', 'Redis'],
    architectureOverview: 'Employs an asynchronous pub/sub ingest layer that normalizes multi-language streams, batches vector embeddings into high-dimensional space, evaluates semantic clusters with specialized auditor LLMs, and triggers webhooks with structured schemas.',
    architectureSteps: [
      {
        title: 'Asynchronous Ingestion',
        desc: 'Concurrent scraping & webhook receivers processing raw heterogeneous news, sensor, and social intelligence feeds.',
        icon: 'DownloadCloud',
      },
      {
        title: 'Embedding & Semantic Clustering',
        desc: 'Dense vector embeddings generated via lightweight transformers and clustered dynamically using HDBSCAN in Qdrant.',
        icon: 'Layers',
      },
      {
        title: 'Multi-Agent Critique Loop',
        desc: 'Primary synthesizer agent writes candidate insights, while an adversarial verification agent audits for factual drift.',
        icon: 'Cpu',
      },
      {
        title: 'Event-Driven Dispatch',
        desc: 'Zero-latency JSON payload notifications delivered to subscribed operational pipelines and enterprise Slack/Teams channels.',
        icon: 'Radio',
      },
    ],
    challengesSolved: [
      'Eliminated hallucinated summary leaks by introducing strict dual-pass citation checks against ground-truth source tokens.',
      'Reduced compute infrastructure cost by 45% through intelligent caching of high-frequency cluster centroids in Redis.',
      'Constructed dead-letter queues and automated fallback models to ensure zero feed dropouts during traffic surges.',
    ],
    links: {
      github: 'https://github.com',
      live: 'https://example.com/global-problem-automation',
    },
    featured: true,
  },
  {
    id: 'signalbridge-ai',
    title: 'SignalBridge AI',
    subtitle: 'Evidence-Grounded Incident Intelligence Platform',
    category: 'Enterprise Incident Response & RAG',
    description: 'An enterprise-grade observability and automated root-cause diagnosis platform. Ingests distributed telemetry, logs, and stack traces, correlating them with runbooks and source code repositories to generate high-fidelity incident timelines.',
    impactMetrics: [
      { label: 'MTTR (Mean Time to Resolution)', value: '-72%' },
      { label: 'Telemetry Analyzed', value: '450 GB/day' },
      { label: 'False Alarm Suppression', value: '94%' },
      { label: 'Runbook Accuracy', value: '99.1%' },
    ],
    tags: ['TypeScript', 'Next.js', 'Python', 'FastAPI', 'PostgreSQL', 'Pinecone', 'Docker', 'OpenTelemetry'],
    architectureOverview: 'Designed around an evidence-first RAG pipeline that enforces strict provenance links for every generated remediation recommendation, eliminating speculative guesses during Sev-1 outages.',
    architectureSteps: [
      {
        title: 'Telemetry Teleportation',
        desc: 'OpenTelemetry collector spans and error stack traces ingested with structured metadata tagging.',
        icon: 'Activity',
      },
      {
        title: 'Graph & Vector Correlation',
        desc: 'Codebase dependencies mapped onto a hybrid knowledge graph, matching anomalous spans with recent commits.',
        icon: 'GitBranch',
      },
      {
        title: 'Deterministic Incident Tree',
        desc: 'Synthesizes chronological casualty graphs, eliminating the noise of secondary cascading service errors.',
        icon: 'Binary',
      },
      {
        title: 'Executable Runbook Generation',
        desc: 'Outputs parameterized CLI commands and rollback procedures vetted against cloud security policy limits.',
        icon: 'Terminal',
      },
    ],
    challengesSolved: [
      'Engineered an embedding chunking strategy tailored for programming ASTs and log formats rather than standard generic markdown.',
      'Achieved sub-500ms retrieval speed over 5 million past post-mortems using metadata pre-filtering in vector storage.',
      'Designed an intuitive, low-cognitive-load war-room dashboard for on-call engineers under severe emergency pressure.',
    ],
    links: {
      github: 'https://github.com',
      live: 'https://example.com/signalbridge-ai',
    },
    featured: true,
  },
  {
    id: 'anas-dental-services',
    title: 'Anas Dental Services',
    subtitle: 'Full-Stack Next.js Practice & Patient Experience Platform',
    category: 'Production Full-Stack Web Application',
    description: 'A modern, high-conversion healthcare portal and clinical management system built with Next.js, featuring automated patient appointment scheduling, SMS/Email reminder queues, instant doctor calendar syncing, and encrypted medical records.',
    impactMetrics: [
      { label: 'Appointment Booking Rate', value: '+140%' },
      { label: 'No-Show Rate Reduction', value: '42%' },
      { label: 'Lighthouse Performance', value: '99/100' },
      { label: 'Active Monthly Patients', value: '3,800+' },
    ],
    tags: ['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma', 'Twilio API', 'Stripe'],
    architectureOverview: 'Built with server-side rendering, edge caching, and atomic database transactions to eliminate appointment double-booking. Includes an administrative portal with real-time patient queue telemetry.',
    architectureSteps: [
      {
        title: 'Patient Experience Layer',
        desc: 'Mobile-first responsive booking interface with interactive dental procedure guides and dynamic pricing estimates.',
        icon: 'UserCheck',
      },
      {
        title: 'Atomic Scheduling Engine',
        desc: 'PostgreSQL row-level locking ensures seamless concurrency during peak morning booking hours.',
        icon: 'Database',
      },
      {
        title: 'Automated Lifecycle Reminders',
        desc: 'Background cron job dispatches localized WhatsApp, SMS, and email alerts with one-click confirmation tokens.',
        icon: 'BellRing',
      },
      {
        title: 'Clinical Operations Dashboard',
        desc: 'Practitioner portal for digitizing chart notes, treatment progress photos, and exportable HIPAA/GDPR records.',
        icon: 'ShieldCheck',
      },
    ],
    challengesSolved: [
      'Eliminated slot collision bugs entirely through transactional isolation levels in relational database transactions.',
      'Attained perfect 100/100 Core Web Vitals via aggressive static generation and next/image edge optimization.',
      'Designed a frictionless multi-step booking form that reduced checkout abandonment from 38% down to 9%.',
    ],
    links: {
      github: 'https://github.com',
      live: 'https://example.com/anas-dental',
    },
    featured: true,
  },
];

export const SKILLS_DATA: SkillItem[] = [
  // Programming
  { name: 'Python', category: 'Programming', level: 95, isHighlight: true, yearsExp: '4+ yrs', description: 'Asyncio, typing, multiprocessing, PyTorch, NumPy, API development' },
  { name: 'TypeScript', category: 'Programming', level: 92, isHighlight: true, yearsExp: '3+ yrs', description: 'Strict typing, modern ESNext, React/Node full-stack architecture' },
  { name: 'Go', category: 'Programming', level: 82, isHighlight: false, yearsExp: '2 yrs', description: 'Concurrent microservices, goroutines, lightning-fast CLI tools' },
  { name: 'SQL', category: 'Programming', level: 90, isHighlight: true, yearsExp: '3+ yrs', description: 'Complex joins, indexing, query optimization, EXPLAIN ANALYZE' },
  { name: 'C++', category: 'Programming', level: 75, isHighlight: false, yearsExp: '2 yrs', description: 'Memory management, low-level data structures, algorithmic efficiency' },

  // Frontend & Backend
  { name: 'Next.js & React', category: 'Frontend & Backend', level: 94, isHighlight: true, yearsExp: '3+ yrs', description: 'App Router, Server Components, SSR/SSG, state management' },
  { name: 'FastAPI', category: 'Frontend & Backend', level: 92, isHighlight: true, yearsExp: '3 yrs', description: 'High-performance async REST & WebSocket endpoints with Pydantic' },
  { name: 'Node.js & Express', category: 'Frontend & Backend', level: 88, isHighlight: false, yearsExp: '3 yrs', description: 'Event-driven architectures, stream processing, middleware pipelines' },
  { name: 'Tailwind CSS', category: 'Frontend & Backend', level: 95, isHighlight: false, yearsExp: '3 yrs', description: 'Responsive layouts, design systems, modern CSS variables & animations' },
  { name: 'Three.js & WebGL', category: 'Frontend & Backend', level: 86, isHighlight: true, yearsExp: '2 yrs', description: 'Custom GLSL shaders, point-clouds, particle physics, 60fps rendering' },

  // Databases & Storage
  { name: 'PostgreSQL', category: 'Databases & Storage', level: 92, isHighlight: true, yearsExp: '3 yrs', description: 'Relational modeling, pgvector extension, partitioning, migrations' },
  { name: 'Supabase', category: 'Databases & Storage', level: 89, isHighlight: false, yearsExp: '2 yrs', description: 'Row Level Security (RLS), edge functions, realtime subscriptions' },
  { name: 'Redis', category: 'Databases & Storage', level: 88, isHighlight: false, yearsExp: '2 yrs', description: 'Pub/sub streaming, distributed rate-limiting, session cache' },
  { name: 'Pinecone & Qdrant', category: 'Databases & Storage', level: 90, isHighlight: true, yearsExp: '2 yrs', description: 'HNSW indexing, sparse-dense hybrid search, vector clustering' },

  // AI & Automation
  { name: 'LangChain & LlamaIndex', category: 'AI & Automation', level: 93, isHighlight: true, yearsExp: '2+ yrs', description: 'Complex retrieval pipelines, query routing, semantic chunking' },
  { name: 'Autonomous Agents (CrewAI)', category: 'AI & Automation', level: 91, isHighlight: true, yearsExp: '2 yrs', description: 'Hierarchical agent delegation, tool calling, memory persistence' },
  { name: 'Gemini & OpenAI APIs', category: 'AI & Automation', level: 95, isHighlight: true, yearsExp: '2+ yrs', description: 'Structured JSON outputs, function calling, multimodal prompts' },
  { name: 'n8n & Workflow Automation', category: 'AI & Automation', level: 90, isHighlight: false, yearsExp: '2 yrs', description: 'Self-hosted webhooks, enterprise integrations, error handling' },
  { name: 'RAG & Evidence Guardrails', category: 'AI & Automation', level: 94, isHighlight: true, yearsExp: '2 yrs', description: 'Hallucination suppression, grounded re-ranking, token cost optimization' },

  // DevOps & Cloud
  { name: 'Docker & Compose', category: 'DevOps & Cloud', level: 90, isHighlight: true, yearsExp: '3 yrs', description: 'Multi-stage builds, container isolation, minimal production images' },
  { name: 'Git & GitHub Actions', category: 'DevOps & Cloud', level: 92, isHighlight: false, yearsExp: '4 yrs', description: 'Automated CI/CD pipelines, release management, branch protections' },
  { name: 'Linux Systems & Bash', category: 'DevOps & Cloud', level: 88, isHighlight: false, yearsExp: '3 yrs', description: 'Server configuration, process management, shell scripting' },
  { name: 'AWS & Cloud Deployment', category: 'DevOps & Cloud', level: 82, isHighlight: false, yearsExp: '2 yrs', description: 'EC2, S3, CloudFront, IAM roles, serverless functions' },
];

export const ARCHITECTURE_BLUEPRINT: ArchitectureNode[] = [
  {
    id: 'ingest',
    title: '1. Multi-Stream Ingestion',
    role: 'Asynchronous Ingest & Normalizer',
    description: 'Polls incoming webhooks, logs, and live feeds; cleans payloads and strips malformed tokens.',
    tech: ['FastAPI', 'Kafka / Redis Stream', 'Pydantic'],
    status: 'active',
    latency: '3.2ms',
  },
  {
    id: 'vectorize',
    title: '2. Semantic Vector Space',
    role: 'Hybrid Embedding & Graph Links',
    description: 'Generates multi-scale contextual embeddings with metadata namespaces for hybrid BM25 + dense search.',
    tech: ['Text-Embedding-3', 'Qdrant / pgvector', 'BM25'],
    status: 'active',
    latency: '18.4ms',
  },
  {
    id: 'guardrails',
    title: '3. Cognitive Guardrails',
    role: 'Security, Schema & Policy Enforcement',
    description: 'Filters prompt injections, validates JSON schema adherence, and rejects out-of-distribution queries.',
    tech: ['NeMo Guardrails', 'Regex Validators', 'Zod'],
    status: 'active',
    latency: '6.1ms',
  },
  {
    id: 'agent-swarm',
    title: '4. Multi-Agent Orchestration',
    role: 'Distributed Reasoning Engine',
    description: 'Coordinator agent delegates tasks to specialized research, analysis, and verification workers.',
    tech: ['LangGraph', 'CrewAI', 'Gemini Flash'],
    status: 'active',
    latency: '420ms',
  },
  {
    id: 'tool-execution',
    title: '5. Sandboxed Tool Execution',
    role: 'Deterministic Safe Actions',
    description: 'Executes verified SQL queries, internal API invocations, and database mutations within secure boundaries.',
    tech: ['Docker Sandbox', 'REST Webhooks', 'SQL Parser'],
    status: 'active',
    latency: '24.8ms',
  },
  {
    id: 'evidence-verify',
    title: '6. Grounding & Provenance',
    role: 'Hallucination Mitigation & Output',
    description: 'Cross-verifies claims against retrieved source documents with explicit reference attribution.',
    tech: ['Citation Verifier', 'Confidence Scoring', 'JSON-LD'],
    status: 'active',
    latency: '14.2ms',
  },
];
