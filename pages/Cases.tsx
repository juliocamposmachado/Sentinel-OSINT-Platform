import React, { useState, useRef } from 'react';
import { analyzeEvidence } from '../services/geminiService';
import { Evidence, RiskLevel, SourceType, AIAnalysisResult } from '../types';
import { FileText, Cpu, AlertTriangle, Check, Image as ImageIcon, X, Search } from 'lucide-react';

const Cases: React.FC = () => {
  // Mock initial state
  const [evidences, setEvidences] = useState<Evidence[]>([
    {
      id: 'EVD-8921',
      sourceUrl: 'https://social.mock/p/123',
      sourceType: SourceType.SOCIAL_MEDIA,
      content: 'Reunião confirmada para amanhã na praça central. Tragam os equipamentos. Ninguém vai nos impedir dessa vez.',
      timestamp: new Date().toISOString(),
      collectedBy: 'AGT. 4920-SP',
      status: 'PENDING',
      imageUrl: 'https://picsum.photos/800/450' // Placeholder
    },
    {
      id: 'EVD-8922',
      sourceUrl: 'https://news.mock/article/riot',
      sourceType: SourceType.NEWS,
      content: 'Relatos de movimentação atípica no setor norte da cidade. Fontes indicam organização de grupos não identificados.',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      collectedBy: 'AGT. 4920-SP',
      status: 'PENDING'
    }
  ]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);

  // Helper to convert image URL to Base64 for the API demo (since we can't actually fetch cors images in browser easily without proxy, we will mock or fetch if possible. For this demo, we'll rely on text analysis primarily unless user uploads).
  // However, standard picsum images might be tainted canvas. 
  // WE WILL SIMULATE IMAGE UPLOAD FOR GEMINI DEMO in the detail view.

  const selectedEvidence = evidences.find(e => e.id === selectedId);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAnalysis = async () => {
    if (!selectedEvidence) return;

    setAnalyzing(true);
    setAnalysisResult(null);

    // If there's a real user uploaded image (simulated here by just checking property), pass it.
    // For the demo, we will fetch the placeholder as blob to convert to base64 to prove the concept? 
    // Actually, fetching picsum might fail due to CORS. 
    // Let's assume text analysis mainly, or allow user to upload a local file to test vision.

    let imageBase64: string | undefined = undefined;
    
    // Simulating getting the image data if it was a real local file or proxy available
    // For the purpose of this code generation, we will rely on the text content heavily, 
    // but I will implement the image reader if the user uploads a file in the interface.

    const result = await analyzeEvidence(selectedEvidence.content, imageBase64);
    
    setAnalysisResult(result);
    
    // Update local state
    const updatedEvidences = evidences.map(e => {
        if(e.id === selectedId) {
            return { ...e, status: 'ANALYZED' as const, aiAnalysis: result };
        }
        return e;
    });
    setEvidences(updatedEvidences);
    setAnalyzing(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
     if(file && selectedEvidence) {
         const reader = new FileReader();
         reader.onloadend = async () => {
             const base64 = reader.result as string;
             // Run analysis with this image
             setAnalyzing(true);
             const result = await analyzeEvidence(selectedEvidence.content, base64);
             setAnalysisResult(result);
             
             const updatedEvidences = evidences.map(ev => {
                if(ev.id === selectedId) {
                    return { 
                        ...ev, 
                        imageUrl: base64, // Update to show local image
                        status: 'ANALYZED' as const, 
                        aiAnalysis: result 
                    };
                }
                return ev;
            });
            setEvidences(updatedEvidences);
            setAnalyzing(false);
         };
         reader.readAsDataURL(file);
     }
  };

  const getRiskColor = (level?: RiskLevel) => {
    switch (level) {
      case RiskLevel.CRITICAL: return 'text-red-500 border-red-500/50 bg-red-500/10';
      case RiskLevel.HIGH: return 'text-orange-500 border-orange-500/50 bg-orange-500/10';
      case RiskLevel.MEDIUM: return 'text-yellow-500 border-yellow-500/50 bg-yellow-500/10';
      case RiskLevel.LOW: return 'text-blue-500 border-blue-500/50 bg-blue-500/10';
      default: return 'text-slate-500 border-slate-500/50 bg-slate-500/10';
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* List */}
      <div className="w-1/3 border-r border-slate-800 overflow-y-auto bg-slate-900/50">
        <div className="p-4 border-b border-slate-800 sticky top-0 bg-slate-900/95 backdrop-blur z-10">
          <h2 className="font-bold text-white">Evidências Pendentes</h2>
        </div>
        <div className="divide-y divide-slate-800">
          {evidences.map((evidence) => (
            <div
              key={evidence.id}
              onClick={() => { setSelectedId(evidence.id); setAnalysisResult(evidence.aiAnalysis || null); }}
              className={`p-4 cursor-pointer hover:bg-slate-800 transition-colors ${selectedId === evidence.id ? 'bg-slate-800 border-l-4 border-blue-500' : ''}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono text-slate-500">{evidence.id}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${evidence.status === 'ANALYZED' ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'}`}>
                    {evidence.status === 'PENDING' ? 'PENDENTE' : 'ANALISADO'}
                </span>
              </div>
              <p className="text-sm text-slate-300 line-clamp-2 mb-2">{evidence.content}</p>
              <div className="flex items-center text-xs text-slate-500">
                <span className="mr-3">{evidence.sourceType}</span>
                <span>{new Date(evidence.timestamp).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail View */}
      <div className="w-2/3 overflow-y-auto bg-slate-950 p-8">
        {selectedEvidence ? (
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Detalhes da Evidência</h1>
                    <p className="text-sm text-slate-400 font-mono">{selectedEvidence.id} • Coletado por {selectedEvidence.collectedBy}</p>
                </div>
                <a 
                    href={selectedEvidence.sourceUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-blue-400 text-sm hover:underline flex items-center"
                >
                    Link Original <FileText className="w-3 h-3 ml-1" />
                </a>
            </div>

            {/* Content Card */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                <div className="p-6">
                    <p className="text-lg text-slate-200 leading-relaxed whitespace-pre-wrap">
                        "{selectedEvidence.content}"
                    </p>
                </div>
                {selectedEvidence.imageUrl && (
                    <div className="border-t border-slate-800 bg-black relative group">
                        <img 
                            src={selectedEvidence.imageUrl} 
                            alt="Evidence" 
                            className="w-full h-64 object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                            <p className="text-xs text-white font-mono">MÍDIA CAPTURADA</p>
                        </div>
                    </div>
                )}
                <div className="bg-slate-800/50 p-3 flex justify-end border-t border-slate-800">
                     <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileUpload} 
                        className="hidden" 
                        accept="image/*"
                     />
                     <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs text-slate-400 hover:text-white flex items-center mr-4"
                     >
                        <ImageIcon className="w-4 h-4 mr-1" /> Testar Upload Imagem Local
                     </button>
                </div>
            </div>

            {/* AI Analysis Section */}
            <div className="border-t border-slate-800 pt-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white flex items-center">
                        <Cpu className="w-5 h-5 mr-2 text-purple-500" />
                        Análise Gemini AI
                    </h3>
                    {!analysisResult && (
                        <button
                            onClick={handleAnalysis}
                            disabled={analyzing}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center"
                        >
                            {analyzing ? (
                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                            ) : (
                                <span className="mr-2">✨</span>
                            )}
                            {analyzing ? 'Processando...' : 'Gerar Análise'}
                        </button>
                    )}
                </div>

                {analyzing && (
                     <div className="p-8 border border-slate-800 rounded-xl bg-slate-900/50 text-center">
                        <p className="text-slate-400 animate-pulse">Analisando padrões semânticos e visuais...</p>
                     </div>
                )}

                {analysisResult && (
                    <div className="space-y-4 animate-fade-in">
                        {/* Risk Badge */}
                        <div className={`p-4 rounded-xl border flex items-start ${getRiskColor(analysisResult.riskLevel)}`}>
                            <AlertTriangle className="w-6 h-6 mr-3 flex-shrink-0" />
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider opacity-70">Nível de Risco Estimado</p>
                                <h4 className="text-xl font-bold">{analysisResult.riskLevel}</h4>
                                <p className="text-sm mt-1 opacity-90">{analysisResult.riskJustification}</p>
                            </div>
                        </div>

                        {/* Summary Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                                <h4 className="text-sm font-bold text-slate-400 mb-2 uppercase">Resumo Factual</h4>
                                <p className="text-sm text-slate-300">{analysisResult.summary}</p>
                            </div>
                             <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                                <h4 className="text-sm font-bold text-slate-400 mb-2 uppercase">Sentimento Detectado</h4>
                                <p className="text-sm text-slate-300">{analysisResult.sentiment}</p>
                            </div>
                        </div>

                        {/* Entities */}
                        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                             <h4 className="text-sm font-bold text-slate-400 mb-3 uppercase">Entidades Identificadas</h4>
                             <div className="flex flex-wrap gap-2">
                                {analysisResult.entities.length > 0 ? (
                                    analysisResult.entities.map((ent, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-blue-300">
                                            {ent}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-xs text-slate-500">Nenhuma entidade específica detectada.</span>
                                )}
                             </div>
                        </div>
                        
                         {/* Visual Elements (if any) */}
                         {analysisResult.visualElements && analysisResult.visualElements.length > 0 && (
                            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                                 <h4 className="text-sm font-bold text-slate-400 mb-3 uppercase">Elementos Visuais</h4>
                                 <div className="flex flex-wrap gap-2">
                                    {analysisResult.visualElements.map((el, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-purple-300">
                                            {el}
                                        </span>
                                    ))}
                                 </div>
                            </div>
                        )}

                        <div className="p-3 rounded bg-slate-800/50 border border-slate-800 text-xs text-slate-500">
                            <p>Disclaimer: Análise gerada por IA (Gemini Flash). A validação humana é obrigatória para qualquer procedimento legal.</p>
                        </div>
                    </div>
                )}
            </div>

          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-500">
            <div className="p-6 bg-slate-900 rounded-full mb-4">
                <Search className="w-12 h-12 text-slate-600" />
            </div>
            <p>Selecione uma evidência para análise</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cases;