import React from 'react';
import { FileText, Download, Filter, Calendar, Plus, Shield } from 'lucide-react';

const Reports: React.FC = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Relatórios de Inteligência</h2>
          <p className="text-slate-400 mt-1">
            Geração de documentos oficiais e exportação de dados para inquéritos.
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium flex items-center transition-colors shadow-lg shadow-blue-900/20">
          <Plus className="w-4 h-4 mr-2" />
          Novo Relatório
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center text-slate-400 text-sm font-medium">
            <Filter className="w-4 h-4 mr-2" />
            Filtros:
            </div>
            <select className="bg-slate-900 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
            <option>Todos os Tipos</option>
            <option>Relatório de Missão</option>
            <option>Análise de Risco</option>
            <option>Dossiê de Alvo</option>
            </select>
            <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg px-3 py-2">
            <Calendar className="w-4 h-4 text-slate-500 mr-2" />
            <input type="date" className="bg-transparent text-slate-300 text-sm focus:outline-none" />
            </div>
        </div>
        <span className="text-xs text-slate-500">Mostrando 3 de 42 documentos</span>
      </div>

      {/* Reports List */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-xl">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-700 bg-slate-900/50 text-xs font-mono text-slate-500 uppercase tracking-wider font-bold hidden md:grid">
            <div className="col-span-5">Documento</div>
            <div className="col-span-2">Classificação</div>
            <div className="col-span-3">Autor</div>
            <div className="col-span-2 text-right">Ações</div>
        </div>

        {/* Mock Data Items */}
        {[1, 2, 3].map((item) => (
            <div key={item} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors group">
                <div className="col-span-5 flex items-start space-x-3">
                    <div className="p-2 bg-slate-700/50 rounded text-slate-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                        <FileText className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-slate-200 group-hover:text-white">Relatório de Inteligência #{202400 + item}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Operação "Vigilância Digital" - Fase {item}</p>
                    </div>
                </div>
                <div className="col-span-2 flex items-center">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold border flex items-center ${
                        item === 1 ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                        item === 2 ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                        <Shield className="w-3 h-3 mr-1" />
                        {item === 1 ? 'SECRETO' : item === 2 ? 'CONFIDENCIAL' : 'RESTRITO'}
                    </span>
                </div>
                <div className="col-span-3 text-sm text-slate-400 flex items-center">
                    <div className="w-6 h-6 rounded-full bg-slate-600 mr-2 flex items-center justify-center text-[10px] text-white font-bold border border-slate-500">AS</div>
                    Agente Silva
                </div>
                <div className="col-span-2 flex justify-end space-x-2">
                    <button className="p-2 hover:bg-slate-600 rounded-lg text-slate-400 hover:text-white transition-colors" title="Download PDF">
                        <Download className="w-4 h-4" />
                    </button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;