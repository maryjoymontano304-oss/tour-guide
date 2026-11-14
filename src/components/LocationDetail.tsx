import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  ExternalLink,
  Eye,
  EyeOff,
  Pause,
  Play,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { LocationEntry } from '../data/locations';
import { ReplaceableImageSlot } from './ReplaceableImageSlot';

interface LocationDetailProps {
  location: LocationEntry;
  imageUrl?: string;
  isCustomImage?: boolean;
  onBack: () => void;
  onReplaceImage: (locationId: string, dataUrl: string) => void;
  onRemoveImage: (locationId: string) => void;
}

type DetailViewMode = 'penuh' | 'cepat';

export const LocationDetail: React.FC<LocationDetailProps> = ({
  location,
  imageUrl,
  isCustomImage = false,
  onBack,
  onReplaceImage,
  onRemoveImage,
}) => {
  const [viewMode, setViewMode] = useState<DetailViewMode>('penuh');
  const [revealedQuizIds, setRevealedQuizIds] = useState<Record<string, boolean>>({});
  const [secondsLeft, setSecondsLeft] = useState<number>(60);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);

  // Reset state when switching locations
  useEffect(() => {
    setViewMode('penuh');
    setRevealedQuizIds({});
    setSecondsLeft(60);
    setTimerRunning(false);
    setActiveGalleryIndex(0);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.id]);

  // 60-second rehearsal countdown timer
  useEffect(() => {
    if (!timerRunning) return;
    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [timerRunning]);

  const toggleQuizAnswer = (quizId: string) => {
    setRevealedQuizIds((prev) => ({
      ...prev,
      [quizId]: !prev[quizId],
    }));
  };

  const handleToggleTimer = () => {
    if (secondsLeft === 0) {
      setSecondsLeft(60);
      setTimerRunning(true);
      return;
    }
    setTimerRunning((prev) => !prev);
  };

  const handleResetTimer = () => {
    setTimerRunning(false);
    setSecondsLeft(60);
  };

  const isMemorial = location.id === 'tugu-peringatan-perang';

  const t = isMemorial
    ? {
        pageBg: 'bg-[#F6F4EE] text-[#18241F]',
        headerBorder: 'border-[#DDD6C7]',
        backText: 'text-[#1F4A3C] hover:bg-[#EBE5D6]',
        titleText: 'text-[#18241F]',
        subText: 'text-[#525E57]',
        cardBorder: 'border-[#DDD6C7]',
        activeTab: 'bg-gradient-to-r from-[#1F4A3C] to-[#2F6351] text-white shadow-sm',
        inactiveTab: 'text-[#4A5750] hover:bg-[#F6F4EE] hover:text-[#18241F]',
        heroGradient: 'bg-gradient-to-r from-[#1A2B24] via-[#243D33] to-[#3A5344]',
        heroKicker: 'text-[#E5C17B]',
        noticeBox: 'border-[#DFCFAF] bg-[#FAF6EC] text-[#5C4317]',
        primaryAccent: 'text-[#1F4A3C]',
        secondaryAccent: 'text-[#8A5412]',
        keywordCard: 'border-[#D7D8CE] bg-gradient-to-br from-[#F8F6EF] to-[#F1F5F2]',
        keywordNum: 'text-[#8A5412]',
        divider: 'border-[#ECE6D8]',
        divideList: 'divide-[#ECE6D8]',
        galleryBar: 'border-[#ECE6D8] bg-[#FAF7F0]',
        galleryActive: 'bg-[#1F4A3C] text-white shadow-xs',
        galleryIdle: 'border-[#D5CEBE] bg-white text-[#18241F] hover:bg-[#EFE9DB]',
        timerBtn: 'bg-[#1F4A3C] hover:bg-[#285E4C]',
        timerReset: 'border-[#D5CEBE] bg-[#FAF7F0] text-[#18241F] hover:bg-[#EFE9DB]',
        storyNum: 'text-[#1F4A3C]',
        storyLabel: 'text-[#8A5412]',
        quizCard: 'border-[#DDD6C7] bg-[#FAF7F0]',
        quizBtn: 'bg-gradient-to-r from-[#1F4A3C] to-[#2F6351] hover:from-[#265A49] hover:to-[#387560]',
        answerBox: 'border-[#B8CBBF]',
        answerLabel: 'text-[#1F4A3C]',
        outlineBtn: 'border-[#1F4A3C] bg-white text-[#1F4A3C] hover:bg-[#F4F7F5]',
        backBottomBtn:
          'bg-gradient-to-r from-[#1A2B24] to-[#2B463B] hover:from-[#223930] hover:to-[#1F4A3C]',
        missingNote: 'text-[#7C4D12]',
      }
    : {
        pageBg: 'bg-[#F3F7FA] text-[#0B2545]',
        headerBorder: 'border-[#D6E4EE]',
        backText: 'text-[#0369A1] hover:bg-[#E5EFF6]',
        titleText: 'text-[#0B2545]',
        subText: 'text-[#3B556E]',
        cardBorder: 'border-[#D6E4EE]',
        activeTab: 'bg-gradient-to-r from-[#0369A1] to-[#0D7A8A] text-white shadow-sm',
        inactiveTab: 'text-[#3B556E] hover:bg-[#F3F7FA] hover:text-[#0B2545]',
        heroGradient: 'bg-gradient-to-r from-[#0B2545] via-[#0E4D7A] to-[#0D7A8A]',
        heroKicker: 'text-[#7DD3FC]',
        noticeBox: 'border-[#FDBA74] bg-[#FFF7ED] text-[#7C2D12]',
        primaryAccent: 'text-[#0369A1]',
        secondaryAccent: 'text-[#0F766E]',
        keywordCard: 'border-[#CBE3F0] bg-gradient-to-br from-[#F0F8FC] to-[#F1FAF8]',
        keywordNum: 'text-[#0F766E]',
        divider: 'border-[#E5EFF6]',
        divideList: 'divide-[#E5EFF6]',
        galleryBar: 'border-[#E5EFF6] bg-[#F5FAFD]',
        galleryActive: 'bg-[#0369A1] text-white shadow-xs',
        galleryIdle: 'border-[#CBE0EE] bg-white text-[#0B2545] hover:bg-[#E5EFF6]',
        timerBtn: 'bg-[#0F766E] hover:bg-[#0D9488]',
        timerReset: 'border-[#CBE0EE] bg-[#F3F7FA] text-[#0B2545] hover:bg-[#E5EFF6]',
        storyNum: 'text-[#0F766E]',
        storyLabel: 'text-[#C2410C]',
        quizCard: 'border-[#CBE0EE] bg-[#F5FAFD]',
        quizBtn: 'bg-gradient-to-r from-[#0369A1] to-[#0D7A8A] hover:from-[#0284C7] hover:to-[#0F766E]',
        answerBox: 'border-[#99F6E4]',
        answerLabel: 'text-[#0F766E]',
        outlineBtn: 'border-[#0369A1] bg-white text-[#0369A1] hover:bg-[#F0F8FC]',
        backBottomBtn:
          'bg-gradient-to-r from-[#0B2545] to-[#0E4D7A] hover:from-[#10325C] hover:to-[#0369A1]',
        missingNote: 'text-[#C2410C]',
      };

  return (
    <div className={`min-h-screen ${t.pageBg}`}>
      {/* Compact sticky top navigation bar (56px height, within 15% mobile viewport cap) */}
      <header className={`sticky top-0 z-30 border-b ${t.headerBorder} bg-white/95 backdrop-blur-md`}>
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <button
            type="button"
            onClick={onBack}
            className={`inline-flex min-h-[48px] items-center gap-2 rounded-xl px-3 text-lg font-semibold transition-colors active:scale-[0.98] whitespace-nowrap shrink-0 ${t.backText}`}
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            <span>Kembali</span>
          </button>

          <p className={`truncate text-lg font-semibold ${t.titleText}`}>
            {location.cardTitle}
          </p>

          <span className={`hidden text-sm font-medium sm:inline whitespace-nowrap shrink-0 ${t.subText}`}>
            Poket Pemandu Labuan
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 pt-5 pb-14 sm:px-6 sm:pt-7">
        {/* Mode Switcher: Mod Penuh vs Rujukan cepat */}
        <div
          role="tablist"
          aria-label="Mod paparan lokasi"
          className={`mb-5 grid grid-cols-2 gap-2 rounded-2xl border ${t.cardBorder} bg-white p-1.5 shadow-xs`}
        >
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'penuh'}
            onClick={() => setViewMode('penuh')}
            className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl px-4 py-3 text-base font-semibold transition-all whitespace-nowrap sm:text-lg ${
              viewMode === 'penuh' ? t.activeTab : t.inactiveTab
            }`}
          >
            <BookOpen className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span>Mod penuh</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'cepat'}
            onClick={() => setViewMode('cepat')}
            className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl px-4 py-3 text-base font-semibold transition-all whitespace-nowrap sm:text-lg ${
              viewMode === 'cepat' ? t.activeTab : t.inactiveTab
            }`}
          >
            <Zap className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span>Rujukan cepat</span>
          </button>
        </div>

        {viewMode === 'cepat' ? (
          /* Single-screen mobile-optimized Rujukan cepat view */
          <div className="space-y-4">
            <section className={`overflow-hidden rounded-2xl border ${t.cardBorder} bg-white`}>
              <div className={`${t.heroGradient} p-5 text-white sm:p-7`}>
                <p className={`text-sm font-semibold ${t.heroKicker}`}>
                  Mod Rujukan Cepat · {location.addressLabel ?? 'Satu Skrin Telefon'}
                </p>
                <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {location.fullTitle}
                </h1>
              </div>

              <div className="p-5 sm:p-7">
                {!location.hasVerifiedContent ? (
                  <div className="py-2">
                    <p className="font-display text-2xl font-semibold text-[#C2410C]">
                      {location.emptyStatusLabel ?? 'Maklumat belum dimasukkan'}
                    </p>
                    <p className={`mt-2.5 text-lg leading-relaxed ${t.subText}`}>
                      {location.emptyStatusMessage ?? (
                        <>
                          Tiada fakta utama atau kata kunci disahkan untuk{' '}
                          <strong className={`font-semibold ${t.titleText}`}>{location.fullTitle}</strong>{' '}
                          setakat ini.
                        </>
                      )}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {location.partialNote && (
                      <div className={`rounded-xl border p-4 text-base leading-relaxed ${t.noticeBox}`}>
                        {location.partialNote}
                      </div>
                    )}

                    {/* Fakta Utama */}
                    <div>
                      <h2 className={`font-display text-2xl font-semibold ${t.titleText}`}>
                        Fakta Utama
                      </h2>
                      <ul className="mt-3 space-y-3">
                        {location.facts.map((fact, idx) => (
                          <li
                            key={idx}
                            className={`flex items-start gap-3 text-xl leading-snug font-medium ${t.titleText}`}
                          >
                            <span
                              className={`shrink-0 font-bold tabular-nums ${t.primaryAccent}`}
                              aria-hidden="true"
                            >
                              {idx + 1}.
                            </span>
                            <span>{fact}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Lima Kata Kunci */}
                    <div className={`border-t ${t.divider} pt-5`}>
                      <h2 className={`font-display text-2xl font-semibold ${t.titleText}`}>
                        Lima Kata Kunci
                      </h2>
                      <ol className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {location.keywords.map((item) => (
                          <li
                            key={item.number}
                            className={`flex items-baseline gap-3 rounded-xl border px-4 py-3 ${t.keywordCard}`}
                          >
                            <span className={`font-mono text-base font-bold tabular-nums ${t.keywordNum}`}>
                              {item.number}
                            </span>
                            <span className={`font-display text-xl font-bold ${t.titleText}`}>
                              {item.word}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Sumber Rujukan */}
                    {(location.sourceUrl || location.sourceMissingNote) && (
                      <div className={`border-t ${t.divider} pt-4`}>
                        <p className={`text-sm font-semibold ${t.subText}`}>Sumber Rujukan</p>
                        {location.sourceUrl ? (
                          <a
                            href={location.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`mt-1 inline-flex min-h-[44px] items-center gap-2 break-all text-base font-semibold underline underline-offset-4 ${t.primaryAccent}`}
                          >
                            <span>{location.sourceLabel ?? location.sourceUrl}</span>
                            <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                          </a>
                        ) : (
                          <p className={`mt-1 text-base leading-relaxed ${t.missingNote}`}>
                            {location.sourceMissingNote}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setViewMode('penuh')}
                className={`flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-xl border px-6 py-3.5 text-lg font-semibold transition-colors active:scale-[0.99] ${t.outlineBtn}`}
              >
                <BookOpen className="h-5 w-5" aria-hidden="true" />
                <span>Buka Mod Penuh</span>
              </button>
              <button
                type="button"
                onClick={onBack}
                className={`flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-lg font-semibold text-white transition-all active:scale-[0.99] ${t.backBottomBtn}`}
              >
                <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                <span>Kembali ke Senarai Lokasi</span>
              </button>
            </div>
          </div>
        ) : (
          /* Full Mode preserving all existing sections and sources */
          <>
            {/* Location Hero Header & Replaceable Photo Slot */}
            <section className={`overflow-hidden rounded-2xl border ${t.cardBorder} bg-white`}>
              {isMemorial && (
                <div className={`${t.heroGradient} px-5 py-3 text-white sm:px-8`}>
                  <p className={`text-sm font-semibold ${t.heroKicker}`}>
                    Tapak Peringatan Bersejarah · Wilayah Persekutuan Labuan
                  </p>
                </div>
              )}

              <ReplaceableImageSlot
                locationId={location.id}
                locationTitle={location.fullTitle}
                imageLabel={location.imageLabel}
                imageUrl={
                  isCustomImage
                    ? imageUrl
                    : location.galleryImages?.[activeGalleryIndex] ?? imageUrl
                }
                isCustomImage={isCustomImage}
                onReplaceImage={onReplaceImage}
                onRemoveImage={onRemoveImage}
                aspectClass="aspect-[4/3] sm:aspect-[16/10]"
                containImage
              />

              {!isCustomImage &&
                location.galleryImages &&
                location.galleryImages.length > 1 && (
                  <div className={`flex flex-wrap items-center gap-2.5 border-b px-5 py-3 sm:px-8 ${t.galleryBar}`}>
                    <span className={`text-sm font-semibold ${t.subText}`}>
                      Foto dibekalkan:
                    </span>
                    {location.galleryImages.map((imgPath, idx) => (
                      <button
                        key={imgPath}
                        type="button"
                        onClick={() => setActiveGalleryIndex(idx)}
                        className={`inline-flex min-h-[44px] items-center rounded-xl px-4 py-2 text-base font-semibold transition-colors whitespace-nowrap shrink-0 ${
                          activeGalleryIndex === idx ? t.galleryActive : `border ${t.galleryIdle}`
                        }`}
                      >
                        Foto {idx + 1}
                      </button>
                    ))}
                  </div>
                )}

              <div className="p-5 sm:p-8">
                <p className={`text-base font-semibold ${t.subText}`}>
                  {location.hasVerifiedContent ? (
                    <span className={isMemorial ? t.secondaryAccent : location.sourceMissingNote ? t.primaryAccent : t.secondaryAccent}>
                      {location.sourceMissingNote
                        ? 'Sebahagian bahan (daripada foto)'
                        : 'Bahan disahkan'}
                    </span>
                  ) : (
                    <span className="text-[#C2410C]">
                      {location.emptyStatusLabel ?? 'Maklumat belum dimasukkan'}
                    </span>
                  )}
                  <span className="mx-2 opacity-50" aria-hidden="true">
                    ·
                  </span>
                  <span className={`font-medium ${t.subText}`}>
                    {location.addressLabel ?? 'Wilayah Persekutuan Labuan'}
                  </span>
                </p>
                <h1 className={`mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl ${t.titleText}`}>
                  {location.fullTitle}
                </h1>
                {location.partialNote && (
                  <p className={`mt-4 rounded-xl border p-4 text-lg leading-relaxed ${t.noticeBox}`}>
                    {location.partialNote}
                  </p>
                )}
              </div>
            </section>

            {!location.hasVerifiedContent ? (
              /* Honest Empty State when verified information has not been added or is insufficient */
              <div className="mt-8 space-y-6">
                <section className={`rounded-2xl border ${t.cardBorder} bg-white p-6 sm:p-8`}>
                  <h2 className="font-display text-2xl font-semibold text-[#C2410C] sm:text-3xl">
                    {location.emptyStatusLabel ?? 'Maklumat belum dimasukkan'}
                  </h2>
                  <p className={`mt-3 max-w-2xl text-xl leading-relaxed ${t.subText}`}>
                    {location.emptyStatusMessage ?? (
                      <>
                        Tiada fakta sejarah atau kandungan penceritaan dimasukkan untuk{' '}
                        <strong className={`font-semibold ${t.titleText}`}>{location.fullTitle}</strong>{' '}
                        setakat ini. Aplikasi ini hanya memaparkan maklumat yang telah disemak dan disahkan.
                      </>
                    )}
                  </p>

                  <div className={`mt-6 border-t ${t.divider} pt-6`}>
                    <p className={`text-base font-semibold ${t.subText}`}>
                      Struktur Kandungan Lokasi
                    </p>
                    <dl className={`mt-4 divide-y ${t.divideList}`}>
                      {[
                        '01. Fakta Penting',
                        '02. Cerita 60 Saat (5 Langkah Sesi 2)',
                        '03. Lima Kata Kunci Ingatan',
                        location.emptyStatusLabel ? '04. Kuiz Ringkas (3 Soalan)' : '04. Kuiz Ringkas',
                        '05. Sumber Rujukan',
                      ].map((sectionName) => (
                        <div
                          key={sectionName}
                          className="flex flex-col justify-between gap-1 py-4 sm:flex-row sm:items-center"
                        >
                          <dt className={`text-xl font-semibold ${t.titleText}`}>{sectionName}</dt>
                          <dd className="text-lg font-medium text-[#C2410C]">
                            {location.emptyStatusLabel ?? 'Maklumat belum dimasukkan'}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </section>
              </div>
            ) : (
              /* Verified Location Content */
              <div className="mt-8 space-y-8">
                {/* 1. Fakta Penting */}
                <section className={`rounded-2xl border ${t.cardBorder} bg-white p-6 sm:p-8`}>
                  <p className={`text-base font-semibold ${t.primaryAccent}`}>
                    01. Fakta Penting
                  </p>
                  <h2 className={`mt-1.5 font-display text-2xl font-semibold sm:text-3xl ${t.titleText}`}>
                    Poin Ringkas Disahkan
                  </h2>

                  <ul className="mt-5 space-y-4">
                    {location.facts.map((fact, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-3.5 text-xl leading-relaxed ${t.titleText}`}
                      >
                        <span
                          className={`mt-0.5 shrink-0 font-bold tabular-nums ${t.primaryAccent}`}
                          aria-hidden="true"
                        >
                          {String(idx + 1).padStart(2, '0')}.
                        </span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* 2. Cerita 60 Saat (5 Langkah Sesi 2) */}
                <section className={`rounded-2xl border ${t.cardBorder} bg-white p-6 sm:p-8`}>
                  <div className={`flex flex-col gap-4 border-b ${t.divider} pb-5 sm:flex-row sm:items-end sm:justify-between`}>
                    <div>
                      <p className={`text-base font-semibold ${t.secondaryAccent}`}>
                        02. Cerita 60 Saat
                      </p>
                      <h2 className={`mt-1.5 font-display text-2xl font-semibold sm:text-3xl ${t.titleText}`}>
                        Lima Langkah Sesi 2
                      </h2>
                    </div>

                    {/* Practical 60-second guide rehearsal timer */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className={`mr-1 font-mono text-xl font-bold tabular-nums ${t.titleText}`}>
                        {String(secondsLeft).padStart(2, '0')}s
                      </span>
                      <button
                        type="button"
                        onClick={handleToggleTimer}
                        className={`inline-flex min-h-[52px] items-center gap-2.5 rounded-xl px-5 py-3 text-base font-semibold text-white transition-colors active:scale-[0.98] whitespace-nowrap shrink-0 sm:text-lg ${t.timerBtn}`}
                      >
                        {timerRunning ? (
                          <>
                            <Pause className="h-5 w-5" aria-hidden="true" />
                            <span>Jeda Pemasa</span>
                          </>
                        ) : (
                          <>
                            <Play className="h-5 w-5" aria-hidden="true" />
                            <span>{secondsLeft === 60 ? 'Uji 60 Saat' : 'Sambung'}</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleResetTimer}
                        aria-label="Set semula pemasa 60 saat"
                        className={`inline-flex min-h-[52px] min-w-[52px] items-center justify-center rounded-xl border px-3.5 py-3 text-base font-semibold transition-colors active:scale-[0.98] ${t.timerReset}`}
                      >
                        <RotateCcw className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className={`mt-6 divide-y ${t.divideList}`}>
                    {location.storySteps.map((step) => (
                      <div key={step.number} className="py-5 first:pt-1 last:pb-1">
                        <div className="flex items-baseline gap-2.5">
                          <span className={`font-mono text-base font-semibold tabular-nums ${t.storyNum}`}>
                            Langkah {step.number}
                          </span>
                          <span className="opacity-40" aria-hidden="true">
                            ·
                          </span>
                          <h3 className={`font-sans text-lg font-bold ${t.storyLabel}`}>
                            {step.label}
                          </h3>
                        </div>
                        <p className={`mt-2.5 max-w-prose text-xl leading-relaxed ${t.titleText}`}>
                          {step.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 3. Lima Kata Kunci Untuk Membantu Ingatan */}
                <section className={`rounded-2xl border ${t.cardBorder} bg-white p-6 sm:p-8`}>
                  <p className={`text-base font-semibold ${t.primaryAccent}`}>
                    03. Lima Kata Kunci
                  </p>
                  <h2 className={`mt-1.5 font-display text-2xl font-semibold sm:text-3xl ${t.titleText}`}>
                    Kata Kunci Ingatan Pantas
                  </h2>

                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {location.keywords.map((item) => (
                      <div
                        key={item.number}
                        className={`rounded-xl border p-5 ${t.keywordCard}`}
                      >
                        <span className={`font-mono text-sm font-bold tabular-nums ${t.keywordNum}`}>
                          Kata Kunci {item.number}
                        </span>
                        <p className={`mt-1.5 font-display text-2xl font-semibold ${t.titleText}`}>
                          {item.word}
                        </p>
                        <p className={`mt-1.5 text-lg leading-snug ${t.subText}`}>
                          {item.cue}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 4. Kuiz Ringkas (Answer appears ONLY after pressing "Lihat jawapan") */}
                <section className={`rounded-2xl border ${t.cardBorder} bg-white p-6 sm:p-8`}>
                  <p className={`text-base font-semibold ${t.primaryAccent}`}>
                    04. Kuiz Ringkas
                  </p>
                  <h2 className={`mt-1.5 font-display text-2xl font-semibold sm:text-3xl ${t.titleText}`}>
                    Semak Ingatan Anda
                  </h2>

                  <div className="mt-5 space-y-5">
                    {location.quiz.map((q, index) => {
                      const isRevealed = Boolean(revealedQuizIds[q.id]);
                      return (
                        <div
                          key={q.id}
                          className={`rounded-xl border p-5 ${t.quizCard}`}
                        >
                          <p className={`text-base font-semibold tabular-nums ${t.primaryAccent}`}>
                            Soalan {index + 1}
                          </p>
                          <p className={`mt-1.5 text-xl font-semibold leading-relaxed ${t.titleText}`}>
                            {q.question}
                          </p>

                          <div className="mt-4">
                            <button
                              type="button"
                              onClick={() => toggleQuizAnswer(q.id)}
                              aria-expanded={isRevealed}
                              className={`inline-flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-lg font-semibold text-white shadow-xs transition-all active:scale-[0.98] whitespace-nowrap shrink-0 sm:w-auto ${t.quizBtn}`}
                            >
                              {isRevealed ? (
                                <>
                                  <EyeOff className="h-5 w-5" aria-hidden="true" />
                                  <span>Sembunyikan jawapan</span>
                                </>
                              ) : (
                                <>
                                  <Eye className="h-5 w-5" aria-hidden="true" />
                                  <span>Lihat jawapan</span>
                                </>
                              )}
                            </button>
                          </div>

                          {isRevealed && (
                            <div className={`mt-4 rounded-xl border bg-white p-4 ${t.answerBox}`}>
                              <p className={`text-base font-bold ${t.answerLabel}`}>
                                Jawapan Disahkan
                              </p>
                              <p className={`mt-1 text-xl leading-relaxed ${t.titleText}`}>
                                {q.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* 5. Sumber Rujukan */}
                <section className={`rounded-2xl border ${t.cardBorder} bg-white p-6 sm:p-8`}>
                  <p className={`text-base font-semibold ${t.primaryAccent}`}>
                    05. Sumber Rujukan
                  </p>
                  <h2 className={`mt-1.5 font-display text-2xl font-semibold sm:text-3xl ${t.titleText}`}>
                    Rujukan Rasmi
                  </h2>
                  {location.sourceUrl ? (
                    <div className="mt-4 space-y-2">
                      {location.sourceLabel && (
                        <p className={`text-xl font-medium ${t.titleText}`}>
                          {location.sourceLabel}
                        </p>
                      )}
                      <a
                        href={location.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex min-h-[48px] items-center gap-2 break-all text-lg font-semibold underline underline-offset-4 ${t.primaryAccent}`}
                      >
                        <span>{location.sourceUrl}</span>
                        <ExternalLink className="h-5 w-5 shrink-0" aria-hidden="true" />
                      </a>
                    </div>
                  ) : (
                    location.sourceMissingNote && (
                      <p className={`mt-4 text-xl leading-relaxed ${t.missingNote}`}>
                        {location.sourceMissingNote}
                      </p>
                    )
                  )}
                </section>
              </div>
            )}

            {/* Prominent bottom thumb-zone Back Button */}
            <div className="mt-10">
              <button
                type="button"
                onClick={onBack}
                className={`flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-xl px-6 py-4 text-xl font-semibold text-white shadow-xs transition-all active:scale-[0.99] ${t.backBottomBtn}`}
              >
                <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                <span>Kembali ke Senarai Lokasi</span>
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};
