import React, { useState } from 'react';

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanResult: (pnrOrCode: string) => void;
}

export const BarcodeScannerModal: React.FC<BarcodeScannerModalProps> = ({
  isOpen,
  onClose,
  onScanResult
}) => {
  const [manualCode, setManualCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedSuccess, setScannedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScannedSuccess(true);
      setTimeout(() => {
        setScannedSuccess(false);
        onScanResult('X7Y8Z9');
        onClose();
      }, 1200);
    }, 1500);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    onScanResult(manualCode.trim().toUpperCase());
    setManualCode('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-surface-container border border-surface-container-highest w-full max-w-sm rounded-[24px] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-surface-variant">
          <div className="flex items-center gap-2 text-secondary-fixed-dim">
            <span className="material-symbols-outlined">barcode_scanner</span>
            <span className="font-headline-lg-mobile text-[18px]">Scan Boarding Pass</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Camera Viewport Simulation */}
        <div className="relative w-full h-64 bg-black flex flex-col items-center justify-center overflow-hidden">
          {/* Grid target */}
          <div className="relative w-48 h-48 border-2 border-dashed border-secondary-fixed-dim/60 rounded-xl flex items-center justify-center">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-secondary-fixed-dim rounded-tl-sm" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-secondary-fixed-dim rounded-tr-sm" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-secondary-fixed-dim rounded-bl-sm" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-secondary-fixed-dim rounded-br-sm" />

            {/* Laser scanning line */}
            <div className="absolute inset-x-0 top-1/2 h-0.5 bg-secondary-fixed shadow-[0_0_12px_#79ff5b] animate-bounce" />

            {scannedSuccess ? (
              <div className="flex flex-col items-center gap-2 bg-secondary-container/90 px-4 py-3 rounded-xl text-on-secondary-container animate-pulse">
                <span className="material-symbols-outlined text-[36px]">check_circle</span>
                <span className="font-bold text-sm">PNR Matched!</span>
              </div>
            ) : isScanning ? (
              <span className="text-secondary-fixed text-xs font-mono animate-pulse">Reading QR / Barcode...</span>
            ) : (
              <span className="text-on-surface-variant/60 text-xs font-mono text-center px-2">
                Align QR / Barcode inside frame
              </span>
            )}
          </div>

          <button
            onClick={handleSimulateScan}
            disabled={isScanning}
            className="mt-4 px-4 py-2 bg-secondary-fixed-dim text-on-secondary text-xs font-bold uppercase rounded-full shadow-lg hover:brightness-110 active:scale-95 transition-all"
          >
            {isScanning ? 'Scanning...' : 'Simulate Camera Scan'}
          </button>
        </div>

        {/* Manual Code Input Form */}
        <form onSubmit={handleManualSubmit} className="p-4 flex flex-col gap-3">
          <span className="text-xs text-on-surface-variant font-medium">Or enter PNR / Ticket code manually:</span>
          <div className="flex gap-2">
            <input
              type="text"
              value={manualCode}
              onChange={e => setManualCode(e.target.value)}
              placeholder="e.g. AI202 or X7Y8Z9"
              className="flex-1 h-12 bg-surface-container-lowest text-on-surface px-4 rounded-xl text-sm font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-secondary-fixed-dim uppercase"
            />
            <button
              type="submit"
              className="h-12 px-5 bg-primary text-on-primary font-bold text-xs uppercase rounded-xl hover:brightness-110 active:scale-95 transition-all"
            >
              Load
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
