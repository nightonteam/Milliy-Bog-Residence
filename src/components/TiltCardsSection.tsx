import React, { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Eye, Compass, Sun, Shield } from 'lucide-react';

interface TiltCardData {
  id: number;
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  specs: string[];
}

const cardsData: TiltCardData[] = [
  {
    id: 2,
    image: '/images/2.jpg',
    badge: 'Архитектурный ансамбль',
    title: 'Панорамный вид и зеленая экосистема',
    subtitle: 'Гармония приватности и городского ритма',
    description:
      'U-образная посадка корпусов образует уютный внутренний оазис, защищенный от городского шума и ветров, с собственными велосипедными дорожками и прогулочными аллеями.',
    icon: <Compass className="w-5 h-5 text-[#6fb1ea]" />,
    specs: ['Приватный двор 1.2 га', 'Велодорожки по периметру', 'Подземный паркинг'],
  },
  {
    id: 3,
    image: '/images/3.jpg',
    badge: 'Парадный въезд',
    title: 'Триумфальная въездная арка',
    subtitle: 'Максимум естественного света в квартирах',
    description:
      '«Barcha binolar kvartiralarga imkon qadar ko‘proq tabiiy yorug‘lik tushishini ta‘minlaydigan tarzda joylashtirilgan» — здания ориентированы по сторонам света для максимальной инсоляции.',
    icon: <Sun className="w-5 h-5 text-amber-400" />,
    specs: ['Высота арки 18 м', 'Круглосуточный консьерж', 'Премиальные фасады'],
  },
  {
    id: 4,
    image: '/images/4.jpg',
    badge: 'Среда для жизни',
    title: 'Приватный двор без автомобилей',
    subtitle: 'Безопасное пространство для всей семьи',
    description:
      'Благоустроенная территория с гипоаллергенными зелеными насаждениями, современными детскими городками, воркаут-зонами и беседками для спокойного отдыха.',
    icon: <Shield className="w-5 h-5 text-emerald-400" />,
    specs: ['Двор без машин', 'Детские эко-площадки', 'Видеонаблюдение 24/7'],
  },
];

interface SingleTiltCardProps {
  card: TiltCardData;
  onPreviewClick: (image: string, title: string) => void;
}

const SingleTiltCard: React.FC<SingleTiltCardProps> = ({ card, onPreviewClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;

    // Normalizing between -1 and 1
    const normX = (x / width - 0.5) * 2;
    const normY = (y / height - 0.5) * 2;

    // Tilt limits: up to 8 degrees
    const rotateX = -normY * 8;
    const rotateY = normX * 8;

    setTilt({
      rotateX,
      rotateY,
      glareX: (x / width) * 100,
      glareY: (y / height) * 100,
      isHovered: true,
    });
  };

  const handlePointerLeave = () => {
    setTilt((prev) => ({ ...prev, rotateX: 0, rotateY: 0, isHovered: false }));
  };

  // Shadow translating in opposite direction
  const shadowX = -tilt.rotateY * 3.5;
  const shadowY = tilt.rotateX * 3.5;

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="perspective-1000 group relative select-none touch-none"
    >
      <div
        style={{
          transform: shouldReduceMotion
            ? 'none'
            : `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: tilt.isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: tilt.isHovered
            ? `${shadowX}px ${shadowY}px 35px -5px rgba(0, 0, 0, 0.65), 0 0 25px 2px rgba(111, 177, 234, 0.15)`
            : '0 15px 30px -10px rgba(0, 0, 0, 0.5)',
        }}
        className="relative bg-gradient-to-b from-[#14234b] to-[#0c1630] border border-[#6fb1ea]/25 rounded-2xl overflow-hidden p-3 sm:p-4 flex flex-col h-full transition-shadow duration-300"
      >
        {/* Specular glare overlay */}
        {tilt.isHovered && !shouldReduceMotion && (
          <div
            className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.22) 0%, rgba(111,177,234,0.08) 45%, transparent 70%)`,
              mixBlendMode: 'overlay',
            }}
          />
        )}

        {/* 3D Image Canvas with interior parallax translation */}
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 mb-4 z-10 group/img">
          <div
            style={{
              transform: shouldReduceMotion
                ? 'none'
                : `translate3d(${-tilt.rotateY * 1.8}px, ${tilt.rotateX * 1.8}px, 20px) scale(1.08)`,
              transition: tilt.isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="w-full h-full"
          >
            <img
              src={card.image}
              alt={card.title}
              loading="lazy"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover/img:scale-105"
            />
          </div>

          {/* Top Badge */}
          <div className="absolute top-3 left-3 z-20">
            <span className="text-[11px] font-semibold text-white px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/20">
              {card.badge}
            </span>
          </div>

          {/* Quick Zoom Trigger */}
          <button
            onClick={() => onPreviewClick(card.image, card.title)}
            className="absolute bottom-3 right-3 z-20 p-2 rounded-lg bg-black/60 hover:bg-[#1f4fa8] backdrop-blur-md border border-white/20 text-white transition-colors cursor-pointer"
            title="Открыть в полном размере"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Card Content & Text */}
        <div className="flex-1 flex flex-col justify-between z-20">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {card.icon}
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#6fb1ea] transition-colors">
                {card.title}
              </h3>
            </div>
            <p className="text-xs font-semibold text-[#6fb1ea] mb-2 uppercase tracking-wider">
              {card.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              {card.description}
            </p>
          </div>

          {/* Specs List */}
          <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[11px] text-slate-300 font-medium">
            {card.specs.map((spec, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6fb1ea]" />
                <span>{spec}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const TiltCardsSection: React.FC<{ onPreviewClick: (img: string, title: string) => void }> = ({
  onPreviewClick,
}) => {
  return (
    <section id="gallery" className="relative py-20 sm:py-28 bg-[#0b1329] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#1f4fa8]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6fb1ea] mb-3">
            <span>Инновационная архитектура</span>
            <span>·</span>
            <span>3D-погружение</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 text-balance">
            Взгляните на жизнь в «Milliy Bog&apos; Residence» под любым углом
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Наведите курсор или проведите пальцем, чтобы ощутить глубину объемной сцены и познакомиться с ключевыми доминантами жилого комплекса.
          </p>
        </div>

        {/* 3D-Tilt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cardsData.map((card) => (
            <SingleTiltCard key={card.id} card={card} onPreviewClick={onPreviewClick} />
          ))}
        </div>
      </div>
    </section>
  );
};
