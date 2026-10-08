import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ChevronDown, ArrowRight, Sparkles, Building2, ShieldCheck, TreePine } from 'lucide-react';
import { BrandLogo } from './Icons';

interface HeroProps {
  onSelectApartmentClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectApartmentClick, onExploreClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Layers error state fallback
  const [layersLoaded, setLayersLoaded] = useState({
    sky: true,
    building: true,
    front: true,
  });
  const allLayersFailed = !layersLoaded.sky || !layersLoaded.building || !layersLoaded.front;

  // Mouse offset state (desktop)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Orientation support state (mobile)
  const [orientationOffset, setOrientationOffset] = useState({ x: 0, y: 0 });
  const [hasOrientationPermission, setHasOrientationPermission] = useState<boolean | null>(null);

  // Framer-motion scroll transforms
  const { scrollY } = useScroll();

  // Speeds: sky 0.2, building 0.5, front 1.0
  const skyY = useTransform(scrollY, [0, 800], [0, 160]);
  const buildingY = useTransform(scrollY, [0, 800], [0, 400]);
  const buildingScale = useTransform(scrollY, [0, 800], [1, 1.08]);
  const frontY = useTransform(scrollY, [0, 800], [0, 800]);

  // Mouse move handler (desktop)
  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const normY = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      setMouseOffset({ x: normX, y: normY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [shouldReduceMotion]);

  // Mobile DeviceOrientation setup (gyroscope)
  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma: left-to-right (-90 to 90), beta: front-to-back (-180 to 180)
        const clampedGamma = Math.max(-30, Math.min(30, e.gamma));
        const clampedBeta = Math.max(-30, Math.min(30, e.beta - 45)); // assume holding at ~45deg
        setOrientationOffset({
          x: clampedGamma / 30,
          y: clampedBeta / 30,
        });
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }

    return () => {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, [shouldReduceMotion]);

