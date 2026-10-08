import React, { useState } from 'react';
import { Phone, Send, MessageCircle, MapPin, Clock, Mail, CheckCircle2, Building, ShieldCheck } from 'lucide-react';

interface ContactSectionProps {
  prefilledApartment?: string;
  prefilledNotes?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  prefilledApartment = '2-комнатная 53,9 м²',
  prefilledNotes = '',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [apartmentType, setApartmentType] = useState(prefilledApartment);
  const [preferredMethod, setPreferredMethod] = useState<'call' | 'telegram' | 'whatsapp'>('call');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Phone input formatting with Uzbek prefix (+998)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('+998')) {
      val = '+998 ';
    }
    setPhone(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.trim().length < 9) return;

    setIsSubmitting(true);

    // Track event in Google Analytics if loaded
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'lead_form_submitted', {
        apartment_type: apartmentType,
        preferred_contact: preferredMethod,
      });
    }

    // Simulate backend submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 bg-[#080f20] text-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#1f4fa8]/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* LEFT: Contact Information & Direct Action Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6fb1ea] mb-3">
                <Building className="w-3.5 h-3.5" />
                <span>Офис продаж и консультации</span>
              </div>

              <h2 className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
                Сделайте первый шаг к квартире вашей мечты
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                Наши менеджеры подробно расскажут об архитектурных решениях, проведут персональную презентацию комплекса и подберут комфортные условия рассрочки.
              </p>

              {/* Direct Quick Action Buttons (Telegram & Phone Call) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                <a
                  href="https://t.me/milliybog_residence"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-[#229ED9]/20 hover:bg-[#229ED9]/30 border border-[#229ED9]/40 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-lg shadow-[#229ED9]/10"
                >
                  <Send className="w-4 h-4 text-[#229ED9]" />
                  <span>Написать в Telegram</span>
                </a>

                <a
                  href="tel:+998712000000"
                  className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-lg"
                >
                  <Phone className="w-4 h-4 text-[#6fb1ea]" />
                  <span>Позвонить нам</span>
                </a>
              </div>

              {/* Contact Information List */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#6fb1ea] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Адрес офиса продаж:</span>
                    <span>г. Ташкент, ул. Янги Узбекистон (ориентир: парк Yangi O&apos;zbekiston)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#6fb1ea] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Режим работы:</span>
                    <span>Ежедневно с 09:00 до 20:00 (без выходных)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#6fb1ea] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Телефон горячей линии:</span>
                    <a href="tel:+998712000000" className="hover:text-[#6fb1ea] font-mono font-bold text-white">
                      +998 71 200 00 00
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#6fb1ea] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Электронная почта:</span>
                    <a href="mailto:info@milliybog-residence.uz" className="hover:text-[#6fb1ea]">
                      sales@milliybog-residence.uz
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Lead Capture Application Form */}
          <div className="lg:col-span-7 bg-[#0f1d3e] border border-[#6fb1ea]/35 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            {isSubmitted ? (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  Спасибо за обращение, {name || 'уважаемый клиент'}!
                </h3>
                <p className="text-slate-300 text-sm max-w-md mb-6 leading-relaxed">
                  Ваша заявка на квартиру «{apartmentType}» успешно зарегистрирована. Ведущий консультант свяжется с вами в течение 10 минут.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setName('');
                    setPhone('+998 ');
                  }}
                  className="px-6 py-2.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  Отправить еще одну заявку
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">
                    Забронировать консультацию и презентацию
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mb-6">
                    Оставьте контактные данные — мы зафиксируем за вами специальные условия покупки и скидку 10%.
                  </p>
                </div>

                {/* Name field */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Например: Сардор или Дильноза"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-white/15 focus:border-[#6fb1ea] focus:ring-2 focus:ring-[#6fb1ea]/30 text-white text-sm outline-none transition-all placeholder:text-slate-500"
                  />
                </div>

                {/* Phone field */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Номер телефона
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+998 90 123 45 67"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-white/15 focus:border-[#6fb1ea] focus:ring-2 focus:ring-[#6fb1ea]/30 text-white text-sm outline-none transition-all font-mono placeholder:text-slate-500"
                  />
                </div>

                {/* Apartment interest selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Интересующая планировка
                  </label>
                  <select
                    value={apartmentType}
                    onChange={(e) => setApartmentType(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-white/15 focus:border-[#6fb1ea] focus:ring-2 focus:ring-[#6fb1ea]/30 text-white text-sm outline-none transition-all"
                  >
                    <option value="2-комнатная 53,9 м²">2-комнатная квартира 53,9 м²</option>
                    <option value="3-комнатная 63,4 м²">3-комнатная квартира 63,4 м²</option>
                    <option value="Коммерческая недвижимость (1-й этаж)">
                      Коммерческая недвижимость (1-й этаж с витринами)
                    </option>
                    <option value="Пентхаус с террасой">Пентхаус с видовой террасой</option>
                  </select>
                </div>

                {/* Preferred method of contact */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Удобный способ связи
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'call', label: 'Звонок' },
                      { id: 'telegram', label: 'Telegram' },
                      { id: 'whatsapp', label: 'WhatsApp' },
                    ].map((m) => (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => setPreferredMethod(m.id as 'call' | 'telegram' | 'whatsapp')}
                        className={`py-2.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                          preferredMethod === m.id
                            ? 'bg-[#1f4fa8] text-white border-[#6fb1ea]'
                            : 'bg-slate-900/70 text-slate-400 border-white/10 hover:text-white'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Note / Calculated Info if provided */}
                {prefilledNotes && (
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-300">
                    <span className="font-semibold text-[#6fb1ea]">Параметры расчета:</span> {prefilledNotes}
                  </div>
                )}

                {/* Privacy note */}
                <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Ваши данные строго конфиденциальны и не передаются третьим лицам.</span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-brand-gradient hover:opacity-95 shadow-xl shadow-[#1f4fa8]/40 rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Отправка данных...</span>
                  ) : (
                    <>
                      <span>Забронировать консультацию</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
