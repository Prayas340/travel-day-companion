import React, { useState } from 'react';
import { UserProfile, EmergencyContact } from '../types';

interface ProfileScreenProps {
  profile: UserProfile;
  onToggleAiAlerts: () => void;
  onToggleHighContrast: () => void;
  onResetData: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profile,
  onToggleAiAlerts,
  onToggleHighContrast,
  onResetData
}) => {
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  return (
    <div className="flex flex-col w-full px-margin-mobile gap-6 pt-24 pb-32 max-w-md mx-auto relative">
      {/* Profile Header Card */}
      <div className="bg-surface-container-low rounded-2xl p-card-padding flex items-center gap-gutter shadow-md relative overflow-hidden border border-surface-container-high">
        <div className="absolute -right-12 -top-12 w-40 h-40 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative w-20 h-20 rounded-full shrink-0 ring-2 ring-secondary-fixed-dim/40 shadow-lg">
          <img
            className="w-full h-full object-cover rounded-full z-10 relative"
            src={profile.avatarUrl}
            alt={profile.name}
          />
          <div className="absolute bottom-0 right-0 bg-secondary-fixed-dim text-on-secondary w-6 h-6 rounded-full flex items-center justify-center shadow-lg border-2 border-surface-container-low z-20">
            <span className="material-symbols-outlined text-[14px]">star</span>
          </div>
        </div>

        <div className="flex flex-col min-w-0 z-10">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold truncate">
            {profile.name}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full text-[11px] font-status-label uppercase tracking-wider font-bold">
              {profile.role}
            </span>
            <span className="text-on-surface-variant font-status-label text-status-label text-[12px]">
              ID: {profile.memberId}
            </span>
          </div>
        </div>
      </div>

      {/* Loyalty Summary Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Miles Card */}
        <div className="bg-surface-container-high rounded-2xl p-4 flex flex-col justify-between h-28 relative overflow-hidden group hover:bg-surface-container-highest transition-colors cursor-pointer shadow-sm border border-surface-variant">
          <div className="absolute top-0 right-0 w-16 h-16 bg-tertiary-fixed-dim/5 rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="material-symbols-outlined text-tertiary-fixed-dim text-[24px]">
              flight_takeoff
            </span>
            <span className="material-symbols-outlined text-on-surface-variant text-[16px] opacity-60">
              arrow_forward_ios
            </span>
          </div>
          <div>
            <div className="text-on-surface-variant font-status-label text-[11px] uppercase tracking-wider mb-0.5 font-bold">
              Available Miles
            </div>
            <div className="font-display-critical text-[24px] leading-none text-on-surface font-bold">
              {profile.availableMiles.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Transit Points Card */}
        <div className="bg-surface-container-high rounded-2xl p-4 flex flex-col justify-between h-28 relative overflow-hidden group hover:bg-surface-container-highest transition-colors cursor-pointer shadow-sm border border-surface-variant">
          <div className="absolute top-0 right-0 w-16 h-16 bg-secondary-fixed-dim/5 rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="material-symbols-outlined text-secondary-fixed-dim text-[24px]">
              loyalty
            </span>
            <span className="material-symbols-outlined text-on-surface-variant text-[16px] opacity-60">
              arrow_forward_ios
            </span>
          </div>
          <div>
            <div className="text-on-surface-variant font-status-label text-[11px] uppercase tracking-wider mb-0.5 font-bold">
              Transit Points
            </div>
            <div className="font-display-critical text-[24px] leading-none text-on-surface font-bold">
              {profile.transitPoints.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="mt-2">
        <h3 className="font-status-label text-status-label text-on-surface-variant uppercase tracking-wider mb-3 px-1 font-bold">
          Preferences
        </h3>
        <div className="bg-surface-container rounded-2xl shadow-md border border-surface-container-high overflow-hidden flex flex-col">
          
          {/* AI Smart Alerts Toggle */}
          <div className="flex items-center justify-between p-4 hover:bg-surface-container-high transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary-fixed-dim/10 text-secondary-fixed-dim border border-secondary-fixed-dim/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">
                  notifications_active
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-body-md text-body-md text-on-surface font-semibold">
                  AI Smart Alerts
                </span>
                <span className="text-[12px] text-on-surface-variant leading-tight mt-0.5">
                  Predictive delays & routing
                </span>
              </div>
            </div>

            <button
              onClick={onToggleAiAlerts}
              className={`w-12 h-6 rounded-full relative transition-colors p-0.5 ${
                profile.aiAlertsEnabled ? 'bg-secondary-fixed-dim' : 'bg-surface-variant'
              }`}
            >
              <div
                className={`w-5 h-5 bg-on-secondary rounded-full shadow-md transform transition-transform ${
                  profile.aiAlertsEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="h-px bg-surface-container-high mx-4" />

          {/* High Contrast Mode Toggle */}
          <div className="flex items-center justify-between p-4 hover:bg-surface-container-high transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-variant text-on-surface flex items-center justify-center border border-outline/30">
                <span className="material-symbols-outlined text-[20px]">
                  contrast
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-body-md text-body-md text-on-surface font-semibold">
                  High Contrast
                </span>
                <span className="text-[12px] text-on-surface-variant leading-tight mt-0.5">
                  Maximize legibility
                </span>
              </div>
            </div>

            <button
              onClick={onToggleHighContrast}
              className={`w-12 h-6 rounded-full relative transition-colors p-0.5 ${
                profile.highContrastEnabled ? 'bg-secondary-fixed-dim' : 'bg-surface-variant'
              }`}
            >
              <div
                className={`w-5 h-5 bg-on-secondary rounded-full shadow-md transform transition-transform ${
                  profile.highContrastEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="h-px bg-surface-container-high mx-4" />

          {/* Emergency Contacts Button */}
          <button
            onClick={() => setShowEmergencyContacts(true)}
            className="flex items-center justify-between p-4 hover:bg-surface-container-high transition-colors text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-error-container/20 border border-error-container/40 text-error flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">
                  health_and_safety
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-body-md text-body-md text-on-surface font-semibold">
                  Emergency Contacts
                </span>
                <span className="text-[12px] text-on-surface-variant leading-tight mt-0.5">
                  {profile.emergencyContacts.length} Configured
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant">
              chevron_right
            </span>
          </button>

        </div>
      </div>

      {/* Actions Section */}
      <div className="mt-4 flex flex-col gap-3">
        <button
          onClick={() => setShowSupportModal(true)}
          className="w-full h-touch-target rounded-xl bg-surface-container-highest text-on-surface font-status-label text-status-label font-bold flex items-center justify-center gap-2 hover:bg-surface-variant transition-colors shadow-sm active:scale-[0.98] border border-surface-variant"
        >
          <span className="material-symbols-outlined text-[20px]">help_center</span>
          Get Support & FAQ
        </button>

        <button
          onClick={onResetData}
          className="w-full h-touch-target rounded-xl bg-surface-container/50 text-error font-status-label text-status-label font-bold flex items-center justify-center gap-2 hover:bg-error-container/20 transition-colors active:scale-[0.98] border border-error-container/30"
        >
          <span className="material-symbols-outlined text-[20px]">restart_alt</span>
          Reset App Data & Cache
        </button>
      </div>

      {/* Emergency Contacts Modal */}
      {showEmergencyContacts && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-surface-container border border-surface-container-highest w-full max-w-sm rounded-[24px] overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-surface-variant">
              <div className="flex items-center gap-2 text-error font-bold">
                <span className="material-symbols-outlined">health_and_safety</span>
                <span>Emergency Contacts</span>
              </div>
              <button
                onClick={() => setShowEmergencyContacts(false)}
                className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-4 flex flex-col gap-3">
              {profile.emergencyContacts.map(c => (
                <div key={c.id} className="bg-surface-container-high p-3 rounded-xl flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-bold text-on-surface text-sm">{c.name} ({c.relationship})</span>
                    <span className="text-xs text-on-surface-variant font-mono">{c.phone}</span>
                  </div>
                  <a href={`tel:${c.phone}`} className="p-2 rounded-full bg-secondary-fixed-dim/20 text-secondary-fixed-dim">
                    <span className="material-symbols-outlined text-[18px]">call</span>
                  </a>
                </div>
              ))}
              <button
                onClick={() => setShowEmergencyContacts(false)}
                className="mt-2 w-full h-11 bg-primary text-on-primary font-bold rounded-xl text-xs uppercase"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-surface-container border border-surface-container-highest w-full max-w-sm rounded-[24px] overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-surface-variant">
              <div className="flex items-center gap-2 text-on-surface font-bold">
                <span className="material-symbols-outlined text-secondary-fixed-dim">help_center</span>
                <span>Travel Support Center</span>
              </div>
              <button
                onClick={() => setShowSupportModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-4 flex flex-col gap-3 text-xs text-on-surface-variant">
              <p className="text-on-surface font-medium">Need immediate assistance with active flight or transit booking?</p>
              <div className="bg-surface-container-lowest p-3 rounded-xl border border-surface-variant flex flex-col gap-1">
                <span className="font-bold text-secondary-fixed-dim">Airline Hotline: 1-800-555-0199</span>
                <span>Airport Transit Concierge Desk 4</span>
              </div>
              <p>All itinerary passes are stored locally on your device for offline verification.</p>
              <button
                onClick={() => setShowSupportModal(false)}
                className="mt-2 w-full h-11 bg-secondary-fixed-dim text-on-secondary font-bold rounded-xl uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
