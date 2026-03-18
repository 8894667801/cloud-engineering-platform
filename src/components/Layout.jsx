import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Shield, Users, MonitorSmartphone, Cloud, LayoutDashboard, Bell, Search } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { path: '/', label: 'Overview', icon: LayoutDashboard },
  { path: '/identity', label: 'Identity & Access', icon: Users },
  { path: '/devices', label: 'Device Management', icon: MonitorSmartphone },
  { path: '/security', label: 'Security Posture', icon: Shield },
  { path: '/aws', label: 'AWS Cloud', icon: Cloud },
];

export default function Layout() {
  const location = useLocation();
  const currentPathName = navItems.find(item => item.path === (location.pathname === '/' ? '/' : location.pathname))?.label || 'Dashboard';

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-20">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-500" />
            <div>
              <h1 className="font-bold text-xl tracking-tight">CloudOps</h1>
              <p className="text-xs text-blue-400 font-medium">Engineering Platform</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Core Modules</div>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
                  isActive 
                    ? 'bg-blue-600 shadow-md shadow-blue-900/20 text-white' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                )
              }
            >
              <item.icon className={clsx("w-5 h-5 transition-transform group-hover:scale-110", "opacity-80")} />
              <span className="font-medium text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-800 mt-auto">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-sm shadow-inner ring-2 ring-slate-700">
              NS
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold">Neeraj Sharma</span>
              <span className="text-xs text-slate-400">Cloud Architect</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0 sticky top-0 z-10 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800">{currentPathName}</h2>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="pl-9 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-all"
              />
            </div>
            <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-8 relative">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
