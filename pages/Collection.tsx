import React, { useState } from 'react';
import { Search, Upload, Link as LinkIcon, AlertCircle, CheckCircle } from 'lucide-react';
import { Evidence, SourceType } from '../types';

const Collection: React.FC = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [inputType, setInputType] = useState<SourceType>(SourceType.SOCIAL_MEDIA);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleCollection = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg(null);

    // Simulate API call delay for scraping
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg(`Coleta iniciada para: ${inputUrl}. ID de Rastreio: TRK-${Math.floor(Math.random() * 10000)}`);
      setInputUrl('');
    }, 2000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Coleta de Fontes Abertas (OSINT)</h2>
        <p className="text-slate-400 mt-1">
          Insira URLs ou parâmetros para iniciar a coleta automatizada em conformidade com a LGPD.
          Apenas dados publicamente acessíveis serão processados.
        </p>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 shadow-lg">
        <form onSubmit={handleCollection} className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Tipo de Fonte</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {Object.values(SourceType).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setInputType(type)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                    inputType === type
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">URL Alvo / Termo de Busca</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LinkIcon className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="text"
                required
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none sm:text-sm transition-shadow"
                placeholder="https://twitter.com/usuario/status/..."
              />
            </div>
            <p className="mt-2 text-xs text-slate-500 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              O sistema registrará automaticamente sua ID e timestamp para auditoria.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Justificativa Legal (Obrigatório)</label>
            <select className="block w-full px-3 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none sm:text-sm">
              <option>Investigação Preliminar (IP)</option>
              <option>Inquérito Policial em Curso</option>
              <option>Ordem Judicial Específica</option>
              <option>Monitoramento de Risco Iminente</option>
            </select>
          </div>

          <div className="pt-4 border-t border-slate-700 flex justify-between items-center">
            <button type="button" className="flex items-center text-sm text-slate-400 hover:text-white transition-colors">
              <Upload className="w-4 h-4 mr-2" />
              Upload Manual de Arquivo
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-bold text-white flex items-center shadow-lg transition-all ${
                loading
                  ? 'bg-slate-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500 hover:shadow-blue-500/20'
              }`}
            >
              {loading ? (
                <>
                  <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
                  Processando...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Iniciar Coleta
                </>
              )}
            </button>
          </div>
        </form>

        {successMsg && (
          <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center text-green-400 animate-fade-in">
            <CheckCircle className="w-5 h-5 mr-3" />
            {successMsg}
          </div>
        )}
      </div>
      
      <div className="mt-8 p-4 border border-dashed border-slate-700 rounded-lg bg-slate-800/50">
         <h4 className="text-sm font-bold text-slate-400 uppercase mb-2">Disclaimer LGPD</h4>
         <p className="text-xs text-slate-500 leading-relaxed">
           Esta ferramenta deve ser utilizada estritamente para fins de segurança pública, defesa nacional, segurança do Estado ou atividades de investigação e repressão de infrações penais (Art. 4º, III, LGPD). Todo acesso é logado e auditável. A coleta de dados pessoais sensíveis deve observar os princípios da necessidade e proporcionalidade.
         </p>
      </div>
    </div>
  );
};

export default Collection;
