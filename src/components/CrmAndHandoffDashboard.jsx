import React, { useState } from 'react';
import { ShieldCheck, Database, Bell, Send, UserCheck, AlertTriangle, Clock, RefreshCw, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { FOLLOWUP_TEMPLATES } from '../data/egyptianBotKnowledge';

export default function CrmAndHandoffDashboard({ leads = [], handoffQueue = [], onTriggerFollowup }) {
  const [activeSubTab, setActiveSubTab] = useState('leads'); // 'leads', 'webhook', 'followups', 'handoff'
  const [simulatedWebhookLog, setSimulatedWebhookLog] = useState([
    { id: 1, target: 'Google Sheets (Leads DB)', status: 200, leadName: 'أحمد محمود', time: '10:42 AM', payload: 'Meta Ads - 50k EGP' },
    { id: 2, target: 'Notion CRM Workspace', status: 200, leadName: 'د. سارة مصطفى', time: '11:15 AM', payload: 'Derma Clinic 3D Landing Page' },
    { id: 3, target: 'Google Sheets (Leads DB)', status: 200, leadName: 'كابتن رامي (Nitro Gym)', time: '12:04 PM', payload: 'Gym Meta CAPI + AI Bot' }
  ]);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Top Banner */}
      <div className="glass-panel p-6 border-cyan-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-[#00F2FE] border border-cyan-500/30 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>الربط التلقائي والتحويل الذكي للبشر</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">لوحة تحكم CRM والـ Human Handoff ⚡</h2>
            <p className="text-slate-300 text-sm mt-1">
              متابعة العملاء المحتملين المسجلين عبر البوت، ربط Notion & Google Sheets الآلي، وإشعارات التدخل البشري الفوري.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubTab('leads')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'leads' ? 'bg-[#00F2FE] text-[#070913]' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              العملاء ({leads.length})
            </button>
            <button
              onClick={() => setActiveSubTab('handoff')}
              className={`relative px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'handoff' ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              التحويل البشري
              {handoffQueue.length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-white text-rose-600 text-[10px]">
                  {handoffQueue.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveSubTab('followups')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'followups' ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              المتابعات (24/48h)
            </button>
            <button
              onClick={() => setActiveSubTab('webhook')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'webhook' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              سجل الـ Webhooks
            </button>
          </div>
        </div>
      </div>

      {/* SubTab 1: Captured Leads Table */}
      {activeSubTab === 'leads' && (
        <div className="glass-panel p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-[#00F2FE]" />
              <span>العملاء المحتملون المؤهلون (Qualified Leads)</span>
            </h3>
            <span className="text-xs text-slate-400">مربوط آلياً بـ Notion & Google Sheets</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-900/80 text-slate-400 font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3">الاسم والشركة</th>
                  <th className="p-3">رقم الهاتف</th>
                  <th className="p-3">الخدمة المطلوبة</th>
                  <th className="p-3">الميزانية</th>
                  <th className="p-3">حالة CRM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-white">
                {leads.map((lead, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40">
                    <td className="p-3 font-bold">
                      {lead.name}
                      <span className="block text-[10px] text-slate-400 font-normal">{lead.company || 'بزنس خاص'}</span>
                    </td>
                    <td className="p-3 font-latin text-cyan-400">{lead.phone}</td>
                    <td className="p-3">{lead.service}</td>
                    <td className="p-3 text-emerald-400 font-bold">{lead.budget || '30k - 50k EGP'}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Synced to Notion</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SubTab 2: Human Handoff Queue */}
      {activeSubTab === 'handoff' && (
        <div className="glass-panel p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <span>قائمة العملاء المقترح تحويلهم للتواصل البشري (High-Ticket & Complex)</span>
            </h3>
            <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 font-bold">
              تنبيه فوري لمدير المبيعات 🚨
            </span>
          </div>

          <div className="space-y-3">
            {handoffQueue.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                لا يوجد عملاء في قائمة الانتظار حالياً. البوت يتعامل بنجاح مع كافة المحادثات.
              </div>
            ) : (
              handoffQueue.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-rose-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{item.name || 'عميل مبيعات ضخمة'}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold">
                        {item.reason}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">الطلب: {item.lastMessage}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${item.phone || ''}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold flex items-center gap-1 hover:bg-emerald-400"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>استلام المحادثة على الواتساب</span>
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* SubTab 3: Follow-up Presets */}
      {activeSubTab === 'followups' && (
        <div className="glass-panel p-6 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" />
            <span>نظام المتابعة الآلية للعملاء بعد 24 و 48 ساعة</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-900/80 border border-purple-500/30 space-y-3">
              <span className="text-xs font-bold text-purple-400 block">رسالة المتابعة الأولى (بعد 24 ساعة)</span>
              <p className="text-xs text-slate-200 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                "{FOLLOWUP_TEMPLATES.h24.arabicText}"
              </p>
              <button
                onClick={() => onTriggerFollowup && onTriggerFollowup('24h')}
                className="gradient-purple-btn w-full py-2.5 rounded-xl text-xs font-bold flex-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>محاكاة إرسال المتابعة بعد 24 ساعة في الشات</span>
              </button>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-cyan-500/30 space-y-3">
              <span className="text-xs font-bold text-cyan-400 block">رسالة المتابعة الثانية (بعد 48 ساعة)</span>
              <p className="text-xs text-slate-200 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                "{FOLLOWUP_TEMPLATES.h48.arabicText}"
              </p>
              <button
                onClick={() => onTriggerFollowup && onTriggerFollowup('48h')}
                className="gradient-btn w-full py-2.5 rounded-xl text-xs font-bold flex-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>محاكاة إرسال المتابعة بعد 48 ساعة في الشات</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SubTab 4: Webhook Logs */}
      {activeSubTab === 'webhook' && (
        <div className="glass-panel p-6 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2 font-arabic">
              <RefreshCw className="w-4 h-4" />
              <span>سجل إرسال الـ Webhooks المباشر لـ Google Sheets و Notion</span>
            </h3>
            <span className="text-emerald-400">ALL ENDPOINTS HEALTHY (200 OK)</span>
          </div>

          <div className="space-y-2">
            {simulatedWebhookLog.map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-slate-300">
                <div>
                  <span className="text-emerald-400 font-bold mr-2">[{log.status} OK]</span>
                  <span>Payload sent to {log.target} -&gt; </span>
                  <span className="text-cyan-300">{log.leadName} ({log.payload})</span>
                </div>
                <span className="text-slate-500">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
