import { useState, useMemo } from 'react';
import { Search, Code2, Server, Database, Brain, Terminal, Wrench } from 'lucide-react';
import { SKILLS_DATA } from '../../data/portfolioData';

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Programming',
    'Frontend & Backend',
    'Databases & Storage',
    'AI & Automation',
    'DevOps & Cloud',
  ];

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Programming':
        return Code2;
      case 'Frontend & Backend':
        return Server;
      case 'Databases & Storage':
        return Database;
      case 'AI & Automation':
        return Brain;
      case 'DevOps & Cloud':
        return Terminal;
      default:
        return Wrench;
    }
  };

  const filteredSkills = useMemo(() => {
    return SKILLS_DATA.filter((skill) => {
      const matchesCat = selectedCategory === 'All' || skill.category === selectedCategory;
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="skills" className="relative py-32 px-6 sm:px-12 lg:px-16 z-10 pointer-events-auto border-t border-slate-900/60">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <div className="text-xs uppercase tracking-[0.25em] text-cyan-400 font-mono mb-3">
            04. Toolchain &amp; Engineering Matrix
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight max-w-3xl">
            Technical competencies &amp; distributed infrastructure.
          </h2>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          {/* Segmented Category Buttons */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-[#060a12] border border-slate-800 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-800 text-white font-medium'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search competencies..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#060a12] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => {
            const Icon = getCategoryIcon(skill.category);
            return (
              <div
                key={skill.name}
                className="p-6 rounded-2xl bg-[#060a12]/80 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-heading font-bold text-base text-white">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {skill.yearsExp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans mb-6">
                    {skill.description}
                  </p>
                </div>

                <div>
                  {/* Tabular proficiency indicator */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                    <span>Proficiency</span>
                    <span className="text-white font-semibold tabular-nums">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1 rounded-full bg-slate-900 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-cyan-400 transition-all duration-700"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
