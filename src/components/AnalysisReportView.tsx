
import React from 'react';
import type { AnalysisReport, Language } from '../types';
import { CheckCircle, AlertTriangle, XCircle, TrendingUp, Shield, Layers, Cpu, Lock, ArrowRight, Sparkles, Zap } from 'lucide-react';

interface Props {
  report: AnalysisReport;
  onReset: () => void;
  lang: Language;
  onShowPricing: () => void;
}

const ScoreCard: React.FC<{ title: string; score: number; icon: React.ReactNode }> = ({ title, score, icon }) => {
  let colorClass = 'text-red-500';
  let bgClass = 'bg-red-500/10 border-red-500/20';
  if (score >= 80) { colorClass = 'text-green-500'; bgClass = 'bg-green-500/10 border-green-500/20'; }
  else if (score >= 60) { colorClass = 'text-yellow-500'; bgClass = 'bg-yellow-500/10 border-yellow-500/20'; }

  return (
    <div className={`p-4 rounded-xl border ${bgClass} flex flex-col items-center justify-center text-center`}>
      <div className={`mb-2 ${colorClass}`}>{icon}</div>
      <div className="text-sm text-slate-400 mb-1">{title}</div>
      <div className={`text-2xl font-bold ${colorClass}`}>{score}/100</div>
    </div>
  );
};

