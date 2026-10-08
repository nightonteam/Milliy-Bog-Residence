import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ShoppingBag, Sun, Shield, Bike, ArrowRight } from 'lucide-react';

interface StoryStep {
  id: number;
  tag: string;
  title: string;
  quote: string;
  description: string;
  details: string[];
  image: string;
  icon: React.ReactNode;
}

const steps: StoryStep[] = [
  {
    id: 1,
    tag: 'Инфраструктура первых этажей',
    title: 'Магазины и бутики на первых этажах',
    quote: 'Гастрономия, шопинг и премиальный сервис прямо у порога вашего дома.',
    description:
      'Первая линия комплекса отдана под флагманские бутики высокой моды (Dior, Prada, Gucci), авторские кофейни, аптеки, премиальные химчистки и гастромаркеты. Все необходимое для комфортной жизни доступно за пару шагов.',
    details: ['12+ ресторанов и кофеен', 'Премиальный супермаркет', 'Круглосуточный консьерж-рум'],
    image: '/images/1.jpg',
    icon: <ShoppingBag className="w-5 h-5 text-[#6fb1ea]" />,
  },
  {
    id: 2,
    tag: 'Архитектурная инсоляция',
    title: 'Свет во всех квартирах',
    quote: '«Barcha binolar kvartiralarga imkon qadar ko‘proq tabiiy yorug‘lik tushishini ta‘minlaydi»',
    description:
      'Особая U-образная форма зданий и увеличенные оконные проемы гарантируют максимальное проникновение естественного солнечного света в каждую комнату с утра до заката, наполняя интерьер теплом и воздухом.',
    details: ['Витражное остекление', 'Панорамные террасы', 'Энергосберегающие стеклопакеты Guardian Glass'],
    image: '/images/2.jpg',
    icon: <Sun className="w-5 h-5 text-amber-400" />,
  },
  {
    id: 3,
    tag: 'Приватность и безопасность',
    title: 'Закрытый охраняемый двор',
    quote: 'Величественная арка высотой 18 метров как символ защиты вашего спокойствия.',
    description:
      'Концепция «двор без машин» с пропускной системой Face ID, круглосуточным патрулированием и видеонаблюдением высокой четкости. Полная приватность для резидентов и их гостей.',
    details: ['Безопасность 24/7', 'Face ID и smart-домофония', 'Двор, свободный от автотранспорта'],
    image: '/images/3.jpg',
    icon: <Shield className="w-5 h-5 text-emerald-400" />,
  },
  {
    id: 4,
    tag: 'Зеленый урбанизм',
    title: 'Велодорожки и эко-пространства',
    quote: 'Километры выделенных красных велодорожек и прогулочных аллей среди сотен деревьев.',
    description:
      'Специально спроектированные велосипедные и беговые треки с безопасным резиновым покрытием, детские эко-площадки из натурального дерева, воркаут-зоны и ландшафтный сад с вечнозелеными туями.',
    details: ['Красные выделенные велотрассы', 'Детские городки для всех возрастов', 'Ландшафтный парк 12 000 м²'],
    image: '/images/4.jpg',
    icon: <Bike className="w-5 h-5 text-sky-400" />,
  },
];

export const ScrollStorySection: React.FC<{ onSelectApartmentClick: () => void }> = ({
  onSelectApartmentClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate active step index based on scroll position
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      if (latest < 0.28) {
        setActiveStep(0);
      } else if (latest < 0.53) {
        setActiveStep(1);
      } else if (latest < 0.78) {
        setActiveStep(2);
      } else {
        setActiveStep(3);
      }
    });
  }, [scrollYProgress]);

  const currentStep = steps[activeStep];

  return (
    <section id="story" ref={containerRef} className="relative bg-[#080f20] text-white">
      {/* Scroll timeline container (height creates scroll distance for story) */}
      <div className="relative h-[320vh] min-h-[2400px]">
        {/* Sticky Presentation Viewport */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-16">
          {/* Subtle background ambient gradients */}
          <div className="absolute inset-0 bg-radial-gradient from-[#1f4fa8]/15 via-transparent to-transparent pointer-events-none" />

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* LEFT / CENTER: Interactive Multi-Step Photo Visualizer (Zoom & Crossfade) */}
            <div className="lg:col-span-7 relative">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-[#6fb1ea]/25 bg-slate-950">
                {steps.map((step, idx) => (
                  <motion.div
                    key={step.id}
                    initial={false}
                    animate={{
                      opacity: activeStep === idx ? 1 : 0,
                      scale: activeStep === idx ? 1 : 1.06,
                    }}
                    transition={{
                      opacity: { duration: 0.7, ease: 'easeInOut' },
                      scale: { duration: shouldReduceMotion ? 0 : 8, ease: 'easeOut' },
                    }}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  >
                    <img
                      src={step.image}
                      alt={step.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080f20]/80 via-transparent to-black/20" />
                  </motion.div>
                ))}

                {/* Step indicator pills on the photo */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {steps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveStep(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          activeStep === i ? 'w-8 bg-[#6fb1ea]' : 'w-2 bg-white/30 hover:bg-white/60'
                        }`}
                        aria-label={`Перейти к шагу ${i + 1}`}
                      />
                    ))}
                  </div>

                  <span className="text-xs font-mono font-bold text-white px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/20">
                    0{activeStep + 1} / 0{steps.length}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: Dynamic Text Editorial Narrative */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              {/* Step Category Header */}
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6fb1ea] mb-3">
                {currentStep.icon}
                <span>{currentStep.tag}</span>
              </div>

              {/* Title with smooth cross-animation */}
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-4 transition-all duration-300">
                {currentStep.title}
              </h2>

              {/* Slogan / Quote */}
              <p className="text-xs sm:text-sm italic font-medium text-amber-200/90 mb-4 bg-amber-400/10 p-3 rounded-lg border-l-2 border-amber-400">
                {currentStep.quote}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {currentStep.description}
              </p>

              {/* Bullet Details */}
              <div className="space-y-2 mb-8">
                {currentStep.details.map((detail, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6fb1ea] shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              {/* Quick Action Button */}
              <div className="flex items-center gap-4">
                <button
                  onClick={onSelectApartmentClick}
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-brand-gradient hover:opacity-95 rounded-xl shadow-lg shadow-[#1f4fa8]/30 flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
                >
                  <span>Выбрать квартиру в этом корпусе</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
