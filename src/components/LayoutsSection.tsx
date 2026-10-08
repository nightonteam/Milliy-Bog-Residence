import React, { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Maximize2, Check, ArrowRight, X, ZoomIn, ZoomOut, RotateCcw, Home } from 'lucide-react';

interface LayoutPlan {
  id: string;
  name: string;
  nameShort: string;
  area: number;
  rooms: number;
  image: string;
  tagline: string;
  description: string;
  priceUzs: number;
  priceUsd: number;
  roomsList: { name: string; size: string }[];
  features: string[];
}

const layouts: LayoutPlan[] = [
  {
    id: '2room',
    name: '2-комнатная квартира 53,9 м²',
    nameShort: '2-комнатная 53,9 м²',
    area: 53.9,
    rooms: 2,
    image: '/images/5.jpg',
    tagline: 'Добро пожаловать в ваш будущий дом!',
    description:
      'Идеальное эргономичное зонирование: просторная кухня-гостиная с выходом на лоджию, изолированная спальня с гардеробной нишей и совмещенный санузел с полноразмерной ванной.',
    priceUzs: 960000000,
    priceUsd: 76500,
    roomsList: [
      { name: 'Кухня-гостиная', size: '21.4 м²' },
      { name: 'Мастер-спальня', size: '14.8 м²' },
      { name: 'Ванная комната', size: '5.6 м²' },
      { name: 'Холл и гардероб', size: '7.2 м²' },
      { name: 'Лоджия', size: '4.9 м²' },
    ],
    features: [
      'Потолки 3.3 м',
      'Панорамное остекление в пол',
      'Отделка White Box',
      'Индивидуальный климат-контроль',
    ],
  },
  {
    id: '3room',
    name: '3-комнатная квартира 63,4 м²',
    nameShort: '3-комнатная 63,4 м²',
    area: 63.4,
    rooms: 3,
    image: '/images/6.jpg',
    tagline: 'Ваш будущий дом — продуман до мелочей',
    description:
      'Трехкомнатная семейная резиденция в формате евро-3: объединенная кухня-столовая с барным островом, приватная спальня родителей с выходом на балкон и светлая детская комната.',
    priceUzs: 1180000000,
    priceUsd: 94000,
    roomsList: [
      { name: 'Гостиная со столовой', size: '23.1 м²' },
      { name: 'Мастер-спальня', size: '14.5 м²' },
      { name: 'Детская / кабинет', size: '11.2 м²' },
      { name: 'Кухня с островом', size: '6.8 м²' },
      { name: 'Санузел с душем', size: '4.6 м²' },
      { name: 'Балкон', size: '3.2 м²' },
    ],
    features: [
      'Потолки 3.3 м',
      'Две изолированные спальни',
      'Шумоизоляция по европейскому стандарту',
      'Вид на внутренний парк и восход',
    ],
  },
];

interface LayoutsSectionProps {
  onSelectPlan: (planName: string, priceUzs: number) => void;
}

