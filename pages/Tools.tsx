import React, { useState } from 'react';
import { ExternalLink, Search, Globe, Map, Users, Camera, Shield, Database, Phone, Mail, FileArchive, MonitorSmartphone } from 'lucide-react';

interface Tool {
  name: string;
  url: string;
  description: string;
}

interface Category {
  title: string;
  icon: React.ElementType;
  tools: Tool[];
}

const Tools: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const categories: Category[] = [
    {
      title: "Busca de Usuários (Username)",
      icon: Users,
      tools: [
        { name: "Namechk", url: "https://namechk.com/", description: "Verifica disponibilidade de username em centenas de sites." },
        { name: "WhatsMyName", url: "https://whatsmyname.app/", description: "Enumeração rápida de contas por nome de usuário." },
        { name: "Sherlock (GitHub)", url: "https://github.com/sherlock-project/sherlock", description: "Ferramenta CLI popular para rastrear contas sociais." },
        { name: "Instant Username", url: "https://instantusername.com/", description: "Busca em tempo real em mais de 100 redes sociais." },
        { name: "KnowEm", url: "https://knowem.com/", description: "Verificação de marca e perfil em 500+ redes." }
      ]
    },
    {
      title: "Email e Vazamentos",
      icon: Mail,
      tools: [
        { name: "Have I Been Pwned", url: "https://haveibeenpwned.com/", description: "Verifica se emails vazaram em brechas de dados conhecidas." },
        { name: "Epieos", url: "https://epieos.com/", description: "Investigação de email (Google, Skype) sem notificar o alvo." },
        { name: "Hunter.io", url: "https://hunter.io/", description: "Identifica padrões de emails corporativos e contatos." },
        { name: "Dehashed", url: "https://dehashed.com/", description: "Motor de busca para credenciais e hashes vazados (Pago)." },
        { name: "EmailRep.io", url: "https://emailrep.io/", description: "Reputação de email e presença em redes sociais." }
      ]
    },
    {
      title: "Telefone e Contato",
      icon: Phone,
      tools: [
        { name: "Truecaller", url: "https://www.truecaller.com/", description: "Identificação de números de telefone (Base global)." },
        { name: "Sync.me", url: "https://sync.me/", description: "Sincronização de contatos e identificação de chamadas." },
        { name: "Infobel", url: "https://www.infobel.com/", description: "Diretório telefônico internacional." },
        { name: "PhoneInfoga", url: "https://github.com/sundowndev/phoneinfoga", description: "Framework avançado para coleta de info de números." }
      ]
    },
    {
      title: "Mapas e Geolocalização",
      icon: Map,
      tools: [
        { name: "Google Earth Pro", url: "https://earth.google.com/web/", description: "Imagens de satélite e visualização 3D." },
        { name: "Yandex Maps", url: "https://yandex.com/maps/", description: "Mapas detalhados com cobertura superior no leste europeu." },
        { name: "SunCalc", url: "https://suncalc.org/", description: "Analisa posição do sol para cronolocalização de fotos." },
        { name: "MapChecking", url: "https://www.mapchecking.com/", description: "Estimativa de multidões baseada em área." },
        { name: "Wikimapia", url: "https://wikimapia.org/", description: "Mapa colaborativo descrevendo locais e prédios." }
      ]
    },
    {
      title: "Análise de Imagens (IMINT)",
      icon: Camera,
      tools: [
        { name: "TinEye", url: "https://tineye.com/", description: "Busca reversa focada em encontrar a fonte original." },
        { name: "Yandex Images", url: "https://yandex.com/images/", description: "Excelente reconhecimento facial e de cenários." },
        { name: "PimEyes", url: "https://pimeyes.com/", description: "Busca facial avançada na surface web." },
        { name: "FotoForensics", url: "https://fotoforensics.com/", description: "Análise ELA (Error Level Analysis) para detecção de fraudes." },
        { name: "InVID", url: "https://www.invid-project.eu/", description: "Plugin para verificação de vídeos e fake news." }
      ]
    },
    {
      title: "Domínios e IP (Infraestrutura)",
      icon: Globe,
      tools: [
        { name: "Shodan", url: "https://www.shodan.io/", description: "O 'Google' dos dispositivos conectados (IoT, Câmeras, Servidores)." },
        { name: "Whois.com", url: "https://www.whois.com/", description: "Dados de registro de domínio e proprietários." },
        { name: "DNSDumpster", url: "https://dnsdumpster.com/", description: "Mapeamento visual de DNS e subdomínios." },
        { name: "UrlScan.io", url: "https://urlscan.io/", description: "Scanner de sites para análise de comportamento e phishing." },
        { name: "ViewDNS.info", url: "https://viewdns.info/", description: "Kit de ferramentas DNS (IP History, Reverse Whois)." }
      ]
    },
    {
      title: "Redes Sociais (SOCMINT)",
      icon: MonitorSmartphone,
      tools: [
        { name: "Twitter Advanced Search", url: "https://twitter.com/search-advanced", description: "Busca nativa avançada do X/Twitter." },
        { name: "Sotwe", url: "https://www.sotwe.com/", description: "Visualizador de Twitter sem conta e logs." },
        { name: "Picuki", url: "https://www.picuki.com/", description: "Editor e visualizador de Instagram anônimo." },
        { name: "SnapMap", url: "https://map.snapchat.com/", description: "Mapa de stories públicos do Snapchat." },
        { name: "Telegram Web", url: "https://web.telegram.org/", description: "Acesso a canais públicos e grupos." }
      ]
    },
    {
      title: "Arquivos e Motores Avançados",
      icon: FileArchive,
      tools: [
        { name: "Wayback Machine", url: "https://archive.org/web/", description: "Máquina do tempo da internet (sites deletados)." },
        { name: "Google Dorks (Exploit-DB)", url: "https://www.exploit-db.com/google-hacking-database", description: "Banco de dados de operadores de busca avançada." },
        { name: "Carrot2", url: "https://search.carrot2.org/", description: "Organiza resultados de busca em clusters temáticos." },
        { name: "OCCRP Aleph", url: "https://aleph.occrp.org/", description: "Arquivo global de dados para jornalismo investigativo." }
      ]
    },
    {
      title: "Dark Web e Cripto (Simulado)",
      icon: Shield,
      tools: [
        { name: "Ahmia.fi", url: "https://ahmia.fi/", description: "Motor de busca para a rede Tor (Onion services)." },
        { name: "Blockchain.com Explorer", url: "https://www.blockchain.com/explorer", description: "Rastreamento de transações Bitcoin/Ethereum." },
        { name: "Tor Browser", url: "https://www.torproject.org/", description: "Navegador essencial para acesso à Dark Web." }
      ]
    }
  ];

  // Filter logic
  const filteredCategories = categories.map(cat => ({
    ...cat,
    tools: cat.tools.filter(t => 
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.tools.length > 0);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Database className="w-6 h-6 mr-3 text-blue-500" />
          Framework de Ferramentas OSINT
        </h2>
        <p className="text-slate-400 mt-2 max-w-3xl">
          Coleção curada de ferramentas externas essenciais para investigação digital, cobrindo Username, Email, Geolocalização e mais.
          <span className="text-amber-500 block mt-1 text-xs uppercase font-bold border-l-2 border-amber-500 pl-2 mt-2">
            Atenção: O uso destas ferramentas deve seguir estritamente a legislação vigente. Não insira dados sigilosos de inquéritos em plataformas de terceiros.
          </span>
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8 sticky top-20 z-30">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-500" />
        </div>
        <input
          type="text"
          placeholder="Buscar ferramenta (ex: instagram, ip, mapa, cpf)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-4 bg-slate-900/90 backdrop-blur border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none text-sm transition-all shadow-lg"
        />
      </div>

      {/* Grid Layout */}
      <div className="space-y-8 pb-12">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, idx) => (
            <div key={idx} className="animate-fade-in">
              <div className="flex items-center mb-4 border-b border-slate-800 pb-2 sticky top-36 bg-slate-950/80 backdrop-blur z-20">
                <category.icon className="w-5 h-5 text-blue-400 mr-2" />
                <h3 className="text-lg font-bold text-slate-200">{category.title}</h3>
                <span className="ml-2 text-xs text-slate-600 bg-slate-900 px-2 py-0.5 rounded-full">{category.tools.length}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {category.tools.map((tool, tIdx) => (
                  <a
                    key={tIdx}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col p-4 bg-slate-900 rounded-lg border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 transition-all duration-200 relative overflow-hidden h-full"
                  >
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="w-3 h-3 text-blue-400" />
                    </div>
                    <h4 className="font-bold text-slate-300 group-hover:text-blue-400 transition-colors mb-2 text-sm">
                      {tool.name}
                    </h4>
                    <p className="text-xs text-slate-500 group-hover:text-slate-400 leading-relaxed flex-1">
                      {tool.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl">
            <Search className="w-12 h-12 text-slate-700 mx-auto mb-3" />
            <p className="text-slate-500">Nenhuma ferramenta encontrada para "{searchTerm}".</p>
            <button onClick={() => setSearchTerm('')} className="mt-2 text-blue-500 text-sm hover:underline">Limpar busca</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tools;
