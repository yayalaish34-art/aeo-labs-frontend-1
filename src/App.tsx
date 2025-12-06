
import React, { useState, useEffect } from 'react';
import { ArrowRight, Loader2, Menu, X, Globe, Sparkles, CheckCircle2, BrainCircuit, Mail } from 'lucide-react';
import ChatSimulation from './components/ChatSimulation';
import AnalysisReportView from './components/AnalysisReportView';
import PricingView from './components/PricingView';
import CheckoutView from './components/CheckoutView';
import HowItWorks from './components/HowItWorks';
import SupportChat from './components/SupportChat';
import FAQ from './components/FAQ';
import { analyzeWebsite } from './services/geminiService';
import { AnalysisStatus } from './types';
import type { AnalysisReport, Language } from './types';
// שורה 8: הוסף יבוא לרכיב הצלחה
import SuccessMessage from './components/SuccessView';
// שורה 9: הוסף יבוא לרכיב כישלון
import FailureMessage from './components/FailureView';

const TRANSLATIONS = {
  he: {
    nav: { home: 'ראשי', howItWorks: 'איך זה עובד?', faq: 'שאלות נפוצות', contact: 'צור קשר' },
    hero: {
      badge: 'מהפכת החיפוש כבר כאן',
      titleStart: 'בעידן שבו ChatGPT בוחר מי יקבל לקוחות —',
      titleHighlight: 'האם אתה ברשימה?',
      description: 'אנחנו בוחנים לעומק את האתר שלך ומייצרים עבורך דוח מקצועי, מפורט ומותאם אישית, שנבנה במיוחד כדי לעזור לאתר שלך להופיע בתשובות של ChatGPT, Gemini, Meta-AI ושאר מנועי התשובות החדשים.',
      urlLabel: 'כתובת האתר שלך',
      submitBtnPre: 'קבל דוח ניתוח מלא',
      submitBtnHigh: 'בחינם',
      analyzingBtn: 'מנתח את האתר...',
      errorEmpty: 'נא להזין כתובת אתר תקינה',
      errorGeneric: 'אירעה שגיאה בניתוח האתר. נסה שוב או בדוק את הכתובת.',
      freeBadgeMain: 'לגמרי בחינם. בלי אותיות קטנות.',
      freeBadgeSub: 'קבל דוח ספציפי לאתר שלך תוך מספר שניות.',
      floatBadgeTitle: 'מותאם ל-ChatGPT',
      floatBadgeSub: 'ניתוח סיגנלים בזמן אמת'
    },
    footer: {
      rights: '© 2024 AEO Labs. כל הזכויות שמורות.',
      tagline: 'אנחנו עוזרים לעסקים להיראות טוב יותר בעיני הבינה המלאכותית.',
      contactTitle: 'יצירת קשר'
    }
  },
  en: {
    nav: { home: 'Home', howItWorks: 'How it Works?', faq: 'FAQ', contact: 'Contact' },
    hero: {
      badge: 'The Search Revolution is Here',
      titleStart: 'In an era where ChatGPT chooses who gets customers —',
      titleHighlight: 'Are you on the list?',
      description: 'We deeply analyze your website and generate a professional, detailed, and personalized report, built specifically to help your site appear in answers from ChatGPT, Gemini, Meta-AI, and other new answer engines.',
      urlLabel: 'Your Website URL',
      submitBtnPre: 'Get Full Analysis Report for',
      submitBtnHigh: 'Free',
      analyzingBtn: 'Analyzing Site...',
      errorEmpty: 'Please enter a valid website URL',
      errorGeneric: 'An error occurred. Please try again or check the URL.',
      freeBadgeMain: 'Totally Free. No Strings Attached.',
      freeBadgeSub: 'Get a specific report for your site within seconds.',
      floatBadgeTitle: 'Optimized for ChatGPT',
      floatBadgeSub: 'Real-time signal analysis'
    },
    footer: {
      rights: '© 2024 AEO Labs. All rights reserved.',
      tagline: 'We help businesses look better in the eyes of Artificial Intelligence.',
      contactTitle: 'Contact Us'
    }
  }
};

