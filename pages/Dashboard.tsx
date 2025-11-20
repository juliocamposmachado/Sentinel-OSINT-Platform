import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, Eye, Database, Activity } from 'lucide-react';

// Mock Data
const activityData = [
  { name: '00h', collected: 40 },
  { name: '04h', collected: 30 },
  { name: '08h', collected: 200 },
  { name: '12h', collected: 450 },
  { name: '16h', collected: 390 },
  { name: '20h', collected: 180 },
  { name: '23h', collected: 90 },
];

const riskData = [
  { name: 'Baixo', value: 400, color: '#3b82f6' },
  { name: 'Médio', value: 300, color: '#eab308' },
  { name: 'Alto', value: 150, color: '#f97316' },
  { name: 'Crítico', value: 50, color: '#ef4444' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Dashboard Operacional</h2>
        <p className="text-slate-400 mt-1">Visão geral da coleta de dados e análise de riscos (Tempo Real)</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-medium uppercase">Evidências Coletadas</p>
              <h3 className="text-3xl font-bold text-white mt-2">12.482</h3>
            </div>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Database className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <p className="text-green-400 text-xs mt-4 flex items-center">
            <span className="mr-1">↑ 12%</span> nas últimas 24h
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-medium uppercase">Alertas Críticos</p>
              <h3 className="text-3xl font-bold text-white mt-2">5</h3>
            </div>
            <div className="p-2 bg-red-500/10 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
          </div>
          <p className="text-slate-500 text-xs mt-4">Necessitam revisão imediata</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-medium uppercase">Monitoramento Ativo</p>
              <h3 className="text-3xl font-bold text-white mt-2">84</h3>
            </div>
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Eye className="w-6 h-6 text-amber-500" />
            </div>
          </div>
          <p className="text-slate-500 text-xs mt-4">Perfis e páginas públicas</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-medium uppercase">Processamento AI</p>
              <h3 className="text-3xl font-bold text-white mt-2">98.2%</h3>
            </div>
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Activity className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <p className="text-green-400 text-xs mt-4">Operacional</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Volume Chart */}
        <div className="lg:col-span-2 bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-6">Volume de Ingestão de Dados (24h)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                  itemStyle={{ color: '#60a5fa' }}
                />
                <Area type="monotone" dataKey="collected" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCollected)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-6">Classificação de Risco</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
                {riskData.map((item) => (
                    <div key={item.name} className="flex items-center">
                        <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: item.color}}></span>
                        <span className="text-xs text-slate-400">{item.name}</span>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table (Simplified) */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">Ingestão Recente</h3>
        </div>
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-slate-900/50 uppercase font-medium">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Fonte</th>
              <th className="px-6 py-4">Tipo</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {[1, 2, 3, 4].map((i) => (
              <tr key={i} className="hover:bg-slate-700/50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-slate-500">EVD-{2024000 + i}</td>
                <td className="px-6 py-4 text-white">Twitter / X (Public)</td>
                <td className="px-6 py-4">Texto + Imagem</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500">
                    Em Análise
                  </span>
                </td>
                <td className="px-6 py-4">Hoje, 10:{30 + i}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
