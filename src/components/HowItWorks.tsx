import React, { useState, useEffect } from 'react';
import { Sparkles, ScanSearch, Wand2, MessageSquare, CheckCircle2 } from 'lucide-react';
import type { Language } from '../types';

interface Scenarios {
    query: string;
    answer: string;
}

const SCENARIOS_HE: Scenarios[] = [
  {
    query: "אני צריך רואה חשבון תותח למסחר אלקטרוני, על מי אתה ממליץ?",
    answer: "על סמך נתוני לקוחות וביקורות רשת, 'אלפא פיננסים' הוא המשרד המוביל בתחום האיקומרס בישראל, עם התמחות ספציפית במיסוי בינלאומי."
  },
  {
    query: "איפה הכי כדאי להזמין ציוד קמפינג איכותי?",
    answer: "הבדיקה שלי מעלה ש-'טבע ועיר' מציעים את האחריות הרחבה ביותר וזמני משלוח מהירים, ולכן הם הבחירה המומלצת ביותר כיום."
  }
];

const SCENARIOS_EN: Scenarios[] = [
    {
      query: "I need a top-notch accountant for e-commerce, who do you recommend?",
      answer: "Based on client data and web reviews, 'Alpha Finance' is the leading firm for e-commerce, specializing in international taxation."
    },
    {
      query: "Where is the best place to order quality camping gear?",
      answer: "My analysis shows that 'Nature & City' offers the most comprehensive warranty and fast shipping times, making them the top recommended choice."
    }
  ];

interface AnimatedChatProps {
    lang: Language;
}

