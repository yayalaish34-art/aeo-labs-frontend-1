
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import type { Language } from '../types';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_HE: FAQItem[] = [
  {
    question: "מה זה AEO ולמה העסק שלי צריך את זה?",
    answer: "AEO הוא תהליך התאמה של האתר כך שמנועי AI כמו ChatGPT ו-Gemini יציגו את העסק שלכם ללקוחות. בלי התאמה — האתר כמעט לא מופיע בשאילתות AI."
  },
  {
    question: "כמה זמן לוקח לסיים את ההתאמות?",
    answer: "בדרך כלל 2–7 ימים, תלוי בגודל האתר ובמצבו הנוכחי."
  },
  {
    question: "מה אני מקבל בסיום?",
    answer: "אתר מותאם ל-AI, שיפור מבנה הנתונים והתוכן, ודו״ח מלא על מה שנעשה."
  },
  {
    question: "איך מקבלים תמיכה?",
    answer: "הצ'אט שלנו יודע לענות על כל שאלה על העסק. ובמידת הצורך — אנחנו זמינים 24/7 בכתובת: aeolabsisrael@gmail.com ומבטיחים מענה תוך כמה שעות."
  },
  {
    question: "האם צריך לתת לכם גישה לאתר?",
    answer: "כן — כדי לבצע התאמות אנחנו מבקשים הרשאת עריכה זמנית. הגישה מאפשרת לנו לבצע את כל השינויים הטכניים באתר (ללא שינויי תוכן שלא מאושרים), ולאחר סיום העבודה תוכלו להסיר את ההרשאה בכל רגע."
  }
];

const FAQ_EN: FAQItem[] = [
  {
    question: "What is AEO and why does my business need it?",
    answer: "AEO (Answer Engine Optimization) is the process of optimizing your website so AI platforms like ChatGPT and Gemini will display your business to potential customers. Without AEO, most websites barely appear in AI-driven search results."
  },
  {
    question: "How long does the optimization process take?",
    answer: "Usually 2–7 days, depending on the size of your website and its current structure."
  },
  {
    question: "What do I receive once the process is complete?",
    answer: "A fully AI-optimized website, improved data structure and content, and a full report summarizing all changes made."
  },
  {
    question: "How do I get support?",
    answer: "Our built-in AI chat can answer any question about your business. If you prefer human assistance, we are available 24/7 at: aeolabsisrael@gmail.com. We guarantee a response within a few hours."
  },
  {
    question: "Do you need access to my website?",
    answer: "In order to initiate the optimization process, we request temporary editing access to the website. This access allows us to implement all required technical changes (without modifying any content you haven’t approved). You can remove the editing permissions at any time once the work is complete."
  }
];

const FAQ: React.FC<{ lang: Language }> = ({ lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = lang === 'he' ? FAQ_HE : FAQ_EN;
  const isHe = lang === 'he';

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-slate-900/50 border-t border-slate-800" dir={isHe ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 text-blue-400 mb-4 border border-slate-700">
            <HelpCircle size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            {isHe ? 'שאלות נפוצות' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-slate-400">
            {isHe ? 'כל מה שרציתם לדעת על תהליך האופטימיזציה' : 'Everything you wanted to know about the optimization process'}
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className={`bg-slate-800 border rounded-2xl transition-all duration-300 overflow-hidden
                ${openIndex === idx ? 'border-blue-500/50 shadow-lg shadow-blue-900/20' : 'border-slate-700 hover:border-slate-600'}
              `}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-start focus:outline-none"
              >
                <span className={`text-lg font-bold ${openIndex === idx ? 'text-blue-400' : 'text-slate-200'}`}>
                  {item.question}
                </span>
                <div className={`p-1 rounded-full ${openIndex === idx ? 'bg-blue-500/20 text-blue-400' : 'text-slate-500'}`}>
                  {openIndex === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 pt-0 text-slate-300 leading-relaxed border-t border-slate-700/50 mt-2">
                  <div className="pt-4">{item.answer}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
