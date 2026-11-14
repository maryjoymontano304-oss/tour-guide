import { useEffect, useState } from 'react';
import { LABUAN_LOCATIONS } from './data/locations';
import { LocationCard } from './components/LocationCard';
import { LocationDetail } from './components/LocationDetail';
import {
  loadSavedImages,
  LocationImagesMap,
  removeLocationImage,
  saveLocationImage,
} from './utils/imageStorage';

function getLocationIdFromHash(): string | null {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash;
  if (!hash.startsWith('#lokasi/')) return null;
  const id = hash.replace('#lokasi/', '');
  const exists = LABUAN_LOCATIONS.some((loc) => loc.id === id);
  return exists ? id : null;
}

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(() => getLocationIdFromHash());
  const [imagesByLocation, setImagesByLocation] = useState<LocationImagesMap>(() =>
    loadSavedImages(LABUAN_LOCATIONS.map((loc) => loc.id))
  );

  // Keep browser Back/Forward buttons synchronized with location hash
  useEffect(() => {
    const handleHashChange = () => {
      setSelectedId(getLocationIdFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectLocation = (locationId: string) => {
    window.location.hash = `lokasi/${locationId}`;
    setSelectedId(locationId);
  };

  const handleBackHome = () => {
    if (window.location.hash) {
      window.location.hash = '';
    }
    setSelectedId(null);
  };

  const handleReplaceImage = (locationId: string, dataUrl: string) => {
    saveLocationImage(locationId, dataUrl);
    setImagesByLocation((prev) => ({
      ...prev,
      [locationId]: dataUrl,
    }));
  };

  const handleRemoveImage = (locationId: string) => {
    removeLocationImage(locationId);
    setImagesByLocation((prev) => {
      const next = { ...prev };
      delete next[locationId];
      return next;
    });
  };

  const selectedLocation = selectedId
    ? LABUAN_LOCATIONS.find((loc) => loc.id === selectedId) ?? null
    : null;

  if (selectedLocation) {
    return (
      <LocationDetail
        location={selectedLocation}
        imageUrl={imagesByLocation[selectedLocation.id] ?? selectedLocation.defaultImageUrl}
        isCustomImage={Boolean(imagesByLocation[selectedLocation.id])}
        onBack={handleBackHome}
        onReplaceImage={handleReplaceImage}
        onRemoveImage={handleRemoveImage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F7FA] text-[#0B2545]">
      {/* Clean Top Bar */}
      <header className="border-b border-[#D6E4EE] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              handleBackHome();
            }}
            className="font-display text-lg font-bold tracking-tight text-[#0B2545] whitespace-nowrap shrink-0 sm:text-xl"
          >
            Poket Pemandu Labuan
          </a>

          <nav
            aria-label="Navigasi utama"
            className="hidden items-center gap-6 text-sm font-medium text-[#3B556E] md:flex"
          >
            {LABUAN_LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                type="button"
                onClick={() => handleSelectLocation(loc.id)}
                className="transition-colors hover:text-[#0369A1] whitespace-nowrap shrink-0"
              >
                {loc.cardTitle}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => handleSelectLocation('muzium-marin')}
            className="inline-flex min-h-[40px] items-center rounded-xl bg-gradient-to-r from-[#0369A1] to-[#0D7A8A] px-4 py-2 text-sm font-semibold text-white shadow-xs transition-all hover:from-[#0284C7] hover:to-[#0F766E] active:scale-[0.98] whitespace-nowrap shrink-0"
          >
            Muzium Marin
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
        {/* Dynamic Labuan Maritime Hero Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B2545] via-[#0E4D7A] to-[#0D7A8A] p-6 text-white shadow-sm sm:p-10">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute right-0 bottom-0 h-full w-full opacity-15"
            viewBox="0 0 800 320"
            preserveAspectRatio="none"
          >
            <path
              d="M0 240 Q 180 180 380 235 T 800 210 L 800 320 L 0 320 Z"
              fill="#7DD3FC"
            />
            <path
              d="M0 275 Q 240 230 480 275 T 800 255 L 800 320 L 0 320 Z"
              fill="#5EEAD4"
            />
          </svg>

          <div className="relative z-10 max-w-3xl">
            <p className="text-sm font-semibold text-[#7DD3FC]">
              Panduan Lapangan Pelancongan · Wilayah Persekutuan Labuan
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Poket Pemandu Labuan
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-[#E0F2FE] sm:text-xl">
              Rujukan pantas di telefon untuk pemandu pelancong. Pilih satu lokasi untuk melihat
              fakta disahkan, cerita 60 saat, lima kata kunci ingatan dan kuiz ringkas.
            </p>
          </div>
        </section>

        {/* 4 Location Photo Cards */}
        <section aria-label="Senarai Lokasi Labuan" className="mt-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {LABUAN_LOCATIONS.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                imageUrl={imagesByLocation[location.id] ?? location.defaultImageUrl}
                isCustomImage={Boolean(imagesByLocation[location.id])}
                onSelect={handleSelectLocation}
                onReplaceImage={handleReplaceImage}
                onRemoveImage={handleRemoveImage}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-10 border-t border-[#D6E4EE] bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-[#3B556E] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="font-semibold text-[#0B2545]">Poket Pemandu Labuan</p>
          <p>
            Kandungan disimpan terus dalam aplikasi tanpa sambungan AI atau API luaran.
          </p>
        </div>
      </footer>
    </div>
  );
}
