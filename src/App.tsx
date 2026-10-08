/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ScrollStorySection } from './components/ScrollStorySection';
import { TiltCardsSection } from './components/TiltCardsSection';
import { LocationSection } from './components/LocationSection';
import { LayoutsSection } from './components/LayoutsSection';
import { MortgageCalculator } from './components/MortgageCalculator';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Gallery image preview state
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null);
  const [previewZoom, setPreviewZoom] = useState(1);

  // Selected apartment from layouts or calculator
  const [selectedApartment, setSelectedApartment] = useState<string>('2-комнатная 53,9 м²');
  const [calculatedNotes, setCalculatedNotes] = useState<string>('');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPlan = (planName: string) => {
    setSelectedApartment(planName);
    scrollToSection('contact');
  };

  const handleApplyCalculation = (details: {
    program: string;
    totalPrice: number;
    downPayment: number;
    months: number;
    monthlyPayment: number;
    currency: 'UZS' | 'USD';
  }) => {
    const note = `${details.program}, цена: ${Math.round(details.totalPrice).toLocaleString()} ${details.currency}, взнос: ${Math.round(details.downPayment).toLocaleString()} ${details.currency}, срок: ${details.months} мес., платеж: ~${Math.round(details.monthlyPayment).toLocaleString()} ${details.currency}/мес.`;
    setCalculatedNotes(note);
    scrollToSection('contact');
  };

  const handleOpenPreview = (url: string, title: string) => {
    setPreviewImage({ url, title });
    setPreviewZoom(1);
  };

  return (
    <div className="min-h-screen bg-[#0b1329] text-white flex flex-col font-sans">
      {/* 1. TOP NAVIGATION BAR */}
      <Header onSelectApartmentClick={() => scrollToSection('layouts')} />

      {/* 2. HERO SECTION WITH 3-LAYER PARALLAX & GYROSCOPE */}
      <main className="flex-1">
        <Hero
          onSelectApartmentClick={() => scrollToSection('layouts')}
          onExploreClick={() => scrollToSection('story')}
        />

        {/* 3. SCROLL-STORY SECTION (STICKY CROSSFADE & ZOOM) */}
        <ScrollStorySection onSelectApartmentClick={() => scrollToSection('layouts')} />

        {/* 4. 3D-TILT CARDS SECTION (RENDERS #2, #3, #4) */}
        <TiltCardsSection onPreviewClick={handleOpenPreview} />

        {/* 5. LOCATION SECTION (RENDER #2 + PULSING INTERACTIVE PINS) */}
        <LocationSection />

        {/* 6. APARTMENT LAYOUTS SECTION (RENDERS #5, #6) */}
        <LayoutsSection onSelectPlan={handleSelectPlan} />

        {/* 7. MORTGAGE & 0% INSTALLMENT CALCULATOR */}
        <MortgageCalculator onApplyCalculation={handleApplyCalculation} />

        {/* 8. LEAD CAPTURE & CONTACT SECTION */}
        <ContactSection
          prefilledApartment={selectedApartment}
          prefilledNotes={calculatedNotes}
        />
      </main>

      {/* 9. FOOTER */}
      <Footer />

      {/* FULLSCREEN IMAGE MODAL PREVIEW */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6"
          >
            {/* Modal Top Bar */}
            <div className="w-full max-w-6xl flex items-center justify-between text-white z-10">
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg">
                  {previewImage.title}
                </h3>
                <span className="text-xs text-[#6fb1ea]">Архитектурный рендер комплекса</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewZoom((z) => Math.min(z + 0.3, 2.5))}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                  title="Увеличить"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setPreviewZoom((z) => Math.max(z - 0.3, 0.8))}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                  title="Уменьшить"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setPreviewZoom(1)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                  title="Сбросить"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setPreviewImage(null)}
                  className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-200 transition-colors ml-2 cursor-pointer"
                  title="Закрыть"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Image */}
            <div className="relative flex-1 w-full max-w-6xl flex items-center justify-center overflow-auto my-3">
              <motion.img
                src={previewImage.url}
                alt={previewImage.title}
                style={{ scale: previewZoom }}
                className="max-h-[82vh] max-w-full object-contain select-none transition-transform duration-200 rounded-lg shadow-2xl"
              />
            </div>

            {/* Modal Bottom Bar */}
            <div className="w-full max-w-6xl flex items-center justify-between text-xs text-slate-400 z-10">
              <span>Масштаб: {Math.round(previewZoom * 100)}%</span>
              <button
                onClick={() => {
                  setPreviewImage(null);
                  scrollToSection('contact');
                }}
                className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-brand-gradient rounded-lg shadow-md cursor-pointer"
              >
                Получить консультацию
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
