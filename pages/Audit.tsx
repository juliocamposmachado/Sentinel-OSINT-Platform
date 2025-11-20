import React from 'react';
import { ShieldCheck, Download } from 'lucide-react';
import { AuditLogEntry } from '../types';

const Audit: React.FC = () => {
  // Mock Data
  const logs: AuditLogEntry[] = [
    { id: 'LOG-9921', timestamp: '2023-10-27T14:30:00Z', user: 'AGT. 4920-SP', action: 'VIEW_EVIDENCE', targetId: 'EVD-8921', ipAddress: '10.20.1.45', justification: 'Análise de rotina' },
    { id: 'LOG-9920', timestamp: '2023-10-27T14:25:12Z', user: 'AGT. 4920-SP', action: 'AI_ANALYSIS_REQ', targetId: 'EVD-8921', ipAddress: '10.20.1.45', justification: 'Extração de entidades' },
    { id: 'LOG-9919', timestamp: '2023-10-27T10:15:00Z', user: 'ADM. SYSTEM', action: 'SYSTEM_BACKUP', targetId: 'DB-MAIN', ipAddress: 'LOCALHOST', justification: 'Rotina agendada' },
    { id: 'LOG-9918', timestamp: '2023-10-27T09:00:00Z', user: 'AGT. 3310-RJ', action: 'LOGIN_SUCCESS', targetId: '-', ipAddress: '192.168.0.12', justification: '-' },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            <ShieldCheck className="w-6 h-6 mr-2 text-green-500" />
            Trilha de Auditoria
          </h2>
          <p className="text-slate-400 mt-1">Registro imutável de todas as operações do sistema.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 transition-colors">
          <Download className="w-4 h-4 mr-2" />
          Exportar Logs (Assinado Digitalmente)
        </button>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-950 uppercase font-mono text-xs tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Usuário</th>
                <th className="px-6 py-4">Ação</th>
                <th className="px-6 py-4">Alvo</th>
                <th className="px-6 py-4">IP Origem</th>
                <th className="px-6 py-4">Hash Integridade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/30 transition-colors font-mono text-xs">
                  <td className="px-6 py-4 text-slate-300">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="px-6 py-4 text-blue-400 font-bold">{log.user}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded bg-slate-800 border border-slate-700 ${log.action.includes('DELETE') ? 'text-red-400' : 'text-slate-300'}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4">{log.targetId}</td>
                  <td className="px-6 py-4">{log.ipAddress}</td>
                  <td className="px-6 py-4 text-slate-600 truncate max-w-[150px]" title="Hash SHA-256 simulado">
                    e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Audit;
