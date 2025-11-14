// Tipos do sistema de consultor de óculos

export type UserTier = 'free' | 'premium';

export interface User {
  email: string;
  password?: string; // Senha para autenticação
  tier: UserTier;
  createdAt: string;
}

export interface QuestionarioData {
  localizacao: string;
  estiloArmacao: string;
  atividadesUso: string[];
  tipoOculos: string;
  tomPele: string;
  faixaInvestimento: string;
}

export interface AnaliseFacial {
  imageData: string;
  formatoRosto: string;
  analiseCompleta: string;
  timestamp: string;
}

export interface RecomendacaoOculos {
  id: string;
  nome: string;
  marca: string;
  preco: number;
  imagem: string;
  descricao: string;
  isPremium: boolean;
  formatosRecomendados: string[];
}

export interface Otica {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
  horario: string;
  especialidades: string[];
  distancia: string;
  avaliacoes: number;
  cidade: string;
  estado: string;
}
