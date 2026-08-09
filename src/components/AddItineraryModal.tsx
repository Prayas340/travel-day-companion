import React, { useState } from 'react';
import { TransitType, Itinerary } from '../types';

interface AddItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTrip: (trip: Omit<Itinerary, 'id'>) => void;
}

export const AddItineraryModal: React.FC<AddItineraryModalProps> = ({
  isOpen,
  onClose,
  onAddTrip
}) => {
  const [type, setType] = useState<TransitType>('flight');
  const [carrierCode, setCarrierCode] = useState('BA 117');
  const [carrierName, setCarrierName] = useState('British Airways');
  const [pnr, setPnr] = useState('BA8821');
  const [originCode, setOriginCode] = useState('LHR');
  const [originCity, setOriginCity] = useState('London');
  const [destCode, setDestCode] = useState('JFK');
  const [destCity, setDestCity] = useState('New York');
  const [departureDate, setDepartureDate] = useState('2026-08-12');
  const [departureTime, setDepartureTime] = useState('09:45 AM');
  const [gate, setGate] = useState('A22');
  const [terminalOrPlatform, setTerminalOrPlatform] = useState('T5');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTrip({
      type,
      carrierCode: carrierCode.toUpperCase(),
      carrierName: carrierName || (type === 'flight' ? 'Airline' : 'Rail Express'),
      pnr: pnr.toUpperCase() || 'PNR998',
      originCode: originCode.toUpperCase(),
      originCity,
      destCode: destCode.toUpperCase(),
      destCity,
      departureDate,
      departureTime,
      gate,
      terminalOrPlatform,
      status: 'On Time',
      leaveHomeMinutes: 30,
      trafficSummary: 'Traffic is clear to airport.',
      bagDropSecondsRemaining: 3600,
      weatherOrigin: { city: originCode, code: originCode, temp: '20°C', condition: 'Clear', icon: 'sunny' },
      weatherDest: { city: destCode, code: destCode, temp: '24°C', condition: 'Sunny', icon: 'sunny' }
    });
    onClose();
  };

  const loadPreset = (presetType: TransitType) => {
    if (presetType === 'flight') {
      setType('flight');
      setCarrierCode('EK 201');
      setCarrierName('Emirates');
      setPnr('EK-X992');
      setOriginCode('DXB');
      setOriginCity('Dubai');
      setDestCode('JFK');
      setDestCity('New York');
      setDepartureTime('08:00 AM');
      setGate('B14');
      setTerminalOrPlatform('T3');
    } else {
      setType('train');
      setCarrierCode('12301');
      setCarrierName('Rajdhani Express');
      setPnr('RAIL-9920');
      setOriginCode('NDLS');
      setOriginCity('New Delhi');
      setDestCode('HWH');
      setDestCity('Howrah');
      setDepartureTime('04:30 PM');
      setGate('P2');
      setTerminalOrPlatform('Platform 2');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-surface-container border border-surface-container-highest w-full max-w-md rounded-[24px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-surface-variant">
          <div className="flex items-center gap-2 text-on-surface font-bold text-lg">
            <span className="material-symbols-outlined text-secondary-fixed-dim">post_add</span>
            <span>Add New Trip</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4 overflow-y-auto hide-scrollbar">
          {/* Flight / Train Switcher */}
          <div className="flex p-1 bg-surface-container-high rounded-xl">
            <button
              type="button"
              onClick={() => { setType('flight'); loadPreset('flight'); }}
              className={`flex-1 py-2.5 text-status-label font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                type === 'flight' ? 'bg-primary text-surface shadow-md' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">flight_takeoff</span>
              Flight
            </button>
            <button
              type="button"
              onClick={() => { setType('train'); loadPreset('train'); }}
              className={`flex-1 py-2.5 text-status-label font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                type === 'train' ? 'bg-primary text-surface shadow-md' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">train</span>
              Train
            </button>
          </div>

          {/* Quick Presets */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => loadPreset('flight')}
              className="text-[11px] px-3 py-1 bg-surface-container-lowest border border-surface-variant text-on-surface-variant rounded-full hover:border-secondary-fixed-dim"
            >
              Preset: Dubai Flight
            </button>
            <button
              type="button"
              onClick={() => loadPreset('train')}
              className="text-[11px] px-3 py-1 bg-surface-container-lowest border border-surface-variant text-on-surface-variant rounded-full hover:border-secondary-fixed-dim"
            >
              Preset: Express Train
            </button>
          </div>

          {/* Carrier Code / Train # */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              {type === 'flight' ? 'Flight Carrier Code (e.g. AI 202)' : 'Train Number (e.g. 12301)'}
            </label>
            <input
              type="text"
              required
              value={carrierCode}
              onChange={e => setCarrierCode(e.target.value)}
              placeholder="e.g. AI 202"
              className="h-12 bg-surface-container-lowest text-on-surface px-4 rounded-xl text-sm font-bold uppercase focus:outline-none focus:ring-2 focus:ring-secondary-fixed-dim"
            />
          </div>

          {/* Carrier Name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              {type === 'flight' ? 'Airline Name' : 'Train Line'}
            </label>
            <input
              type="text"
              value={carrierName}
              onChange={e => setCarrierName(e.target.value)}
              placeholder="e.g. Air India / Rajdhani Express"
              className="h-12 bg-surface-container-lowest text-on-surface px-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary-fixed-dim"
            />
          </div>

          {/* PNR / Booking Ref */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">PNR / Booking Reference</label>
            <input
              type="text"
              required
              value={pnr}
              onChange={e => setPnr(e.target.value)}
              placeholder="Enter PNR or Booking Ref"
              className="h-12 bg-surface-container-lowest text-on-surface px-4 rounded-xl text-sm font-mono tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-secondary-fixed-dim"
            />
          </div>

          {/* Origin & Destination Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Origin Code & City</label>
              <input
                type="text"
                value={originCode}
                onChange={e => setOriginCode(e.target.value)}
                placeholder="Code (e.g. LHR)"
                className="h-10 bg-surface-container-lowest text-on-surface px-3 rounded-lg text-xs font-bold uppercase mb-1"
              />
              <input
                type="text"
                value={originCity}
                onChange={e => setOriginCity(e.target.value)}
                placeholder="City (e.g. London)"
                className="h-10 bg-surface-container-lowest text-on-surface px-3 rounded-lg text-xs"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Destination Code & City</label>
              <input
                type="text"
                value={destCode}
                onChange={e => setDestCode(e.target.value)}
                placeholder="Code (e.g. JFK)"
                className="h-10 bg-surface-container-lowest text-on-surface px-3 rounded-lg text-xs font-bold uppercase mb-1"
              />
              <input
                type="text"
                value={destCity}
                onChange={e => setDestCity(e.target.value)}
                placeholder="City (e.g. New York)"
                className="h-10 bg-surface-container-lowest text-on-surface px-3 rounded-lg text-xs"
              />
            </div>
          </div>

          {/* Departure Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Departure Date</label>
              <input
                type="date"
                value={departureDate}
                onChange={e => setDepartureDate(e.target.value)}
                className="h-11 bg-surface-container-lowest text-on-surface px-3 rounded-xl text-xs"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Departure Time</label>
              <input
                type="text"
                value={departureTime}
                onChange={e => setDepartureTime(e.target.value)}
                placeholder="e.g. 06:15 AM"
                className="h-11 bg-surface-container-lowest text-on-surface px-3 rounded-xl text-xs font-bold"
              />
            </div>
          </div>

          {/* Gate & Terminal */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Gate / Platform</label>
              <input
                type="text"
                value={gate}
                onChange={e => setGate(e.target.value)}
                placeholder="e.g. B12 or P2"
                className="h-11 bg-surface-container-lowest text-on-surface px-3 rounded-xl text-xs uppercase"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Terminal</label>
              <input
                type="text"
                value={terminalOrPlatform}
                onChange={e => setTerminalOrPlatform(e.target.value)}
                placeholder="e.g. T2 or Platform 2"
                className="h-11 bg-surface-container-lowest text-on-surface px-3 rounded-xl text-xs"
              />
            </div>
          </div>

          {/* Build Timeline Submit Button */}
          <button
            type="submit"
            className="mt-2 w-full h-14 bg-secondary-container text-on-secondary-container font-bold rounded-xl flex items-center justify-center gap-2 uppercase tracking-wide shadow-lg hover:brightness-105 active:scale-98 transition-all"
          >
            <span className="material-symbols-outlined">timeline</span>
            Build My Timeline
          </button>
        </form>
      </div>
    </div>
  );
};
