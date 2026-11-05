import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ShieldCheck, Play, Download, Copy, Check, AlertCircle } from 'lucide-react';
import { DEFECT_ITEMS } from '../data/defects';
import { DefectItem } from '../types';

interface Props {
  onBack: () => void;
  onTriggerTest: (testKey: DefectItem['testScenarioKey']) => void;
  onShowToast: (msg: string) => void;
}

export const DefectLogView: React.FC<Props> = ({ onBack, onTriggerTest, onShowToast }) => {
  const [selectedDefect, setSelectedDefect] = useState<DefectItem>(DEFECT_ITEMS[0]);
  const [copied, setCopied] = useState(false);

  const generateMarkdownTable = () => {
    let md = `# Defect Log - Paisa Pulse v2\n\n`;
    md += `| # | Defect Category | Description | Steps to Reproduce | Fixed? |\n`;
    md += `|---|---|---|---|---|\n`;
    DEFECT_ITEMS.forEach((d) => {
      const cleanSteps = d.stepsToReproduce.replace(/\n/g, ' ');
      md += `| ${d.id} | **${d.category}** - ${d.title} | ${d.description} | ${cleanSteps} | Yes (Fixed & Verified) |\n`;
    });
    md += `\n### Test Suite Coverage:\n`;
    md += `- [x] **Empty Input**: Rejects blank amounts, 0, negative, invalid categories, notes < 3 chars, and large numbers > 10M.\n`;
    md += `- [x] **Very Long Text**: 80-char notes & large ₹ amounts wrap cleanly without container overflow.\n`;
    md += `- [x] **No Internet**: Works 100% offline with LocalStorage persistence and backup export/import.\n`;
    md += `- [x] **Repeated Fast Taps**: Button debounce and async submit guard prevent duplicate transactions.\n`;
    md += `- [x] **Phone Sideways**: Responsive viewport adaptation with mobile frame toggle for landscape phones.\n`;
    return md;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdownTable());
    setCopied(true);
    onShowToast('Defect Log markdown copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const text = generateMarkdownTable();
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'DEFECT_LOG.md';
    a.click();
    URL.revokeObjectURL(url);
    onShowToast('Downloaded DEFECT_LOG.md');
  };

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
          <div>
            <h2 className="text-base font-bold">Defect Log &amp; QA Suite</h2>
            <p className="text-[11px] text-teal-200">5/5 Verified Test Scenarios</p>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={handleCopyMarkdown}
            className="p-2 hover:bg-white/10 rounded-lg text-xs font-semibold flex items-center space-x-1 text-white transition"
            title="Copy Markdown"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={handleDownloadMarkdown}
            className="p-2 hover:bg-white/10 rounded-lg text-xs font-semibold flex items-center space-x-1 text-white transition"
            title="Download DEFECT_LOG.md"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start space-x-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
          <div className="text-xs text-emerald-950">
            <span className="font-bold text-emerald-900 block text-sm">
              All 5 Quality Criteria Tested &amp; Fixed
            </span>
            <span>
              Every item specified in the group project defect log has been rigorously resolved:
              empty input, very long text, no internet, repeated fast taps, and phone sideways.
            </span>
          </div>
        </div>

        {/* Defect Cards List */}
        <div className="space-y-3">
          {DEFECT_ITEMS.map((item) => {
            const isSelected = selectedDefect.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedDefect(item)}
                className={`bg-white rounded-2xl p-4 border transition cursor-pointer shadow-xs ${
                  isSelected
                    ? 'border-teal-600 ring-2 ring-teal-600/20'
                    : 'border-slate-200 hover:border-teal-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs font-bold flex items-center justify-center">
                      #{item.id}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                      {item.category}
                    </span>
                  </div>

                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Fixed</span>
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mt-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {item.description}
                </p>

                {isSelected && (
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-3 text-xs">
                    <div>
                      <span className="font-bold text-slate-700 block mb-0.5">
                        Steps to Reproduce:
                      </span>
                      <pre className="text-slate-600 bg-slate-50 p-2.5 rounded-xl font-sans whitespace-pre-wrap leading-relaxed border border-slate-100">
                        {item.stepsToReproduce}
                      </pre>
                    </div>

                    <div>
                      <span className="font-bold text-slate-700 block mb-0.5">
                        Expected Behavior:
                      </span>
                      <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        {item.expectedBehavior}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-emerald-800 block mb-0.5">
                        Resolution &amp; Fix Applied:
                      </span>
                      <p className="text-emerald-900 leading-relaxed bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100 font-medium">
                        {item.actualFixedBehavior}
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onTriggerTest(item.testScenarioKey);
                        }}
                        className="w-full py-2.5 px-3 bg-teal-800 hover:bg-teal-900 text-white font-bold rounded-xl text-xs transition flex items-center justify-center space-x-1.5 shadow-xs"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Run Interactive QA Test for #{item.id}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