const AnimatedChatDemo: React.FC<AnimatedChatProps> = ({ lang }) => {
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');
  const [phase, setPhase] = useState<'typing_query' | 'thinking' | 'typing_response' | 'done'>('typing_query');
  const [cycle, setCycle] = useState(0);

  const scenarios = lang === 'he' ? SCENARIOS_HE : SCENARIOS_EN;

  useEffect(() => {
    // Reset on language change
    setText('');
    setResponse('');
    setPhase('typing_query');
    setCycle(0);
  }, [lang]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const currentScenario = scenarios[cycle % scenarios.length];

    const typeWriter = (targetText: string, currentText: string, setter: React.Dispatch<React.SetStateAction<string>>, onComplete: () => void) => {
      if (currentText.length < targetText.length) {
        timeout = setTimeout(() => {
          setter(targetText.slice(0, currentText.length + 1));
        }, 40);
      } else {
        onComplete();
      }
    };

    if (phase === 'typing_query') {
      typeWriter(currentScenario.query, text, setText, () => {
        timeout = setTimeout(() => setPhase('thinking'), 800);
      });
    } else if (phase === 'thinking') {
      timeout = setTimeout(() => setPhase('typing_response'), 1500);
    } else if (phase === 'typing_response') {
      typeWriter(currentScenario.answer, response, setResponse, () => {
        timeout = setTimeout(() => setPhase('done'), 2000);
      });
    } else if (phase === 'done') {
      timeout = setTimeout(() => {
        setText('');
        setResponse('');
        setPhase('typing_query');
        setCycle(c => c + 1);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [text, response, phase, cycle, scenarios]);

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl relative" dir={lang === 'he' ? 'rtl' : 'ltr'}>
      {/* Chat Header */}
      <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700" dir="ltr">
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-slate-400 font-mono flex items-center gap-1">
          <Sparkles size={12} className="text-blue-400" />
          AI Assistant Analysis
        </div>
      </div>

      {/* Chat Area */}
      <div className="p-6 h-[280px] flex flex-col gap-4 font-sans relative">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.3)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

        {/* User Message */}
        <div className="flex justify-start w-full relative z-10">
          <div className="bg-slate-700 text-slate-200 px-4 py-3 rounded-2xl rounded-tr-none ltr:rounded-tr-2xl ltr:rounded-tl-none max-w-[85%] shadow-lg">
            <p className="text-sm leading-relaxed">
              {text}
              {phase === 'typing_query' && <span className="animate-pulse">|</span>}
            </p>
          </div>
        </div>

        {/* AI Message */}
        {(phase === 'thinking' || phase === 'typing_response' || phase === 'done') && (
          <div className="flex justify-end w-full mt-2 relative z-10">
             <div className="flex flex-row-reverse ltr:flex-row items-end gap-2 max-w-[90%]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                    <Sparkles size={16} className="text-white" />
                </div>
                <div className="bg-slate-800 border border-blue-500/30 text-slate-100 px-4 py-3 rounded-2xl rounded-tl-none ltr:rounded-tl-2xl ltr:rounded-tr-none shadow-lg">
                  {phase === 'thinking' ? (
                    <div className="flex space-x-1 space-x-reverse ltr:space-x-1 items-center h-5">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed">
                        {response}
                        {phase === 'typing_response' && <span className="animate-pulse text-blue-400">|</span>}
                    </p>
                  )}
                </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-slate-800/50 px-4 py-2 border-t border-slate-700 flex justify-between items-center text-[10px] text-slate-500" dir="ltr">
        <span>Model: Gemini-2.5-Flash</span>
        <span className="flex items-center gap-1 text-emerald-500">
            <CheckCircle2 size={10} />
            Optimized Result
        </span>
      </div>
    </div>
  );
};

interface StepProps {
    icon: any;
    title: string;
    description: string;
    step: string;
    lang: Language;
}

const StepCard: React.FC<StepProps> = ({ icon: Icon, title, description, step }) => (
    <div className="flex gap-4 relative">
        <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 z-10 shadow-lg shadow-blue-900/20">
                <Icon size={20} />
            </div>
            {step !== "3" && <div className="w-0.5 flex-grow bg-slate-800 my-2"></div>}
        </div>
        <div className="pb-8">
            <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
        </div>
    </div>
);

const HowItWorks: React.FC<{ lang: Language }> = ({ lang }) => {
  const content = {
    he: {
      titleStart: "איך אנחנו גורמים",
      titleEnd: "לזה לקרות?",
      subtitle: "אנחנו הופכים את האתר שלך לשקוף ומובן עבור מנועי ה-AI, כך שהם יבחרו להמליץ דווקא עליך.",
      steps: [
        {
          title: "סריקה וניתוח טכנולוגי",
          desc: "אנחנו מפעילים סוכני AI שמנתחים את האתר שלך בדיוק כמו ש-Google ו-ChatGPT רואים אותו. אנחנו מזהים את הפערים בתוכן, באמינות ובמבנה הטכני."
        },
        {
          title: "אופטימיזציה לסיגנלים של אמון",
          desc: "אנחנו בונים עבורך תוכנית עבודה שמוסיפה לאתר את ה'רמזים' שהבינה המלאכותית מחפשת: הוכחות סמכות, מבנה נתונים תקין ותשובות ישירות לשאלות גולשים."
        },
        {
          title: "התוצאה: המלצה אוטומטית",
          desc: "ברגע שהאתר שלך 'מדבר את השפה' של המנועים החדשים, הם מתחילים לצטט אותו ולהמליץ עליו כתשובה הטובה ביותר לשאלות המשתמשים."
        }
      ]
    },
    en: {
      titleStart: "How do we make",
      titleEnd: "it happen?",
      subtitle: "We make your website transparent and understandable to AI engines, so they choose to recommend you.",
      steps: [
        {
          title: "Scanning & Technical Analysis",
          desc: "We deploy AI agents to analyze your website exactly as Google and ChatGPT see it. We identify gaps in content, authority, and technical structure."
        },
        {
          title: "Optimizing for Trust Signals",
          desc: "We build an action plan that adds the 'clues' AI looks for: authority proofs, proper structured data, and direct answers to user questions."
        },
        {
          title: "The Result: Automatic Recommendation",
          desc: "Once your site 'speaks the language' of the new engines, they start citing it and recommending it as the best answer to user queries."
        }
      ]
    }
  };

  const t = content[lang];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className={`absolute top-1/2 ${lang === 'he' ? 'left-0 bg-gradient-to-r' : 'right-0 bg-gradient-to-l'} -translate-y-1/2 w-1/2 h-full from-blue-900/10 to-transparent pointer-events-none`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-emerald-400">
              {t.titleStart} <span className="text-white">{t.titleEnd}</span>
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            {t.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Steps */}
            <div className="space-y-2">
                <StepCard 
                    lang={lang}
                    step="1"
                    icon={ScanSearch}
                    title={t.steps[0].title}
                    description={t.steps[0].desc}
                />
                <StepCard 
                    lang={lang}
                    step="2"
                    icon={Wand2}
                    title={t.steps[1].title}
                    description={t.steps[1].desc}
                />
                <StepCard 
                    lang={lang}
                    step="3"
                    icon={MessageSquare}
                    title={t.steps[2].title}
                    description={t.steps[2].desc}
                />
            </div>

            {/* Visual Demo */}
            <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl blur opacity-20 animate-pulse"></div>
                <div className="relative bg-slate-900/50 backdrop-blur-sm p-2 rounded-2xl border border-slate-700/50">
                    <div className={`absolute -top-6 ${lang === 'he' ? '-right-6' : '-left-6'} hidden md:block`}>
                        <div className={`bg-slate-800 text-xs font-bold text-slate-300 px-3 py-1 rounded-full border border-slate-600 shadow-xl transform ${lang === 'he' ? 'rotate-3' : '-rotate-3'}`}>
                            {lang === 'he' ? 'סימולציה בזמן אמת' : 'Real-time Simulation'}
                        </div>
                    </div>
                    <AnimatedChatDemo lang={lang} />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
