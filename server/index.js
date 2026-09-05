// Express Webhook & REAL Baileys WhatsApp Server
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { handleIncomingWhatsAppMessage } from './whatsappEngine.js';
import { realBaileysEngine } from './baileysRealServer.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// 1. Root Status Page & Live QR Viewer
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markncode AI WhatsApp Server</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Cairo', sans-serif; }
    body { background: radial-gradient(circle at top, #0f172a, #020617); color: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
    .card { background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 32px; max-width: 440px; width: 100%; text-align: center; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
    .badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 999px; font-size: 13px; font-weight: 700; margin-bottom: 20px; }
    .badge.connected { background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); }
    .badge.connecting { background: rgba(234, 179, 8, 0.15); color: #facc15; border: 1px solid rgba(234, 179, 8, 0.3); }
    .badge.disconnected { background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: currentColor; animation: pulse 2s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.85); } }
    h1 { font-size: 24px; font-weight: 900; margin-bottom: 8px; background: linear-gradient(to right, #38bdf8, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    p { color: #94a3b8; font-size: 14px; margin-bottom: 24px; line-height: 1.6; }
    .qr-container { background: #ffffff; padding: 16px; border-radius: 16px; display: inline-block; box-shadow: 0 10px 25px rgba(0,0,0,0.3); margin-bottom: 20px; }
    .qr-container img { width: 240px; height: 240px; display: block; }
    .btn { background: linear-gradient(135deg, #ef4444, #dc2626); color: white; border: none; padding: 10px 20px; border-radius: 12px; font-weight: 700; cursor: pointer; font-size: 14px; transition: 0.2s; }
    .btn:hover { opacity: 0.9; transform: translateY(-1px); }
  </style>
</head>
<body>
  <div class="card">
    <h1>ماركن كود | MarknCode AI</h1>
    <p>خادم واتساب يعمل 24/7 بالذكاء الاصطناعي</p>
    <div id="statusBadge" class="badge connecting"><span class="dot"></span> جاري فحص الاتصال...</div>
    <div id="qrArea"></div>
    <div id="infoArea"></div>
  </div>

  <script>
    async function updateStatus() {
      try {
        const res = await fetch('/api/qr/real');
        const data = await res.json();
        const badge = document.getElementById('statusBadge');
        const qrArea = document.getElementById('qrArea');
        const infoArea = document.getElementById('infoArea');

        if (data.status === 'CONNECTED') {
          badge.className = 'badge connected';
          badge.innerHTML = '<span class="dot"></span> متصل بواتساب بنجاح 🟢';
          qrArea.innerHTML = '<div style="padding: 30px 10px; font-size: 48px;">🚀</div>';
          infoArea.innerHTML = '<p style="color: #4ade80; font-weight: 700; font-size: 16px;">الرقم المتصل: ' + (data.connectedPhone || '') + '</p><p style="color:#94a3b8; font-size:13px;">البوت نشط ويرد على العملاء تلقائياً 24/7</p><button class="btn" onclick="logout()">تسجيل خروج الرقم</button>';
        } else if (data.qrCodeDataUrl) {
          badge.className = 'badge connecting';
          badge.innerHTML = '<span class="dot"></span> امسح رمز الـ QR بالكاميرا';
          qrArea.innerHTML = '<div class="qr-container"><img src="' + data.qrCodeDataUrl + '" alt="WhatsApp QR" /></div>';
          infoArea.innerHTML = '<p style="font-size: 13px;">افتح واتساب على هاتفك > الأجهزة المرتبطة > ربط جهاز، وامسح الرمز أعلاه</p>';
        } else {
          badge.className = 'badge disconnected';
          badge.innerHTML = '<span class="dot"></span> جاري توليد كود QR...';
          qrArea.innerHTML = '<p style="color:#64748b; padding: 40px 0;">يرجى الانتظار ثوانٍ...</p>';
        }
      } catch (err) {
        console.error(err);
      }
    }

    async function logout() {
      if (confirm('هل أنت متأكد من تسجيل خروج واتساب؟')) {
        await fetch('/api/qr/logout', { method: 'POST' });
        location.reload();
      }
    }

    updateStatus();
    setInterval(updateStatus, 3000);
  </script>
</body>
</html>`);
});

// 2. Real Baileys WhatsApp QR Status Endpoint
app.get('/api/qr/real', async (req, res) => {
  if (realBaileysEngine.status === 'DISCONNECTED') {
    realBaileysEngine.startSession();
  }
  res.json(realBaileysEngine.getStatus());
});

app.post('/api/qr/logout', async (req, res) => {
  await realBaileysEngine.logout();
  res.json({ success: true });
});

// 2. Meta Cloud API Webhook Verification Endpoint
app.get('/webhook/whatsapp', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === 'markncode_whatsapp_secret_token_2026') {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// 3. Meta Cloud API Webhook Event Receiver
app.post('/webhook/whatsapp', (req, res) => {
  const body = req.body;
  if (body.object === 'whatsapp_business_account') {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Markncode REAL Baileys & Webhook Server listening on port ${PORT}`);
  // Start Baileys session on server launch
  realBaileysEngine.startSession();
});