function App() {
  const [urlInput, setUrlInput] = useState('');
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  
  // Lazy initialization for language detection
  const [lang, setLang] = useState<Language>(() => {
    
    return 'he';
  });

  const t = TRANSLATIONS[lang];
useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment');
    
    if (paymentStatus) {
      if (paymentStatus === 'success') {
        setStatus(AnalysisStatus.PAYMENT_SUCCESS);
      } else if (paymentStatus === 'failure') {
        setStatus(AnalysisStatus.PAYMENT_FAILURE);
      } 
      // window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []); // ריצה חד-פעמית בטעינת הקומפוננטה
  useEffect(() => {
    // Update HTML direction and language attribute
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => prev === 'he' ? 'en' : 'he');
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) {
      setErrorMsg(t.hero.errorEmpty);
      return;
    }

    // Basic URL validation
    let formattedUrl = urlInput;
    if (!formattedUrl.startsWith('http')) {
      formattedUrl = `https://${formattedUrl}`;
    }
    // Update input with formatted URL
    setUrlInput(formattedUrl);
    
    // Start Analysis directly
    setStatus(AnalysisStatus.ANALYZING);
    setErrorMsg('');

    try {
      const data = await analyzeWebsite(formattedUrl, lang);
      setReport(data);
      setStatus(AnalysisStatus.COMPLETE);
    } catch (err) {
      console.error(err);
      setStatus(AnalysisStatus.ERROR);
      setErrorMsg(t.hero.errorGeneric);
    }
  };

  const resetAnalysis = () => {
    setStatus(AnalysisStatus.IDLE);
    setReport(null);
    setUrlInput('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showPricing = () => {
      setStatus(AnalysisStatus.PRICING);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const backToReport = () => {
      if (report) {
          setStatus(AnalysisStatus.COMPLETE);
      } else {
          resetAnalysis();
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showCheckout = (planName: string) => {
    setSelectedPlan(planName);
    setStatus(AnalysisStatus.CHECKOUT);
    setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 50);
  };

  const backToPricing = () => {
    setStatus(AnalysisStatus.PRICING);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    handleScrollTo('how-it-works');
  };
  
  const scrollToFAQ = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    handleScrollTo('faq');
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    handleScrollTo('contact');
  };

  const handleScrollTo = (id: string) => {
    // If we are in report view or pricing view, we need to go back to home first
    if (status === AnalysisStatus.COMPLETE || status === AnalysisStatus.PRICING || status === AnalysisStatus.CHECKOUT) {
      setStatus(AnalysisStatus.IDLE);
      setReport(null);
      setUrlInput('');
      
      // Wait for React to render the home view before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If already on home view, just scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const renderContent = () => {
      switch (status) {
        case AnalysisStatus.PAYMENT_SUCCESS:
              return <SuccessMessage lang={lang} onHome={resetAnalysis} />; 

          case AnalysisStatus.PAYMENT_FAILURE:
              return <FailureMessage lang={lang} onRetry={backToPricing} />;
          case AnalysisStatus.CHECKOUT:
              return (
                <CheckoutView 
                  lang={lang} 
                  selectedPlan={selectedPlan} 
                  onBack={backToPricing} 
                />
              );

          case AnalysisStatus.PRICING:
              return (
                <PricingView 
                  lang={lang} 
                  onBack={backToReport} 
                  onSelectPlan={showCheckout} 
                />
              );
          
          case AnalysisStatus.COMPLETE:
              return report ? (
                <AnalysisReportView 
                    report={report} 
                    onReset={resetAnalysis} 
                    lang={lang}
                    onShowPricing={showPricing} 
                />
              ) : null;
          
          case AnalysisStatus.IDLE:
          case AnalysisStatus.ANALYZING:
          case AnalysisStatus.ERROR:
          default:
              return (
                <div className="relative">
                {/* Background Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none opacity-50"></div>
   
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
                 <div className="grid lg:grid-cols-2 gap-12 items-center">
                   
                   {/* Left Column: Content Switcher */}
                   <div className="text-center lg:text-start space-y-8">
                        {/* Initial State: URL Input */}
                        <>
                           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium animate-fade-in">
                           <Sparkles size={14} />
                           <span>{t.hero.badge}</span>
                           </div>
                           
                           <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
                           <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-slate-400">
                              {t.hero.titleStart}
                           </span>
                           <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 drop-shadow-sm">
                              {t.hero.titleHighlight}
                           </span>
                           </h1>
                           
                           <div className="relative">
                           <div className={`hidden lg:block absolute ${lang === 'he' ? '-right-6' : '-left-6'} top-2 bottom-2 w-1 bg-gradient-to-b from-blue-500/50 to-transparent rounded-full`}></div>
                           <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                              {t.hero.description}
                           </p>
                           </div>
                           
                           <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-xl backdrop-blur-sm">
                           <form onSubmit={handleUrlSubmit} className="space-y-4">
                              <div className="space-y-2">
                                 <label htmlFor="url" className="block text-sm font-medium text-slate-300 text-start">{t.hero.urlLabel}</label>
                                 <div className="relative">
                                 <input
                                    type="text"
                                    id="url"
                                    placeholder="www.your-website.com"
                                    className={`w-full ${lang === 'he' ? 'pl-4 pr-12' : 'pl-12 pr-4'} py-4 bg-slate-900/80 border border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-100 placeholder-slate-500 transition-all text-left dir-ltr`}
                                    value={urlInput}
                                    onChange={(e) => setUrlInput(e.target.value)}
                                    disabled={status === AnalysisStatus.ANALYZING}
                                 />
                                 <div className={`absolute ${lang === 'he' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-500`}>
                                    <Globe size={20} />
                                 </div>
                                 </div>
                              </div>
                              
                              <button
                                 type="submit"
                                 disabled={status === AnalysisStatus.ANALYZING}
                                 className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                              >
                                 {status === AnalysisStatus.ANALYZING ? (
                                 <>
                                    <Loader2 className="animate-spin" />
                                    {t.hero.analyzingBtn}
                                 </>
                                 ) : (
                                 <>
                                    <span>
                                       {t.hero.submitBtnPre}{' '}
                                       <span className="underline decoration-2 decoration-emerald-400 underline-offset-4">{t.hero.submitBtnHigh}</span>
                                    </span>
                                    <ArrowRight size={20} className={lang === 'he' ? 'rotate-180' : ''} />
                                 </>
                                 )}
                              </button>
                              
                              {errorMsg && (
                                 <p className="text-red-400 text-sm mt-2 text-center bg-red-900/20 py-2 rounded-lg">{errorMsg}</p>
                              )}
                              
                              <div className="mt-6 p-3 bg-emerald-900/20 border border-emerald-500/20 rounded-xl text-center backdrop-blur-sm">
                                 <p className="text-emerald-400 font-bold text-base flex items-center justify-center gap-2">
                                 <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                                 {t.hero.freeBadgeMain}
                                 </p>
                                 <p className="text-emerald-400/70 text-sm mt-1">
                                 {t.hero.freeBadgeSub}
                                 </p>
                              </div>
                           </form>
                           </div>
                        </>
                   </div>
   
                   {/* Right Column: Visual */}
                   <div className="relative hidden lg:block">
                     <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl blur opacity-30 animate-pulse"></div>
                     <ChatSimulation lang={lang} />
                     
                     {/* Floating badges */}
                     <div className={`absolute -bottom-6 ${lang === 'he' ? '-right-6' : '-left-6'} bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-xl animate-float delay-1000 hidden xl:block`}>
                       <div className="flex items-center gap-3">
                         <div className="bg-green-500/20 p-2 rounded-lg text-green-400">
                           <CheckCircle2 size={24} />
                         </div>
                         <div>
                           <div className="text-sm font-bold text-slate-200">{t.hero.floatBadgeTitle}</div>
                           <div className="text-xs text-slate-400">{t.hero.floatBadgeSub}</div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
   
                 <HowItWorks lang={lang} />
                 
                 <FAQ lang={lang} />
   
               </div>
             </div>
              );
      }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-slate-50 overflow-x-hidden selection:bg-blue-500/30">
      
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={resetAnalysis}>
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 border border-white/10 group-hover:scale-105 transition-transform duration-300">
                <BrainCircuit className="text-white" size={20} />
              </div>
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">AEO Labs</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-baseline space-x-8 space-x-reverse ltr:space-x-8">
                <a href="#" onClick={(e) => { e.preventDefault(); resetAnalysis(); }} className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.nav.home}</a>
                <a href="#how-it-works" onClick={scrollToHowItWorks} className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.nav.howItWorks}</a>
                <a href="#faq" onClick={scrollToFAQ} className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.nav.faq}</a>
                <a href="#contact" onClick={scrollToContact} className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.nav.contact}</a>
              </div>

              <div className="md:hidden">
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-400 hover:text-white">
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-2">
            <a href="#" onClick={(e) => { e.preventDefault(); resetAnalysis(); setIsMobileMenuOpen(false); }} className="block hover:text-blue-400 py-2">{t.nav.home}</a>
            <a href="#how-it-works" onClick={scrollToHowItWorks} className="block hover:text-blue-400 py-2">{t.nav.howItWorks}</a>
            <a href="#faq" onClick={scrollToFAQ} className="block hover:text-blue-400 py-2">{t.nav.faq}</a>
            <a href="#contact" onClick={scrollToContact} className="block hover:text-blue-400 py-2">{t.nav.contact}</a>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {renderContent()}
      </main>

      <footer id="contact" className="bg-[#0f172a] border-t border-slate-800 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm flex flex-col items-center">
          
          <div className="mb-8 flex flex-col items-center gap-2">
            <h4 className="text-slate-300 font-bold text-lg">{t.footer.contactTitle}</h4>
            <a 
              href="mailto:aeolabsisrael@gmail.com" 
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-base"
            >
              <Mail size={18} />
              aeolabsisrael@gmail.com
            </a>
          </div>

          <p>{t.footer.rights}</p>
          <p className="mt-2">{t.footer.tagline}</p>
          
          {/* Language Toggle Button Moved to Footer */}
          <button 
            onClick={toggleLanguage}
            className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-slate-300 transition-all text-xs font-medium group"
          >
            <Globe size={14} className="text-slate-500 group-hover:text-blue-400 transition-colors" />
            <span className="group-hover:text-slate-200 transition-colors">{lang === 'he' ? 'Switch to English' : 'Switch to IL'}</span>
          </button>
        </div>
      </footer>
      
      {/* Support Chat Widget */}
      <SupportChat lang={lang} />
    </div>
  );
}

export default App;
