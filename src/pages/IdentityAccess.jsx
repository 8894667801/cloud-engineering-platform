import React, { useState } from 'react';
import { Users, Shield, Key, AlertTriangle, CheckCircle, Smartphone, Globe, Clock, Plus, Filter, MoreVertical } from 'lucide-react';
import clsx from 'clsx';

const users = [
  { id: 1, name: 'Alex Johnson', email: 'alex.j@cloudops.com', role: 'Global Admin', status: 'Active', mfa: true },
  { id: 2, name: 'Sarah Williams', email: 'sarah.w@cloudops.com', role: 'Security Reader', status: 'Active', mfa: true },
  { id: 3, name: 'Mike Davis', email: 'mike.d@cloudops.com', role: 'User', status: 'Disabled', mfa: false },
  { id: 4, name: 'Emma Watson', email: 'emma.w@cloudops.com', role: 'User', status: 'Active', mfa: false },
  { id: 5, name: 'David Chen', email: 'david.c@cloudops.com', role: 'Helpdesk Admin', status: 'Active', mfa: true },
];

export default function IdentityAccess() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Identity & Access Management</h1>
          <p className="text-slate-500 text-sm">Azure AD / Entra ID Simulation Engine</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('users')}
            className={clsx(
              "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
              activeTab === 'users' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            )}
          >
            User Lifecycle
          </button>
          <button 
            onClick={() => setActiveTab('policies')}
            className={clsx(
              "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
              activeTab === 'policies' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            )}
          >
            Conditional Access
          </button>
        </div>
      </div>

      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Users', value: '1,248', icon: Users, color: 'text-blue-600', border: 'border-blue-200', bg: 'bg-blue-50' },
              { label: 'Global Admins', value: '4', icon: Shield, color: 'text-indigo-600', border: 'border-indigo-200', bg: 'bg-indigo-50' },
              { label: 'MFA Enabled', value: '98%', icon: Key, color: 'text-emerald-600', border: 'border-emerald-200', bg: 'bg-emerald-50' },
              { label: 'Risky Sign-ins', value: '12', icon: AlertTriangle, color: 'text-rose-600', border: 'border-rose-200', bg: 'bg-rose-50' },
            ].map((stat, i) => (
              <div key={i} className={clsx("bg-white rounded-xl border p-5 flex items-center justify-between shadow-sm transition-transform hover:-translate-y-1 duration-300", stat.border)}>
                <div>
                  <div className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                </div>
                <div className={clsx("w-12 h-12 rounded-full flex items-center justify-center", stat.bg)}>
                  <stat.icon className={clsx("w-6 h-6", stat.color)} />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
              <h3 className="font-semibold text-slate-800">Directory Users</h3>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 text-sm text-slate-600 bg-white border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50 font-medium transition-colors">
                  <Filter className="w-4 h-4" /> Filter
                </button>
                <button className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-medium transition-colors shadow-sm">
                  <Plus className="w-4 h-4" /> New User
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">User Details</th>
                    <th className="px-6 py-4">Assigned Role</th>
                    <th className="px-6 py-4">Account Status</th>
                    <th className="px-6 py-4">Authentication</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-blue-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-200 to-slate-100 flex items-center justify-center font-bold text-slate-600">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{user.name}</div>
                            <div className="text-slate-500 text-xs mt-0.5">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-xs font-medium text-slate-700 border border-slate-200">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={clsx(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border",
                          user.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                        )}>
                          <span className={clsx("w-1.5 h-1.5 rounded-full animate-pulse", user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400')}></span>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {user.mfa ? (
                          <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
                            <CheckCircle className="w-4 h-4" /> Enforced
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-amber-600 text-xs font-semibold">
                            <AlertTriangle className="w-4 h-4" /> Pending Registration
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-blue-600 p-1 rounded-md transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'policies' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute -top-24 -right-24 opacity-10 blur-2xl">
              <Shield className="w-96 h-96 text-blue-400" />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-3">
                <Shield className="w-8 h-8 text-blue-400" />
                Zero Trust Architecture
              </h2>
              <p className="text-slate-300 max-w-2xl text-sm leading-relaxed mb-6">
                Conditional Access policies dynamically evaluate signals—like user risk, device posture, and location—to enforce required controls such as MFA, device compliance, or blocking access entirely.
              </p>
              <div className="flex gap-4">
                <span className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-3 py-1.5 rounded-lg text-xs font-medium border border-indigo-500/30">
                  <CheckCircle className="w-4 h-4" /> 18 Active Policies
                </span>
                <span className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-300 px-3 py-1.5 rounded-lg text-xs font-medium border border-rose-500/30">
                  <AlertTriangle className="w-4 h-4" /> 2 Report-only
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 hidden lg:block z-0 rounded-full"></div>
            
            <div className="bg-white border-2 border-slate-200 rounded-xl p-6 shadow-sm z-10 relative group hover:border-blue-400 transition-colors">
              <h3 className="font-semibold text-slate-800 flex items-center gap-3 mb-5 text-lg">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600"><Users className="w-5 h-5" /></div>
                1. Signals
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                  <Globe className="w-5 h-5 text-slate-400" /> Location / IP Network
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                  <Smartphone className="w-5 h-5 text-slate-400" /> Device Compliance Status
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                  <AlertTriangle className="w-5 h-5 text-amber-500" /> Sign-in Risk Level
                </li>
              </ul>
            </div>
            
            <div className="bg-white border-2 border-slate-200 rounded-xl p-6 shadow-sm z-10 relative flex flex-col justify-center min-h-[250px] group hover:border-purple-400 transition-colors">
              <h3 className="font-semibold text-slate-800 flex items-center gap-3 mb-5 text-lg justify-center">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600"><Clock className="w-5 h-5" /></div>
                2. Decision Engine
              </h3>
              <div className="bg-purple-50 border border-purple-100 rounded-xl p-6 text-center shadow-inner group-hover:bg-purple-100/50 transition-colors">
                <div className="text-base font-bold text-purple-900 mb-2">Evaluate Policies</div>
                <div className="text-sm text-purple-700 font-medium">Machine Learning & Rules Analysis</div>
                <div className="mt-4 flex justify-center gap-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white border-2 border-slate-200 rounded-xl p-6 shadow-sm z-10 relative group hover:border-emerald-400 transition-colors">
              <h3 className="font-semibold text-slate-800 flex items-center gap-3 mb-5 text-lg">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600"><CheckCircle className="w-5 h-5" /></div>
                3. Enforcement
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-slate-700 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                  <CheckCircle className="w-5 h-5 text-emerald-600" /> Allow Access
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-700 bg-amber-50 p-3 rounded-xl border border-amber-100">
                  <Key className="w-5 h-5 text-amber-600" /> Require MFA
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-700 bg-rose-50 p-3 rounded-xl border border-rose-100">
                  <AlertTriangle className="w-5 h-5 text-rose-600" /> Block Access
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
