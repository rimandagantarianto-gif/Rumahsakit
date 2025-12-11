export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  mrn: string; // Medical Record Number
  lastVisit: string;
  diagnosis: string[];
  medications: string[];
  notes: string; // Raw clinical notes
  vitals: {
    bp: string;
    hr: number;
    temp: number;
    spO2: number;
  };
}

export interface FinancialMetric {
  month: string;
  revenue: number;
  expenses: number;
  billingEfficiency: number; // percentage
  claimRejectionRate: number; // percentage
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum AppRoute {
  DASHBOARD = 'dashboard',
  CLINICAL = 'clinical',
  ADMIN = 'admin',
}