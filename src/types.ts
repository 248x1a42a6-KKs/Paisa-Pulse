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

export interface DefectItem {
  id: number;
  category: string;
  title: string;
  description: string;
  stepsToReproduce: string;
  expectedBehavior: string;
  actualFixedBehavior: string;
  fixed: boolean;
  testScenarioKey: 'empty_input' | 'long_text' | 'no_internet' | 'fast_taps' | 'phone_sideways';
}
