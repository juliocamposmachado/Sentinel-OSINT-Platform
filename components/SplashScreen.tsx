import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-[100] animate-fade-out">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full animate-pulse"></div>
        <div className="relative bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl flex items-center justify-center">
            <ShieldCheck className="w-24 h-24 text-blue-500 animate-bounce-slow" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-amber-500 p-2 rounded-lg border border-slate-900">
            <Lock className="w-6 h-6 text-slate-900" />
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
        SENTINEL <span className="text-blue-500">OSINT</span>
      </h1>
      
      <div className="flex items-center space-x-3 mb-8">
        <div className="h-px w-12 bg-slate-700"></div>
        <p className="text-slate-400 font-mono text-sm tracking-widest uppercase">Intelligence Platform</p>
        <div className="h-px w-12 bg-slate-700"></div>
      </div>

      <div className="absolute bottom-12 flex flex-col items-center">
        <p className="text-amber-500 font-bold text-lg mb-1 tracking-wide">Like Look Solutions</p>
        <p className="text-slate-600 text-xs uppercase tracking-widest">System Initializing...</p>
        <div className="w-32 h-1 bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-blue-600 animate-loading-bar"></div>
        </div>
      </div>

      <style>{`
        @keyframes loading-bar {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
        }
        .animate-loading-bar {
            animation: loading-bar 3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;