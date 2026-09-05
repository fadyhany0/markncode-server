// REAL Baileys WhatsApp Multi-Device WebSocket Engine (With Media Image Support)
import makeWASocket, { useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } from '@whiskeysockets/baileys';
import QRCode from 'qrcode';
import pino from 'pino';
import fs from 'fs';
import path from 'path';
import { handleIncomingWhatsAppMessage } from './whatsappEngine.js';

// Global Unhandled Rejection & Uncaught Exception Protectors
process.on('unhandledRejection', (reason, promise) => {
  console.log('⚠️ Process caught unhandledRejection:', reason?.message || reason);
});

process.on('uncaughtException', (err) => {
  console.log('⚠️ Process caught uncaughtException:', err?.message || err);
});

class RealBaileysEngine {
  constructor() {
    this.sock = null;
    this.status = 'DISCONNECTED';
    this.qrCodeDataUrl = null;
    this.rawQrString = null;
    this.connectedPhone = null;
    this.isStarting = false;
    this.authDir = path.resolve('baileys_auth_info');
    this.listeners = [];
  }

  async startSession() {
    if (this.isStarting || this.status === 'CONNECTED') {
      return;
    }

    this.isStarting = true;
    this.status = 'CONNECTING';

    try {
      if (!fs.existsSync(this.authDir)) {
        fs.mkdirSync(this.authDir, { recursive: true });
      }

      const { state, saveCreds } = await useMultiFileAuthState(this.authDir);
      const { version } = await fetchLatestBaileysVersion();

      console.log(`⚡ Initializing Baileys WhatsApp Socket (v${version.join('.')})...`);

      this.sock = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        auth: state,
        browser: ['Markncode Bot', 'Chrome', '1.0.0'],
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 60000,
        keepAliveIntervalMs: 25000,
        syncFullHistory: false
      });

      this.sock.ev.on('creds.update', saveCreds);

      this.sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
          console.log('📲 Real WhatsApp QR Code Generated!');
          this.rawQrString = qr;
          this.qrCodeDataUrl = await QRCode.toDataURL(qr, {
            errorCorrectionLevel: 'H',
            margin: 2,
            color: { dark: '#00a884', light: '#0b141a' }
          });
          this.status = 'QR_READY';
          this.isStarting = false;
          this.notifyListeners();
        }

        if (connection === 'open') {
          console.log('🎉 REAL WHATSAPP CONNECTED SUCCESSFULLY!');
          this.status = 'CONNECTED';
          this.isStarting = false;
          const userJid = this.sock.user ? this.sock.user.id : 'WhatsApp User';
          this.connectedPhone = userJid.split(':')[0] || userJid.split('@')[0];
          this.qrCodeDataUrl = null;
          this.notifyListeners();
        }

        if (connection === 'close') {
          const statusCode = lastDisconnect?.error?.output?.statusCode;
          const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
          console.log(`⚠️ Connection closed (status: ${statusCode}). Reconnecting: ${shouldReconnect}`);
          this.status = 'DISCONNECTED';
          this.isStarting = false;
          this.notifyListeners();

          if (shouldReconnect) {
            setTimeout(() => this.startSession(), 5000);
          }
        }
      });

      // Handle Incoming WhatsApp Messages Live
      this.sock.ev.on('messages.upsert', async (m) => {
        if (m.type === 'notify') {
          for (const msg of m.messages) {
            if (!msg.key.fromMe) {
              const from = msg.key.remoteJid;
              
              const text =
                msg.message?.conversation ||
                msg.message?.extendedTextMessage?.text ||
                msg.message?.imageMessage?.caption ||
                msg.message?.videoMessage?.caption ||
                msg.message?.buttonsResponseMessage?.selectedButtonId ||
                msg.message?.buttonsResponseMessage?.selectedDisplayText ||
                msg.message?.listResponseMessage?.singleSelectReply?.selectedRowId ||
                '';

              if (!text) continue;

              console.log(`📩 Incoming WhatsApp Message from [${from}]: "${text}"`);

              // Process with Egyptian Dialect AI Bot Engine
              const botReply = await handleIncomingWhatsAppMessage(from, text);
              console.log(`🤖 Replying to WhatsApp user: "${botReply.type}"`);

              let responseText = botReply.replyText || '';
              if (botReply.buttons && botReply.buttons.length > 0) {
                responseText += '\n\n' + botReply.buttons.map((b, i) => `${i + 1}️⃣ ${b.title}`).join('\n');
              }

              // Ultra Safe Message Sender
              if (this.sock && this.status === 'CONNECTED') {
                try {
                  // Multi-image sending (e.g. Full Portfolio Showcase)
                  if (botReply.mediaImages && Array.isArray(botReply.mediaImages) && botReply.mediaImages.length > 0) {
                    // Send header text first
                    if (responseText) {
                      await this.sock.sendMessage(from, { text: responseText }).catch((err) => {
                        console.log(`⚠️ sendMessage header error:`, err?.message);
                      });
                    }

                    // Send each design photo attachment with its specific caption directly from local file path
                    for (const item of botReply.mediaImages) {
                      const imagePath = item.path || item;
                      const captionText = item.caption || '';
                      
                      await this.sock.sendMessage(from, {
                        image: { url: imagePath },
                        caption: captionText
                      }).catch((err) => {
                        console.log(`⚠️ sendMessage multi-image item error:`, err?.message);
                      });

                      // Small 800ms delay between sending photos
                      await new Promise((resolve) => setTimeout(resolve, 800));
                    }
                    console.log(`✅ Sent FULL multi-design portfolio images to [${from}]!`);
                  } else if (botReply.mediaImage) {
                    // Single Image Attachment with Caption on WhatsApp!
                    await this.sock.sendMessage(from, {
                      image: { url: botReply.mediaImage },
                      caption: responseText
                    }).catch((err) => {
                      console.log(`⚠️ sendMessage media error fallback to text:`, err?.message);
                      return this.sock.sendMessage(from, { text: responseText });
                    });
                    console.log(`✅ Sent WhatsApp response with photo attachment to [${from}]!`);
                  } else {
                    // Text Message
                    if (responseText) {
                      await this.sock.sendMessage(from, { text: responseText }).catch((err) => {
                        console.log(`⚠️ sendMessage internal error:`, err?.message);
                      });
                    }
                    console.log(`✅ Sent WhatsApp text response to [${from}]!`);
                  }
                } catch (sendErr) {
                  console.error(`⚠️ Failed to send message to [${from}]:`, sendErr.message);
                }
              }
            }
          }
        }
      });
    } catch (err) {
      console.error('Baileys Socket Initialization Error:', err);
      this.status = 'DISCONNECTED';
      this.isStarting = false;
      this.notifyListeners();
    }
  }

  getStatus() {
    return {
      status: this.status,
      qrCodeDataUrl: this.qrCodeDataUrl,
      connectedPhone: this.connectedPhone
    };
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notifyListeners() {
    const payload = this.getStatus();
    this.listeners.forEach((l) => l(payload));
  }

  async logout() {
    if (this.sock) {
      try {
        await this.sock.logout();
      } catch (e) {}
    }
    if (fs.existsSync(this.authDir)) {
      fs.rmSync(this.authDir, { recursive: true, force: true });
    }
    this.status = 'DISCONNECTED';
    this.isStarting = false;
    this.qrCodeDataUrl = null;
    this.connectedPhone = null;
    this.startSession();
  }
}

export const realBaileysEngine = new RealBaileysEngine();
