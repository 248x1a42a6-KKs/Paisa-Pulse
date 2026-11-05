import React, { useState } from 'react';
import { ArrowLeft, PieChart, TrendingUp, Calendar, Layers } from 'lucide-react';
import { Expense } from '../types';
import { CATEGORIES, CATEGORY_META } from '../data/categories';
import { CategoryIcon } from './CategoryIcon';
import { formatINR, isSameMonth } from '../utils/formatters';

interface Props {
  expenses: Expense[];
  onBack: () => void;
  onOpenAdd: () => void;
}

export const SummaryView: React.FC<Props> = ({ expenses, onBack, onOpenAdd }) => {
  const [filterMode, setFilterMode] = useState<'month' | 'all'>('month');

  const filteredExpenses =
    filterMode === 'month'
      ? expenses.filter((e) => isSameMonth(e.date))
      : expenses;

  const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  const categoryTotals = CATEGORIES.map((cat) => {
    const amount = filteredExpenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0);
    const count = filteredExpenses.filter((e) => e.category === cat).length;
    const ratio = total > 0 ? amount / total : 0;
    return { category: cat, amount, count, ratio, meta: CATEGORY_META[cat] };
  }).filter((item) => item.amount > 0);

  // Sort by highest spending first
  categoryTotals.sort((a, b) => b.amount - a.amount);

  const topCategory = categoryTotals.length > 0 ? categoryTotals[0] : null;

  return (
    <div className="flex-1 flex flex-col bg-slate-50/50">
      {/* Top Header */}
      <div className="px-4 py-3.5 bg-teal-800 text-white flex items-center justify-between shadow-xs">
        <div className="flex items-center space-x-2">
          <button
            onClick={onBack}
            className="p-1.5 hover:bg-white/10 rounded-full transition"
            title="Back to Home"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold">Expense Summary</h2>
        </div>

        {/* Month vs All-Time Toggle */}
        <div className="flex items-center bg-teal-900/60 p-0.5 rounded-lg border border-teal-700/50 text-xs">
          <button
            onClick={() => setFilterMode('month')}
            className={`px-2.5 py-1 rounded-md font-semibold transition ${
              filterMode === 'month'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-teal-200 hover:text-white'
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setFilterMode('all')}
            className={`px-2.5 py-1 rounded-md font-semibold transition ${
              filterMode === 'all'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-teal-200 hover:text-white'
            }`}
          >
            All Time
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredExpenses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
              <PieChart className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No expenses available</h3>
            <p className="text-xs text-slate-500 max-w-xs mt-1">
              {filterMode === 'month'
                ? 'No expenses recorded in the current month.'
                : 'Start tracking by adding your first expense.'}
            </p>
            <button
              onClick={onOpenAdd}
              className="mt-4 px-4 py-2 bg-teal-800 text-white rounded-xl text-xs font-semibold hover:bg-teal-900 transition"
            >
              Add Expense
            </button>
          </div>
        ) : (
          <>
            {/* Total Spending Card matching Flutter SummaryPage */}
            <div className="bg-gradient-to-br from-teal-800 to-teal-950 text-white rounded-2xl p-5 shadow-sm">
              <span className="text-xs font-medium text-teal-200 uppercase tracking-wider block">
                {filterMode === 'month' ? 'Total Spent This Month' : 'Total Spending All-Time'}
              </span>
              <h1 className="text-3xl font-extrabold mt-1 tracking-tight">
                {formatINR(total)}
              </h1>
              <div className="mt-3 pt-3 border-t border-teal-700/60 flex items-center justify-between text-xs text-teal-200">
                <span className="flex items-center space-x-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>{filteredExpenses.length} transactions</span>
                </span>
                {topCategory && (
                  <span className="flex items-center space-x-1 font-semibold text-teal-100">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Top: {topCategory.category}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Category Breakdown Header */}
            <div className="pt-2">
              <h3 className="text-sm font-bold text-slate-900 mb-3 px-1">
                Category Breakdown
              </h3>

              <div className="space-y-3">
                {categoryTotals.map(({ category, amount, count, ratio, meta }) => {
                  const percent = (ratio * 100).toFixed(1);
                  return (
                    <div
                      key={category}
                      className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2.5">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center border ${meta.bgColor}`}
                          >
                            <CategoryIcon category={category} size={16} />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-slate-900 block">
                              {category}
                            </span>
                            <span className="text-[11px] text-slate-600">
                              {count} {count === 1 ? 'item' : 'items'}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-bold text-slate-900 block">
                            {formatINR(amount)}
                          </span>
                          <span className="text-xs font-semibold text-teal-700">
                            {percent}%
                          </span>
                        </div>
                      </div>

                      {/* Flutter LinearProgressIndicator replication */}
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-teal-700 h-full rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(ratio * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