  // Request iOS permission if needed
  const handleRequestGyro = async () => {
    try {
      const DeviceOrientationEventAny = window.DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<'granted' | 'denied'>;
      };
      if (typeof DeviceOrientationEventAny?.requestPermission === 'function') {
        const permission = await DeviceOrientationEventAny.requestPermission();
        if (permission === 'granted') {
          setHasOrientationPermission(true);
        } else {
          setHasOrientationPermission(false);
        }
      }
    } catch {
      setHasOrientationPermission(false);
    }
  };

  // Combine mouse & orientation offsets
  const combinedX = orientationOffset.x !== 0 ? orientationOffset.x : mouseOffset.x;
  const combinedY = orientationOffset.y !== 0 ? orientationOffset.y : mouseOffset.y;

  // Title letters for staggered reveal animation
  const titleLetters = "MILLIY BOG' RESIDENCE".split("");

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[640px] overflow-hidden flex flex-col justify-between select-none"
    >
      {/* 1. PARALLAX BACKGROUND LAYERS CONTAINER */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Fallback to original 1.jpg if layers failed or reduced motion */}
        {allLayersFailed || shouldReduceMotion ? (
          <div className="absolute inset-0">
            <img
              src="/images/1.jpg"
              alt="Фасад Milliy Bog' Residence"
              className="w-full h-full object-cover object-center animate-pulse-slow"
              style={{
                animation: shouldReduceMotion ? 'none' : 'kenBurns 24s ease-in-out infinite alternate',
              }}
            />
          </div>
        ) : (
          <>
            {/* LAYER 1: SKY (speed 0.2, mouse ±3px X/Y, horizontal drift) */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{
                y: skyY,
                x: combinedX * 3,
                translateY: combinedY * 3,
              }}
            >
              <img
                src="/images/layers/hero-sky.png"
                alt="Sky Layer"
                onError={() => setLayersLoaded((s) => ({ ...s, sky: false }))}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>

            {/* LAYER 2: BUILDING (speed 0.5, scale 1 -> 1.08, mouse ±8px X/Y) */}
            <motion.div
              className="absolute inset-0 w-full h-full origin-bottom"
              style={{
                y: buildingY,
                scale: buildingScale,
                x: combinedX * 8,
                translateY: combinedY * 8,
              }}
            >
              <img
                src="/images/layers/hero-building.png"
                alt="Building Facade Layer"
                onError={() => setLayersLoaded((s) => ({ ...s, building: false }))}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>

            {/* LAYER 3: FOREGROUND (speed 1.0, mouse ±20px X/Y, blur 1.5px) */}
            <motion.div
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{
                y: frontY,
                x: combinedX * 20,
                translateY: combinedY * 20,
                filter: 'blur(1.2px)',
              }}
            >
              <img
                src="/images/layers/hero-front.png"
                alt="Foreground People & Promenade Layer"
                onError={() => setLayersLoaded((s) => ({ ...s, front: false }))}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </>
        )}

        {/* Cinematic Scrims: Dark gradient overlay ensuring crisp typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-[#0b1329]/40 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0b1329]/30 to-[#0b1329]/70 pointer-events-none" />
        
        {/* Brand diagonal subtle cyan/blue beam reminiscent of the render brochure */}
        <div className="absolute top-0 right-0 w-[55vw] h-[60vh] bg-gradient-to-bl from-[#6fb1ea]/15 via-[#1f4fa8]/10 to-transparent blur-3xl pointer-events-none transform -skew-x-12" />
      </div>

      {/* 2. TOP HERO SPACER FOR HEADER */}
      <div className="pt-24 sm:pt-28" />

      {/* 3. HERO CONTENT CARRIER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto flex flex-col items-center text-center">
        {/* Uzbek slogan with emblem */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center gap-2.5 mb-3 sm:mb-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#6fb1ea]/30 text-white shadow-lg shadow-black/20"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#6fb1ea] animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-slate-100 uppercase">
            Bu yerda orzular ushaladi
          </span>
          <span className="text-slate-400">·</span>
          <span className="text-xs text-[#6fb1ea] font-medium hidden sm:inline">Ташкент</span>
        </motion.div>

        {/* Letter-by-letter Animated Title */}
        <h1 className="font-display font-black tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 sm:mb-5 max-w-5xl drop-shadow-2xl flex flex-wrap justify-center overflow-hidden">
          {titleLetters.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 28, rotateX: 60 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.025,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={char === " " ? "inline-block w-3 sm:w-5" : "inline-block"}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle / Proposition */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-sm sm:text-lg md:text-xl text-slate-200 max-w-2xl font-light leading-relaxed mb-8 sm:mb-10 text-balance drop-shadow-md"
        >
          Новый уровень европейской архитектуры, просторные террасы и приватный зеленый парк в живописном районе столицы.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onSelectApartmentClick}
            className="w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-bold uppercase tracking-wider text-white bg-brand-gradient hover:opacity-95 shadow-xl shadow-[#1f4fa8]/40 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>Выбрать квартиру</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-7 py-4 text-sm sm:text-base font-medium text-slate-200 hover:text-white bg-slate-900/60 hover:bg-slate-900/80 backdrop-blur-md border border-white/15 rounded-xl transition-colors cursor-pointer"
          >
            Узнать о комплексе
          </button>
        </motion.div>

        {/* Optional iOS Gyroscope Trigger if available */}
        {hasOrientationPermission === null && typeof window !== 'undefined' && 'DeviceOrientationEvent' in window && (
          <button
            onClick={handleRequestGyro}
            className="mt-4 text-[11px] text-slate-400 hover:text-white underline underline-offset-4 hidden sm:block opacity-70"
          >
            Включить 3D-эффект наклона
          </button>
        )}
      </div>

      {/* 4. BOTTOM BAR: STATS TICKER & SCROLL INDICATOR */}
      <div className="relative z-10 w-full border-t border-white/10 bg-[#0b1329]/80 backdrop-blur-md py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-300">
          <div className="flex items-center gap-6 sm:gap-10 overflow-x-auto py-1 scrollbar-none w-full md:w-auto justify-center md:justify-start">
            <div className="flex items-center gap-2 shrink-0">
              <Building2 className="w-4 h-4 text-[#6fb1ea]" />
              <span className="font-semibold text-white">3.3 м</span>
              <span className="text-slate-400">потолки</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <TreePine className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-white">Закрытый</span>
              <span className="text-slate-400">двор-парк</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#6fb1ea]" />
              <span className="font-semibold text-white">0% рассрочка</span>
              <span className="text-slate-400">до 36 месяцев</span>
            </div>
          </div>

          <button
            onClick={onExploreClick}
            className="hidden md:flex items-center gap-2 text-xs text-slate-400 hover:text-[#6fb1ea] transition-colors cursor-pointer mx-auto md:mx-0"
          >
            <span>Листайте вниз</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
