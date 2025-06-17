export type FinancialProductType = 'ISA' | 'GIA' | 'Pension' | 'Current Account';

export type FinancialProduct = {
  type: FinancialProductType;
  balance: number;
};

export type Contact = {
  name: string;
  email: string;
  phone: string;
  address: string;
  financialProducts: FinancialProduct[];
};

export type Review = {
    id: string;
    date: string;         // ISO date string
    reviewer: string;
    contacts: Contact[];
    goals: string[];
    recommendations: string[];
};
  
export type FinancialAccount = {
    id: string;
    name: string;
    contacts: Contact[];
    reviews: Review[];
};