import React from 'react';
import { Users, MonitorSmartphone, ShieldAlert, Cloud, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const cards = [
    { title: 'Identity & Access', desc: 'Azure AD User Lifecycle & Conditional Access policies.', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50', link: '/identity' },
    { title: 'Device Management', desc: 'Intune compliance checks & application deployment workflows.', icon: MonitorSmartphone, color: 'text-indigo-500', bg: 'bg-indigo-50', link: '/devices' },
    { title: 'Security Posture', desc: 'Sophos endpoint threat detection & alert visualization.', icon: ShieldAlert, color: 'text-rose-500', bg: 'bg-rose-50', link: '/security' },
    { title: 'AWS Cloud', desc: 'EC2 Compute, S3 Storage, and Security Group configurations.', icon: Cloud, color: 'text-orange-500', bg: 'bg-orange-50', link: '/aws' },
  ];

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-900 rounded-3xl p-10 mb-10 text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 blur-2xl pointer-events-none transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-1000">
          <Cloud className="w-96 h-96 text-blue-200" />
        </div>
        <div className="absolute -bottom-24 -left-24 opacity-20 pointer-events-none">
          <div className="w-64 h-64 rounded-full border-4 border-blue-400 border-dashed animate-[spin_60s_linear_infinite]"></div>
        </div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Systems Operational
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight leading-tight">Enterprise Cloud <br className="hidden sm:block"/> Engineering Platform</h1>
          <p className="text-blue-100 max-w-2xl text-lg sm:text-xl leading-relaxed mb-10 font-medium">
            Demonstrating real-world cloud administration, security, and operational architectures across modern enterprise technologies.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="bg-white text-slate-900 px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              View Source on GitHub
            </a>
            <span className="bg-slate-800/50 backdrop-blur-md text-white px-8 py-3.5 rounded-xl font-bold text-sm border border-slate-700 hover:bg-slate-800/80 transition-colors">
              Interactive Dashboard
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <Link key={i} to={card.link} className="group bg-white rounded-2xl border border-slate-200 p-8 flex flex-col hover:shadow-2xl hover:border-blue-300 hover:ring-2 hover:ring-blue-100 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-50 to-white rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
            
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner ${card.bg} text-white group-hover:rotate-3 transition-transform`}>
              <card.icon className={`w-8 h-8 ${card.color}`} />
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{card.title}</h3>
            <p className="text-slate-500 mb-6 text-base leading-relaxed flex-1">{card.desc}</p>
            
            <div className="flex items-center gap-2 text-sm font-bold text-blue-600 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all">
              Explore Module <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
