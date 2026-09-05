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

// 1. Real Baileys WhatsApp QR Status Endpoint
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
