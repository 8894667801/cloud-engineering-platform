import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, ArrowLeft, RotateCcw, Search, ChevronRight, CheckCircle2, AlertTriangle, Mail, Server, MonitorSmartphone, ShieldAlert, LayoutGrid, Cloud, Send, Bot } from 'lucide-react';
import { categories, knowledgeBase, botGreeting, botFollowUp } from '../data/supportKnowledgeBase';
import clsx from 'clsx';

const iconMap = { Mail, Server, MonitorSmartphone, ShieldAlert, LayoutGrid, Cloud };

const severityConfig = {
  high: { color: 'text-red-500', bg: 'bg-red-50', label: 'High Priority' },
  medium: { color: 'text-amber-500', bg: 'bg-amber-50', label: 'Medium' },
  low: { color: 'text-green-500', bg: 'bg-green-50', label: 'Low' },
};

export default function SupportBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ type: 'bot', content: botGreeting, timestamp: new Date() }]);
  const [currentView, setCurrentView] = useState('categories'); // categories | issues | solution
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [completedSteps, setCompletedSteps] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentView]);

  const addMessage = (type, content) => {
    setMessages(prev => [...prev, { type, content, timestamp: new Date() }]);
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setCurrentView('issues');
    addMessage('user', `I need help with ${cat.name}`);
    addMessage('bot', `Here are common ${cat.name} issues. Select the one that matches your problem:`);
  };

  const handleIssueSelect = (issue) => {
    setSelectedIssue(issue);
    setCurrentView('solution');
    setCompletedSteps({});
    addMessage('user', issue.title);
    addMessage('bot', `Got it! Here's how to fix "${issue.title}". Follow the steps below:`);
  };

  const handleBack = () => {
    if (currentView === 'solution') {
      setCurrentView('issues');
      setSelectedIssue(null);
      setCompletedSteps({});
    } else if (currentView === 'issues') {
      setCurrentView('categories');
      setSelectedCategory(null);
    }
  };

  const handleStartOver = () => {
    setCurrentView('categories');
    setSelectedCategory(null);
    setSelectedIssue(null);
    setSearchQuery('');
    setCompletedSteps({});
    addMessage('bot', botFollowUp);
  };

  const toggleStep = (stepIndex) => {
    setCompletedSteps(prev => ({ ...prev, [stepIndex]: !prev[stepIndex] }));
  };

  const getFilteredIssues = () => {
    if (!selectedCategory) return [];
    const issues = knowledgeBase[selectedCategory.id] || [];
    if (!searchQuery) return issues;
    const query = searchQuery.toLowerCase();
    return issues.filter(issue => 
      issue.title.toLowerCase().includes(query) ||
      issue.symptoms.some(s => s.toLowerCase().includes(query))
    );
  };

  const getAllIssues = () => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();
    const results = [];
    Object.entries(knowledgeBase).forEach(([catId, issues]) => {
      const cat = categories.find(c => c.id === catId);
      issues.forEach(issue => {
        if (issue.title.toLowerCase().includes(query) || issue.symptoms.some(s => s.toLowerCase().includes(query))) {
          results.push({ ...issue, category: cat });
        }
      });
    });
    return results;
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110',
          isOpen
            ? 'bg-slate-700 hover:bg-slate-600 rotate-90'
            : 'bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500'
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            <MessageCircle className="w-7 h-7 text-white" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs font-bold flex items-center justify-center animate-bounce">?</span>
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[420px] max-h-[600px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4 text-white flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Bot className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm">IT Support Assistant</h3>
              <p className="text-xs text-blue-100">Online • Instant troubleshooting</p>
            </div>
            <div className="flex gap-1">
              {currentView !== 'categories' && (
                <button onClick={handleBack} className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Go back">
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <button onClick={handleStartOver} className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Start over">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 min-h-0" style={{ maxHeight: '460px' }}>
            {/* Messages */}
            {messages.slice(-4).map((msg, i) => (
              <div key={i} className={clsx('flex', msg.type === 'user' ? 'justify-end' : 'justify-start')}>
                <div className={clsx(
                  'max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed',
                  msg.type === 'user'
                    ? 'bg-blue-600 text-white rounded-br-md'
                    : 'bg-white text-slate-700 rounded-bl-md shadow-sm border border-slate-100'
                )}>
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Category Selection */}
            {currentView === 'categories' && (
              <div className="space-y-3">
                {/* Global Search */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search all issues..."
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {searchQuery ? (
                  <div className="space-y-2">
                    {getAllIssues().map(issue => (
                      <button
                        key={issue.id}
                        onClick={() => {
                          const cat = issue.category;
                          setSelectedCategory(cat);
                          handleIssueSelect(issue);
                        }}
                        className="w-full text-left bg-white rounded-xl p-3 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className={clsx('text-xs font-medium px-2 py-0.5 rounded-full', severityConfig[issue.severity].bg, severityConfig[issue.severity].color)}>
                            {issue.category.name}
                          </span>
                        </div>
                        <p className="font-medium text-sm text-slate-800 group-hover:text-blue-600 transition-colors">{issue.title}</p>
                      </button>
                    ))}
                    {getAllIssues().length === 0 && (
                      <p className="text-center text-sm text-slate-400 py-4">No results found. Try a different search term.</p>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map(cat => {
                      const IconComp = iconMap[cat.icon];
                      return (
                        <button
                          key={cat.id}
                          onClick={() => handleCategorySelect(cat)}
                          className="bg-white rounded-xl p-3.5 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all group text-left"
                        >
                          <div className={clsx('w-10 h-10 rounded-lg flex items-center justify-center mb-2', cat.bg)}>
                            {IconComp && <IconComp className={clsx('w-5 h-5', cat.color)} />}
                          </div>
                          <p className="font-semibold text-xs text-slate-800 group-hover:text-blue-600 transition-colors">{cat.name}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{cat.description}</p>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Issue List */}
            {currentView === 'issues' && selectedCategory && (
              <div className="space-y-2">
                <div className="relative mb-3">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search ${selectedCategory.name} issues...`}
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {getFilteredIssues().map(issue => (
                  <button
                    key={issue.id}
                    onClick={() => handleIssueSelect(issue)}
                    className="w-full text-left bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <AlertTriangle className={clsx('w-3.5 h-3.5', severityConfig[issue.severity].color)} />
                          <span className={clsx('text-xs font-medium', severityConfig[issue.severity].color)}>
                            {severityConfig[issue.severity].label}
                          </span>
                        </div>
                        <p className="font-semibold text-sm text-slate-800 group-hover:text-blue-600 transition-colors">{issue.title}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {issue.symptoms.slice(0, 2).map((s, i) => (
                            <span key={i} className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{s}</span>
                          ))}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors mt-1" />
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Solution View */}
            {currentView === 'solution' && selectedIssue && (
              <div className="space-y-4">
                {/* Issue Header */}
                <div className="bg-white rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className={clsx('w-4 h-4', severityConfig[selectedIssue.severity].color)} />
                    <span className={clsx('text-xs font-bold', severityConfig[selectedIssue.severity].color)}>
                      {severityConfig[selectedIssue.severity].label}
                    </span>
                  </div>
                  <h4 className="font-bold text-base text-slate-900">{selectedIssue.title}</h4>
                </div>

                {/* Steps */}
                <div className="bg-white rounded-xl p-4 border border-slate-200">
                  <h5 className="font-bold text-sm text-slate-700 mb-3 flex items-center gap-2">
                    <Send className="w-4 h-4 text-blue-500" />
                    Step-by-Step Fix
                  </h5>
                  <div className="space-y-3">
                    {selectedIssue.steps.map((step, i) => (
                      <button
                        key={i}
                        onClick={() => toggleStep(i)}
                        className={clsx(
                          'w-full text-left flex items-start gap-3 p-3 rounded-lg transition-all',
                          completedSteps[i]
                            ? 'bg-emerald-50 border border-emerald-200'
                            : 'bg-slate-50 hover:bg-blue-50 border border-transparent'
                        )}
                      >
                        <div className={clsx(
                          'w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold transition-colors',
                          completedSteps[i]
                            ? 'bg-emerald-500 text-white'
                            : 'bg-blue-100 text-blue-600'
                        )}>
                          {completedSteps[i] ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                        </div>
                        <p className={clsx(
                          'text-sm leading-relaxed',
                          completedSteps[i] ? 'text-emerald-700 line-through opacity-60' : 'text-slate-700'
                        )}>
                          {step}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Common Causes */}
                <div className="bg-white rounded-xl p-4 border border-slate-200">
                  <h5 className="font-bold text-sm text-slate-700 mb-3">💡 Common Causes</h5>
                  <div className="space-y-1.5">
                    {selectedIssue.commonCauses.map((cause, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span className="text-sm text-slate-600">{cause}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resolved button */}
                <div className="flex gap-2">
                  <button
                    onClick={handleStartOver}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white py-3 rounded-xl text-sm font-bold hover:from-emerald-400 hover:to-green-400 transition-all shadow-lg"
                  >
                    ✅ Issue Resolved!
                  </button>
                  <button
                    onClick={handleStartOver}
                    className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all"
                  >
                    Still Need Help
                  </button>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-white border-t border-slate-100 shrink-0">
            <p className="text-[10px] text-slate-400 text-center">CloudOps IT Support Bot • Powered by Knowledge Base v1.0</p>
          </div>
        </div>
      )}
    </>
  );
}
