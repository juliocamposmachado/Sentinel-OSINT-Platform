import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import Collection from './pages/Collection';
import Cases from './pages/Cases';
import Audit from './pages/Audit';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-slate-950 text-slate-200 font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col ml-64">
          <TopBar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-950 relative">
            {/* Watermark */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.02] select-none overflow-hidden">
               <p className="text-9xl font-black transform -rotate-45 whitespace-nowrap">CONFIDENTIAL</p>
            </div>
            
            <div className="relative z-10">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/cases" element={<Cases />} />
                <Route path="/audit" element={<Audit />} />
                <Route path="/reports" element={<div className="p-10 text-center text-slate-500">Módulo de Relatórios em Desenvolvimento</div>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
