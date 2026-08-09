import React, { useState } from 'react';
import { useTravelStore } from './store/useTravelStore';
import { useNetInfo } from './hooks/useNetInfo';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { BarcodeScannerModal } from './components/BarcodeScannerModal';
import { AddItineraryModal } from './components/AddItineraryModal';
import { DocumentModal } from './components/DocumentModal';
import { RideBookingModal } from './components/RideBookingModal';
import { TimelineScreen } from './screens/TimelineScreen';
import { OfflinePassesScreen } from './screens/OfflinePassesScreen';
import { TransitHubScreen } from './screens/TransitHubScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SavedDocument, RideOption } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('timeline');
  const [viewMode, setViewMode] = useState<'mobile-frame' | 'responsive'>('mobile-frame');

  const {
    itineraries,
    activeTrip,
    setActiveTripId,
    addItinerary,
    checklist,
    toggleChecklist,
    documents,
    addDocument,
    profile,
    toggleAiAlerts,
    toggleHighContrast,
    simulatedOffline,
    setSimulatedOffline,
    isScannerOpen,
    setIsScannerOpen,
    isAddTripOpen,
    setIsAddTripOpen,
    selectedDoc,
    setSelectedDoc,
    activeRideBooking,
    setActiveRideBooking
  } = useTravelStore();

  const [isAddDocOpen, setIsAddDocOpen] = useState<boolean>(false);

  const { isOnline } = useNetInfo(simulatedOffline);

  const handleScanResult = (pnrOrCode: string) => {
    // If matching PNR, set active trip or alert
    const matched = itineraries.find(t => t.pnr.toUpperCase() === pnrOrCode.toUpperCase());
    if (matched) {
      setActiveTripId(matched.id);
      setActiveTab('timeline');
    } else {
      // Prompt user to add new trip with this PNR
      setIsAddTripOpen(true);
    }
  };

  const handleResetData = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className={`min-h-screen bg-[#0a0c0c] text-on-surface flex flex-col items-center justify-start ${
      profile.highContrastEnabled ? 'high-contrast-mode' : ''
    }`}>
      {/* Top View Mode Switcher Header for Desktop Preview */}
      <div className="w-full bg-[#121414] border-b border-surface-container-high px-4 py-2 flex items-center justify-between z-[60] text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-secondary-fixed-dim animate-pulse" />
          <span className="font-bold text-on-surface text-sm tracking-wide">Travel Day Companion</span>
          <span className="text-[11px] bg-secondary-fixed-dim/20 text-secondary-fixed-dim px-2 py-0.5 rounded-full font-mono">
            Stitch Nocturnal Transit Theme
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'mobile-frame' ? 'responsive' : 'mobile-frame')}
            className="px-3 py-1 bg-surface-container-highest hover:bg-surface-variant text-on-surface font-semibold rounded-lg transition-colors flex items-center gap-1 border border-surface-variant"
          >
            <span className="material-symbols-outlined text-[16px]">
              {viewMode === 'mobile-frame' ? 'smartphone' : 'fit_screen'}
            </span>
            <span>{viewMode === 'mobile-frame' ? 'Mobile Frame View' : 'Full Screen View'}</span>
          </button>
        </div>
      </div>

      {/* Main Container Wrapper */}
      <div className={`w-full flex-grow flex flex-col items-center justify-center transition-all ${
        viewMode === 'mobile-frame' ? 'py-6 px-2' : ''
      }`}>
        <div
          className={`w-full bg-surface relative flex flex-col min-h-screen overflow-x-hidden transition-all ${
            viewMode === 'mobile-frame'
              ? 'max-w-[430px] rounded-[48px] border-[8px] border-[#222424] shadow-[0_0_50px_rgba(0,0,0,0.8)] my-auto min-h-[900px] max-h-[95vh] overflow-y-auto'
              : 'max-w-md shadow-2xl'
          }`}
        >
          {/* Header */}
          <Header
            currentTab={activeTab}
            activeTrip={activeTrip}
            profile={profile}
            isOnline={isOnline}
            simulatedOffline={simulatedOffline}
            onToggleOffline={() => setSimulatedOffline(!simulatedOffline)}
            onOpenPasses={() => setActiveTab('passes')}
            onOpenProfile={() => setActiveTab('profile')}
            onOpenAddTrip={() => setIsAddTripOpen(true)}
          />

          {/* Active Screen View */}
          <main className="flex-grow">
            {activeTab === 'timeline' && (
              <TimelineScreen
                activeTrip={activeTrip}
                allTrips={itineraries}
                onSelectTrip={setActiveTripId}
                onOpenAddTrip={() => setIsAddTripOpen(true)}
                checklist={checklist}
                onToggleChecklist={toggleChecklist}
                onOpenPasses={() => setActiveTab('passes')}
                onBookRide={ride => setActiveRideBooking(ride)}
              />
            )}

            {activeTab === 'passes' && (
              <OfflinePassesScreen
                activeTrip={activeTrip}
                documents={documents}
                onOpenDoc={doc => setSelectedDoc(doc)}
                onOpenAddDoc={() => setIsAddDocOpen(true)}
              />
            )}

            {activeTab === 'transit' && (
              <TransitHubScreen
                activeTrip={activeTrip}
                onBookRide={ride => setActiveRideBooking(ride)}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileScreen
                profile={profile}
                onToggleAiAlerts={toggleAiAlerts}
                onToggleHighContrast={toggleHighContrast}
                onResetData={handleResetData}
              />
            )}
          </main>

          {/* Bottom Glassmorphic Navigation */}
          <BottomNav
            activeTab={activeTab}
            onChangeTab={setActiveTab}
            onOpenScanner={() => setIsScannerOpen(true)}
          />

          {/* Modals & Overlays */}
          <BarcodeScannerModal
            isOpen={isScannerOpen}
            onClose={() => setIsScannerOpen(false)}
            onScanResult={handleScanResult}
          />

          <AddItineraryModal
            isOpen={isAddTripOpen}
            onClose={() => setIsAddTripOpen(false)}
            onAddTrip={addItinerary}
          />

          <DocumentModal
            selectedDoc={selectedDoc}
            isAddMode={isAddDocOpen}
            onClose={() => {
              setSelectedDoc(null);
              setIsAddDocOpen(false);
            }}
            onAddDocument={addDocument}
          />

          <RideBookingModal
            ride={activeRideBooking}
            activeTrip={activeTrip}
            onClose={() => setActiveRideBooking(null)}
            onCancel={() => setActiveRideBooking(null)}
          />
        </div>
      </div>
    </div>
  );
}
