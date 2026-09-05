import QRCode from 'qrcode';
import { handleIncomingWhatsAppMessage } from './whatsappEngine.js';

class WhatsAppQrService {
  constructor() {
    this.status = 'DISCONNECTED'; // 'DISCONNECTED', 'GENERATING_QR', 'QR_READY', 'CONNECTED'
    this.qrCodeDataUrl = null;
    this.connectedPhone = null;
    this.connectedTime = null;
  }

  /**
   * Generate a fresh WhatsApp Web QR Code
   */
  async generateQrCode() {
    this.status = 'GENERATING_QR';
    
    // Create a realistic Baileys authentication payload
    const mockBaileysPairingString = `2@markncode_baileys_auth_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    try {
      this.qrCodeDataUrl = await QRCode.toDataURL(mockBaileysPairingString, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        margin: 2,
        color: {
          dark: '#00a884',
          light: '#0b141a'
        }
      });

      this.status = 'QR_READY';
      return {
        status: this.status,
        qrCode: this.qrCodeDataUrl,
        expiresInSeconds: 45
      };
    } catch (err) {
      console.error('Error generating QR code:', err);
      this.status = 'ERROR';
      return { status: 'ERROR', error: err.message };
    }
  }

  /**
   * Simulate user scanning the QR Code on their phone
   */
  simulatePhoneScan(phone = '201000000000') {
    if (this.status !== 'QR_READY') {
      return { success: false, message: 'QR Code is not active' };
    }

    this.status = 'CONNECTED';
    this.connectedPhone = phone;
    this.connectedTime = new Date().toLocaleTimeString('ar-EG');
    this.qrCodeDataUrl = null;

    console.log(`✅ Phone [${phone}] paired with WhatsApp Bot via QR Code!`);

    return {
      success: true,
      status: this.status,
      connectedPhone: this.connectedPhone,
      connectedTime: this.connectedTime
    };
  }

  /**
   * Disconnect current session
   */
  disconnect() {
    this.status = 'DISCONNECTED';
    this.connectedPhone = null;
    this.connectedTime = null;
    this.qrCodeDataUrl = null;
    return { success: true, status: this.status };
  }

  /**
   * Process message received via connected WhatsApp session
   */
  processMessage(messageText, fromPhone = this.connectedPhone) {
    if (this.status !== 'CONNECTED') {
      return { success: false, error: 'WhatsApp is not connected via QR Code' };
    }

    const reply = handleIncomingWhatsAppMessage(fromPhone, messageText);
    return {
      success: true,
      reply
    };
  }
}

export const qrService = new WhatsAppQrService();
