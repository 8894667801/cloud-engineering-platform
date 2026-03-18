import { useState } from 'react';
import { Search, ChevronRight, CheckCircle2, AlertTriangle, ArrowLeft, Mail, Server, MonitorSmartphone, ShieldAlert, LayoutGrid, Cloud, Headphones, BookOpen } from 'lucide-react';
import { categories, knowledgeBase } from '../data/supportKnowledgeBase';
import clsx from 'clsx';

const iconMap = { Mail, Server, MonitorSmartphone, ShieldAlert, LayoutGrid, Cloud };

const severityConfig = {
  high: { color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200', label: 'High Priority' },
  medium: { color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200', label: 'Medium' },
  low: { color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200', label: 'Low' },
};

export default function SupportPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [completedSteps, setCompletedSteps] = useState({});

  const getAllIssues = () => {
    const results = [];
    Object.entries(knowledgeBase).forEach(([catId, issues]) => {
      const cat = categories.find(c => c.id === catId);
      issues.forEach(issue => {
        results.push({ ...issue, category: cat });
      });
    });
    if (!searchQuery) return results;
    const query = searchQuery.toLowerCase();
    return results.filter(issue =>
      issue.title.toLowerCase().includes(query) ||
      issue.symptoms.some(s => s.toLowerCase().includes(query))
    );
  };

  const getIssuesForCategory = () => {
    if (!selectedCategory) return [];
    return knowledgeBase[selectedCategory.id] || [];
  };

  const toggleStep = (i) => setCompletedSteps(prev => ({ ...prev, [i]: !prev[i] }));

  if (selectedIssue) {
    return (
      <div className="animate-in fade-in duration-300">
        <button onClick={() => { setSelectedIssue(null); setCompletedSteps({}); }} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to {selectedCategory ? selectedCategory.name : 'all issues'}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Solution Steps */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className={clsx('w-5 h-5', severityConfig[selectedIssue.severity].color)} />
                <span className={clsx('text-sm font-bold px-3 py-1 rounded-full', severityConfig[selectedIssue.severity].bg, severityConfig[selectedIssue.severity].color)}>
                  {severityConfig[selectedIssue.severity].label}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">{selectedIssue.title}</h2>
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedIssue.symptoms.map((s, i) => (
                  <span key={i} className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium">{s}</span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                Step-by-Step Resolution
              </h3>
              <div className="space-y-3">
                {selectedIssue.steps.map((step, i) => (
                  <button
                    key={i}
                    onClick={() => toggleStep(i)}
                    className={clsx(
                      'w-full text-left flex items-start gap-4 p-4 rounded-xl transition-all duration-200 border',
                      completedSteps[i]
                        ? 'bg-emerald-50 border-emerald-200 shadow-sm'
                        : 'bg-slate-50 hover:bg-blue-50 border-transparent hover:border-blue-200'
                    )}
                  >
                    <div className={clsx(
                      'w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold transition-all',
                      completedSteps[i] ? 'bg-emerald-500 text-white shadow-md' : 'bg-blue-100 text-blue-600'
                    )}>
                      {completedSteps[i] ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                    </div>
                    <p className={clsx(
                      'text-sm leading-relaxed pt-1',
                      completedSteps[i] ? 'text-emerald-700 line-through opacity-60' : 'text-slate-700'
                    )}>
                      {step}
                    </p>
                  </button>
                ))}
              </div>
              <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                <p className="text-sm text-emerald-700 font-medium">
                  ✅ Completed {Object.values(completedSteps).filter(Boolean).length} of {selectedIssue.steps.length} steps
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                💡 Common Causes
              </h3>
              <div className="space-y-3">
                {selectedIssue.commonCauses.map((cause, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">{cause}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
              <Headphones className="w-8 h-8 mb-3 opacity-80" />
              <h3 className="font-bold text-lg mb-2">Still Need Help?</h3>
              <p className="text-sm text-blue-100 mb-4">If the steps above didn't resolve your issue, contact the IT Helpdesk.</p>
              <div className="space-y-2 text-sm">
                <p>📧 helpdesk@company.com</p>
                <p>📞 Ext. 5555</p>
                <p>💬 Use the chat bot (bottom right)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedCategory) {
    const issues = getIssuesForCategory();
    return (
      <div className="animate-in fade-in duration-300">
        <button onClick={() => setSelectedCategory(null)} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to all categories
        </button>

        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">{selectedCategory.name}</h2>
          <p className="text-slate-500">{selectedCategory.description} — Select an issue below for step-by-step resolution.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {issues.map(issue => (
            <button
              key={issue.id}
              onClick={() => setSelectedIssue(issue)}
              className="bg-white rounded-2xl border border-slate-200 p-6 text-left hover:shadow-xl hover:border-blue-300 hover:ring-2 hover:ring-blue-100 transition-all group"
            >
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className={clsx('w-4 h-4', severityConfig[issue.severity].color)} />
                <span className={clsx('text-xs font-bold px-2 py-0.5 rounded-full', severityConfig[issue.severity].bg, severityConfig[issue.severity].color)}>
                  {severityConfig[issue.severity].label}
                </span>
              </div>
              <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors mb-2">{issue.title}</h3>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {issue.symptoms.map((s, i) => (
                  <span key={i} className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{s}</span>
                ))}
              </div>
              <div className="flex items-center gap-1 text-sm font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                View Solution <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-900 rounded-3xl p-10 mb-10 text-white relative overflow-hidden">
        <div className="absolute -top-20 -right-20 opacity-10 pointer-events-none">
          <Headphones className="w-80 h-80" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Knowledge Base v1.0
          </div>
          <h1 className="text-4xl font-extrabold mb-3">IT Support Center</h1>
          <p className="text-blue-100 text-lg max-w-2xl mb-6">Search our knowledge base or browse categories to find step-by-step solutions for common IT issues.</p>
          <div className="relative max-w-xl">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for an issue (e.g., 'Outlook', 'VPN', 'password')..."
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/15 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="mb-10">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Search Results ({getAllIssues().length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getAllIssues().map(issue => (
              <button
                key={issue.id}
                onClick={() => { setSelectedCategory(issue.category); setSelectedIssue(issue); }}
                className="bg-white rounded-2xl border border-slate-200 p-5 text-left hover:shadow-lg hover:border-blue-300 transition-all group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={clsx('text-xs font-bold px-2 py-0.5 rounded-full', issue.category.bg, issue.category.color)}>{issue.category.name}</span>
                  <span className={clsx('text-xs font-medium', severityConfig[issue.severity].color)}>{severityConfig[issue.severity].label}</span>
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{issue.title}</h3>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Category Cards */}
      {!searchQuery && (
        <>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map(cat => {
              const IconComp = iconMap[cat.icon];
              const issueCount = (knowledgeBase[cat.id] || []).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat)}
                  className="bg-white rounded-2xl border border-slate-200 p-6 text-left hover:shadow-xl hover:border-blue-300 hover:ring-2 hover:ring-blue-100 transition-all group"
                >
                  <div className={clsx('w-14 h-14 rounded-2xl flex items-center justify-center mb-4', cat.bg)}>
                    {IconComp && <IconComp className={clsx('w-7 h-7', cat.color)} />}
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors mb-1">{cat.name}</h3>
                  <p className="text-sm text-slate-500 mb-3">{cat.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-400">{issueCount} articles</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
