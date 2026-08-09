import React, { useState, useEffect } from 'react';
import { Itinerary, ChecklistItem, RideOption } from '../types';

interface TimelineScreenProps {
  activeTrip: Itinerary;
  allTrips: Itinerary[];
  onSelectTrip: (tripId: string) => void;
  onOpenAddTrip: () => void;
  checklist: ChecklistItem[];
  onToggleChecklist: (id: string) => void;
  onOpenPasses: () => void;
  onBookRide: (ride: RideOption) => void;
}

export const TimelineScreen: React.FC<TimelineScreenProps> = ({
  activeTrip,
  allTrips,
  onSelectTrip,
  onOpenAddTrip,
  checklist,
  onToggleChecklist,
  onOpenPasses,
  onBookRide
}) => {
  const [pnrInput, setPnrInput] = useState('');
  const [bagDropTimer, setBagDropTimer] = useState(activeTrip.bagDropSecondsRemaining || 2700);

  // Countdown ticker for bag drop
  useEffect(() => {
    const interval = setInterval(() => {
      setBagDropTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const sampleUberRide: RideOption = {
    id: 'ride-uber-black',
    provider: 'Uber',
    name: 'Uber Black',
    price: '$54.20',
    eta: '4 mins',
    dropoffTime: '06:55 AM',
    isConnected: true
  };

  return (
    <div className="flex flex-col w-full px-margin-mobile gap-6 pt-24 pb-32 max-w-md mx-auto">
      {/* Active Trip Quick Selector Header */}
      {allTrips.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
          <span className="text-xs text-on-surface-variant font-bold uppercase shrink-0">Switch Trip:</span>
          {allTrips.map(trip => (
            <button
              key={trip.id}
              onClick={() => onSelectTrip(trip.id)}
              className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all ${
                trip.id === activeTrip.id
                  ? 'bg-secondary-fixed-dim text-on-secondary shadow-md'
                  : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {trip.carrierCode} ({trip.originCode}→{trip.destCode})
            </button>
          ))}
        </div>
      )}

      {/* Smart Departure Alert Hero Card */}
      <div className="relative w-full rounded-[24px] overflow-hidden bg-surface-container shadow-xl border border-surface-container-high">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent pointer-events-none" />
        <div className="relative p-card-padding flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-status-label font-status-label text-on-surface-variant uppercase tracking-wider">
                Leave Home In
              </span>
              <span className="text-display-critical font-display-critical text-on-surface leading-none">
                {activeTrip.leaveHomeMinutes}
                <span className="text-headline-lg font-headline-lg text-on-surface-variant ml-0.5">m</span>
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-secondary-container/20 border border-secondary-container/40 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary-container animate-pulse">
                directions_car
              </span>
            </div>
          </div>
          <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden mt-2">
            <div className="w-3/4 h-full bg-secondary-container rounded-full shadow-[0_0_8px_#2ff801]" />
          </div>
          <span className="text-body-md font-body-md text-on-surface-variant mt-1">
            {activeTrip.trafficSummary || 'Traffic is light to terminal.'}
          </span>
        </div>
      </div>

      {/* Flight / Train PNR Input Bar Component */}
      <div className="flex flex-col gap-4 bg-surface-container-high rounded-[24px] p-4 shadow-lg border border-surface-variant">
        <div className="flex p-1 bg-surface-container rounded-lg">
          <button
            onClick={onOpenAddTrip}
            className={`flex-1 py-2 text-status-label font-status-label rounded-md shadow-sm transition-all ${
              activeTrip.type === 'flight' ? 'text-surface bg-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            Flight
          </button>
          <button
            onClick={onOpenAddTrip}
            className={`flex-1 py-2 text-status-label font-status-label rounded-md transition-all ${
              activeTrip.type === 'train' ? 'text-surface bg-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            Train
          </button>
        </div>

        <div className="relative w-full">
          <input
            type="text"
            value={pnrInput}
            onChange={e => setPnrInput(e.target.value)}
            placeholder="Enter PNR or Booking Ref"
            className="w-full h-14 bg-surface-container-lowest text-on-surface text-body-md font-body-md rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-secondary-container uppercase tracking-wider placeholder:normal-case placeholder:text-on-surface-variant/50 border border-surface-variant"
          />
          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
            search
          </span>
        </div>

        <button
          onClick={onOpenAddTrip}
          className="w-full h-14 bg-secondary-container text-on-secondary-container text-status-label font-status-label rounded-xl flex items-center justify-center gap-2 uppercase tracking-wide font-bold hover:brightness-105 active:scale-98 transition-all shadow-md"
        >
          <span className="material-symbols-outlined">timeline</span>
          Build My Timeline
        </button>
      </div>

      {/* Today's Journey Section Header */}
      <div className="flex flex-col pt-2">
        <h2 className="text-headline-lg-mobile font-headline-lg-mobile text-on-surface mb-6 font-bold">
          Today's Journey
        </h2>

        {/* Vertical Timeline */}
        <div className="relative pl-6 border-l-2 border-surface-variant flex flex-col gap-8 pb-4">

          {/* Timeline Node 1: Departure / Leave Home */}
          <div className="relative">
            <div className="absolute -left-[35px] top-1 w-6 h-6 rounded-full bg-surface border-4 border-secondary-container z-10 shadow-[0_0_8px_#2ff801]" />
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-baseline">
                <span className="text-headline-lg font-headline-lg text-on-surface font-bold">
                  {activeTrip.departureTime}
                </span>
                <span className="text-status-label font-status-label text-on-surface-variant">
                  Departure
                </span>
              </div>
              <div className="bg-surface-container rounded-xl p-4 flex justify-between items-center border border-surface-container-high">
                <div className="flex flex-col">
                  <span className="text-body-md font-body-md text-on-surface font-bold">Leave Home</span>
                  <span className="text-status-label font-status-label text-on-surface-variant">
                    Est. 45m drive to {activeTrip.originCode}
                  </span>
                </div>
                <button
                  onClick={() => onBookRide(sampleUberRide)}
                  className="bg-[#000000] text-surface text-status-label font-status-label px-4 py-2 rounded-lg flex items-center gap-1 hover:brightness-125 active:scale-95 transition-all shadow-md font-bold"
                >
                  Book Uber
                </button>
              </div>
            </div>
          </div>

          {/* Timeline Node 2: Check-In & Bag Drop */}
          <div className="relative">
            <div className="absolute -left-[35px] top-1 w-6 h-6 rounded-full bg-surface border-4 border-tertiary-fixed-dim z-10" />
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-baseline">
                <span className="text-headline-lg font-headline-lg text-on-surface font-bold">07:00 AM</span>
                <span className="text-status-label font-status-label text-on-surface-variant">Check-In</span>
              </div>
              <div className="bg-surface-container rounded-xl p-4 flex flex-col gap-3 border border-surface-container-high">
                <div className="flex justify-between items-center">
                  <span className="text-body-md font-body-md text-on-surface">Bag Drop Closes In</span>
                  <span className="text-data-mono font-data-mono text-tertiary-fixed-dim font-bold">
                    {formatCountdown(bagDropTimer)}
                  </span>
                </div>
                <div
                  onClick={onOpenPasses}
                  className="h-24 rounded-lg bg-primary-container border border-surface-variant relative overflow-hidden flex items-center justify-between px-4 cursor-pointer hover:border-secondary-fixed-dim transition-colors group"
                >
                  <div className="flex flex-col z-10">
                    <span className="text-status-label font-status-label text-on-surface-variant">Boarding Pass</span>
                    <span className="text-body-md font-body-md text-on-surface font-bold group-hover:text-secondary-fixed-dim transition-colors">
                      Tap to reveal • PNR: {activeTrip.pnr}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[40px] text-surface-variant group-hover:text-secondary-fixed-dim transition-colors z-10">
                    qr_code_scanner
                  </span>
                  <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-surface-variant/20 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Node 3: Boarding Starts (Gate & Terminal) */}
          <div className="relative">
            <div className="absolute -left-[35px] top-1 w-6 h-6 rounded-full bg-surface border-4 border-error z-10 animate-pulse" />
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-baseline">
                <span className="text-headline-lg font-headline-lg text-on-surface font-bold">08:30 AM</span>
                <span className="text-status-label font-status-label text-error font-bold tracking-wider">
                  BOARDING STARTS
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-surface-container rounded-xl p-4 flex flex-col items-center justify-center gap-1 border-l-4 border-error shadow-md">
                  <span className="text-status-label font-status-label text-on-surface-variant uppercase tracking-wider">
                    {activeTrip.type === 'flight' ? 'Gate' : 'Platform'}
                  </span>
                  <span className="text-display-critical font-display-critical text-on-surface font-bold">
                    {activeTrip.gate}
                  </span>
                </div>
                <div className="bg-surface-container rounded-xl p-4 flex flex-col items-center justify-center gap-1 border-l-4 border-secondary-container shadow-md">
                  <span className="text-status-label font-status-label text-on-surface-variant uppercase tracking-wider">
                    Terminal
                  </span>
                  <span className="text-display-critical font-display-critical text-on-surface font-bold">
                    {activeTrip.terminalOrPlatform}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Node 4: Weather Conditions */}
          <div className="relative">
            <div className="absolute -left-[35px] top-1 w-6 h-6 rounded-full bg-surface border-4 border-surface-variant z-10" />
            <div className="flex flex-col gap-3">
              <span className="text-status-label font-status-label text-on-surface-variant uppercase tracking-wider">
                Weather Conditions
              </span>
              <div className="flex gap-2">
                <div className="flex-1 bg-surface-container rounded-xl p-3 flex items-center justify-between border border-surface-container-high">
                  <div className="flex flex-col">
                    <span className="text-status-label font-status-label text-on-surface-variant">
                      {activeTrip.weatherOrigin.city}
                    </span>
                    <span className="text-body-md font-body-md text-on-surface font-bold">
                      {activeTrip.weatherOrigin.temp}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-tertiary-fixed-dim text-[28px]">
                    {activeTrip.weatherOrigin.icon}
                  </span>
                </div>
                <div className="flex-1 bg-surface-container rounded-xl p-3 flex items-center justify-between border border-surface-container-high">
                  <div className="flex flex-col">
                    <span className="text-status-label font-status-label text-on-surface-variant">
                      {activeTrip.weatherDest.city}
                    </span>
                    <span className="text-body-md font-body-md text-on-surface font-bold">
                      {activeTrip.weatherDest.temp}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-outline text-[28px]">
                    {activeTrip.weatherDest.icon}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Node 5: Quick Checklist */}
          <div className="relative">
            <div className="absolute -left-[35px] top-1 w-6 h-6 rounded-full bg-surface border-4 border-surface-variant z-10" />
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-status-label font-status-label text-on-surface-variant uppercase tracking-wider">
                  Quick Checklist
                </span>
                <span className="text-xs text-secondary-fixed-dim font-bold">
                  {checklist.filter(c => c.checked).length}/{checklist.length} Packed
                </span>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory hide-scrollbar">
                {checklist.map(item => (
                  <div
                    key={item.id}
                    onClick={() => onToggleChecklist(item.id)}
                    className={`snap-center shrink-0 w-32 h-32 rounded-xl p-3 flex flex-col justify-between cursor-pointer transition-all active:scale-95 border ${
                      item.checked
                        ? 'bg-surface-container border-secondary-fixed-dim/50 shadow-md'
                        : 'bg-surface-container-low border-surface-variant opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        item.checked ? 'bg-secondary-container/20 text-secondary-container' : 'bg-surface-variant text-on-surface-variant'
                      }`}>
                        <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                      </div>
                      <span className={`material-symbols-outlined text-[20px] ${item.checked ? 'text-secondary-fixed-dim' : 'text-surface-variant'}`}>
                        {item.checked ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                    </div>
                    <span className={`text-status-label font-status-label font-bold ${item.checked ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
