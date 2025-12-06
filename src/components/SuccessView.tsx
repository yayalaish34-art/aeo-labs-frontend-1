
import React from 'react';
import { CheckCircle2, Clock, FileText, Shield, ArrowRight, Sparkles } from 'lucide-react';
import type { Language } from '../types';

interface Props {
  lang: Language;
  onHome: () => void;
}

const SuccessView: React.FC<Props> = ({ lang, onHome }) => {
  const isHe = lang === 'he';

  const t = {
    he: {
      title: "תודה! ההזמנה התקבלה בהצלחה",
      subtitle: "אנחנו מתחילים לעבוד על האתר שלך כבר עכשיו.",
      timelineTitle: "מה קורה עכשיו?",
      timelineDesc: "זמן העבודה המשוער הוא 2–7 ימים, תלוי במורכבות האתר.",
      step1: "ביצוע אופטימיזציה",
      step1Desc: "המומחים שלנו מיישמים את השינויים הטכניים ומטמיעים סכמות AI.",
      step2: "קבלת דוח מלא",
      step2Desc: "בסיום העבודה, יישלח אליך למייל דוח מפורט עם כל הפעולות שבוצעו.",
      premiumTitle: "לרוכשי תוכניות מתקדמות (Keep-Up / Go-Beyond)",
      premiumDesc: "החשבון שלכם הוגדר למעקב חודשי. אנחנו נבצע בדיקות תקופתיות ונדאג לשדרוגים שוטפים כדי להבטיח שאתם תמיד מובילים בתוצאות ה-AI.",
      backBtn: "חזרה לדף הבית"
    },
    en: {
      title: "Thank You! Order Received",
      subtitle: "We are starting to work on your website right now.",
      timelineTitle: "What happens next?",
      timelineDesc: "Estimated completion time is 2–7 days, depending on website complexity.",
      step1: "Optimization Process",
      step1Desc: "Our experts implement technical changes and AI schemas.",
      step2: "Full Report",
      step2Desc: "Upon completion, a detailed report of all actions taken will be sent to your email.",
      premiumTitle: "For Premium Plans (Keep-Up / Go-Beyond)",
      premiumDesc: "Your account is set for monthly monitoring. We will perform periodic checks and regular upgrades to ensure you dominate AI results.",
      backBtn: "Back to Home"
    }
  }[lang];

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 animate-fade-in" dir={isHe ? 'rtl' : 'ltr'}>
      <div className="max-w-2xl w-full bg-slate-900 border border-emerald-500/30 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(16,185,129,0.15)] text-center relative overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none"></div>

        {/* Success Icon */}
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-40 animate-pulse rounded-full"></div>
          <div className="relative bg-emerald-500/20 text-emerald-400 w-24 h-24 rounded-full flex items-center justify-center border-2 border-emerald-500/50">
            <CheckCircle2 size={48} />
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-200">
          {t.title}
        </h1>
        <p className="text-lg text-slate-300 mb-12">
          {t.subtitle}
        </p>

        {/* Timeline Box */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 mb-8 text-start">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="text-blue-400" size={24} />
            <h3 className="text-xl font-bold text-white">{t.timelineTitle}</h3>
          </div>
          <p className="text-slate-300 mb-6 pl-9 border-l-2 border-blue-500/20 ml-3">
            {t.timelineDesc}
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-slate-700 p-2 rounded-lg text-emerald-400 mt-1">
                <FileText size={18} />
              </div>
              <div>
                <h4 className="font-bold text-slate-200">{t.step1}</h4>
                <p className="text-sm text-slate-400">{t.step1Desc}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-slate-700 p-2 rounded-lg text-emerald-400 mt-1">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <h4 className="font-bold text-slate-200">{t.step2}</h4>
                <p className="text-sm text-slate-400">{t.step2Desc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Note */}
        <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 rounded-2xl p-6 mb-10 text-start relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <Sparkles size={60} />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Shield className="text-indigo-400" size={20} />
            <h4 className="font-bold text-indigo-200">{t.premiumTitle}</h4>
          </div>
          <p className="text-sm text-indigo-100/80 leading-relaxed">
            {t.premiumDesc}
          </p>
        </div>

        <button 
          onClick={onHome}
          className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 mx-auto border border-slate-700 hover:border-slate-600"
        >
          {isHe ? <ArrowRight size={18} /> : null}
          {t.backBtn}
          {!isHe ? <ArrowRight size={18} /> : null}
        </button>

      </div>
    </div>
  );
};

export default SuccessView;
