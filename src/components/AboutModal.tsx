import React from 'react';
import { X, Users, Award, ShieldCheck, Heart } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-teal-800 text-white">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <h3 className="text-base font-bold">About Paisa Pulse</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-700 text-sm">
          <div>
            <h4 className="font-extrabold text-slate-900 text-base">
              Application Development Programme Project
            </h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Paisa Pulse was built to make daily expense logging and monthly budget tracking
              effortless and private for students without needing complex setups or external APIs.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 block">
              Team Members
            </span>

            {/* Member 1: K. Lokesh */}
            <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-100 flex items-start space-x-3">
              <div className="w-9 h-9 rounded-xl bg-teal-700 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                KL
              </div>
              <div>
                <h5 className="font-bold text-slate-900 text-sm">K. Lokesh</h5>
                <p className="text-xs text-teal-800 font-semibold mt-0.5">
                  Lead Developer
                </p>
                <p className="text-xs text-slate-600 mt-1 leading-normal">
                  Built the home dashboard, budget progress bar &amp; alert thresholds (80% warning and over-budget states), summary breakdowns, and offline storage sync.
                </p>
              </div>
            </div>

            {/* Member 2: K. Kiran */}
            <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-100 flex items-start space-x-3">
              <div className="w-9 h-9 rounded-xl bg-teal-700 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                KK
              </div>
              <div>
                <h5 className="font-bold text-slate-900 text-sm">K. Kiran</h5>
                <p className="text-xs text-teal-800 font-semibold mt-0.5">
                  Developer &amp; QA Lead
                </p>
                <p className="text-xs text-slate-600 mt-1 leading-normal">
                  Implemented the validated Add Expense form, Expense Detail view with delete protection, and resolved all 5 quality defect test cases.
                </p>
              </div>
            </div>
          </div>

          {/* QA Quality Badge */}
          <div className="flex items-center space-x-2 text-xs font-medium text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>5/5 QA defects tested &amp; verified fixed for project submission.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-teal-800 hover:bg-teal-900 text-white font-semibold text-xs rounded-xl transition shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
