
import React, { useState, useEffect } from 'react';
import { Bot, User, Search } from 'lucide-react';
import type { Language } from '../types';

interface Props {
  lang: Language;
}

const ChatSimulation: React.FC<Props> = ({ lang }) => {
  const [step, setStep] = useState(0);
  const [typedText, setTypedText] = useState('');
  
  const content = {
    he: {
      userQuery: "אני מחפש עורך דין מומחה לנדל\"ן בתל אביב, מישהו אמין וזמין מיידית.",
      aiResponseStart: "על סמך ביקורות עדכניות וניתוח נתונים, ",
      aiResponseHighlight: "משרד עו\"ד כהן ושות'",
      aiResponseEnd: " בולט במיוחד בזכות זמינות גבוהה, דירוג אמינות גבוה ומומחיות מוכחת בעסקאות מורכבות בתל אביב.",
      source: "המקור נמצא בעל אמינות גבוהה ביותר בקרב אינדקסים משפטיים.",
      header: "Generative AI Chat"
    },
    en: {
      userQuery: "I'm looking for a top-rated real estate lawyer in New York, someone reliable available immediately.",
      aiResponseStart: "Based on recent reviews and data analysis, ",
      aiResponseHighlight: "Smith & Associates",
      aiResponseEnd: " stands out for high availability, strong trust ratings, and proven expertise in complex NY transactions.",
      source: "Source identified as highly authoritative among legal directories.",
      header: "Generative AI Chat"
    }
  };

  const currentContent = content[lang];

  useEffect(() => {
    // Reset state when language changes
    setStep(0);
    setTypedText('');
  }, [lang]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (step === 0) {
      // User typing
      if (typedText.length < currentContent.userQuery.length) {
        timeout = setTimeout(() => {
          setTypedText(currentContent.userQuery.slice(0, typedText.length + 1));
        }, 50);
      } else {
        timeout = setTimeout(() => setStep(1), 1000); // Wait before sending
      }
    } else if (step === 1) {
      // "Thinking" state
      timeout = setTimeout(() => setStep(2), 2000);
    } 
    // Step 2 is showing result, stays there.

    return () => clearTimeout(timeout);
  }, [step, typedText, currentContent.userQuery]);

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-800/80 backdrop-blur-md rounded-xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col h-[320px]">
      {/* Fake Browser Header */}
      <div className="bg-slate-900 px-4 py-3 flex items-center space-x-2 space-x-reverse ltr:space-x-2 border-b border-slate-700" dir="ltr">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 text-center text-xs text-slate-400 font-mono">{currentContent.header}</div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 p-4 space-y-6 font-sans" dir={lang === 'he' ? 'rtl' : 'ltr'}>
        
        {/* User Message */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
            <User size={16} className="text-white" />
          </div>
          <div className="bg-slate-700 rounded-2xl rounded-tr-none ltr:rounded-tr-2xl ltr:rounded-tl-none px-4 py-2 text-slate-200 text-sm leading-relaxed max-w-[90%]">
            {typedText}
            {step === 0 && <span className="typing-cursor"></span>}
          </div>
        </div>

        {/* AI Response */}
        {step >= 1 && (
          <div className="flex gap-3 animate-fade-in-up">
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 relative">
              <Bot size={16} className="text-white" />
              {step === 1 && (
                <div className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping opacity-75"></div>
              )}
            </div>
            <div className="bg-slate-900/50 border border-emerald-500/30 rounded-2xl rounded-tl-none ltr:rounded-tl-2xl ltr:rounded-tr-none px-4 py-3 text-slate-200 text-sm leading-relaxed w-full">
              {step === 1 ? (
                <div className={`flex items-center h-6 gap-1 ${lang === 'he' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-150"></div>
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-300"></div>
                </div>
              ) : (
                <div className="animate-fade-in">
                  <span>{currentContent.aiResponseStart}</span>
                  <span className="font-bold text-emerald-400 bg-emerald-950/50 px-1 rounded">{currentContent.aiResponseHighlight}</span>
                  <span>{currentContent.aiResponseEnd}</span>
                  
                  <div className="mt-4 p-3 bg-slate-800 rounded border border-slate-700 flex items-center gap-3">
                     <div className="bg-white/10 p-2 rounded">
                        <Search size={16} className="text-emerald-400" />
                     </div>
                     <div className="text-xs text-slate-400">
                        {currentContent.source}
                     </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSimulation;
