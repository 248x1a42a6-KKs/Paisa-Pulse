import { CategoryType, Expense } from '../types';

export const CATEGORIES: CategoryType[] = [
  'Food',
  'Travel',
  'Study',
  'Bills',
  'Fun',
  'Health',
  'Other',
];

export interface CategoryMeta {
  name: CategoryType;
  iconName: string;
  bgColor: string;
  textColor: string;
  badgeBg: string;
}

export const CATEGORY_META: Record<CategoryType, CategoryMeta> = {
  Food: {
    name: 'Food',
    iconName: 'Utensils',
    bgColor: 'bg-amber-100 text-amber-800 border-amber-200',
    textColor: 'text-amber-700',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  Travel: {
    name: 'Travel',
    iconName: 'Navigation',
    bgColor: 'bg-sky-100 text-sky-800 border-sky-200',
    textColor: 'text-sky-700',
    badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  Study: {
    name: 'Study',
    iconName: 'GraduationCap',
    bgColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    textColor: 'text-indigo-700',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
  Bills: {
    name: 'Bills',
    iconName: 'Receipt',
    bgColor: 'bg-rose-100 text-rose-800 border-rose-200',
    textColor: 'text-rose-700',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  Fun: {
    name: 'Fun',
    iconName: 'PartyPopper',
    bgColor: 'bg-purple-100 text-purple-800 border-purple-200',
    textColor: 'text-purple-700',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  Health: {
    name: 'Health',
    iconName: 'HeartPulse',
    bgColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    textColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  Other: {
    name: 'Other',
    iconName: 'Tag',
    bgColor: 'bg-slate-100 text-slate-800 border-slate-200',
    textColor: 'text-slate-700',
    badgeBg: 'bg-slate-50 text-slate-700 border-slate-200',
  },
};

// Realistic initial sample expenses to showcase ready-to-test app
export const INITIAL_EXPENSES: Expense[] = [
  {
    id: 'exp_1',
    note: 'College Canteen South Indian Thali',
    category: 'Food',
    amount: 140,
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: 'exp_2',
    note: 'Monthly Metro Card Recharge',
    category: 'Travel',
    amount: 600,
    date: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(), // yesterday
  },
  {
    id: 'exp_3',
    note: 'Computer Science Algorithm Textbook',
    category: 'Study',
    amount: 720,
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
  {
    id: 'exp_4',
    note: 'Mobile 5G Data Recharge Plan',
    category: 'Bills',
    amount: 349,
    date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
  },
  {
    id: 'exp_5',
    note: 'Weekend Movie & Popcorn with friends',
    category: 'Fun',
    amount: 450,
    date: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), // 4 days ago
  },
];

export const INITIAL_BUDGET = 3500;
