import React, { useState } from 'react';
import { MonitorSmartphone, ShieldCheck, AlertCircle, CheckCircle2, CopyX, RefreshCw, AppWindow } from 'lucide-react';
import clsx from 'clsx';

const devices = [
  { id: 'dev-001', name: 'LAPTOP-XYZ123', user: 'Alex Johnson', os: 'Windows 11', compliance: 'Compliant', lastSync: '10 mins ago' },
  { id: 'dev-002', name: 'IPHONE-SW', user: 'Sarah Williams', os: 'iOS 17.2', compliance: 'Compliant', lastSync: '1 hour ago' },
  { id: 'dev-003', name: 'DESKTOP-MD', user: 'Mike Davis', os: 'Windows 10', compliance: 'Non-Compliant', lastSync: '2 days ago' },
  { id: 'dev-004', name: 'MACBOOK-PRO', user: 'Emma Watson', os: 'macOS Sonoma', compliance: 'Compliant', lastSync: '5 mins ago' },
  { id: 'dev-005', name: 'GALAXY-S23', user: 'David Chen', os: 'Android 14', compliance: 'Grace Period', lastSync: '12 hours ago' },
];

export default function DeviceManagement() {
  const [activeTab, setActiveTab] = useState('compliance');

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Device Management</h1>
          <p className="text-slate-500 text-sm">Microsoft Intune Simulation Dashboard</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('compliance')}
            className={clsx(
              "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
              activeTab === 'compliance' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            )}
          >
            Compliance Status
          </button>
          <button 
            onClick={() => setActiveTab('apps')}
            className={clsx(
              "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
              activeTab === 'apps' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            )}
          >
            App Deployment
          </button>
        </div>
      </div>

      {activeTab === 'compliance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             {[
               { label: 'Total Enrolled', value: '452', icon: MonitorSmartphone, color: 'text-blue-600', bg: 'bg-blue-50' },
               { label: 'Compliant', value: '418', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
               { label: 'Non-Compliant', value: '29', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
               { label: 'Not Evaluated', value: '5', icon: CopyX, color: 'text-slate-600', bg: 'bg-slate-50' },
             ].map((stat, i) => (
               <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center justify-between">
                 <div>
                    <div className="text-sm font-medium text-slate-500 mb-1">{stat.label}</div>
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                 </div>
                 <div className={clsx("w-12 h-12 rounded-full flex items-center justify-center", stat.bg)}>
                    <stat.icon className={clsx("w-6 h-6", stat.color)} />
                 </div>
               </div>
             ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
              <h3 className="font-semibold text-slate-800">Enrolled Devices</h3>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 text-sm text-slate-600 bg-white border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50 font-medium transition-colors">
                  <RefreshCw className="w-4 h-4" /> Sync All
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Device Name</th>
                    <th className="px-6 py-4">Assigned User</th>
                    <th className="px-6 py-4">OS Version</th>
                    <th className="px-6 py-4">Compliance Status</th>
                    <th className="px-6 py-4">Last Sync</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {devices.map((device) => (
                    <tr key={device.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                        <MonitorSmartphone className="w-5 h-5 text-slate-400" />
                        {device.name}
                      </td>
                      <td className="px-6 py-4 text-slate-600">{device.user}</td>
                      <td className="px-6 py-4 text-slate-600">{device.os}</td>
                      <td className="px-6 py-4">
                        <span className={clsx(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold",
                          device.compliance === 'Compliant' ? 'bg-emerald-50 text-emerald-700' : 
                          device.compliance === 'Non-Compliant' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
                        )}>
                          {device.compliance === 'Compliant' && <CheckCircle2 className="w-4 h-4" />}
                          {device.compliance === 'Non-Compliant' && <AlertCircle className="w-4 h-4" />}
                          {device.compliance === 'Grace Period' && <Clock className="w-4 h-4" />}
                          {device.compliance}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{device.lastSync}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'apps' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Microsoft 365 Apps', os: 'Windows/macOS', status: 'Required', count: 452, icon: AppWindow, bg: 'bg-blue-100', color: 'text-blue-600' },
            { name: 'Sophos Endpoint Protection', os: 'All Devices', status: 'Required', count: 452, icon: ShieldCheck, bg: 'bg-indigo-100', color: 'text-indigo-600' },
            { name: 'Slack', os: 'iOS/Android/Desktop', status: 'Available', count: 320, icon: Users, bg: 'bg-purple-100', color: 'text-purple-600' },
          ].map((app, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center", app.bg)}>
                  <app.icon className={clsx("w-6 h-6", app.color)} />
                </div>
                <span className={clsx("inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold", app.status === 'Required' ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-700')}>
                  {app.status}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">{app.name}</h3>
              <p className="text-slate-500 text-sm mb-4">Platform: {app.os}</p>
              
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-600">Install Status</span>
                  <span className="font-bold text-slate-900">{app.count}/452</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(app.count/452)*100}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
