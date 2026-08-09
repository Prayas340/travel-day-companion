import React, { useState, useEffect } from 'react';
import { RideOption, Itinerary } from '../types';

interface RideBookingModalProps {
  ride: RideOption | null;
  activeTrip: Itinerary;
  onClose: () => void;
  onCancel: () => void;
}

export const RideBookingModal: React.FC<RideBookingModalProps> = ({
  ride,
  activeTrip,
  onClose,
  onCancel
}) => {
  const [stage, setStage] = useState<'requesting' | 'assigned' | 'enroute'>('requesting');
  const [driverEta, setDriverEta] = useState(4);

  useEffect(() => {
    if (!ride) return;
    setStage('requesting');
    setDriverEta(parseInt(ride.eta) || 4);

    const t1 = setTimeout(() => {
      setStage('assigned');
    }, 1800);

    const t2 = setTimeout(() => {
      setStage('enroute');
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [ride]);

  if (!ride) return null;

  const deepLink = ride.provider === 'Uber'
    ? `https://m.uber.com/ul/?action=setPickup&dropoff[formatted_address]=${encodeURIComponent(activeTrip.destCity)}`
    : `https://lyft.com/ride`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-surface-container border border-surface-container-highest w-full max-w-sm rounded-[24px] overflow-hidden shadow-2xl flex flex-col">
        {/* Top Header */}
        <div className="p-4 flex items-center justify-between border-b border-surface-variant bg-surface-container-high">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary-fixed-dim">local_taxi</span>
            <span className="font-bold text-on-surface text-base">{ride.name} Booking</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Live Status Animation View */}
        <div className="p-6 flex flex-col items-center justify-center text-center gap-4 relative overflow-hidden">
          <div className="w-24 h-24 rounded-full bg-secondary-fixed-dim/10 border-2 border-secondary-fixed-dim/40 flex items-center justify-center relative">
            <span className="material-symbols-outlined text-secondary-fixed-dim text-[48px] animate-pulse">
              {stage === 'requesting' ? 'sync' : stage === 'assigned' ? 'directions_car' : 'time_to_leave'}
            </span>
            <div className="absolute inset-0 rounded-full border border-secondary-fixed-dim animate-ping opacity-30" />
          </div>

          {stage === 'requesting' && (
            <div className="flex flex-col items-center gap-1">
              <h3 className="font-bold text-lg text-on-surface">Connecting to {ride.provider}...</h3>
              <p className="text-xs text-on-surface-variant">Dispatching nearest driver to your current location</p>
            </div>
          )}

          {stage === 'assigned' && (
            <div className="flex flex-col items-center gap-1">
              <span className="px-3 py-1 bg-secondary-fixed-dim/20 text-secondary-fixed-dim rounded-full text-xs font-bold uppercase tracking-wider">
                Driver Assigned!
              </span>
              <h3 className="font-bold text-xl text-on-surface">Michael S. • Toyota Camry</h3>
              <p className="text-xs text-on-surface-variant">License Plate: 7XYZ89 • Rating 4.98 ★</p>
            </div>
          )}

          {stage === 'enroute' && (
            <div className="flex flex-col items-center gap-1">
              <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold uppercase tracking-wider">
                Driver Arriving in {driverEta} mins
              </span>
              <h3 className="font-bold text-lg text-on-surface">Head to Departure Curb 3</h3>
              <p className="text-xs text-on-surface-variant">Destination: {activeTrip.originCity} Transit Terminal</p>
            </div>
          )}

          {/* Ride Details Card */}
          <div className="w-full bg-surface-container-lowest p-4 rounded-xl flex items-center justify-between border border-surface-variant text-left mt-2">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-on-surface-variant uppercase">{ride.provider} Fare</span>
              <span className="text-xl font-bold text-on-surface font-mono">{ride.price}</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-xs font-bold text-on-surface-variant uppercase">Est. Dropoff</span>
              <span className="text-sm font-bold text-secondary-fixed-dim">{ride.dropoffTime}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col gap-2 mt-2">
            <a
              href={deepLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-12 bg-secondary-fixed-dim text-on-secondary font-bold rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-98 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              Open in {ride.provider} App
            </a>

            <button
              onClick={() => {
                onCancel();
                onClose();
              }}
              className="w-full h-10 text-error font-bold text-xs uppercase hover:bg-error-container/10 rounded-lg transition-colors"
            >
              Cancel Ride
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
