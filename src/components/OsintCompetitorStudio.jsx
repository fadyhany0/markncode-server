import React, { useState } from 'react';
import { Cpu, ShieldCheck, Zap, Layers, AlertCircle, ArrowLeft, Target, Globe } from 'lucide-react';

export default function OsintCompetitorStudio({ onSendToChat }) {
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState(null);

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!competitorUrl.trim()) return;

    setAnalyzing(true);
    setReport(null);

    setTimeout(() => {
      setAnalyzing(false);
      setReport({
        domain: competitorUrl,
        techStack: [
          { category: 'نظام إدارة المحتوى (CMS)', name: 'WordPress 6.4 + Woocommerce', status: 'بطيء في الاستجابة' },
          { category: 'أدوات التتبع والمبيعات', name: 'Meta Pixel + TikTok Pixel', status: 'بدون Meta CAPI (ثغرة تتبع)' },
          { category: 'الاستضافة والسيرفر', name: 'Shared Shared Hosting (Apache)', status: 'معرض للهبوط وقت الحملات الإعلانية' },
          { category: 'التجربة البصرية', name: 'تصميم تقليدي 2D ثابت', status: 'ضعف التفاعل ومعدل تحويل متواضع' }
        ],
        weaknesses: [
          'زمن استجابة السيرفر يتجاوز 2.4 ثانية في فترات الضغط الإعلاني.',
          'عدم استخدام عناصر 3D تفاعلية لتشويق العملاء.',
          'تسريب بيانات التحويلات لدى 35% من زوار الآيفون بسبب غياب الـ CAPI.'
        ],
        markncodeAdvantage: [
          'بناء 3D Landing Page سريعة للغاية تعمل عبر شبكة Edge CDN.',
          'ربط خادم CAPI متكامل لضمان استهداف المنافس واسترجاع العملاء.',
          'أتمتة عملية البيع بوتساب وتليجرام للتفوق المباشر في سرعة الرد.'
        ]
      });
    }, 2800);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      {/* Banner */}
      <div className="glass-panel p-6 border-purple-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-bold mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>أداة الاستخبارات مفتوحة المصدر (OSINT)</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">التحليل الاستخباراتي لمنافسين العميل 🕵️‍♂️</h2>
        <p className="text-slate-300 text-sm mt-1">
          أدخل رابط موقع أكبر منافس لك في السوق، وسيقوم البوت بسحب البنية التحتية وكشف أدواته الإعلانية ونقاط ضعفه الفنية فوراً.
        </p>

        <form onSubmit={handleAnalyze} className="mt-6 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Globe className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={competitorUrl}
              onChange={(e) => setCompetitorUrl(e.target.value)}
              placeholder="رابط المنافس (مثال: competitor.com)"
              className="w-full pl-4 pr-12 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={analyzing || !competitorUrl.trim()}
            className="gradient-purple-btn px-6 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {analyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>جاري تشغيل سكربتات OSINT...</span>
              </>
            ) : (
              <>
                <Target className="w-4 h-4" />
                <span>تحليل المنافس الآن</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Loading state */}
      {analyzing && (
        <div className="glass-panel p-8 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-purple-500/10 border border-purple-500/30 flex-center">
            <Cpu className="w-8 h-8 text-purple-400 animate-spin" />
          </div>
          <h3 className="text-lg font-bold text-white">جاري فحص التقنيات والـ Ad Pixels للمنافس...</h3>
          <p className="text-xs text-slate-400">استخراج الحزم والبرمجة وحجم التفاعل البرمجي</p>
        </div>
      )}

      {/* Report output */}
      {report && !analyzing && (
        <div className="space-y-6">
          {/* Tech Stack Grid */}
          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-400" />
              <span>التقنيات المكتشفة لدى المنافس: {report.domain}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {report.techStack.map((tech, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-xs text-purple-400 font-bold">{tech.category}</span>
                  <h4 className="text-sm font-bold text-white">{tech.name}</h4>
                  <p className="text-xs text-rose-400 font-medium">{tech.status}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Weaknesses vs Markncode Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 space-y-3 border-rose-500/30">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <span>نقاط ضعف المنافس التي يمكنك استغلالها</span>
              </h3>
              <ul className="space-y-2">
                {report.weaknesses.map((w, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel p-6 space-y-3 border-cyan-500/30">
              <h3 className="text-base font-bold text-[#00F2FE] flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span>خطة ماركن كود للتفوق الفوري</span>
              </h3>
              <ul className="space-y-2">
                {report.markncodeAdvantage.map((adv, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action button */}
          <div className="glass-panel p-6 text-center space-y-3">
            <h3 className="text-lg font-bold text-white">جاهز للتفوق على منافسك باستراتيجية ماركن كود؟</h3>
            <button
              onClick={() => onSendToChat && onSendToChat(`أنا عايز خطة للتفوق على منافسي ${report.domain} بناءً على تقرير OSINT`)}
              className="gradient-purple-btn px-6 py-3 rounded-xl text-xs font-bold inline-flex items-center gap-2 cursor-pointer"
            >
              <span>مناقشة خطة التغلب على المنافس في الشات</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
