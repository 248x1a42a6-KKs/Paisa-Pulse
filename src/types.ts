export type CategoryType = 
  | 'Food' 
  | 'Travel' 
  | 'Study' 
  | 'Bills' 
  | 'Fun' 
  | 'Health' 
  | 'Other';

export interface Expense {
  id: string;
  note: string;
  category: CategoryType;
  amount: number;
  date: string; // ISO string YYYY-MM-DDTHH:mm:ss.sssZ
}

export type LoadStatus = 'loading' | 'ready' | 'error';
