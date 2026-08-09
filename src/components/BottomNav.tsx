import React from 'react';

interface BottomNavProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
  onOpenScanner: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  onOpenScanner,
}) => {
  return (
    <nav className="fixed bottom-0 w-full z-50 bg-surface-container/90 backdrop-blur-xl pb-safe border-t border-surface-container-high/40 shadow-[0_-1px_12px_rgba(0,0,0,0.5)]">
      <div className="flex justify-around items-center h-20 px-4 relative max-w-md mx-auto">
        {/* Timeline Tab */}
        <button
          onClick={() => onChangeTab('timeline')}
          className={`flex flex-col items-center justify-center w-16 h-16 transition-colors ${
            activeTab === 'timeline'
              ? 'text-secondary-fixed-dim font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">event_note</span>
          <span className="text-[10px] uppercase tracking-wider mt-0.5 font-bold">Timeline</span>
        </button>

        {/* Passes Tab */}
        <button
          onClick={() => onChangeTab('passes')}
          className={`flex flex-col items-center justify-center w-16 h-16 transition-colors ${
            activeTab === 'passes'
              ? 'text-secondary-fixed-dim font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">style</span>
          <span className="text-[10px] uppercase tracking-wider mt-0.5 font-bold">Passes</span>
        </button>

        {/* Spacer for Floating Center Button */}
        <div className="w-16 h-16 pointer-events-none" />

        {/* Prominent Central Scanner Button */}
        <button
          onClick={onOpenScanner}
          aria-label="Scan Ticket or PNR"
          className="absolute left-1/2 -translate-x-1/2 -top-6 w-16 h-16 rounded-full bg-secondary-fixed-dim text-on-secondary shadow-xl shadow-secondary-fixed-dim/30 flex items-center justify-center z-10 active:scale-90 transition-all border-4 border-surface hover:brightness-110"
        >
          <span className="material-symbols-outlined text-[32px]">barcode_scanner</span>
        </button>

        {/* Transit Tab */}
        <button
          onClick={() => onChangeTab('transit')}
          className={`flex flex-col items-center justify-center w-16 h-16 transition-colors ${
            activeTab === 'transit'
              ? 'text-secondary-fixed-dim font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">commute</span>
          <span className="text-[10px] uppercase tracking-wider mt-0.5 font-bold">Transit</span>
        </button>

        {/* Profile Tab */}
        <button
          onClick={() => onChangeTab('profile')}
          className={`flex flex-col items-center justify-center w-16 h-16 transition-colors ${
            activeTab === 'profile'
              ? 'text-secondary-fixed-dim font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">account_circle</span>
          <span className="text-[10px] uppercase tracking-wider mt-0.5 font-bold">Profile</span>
        </button>
      </div>
    </nav>
  );
};
