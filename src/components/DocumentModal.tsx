import React, { useState } from 'react';
import { SavedDocument } from '../types';

interface DocumentModalProps {
  selectedDoc: SavedDocument | null;
  isAddMode: boolean;
  onClose: () => void;
  onAddDocument: (doc: Omit<SavedDocument, 'id'>) => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
  selectedDoc,
  isAddMode,
  onClose,
  onAddDocument
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [icon, setIcon] = useState('badge');
  const [category, setCategory] = useState<'passport' | 'hotel' | 'insurance' | 'ticket' | 'other'>('passport');
  const [pnr, setPnr] = useState('');

  if (!selectedDoc && !isAddMode) return null;

  const handleSubmitNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddDocument({
      title,
      subtitle: subtitle || 'Offline Stored Document',
      icon,
      category,
      pnr: pnr ? pnr.toUpperCase() : undefined
    });
    setTitle('');
    setSubtitle('');
    setPnr('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-surface-container border border-surface-container-highest w-full max-w-sm rounded-[24px] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-surface-variant">
          <div className="flex items-center gap-2 text-on-surface font-bold text-base">
            <span className="material-symbols-outlined text-secondary-fixed-dim">
              {isAddMode ? 'note_add' : selectedDoc?.icon || 'folder'}
            </span>
            <span>{isAddMode ? 'Add Saved Document' : selectedDoc?.title}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {isAddMode ? (
          /* Add Document Form */
          <form onSubmit={handleSubmitNew} className="p-4 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Document Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Visa Certificate, Hotel Voucher"
                className="h-12 bg-surface-container-lowest text-on-surface px-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary-fixed-dim"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Subtitle / Details</label>
              <input
                type="text"
                value={subtitle}
                onChange={e => setSubtitle(e.target.value)}
                placeholder="e.g. Valid until 2028 or Confirmation #123"
                className="h-12 bg-surface-container-lowest text-on-surface px-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary-fixed-dim"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Category</label>
                <select
                  value={category}
                  onChange={e => {
                    const cat = e.target.value as any;
                    setCategory(cat);
                    if (cat === 'passport') setIcon('badge');
                    else if (cat === 'hotel') setIcon('hotel');
                    else if (cat === 'insurance') setIcon('health_and_safety');
                    else setIcon('confirmation_number');
                  }}
                  className="h-12 bg-surface-container-lowest text-on-surface px-3 rounded-xl text-xs"
                >
                  <option value="passport">Passport / ID</option>
                  <option value="hotel">Hotel Voucher</option>
                  <option value="insurance">Insurance</option>
                  <option value="ticket">Event / Ticket</option>
                  <option value="other">Other Document</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Ref / PNR (Optional)</label>
                <input
                  type="text"
                  value={pnr}
                  onChange={e => setPnr(e.target.value)}
                  placeholder="e.g. REF123"
                  className="h-12 bg-surface-container-lowest text-on-surface px-3 rounded-xl text-xs uppercase"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full h-12 bg-secondary-fixed-dim text-on-secondary font-bold rounded-xl flex items-center justify-center gap-2 uppercase tracking-wide shadow-md hover:brightness-105 active:scale-98 transition-all"
            >
              Save Offline
            </button>
          </form>
        ) : (
          /* View Saved Document Detail */
          <div className="p-5 flex flex-col gap-4">
            <div className="flex items-center gap-4 bg-surface-container-high p-4 rounded-xl">
              <div className="w-14 h-14 rounded-2xl bg-secondary-fixed-dim/20 border border-secondary-fixed-dim/40 flex items-center justify-center text-secondary-fixed-dim">
                <span className="material-symbols-outlined text-[32px]">{selectedDoc?.icon}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-on-surface">{selectedDoc?.title}</span>
                <span className="text-sm text-on-surface-variant">{selectedDoc?.subtitle}</span>
                {selectedDoc?.pnr && (
                  <span className="text-xs font-mono text-secondary-fixed-dim mt-1">Ref: {selectedDoc.pnr}</span>
                )}
              </div>
            </div>

            {/* Offline Verified Badge */}
            <div className="flex items-center gap-2 bg-secondary-container/10 border border-secondary-container/30 px-3 py-2 rounded-xl text-secondary-fixed-dim text-xs font-medium">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span>Locally Cached — Available Without Internet</span>
            </div>

            {/* Mock QR / Barcode Card for Document */}
            <div className="bg-surface-container-lowest border border-surface-variant p-4 rounded-xl flex flex-col items-center justify-center gap-2">
              <div className="w-40 h-40 bg-white p-2 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full text-black fill-current">
                  <path d="M10 10h30v30H10zM60 10h30v30H60zM10 60h30v30H10zM20 20h10v10H20zM70 20h10v10H70zM20 70h10v10H20zM50 20h5v50h-5zM40 50h50v5H40zM65 65h20v20H65z" />
                </svg>
              </div>
              <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider">
                ID: {selectedDoc?.pnr || selectedDoc?.id}
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-full h-12 bg-primary text-on-primary font-bold rounded-xl uppercase text-xs tracking-wider hover:brightness-105 active:scale-98"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
