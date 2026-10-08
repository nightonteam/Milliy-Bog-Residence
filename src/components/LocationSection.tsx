import React, { useState } from 'react';
import { MapPin, Navigation, School, TreePine, Trophy, Train, Plane, ShoppingCart, Clock } from 'lucide-react';
import { GoldBrandLogo } from './Icons';

interface LocationPoi {
  id: string;
  name: string;
  nameUz: string;
  time: string;
  type: 'walk' | 'drive';
  category: 'education' | 'nature' | 'transport' | 'shopping' | 'sport';
  coords: { x: number; y: number }; // Percentage position on map
  description: string;
  distance: string;
  icon: React.ComponentType<{ className?: string }>;
}

const pointsOfInterest: LocationPoi[] = [
  {
    id: 'school',
    name: 'Общеобразовательная школа и лицей',
    nameUz: 'Maktab va litsey',
    time: '2 мин',
    type: 'walk',
    category: 'education',
    coords: { x: 55, y: 55 },
    description: 'Современная школа с углубленным изучением языков и частный детский сад в шаговой доступности.',
    distance: '350 метров',
    icon: School,
  },
  {
    id: 'park',
    name: "Парк «Yangi O'zbekiston»",
    nameUz: "Yangi O'zbekiston Bog'i",
    time: '5 мин',
    type: 'walk',
    category: 'nature',
    coords: { x: 80, y: 54 },
    description: 'Главный и самый масштабный ландшафтный парк Ташкента с озером, фонтанами, амфитеатром и зонами отдыха.',
    distance: '800 метров',
    icon: TreePine,
  },
  {
    id: 'olympic',
    name: 'Олимпийский городок',
    nameUz: 'Olimpiya Shaharchasi',
    time: '5 мин',
    type: 'drive',
    category: 'sport',
    coords: { x: 77, y: 62 },
    description: 'Крупнейший спортивный кластер Центральной Азии: крытые арены, бассейны олимпийского стандарта, теннисные корты.',
    distance: '2.1 км',
    icon: Trophy,
  },
  {
    id: 'center',
    name: 'Центр города (Сквер Амира Темура)',
    nameUz: 'Shahar markazi',
    time: '25 мин',
    type: 'drive',
    category: 'transport',
    coords: { x: 32, y: 68 },
    description: 'Деловой и культурный центр столицы, ключевые министерства, музеи и театры.',
    distance: '14.5 км',
    icon: Navigation,
  },
  {
    id: 'north_station',
    name: 'Северный железнодорожный вокзал',
    nameUz: 'Shimoliy Vokzal',
    time: '27 мин',
    type: 'drive',
    category: 'transport',
    coords: { x: 36, y: 76 },
    description: 'Главный железнодорожный хаб Ташкента, отправление скоростных поездов Afrosiyob.',
    distance: '16.2 км',
    icon: Train,
  },
  {
    id: 'mall_airport',
    name: 'ТРЦ и Международный аэропорт',
    nameUz: "Savdo markazi & Aeroport",
    time: '35 мин',
    type: 'drive',
    category: 'shopping',
    coords: { x: 31, y: 84 },
    description: 'Флагманские торгово-развлекательные центры и международный терминал аэропорта имени Ислама Каримова.',
    distance: '19.8 км',
    icon: Plane,
  },
  {
    id: 'south_station',
    name: 'Южный вокзал',
    nameUz: 'Janubiy Vokzal',
    time: '43 мин',
    type: 'drive',
    category: 'transport',
    coords: { x: 16, y: 89 },
    description: 'Южные транспортные ворота столицы, связывающие Ташкент с регионами республики.',
    distance: '23.0 км',
    icon: Train,
  },
];

