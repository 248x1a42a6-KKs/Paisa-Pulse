import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-60 max-w-sm w-auto px-4 py-3 rounded-2xl shadow-xl bg-slate-900 text-white flex items-center space-x-3 border border-slate-700/60 animate-bounceShort">
      {type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
      {type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
      {type === 'info' && <Info className="w-4 h-4 text-teal-400 shrink-0" />}

      <span className="text-xs font-semibold leading-snug">{message}</span>

      <button
        onClick={onClose}
        className="p-1 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
