import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Itinerary, SavedDocument } from '../types';

interface OfflinePassesScreenProps {
  activeTrip: Itinerary;
  documents: SavedDocument[];
  onOpenDoc: (doc: SavedDocument) => void;
  onOpenAddDoc: () => void;
}

export const OfflinePassesScreen: React.FC<OfflinePassesScreenProps> = ({
  activeTrip,
  documents,
  onOpenDoc,
  onOpenAddDoc
}) => {
  const [isQrExpanded, setIsQrExpanded] = useState<boolean>(true);

  return (
    <div className="flex flex-col w-full px-margin-mobile gap-6 pt-24 pb-32 max-w-md mx-auto relative">
      {/* Top Action Row */}
      <div className="flex justify-between items-center pt-2">
        <h1 className="text-headline-lg-mobile font-headline-lg-mobile text-on-surface font-bold">
          Wallet & Offline Passes
        </h1>
        <button
          onClick={onOpenAddDoc}
          title="Add Saved Document"
          className="w-10 h-10 rounded-full bg-surface-container-high border border-surface-variant flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors shadow-sm active:scale-95"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>

      {/* Active Pass (Boarding Pass Card) */}
      <div className="flex flex-col relative group cursor-pointer">
        {/* Pass Header / Top Section */}
        <div
          onClick={() => setIsQrExpanded(!isQrExpanded)}
          className="bg-surface-container border border-surface-container-high relative rounded-t-2xl p-card-padding flex flex-col gap-4 overflow-hidden z-20 shadow-xl transition-transform active:scale-[0.99]"
        >
          {/* Decorative Accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-secondary-fixed-dim shadow-[0_0_8px_#79ff5b]" />

          <div className="flex justify-between items-start">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary-fixed-dim border border-secondary-fixed-dim/30">
                <span className="material-symbols-outlined">
                  {activeTrip.type === 'flight' ? 'flight_takeoff' : 'train'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-status-label font-status-label text-secondary-fixed-dim uppercase tracking-wider font-bold">
                  Active Now
                </span>
                <span className="text-body-md font-body-md text-on-surface font-bold">
                  {activeTrip.type === 'flight' ? 'Flight' : 'Train'} {activeTrip.carrierCode}
                </span>
              </div>
            </div>

            <div className="bg-secondary-fixed-dim/15 px-3 py-1 rounded-full flex items-center gap-1.5 border border-secondary-fixed-dim/30">
              <div className="w-2 h-2 rounded-full bg-secondary-fixed-dim animate-pulse" />
              <span className="text-status-label font-status-label text-secondary-fixed-dim font-bold">
                {activeTrip.status}
              </span>
            </div>
          </div>

          {/* Flight Path Graphic */}
          <div className="flex justify-between items-center pt-2">
            <div className="flex flex-col">
              <span className="text-display-critical font-display-critical text-on-surface font-bold">
                {activeTrip.originCode}
              </span>
              <span className="text-body-md font-body-md text-on-surface-variant">
                {activeTrip.originCity}
              </span>
            </div>

            <div className="flex-grow px-4 flex items-center justify-center relative">
              <div className="w-full h-[2px] bg-surface-container-highest relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-[2px] bg-secondary-fixed-dim" />
              </div>
              <span className="material-symbols-outlined absolute text-secondary-fixed-dim bg-surface-container px-1 left-1/2 -translate-x-1/2">
                {activeTrip.type === 'flight' ? 'airplanemode_active' : 'directions_railway'}
              </span>
            </div>

            <div className="flex flex-col text-right">
              <span className="text-display-critical font-display-critical text-on-surface font-bold">
                {activeTrip.destCode}
              </span>
              <span className="text-body-md font-body-md text-on-surface-variant">
                {activeTrip.destCity}
              </span>
            </div>
          </div>

          {/* Gate & Expand Toggle */}
          <div className="flex justify-between items-end pt-4">
            <span className="text-status-label font-status-label text-on-surface-variant flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-[18px]">
                {isQrExpanded ? 'expand_less' : 'expand_more'}
              </span>
              {isQrExpanded ? 'Tap to collapse QR' : 'Tap to expand QR'}
            </span>
            <div className="flex flex-col text-right">
              <span className="text-status-label font-status-label text-on-surface-variant">
                {activeTrip.type === 'flight' ? 'Gate' : 'Platform'}
              </span>
              <span className="text-data-mono font-data-mono text-secondary-fixed-dim font-bold">
                {activeTrip.gate}
              </span>
            </div>
          </div>
        </div>

        {/* Hidden/Expandable QR Section */}
        <div
          className={`bg-surface-container-high rounded-b-2xl px-card-padding pb-card-padding pt-6 -mt-2 flex flex-col items-center justify-center gap-4 z-10 border border-t-0 border-surface-container-highest shadow-md relative overflow-hidden transition-all duration-300 ${
            isQrExpanded ? 'max-h-[350px] opacity-100' : 'max-h-16 opacity-40'
          }`}
        >
          {/* Decorative cutouts */}
          <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-surface" />
          <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-surface" />
          <div
            className="absolute top-0 left-6 right-6 h-[1px] opacity-30"
            style={{
              backgroundImage: 'linear-gradient(to right, #e2e2e2 50%, transparent 50%)',
              backgroundSize: '8px 1px',
              backgroundRepeat: 'repeat-x'
            }}
          />

          {/* Scalable Dynamic QR Code */}
          <div className={`p-3 bg-white rounded-xl shadow-lg transition-all ${isQrExpanded ? 'scale-100' : 'scale-75 opacity-40'}`}>
            <QRCodeSVG
              value={`BOARDING_PASS:${activeTrip.carrierCode}:${activeTrip.pnr}:${activeTrip.originCode}->${activeTrip.destCode}`}
              size={160}
              bgColor="#ffffff"
              fgColor="#0c0f0f"
              level="H"
            />
          </div>

          <div className="flex flex-col items-center gap-0.5">
            <span className="text-data-mono font-data-mono text-on-surface tracking-[0.2em] font-bold">
              PNR: {activeTrip.pnr}
            </span>
            <span className="text-[11px] text-on-surface-variant uppercase font-semibold">
              Available 100% Offline
            </span>
          </div>
        </div>
      </div>

      {/* Saved Documents List */}
      <div className="flex flex-col gap-3 mt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-status-label font-status-label text-on-surface-variant uppercase tracking-wider font-bold">
            Saved Documents
          </h2>
          <span className="text-xs text-on-surface-variant font-semibold">
            {documents.length} Files Offline
          </span>
        </div>

        {documents.map(doc => (
          <div
            key={doc.id}
            onClick={() => onOpenDoc(doc)}
            className="bg-surface-container-low p-4 rounded-2xl flex items-center justify-between shadow-sm active:bg-surface-container transition-colors cursor-pointer border border-surface-container-high hover:border-secondary-fixed-dim/40"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container-high border border-surface-variant flex items-center justify-center text-on-surface">
                <span className="material-symbols-outlined text-[24px]">{doc.icon}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-body-md font-body-md text-on-surface font-bold">
                  {doc.title}
                </span>
                <span className="text-status-label font-status-label text-on-surface-variant">
                  {doc.subtitle}
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant">
              chevron_right
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
