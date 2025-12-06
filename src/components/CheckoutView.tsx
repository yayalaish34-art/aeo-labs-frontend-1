import React, { useState } from 'react';
import { ArrowRight, User, Mail, Phone, Layout, AlertCircle, CheckCircle2, Copy, Bot, Globe, FileText } from 'lucide-react';
import type { Language } from '../types';
const BACKEND_URL = "https://aeo-labs-production.up.railway.app";

interface Props {
  lang: Language;
  selectedPlan: string; // "Level-Up Package" | "Keep-Up Plan" | "Go-Beyond Plan"
  onBack: () => void;
}

const CheckoutView: React.FC<Props> = ({ lang, selectedPlan, onBack }) => {
  const isHe = lang === 'he';
  const [copied, setCopied] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [platform, setPlatform] = useState('');
  const [website, setWebsite] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = name.trim() && email.trim() && phone.trim() && platform && website.trim();

  const copyToClipboard = () => {
    navigator.clipboard.writeText('aeolabsisrael@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // מיפוי בין התוכנית שנבחרה במסך הקודם לבין ה-key בבאקאנד (PLAN_CONFIG)
  const planKeyByName: Record<string, "LEVEL-UP" | "KEEP-UP" | "ULTIMATE"> = {
    "Level-Up Package": "LEVEL-UP",
    "Keep-Up Plan": "KEEP-UP",
    "Go-Beyond Plan": "ULTIMATE",
  };

  const t = {
    he: {
      title: "השלמת הזמנה: " + selectedPlan,
      subtitle: "אנחנו מתחילים לעבוד מיד. מלא את הפרטים הבאים.",
      step1: "פרטי קשר",
      step2: "פרטי האתר",
      step3: "אישור הרשאה (חובה)",
      name: "שם מלא",
      email: "אימייל",
      phone: "טלפון",
      websiteLabel: "כתובת האתר (URL)",
      noteTimeline: "הערה: האתר יהיה מוכן בתוך 2–7 ימים. דוח מפורט עם כל השינויים יישלח אליכם בסיום העבודה.",
      platformLabel: "באיזו פלטפורמה האתר בנוי?",
      platformPlaceholder: "בחר פלטפורמה...",
      platformHint: "לא בטוח? בדוק בתחתית האתר (Footer) או השתמש בתוסף Wappalyzer.",
      editorTitle: "חשוב מאוד: אל תשלם לפני ביצוע שלב זה!",
      editorDesc: "כדי שנוכל לבצע את האופטימיזציה, עליך לתת הרשאת עריכה בתוך האתר שלך לכתובת הבאה:",
      editorEmail: "aeolabsisrael@gmail.com",
      editorNote: "לא מצליח? צ'אט העוזר שלנו (בצד ימין למטה) ידריך אותך צעד-אחר-צעד.",
      notesLabel: "הערות מיוחדות / בקשות ספציפיות (אופציונלי)",
      submitBtn: "המשך לתשלום",
      fillAll: "נא למלא את כל שדות החובה",
      platforms: ["WordPress", "Wix", "Shopify", "Webflow", "Squarespace", "אחר / קוד פתוח"]
    },
    en: {
      title: "Complete Order: " + selectedPlan,
      subtitle: "We start working immediately. Please fill in the details.",
      step1: "Contact Details",
      step2: "Website Details",
      step3: "Access Permission (Required)",
      name: "Full Name",
      email: "Email",
      phone: "Phone",
      websiteLabel: "Website URL",
      noteTimeline: "Note: The website will be ready within 2–7 days. A detailed report of all changes will be sent upon completion.",
      platformLabel: "Which platform is your site built on?",
      platformPlaceholder: "Select platform...",
      platformHint: "Not sure? Check the website footer or use Wappalyzer.",
      editorTitle: "Crucial: Do not pay before completing this step!",
      editorDesc: "To perform optimization, you must grant editor access to:",
      editorEmail: "aeolabsisrael@gmail.com",
      editorNote: "Stuck? Our AI Assistant (bottom right) will guide you step-by-step.",
      notesLabel: "Special Instructions / Specific Requests (Optional)",
      submitBtn: "Proceed to Payment",
      fillAll: "Please fill all required fields",
      platforms: ["WordPress", "Wix", "Shopify", "Webflow", "Squarespace", "Other / Custom Code"]
    }
  }[lang];

  // ⬅⬅⬅ כאן החיבור לשרת ול-Cardcom
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const planKey = planKeyByName[selectedPlan];
    if (!planKey) {
      console.error("Unknown selectedPlan:", selectedPlan);
      alert(isHe ? "בעיה בזיהוי התוכנית, נסה לבחור מחדש." : "Unknown plan selected, please try again.");
      return;
    }

    try {
      setIsLoading(true);

      const res = await fetch(`${BACKEND_URL}/api/checkout/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          website,
          platform,
          notes,
          selectedPlan: planKey, // "LEVEL-UP" | "KEEP-UP" | "ULTIMATE"
        }),
      });

      if (!res.ok) {
        console.error("Checkout error status:", res.status);
        throw new Error("Failed to start checkout");
      }

      const data = await res.json();

      if (data.success && data.redirectUrl) {
        window.location.href = data.redirectUrl; // מעבר לדף התשלום של Cardcom
      } else {
        console.error("Checkout error payload:", data);
        alert(
          isHe
            ? "הייתה בעיה ביצירת התשלום, נסה שוב בעוד כמה דקות."
            : "There was a problem starting the payment. Please try again."
        );
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert(
        isHe
          ? "שגיאה בחיבור לשרת התשלום. נסה שוב."
          : "Error connecting to payment server. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in" dir={isHe ? 'rtl' : 'ltr'}>
      <button 
        onClick={onBack}
        className="mb-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors text-sm"
      >
        <ArrowRight size={16} className={isHe ? '' : 'rotate-180'} />
        {isHe ? 'חזור' : 'Back'}
      </button>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-2">{t.title}</h2>
        <p className="text-slate-400 mb-8">{t.subtitle}</p>

        <form className="space-y-10" onSubmit={handleSubmit}>
          {/* Step 1: Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-sm">1</span>
              {t.step1}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm text-slate-400">{t.name} <span className="text-red-500">*</span></label>
                <div className="relative">
                  <User size={18} className={`absolute top-3 ${isHe ? 'right-3' : 'left-3'} text-slate-500`} />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 ${isHe ? 'pr-10 pl-3' : 'pl-10 pr-3'} text-white focus:ring-2 focus:ring-blue-500 outline-none`} 
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm text-slate-400">{t.phone} <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Phone size={18} className={`absolute top-3 ${isHe ? 'right-3' : 'left-3'} text-slate-500`} />
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 ${isHe ? 'pr-10 pl-3' : 'pl-10 pr-3'} text-white focus:ring-2 focus:ring-blue-500 outline-none`} 
                  />
                </div>
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-sm text-slate-400">{t.email} <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Mail size={18} className={`absolute top-3 ${isHe ? 'right-3' : 'left-3'} text-slate-500`} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 ${isHe ? 'pr-10 pl-3' : 'pl-10 pr-3'} text-white focus:ring-2 focus:ring-blue-500 outline-none`} 
                  />
                </div>
                <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  {t.noteTimeline}
                </p>
              </div>
            </div>
          </div>

          {/* Step 2: Website Details */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-indigo-400 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-sm">2</span>
              {t.step2}
            </h3>
            
            <div className="space-y-2">
              <label className="text-sm text-slate-400">{t.websiteLabel} <span className="text-red-500">*</span></label>
              <div className="relative">
                <Globe size={18} className={`absolute top-3 ${isHe ? 'right-3' : 'left-3'} text-slate-500`} />
                <input 
                  type="text" 
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://www.yoursite.com"
                  className={`w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 ${isHe ? 'pr-10 pl-3' : 'pl-10 pr-3'} text-white focus:ring-2 focus:ring-indigo-500 outline-none`} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-400">{t.platformLabel} <span className="text-red-500">*</span></label>
              <div className="relative">
                <Layout size={18} className={`absolute top-3 ${isHe ? 'right-3' : 'left-3'} text-slate-500`} />
                <select 
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className={`w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 ${isHe ? 'pr-10 pl-3' : 'pl-10 pr-3'} text-white focus:ring-2 focus:ring-indigo-500 outline-none appearance-none`}
                >
                  <option value="">{t.platformPlaceholder}</option>
                  {t.platforms.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <p className="text-xs text-slate-500 italic">{t.platformHint}</p>
            </div>
          </div>

          {/* Step 3: Permissions */}
          <div className="bg-slate-800/50 border border-yellow-500/30 rounded-xl p-6 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500"></div>
            <h3 className="text-xl font-bold text-yellow-400 flex items-center gap-2">
              <AlertCircle size={20} />
              {t.step3}
            </h3>
            
            <div className="space-y-4">
              <p className="text-slate-300 text-sm font-medium">{t.editorTitle}</p>
              <p className="text-slate-400 text-sm">{t.editorDesc}</p>
              
              <div className="flex items-center gap-2 bg-slate-900 p-3 rounded-lg border border-slate-700 group cursor-pointer" onClick={copyToClipboard}>
                <code className="text-emerald-400 font-mono text-lg flex-1">{t.editorEmail}</code>
                <button className="p-2 hover:bg-slate-800 rounded-md transition-colors text-slate-400">
                  {copied ? <CheckCircle2 size={18} className="text-green-500" /> : <Copy size={18} />}
                </button>
              </div>

              <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-500/20 flex items-center gap-3">
                <div><Bot size={20} className="text-blue-400" /></div>
                <p className="text-sm text-blue-400 font-bold leading-relaxed">{t.editorNote}</p>
              </div>
            </div>
          </div>

          {/* Special Instructions */}
          <div className="space-y-2">
            <label className="text-sm text-slate-400 flex items-center gap-2">
              <FileText size={16} />
              {t.notesLabel}
            </label>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            ></textarea>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all text-lg flex items-center justify-center gap-2
                ${(!isFormValid || isLoading) ? 'opacity-50 cursor-not-allowed grayscale' : ''}
              `}
            >
              {isLoading ? (isHe ? "מייצר תשלום..." : "Processing payment...") : t.submitBtn}
              <ArrowRight size={20} className={isHe ? 'rotate-180' : ''} />
            </button>
            {!isFormValid && (
              <p className="text-center text-red-400 text-sm mt-3 animate-pulse">{t.fillAll}</p>
            )}
          </div>

        </form>
      </div>
    </div>
  );
};

export default CheckoutView;
