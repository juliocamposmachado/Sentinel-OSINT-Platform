export enum RiskLevel {
  LOW = 'BAIXO',
  MEDIUM = 'MÉDIO',
  HIGH = 'ALTO',
  CRITICAL = 'CRÍTICO'
}

export enum SourceType {
  SOCIAL_MEDIA = 'REDE SOCIAL',
  NEWS = 'NOTÍCIA',
  FORUM = 'FÓRUM',
  DARK_WEB = 'DEEP/DARK WEB (SIMULADO)',
  PUBLIC_DB = 'BASE PÚBLICA'
}

export interface Evidence {
  id: string;
  sourceUrl: string;
  sourceType: SourceType;
  content: string; // Text content or description
  imageUrl?: string;
  timestamp: string;
  collectedBy: string;
  status: 'PENDING' | 'ANALYZED' | 'ARCHIVED';
  aiAnalysis?: AIAnalysisResult;
}

export interface AIAnalysisResult {
  summary: string;
  entities: string[];
  riskLevel: RiskLevel;
  riskJustification: string;
  visualElements?: string[]; // For image analysis
  sentiment: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  targetId?: string;
  ipAddress: string;
  justification: string;
}

export interface CaseFile {
  id: string;
  title: string;
  description: string;
  status: 'OPEN' | 'CLOSED' | 'UNDER_REVIEW';
  evidenceCount: number;
  lastUpdate: string;
}
