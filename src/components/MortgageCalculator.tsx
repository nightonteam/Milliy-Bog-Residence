import React, { useState } from 'react';
import { Calculator, Percent, Calendar, ShieldCheck, ArrowRight, DollarSign } from 'lucide-react';

interface MortgageCalculatorProps {
  initialPriceUzs?: number;
  onApplyCalculation: (details: {
    program: string;
    totalPrice: number;
    downPayment: number;
    months: number;
    monthlyPayment: number;
    currency: 'UZS' | 'USD';
  }) => void;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({
  initialPriceUzs = 960000000,
  onApplyCalculation,
}) => {
  const [currency, setCurrency] = useState<'UZS' | 'USD'>('UZS');
  const usdRate = 12600; // Uzbek Sum to USD approximate exchange rate

  const [mode, setMode] = useState<'installment' | 'mortgage'>('installment');
  const [apartmentPrice, setApartmentPrice] = useState<number>(initialPriceUzs);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30); // 30% default
  const [installmentMonths, setInstallmentMonths] = useState<number>(24); // 24 months
  const [mortgageYears, setMortgageYears] = useState<number>(15); // 15 years
  const [mortgageRate, setMortgageRate] = useState<number>(18); // 18% annual

  // Calculations
  const downPaymentAmount = (apartmentPrice * downPaymentPercent) / 100;
  const loanAmount = apartmentPrice - downPaymentAmount;

  // 100% full payment discount (10%)
  const discount100Percent = apartmentPrice * 0.1;
  const priceWithDiscount = apartmentPrice - discount100Percent;

  let monthlyPayment = 0;
  let totalPayable = apartmentPrice;

  if (mode === 'installment') {
    // 0% interest installment: remaining balance divided by months
    monthlyPayment = installmentMonths > 0 ? loanAmount / installmentMonths : 0;
    totalPayable = apartmentPrice;
  } else {
    // Annuity mortgage
    const totalMonths = mortgageYears * 12;
    const monthlyRate = mortgageRate / 100 / 12;
    if (monthlyRate > 0 && totalMonths > 0) {
      monthlyPayment =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
      totalPayable = downPaymentAmount + monthlyPayment * totalMonths;
    }
  }

  // Format currency helpers
  const formatVal = (uzsValue: number) => {
    if (currency === 'USD') {
      const usdVal = Math.round(uzsValue / usdRate);
      return `$${usdVal.toLocaleString('en-US')}`;
    }
    return `${Math.round(uzsValue).toLocaleString('ru-RU')} UZS`;
  };

  const handleApply = () => {
    onApplyCalculation({
      program: mode === 'installment' ? 'Рассрочка 0% от застройщика' : 'Ипотека',
      totalPrice: apartmentPrice,
      downPayment: downPaymentAmount,
      months: mode === 'installment' ? installmentMonths : mortgageYears * 12,
      monthlyPayment,
      currency,
    });
  };

