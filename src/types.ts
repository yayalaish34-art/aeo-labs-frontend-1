// src/types.ts

export interface AnalysisSection {
  title: string;
  score: number;
  description: string;
  status: 'good' | 'warning' | 'critical';
  details: string[];
}

export interface AnalysisReport {
  url: string;
  overallScore: number;
  summary: string;
  sections: AnalysisSection[];
  actionPlan: string[];
}

// במקום enum – אובייקט + טייפ
export const AnalysisStatus = {
  IDLE: 'IDLE',
  ANALYZING: 'ANALYZING',
  COMPLETE: 'COMPLETE',
  ERROR: 'ERROR',
  PRICING: 'PRICING',
  CHECKOUT: 'CHECKOUT',
} as const;

export type AnalysisStatus =
  (typeof AnalysisStatus)[keyof typeof AnalysisStatus];

export type Language = 'he' | 'en';
