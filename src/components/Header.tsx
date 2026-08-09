import React from 'react';
import { Itinerary, UserProfile } from '../types';

interface HeaderProps {
  currentTab: string;
  activeTrip: Itinerary;
  profile: UserProfile;
  isOnline: boolean;
  simulatedOffline: boolean;
  onToggleOffline: () => void;
  onOpenPasses: () => void;
  onOpenProfile: () => void;
  onOpenAddTrip: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  activeTrip,
  profile,
  isOnline,
  simulatedOffline,
  onToggleOffline,
  onOpenPasses,
  onOpenProfile,
  onOpenAddTrip
}) => {
  const getTabTitle = (tab: string) => {
    switch (tab) {
      case 'timeline':
        return 'Timeline';
      case 'passes':
        return 'Offline Passes';
      case 'transit':
        return 'Transit Hub';
      case 'profile':
        return 'Profile & Settings';
      default:
        return 'Travel Companion';
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl pt-safe border-b border-surface-container-high/40 shadow-lg shadow-black/20">
      <div className="h-20 px-margin-mobile flex items-center justify-between gap-gutter max-w-md mx-auto">
        {/* Left section: App Brand + Active Trip Status */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-secondary-fixed-dim/30 to-secondary-fixed/10 border border-secondary-fixed-dim/40 flex items-center justify-center text-secondary-fixed-dim shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[22px]">
              {activeTrip.type === 'flight' ? 'flight_takeoff' : 'train'}
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-status-label font-status-label text-on-surface-variant truncate">
              {getTabTitle(currentTab)}
            </span>
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${activeTrip.status === 'On Time' ? 'bg-secondary-fixed-dim animate-pulse' : 'bg-tertiary-fixed-dim'}`} />
              <span className="text-status-label font-status-label text-secondary-fixed-dim whitespace-nowrap">
                {activeTrip.carrierCode} • {activeTrip.status}
              </span>
            </div>
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1">
          {/* Add Trip Button */}
          <button
            onClick={onOpenAddTrip}
            title="Add or Change Trip"
            className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
          </button>

          {/* Network Status / Offline Simulator Switch */}
          <button
            onClick={onToggleOffline}
            title={isOnline ? "Network Online (Click to simulate offline)" : "Offline Mode (Click to connect)"}
            className={`w-10 h-10 flex items-center justify-center transition-colors ${
              !isOnline ? 'text-tertiary-fixed-dim animate-pulse' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {!isOnline ? 'cloud_off' : 'cloud_done'}
            </span>
          </button>

          {/* Quick Passes Button */}
          <button
            onClick={onOpenPasses}
            title="View Passes"
            className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">confirmation_number</span>
          </button>

          {/* User Profile Avatar */}
          <button
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-1 overflow-hidden ring-2 ring-surface-container-high active:scale-95 transition-transform"
            title="Profile"
          >
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            )}
          </button>
        </div>
      </div>

      {/* Offline Alert Banner */}
      {!isOnline && (
        <div className="w-full bg-tertiary-container/90 border-t border-tertiary-fixed-dim/30 px-4 py-1 flex items-center justify-between text-xs text-tertiary-fixed font-medium">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px]">cloud_off</span>
            <span>Offline Mode — Cached data active</span>
          </div>
          <button onClick={onToggleOffline} className="underline text-[11px]">
            {simulatedOffline ? "Turn Online" : "Retry"}
          </button>
        </div>
      )}
    </header>
  );
};
