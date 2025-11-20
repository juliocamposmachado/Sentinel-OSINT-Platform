import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Search, FileText, ShieldAlert, Archive, Settings, Lock } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard Operacional' },
    { path: '/collection', icon: Search, label: 'Coleta OSINT' },
    { path: '/cases', icon: FileText, label: 'Casos & Evidências' },
    { path: '/audit', icon: ShieldAlert, label: 'Auditoria & Logs' },
    { path: '/reports', icon: Archive, label: 'Relatórios' },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center space-x-3 border-b border-slate-800">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Lock className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white tracking-tight">SENTINEL</h1>
          <p className="text-xs text-blue-400 font-mono">OSINT PLATFORM</p>
        </div>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center px-3 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 w-full transition-colors">
          <Settings className="w-5 h-5 mr-3" />
          Configurações
        </button>
        <div className="mt-4 bg-slate-950 rounded p-3 border border-slate-800">
          <p className="text-xs text-slate-500 uppercase font-bold mb-1">Credencial</p>
          <p className="text-xs text-slate-300 font-mono">AGT. 4920-SP</p>
          <p className="text-[10px] text-green-500 mt-1 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
            CONEXÃO SEGURA
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
