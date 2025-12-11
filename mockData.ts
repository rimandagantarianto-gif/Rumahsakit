import { Patient, FinancialMetric } from './types';

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'p1',
    name: 'Budi Santoso',
    age: 45,
    gender: 'Male',
    mrn: 'MRN-2023-8891',
    lastVisit: '2023-10-25',
    diagnosis: ['Hypertension', 'Type 2 Diabetes'],
    medications: ['Amlodipine 5mg', 'Metformin 500mg'],
    notes: `Patient presents with complaints of recurring headaches and mild dizziness over the last week. BP is elevated at 150/95. Patient admits to missing medication doses due to busy work schedule. 
    Physical exam shows no neurological deficits. Heart sounds regular. Lungs clear.
    Plan: Reinforce medication adherence. Order lipid profile and HbA1c. Follow up in 2 weeks.`,
    vitals: { bp: '150/95', hr: 88, temp: 36.8, spO2: 98 }
  },
  {
    id: 'p2',
    name: 'Siti Aminah',
    age: 62,
    gender: 'Female',
    mrn: 'MRN-2023-9921',
    lastVisit: '2023-10-28',
    diagnosis: ['Osteoarthritis', 'Gastritis'],
    medications: ['Paracetamol', 'Omeprazole'],
    notes: `Follow-up for knee pain. Patient reports pain score 6/10, worsening with activity. Stomach discomfort has improved with Omeprazole. 
    Examination: Crepitus noted in right knee. Mild swelling, no redness. Range of motion limited due to pain.
    Plan: Continue analgesics. Refer to physiotherapy. Discussed weight management strategies.`,
    vitals: { bp: '130/80', hr: 76, temp: 36.5, spO2: 99 }
  },
  {
    id: 'p3',
    name: 'Andi Pratama',
    age: 28,
    gender: 'Male',
    mrn: 'MRN-2023-1102',
    lastVisit: '2023-10-29',
    diagnosis: ['Acute Bronchitis'],
    medications: ['Azithromycin', 'Salbutamol Inhaler'],
    notes: `Patient complains of productive cough for 5 days, yellow sputum. Low grade fever. No history of asthma.
    Exam: Wheezing heard on expiration bilaterally. Throat slightly hyperemic.
    Plan: Prescribed antibiotics and bronchodilator. Advised rest and hydration. Alert signs explained.`,
    vitals: { bp: '120/75', hr: 92, temp: 37.8, spO2: 96 }
  }
];

export const FINANCIAL_DATA: FinancialMetric[] = [
  { month: 'May', revenue: 450000000, expenses: 320000000, billingEfficiency: 88, claimRejectionRate: 4.5 },
  { month: 'Jun', revenue: 480000000, expenses: 330000000, billingEfficiency: 90, claimRejectionRate: 3.8 },
  { month: 'Jul', revenue: 465000000, expenses: 340000000, billingEfficiency: 92, claimRejectionRate: 3.0 },
  { month: 'Aug', revenue: 520000000, expenses: 350000000, billingEfficiency: 94, claimRejectionRate: 2.1 },
  { month: 'Sep', revenue: 510000000, expenses: 345000000, billingEfficiency: 95, claimRejectionRate: 1.5 },
  { month: 'Oct', revenue: 550000000, expenses: 360000000, billingEfficiency: 98, claimRejectionRate: 0.8 },
];