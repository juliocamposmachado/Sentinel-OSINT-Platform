import React from 'react';
import { Bell, HelpCircle, User } from 'lucide-react';

const TopBar: React.FC = () => {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40 ml-64">
      <div className="flex items-center">
        <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-wide">
          CONFIDENCIAL - USO OFICIAL APENAS
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
        </button>
        <button className="p-2 text-slate-400 hover:text-white transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>
        <div className="w-px h-6 bg-slate-700 mx-2"></div>
        <div className="flex items-center space-x-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-slate-200">Agente Silva</p>
            <p className="text-xs text-slate-500">Divisão de Inteligência</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
            <User className="w-5 h-5 text-slate-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
