// Gerenciamento de localStorage para o consultor de óculos

import { User, QuestionarioData, AnaliseFacial } from './types';

const STORAGE_KEYS = {
  USER: 'oculos_user',
  QUESTIONARIO: 'oculos_questionario',
  ANALISE: 'oculos_analise',
} as const;

export const storage = {
  // Usuário
  getUser(): User | null {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  },

  setUser(user: User): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  clearUser(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // Questionário
  getQuestionario(): QuestionarioData | null {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(STORAGE_KEYS.QUESTIONARIO);
    return data ? JSON.parse(data) : null;
  },

  setQuestionario(data: QuestionarioData): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.QUESTIONARIO, JSON.stringify(data));
  },

  // Análise Facial
  getAnalise(): AnaliseFacial | null {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(STORAGE_KEYS.ANALISE);
    return data ? JSON.parse(data) : null;
  },

  setAnalise(analise: AnaliseFacial): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.ANALISE, JSON.stringify(analise));
  },

  // Limpar tudo
  clearAll(): void {
    if (typeof window === 'undefined') return;
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  },
};
