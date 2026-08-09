import React, { useState, useEffect } from 'react';
import { RideOption, Itinerary } from '../types';

interface TransitHubScreenProps {
  activeTrip: Itinerary;
  onBookRide: (ride: RideOption) => void;
}

const RIDE_OPTIONS: RideOption[] = [
  {
    id: 'uber-black',
    provider: 'Uber',
    name: 'Uber Black',
    price: '$54.20',
    eta: '4 mins away',
    dropoffTime: 'Dropoff 10:45 AM',
    isConnected: true
  },
  {
    id: 'lyft-xl',
    provider: 'Lyft',
    name: 'Lyft XL',
    price: '$48.50',
    eta: '7 mins away',
    dropoffTime: 'Dropoff 10:48 AM',
    isConnected: false
  },
  {
    id: 'uber-x',
    provider: 'Uber',
    name: 'UberX Green',
    price: '$32.10',
    eta: '2 mins away',
    dropoffTime: 'Dropoff 10:42 AM',
    isConnected: true
  }
];

export const TransitHubScreen: React.FC<TransitHubScreenProps> = ({
  activeTrip,
  onBookRide
}) => {
  const [selectedRideId, setSelectedRideId] = useState<string>('uber-black');
  const [trainCountdown, setTrainCountdown] = useState<number>(14);

  // Train countdown ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setTrainCountdown(prev => (prev > 1 ? prev - 1 : 15));
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const selectedRide = RIDE_OPTIONS.find(r => r.id === selectedRideId) || RIDE_OPTIONS[0];

  return (
    <div className="flex flex-col w-full relative min-h-screen pt-20 pb-32">
      {/* Interactive Map Background Simulation */}
      <div className="fixed inset-0 z-0 h-full w-full">
        <div
          className="w-full h-full bg-cover bg-center opacity-40 mix-blend-luminosity filter contrast-125"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80')`
          }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/50 pointer-events-none" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col w-full px-margin-mobile gap-gutter mt-4 max-w-md mx-auto">
        
        {/* Header Title */}
        <div className="flex justify-between items-center">
          <h1 className="text-headline-lg-mobile font-headline-lg-mobile text-on-surface font-bold">
            Transit Hub & Cabs
          </h1>
          <span className="text-xs bg-surface-container-high px-3 py-1 rounded-full text-secondary-fixed-dim font-bold border border-surface-variant">
            {activeTrip.originCity} Hub
          </span>
        </div>

        {/* Next Train Express Rail Widget */}
        <div className="bg-surface-container-high/90 backdrop-blur-md rounded-2xl p-card-padding flex flex-col gap-4 shadow-xl border border-surface-container-highest">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary-fixed/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary-fixed text-[18px]">
                  train
                </span>
              </div>
              <span className="font-status-label text-status-label text-secondary-fixed font-bold tracking-wider">
                EXPRESS RAIL
              </span>
            </div>
            <span className="font-body-md text-body-md text-on-surface-variant font-medium">
              {activeTrip.terminalOrPlatform || 'Platform 2'}
            </span>
          </div>

          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="font-body-md text-body-md text-on-surface-variant">
                Next train to {activeTrip.originCode} Terminal
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-display-critical text-display-critical text-on-surface font-bold leading-none">
                  {trainCountdown}
                </span>
                <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface-variant font-bold">
                  min
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-secondary-fixed-dim/15 px-3 py-1 rounded-full border border-secondary-fixed-dim/30">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim animate-pulse" />
              <span className="font-status-label text-status-label text-secondary-fixed-dim font-bold">
                On Time
              </span>
            </div>
          </div>

          {/* Rail Progress Bar */}
          <div className="w-full h-1.5 bg-surface-container-lowest rounded-full overflow-hidden mt-1">
            <div className="h-full bg-secondary-fixed w-[70%] rounded-full shadow-[0_0_10px_#79ff5b]" />
          </div>
        </div>

        {/* Ride Hail Options List */}
        <div className="flex flex-col gap-3 mt-2">
          <span className="font-status-label text-status-label text-on-surface-variant uppercase tracking-wider font-bold ml-1">
            Ride Hail Options
          </span>

          {RIDE_OPTIONS.map(ride => {
            const isSelected = ride.id === selectedRideId;
            return (
              <label
                key={ride.id}
                onClick={() => setSelectedRideId(ride.id)}
                className={`relative flex items-center justify-between p-4 bg-surface-container/90 backdrop-blur-md rounded-2xl shadow-md cursor-pointer overflow-hidden border transition-all ${
                  isSelected ? 'border-primary shadow-lg shadow-black/40' : 'border-surface-container-high opacity-80 hover:opacity-100'
                }`}
              >
                {/* Active Highlight */}
                {isSelected && (
                  <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
                )}
                {/* Left Accent Bar */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1.5 bg-primary transition-transform origin-center ${
                    isSelected ? 'scale-y-100' : 'scale-y-0'
                  }`}
                />

                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 bg-surface-container-highest rounded-xl flex items-center justify-center p-2 border border-surface-variant">
                    <span className="material-symbols-outlined text-[28px] text-on-surface">
                      {ride.provider === 'Uber' ? 'directions_car' : 'local_taxi'}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface text-[18px] font-bold leading-tight">
                        {ride.name}
                      </span>
                      {ride.isConnected && (
                        <span className="px-2 py-0.5 rounded bg-secondary-fixed/15 font-status-label text-status-label text-secondary-fixed text-[10px] font-bold border border-secondary-fixed/30">
                          Connected
                        </span>
                      )}
                    </div>
                    <span className="font-body-md text-body-md text-on-surface-variant text-[13px]">
                      {ride.eta} • {ride.dropoffTime}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end relative z-10">
                  <span className="font-data-mono text-data-mono text-on-surface font-bold">
                    {ride.price}
                  </span>
                  <span className={`material-symbols-outlined text-[22px] mt-1 ${isSelected ? 'text-primary' : 'text-on-surface-variant/40'}`}>
                    {isSelected ? 'radio_button_checked' : 'radio_button_unchecked'}
                  </span>
                </div>
              </label>
            );
          })}
        </div>

        {/* Bottom Request Ride Action Button */}
        <div className="mt-4 flex flex-col gap-4">
          <button
            onClick={() => onBookRide(selectedRide)}
            className="w-full h-14 bg-primary text-on-primary font-status-label text-status-label font-bold rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all uppercase tracking-wide"
          >
            Request {selectedRide.name}
          </button>
        </div>
      </div>
    </div>
  );
};