  return (
    <section id="calculator" className="relative py-20 sm:py-28 bg-[#0b1329] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6fb1ea] mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Финансовые программы</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Калькулятор рассрочки и ипотеки
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Выгодные условия напрямую от девелопера «Milliy Bog&apos; Residence»: рассрочка 0% до 36 месяцев без скрытых комиссий или ипотечные программы от банков-партнеров.
          </p>
        </div>

        {/* CALCULATOR MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Controls & Sliders */}
          <div className="lg:col-span-7 bg-[#0f1d3e] border border-[#6fb1ea]/25 rounded-3xl p-6 sm:p-8 shadow-xl">
            {/* Mode selection tabs & Currency switch */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
              <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-xl border border-white/10">
                <button
                  onClick={() => setMode('installment')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    mode === 'installment'
                      ? 'bg-brand-gradient text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Рассрочка 0% (Застройщик)
                </button>
                <button
                  onClick={() => setMode('mortgage')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    mode === 'mortgage'
                      ? 'bg-brand-gradient text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Банковская ипотека
                </button>
              </div>

              {/* Currency Toggle */}
              <div className="flex items-center gap-2 self-end sm:self-auto text-xs font-semibold text-slate-300">
                <span className="text-slate-400">Валюта:</span>
                <div className="flex items-center p-0.5 bg-black/40 rounded-lg border border-white/10">
                  <button
                    onClick={() => setCurrency('UZS')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer ${
                      currency === 'UZS' ? 'bg-[#1f4fa8] text-white' : 'text-slate-400'
                    }`}
                  >
                    UZS
                  </button>
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer ${
                      currency === 'USD' ? 'bg-[#1f4fa8] text-white' : 'text-slate-400'
                    }`}
                  >
                    USD
                  </button>
                </div>
              </div>
            </div>

            {/* Slider 1: Apartment Price */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Стоимость квартиры
                </label>
                <span className="font-mono font-bold text-base sm:text-lg text-[#6fb1ea] tabular-nums">
                  {formatVal(apartmentPrice)}
                </span>
              </div>
              <input
                type="range"
                min={700000000}
                max={2200000000}
                step={20000000}
                value={apartmentPrice}
                onChange={(e) => setApartmentPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#6fb1ea]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                <span>{formatVal(700000000)}</span>
                <span>{formatVal(2200000000)}</span>
              </div>

              {/* Quick preset buttons */}
              <div className="flex items-center gap-2 mt-3">
                <span className="text-[11px] text-slate-400">Быстрый выбор:</span>
                <button
                  onClick={() => setApartmentPrice(960000000)}
                  className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 cursor-pointer"
                >
                  2-комн (53.9 м²)
                </button>
                <button
                  onClick={() => setApartmentPrice(1180000000)}
                  className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 cursor-pointer"
                >
                  3-комн (63.4 м²)
                </button>
              </div>
            </div>

            {/* Slider 2: Down payment percent */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Первоначальный взнос ({downPaymentPercent}%)
                </label>
                <span className="font-mono font-bold text-sm sm:text-base text-white tabular-nums">
                  {formatVal(downPaymentAmount)}
                </span>
              </div>
              <input
                type="range"
                min={15}
                max={70}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#6fb1ea]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                <span>15%</span>
                <span>30%</span>
                <span>50%</span>
                <span>70%</span>
              </div>
            </div>

            {/* Term: Months or Years */}
            {mode === 'installment' ? (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Срок рассрочки (без процентов)
                  </label>
                  <span className="font-mono font-bold text-base text-amber-300 tabular-nums">
                    {installmentMonths} месяцев
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[12, 18, 24, 36].map((months) => (
                    <button
                      key={months}
                      onClick={() => setInstallmentMonths(months)}
                      className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                        installmentMonths === months
                          ? 'bg-[#1f4fa8] text-white border-[#6fb1ea]'
                          : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {months} мес.
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Срок ипотеки ({mortgageYears} лет / {mortgageYears * 12} мес)
                  </label>
                  <span className="font-mono font-bold text-base text-white tabular-nums">
                    {mortgageYears} лет
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={20}
                  step={1}
                  value={mortgageYears}
                  onChange={(e) => setMortgageYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#6fb1ea]"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                  <span>5 лет</span>
                  <span>10 лет</span>
                  <span>15 лет</span>
                  <span>20 лет</span>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                  <span>Ставка банка: {mortgageRate}% годовых</span>
                  <span className="text-emerald-400">Льготная ставка партнеров</span>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Financial Summary Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#12234e] to-[#0a142c] border border-[#6fb1ea]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#6fb1ea]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-2 text-xs font-bold text-[#6fb1ea] uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Расчет ежемесячного платежа</span>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-6">
              {mode === 'installment' ? 'Беспроцентная рассрочка 0%' : 'Ипотечный график'}
            </h3>

            {/* Monthly Payment Marquee */}
            <div className="bg-black/40 border border-white/10 rounded-2xl p-5 mb-6 text-center">
              <span className="text-xs text-slate-400 uppercase font-semibold">
                Ежемесячный платёж:
              </span>
              <div className="font-display font-black text-2xl sm:text-4xl text-[#6fb1ea] font-mono tabular-nums mt-1 drop-shadow-md">
                {formatVal(monthlyPayment)}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                {mode === 'installment'
                  ? `фиксировано на ${installmentMonths} месяцев без удорожания`
                  : `аннуитетный платеж на ${mortgageYears * 12} месяцев`}
              </span>
            </div>

            {/* Breakdown numbers */}
            <div className="space-y-3 mb-6 text-xs sm:text-sm">
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="text-slate-400">Первоначальный взнос ({downPaymentPercent}%):</span>
                <span className="font-bold text-white font-mono tabular-nums">
                  {formatVal(downPaymentAmount)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="text-slate-400">Сумма финансирования:</span>
                <span className="font-bold text-white font-mono tabular-nums">
                  {formatVal(loanAmount)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="text-slate-400">Переплата по рассрочке:</span>
                <span className="font-bold text-emerald-400 font-mono">
                  {mode === 'installment' ? '0 UZS (0%)' : `~${formatVal(totalPayable - apartmentPrice)}`}
                </span>
              </div>
            </div>

            {/* 100% full payment special offer box */}
            <div className="p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/30 mb-6 text-xs text-amber-200">
              <div className="font-bold mb-1 flex items-center gap-1.5 text-amber-300">
                <span>Скидка 10% при 100% оплате:</span>
              </div>
              <div>
                Экономия до <span className="font-mono font-bold">{formatVal(discount100Percent)}</span>! Итоговая цена квартиры составит{' '}
                <span className="font-mono font-bold text-white">{formatVal(priceWithDiscount)}</span>.
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={handleApply}
              className="w-full py-4 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-brand-gradient hover:opacity-95 rounded-xl shadow-lg shadow-[#1f4fa8]/40 flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <span>Получить индивидуальный график</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
