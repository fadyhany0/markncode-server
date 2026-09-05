import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Users, Award, ArrowLeft, HelpCircle } from 'lucide-react';

const NICHES = [
  { id: 'gym', label: 'صالات رياضية ولياقة (Gym & Fitness)', avgCpc: 6.5, avgConv: 0.12, avgDealValue: 1800 },
  { id: 'beauty', label: 'مراكز تجميل وعيادات جلدية (Beauty & Clinic)', avgCpc: 8.0, avgConv: 0.10, avgDealValue: 3500 },
  { id: 'ecommerce', label: 'تجارة إلكترونية أثاث/ملابس (E-Commerce)', avgCpc: 4.5, avgConv: 0.05, avgDealValue: 1200 },
  { id: 'realestate', label: 'عقارات وتطوير عقاري (Real Estate)', avgCpc: 22.0, avgConv: 0.04, avgDealValue: 45000 },
  { id: 'b2b', label: 'خدمات B2B وتطوير أعمال (B2B Services)', avgCpc: 18.0, avgConv: 0.08, avgDealValue: 15000 }
];

export default function RoiSimulator({ onSendToChat }) {
  const [selectedNicheId, setSelectedNicheId] = useState('gym');
  const [budget, setBudget] = useState(30000); // 30,000 EGP default

  const currentNiche = NICHES.find((n) => n.id === selectedNicheId);

  // Calculations
  const estimatedClicks = Math.round(budget / currentNiche.avgCpc);
  const estimatedLeads = Math.round(estimatedClicks * currentNiche.avgConv);
  const estimatedDeals = Math.round(estimatedLeads * 0.25); // 25% conversion from lead to paying customer
  const estimatedRevenue = estimatedDeals * currentNiche.avgDealValue;
  const netProfit = estimatedRevenue - budget;
  const roiPercentage = budget > 0 ? Math.round((netProfit / budget) * 100) : 0;
  const estimatedReach = Math.round(estimatedClicks * 14.5);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 border-cyan-500/30 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-[#00F2FE] border border-cyan-500/30 text-xs font-bold mb-3">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>محاكاة النتائج المتوقعة قبل بدء الحملات</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">محاكاة تفاعلية للعائد الإعلاني (Interactive ROI Simulator) 📊</h2>
        <p className="text-slate-300 text-sm mt-1">
          حدد ميزانيتك ومجالك لتلقي تقرير فوري ودقيق بتوقعات الوصول، وعدد العملاء المحتملين والعائد المالي المتوقع (ROI).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#00F2FE]" />
              <span>إعدادات ميزانية الحملة والمجال</span>
            </h3>

            {/* Niche Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">اختر مجال البزنس بتاعك:</label>
              <div className="space-y-2">
                {NICHES.map((niche) => (
                  <button
                    key={niche.id}
                    onClick={() => setSelectedNicheId(niche.id)}
                    className={`w-full text-right p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      selectedNicheId === niche.id
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-[#00F2FE] text-white shadow-md'
                        : 'bg-slate-900/60 border border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{niche.label}</span>
                    <span className="text-[10px] text-slate-400 font-latin">Avg CPC ~{niche.avgCpc} EGP</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Slider */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300">الميزانية الإعلانية الشهرية:</label>
                <span className="text-sm font-extrabold text-[#00F2FE] font-latin">
                  {budget.toLocaleString('ar-EG')} EGP
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="300000"
                step="5000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00F2FE]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-latin">
                <span>10,000 EGP</span>
                <span>150,000 EGP</span>
                <span>300,000 EGP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <span>التوقعات المالية المباشرة بناءً على داتا السوق</span>
            </h3>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">وصول الحملة المقدر</span>
                <span className="text-xl md:text-2xl font-extrabold text-cyan-400 font-latin">
                  ~{estimatedReach.toLocaleString('ar-EG')}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">شخص مهتم بمجالك</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">النقرات المتوقعة</span>
                <span className="text-xl md:text-2xl font-extrabold text-blue-400 font-latin">
                  ~{estimatedClicks.toLocaleString('ar-EG')}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">زيارة عالية الجودة</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">العملاء المحتملون (Leads)</span>
                <span className="text-xl md:text-2xl font-extrabold text-purple-400 font-latin">
                  ~{estimatedLeads.toLocaleString('ar-EG')}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">حساب مؤهل للتعاقد</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">المبيعات / العقود المقدرة</span>
                <span className="text-xl md:text-2xl font-extrabold text-emerald-400 font-latin">
                  ~{estimatedDeals.toLocaleString('ar-EG')}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">عميل يدفع فعلياً</span>
              </div>
            </div>

            {/* Total ROI Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-purple-950/60 border border-cyan-500/40 text-center space-y-2">
              <span className="text-xs text-slate-300 font-bold block">العائد الإجمالي المتوقع على الاستثمار (Estimated ROI)</span>
              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FE] via-[#4FACFE] to-[#7F00FF] font-latin">
                +{roiPercentage}% ROI
              </div>
              <p className="text-xs text-slate-300">
                المبيعات الإجمالية المقدرة: <strong className="text-emerald-400 font-latin">{estimatedRevenue.toLocaleString('ar-EG')} EGP</strong> (صافي الأرباح: ~{netProfit.toLocaleString('ar-EG')} EGP)
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => onSendToChat && onSendToChat(`أنا حابب أعتمد ميزانية ${budget} EGP لمجال ${currentNiche.label} للحصول على ROI متوقع +${roiPercentage}%`)}
                className="flex-1 gradient-btn py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>اعتماد التقرير ومتابعة الخطوات في الشات</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
