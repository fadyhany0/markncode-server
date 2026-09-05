import React, { useState } from 'react';
import Navbar from './components/Navbar';
import WhatsAppQrStudio from './components/WhatsAppQrStudio';
import WhatsAppSimulator from './components/WhatsAppSimulator';
import WhatsAppConfigStudio from './components/WhatsAppConfigStudio';
import MarkncodeBotChat from './components/MarkncodeBotChat';
import AuditStudio from './components/AuditStudio';
import OsintCompetitorStudio from './components/OsintCompetitorStudio';
import ThreeDExperienceViewer from './components/ThreeDExperienceViewer';
import RoiSimulator from './components/RoiSimulator';
import PdfQuoteGenerator from './components/PdfQuoteGenerator';
import CrmAndHandoffDashboard from './components/CrmAndHandoffDashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState('qr'); // 'qr', 'whatsapp', 'chat', 'audit', 'osint', '3d', 'roi', 'quote', 'crm', 'whatsapp_config'
  const [pairedPhone, setPairedPhone] = useState(null);

  // Global State for Leads captured via AI qualification
  const [leads, setLeads] = useState([
    { name: 'المهندس أحمد محمود', company: 'شركة الفرسان للتطوير', phone: '01012345678', service: 'إعلانات Meta Ads + ربط CAPI', budget: '50k - 100k EGP', businessSize: 'Growing Business', time: '10:30 AM' },
    { name: 'د. سارة عبد الفتاح', company: 'مركز Derma Clinic', phone: '01198765432', service: '3D Landing Page تفاعلية', budget: '30k - 50k EGP', businessSize: 'Startup', time: '11:15 AM' }
  ]);

  // Global State for Human Handoff alerts
  const [handoffQueue, setHandoffQueue] = useState([
    { name: 'كابتن رامي (Nitro Gym)', phone: '01234567890', reason: 'High-Ticket Enterprise Deal', lastMessage: 'عايز باكدج شامل إعلانات وبوت وموقع 3D لمجموعة صالات رياضية' }
  ]);

  const handleAddLead = (newLead) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleTriggerHandoff = (handoffItem) => {
    setHandoffQueue((prev) => [handoffItem, ...prev]);
  };

  const handleSendToChat = (promptText) => {
    setActiveTab('whatsapp');
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 font-arabic flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        humanHandoffCount={handoffQueue.length}
        isQrConnected={Boolean(pairedPhone)}
      />

      {/* Main Container Viewport */}
      <main className="flex-1 pb-10">
        {activeTab === 'qr' && (
          <WhatsAppQrStudio
            onConnectedSuccess={(phone) => setPairedPhone(phone)}
            openTab={setActiveTab}
          />
        )}

        {activeTab === 'whatsapp' && (
          <WhatsAppSimulator
            onAddLead={handleAddLead}
            onTriggerHandoff={handleTriggerHandoff}
            openTab={setActiveTab}
          />
        )}

        {activeTab === 'whatsapp_config' && (
          <WhatsAppConfigStudio />
        )}

        {activeTab === 'chat' && (
          <MarkncodeBotChat
            onAddLead={handleAddLead}
            onTriggerHandoff={handleTriggerHandoff}
            openTab={setActiveTab}
          />
        )}

        {activeTab === 'audit' && (
          <AuditStudio onSendToChat={handleSendToChat} />
        )}

        {activeTab === 'osint' && (
          <OsintCompetitorStudio onSendToChat={handleSendToChat} />
        )}

        {activeTab === '3d' && (
          <ThreeDExperienceViewer onSendToChat={handleSendToChat} />
        )}

        {activeTab === 'roi' && (
          <RoiSimulator onSendToChat={handleSendToChat} />
        )}

        {activeTab === 'quote' && (
          <PdfQuoteGenerator onSendToChat={handleSendToChat} />
        )}

        {activeTab === 'crm' && (
          <CrmAndHandoffDashboard
            leads={leads}
            handoffQueue={handoffQueue}
            onTriggerFollowup={() => setActiveTab('whatsapp')}
          />
        )}
      </main>

      {/* Persistent Bottom Watermark Footer */}
      <footer className="py-3 px-4 border-t border-slate-900 bg-[#05070f] text-center text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>Markncode WhatsApp Business QR Authenticator v3.8</span>
        </div>
        <div className="text-[11px] text-slate-400 font-latin">
          Powered by Markncode Agency | Baileys Web QR Scanner & AI Automation
        </div>
      </footer>
    </div>
  );
}
