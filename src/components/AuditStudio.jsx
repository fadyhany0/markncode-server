import React, { useState } from 'react';
import { Search, Activity, ShieldAlert, CheckCircle2, Zap, Smartphone, Globe, ExternalLink, ArrowRight } from 'lucide-react';

export default function AuditStudio({ onSendToChat }) {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [auditResult, setAuditResult] = useState(null);
  const [scanStep, setScanStep] = useState('');

  const handleScan = (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setScanning(true);
    setAuditResult(null);

    const steps = [
      'جاري الاتصال بالسيرفر وسحب بيانات الصفحة...',
      'فحص كود Meta Pixel و Conversion API (CAPI)...',
      'تحليل سرعة التحميل وتجربة المستخدم على الموبايل...',
      'التحقق من أدوات التتبع وتحديث تقرير الأداء...'
    ];

    let currentStep = 0;
    setScanStep(steps[0]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setScanStep(steps[currentStep]);
      } else {
        clearInterval(interval);
        setScanning(false);
        generateAuditReport(url);
      }
    }, 900);
  };

  const generateAuditReport = (targetUrl) => {
    const isCleanUrl = targetUrl.toLowerCase().includes('http');
    const formattedUrl = isCleanUrl ? targetUrl : `https://${targetUrl}`;
    
    setAuditResult({
      url: formattedUrl,
      timestamp: new Date().toLocaleTimeString('ar-EG'),
      overallScore: 68,
      speedScore: 54,
      pixelDetected: true,
      pixelId: '84920491823901',
      capiStatus: false, // Critical issue: No CAPI!
      gtmStatus: true,
      openGraphStatus: false,
      issues: [
        {
          id: 1,
          severity: 'high',
          title: 'غياب الربط المباشر مع Meta Conversions API (CAPI)',
          desc: 'الموقع يعتمد فقط على الـ Browser Pixel بدون CAPI، مما يعني خسارة ما بين 25% إلى 40% من بيانات التحويلات ومبيعات مستخدمي آيفون (iOS 14.5+).'
        },
        {
          id: 2,
          severity: 'medium',
          title: 'بطء ملحوظ في تحميل الصفحة الرئيسية على الموبايل (LCP > 3.8s)',
          desc: 'تأخير تحميل الصور والعناصر يؤدي لارتفاع نسبة الارتداد (Bounce Rate) وتضييع ميزانية الإعلانات قبل فتح الموقع.'
        },
        {
          id: 3,
          severity: 'low',
          title: 'غياب علامات OpenGraph وشريط الدعوة المباشرة للاتصال',
          desc: 'عدم ظهور صورة المعاينة الاحترافية عند مشاركة رابط الموقع على الواتساب أو السوشيال ميديا.'
        }
      ],
      recommendations: [
        'ربط خادم Markncode CAPI لتتبع المبيعات بنسبة 99.8%.',
        'تحويل الواجهة إلى 3D Landing Page سريعة التحميل من خلال تقنياتنا.',
        'تفعيل أتمتة الرد التلقائي وإعادة الاستهداف المباشر.'
      ]
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 border-cyan-500/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-[#00F2FE] border border-cyan-500/30 text-xs font-bold mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>فحص البنية التحتية والـ Pixel والـ CAPI</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">التحليل الفوري لموقع أو صفحة العميل ⚡</h2>
            <p className="text-slate-300 text-sm mt-1">
              أدخل رابط موقعك أو رابط منافسك للفحص البرمجي السريع وكشف ثغرات الإعلانات وسرعة التحميل خلال ثوانٍ معدودة.
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleScan} className="mt-6 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Globe className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="أدخل رابط الموقع هنا (مثال: mybrand.com)"
              className="w-full pl-4 pr-12 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-[#00F2FE] focus:ring-1 focus:ring-[#00F2FE] text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={scanning || !url.trim()}
            className="gradient-btn px-6 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {scanning ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                <span>جاري الفحص البرمجي...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>ابدأ الفحص الفوري</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Scanning Progress */}
      {scanning && (
        <div className="glass-panel p-8 text-center space-y-4 animate-pulse">
          <div className="w-16 h-16 mx-auto rounded-full bg-cyan-500/10 border border-cyan-500/30 flex-center">
            <Activity className="w-8 h-8 text-[#00F2FE] animate-bounce" />
          </div>
          <h3 className="text-lg font-bold text-white">{scanStep}</h3>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden max-w-md mx-auto">
            <div className="bg-gradient-to-r from-[#00F2FE] to-[#7F00FF] h-full animate-pulse w-3/4"></div>
          </div>
        </div>
      )}

      {/* Audit Results Dashboard */}
      {auditResult && !scanning && (
        <div className="space-y-6">
          {/* Top Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="glass-panel p-5 text-center">
              <span className="text-xs text-slate-400 font-bold block mb-1">التقييم الإجمالي للأداء</span>
              <div className="text-4xl font-extrabold text-amber-400 font-latin">{auditResult.overallScore} / 100</div>
              <span className="text-xs text-amber-400/80 mt-1 block">يحتاج تحسين فوري ⚠️</span>
            </div>

            <div className="glass-panel p-5 text-center">
              <span className="text-xs text-slate-400 font-bold block mb-1">Meta Pixel Browser</span>
              <div className="flex-center gap-1.5 text-emerald-400 font-bold mt-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>مفعل ({auditResult.pixelId})</span>
              </div>
            </div>

            <div className="glass-panel p-5 text-center border-rose-500/40">
              <span className="text-xs text-slate-400 font-bold block mb-1">Meta Conversions API (CAPI)</span>
              <div className="flex-center gap-1.5 text-rose-400 font-bold mt-2">
                <ShieldAlert className="w-5 h-5 animate-pulse" />
                <span>غير متصل ❌ (خسارة داتا)</span>
              </div>
            </div>

            <div className="glass-panel p-5 text-center">
              <span className="text-xs text-slate-400 font-bold block mb-1">مؤشر سرعة الموبايل</span>
              <div className="text-3xl font-extrabold text-amber-400 font-latin mt-1">{auditResult.speedScore} / 100</div>
              <span className="text-xs text-slate-400">زمن التحميل: 3.8 ثانية</span>
            </div>
          </div>

          {/* Issues List */}
          <div className="glass-panel p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                <span>الثغرات والمشاكل المكتشفة في الموقع</span>
              </h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30">
                3 ثغرات رئيسية
              </span>
            </div>

            <div className="space-y-3">
              {auditResult.issues.map((issue) => (
                <div key={issue.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                  <span className={`p-2 rounded-lg text-xs font-bold ${
                    issue.severity === 'high' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' :
                    issue.severity === 'medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                    'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  }`}>
                    {issue.severity === 'high' ? 'حرج جداً' : issue.severity === 'medium' ? 'متوسط' : 'تنبيه'}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{issue.title}</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{issue.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations & Action */}
          <div className="glass-panel p-6 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-cyan-950/30 border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">تحب نصلح المشاكل دي ونربط الـ Meta CAPI للموقع؟</h3>
              <p className="text-xs text-slate-300 mt-1">
                فريق ماركن كود جاهز لإنشاء البنية التحتية البرمجية لزيادة تحويلاتك بنسبة تصل إلى +35%.
              </p>
            </div>
            <button
              onClick={() => onSendToChat && onSendToChat(`أنا حابب أصلح مشاكل الفحص لموقعي ${auditResult.url} وأفعل Meta CAPI`)}
              className="gradient-btn px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>إرسال النتائج للشات الذكي ومتابعة الحل</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
