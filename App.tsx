import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import Collection from './pages/Collection';
import Cases from './pages/Cases';
import Audit from './pages/Audit';
import Reports from './pages/Reports';
import SplashScreen from './components/SplashScreen';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500); // Duração da Splash Screen

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-slate-950 text-slate-200 font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col ml-64">
          <TopBar />
          <main className="flex-1 flex flex-col bg-slate-950 relative overflow-x-hidden overflow-y-auto">
            {/* Watermark */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.02] select-none overflow-hidden">
               <p className="text-9xl font-black transform -rotate-45 whitespace-nowrap">CONFIDENTIAL</p>
            </div>
            
            <div className="relative z-10 flex-1">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/cases" element={<Cases />} />
                <Route path="/audit" element={<Audit />} />
                <Route path="/reports" element={<Reports />} />
                {/* Redireciona qualquer rota desconhecida para a home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
            
            {/* Footer Integrado ao final do conteúdo principal */}
            <div className="relative z-10 mt-auto">
              <Footer />
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;