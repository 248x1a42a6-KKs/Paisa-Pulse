import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

interface Props {
  isOpen: boolean;
  currentBudget: number;
  onClose: () => void;
  onSave: (newBudget: number) => void;
}

export const BudgetModal: React.FC<Props> = ({ isOpen, currentBudget, onClose, onSave }) => {
  const [val, setVal] = useState('');
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setVal(currentBudget > 0 ? currentBudget.toString() : '');
      setErrorText(null);
    }
  }, [isOpen, currentBudget]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = val.trim();
    if (!trimmed) {
      setErrorText('Enter a number');
      return;
    }
    const num = parseFloat(trimmed);
    if (isNaN(num)) {
      setErrorText('Enter a valid number');
      return;
    }
    if (num <= 0) {
      setErrorText('Must be more than 0');
      return;
    }
    if (num > 10000000) {
      setErrorText('That is too large (max ₹1,00,00,000)');
      return;
    }

    onSave(num);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-slate-100 animate-scaleUp">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">Monthly Budget</h3>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5">
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
            Enter monthly limit
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-base">
              ₹
            </span>
            <input
              type="number"
              step="any"
              autoFocus
              value={val}
              onChange={(e) => {
                setVal(e.target.value);
                if (errorText) setErrorText(null);
              }}
              placeholder="e.g. 5000"
              className={`w-full pl-8 pr-4 py-3 rounded-xl border text-slate-800 font-semibold text-lg focus:outline-hidden transition ${
                errorText
                  ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100'
              }`}
            />
          </div>

          {errorText && (
            <p className="mt-1.5 text-xs text-rose-600 font-medium">{errorText}</p>
          )}

          <div className="mt-6 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 active:bg-teal-900 rounded-xl transition shadow-xs flex items-center space-x-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save Budget</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