export const LocationSection: React.FC = () => {
  const [selectedPoi, setSelectedPoi] = useState<LocationPoi>(pointsOfInterest[0]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredPois = pointsOfInterest.filter(
    (poi) => activeCategory === 'all' || poi.category === activeCategory
  );

  return (
    <section id="location" className="relative py-20 sm:py-28 bg-[#0b1329] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6fb1ea] mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Локация и транспортная доступность</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            В центре перспективного развития Ташкента
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            «Milliy Bog&apos; Residence» расположен в экологически чистом районе возле парка Yangi O&apos;zbekiston. Быстрый выезд на ключевые магистрали столицы без дорожных заторов.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {[
            { id: 'all', label: 'Все объекты' },
            { id: 'education', label: 'Школы' },
            { id: 'nature', label: 'Парки' },
            { id: 'sport', label: 'Спорт' },
            { id: 'transport', label: 'Транспорт и центр' },
            { id: 'shopping', label: 'ТЦ и аэропорт' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-brand-gradient text-white shadow-md shadow-[#1f4fa8]/30'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Interactive Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* MAP CANVAS (Render #2 with Overlay Pins) */}
          <div className="lg:col-span-8 relative bg-slate-950 rounded-2xl overflow-hidden border border-[#6fb1ea]/25 shadow-2xl">
            {/* Map Background: Real Render #2 showing Aerial View + Graphic Map */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden">
              <img
                src="/images/2.jpg"
                alt="Карта локации и вид сверху Milliy Bog Residence"
                className="w-full h-full object-cover object-center select-none"
              />

              {/* Resident complex focal pin with golden S crest */}
              <div
                className="absolute z-30 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
                style={{ left: '66%', top: '56%' }}
              >
                <div className="relative flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-amber-400/30 animate-ping absolute" />
                  <div className="w-10 h-10 rounded-full bg-[#0b1329] border-2 border-amber-400 flex items-center justify-center shadow-lg shadow-black/80">
                    <GoldBrandLogo size={24} />
                  </div>
                </div>
                <span className="mt-1 text-[11px] font-black uppercase tracking-wider text-amber-300 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-amber-400/40 whitespace-nowrap">
                  Milliy Bog&apos; Residence
                </span>
              </div>

              {/* Pulsing Interactive POI Pins */}
              {filteredPois.map((poi) => {
                const isSelected = selectedPoi.id === poi.id;
                const IconComponent = poi.icon;

                return (
                  <button
                    key={poi.id}
                    onClick={() => setSelectedPoi(poi)}
                    style={{ left: `${poi.coords.x}%`, top: `${poi.coords.y}%` }}
                    className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 cursor-pointer focus:outline-none`}
                    aria-label={`${poi.name} — ${poi.time}`}
                  >
                    {/* Pulsing ring */}
                    <div
                      className={`absolute inset-0 rounded-full transition-transform ${
                        isSelected
                          ? 'w-10 h-10 -m-1 bg-[#6fb1ea]/40 animate-ping'
                          : 'w-8 h-8 group-hover:scale-125'
                      }`}
                    />

                    {/* Pin button badge */}
                    <div
                      className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all shadow-lg ${
                        isSelected
                          ? 'bg-[#1f4fa8] text-white border-2 border-[#6fb1ea] scale-110 shadow-[#6fb1ea]/40'
                          : 'bg-black/75 hover:bg-[#122852] text-slate-100 border border-white/20'
                      }`}
                    >
                      <IconComponent className="w-3.5 h-3.5 text-[#6fb1ea]" />
                      <span className="tabular-nums font-mono whitespace-nowrap">{poi.time}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Caption */}
            <div className="p-3.5 bg-[#0b1329]/90 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Нажмите на метку, чтобы узнать маршрут</span>
              </span>
              <span className="font-mono text-slate-300">O&apos;zbekiston, Toshkent</span>
            </div>
          </div>

          {/* ACTIVE POI CARD & ALL DESTINATIONS LIST */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Active Destination Focus Card */}
            <div className="bg-gradient-to-br from-[#142654] to-[#0c1733] border border-[#6fb1ea]/35 rounded-2xl p-5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#6fb1ea]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold text-[#6fb1ea] uppercase tracking-wider">
                  Выбранный объект
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-md bg-white/10 text-amber-300 border border-white/10">
                  <Clock className="w-3 h-3" />
                  <span className="tabular-nums">{selectedPoi.time}</span>
                  <span className="text-[10px] text-slate-300 font-normal">
                    ({selectedPoi.type === 'walk' ? 'пешком' : 'на авто'})
                  </span>
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1 leading-snug">
                {selectedPoi.name}
              </h3>
              <p className="text-xs text-slate-400 italic mb-3">
                {selectedPoi.nameUz}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {selectedPoi.description}
              </p>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span className="text-slate-400">Расстояние:</span>
                <span className="font-semibold text-white font-mono">{selectedPoi.distance}</span>
              </div>
            </div>

            {/* List of all points */}
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-4 max-h-[340px] overflow-y-auto scrollbar-thin">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">
                Все точки маршрута ({pointsOfInterest.length})
              </h4>
              <div className="space-y-1.5">
                {pointsOfInterest.map((poi) => {
                  const isSelected = selectedPoi.id === poi.id;
                  const Icon = poi.icon;

                  return (
                    <button
                      key={poi.id}
                      onClick={() => setSelectedPoi(poi)}
                      className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between text-xs cursor-pointer ${
                        isSelected
                          ? 'bg-[#1f4fa8]/40 border border-[#6fb1ea]/50 text-white'
                          : 'hover:bg-white/5 text-slate-300 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#6fb1ea]' : 'text-slate-400'}`} />
                        <span className="truncate font-medium">{poi.name}</span>
                      </div>
                      <span className="font-mono font-bold text-slate-200 shrink-0 ml-2">
                        {poi.time}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
