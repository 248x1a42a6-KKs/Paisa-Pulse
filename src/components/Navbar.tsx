import React, { useState, useRef, useEffect } from 'react';
import {
  BarChart2,
  Home,
  FileCheck2,
  Smartphone,
  Monitor,
  MoreVertical,
  Download,
  Upload,
  RotateCcw,
  Trash2,
  Check,
  Users,
} from 'lucide-react';

interface Props {
  activeTab: 'home' | 'summary' | 'defects';
  onSelectTab: (tab: 'home' | 'summary' | 'defects') => void;
  isMobileFramed: boolean;
  onToggleFrame: () => void;
  onExport: () => void;
  onImportClick: () => void;
  onReset: () => void;
  onClear: () => void;
  onAbout: () => void;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  onSelectTab,
  isMobileFramed,
  onToggleFrame,
  onExport,
  onImportClick,
  onReset,
  onClear,
  onAbout,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-teal-800 text-white shadow-md z-30 sticky top-0">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => onSelectTab('home')}
          className="flex items-center space-x-2.5 cursor-pointer select-none group"
        >
          <img
            src="/icon.png"
            alt="Paisa Pulse"
            onError={(e) => {
              // fallback if image fails
              (e.target as HTMLImageElement).style.display = 'none';
            }}
            className="w-8 h-8 rounded-lg shadow-xs group-hover:scale-105 transition"
          />
          <div>
            <h1 className="text-base font-extrabold tracking-tight leading-none text-white">
              Paisa Pulse
            </h1>
            <p className="text-[10px] text-teal-200 font-medium leading-none mt-0.5">
              Expense &amp; Budget
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1">
          <button
            onClick={() => onSelectTab('home')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition ${
              activeTab === 'home'
                ? 'bg-teal-900/80 text-white shadow-xs'
                : 'text-teal-100 hover:bg-white/10'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </button>

          <button
            onClick={() => onSelectTab('summary')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition ${
              activeTab === 'summary'
                ? 'bg-teal-900/80 text-white shadow-xs'
                : 'text-teal-100 hover:bg-white/10'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span className="hidden sm:inline">Summary</span>
          </button>

          <button
            onClick={() => onSelectTab('defects')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition ${
              activeTab === 'defects'
                ? 'bg-teal-900/80 text-white shadow-xs'
                : 'text-teal-100 hover:bg-white/10'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span className="hidden sm:inline">Defect Log</span>
            <span className="bg-emerald-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              5
            </span>
          </button>

          {/* Device Orientation / Phone Sideways Frame Toggle */}
          <button
            onClick={onToggleFrame}
            className="p-2 text-teal-100 hover:text-white hover:bg-white/10 rounded-xl transition ml-1"
            title={isMobileFramed ? 'Switch to Fluid Desktop View' : 'Switch to Mobile Phone View'}
          >
            {isMobileFramed ? (
              <Monitor className="w-4 h-4" />
            ) : (
              <Smartphone className="w-4 h-4" />
            )}
          </button>

          {/* More Settings Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-teal-100 hover:text-white hover:bg-white/10 rounded-xl transition"
              title="More options"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 text-slate-800 text-xs font-semibold z-50 animate-scaleUp">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onAbout();
                  }}
                  className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center space-x-2 text-slate-700"
                >
                  <Users className="w-4 h-4 text-teal-600" />
                  <span>About Team &amp; Project</span>
                </button>
                <div className="h-px bg-slate-100 my-1" />
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onExport();
                  }}
                  className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center space-x-2 text-slate-700"
                >
                  <Download className="w-4 h-4 text-slate-500" />
                  <span>Export Backup (JSON)</span>
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onImportClick();
                  }}
                  className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center space-x-2 text-slate-700"
                >
                  <Upload className="w-4 h-4 text-slate-500" />
                  <span>Import Backup (JSON)</span>
                </button>
                <div className="h-px bg-slate-100 my-1" />
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onReset();
                  }}
                  className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center space-x-2 text-teal-700"
                >
                  <RotateCcw className="w-4 h-4 text-teal-600" />
                  <span>Reset Sample Data</span>
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onClear();
                  }}
                  className="w-full px-3.5 py-2 text-left hover:bg-rose-50 flex items-center space-x-2 text-rose-600"
                >
                  <Trash2 className="w-4 h-4 text-rose-500" />
                  <span>Clear All Records</span>
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
