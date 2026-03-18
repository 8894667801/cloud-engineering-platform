import React, { useState } from 'react';
import { Cloud, Server, HardDrive, Shield } from 'lucide-react';
import clsx from 'clsx';

export default function AwsCloud() {
  const [activeTab, setActiveTab] = useState('compute');

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            <Cloud className="w-6 h-6 text-orange-500" /> AWS Cloud Infrastructure
          </h1>
          <p className="text-slate-500 text-sm">Compute, Storage, and Networking Architectures</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button onClick={() => setActiveTab('compute')} className={clsx("px-4 py-2 rounded-md text-sm font-medium transition-all", activeTab === 'compute' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-600 hover:text-slate-900')}>Compute (EC2)</button>
          <button onClick={() => setActiveTab('security')} className={clsx("px-4 py-2 rounded-md text-sm font-medium transition-all", activeTab === 'security' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-600 hover:text-slate-900')}>Security Groups</button>
        </div>
      </div>

      {activeTab === 'compute' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2"><Server className="w-5 h-5 text-orange-500" /> EC2 Instances</h3>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">Launch Instance</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="px-5 py-3">Name</th>
                        <th className="px-5 py-3">Instance ID & Type</th>
                        <th className="px-5 py-3">State</th>
                        <th className="px-5 py-3">Public IP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { name: 'web-prod-01', id: 'i-0abcd1234', type: 't3.medium', state: 'Running', ip: '54.123.45.67' },
                        { name: 'db-prod-01', id: 'i-0efgh5678', type: 'r5.large', state: 'Running', ip: '-' },
                        { name: 'worker-stage', id: 'i-0ijkl9012', type: 't3.micro', state: 'Stopped', ip: '-' },
                      ].map((instance, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="px-5 py-4 font-semibold text-slate-900">{instance.name}</td>
                          <td className="px-5 py-4">
                            <div className="text-orange-600 font-mono text-xs mb-0.5">{instance.id}</div>
                            <div className="text-slate-500">{instance.type}</div>
                          </td>
                          <td className="px-5 py-4">
                            <span className={clsx("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border", instance.state === 'Running' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200')}>
                              <span className={clsx("w-1.5 h-1.5 rounded-full", instance.state === 'Running' ? 'bg-emerald-500' : 'bg-slate-400')}></span>
                              {instance.state}
                            </span>
                          </td>
                          <td className="px-5 py-4 font-mono text-xs">{instance.ip}</td>
                        </tr>
                      ))}
                    </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white shadow-lg">
               <h3 className="font-semibold text-slate-300 mb-4 flex items-center gap-2"><HardDrive className="w-5 h-5 text-orange-400" /> S3 Storage</h3>
               <div className="space-y-4">
                 <div>
                   <div className="flex justify-between text-sm mb-1"><span className="text-slate-400">Total Size</span><span className="font-bold">4.2 TB</span></div>
                   <div className="w-full bg-slate-700 rounded-full h-2"><div className="bg-orange-500 h-2 rounded-full" style={{width: '65%'}}></div></div>
                 </div>
                 <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                   <div className="text-sm font-semibold mb-1">assets-prod-bkt</div>
                   <div className="text-xs text-slate-400">Public • 2.1 TB • us-east-1</div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 border-b pb-6">
            <div className="w-16 h-16 rounded-2xl bg-orange-100 shrink-0 flex items-center justify-center text-orange-600"><Shield className="w-8 h-8" /></div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Security Group: sg-web-tier</h2>
              <p className="text-slate-500 text-sm mt-1 max-w-2xl">Controls inbound and outbound traffic for web servers. Allows public HTTPS/HTTP, but restricts management access to the corporate network.</p>
            </div>
          </div>
          
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><ArrowDown className="w-4 h-4 text-emerald-500" /> Inbound Rules</h3>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="text-slate-500 font-semibold bg-slate-50">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg border-y border-l border-slate-200">Type</th>
                  <th className="px-4 py-3 border-y border-slate-200">Protocol</th>
                  <th className="px-4 py-3 border-y border-slate-200">Port Range</th>
                  <th className="px-4 py-3 border-y border-slate-200">Source</th>
                  <th className="px-4 py-3 rounded-r-lg border-y border-r border-slate-200">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">HTTP</td><td className="px-4 py-3">TCP</td><td className="px-4 py-3 font-mono">80</td><td className="px-4 py-3 font-mono text-xs bg-slate-100 rounded">0.0.0.0/0</td><td className="px-4 py-3 text-slate-500">Allow public HTTP</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">HTTPS</td><td className="px-4 py-3">TCP</td><td className="px-4 py-3 font-mono">443</td><td className="px-4 py-3 font-mono text-xs bg-slate-100 rounded">0.0.0.0/0</td><td className="px-4 py-3 text-slate-500">Allow public HTTPS</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">SSH</td><td className="px-4 py-3">TCP</td><td className="px-4 py-3 font-mono">22</td><td className="px-4 py-3 font-mono text-xs bg-slate-100 rounded">10.0.0.0/8</td><td className="px-4 py-3 text-slate-500">Corp Network only</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="flex items-start gap-4 bg-blue-50/80 border border-blue-100 text-blue-900 p-5 rounded-xl shadow-sm">
            <Shield className="w-6 h-6 shrink-0 mt-0.5 text-blue-600" />
            <div className="text-sm shadow-none leading-relaxed text-blue-800">
              <strong className="text-blue-900 mb-1 block">Best Practice Architecture</strong> 
              Avoid using <code className="bg-blue-100 px-1.5 py-0.5 rounded text-blue-900 px-1">0.0.0.0/0</code> for management ports like SSH (22) or RDP (3389). Restrict these ports to specific VPN/corporate IPs. Even better, use <strong>AWS Systems Manager (SSM) Session Manager</strong> to eliminate the need for open inbound SSH rules entirely.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline Icon to fix missing import Error
function ArrowDown(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M19 12l-7 7-7-7"/>
    </svg>
  );
}