export const LayoutsSection: React.FC<LayoutsSectionProps> = ({ onSelectPlan }) => {
  const [activeTab, setActiveTab] = useState<'2room' | '3room'>('2room');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const shouldReduceMotion = useReducedMotion();

  const currentPlan = layouts.find((l) => l.id === activeTab) || layouts[0];

  // Tilt state for the layout image card
  const imgCardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, isHovered: false });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !imgCardRef.current) return;
    const rect = imgCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    setTilt({
      rotateX: -normY * 7,
      rotateY: normX * 7,
      isHovered: true,
    });
  };

  const handlePointerLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, isHovered: false });
  };

  return (
    <section id="layouts" className="relative py-20 sm:py-28 bg-[#080f20] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6fb1ea] mb-3">
              <Home className="w-3.5 h-3.5" />
              <span>Коллекция квартир</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
              Продуманные планировочные решения
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Высокие потолки 3.3 м, увеличенная полезная площадь и отсутствие «мертвых» зон. Выберите планировку и оцените 3D-модель интерьера.
            </p>
          </div>

          {/* Segmented Tab Controls */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/90 border border-[#6fb1ea]/30 rounded-xl shadow-lg shrink-0">
            {layouts.map((plan) => (
              <button
                key={plan.id}
                onClick={() => {
                  setActiveTab(plan.id as '2room' | '3room');
                  setZoomLevel(1);
                }}
                className={`px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === plan.id
                    ? 'bg-brand-gradient text-white shadow-md shadow-[#1f4fa8]/40'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {plan.nameShort}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN LAYOUT SHOWCASE CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#0b152d] border border-[#6fb1ea]/25 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          {/* Subtle blue accent background glow */}
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#1f4fa8]/15 rounded-full blur-3xl pointer-events-none" />

          {/* LEFT: 3D-Tilt Layout Image Card */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div
              ref={imgCardRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              className="perspective-1000 relative w-full max-w-lg cursor-pointer group select-none"
              onClick={() => setLightboxOpen(true)}
              title="Нажмите для полноэкранного просмотра с зумом"
            >
              <div
                style={{
                  transform: shouldReduceMotion
                    ? 'none'
                    : `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                  transformStyle: 'preserve-3d',
                  transition: tilt.isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
                }}
                className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#142654] to-[#0a1226] border border-[#6fb1ea]/40 p-3 sm:p-4 shadow-2xl"
              >
                {/* Image Frame with Tilt Depth */}
                <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
                  <img
                    src={currentPlan.image}
                    alt={currentPlan.name}
                    loading="lazy"
                    className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-102"
                  />

                  {/* Top Slogan overlay banner */}
                  <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
                    <span className="text-[11px] font-bold text-white px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/20">
                      {currentPlan.tagline}
                    </span>
                  </div>

                  {/* Hover Lightbox Indicator */}
                  <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs font-semibold group-hover:bg-[#1f4fa8] transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Увеличить</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-slate-400 mt-3 flex items-center gap-1.5">
              <span>Интерактивный 3D-наклон · Кликните для зума и деталей</span>
            </p>
          </div>

          {/* RIGHT: Detailed Specifications & Price */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Badge & Title */}
              <div className="inline-block px-3 py-1 rounded-md bg-[#6fb1ea]/15 border border-[#6fb1ea]/30 text-xs font-bold text-[#6fb1ea] uppercase tracking-wider mb-3">
                {currentPlan.rooms}-комнатная резиденция
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-2">
                {currentPlan.name}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {currentPlan.description}
              </p>

              {/* Price card */}
              <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 sm:p-5 mb-6">
                <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">
                  Стоимость при 100% оплате:
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-display font-black text-2xl sm:text-3xl text-white font-mono tabular-nums">
                    {currentPlan.priceUzs.toLocaleString('ru-RU')} UZS
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  (ориентировочно ~${currentPlan.priceUsd.toLocaleString('en-US')} по курсу ЦБ РУз)
                </div>
              </div>

              {/* Room size table */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Экспликация помещений:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {currentPlan.roomsList.map((room, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5"
                    >
                      <span className="text-slate-300">{room.name}</span>
                      <span className="font-bold text-white font-mono tabular-nums">
                        {room.size}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-2 mb-8">
                {currentPlan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onSelectPlan(currentPlan.name, currentPlan.priceUzs)}
                className="flex-1 py-3.5 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-brand-gradient hover:opacity-95 rounded-xl shadow-lg shadow-[#1f4fa8]/40 flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <span>Забронировать планировку</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL WITH ZOOM & PAN */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6 animate-in fade-in duration-200">
          {/* Modal Header */}
          <div className="w-full max-w-5xl flex items-center justify-between z-10 text-white">
            <div>
              <h3 className="font-bold text-base sm:text-lg">{currentPlan.name}</h3>
              <p className="text-xs text-[#6fb1ea]">{currentPlan.tagline}</p>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom In/Out controls */}
              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 0.3, 2.5))}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                title="Увеличить"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 0.3, 0.8))}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                title="Уменьшить"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                title="Сбросить масштаб"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={() => setLightboxOpen(false)}
                className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-200 transition-colors ml-2"
                title="Закрыть"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Modal Image Viewport */}
          <div className="relative flex-1 w-full max-w-5xl flex items-center justify-center overflow-auto my-4 cursor-grab">
            <motion.img
              src={currentPlan.image}
              alt={currentPlan.name}
              style={{ scale: zoomLevel }}
              className="max-h-[82vh] max-w-full object-contain select-none transition-transform duration-200"
            />
          </div>

          {/* Modal Footer */}
          <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300 z-10">
            <span>Масштаб: {Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => {
                setLightboxOpen(false);
                onSelectPlan(currentPlan.name, currentPlan.priceUzs);
              }}
              className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-brand-gradient rounded-lg shadow-md cursor-pointer"
            >
              Забронировать эту планировку
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
