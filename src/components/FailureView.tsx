
import React from 'react';
import { XCircle, AlertTriangle, RefreshCw, Mail } from 'lucide-react';
import type { Language } from '../types';

interface Props {
  lang: Language;
  onRetry: () => void;
}

const FailureView: React.FC<Props> = ({ lang, onRetry }) => {
  const isHe = lang === 'he';

  const t = {
    he: {
      title: "אופס! התשלום לא עבר",
      subtitle: "לא הצלחנו לחייב את אמצעי התשלום שלך.",
      desc: "זה קורה לפעמים בגלל שגיאת תקשורת, סירוב כרטיס או פרטים שגויים.",
      actionTitle: "מה אפשר לעשות?",
      step1: "נסה שוב",
      step1Desc: "לפעמים ניסיון חוזר פותר את הבעיה.",
      step2: "צור קשר עם התמיכה",
      step2Desc: "אם הבעיה נמשכת, אנחנו זמינים לעזור ידנית.",
      retryBtn: "נסה לשלם שוב",
      supportBtn: "דבר איתנו בווטסאפ / מייל",
      supportEmail: "aeolabsisrael@gmail.com"
    },
    en: {
      title: "Oops! Payment Failed",
      subtitle: "We couldn't process your payment.",
      desc: "This usually happens due to a connection error, card decline, or incorrect details.",
      actionTitle: "What can you do?",
      step1: "Try Again",
      step1Desc: "Sometimes a simple retry fixes the issue.",
      step2: "Contact Support",
      step2Desc: "If the issue persists, we are here to help manually.",
      retryBtn: "Try Payment Again",
      supportBtn: "Contact Support",
      supportEmail: "aeolabsisrael@gmail.com"
    }
  }[lang];

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 animate-fade-in" dir={isHe ? 'rtl' : 'ltr'}>
      <div className="max-w-2xl w-full bg-slate-900 border border-red-500/30 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(239,68,68,0.15)] text-center relative overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-red-500/10 blur-3xl rounded-full pointer-events-none"></div>

        {/* Failure Icon */}
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 bg-red-500 blur-xl opacity-40 animate-pulse rounded-full"></div>
          <div className="relative bg-red-500/20 text-red-400 w-24 h-24 rounded-full flex items-center justify-center border-2 border-red-500/50">
            <XCircle size={48} />
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-100 to-red-400">
          {t.title}
        </h1>
        <p className="text-lg text-red-200 mb-2 font-bold">
          {t.subtitle}
        </p>
        <p className="text-slate-400 mb-10 max-w-md mx-auto">
            {t.desc}
        </p>

        {/* Action Box */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 mb-10 text-start">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-yellow-400" size={24} />
            <h3 className="text-xl font-bold text-white">{t.actionTitle}</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-slate-700 p-2 rounded-lg text-blue-400 mt-1">
                <RefreshCw size={18} />
              </div>
              <div>
                <h4 className="font-bold text-slate-200">{t.step1}</h4>
                <p className="text-sm text-slate-400">{t.step1Desc}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-slate-700 p-2 rounded-lg text-emerald-400 mt-1">
                <Mail size={18} />
              </div>
              <div>
                <h4 className="font-bold text-slate-200">{t.step2}</h4>
                <p className="text-sm text-slate-400">{t.step2Desc}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
            onClick={onRetry}
            className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/20"
            >
            <RefreshCw size={18} />
            {t.retryBtn}
            </button>
            
            <a 
            href={`mailto:${t.supportEmail}`}
            className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 border border-slate-700"
            >
            <Mail size={18} />
            {t.supportBtn}
            </a>
        </div>

      </div>
    </div>
  );
};

export default FailureView;
