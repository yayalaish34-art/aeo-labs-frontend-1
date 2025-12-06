import React from 'react';
import { Check, ArrowRight, Zap, Shield, Crown, Sparkles } from 'lucide-react';
import type { Language } from '../types';

interface Props {
  lang: Language;
  onBack: () => void;
  onSelectPlan: (planName: string) => void;
}

const PricingView: React.FC<Props> = ({ lang, onBack, onSelectPlan }) => {
  const isHe = lang === 'he';

  const content = {
    he: {
      titleStart: "סוכנויות שיווק חוגגות עליך.",
      titleEnd: "הגיע הזמן שתשלם פחות.",
      subtitle: "התוכניות שלנו מותאמות לעסקים שרוצים להופיע ראשונים ב-ChatGPT וב-Gemini.",
      setup: "התקנה חד-פעמית",
      oneTime: "תשלום חד-פעמי",
      cta: "בחר בתוכנית הזו",
      bestValue: "הכי נמכר",
      back: "חזור לדוח",
      plans: [
        {
          name: "Level-Up Package",
          price: "₪999",
          tagline: "שדרג את האתר פעם אחת — ותן ל-AI סוף סוף להבין אותך.",
          features: [
            "אופטימיזציה מלאה לאתר",
            "שדרוג מבנה + טקסטים",
            "FAQ + סכמות מתקדמות",
            "מוכן לעידן ה-AI (AI Ready)"
          ],
          icon: Zap
        },
        {
          name: "Keep-Up Plan",
          price: "₪1489",
          tagline: "התוכנית הכי נמכרת — כוללת 3 חודשי תחזוקה ושדרוגים.",
          features: [
            "כל מה שיש ב-Level-Up",
            "3 חודשי תחזוקה מלאים",
            "תיקונים ושיפורים שוטפים",
            "הרחבת FAQ חכמה בעת הצורך",
            "עדכוני סכמות ומתחרים"
          ],
          icon: Shield,
          highlight: true
        },
        {
          name: "Go-Beyond Plan",
          price: "₪1900",
          tagline: "עקוף את המתחרים שלך — שנה שלמה של תחזוקה ושדרוגים.",
          description: "נבנתה לעסקים שרוצים לעקוף, לא להיות בינוניים.",
          features: [
            "כל מה שיש ב-Keep-Up",
            "12 חודשים של תחזוקה מלאה",
            "שדרוגים חודשיים חזקים",
            "AI Authority Boost חודשי",
            "מעקב הופעה ב-AI",
            "דוח AI Visibility שנתי"
          ],
          icon: Crown
        }
      ]
    },

    en: {
      titleStart: "Marketing Agencies Overcharge You.",
      titleEnd: "It's Time You Pay Less.",
      subtitle: "Our plans are built for businesses that want to dominate ChatGPT & Gemini.",
      setup: "One-time Setup",
      oneTime: "One-time Payment",
      cta: "Choose This Plan",
      bestValue: "Best Seller",
      back: "Back to Report",
      plans: [
        {
          name: "Level-Up Package",
          price: "$259",
          tagline: "Upgrade your website once — and let AI finally understand you.",
          features: [
            "Full Website Optimization",
            "Structure + Content Refinement",
            "FAQ + Schema Enhancement",
            "AI Ready Implementation"
          ],
          icon: Zap
        },
        {
          name: "Keep-Up Plan",
          price: "$389",
          tagline: "Our best-selling plan — includes 3 months of optimization.",
          features: [
            "Everything in Level-Up",
            "3 Months of Maintenance",
            "Continuous Improvements",
            "FAQ Enhancement",
            "Competitor Schema Updates"
          ],
          icon: Shield,
          highlight: true
        },
        {
          name: "Go-Beyond Plan",
          price: "$499",
          tagline: "12 months of upgrades & competitive domination.",
          description: "Built for businesses who want to surpass competitors.",
          features: [
            "Everything in Keep-Up",
            "Full Year Maintenance",
            "Major Monthly Enhancements",
            "Monthly Authority Boost",
            "AI Visibility Tracking",
            "Annual Performance Report"
          ],
          icon: Crown
        }
      ]
    }
  };

  const t = content[lang];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16" dir={isHe ? 'rtl' : 'ltr'}>

      {/* BACK BUTTON */}
      <div className="text-center mb-10">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-white flex items-center gap-2 mx-auto transition-colors text-sm"
        >
          <ArrowRight size={16} className={isHe ? '' : 'rotate-180'} />
          {t.back}
        </button>
      </div>

      {/* HEADER */}
      <div className="text-center mb-16">
        
        <div className="relative inline-block max-w-3xl mx-auto mb-6">
          {/* Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-300 rounded-2xl blur opacity-10"></div>

          <div className="relative px-8 py-6 bg-slate-900 rounded-2xl shadow-xl">
            
            {/* Bigger + Gold */}
            <h2 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400 drop-shadow">
              {t.titleStart}
            </h2>

            {/* Same Gold */}
            <h3 className="text-xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-100 to-yellow-300">
              {t.titleEnd}
            </h3>

          </div>
        </div>

        <p className="text-slate-400 text-lg max-w-2xl mx-auto mt-4">
          {t.subtitle}
        </p>
      </div>

      {/* PLANS */}
      <div className="grid lg:grid-cols-3 gap-10">

        {t.plans.map((plan, idx) => {
          const isHighlight = plan.highlight;
          const Icon = plan.icon;

          return (
            <div
              key={idx}
              className={`
                relative p-8 rounded-2xl flex flex-col transition-all
                ${isHighlight
                  ? 'border-2 border-emerald-400 shadow-lg shadow-emerald-600/20 bg-slate-900 scale-[1.03]'
                  : 'border border-slate-700 bg-slate-800/40 hover:border-emerald-300/40'}
              `}
            >
              {/* Badge */}
              {isHighlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-black px-4 py-1 rounded-full text-sm font-bold shadow">
                  <Sparkles size={14} className="inline-block" /> {t.bestValue}
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 flex items-center justify-center rounded-xl mb-6
                ${isHighlight ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-700 text-slate-300"}
              `}>
                <Icon size={28} />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>

              <p className={`${isHighlight ? "text-emerald-300" : "text-slate-400"} italic mb-4`}>
                "{plan.tagline}"
              </p>

              {plan.description && (
                <p className="text-slate-400 text-xs mb-4 border-t border-slate-700/40 pt-2">{plan.description}</p>
              )}

              {/* PRICE */}
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                <span className="text-xs text-emerald-300 font-bold mx-2 mt-1 inline-block">
               {t.oneTime}
              </span>

              </div>

              {/* FEATURES */}
              <div className="space-y-3 flex-1">
                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 flex items-center justify-center rounded-full mt-1
                        ${isHighlight ? "bg-emerald-500/20 text-emerald-300" : "bg-blue-500/10 text-blue-300"}
                      `}
                    >
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-sm text-slate-300">{f}</span>
                  </div>
                ))}
              </div>

              {/* BUTTON */}
              <button
                onClick={() => onSelectPlan(plan.name)}
                className={`mt-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-white
                  ${isHighlight
                    ? "bg-emerald-500 hover:bg-emerald-400 shadow-lg shadow-emerald-500/30"
                    : "bg-slate-700 hover:bg-slate-600"}
                `}
              >
                {t.cta}
                <ArrowRight size={18} className={isHe ? 'rotate-180' : ''} />
              </button>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default PricingView;
