import React from 'react';
import { Facebook, Instagram, Linkedin, Github } from 'lucide-react';

const SocialLinks: React.FC = () => {
  return (
    <div className="flex space-x-4">
      <a href="#" className="text-slate-500 hover:text-blue-500 transition-colors"><Facebook className="w-5 h-5" /></a>
      <a href="#" className="text-slate-500 hover:text-pink-500 transition-colors"><Instagram className="w-5 h-5" /></a>
      <a href="#" className="text-slate-500 hover:text-blue-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
      <a href="#" className="text-slate-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-8 mt-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-amber-500 font-bold text-lg tracking-wide">Like Look Solutions</p>
            <p className="text-slate-500 text-xs mt-1">Autor & Dev: <span className="text-slate-300">Julio Campos Machado</span></p>
             <p className="text-slate-600 text-[10px] mt-1 italic">Série Juliette Psicose - Todos os direitos reservados</p>
            <div className="flex flex-wrap gap-3 text-[10px] text-slate-600 mt-2 justify-center md:justify-start font-mono">
              <span className="hover:text-slate-400 transition-colors cursor-default">+55 11 99294-6628</span>
              <span className="text-slate-800">•</span>
              <span className="hover:text-slate-400 transition-colors cursor-default">+55 11 97060-3441</span>
            </div>
          </div>
          <SocialLinks />
        </div>
        <div className="text-center text-[10px] text-slate-800 mt-6 border-t border-slate-900 pt-4">
          &copy; {new Date().getFullYear()} CineGenesis AI para Like Look Solutions.
        </div>
      </footer>
  );
};

export default Footer;