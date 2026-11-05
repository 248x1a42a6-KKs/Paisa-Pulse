import React, { useState } from 'react';
import { X, Trash2, Edit3, ArrowLeft, Calendar, Tag, Percent, FileText } from 'lucide-react';
import { Expense } from '../types';
import { CATEGORY_META } from '../data/categories';
import { CategoryIcon } from './CategoryIcon';
import { formatINR, formatDateText } from '../utils/formatters';

interface Props {
  expense: Expense | null;
  totalExpenses: number;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}

export const ExpenseDetailModal: React.FC<Props> = ({
  expense,
  totalExpenses,
  isOpen,
  onClose,
  onDelete,
  onEdit,
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !expense) return null;

  const meta = CATEGORY_META[expense.category] || CATEGORY_META.Other;
  const share = totalExpenses > 0 ? (expense.amount / totalExpenses) * 100 : 0;

  const handleDeleteConfirm = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await onDelete(expense.id);
      setShowConfirmDelete(false);
      onClose();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Header matching Flutter AppBar */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              type="button"
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-200/60 transition"
              title="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold text-slate-800">Expense Details</h3>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => onEdit(expense)}
              type="button"
              className="p-2 text-slate-500 hover:text-teal-700 rounded-full hover:bg-teal-50 transition"
              title="Edit Expense"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowConfirmDelete(true)}
              type="button"
              className="p-2 text-rose-500 hover:text-rose-700 rounded-full hover:bg-rose-50 transition"
              title="Delete Expense"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Big Amount */}
          <div className="text-center py-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1">
              Amount Spent
            </span>
            <h2 className="text-4xl font-extrabold text-slate-900 break-words tracking-tight">
              {formatINR(expense.amount)}
            </h2>
          </div>

          {/* Category Chip */}
          <div className="flex justify-center">
            <div
              className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold border ${meta.bgColor}`}
            >
              <CategoryIcon category={expense.category} size={15} />
              <span>{expense.category}</span>
            </div>
          </div>

          {/* Detail Rows */}
          <div className="bg-slate-50/80 rounded-2xl p-4 space-y-3.5 border border-slate-100 text-sm">
            <div className="flex items-start space-x-3">
              <Calendar className="w-4 h-4 text-slate-600 mt-0.5 shrink-0" />
              <div className="flex-1">
                <span className="text-xs text-slate-600 font-semibold block">Date</span>
                <span className="text-slate-800 font-semibold">{formatDateText(expense.date)}</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Percent className="w-4 h-4 text-slate-600 mt-0.5 shrink-0" />
              <div className="flex-1">
                <span className="text-xs text-slate-600 font-semibold block">
                  Share of all spending
                </span>
                <div className="flex items-center space-x-2 mt-0.5">
                  <span className="text-slate-800 font-semibold">{share.toFixed(1)}%</span>
                  <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden max-w-[120px]">
                    <div
                      className="bg-teal-600 h-full rounded-full"
                      style={{ width: `${Math.min(share, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <FileText className="w-4 h-4 text-slate-600 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-xs text-slate-600 font-semibold block">Note</span>
                <p className="text-slate-800 font-medium break-words whitespace-pre-wrap leading-relaxed mt-0.5">
                  {expense.note}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-sm rounded-xl transition"
          >
            Close
          </button>
        </div>
      </div>

      {/* Confirmation Dialog matching Flutter's AlertDialog */}
      {showConfirmDelete && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl p-5 max-w-xs w-full shadow-2xl border border-slate-100 animate-scaleUp">
            <h4 className="text-base font-bold text-slate-900">Delete expense?</h4>
            <p className="text-xs text-slate-600 mt-1.5">This cannot be undone.</p>
            <div className="mt-5 flex items-center justify-end space-x-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setShowConfirmDelete(false)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-lg transition shadow-xs disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
