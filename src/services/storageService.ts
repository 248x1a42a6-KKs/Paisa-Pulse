import { Expense } from '../types';
import { INITIAL_EXPENSES, INITIAL_BUDGET } from '../data/categories';

const EXPENSES_KEY = 'paisa_pulse_expenses_v2';
const BUDGET_KEY = 'paisa_pulse_budget_v2';

export const storageService = {
  getExpenses(): Expense[] {
    try {
      const raw = localStorage.getItem(EXPENSES_KEY);
      if (!raw) {
        // Initialize with default sample expenses if brand new
        this.saveExpenses(INITIAL_EXPENSES);
        return INITIAL_EXPENSES;
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.map((e) => ({
          id: String(e.id || Date.now() + Math.random().toString()),
          note: String(e.note || 'Expense'),
          category: e.category || 'Other',
          amount: Number(e.amount) || 0,
          date: e.date || new Date().toISOString(),
        }));
      }
      return [];
    } catch (err) {
      console.error('Failed to read expenses from storage:', err);
      return INITIAL_EXPENSES;
    }
  },

  saveExpenses(expenses: Expense[]): void {
    try {
      localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
    } catch (err) {
      console.error('Failed to save expenses to storage:', err);
    }
  },

  getBudget(): number {
    try {
      const raw = localStorage.getItem(BUDGET_KEY);
      if (raw === null) {
        this.saveBudget(INITIAL_BUDGET);
        return INITIAL_BUDGET;
      }
      const val = parseFloat(raw);
      return isNaN(val) ? 0 : val;
    } catch (err) {
      console.error('Failed to read budget from storage:', err);
      return INITIAL_BUDGET;
    }
  },

  saveBudget(budget: number): void {
    try {
      localStorage.setItem(BUDGET_KEY, budget.toString());
    } catch (err) {
      console.error('Failed to save budget to storage:', err);
    }
  },

  resetAll(): void {
    try {
      localStorage.setItem(EXPENSES_KEY, JSON.stringify(INITIAL_EXPENSES));
      localStorage.setItem(BUDGET_KEY, INITIAL_BUDGET.toString());
    } catch (err) {
      console.error('Failed to reset storage:', err);
    }
  },

  clearAll(): void {
    try {
      localStorage.setItem(EXPENSES_KEY, JSON.stringify([]));
      localStorage.setItem(BUDGET_KEY, '0');
    } catch (err) {
      console.error('Failed to clear storage:', err);
    }
  },

  exportJSON(): string {
    const data = {
      app: 'Paisa Pulse',
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      budget: this.getBudget(),
      expenses: this.getExpenses(),
    };
    return JSON.stringify(data, null, 2);
  },

  importJSON(jsonString: string): { success: boolean; count: number; error?: string } {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        return { success: false, count: 0, error: 'Invalid JSON format' };
      }
      const newExpenses: Expense[] = [];
      const list = Array.isArray(parsed) ? parsed : parsed.expenses;

      if (Array.isArray(list)) {
        for (const item of list) {
          if (item && typeof item === 'object') {
            newExpenses.push({
              id: String(item.id || Date.now() + Math.random().toString()),
              note: String(item.note || 'Imported Expense'),
              category: item.category || 'Other',
              amount: Math.abs(Number(item.amount) || 0),
              date: item.date || new Date().toISOString(),
            });
          }
        }
      }

      this.saveExpenses(newExpenses);
      if (parsed.budget !== undefined) {
        const b = parseFloat(parsed.budget);
        if (!isNaN(b) && b >= 0) {
          this.saveBudget(b);
        }
      }
      return { success: true, count: newExpenses.length };
    } catch (err) {
      return { success: false, count: 0, error: (err as Error).message };
    }
  },
};
