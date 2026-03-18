import React from 'react';
import { ShieldAlert, Activity, Crosshair, Lock, Search, AlertOctagon, CheckCircle } from 'lucide-react';
import clsx from 'clsx';

export default function SecurityDashboard() {
  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Security Posture</h1>
          <p className="text-slate-500 text-sm">Threat Detection & Incident Response (Sophos-style)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl p-6 text-white shadow-lg shadow-rose-500/30">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold text-rose-100">Active Threats</h3>
            <div className="bg-white/20 p-2 rounded-lg"><AlertOctagon className="w-6 h-6 text-white" /></div>
          </div>
          <div className="text-4xl font-bold mb-1">3</div>
          <p className="text-sm text-rose-100 font-medium">Critical alerts require attention</p>
        </div>
        
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold text-slate-300">Protected Endpoints</h3>
            <div className="bg-white/10 p-2 rounded-lg"><ShieldAlert className="w-6 h-6 text-blue-400" /></div>
          </div>
          <div className="text-4xl font-bold mb-1">452</div>
          <p className="text-sm text-slate-400 font-medium">98.5% coverage across fleet</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
             <h3 className="font-semibold text-slate-500">Security Score</h3>
             <div className="bg-green-50 p-2 rounded-lg"><Activity className="w-6 h-6 text-emerald-500" /></div>
          </div>
          <div className="flex items-end gap-2 mb-1">
            <div className="text-4xl font-bold text-emerald-600">86</div>
            <div className="text-xl font-bold text-slate-400">/ 100</div>
          </div>
          <p className="text-sm text-emerald-600 font-medium flex items-center gap-1">+2 points from last week</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50/50">
          <h2 className="font-semibold text-slate-800 flex items-center gap-2">
            <Crosshair className="w-5 h-5 text-rose-500" /> Recent Threat Detections
          </h2>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            { id: 'TR-9921', severity: 'Critical', name: 'Ransomware behavior detected', target: 'DESKTOP-MD', time: '10 mins ago', status: 'Blocked' },
            { id: 'TR-9920', severity: 'High', name: 'Malicious payload downloaded', target: 'LAPTOP-XYZ123', time: '2 hours ago', status: 'Cleaned' },
            { id: 'TR-9919', severity: 'Medium', name: 'Suspicious PowerShell execution', target: 'SRV-DB-01', time: '5 hours ago', status: 'Investigating' }
          ].map((threat, i) => (
            <div key={i} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className={clsx(
                  "p-3 rounded-full mt-1",
                  threat.severity === 'Critical' ? 'bg-rose-100 text-rose-600' :
                  threat.severity === 'High' ? 'bg-orange-100 text-orange-600' : 'bg-amber-100 text-amber-600'
                )}>
                  {threat.severity === 'Critical' ? <AlertOctagon className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{threat.id}</span>
                    <span className={clsx(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                      threat.severity === 'Critical' ? 'bg-rose-500 text-white' : 
                      threat.severity === 'High' ? 'bg-orange-500 text-white' : 'bg-amber-500 text-white'
                    )}>
                      {threat.severity}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">{threat.name}</h4>
                  <div className="text-sm text-slate-500 mt-1 flex items-center gap-3">
                    <span className="font-medium text-slate-700">Target: {threat.target}</span>
                    <span>•</span>
                    <span>{threat.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                <span className={clsx(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold",
                  threat.status === 'Blocked' ? 'bg-emerald-50 text-emerald-700' : 
                  threat.status === 'Cleaned' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                )}>
                  {threat.status === 'Blocked' && <Lock className="w-4 h-4" />}
                  {threat.status === 'Cleaned' && <CheckCircle className="w-4 h-4" />}
                  {threat.status === 'Investigating' && <Search className="w-4 h-4" />}
                  {threat.status}
                </span>
                <button className="text-blue-600 hover:underline text-sm font-medium">View Analysis</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
