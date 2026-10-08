import React, { useState, useEffect } from 'react';
import { BrandLogo } from './Icons';
import { Phone, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onSelectApartmentClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSelectApartmentClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'О комплексе', href: '#story' },
    { label: 'Галерея', href: '#gallery' },
    { label: 'Локация', href: '#location' },
    { label: 'Планировки', href: '#layouts' },
    { label: 'Ипотека', href: '#calculator' },
    { label: 'Контакты', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0b1329]/90 backdrop-blur-md border-b border-[#6fb1ea]/20 shadow-lg shadow-black/20 py-3'
          : 'bg-gradient-to-b from-[#0b1329]/80 via-[#0b1329]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6fb1ea] rounded-lg"
          >
            <BrandLogo className="w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col leading-tight">
              <span className="font-display font-extrabold tracking-tight text-base sm:text-lg text-white">
                MILLIY BOG&apos;
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#6fb1ea] uppercase font-semibold">
                Residence
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white hover:text-[#6fb1ea] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#6fb1ea] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="tel:+998712000000"
              className="flex items-center gap-2 text-xs font-semibold text-slate-200 hover:text-white px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              title="Позвонить в отдел продаж"
            >
              <Phone className="w-3.5 h-3.5 text-[#6fb1ea]" />
              <span className="tabular-nums">+998 71 200 00 00</span>
            </a>

            <button
              onClick={onSelectApartmentClick}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-brand-gradient hover:opacity-95 shadow-md shadow-[#1f4fa8]/30 rounded-lg transition-transform active:scale-95 flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <span>Выбрать квартиру</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onSelectApartmentClick}
              className="sm:hidden px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white bg-brand-gradient rounded-md"
            >
              Выбрать
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-white bg-white/5 border border-white/10 rounded-lg focus:outline-none"
              aria-label="Открыть меню"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0b1329]/95 backdrop-blur-xl border-b border-[#6fb1ea]/20 px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 mb-5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-200 hover:text-white text-base font-medium py-1.5 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-3 pt-2">
            <a
              href="tel:+998712000000"
              className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-200 py-2.5 rounded-lg bg-white/5 border border-white/10"
            >
              <Phone className="w-4 h-4 text-[#6fb1ea]" />
              <span className="tabular-nums">+998 71 200 00 00</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onSelectApartmentClick();
              }}
              className="w-full py-3 text-xs font-bold uppercase tracking-wider text-white bg-brand-gradient rounded-lg shadow-lg text-center"
            >
              Выбрать квартиру
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
