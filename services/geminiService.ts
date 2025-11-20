import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysisResult, RiskLevel } from "../types";

// Initialize client with process.env.API_KEY as per strict instructions
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Você é um assistente de análise de inteligência para segurança pública (OSINT).
Sua função é analisar dados públicos (texto e imagens) para identificar padrões, entidades e riscos potenciais.
DIRETRIZES ÉTICAS E LEGAIS (CRÍTICO):
1. NÃO faça julgamentos legais ou criminais. Apenas aponte fatos e correlações.
2. Respeite a LGPD. Não infira dados sensíveis (religião, orientação sexual, política) a menos que explicitamente relevante para um contexto de ameaça pública.
3. Sua análise é PROBABILÍSTICA e AUXILIAR.
4. Identifique objetos, locais, datas e intenções declaradas no texto/imagem.
`;

export const analyzeEvidence = async (
  text: string,
  imageBase64?: string
): Promise<AIAnalysisResult> => {
  try {
    const modelId = "gemini-2.5-flash";

    const parts: any[] = [];
    
    if (imageBase64) {
      parts.push({
        inlineData: {
          mimeType: "image/jpeg", 
          data: imageBase64.split(',')[1] || imageBase64, // Ensure stripping header if present
        },
      });
    }

    parts.push({
      text: `Analise este conteúdo coletado de fonte aberta. O texto associado é: "${text}". Extraia entidades, resuma o contexto e avalie o nível de risco potencial para segurança pública.`,
    });

    const response = await ai.models.generateContent({
      model: modelId,
      contents: { parts },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "Resumo factual do conteúdo." },
            entities: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING }, 
              description: "Pessoas, organizações, locais ou datas identificadas." 
            },
            riskLevel: { 
              type: Type.STRING, 
              enum: ["BAIXO", "MÉDIO", "ALTO", "CRÍTICO"],
              description: "Nível de risco baseado em palavras-chave de ameaça ou violência."
            },
            riskJustification: { type: Type.STRING, description: "Explicação técnica para o nível de risco." },
            visualElements: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING }, 
              description: "Lista de objetos ou cenários identificados na imagem (se houver)." 
            },
            sentiment: { type: Type.STRING, description: "Tom do conteúdo (Agressivo, Informativo, Neutro, etc)." }
          },
          required: ["summary", "entities", "riskLevel", "riskJustification", "sentiment"],
        },
      },
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Sem resposta da IA");
    }

    const parsed = JSON.parse(resultText);
    
    // Map string enum back to Type if needed, though JSON matches interface mostly
    return {
      ...parsed,
      riskLevel: parsed.riskLevel as RiskLevel
    };

  } catch (error) {
    console.error("Erro na análise Gemini:", error);
    return {
      summary: "Erro ao processar análise automática.",
      entities: [],
      riskLevel: RiskLevel.LOW,
      riskJustification: "Falha na conexão com o serviço de inteligência.",
      sentiment: "Desconhecido",
      visualElements: []
    };
  }
};
