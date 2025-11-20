import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  FileText, 
  ShieldAlert, 
  Archive, 
  Settings, 
  Lock, 
  Briefcase,
  ChevronDown,
  ChevronRight,
  Database,
  FileCheck,
  AlertTriangle,
  Download
} from 'lucide-react';

interface SubMenuItem {
  path: string;
  label: string;
  icon?: React.ElementType;
}

interface NavItem {
  path?: string;
  icon: React.ElementType;
  label: string;
  submenu?: SubMenuItem[];
}

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  // Expande automaticamente o menu se estivermos em uma rota filha
  useEffect(() => {
    navItems.forEach(item => {
      if (item.submenu) {
        const isChildActive = item.submenu.some(sub => location.pathname === sub.path);
        if (isChildActive && !expandedMenus.includes(item.label)) {
          setExpandedMenus(prev => [...prev, item.label]);
        }
      }
    });
  }, [location.pathname]);

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label) 
        : [...prev, label]
    );
  };

  const navItems: NavItem[] = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard Operacional' },
    { path: '/collection', icon: Search, label: 'Coleta OSINT' },
    { 
      label: 'Casos & Evidências', 
      icon: FileText,
      submenu: [
        { path: '/cases', label: 'Todos os Casos', icon: Database },
        { path: '/cases/pending', label: 'Análise Pendente', icon: AlertTriangle },
        { path: '/cases/archived', label: 'Arquivados', icon: Archive }
      ]
    },
    { path: '/tools', icon: Briefcase, label: 'Ferramentas Externas' },
    { 
      label: 'Auditoria & Logs', 
      icon: ShieldAlert,
      submenu: [
        { path: '/audit', label: 'Logs do Sistema', icon: FileCheck },
        { path: '/audit/alerts', label: 'Alertas de Segurança', icon: AlertTriangle },
        { path: '/audit/export', label: 'Exportar Dados', icon: Download }
      ]
    },
    { path: '/reports', icon: FileText, label: 'Relatórios Oficiais' },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col fixed left-0 top-0 z-50 overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="p-6 flex items-center space-x-3 border-b border-slate-800 sticky top-0 bg-slate-900 z-10">
        <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-900/30">
          <Lock className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white tracking-tight">SENTINEL</h1>
          <p className="text-[10px] text-blue-400 font-mono tracking-widest">OSINT PLATFORM</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const hasSubmenu = !!item.submenu;
          const isExpanded = expandedMenus.includes(item.label);
          const isActiveParent = hasSubmenu && item.submenu?.some(sub => location.pathname === sub.path);
          const isExactActive = !hasSubmenu && location.pathname === item.path;

          return (
            <div key={item.label} className="mb-1">
              {/* Item Principal */}
              <div
                onClick={() => hasSubmenu ? toggleMenu(item.label) : null}
                className={`relative group flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isExactActive || isActiveParent
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'
                }`}
              >
                {hasSubmenu ? (
                  <div className="flex items-center w-full">
                    <item.icon className={`w-5 h-5 mr-3 ${isExactActive || isActiveParent ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                    <span className="flex-1">{item.label}</span>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 opacity-70" />
                    ) : (
                      <ChevronRight className="w-4 h-4 opacity-70" />
                    )}
                  </div>
                ) : (
                  <Link to={item.path!} className="flex items-center w-full">
                    <item.icon className={`w-5 h-5 mr-3 ${isExactActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                    <span>{item.label}</span>
                  </Link>
                )}
                
                {/* Active Indicator Bar for Parent */}
                {(isExactActive || isActiveParent) && (
                   <div className="absolute left-0 top-2 bottom-2 w-1 bg-blue-500 rounded-r"></div>
                )}
              </div>

              {/* Submenu */}
              {hasSubmenu && isExpanded && (
                <div className="mt-1 ml-4 pl-4 border-l border-slate-800 space-y-1 animate-fade-in-down">
                  {item.submenu?.map((sub) => {
                    const isSubActive = location.pathname === sub.path;
                    return (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className={`flex items-center px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                          isSubActive
                            ? 'text-white bg-slate-800'
                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                        }`}
                      >
                        {sub.icon && <sub.icon className="w-3 h-3 mr-2 opacity-70" />}
                        {sub.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <button className="flex items-center px-3 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 w-full transition-colors group">
          <Settings className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform duration-500" />
          Configurações
        </button>
        <div className="mt-4 bg-slate-950 rounded p-3 border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-1">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
          </div>
          <p className="text-[10px] text-slate-500 uppercase font-bold mb-1 tracking-wider">Credencial Ativa</p>
          <p className="text-xs text-slate-300 font-mono font-bold">AGT. 4920-SP</p>
          <p className="text-[9px] text-slate-600 mt-1 truncate">Sessão segura: TLS 1.3</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;