import React from 'react';
import { Expense } from '../types';
import { CATEGORY_META } from '../data/categories';
import { CategoryIcon } from './CategoryIcon';
import { formatINR, formatDateText } from '../utils/formatters';

interface ExpenseCardProps {
  expense: Expense;
  onTap: (expense: Expense) => void;
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, onTap }) => {
  const meta = CATEGORY_META[expense.category] || CATEGORY_META.Other;

  return (
    <div
      onClick={() => onTap(expense)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onTap(expense);
        }
      }}
      className="mx-3 my-1.5 p-3.5 bg-white rounded-2xl border border-slate-200/70 shadow-xs hover:shadow-md hover:border-teal-200 transition cursor-pointer flex items-center justify-between group active:scale-[0.99]"
    >
      <div className="flex items-center space-x-3 min-w-0 pr-3">
        <div
          className={`w-11 h-11 rounded-xl shrink-0 flex items-center justify-center border ${meta.bgColor} transition group-hover:scale-105`}
        >
          <CategoryIcon category={expense.category} size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold text-slate-900 truncate break-words">
            {expense.note}
          </h4>
          <p className="text-xs text-slate-500 mt-0.5 flex items-center space-x-1.5 truncate">
            <span className="font-medium text-slate-600">{expense.category}</span>
            <span>•</span>
            <span>{formatDateText(expense.date)}</span>
          </p>
        </div>
      </div>

      <div className="text-right shrink-0">
        <span className="text-sm font-bold text-slate-900 block truncate max-w-[120px]">
          {formatINR(expense.amount)}
        </span>
      </div>
    </div>
  );
};
