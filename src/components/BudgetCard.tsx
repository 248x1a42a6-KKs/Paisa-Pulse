import React from 'react';
import { PiggyBank, AlertTriangle, AlertCircle, CheckCircle2, ChevronRight, Edit2 } from 'lucide-react';
import { formatINR } from '../utils/formatters';

interface BudgetCardProps {
  spent: number;
  budget: number;
  onTap: () => void;
}

export const BudgetCard: React.FC<BudgetCardProps> = ({ spent, budget, onTap }) => {
  if (budget === 0) {
    return (
      <div
        onClick={onTap}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onTap();
          }
        }}
        className="mx-3 my-2 p-4 bg-white rounded-2xl border border-teal-100 shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-between group active:scale-[0.99]"
      >
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-teal-100 transition">
            <PiggyBank className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800">Set monthly budget</h3>
            <p className="text-xs text-slate-500">Tap to plan and track your monthly spending</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-teal-600 transition" />
      </div>
    );
  }

  const ratio = spent / budget;
  const percentage = Math.round(ratio * 100);

  let barBg = 'bg-teal-600';
  let badgeColor = 'text-teal-700 bg-teal-50 border-teal-200';
  let message = `${formatINR(budget - spent, false)} remaining`;
  let Icon = CheckCircle2;

  if (ratio > 1) {
    barBg = 'bg-rose-600';
    badgeColor = 'text-rose-700 bg-rose-50 border-rose-200';
    message = `Over budget by ${formatINR(spent - budget, false)}`;
    Icon = AlertCircle;
  } else if (ratio >= 0.8) {
    barBg = 'bg-amber-600';
    badgeColor = 'text-amber-800 bg-amber-50 border-amber-200';
    message = `Careful! ${percentage}% of budget used`;
    Icon = AlertTriangle;
  }

  const progressPercent = Math.min(Math.max(percentage, 0), 100);

  return (
    <div
      onClick={onTap}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onTap();
        }
      }}
      className="mx-3 my-2 p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition cursor-pointer group active:scale-[0.99]"
    >
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-slate-600">Monthly Budget</span>
          <span className="text-sm font-bold text-slate-900">{formatINR(budget, false)}</span>
        </div>
        <div className="flex items-center space-x-1.5 text-xs text-slate-500 group-hover:text-teal-600 transition">
          <Edit2 className="w-3.5 h-3.5" />
          <span>Edit</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barBg}`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Status & Remaining Message */}
      <div className="mt-3 flex items-center justify-between">
        <div className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeColor}`}>
          <Icon className="w-3.5 h-3.5 shrink-0" />
          <span className="break-words">{message}</span>
        </div>
        <span className="text-xs font-semibold text-slate-500">
          {percentage}% used
        </span>
      </div>
    </div>
  );
};