const SectionRow: React.FC<{ section: any }> = ({ section }) => {
  const getIcon = (status: string) => {
    switch(status) {
      case 'good': return <CheckCircle className="text-green-500" size={20} />;
      case 'warning': return <AlertTriangle className="text-yellow-500" size={20} />;
      case 'critical': return <XCircle className="text-red-500" size={20} />;
      default: return <AlertTriangle className="text-slate-500" size={20} />;
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-lg p-5 border border-slate-700 hover:border-blue-500/50 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          {section.title}
        </h3>
        <div className="flex items-center gap-2">
            <span className={`text-sm font-bold ${section.score > 80 ? 'text-green-400' : section.score > 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                {section.score}/100
            </span>
            {getIcon(section.status)}
        </div>
      </div>
      <p className="text-slate-300 text-sm mb-4">{section.description}</p>
      <div className="space-y-2">
        {section.details.map((detail: string, idx: number) => (
          <div key={idx} className="flex items-start gap-2 text-sm text-slate-400">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
            <span>{detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const AnalysisReportView: React.FC<Props> = ({ report, onReset, lang, onShowPricing }) => {
  const t = {
    he: {
      reportTitle: "דוח ניתוח AEO לאתר",
      overallScore: "ציון AEO כללי",
      potential: "פוטנציאל חשיפה",
      trust: "אמינות וסמכות",
      structure: "מבנה ל-AI",
      technical: "סיגנלים טכניים",
      depthAnalysis: "ניתוח מעמיק לפי קטגוריות",
      analyzeAnother: "נתח אתר נוסף",
      ctaTitle: "רוצה שנעשה את העבודה הקשה בשבילך?",
      ctaSub: "המומחים שלנו יישמו את התוכנית המלאה באתר שלך ויבטיחו תוצאות.",
      ctaBtn: "הכנס את האתר שלך לעידן ה-AI ",
      stickyMobileTitle: "רוצה לשפר את הציון?",
      stickyMobileBtn: "תן לנו לעשות את זה"
    },
    en: {
      reportTitle: "AEO Analysis Report for",
      overallScore: "Overall AEO Score",
      potential: "Exposure Potential",
      trust: "Trust & Authority",
      structure: "AI Structure",
      technical: "Tech Signals",
      depthAnalysis: "In-Depth Analysis",
      analyzeAnother: "Analyze Another Site",
      ctaTitle: "Want us to do the heavy lifting?",
      ctaSub: "Our experts can implement this full strategy on your site to guarantee results.",
      ctaBtn: "Make Your Website AI-Ready",
      stickyMobileTitle: "Want to fix this score?",
      stickyMobileBtn: "Let us handle it"
    }
  }[lang];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-fade-in pb-32 md:pb-12">
      
      {/* Header Summary */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          {t.reportTitle}: {report.url}
        </h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {report.summary}
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="col-span-2 md:col-span-1">
            <div className="h-full p-6 rounded-2xl bg-gradient-to-br from-blue-900/50 to-slate-900 border border-blue-500/30 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                <div className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">{t.overallScore}</div>
                <div className="text-5xl font-black text-white mb-2">{report.overallScore}</div>
                <div className="text-xs text-blue-300 bg-blue-500/20 px-2 py-1 rounded-full">{t.potential}</div>
            </div>
        </div>
        <ScoreCard title={t.trust} score={report.sections[0]?.score || 0} icon={<Shield size={24} />} />
        <ScoreCard title={t.structure} score={report.sections[1]?.score || 0} icon={<Layers size={24} />} />
        <ScoreCard title={t.technical} score={report.sections[2]?.score || 0} icon={<Cpu size={24} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Detailed Sections */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="text-blue-400" />
            {t.depthAnalysis}
          </h3>
          {report.sections.map((section, idx) => (
            <SectionRow key={idx} section={section} />
          ))}
        </div>

        {/* Right Column: High Impact Sales CTA */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-2 sticky top-8 relative overflow-hidden shadow-2xl h-fit">
            
            <div className="space-y-6">
              
              {/* High Contrast Sales CTA Card */}
              <div className="relative z-20 animate-float">
                  <div className="bg-slate-900 border-2 border-emerald-500 rounded-xl p-10 text-center shadow-[0_0_40px_rgba(16,185,129,0.25)] ring-1 ring-emerald-500/50">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mb-6 mx-auto shadow-lg shadow-emerald-500/30">
                          <Lock className="text-emerald-400" size={32} />
                      </div>
                      <h4 className="text-2xl font-black text-white mb-3">
                          {t.ctaTitle}
                      </h4>
                      <p className="text-base text-slate-300 mb-8 leading-relaxed">
                          {t.ctaSub}
                      </p>
                      <button 
                          onClick={onShowPricing}
                          className="group w-full py-5 bg-gradient-to-b from-emerald-500 to-teal-700 hover:from-emerald-400 hover:to-teal-600 text-white font-bold rounded-xl shadow-xl shadow-emerald-900/40 border-t border-emerald-400/50 border-b border-emerald-900/50 transition-all flex items-center justify-center gap-3 text-xl transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
                      >
                          <span className="relative z-10 drop-shadow-md">{t.ctaBtn}</span>
                          <ArrowRight size={22} className={`relative z-10 transition-transform group-hover:translate-x-1 ${lang === 'he' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                      </button>
                  </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <button 
            onClick={onReset}
            className="text-slate-500 text-sm hover:text-slate-300 transition-colors flex items-center justify-center gap-2 mx-auto"
        >
            <Sparkles size={14} />
            {t.analyzeAnother}
        </button>
      </div>

      {/* MOBILE STICKY BOTTOM CTA BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-slate-900/95 backdrop-blur-md border-t-2 border-emerald-500 z-40 lg:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)] animate-slide-up">
        <div className="px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex flex-col">
                <span className="text-white font-bold text-sm flex items-center gap-1">
                    <Zap size={14} className="text-emerald-400 fill-emerald-400" />
                    {t.stickyMobileTitle}
                </span>
                <span className="text-xs text-slate-400">{t.ctaTitle}</span>
            </div>
            <button 
                onClick={onShowPricing}
                className="bg-emerald-500 hover:bg-emerald-400 text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-emerald-500/20 whitespace-nowrap transition-colors"
            >
                {t.stickyMobileBtn}
            </button>
        </div>
      </div>

    </div>
  );
};

export default AnalysisReportView;
