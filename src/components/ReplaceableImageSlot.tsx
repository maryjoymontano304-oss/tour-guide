import React, { useRef, useState } from 'react';
import { ImagePlus, RotateCcw } from 'lucide-react';

interface ReplaceableImageSlotProps {
  locationId: string;
  locationTitle: string;
  imageLabel: string;
  imageUrl?: string;
  isCustomImage?: boolean;
  onReplaceImage: (locationId: string, dataUrl: string) => void;
  onRemoveImage: (locationId: string) => void;
  aspectClass?: string;
  compact?: boolean;
  containImage?: boolean;
}

export const ReplaceableImageSlot: React.FC<ReplaceableImageSlotProps> = ({
  locationId,
  locationTitle,
  imageLabel,
  imageUrl,
  isCustomImage = false,
  onReplaceImage,
  onRemoveImage,
  aspectClass = 'aspect-[4/3]',
  compact = false,
  containImage = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOpenPicker = (e: React.MouseEvent) => {
    e.stopPropagation();
    setErrorMsg(null);
    inputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setErrorMsg(null);
    onRemoveImage(locationId);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Sila pilih fail gambar sahaja.');
      e.target.value = '';
      return;
    }

    setIsProcessing(true);
    setErrorMsg(null);

    try {
      const { resizeImageFile } = await import('../utils/imageStorage');
      const dataUrl = await resizeImageFile(file);
      onReplaceImage(locationId, dataUrl);
    } catch {
      setErrorMsg('Gambar gagal dimuat naik. Cuba gambar lain.');
    } finally {
      setIsProcessing(false);
      e.target.value = '';
    }
  };

  return (
    <div className={`relative w-full overflow-hidden bg-[#E5EFF6] ${aspectClass}`}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        onClick={(e) => e.stopPropagation()}
        className="sr-only"
        aria-label={`Muat naik gambar untuk ${locationTitle}`}
      />

      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            alt={`Gambar lokasi ${locationTitle}`}
            referrerPolicy="no-referrer"
            className={`h-full w-full ${
              containImage ? 'object-contain' : 'object-cover object-[50%_25%]'
            }`}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0B2545]/75 via-[#0B2545]/30 to-transparent" />
          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenPicker}
              disabled={isProcessing}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-white/95 px-4 py-2.5 text-base font-semibold text-[#0B2545] shadow-sm transition-colors hover:bg-white active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <ImagePlus className="h-5 w-5 text-[#0369A1]" aria-hidden="true" />
              <span>Ganti Gambar</span>
            </button>
            {isCustomImage && (
              <button
                type="button"
                onClick={handleRemove}
                aria-label={`Set semula gambar ${locationTitle}`}
                className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-xl bg-[#0B2545]/90 px-3.5 py-2.5 text-base font-medium text-white transition-colors hover:bg-[#0B2545] active:scale-[0.98]"
              >
                <RotateCcw className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="relative flex h-full w-full flex-col items-center justify-between border-b border-[#CBE0EE] bg-gradient-to-br from-[#E6F3FA] via-[#EDF7FA] to-[#E2F3F1] p-5 text-center">
          {/* Coastal chart motif indicating an empty replaceable photo frame */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.45]"
            viewBox="0 0 400 300"
            preserveAspectRatio="none"
          >
            <line x1="20" y1="20" x2="380" y2="20" stroke="#7BA6C4" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="20" y1="280" x2="380" y2="280" stroke="#7BA6C4" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="20" y1="20" x2="20" y2="280" stroke="#7BA6C4" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="380" y1="20" x2="380" y2="280" stroke="#7BA6C4" strokeWidth="1" strokeDasharray="4 4" />
            <path
              d="M0 245 Q 100 220 200 245 T 400 240"
              fill="none"
              stroke="#0284C7"
              strokeWidth="1.5"
              strokeOpacity="0.35"
            />
          </svg>

          <div className="relative z-10 w-full text-left">
            <span className="text-sm font-semibold text-[#0369A1]">
              Slot Foto Boleh Diganti
            </span>
          </div>

          <div className="relative z-10 my-auto flex max-w-xs flex-col items-center gap-2 px-2">
            <p className={`font-display font-semibold text-[#0B2545] ${compact ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'}`}>
              {imageLabel}
            </p>
            <p className="text-base leading-relaxed text-[#3B556E]">
              Tiada gambar dibekalkan. Muat naik foto sebenar lokasi ini daripada peranti anda.
            </p>
          </div>

          <div className="relative z-10 flex w-full flex-col items-center gap-2">
            <button
              type="button"
              onClick={handleOpenPicker}
              disabled={isProcessing}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#0369A1] px-5 py-2.5 text-base font-semibold text-white shadow-xs transition-colors hover:bg-[#0284C7] active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <ImagePlus className="h-5 w-5" aria-hidden="true" />
              <span>{isProcessing ? 'Memproses...' : 'Pilih / Ganti Gambar'}</span>
            </button>
            {errorMsg && (
              <p className="text-xs font-medium text-[#9A3412]" role="alert">
                {errorMsg}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
