import React from 'react';
import { BrandLogo } from './Icons';
import { ArrowUp, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050a17] text-white border-t border-[#6fb1ea]/20 pt-16 pb-12 relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1 & 2: Brand Lockup & Slogan */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <BrandLogo className="w-10 h-10" />
              <div>
                <span className="font-display font-extrabold tracking-tight text-xl text-white block">
                  MILLIY BOG&apos;
                </span>
                <span className="text-[11px] tracking-[0.25em] text-[#6fb1ea] uppercase font-semibold">
                  Residence
                </span>
              </div>
            </div>

            <p className="text-base font-semibold text-amber-200/95 italic mb-3">
              «Bu yerda orzular ushaladi»
            </p>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed mb-6">
              Жилой комплекс премиум-класса в Ташкенте. Современное жилое пространство, где продуманная европейская архитектура сочетается с природным парковым окружением.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://t.me/milliybog_residence"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#1f4fa8] border border-white/10 flex items-center justify-center transition-colors text-slate-300 hover:text-white"
                title="Telegram"
              >
                <span className="text-xs font-bold">TG</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#1f4fa8] border border-white/10 flex items-center justify-center transition-colors text-slate-300 hover:text-white"
                title="Instagram"
              >
                <span className="text-xs font-bold">IG</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#1f4fa8] border border-white/10 flex items-center justify-center transition-colors text-slate-300 hover:text-white"
                title="Facebook"
              >
                <span className="text-xs font-bold">FB</span>
              </a>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Навигация
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#story" className="hover:text-[#6fb1ea] transition-colors">
                  О комплексе
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#6fb1ea] transition-colors">
                  3D-галерея
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#6fb1ea] transition-colors">
                  Локация и карта
                </a>
              </li>
              <li>
                <a href="#layouts" className="hover:text-[#6fb1ea] transition-colors">
                  Планировки квартир
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-[#6fb1ea] transition-colors">
                  Калькулятор рассрочки
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#6fb1ea] transition-colors">
                  Офис продаж
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Apartment Types */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Квартиры
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#layouts" className="hover:text-[#6fb1ea] transition-colors">
                  2-комнатные (53,9 м²)
                </a>
              </li>
              <li>
                <a href="#layouts" className="hover:text-[#6fb1ea] transition-colors">
                  3-комнатные (63,4 м²)
                </a>
              </li>
              <li>
                <a href="#layouts" className="hover:text-[#6fb1ea] transition-colors">
                  Пентхаусы с террасами
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#6fb1ea] transition-colors">
                  Коммерческие помещения
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#6fb1ea] transition-colors">
                  Машиноместа в паркинге
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Contacts */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Контакты
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#6fb1ea] shrink-0 mt-0.5" />
                <span>г. Ташкент, ул. Янги Узбекистон</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#6fb1ea] shrink-0" />
                <a href="tel:+998712000000" className="hover:text-white font-mono">
                  +998 71 200 00 00
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#6fb1ea] shrink-0" />
                <a href="mailto:info@milliybog-residence.uz" className="hover:text-white">
                  info@milliybog-residence.uz
                </a>
              </li>
            </ul>

            <button
              onClick={scrollToTop}
              className="mt-6 flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Наверх страницы</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar & Legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} «Milliy Bog&apos; Residence». Все права защищены.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">г. Ташкент, Республика Узбекистан</span>
            <span>·</span>
            <span>Архитектурный проект премиум-класса</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
