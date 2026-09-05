import React from 'react';
import { Bot, Sparkles, Activity, ShieldCheck, PhoneCall, Cpu, MessageSquare, Settings, QrCode } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, humanHandoffCount, isQrConnected }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#070913]/85 border-b border-white/10 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand Header */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('qr')}>
          <div className="relative flex-center w-11 h-11 rounded-xl bg-gradient-to-tr from-[#00F2FE] via-[#00a884] to-[#7F00FF] p-[2px] shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-[#090d16] rounded-[10px] flex-center">
              <MessageSquare className="w-6 h-6 text-[#00a884] animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-wider text-white font-latin">MARK<span className="text-[#00a884]">N</span>CODE</h1>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-latin">WHATSAPP QR v3.8</span>
            </div>
            <p className="text-xs text-slate-400">نظام أتمتة الواتساب بكود الـ QR</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto py-1 no-scrollbar glass-pill px-2">
          <button
            onClick={() => setActiveTab('qr')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'qr'
                ? 'bg-gradient-to-r from-[#00a884] to-[#25D366] text-[#070913] shadow-md shadow-emerald-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>ربط بالـ QR 📲</span>
            {isQrConnected && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'whatsapp'
                ? 'bg-gradient-to-r from-[#00a884] to-[#25D366] text-[#070913] shadow-md shadow-emerald-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>واتساب بوت حي 📱</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'chat'
                ? 'bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-[#070913] shadow-md shadow-cyan-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>الشات الذكي</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'audit'
                ? 'bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-[#070913] shadow-md shadow-cyan-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>فحص الـ Pixel والموقع</span>
          </button>

          <button
            onClick={() => setActiveTab('osint')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'osint'
                ? 'bg-gradient-to-r from-[#7F00FF] to-[#E100FF] text-white shadow-md shadow-purple-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>تحليل المنافسين OSINT</span>
          </button>

          <button
            onClick={() => setActiveTab('3d')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === '3d'
                ? 'bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-[#070913] shadow-md shadow-cyan-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>تجربة 3D مخصصة</span>
          </button>

          <button
            onClick={() => setActiveTab('roi')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'roi'
                ? 'bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-[#070913] shadow-md shadow-cyan-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>محاكاة الـ ROI</span>
          </button>

          <button
            onClick={() => setActiveTab('crm')}
            className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'crm'
                ? 'bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-[#070913] shadow-md shadow-cyan-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>لوحة الـ CRM والتحويل</span>
            {humanHandoffCount > 0 && (
              <span className="flex-center w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-extrabold animate-pulse">
                {humanHandoffCount}
              </span>
            )}
          </button>
        </nav>

        {/* Live CTA button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('quote')}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#7F00FF] to-[#E100FF] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-500/20 hover:scale-105 transition-all"
          >
            <span>طلب عرض سعر PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
}
