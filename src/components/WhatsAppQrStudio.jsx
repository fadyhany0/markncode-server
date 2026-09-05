import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { QrCode, Smartphone, CheckCircle2, RefreshCw, LogOut, ShieldCheck, Zap, ArrowLeft, MessageSquare, AlertCircle } from 'lucide-react';

export default function WhatsAppQrStudio({ onConnectedSuccess, openTab }) {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [status, setStatus] = useState('GENERATING'); // 'GENERATING', 'QR_READY', 'CONNECTED'
  const [connectedPhone, setConnectedPhone] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverOnline, setServerOnline] = useState(false);

  // Poll Real Baileys WebSocket Server for Genuine WhatsApp QR Code
  const fetchRealWhatsAppQr = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/qr/real');
      if (res.ok) {
        setServerOnline(true);
        const data = await res.json();

        if (data.status === 'CONNECTED') {
          setStatus('CONNECTED');
          setConnectedPhone(data.connectedPhone || 'WhatsApp Number');
          if (onConnectedSuccess) onConnectedSuccess(data.connectedPhone);
        } else if (data.qrCodeDataUrl) {
          setQrCodeUrl(data.qrCodeDataUrl);
          setStatus('QR_READY');
          setLoading(false);
        }
      }
    } catch (err) {
      setServerOnline(false);
    }
  };

  useEffect(() => {
    fetchRealWhatsAppQr();
    const interval = setInterval(fetchRealWhatsAppQr, 2000); // Poll real Baileys server every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    await fetch('http://localhost:3001/api/qr/logout', { method: 'POST' }).catch(() => null);
    setStatus('GENERATING');
    setConnectedPhone(null);
    setQrCodeUrl('');
    fetchRealWhatsAppQr();
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      {/* Top Banner */}
      <div className="glass-panel p-6 border-emerald-500/30 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold mb-2">
            <QrCode className="w-3.5 h-3.5" />
            <span>كود WhatsApp Web الأصلي المشفر (Baileys Multi-Device)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${serverOnline ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`}></span>
            <span className="text-xs text-slate-300 font-latin">
              {serverOnline ? 'Baileys Socket Server Online (Port 3001)' : 'Connecting to Server...'}
            </span>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-white">ربط الواتساب الحقيقي (Official WhatsApp Web QR) 📲</h2>
        <p className="text-slate-300 text-sm mt-1">
          هذا الكود مولد مباشراً من سيرفرات الواتساب الرسمية (`web.whatsapp.com`). قم بمسحه من هاتفك للربط الفوري.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* QR Code Container Box */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="glass-panel p-8 text-center space-y-5 border-emerald-500/40 w-full max-w-md bg-[#0b141a]">
            {status === 'CONNECTED' ? (
              /* Connected View */
              <div className="space-y-6 py-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex-center text-emerald-400 shadow-xl shadow-emerald-500/20">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white">تم اقتران الواتساب بنجاح! 🎉</h3>
                  <p className="text-xs text-emerald-400 font-latin font-bold mt-1">
                    الرقم المرتبط: {connectedPhone}
                  </p>
                  <span className="text-[11px] text-slate-400 block mt-2">
                    البوت متصل بسيرفرات WhatsApp ويستقبل ويرد على رسائل عملاء ماركن كود مباشرة على موبايلك!
                  </span>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={() => openTab('whatsapp')}
                    className="gradient-btn py-3 rounded-xl text-xs font-bold flex-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>الانتقال لشات الواتساب ومتابعة المحادثات</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="px-4 py-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-bold flex-center gap-2 hover:bg-rose-500/20 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>قطع الاتصال وإلغاء الاقتران</span>
                  </button>
                </div>
              </div>
            ) : (
              /* QR Code Scanning View */
              <>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>كود WhatsApp الأصلي (Live Socket):</span>
                  </span>
                </div>

                {/* QR Canvas Frame */}
                <div className="relative p-4 rounded-2xl bg-[#070913] border border-emerald-500/30 inline-block shadow-2xl">
                  {qrCodeUrl ? (
                    <img
                      src={qrCodeUrl}
                      alt="Official WhatsApp Web Pairing QR Code"
                      className="w-64 h-64 rounded-xl object-contain"
                    />
                  ) : (
                    <div className="w-64 h-64 flex-center flex-col gap-3 text-emerald-400">
                      <RefreshCw className="w-8 h-8 animate-spin" />
                      <span className="text-xs font-bold">جاري جلب كود الـ QR المشفر من WhatsApp...</span>
                    </div>
                  )}

                  {/* Center Markncode Badge */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-xl bg-[#0b141a] border border-emerald-500/50 shadow-lg">
                    <Smartphone className="w-6 h-6 text-[#00a884]" />
                  </div>
                </div>

                <p className="text-[11px] text-slate-400">
                  كود الـ QR أعلاه مشفر ومولد من سيرفرات فيسبوك/واتساب لعمل اقتران حقيقي مع موبايلك.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Illustrated Steps Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>خطوات مسح الكود بالموبايل (WhatsApp Multi-Device):</span>
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex-center font-bold text-xs shrink-0 font-latin">
                  1
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white">افتح تطبيق الواتساب على هاتفك 📱</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">سواء كان WhatsApp العادي أو WhatsApp Business.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex-center font-bold text-xs shrink-0 font-latin">
                  2
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white">افتح "الأجهزة المرتبطة" (Linked Devices) ⚙️</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">اضغط على النقاط الثلاث بالأعلى ⬅️ اختر <strong>الأجهزة المرتبطة (Linked Devices)</strong>.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex-center font-bold text-xs shrink-0 font-latin">
                  3
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white">اضغط "ربط جهاز" ووجّه الكاميرا للكود 📷</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">سيتم المسح الضوئي للكود المشفر وتفعيل البوت فوراً.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
