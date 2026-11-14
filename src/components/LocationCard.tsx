import React from 'react';
import { ChevronRight } from 'lucide-react';
import { LocationEntry } from '../data/locations';
import { ReplaceableImageSlot } from './ReplaceableImageSlot';

interface LocationCardProps {
  location: LocationEntry;
  imageUrl?: string;
  isCustomImage?: boolean;
  onSelect: (locationId: string) => void;
  onReplaceImage: (locationId: string, dataUrl: string) => void;
  onRemoveImage: (locationId: string) => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  location,
  imageUrl,
  isCustomImage = false,
  onSelect,
  onReplaceImage,
  onRemoveImage,
}) => {
  const isMemorial = location.id === 'tugu-peringatan-perang';

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
        isMemorial
          ? 'border-[#DDD6C7] hover:border-[#8A5412]'
          : 'border-[#D6E4EE] hover:border-[#0284C7]'
      }`}
    >
      <ReplaceableImageSlot
        locationId={location.id}
        locationTitle={location.cardTitle}
        imageLabel={location.imageLabel}
        imageUrl={imageUrl}
        isCustomImage={isCustomImage}
        onReplaceImage={onReplaceImage}
        onRemoveImage={onRemoveImage}
        aspectClass="aspect-[4/3]"
        compact
      />

      <button
        type="button"
        onClick={() => onSelect(location.id)}
        className={`flex flex-1 flex-col justify-between p-5 text-left transition-colors sm:p-6 ${
          isMemorial
            ? 'hover:bg-[#FAF7F0] focus-visible:bg-[#FAF7F0]'
            : 'hover:bg-[#F5FAFD] focus-visible:bg-[#F5FAFD]'
        }`}
      >
        <div className="space-y-2">
          <p className="text-base font-semibold text-[#476078]">
            {location.hasVerifiedContent ? (
              <span
                className={
                  isMemorial
                    ? 'text-[#8A5412]'
                    : location.sourceMissingNote
                      ? 'text-[#0369A1]'
                      : 'text-[#0F766E]'
                }
              >
                {location.sourceMissingNote
                  ? 'Sebahagian bahan (daripada foto)'
                  : 'Bahan disahkan tersedia'}
              </span>
            ) : (
              <span className="text-[#C2410C]">
                {location.emptyStatusLabel ?? 'Maklumat belum dimasukkan'}
              </span>
            )}
            <span
              className={`mx-2 ${isMemorial ? 'text-[#C2B8A3]' : 'text-[#9DB4C8]'}`}
              aria-hidden="true"
            >
              ·
            </span>
            <span className={`font-medium ${isMemorial ? 'text-[#525E57]' : 'text-[#476078]'}`}>
              {location.addressLabel ?? 'Wilayah Persekutuan Labuan'}
            </span>
          </p>

          <h2
            className={`font-display text-[26px] font-semibold tracking-tight transition-colors sm:text-3xl ${
              isMemorial
                ? 'text-[#18241F] group-hover:text-[#1F4A3C]'
                : 'text-[#0B2545] group-hover:text-[#0369A1]'
            }`}
          >
            {location.cardTitle}
          </h2>
        </div>

        <div
          className={`mt-5 flex min-h-[52px] items-center justify-between border-t pt-4 text-lg font-semibold ${
            isMemorial
              ? 'border-[#ECE6D8] text-[#1F4A3C]'
              : 'border-[#E5EFF6] text-[#0369A1]'
          }`}
        >
          <span>
            {location.hasVerifiedContent ? 'Buka Panduan Lokasi' : 'Lihat Halaman Lokasi'}
          </span>
          <ChevronRight
            className="h-6 w-6 transition-transform duration-150 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </button>
    </article>
  );
};
