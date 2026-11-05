import React, { useState, useEffect } from 'react';
import { X, Calendar, Check, AlertCircle } from 'lucide-react';
import { Expense, CategoryType } from '../types';
import { CATEGORIES, CATEGORY_META } from '../data/categories';
import { CategoryIcon } from './CategoryIcon';
import { toInputDateFormat } from '../utils/formatters';

interface Props {
  isOpen: boolean;
  initialExpense?: Expense | null;
  onClose: () => void;
  onSave: (expenseData: {
    note: string;
    category: CategoryType;
    amount: number;
    date: string;
  }) => Promise<void> | void;
}

export const AddExpenseModal: React.FC<Props> = ({
  isOpen,
  initialExpense,
  onClose,
  onSave,
}) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<CategoryType | ''>('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(toInputDateFormat(new Date()));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialExpense) {
        setAmount(initialExpense.amount.toString());
        setCategory(initialExpense.category);
        setNote(initialExpense.note);
        setDate(toInputDateFormat(new Date(initialExpense.date)));
      } else {
        setAmount('');
        setCategory('');
        setNote('');
        setDate(toInputDateFormat(new Date()));
      }
      setErrors({});
      setIsSaving(false);
    }
  }, [isOpen, initialExpense]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 1. Amount validation matching Flutter specs
    const trimmedAmount = amount.trim();
    if (!trimmedAmount) {
      newErrors.amount = 'Enter a number';
    } else {
      const parsedAmount = parseFloat(trimmedAmount);
      if (isNaN(parsedAmount)) {
        newErrors.amount = 'Enter a number';
      } else if (parsedAmount <= 0) {
        newErrors.amount = 'Must be more than 0';
      } else if (parsedAmount > 10000000) {
        newErrors.amount = 'Amount is too large (max ₹1,00,00,000)';
      }
    }

    // 2. Category validation
    if (!category) {
      newErrors.category = 'Choose a category';
    }

    // 3. Note validation (3 to 80 chars)
    const trimmedNote = note.trim();
    if (trimmedNote.length < 3) {
      newErrors.note = 'Write at least 3 letters';
    } else if (trimmedNote.length > 80) {
      newErrors.note = 'Too long (max 80)';
    }

    // 4. Date validation
    if (!date) {
      newErrors.date = 'Choose a valid date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSaving) return; // Prevent repeated fast taps / double-submit

    if (!validate()) return;

    setIsSaving(true);
    try {
      await onSave({
        note: note.trim(),
        category: category as CategoryType,
        amount: parseFloat(amount.trim()),
        date: new Date(date).toISOString(),
      });
      onClose();
    } catch (err) {
      console.error(err);
      setIsSaving(false);
    }
  };

  const todayStr = toInputDateFormat(new Date());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-100 my-auto flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-teal-800 text-white">
          <h3 className="text-lg font-bold">
            {initialExpense ? 'Edit Expense' : 'Add Expense'}
          </h3>
          <button
            onClick={onClose}
            type="button"
            className="p-1 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4.5 flex-1">
          {/* Amount Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-lg">
                ₹
              </span>
              <input
                type="number"
                step="any"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (errors.amount) setErrors((prev) => ({ ...prev, amount: '' }));
                }}
                placeholder="0.00"
                className={`w-full pl-8 pr-4 py-3 rounded-xl border text-slate-900 font-bold text-lg focus:outline-hidden transition ${
                  errors.amount
                    ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                    : 'border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100'
                }`}
              />
            </div>
            {errors.amount && (
              <p className="mt-1 text-xs text-rose-600 font-semibold flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.amount}</span>
              </p>
            )}
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Category
            </label>
            <div className="grid grid-cols-4 gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = category === cat;
                const meta = CATEGORY_META[cat];
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setCategory(cat);
                      if (errors.category) setErrors((prev) => ({ ...prev, category: '' }));
                    }}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-semibold transition active:scale-95 ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50 text-teal-800 ring-2 ring-teal-600/30 font-bold'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 text-slate-700'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1 ${
                        isSelected ? 'bg-teal-600 text-white' : meta.bgColor
                      }`}
                    >
                      <CategoryIcon category={cat} size={16} />
                    </div>
                    <span className="truncate w-full text-center">{cat}</span>
                  </button>
                );
              })}
            </div>
            {errors.category && (
              <p className="mt-1 text-xs text-rose-600 font-semibold flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.category}</span>
              </p>
            )}
          </div>

          {/* Note Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Note
              </label>
              <span className={`text-[11px] font-semibold ${note.trim().length > 80 ? 'text-rose-600' : 'text-slate-600'}`}>
                {note.trim().length}/80 chars
              </span>
            </div>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
                if (errors.note) setErrors((prev) => ({ ...prev, note: '' }));
              }}
              placeholder="e.g. Lunch with friends, groceries, bus ticket"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-hidden transition ${
                errors.note
                  ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100'
              }`}
            />
            {errors.note && (
              <p className="mt-1 text-xs text-rose-600 font-semibold flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.note}</span>
              </p>
            )}
          </div>

          {/* Date Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Date
            </label>
            <div className="relative">
              <input
                type="date"
                min="2020-01-01"
                max={todayStr}
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  if (errors.date) setErrors((prev) => ({ ...prev, date: '' }));
                }}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-hidden transition ${
                  errors.date
                    ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                    : 'border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100'
                }`}
              />
            </div>
            {errors.date && (
              <p className="mt-1 text-xs text-rose-600 font-semibold flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.date}</span>
              </p>
            )}
          </div>

          {/* Action Button with Multi-Tap Guard */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-3.5 px-4 bg-teal-800 hover:bg-teal-900 active:bg-teal-950 text-white font-bold rounded-xl transition shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  <span>{initialExpense ? 'Update Expense' : 'Save Expense'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
