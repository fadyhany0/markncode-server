import React, { useState } from 'react';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';
import { FileText, Download, Check, Sparkles, Send, Building2, User, Phone, Mail } from 'lucide-react';

export default function PdfQuoteGenerator({ initialClientData = {}, onSendToChat }) {
  const [clientName, setClientName] = useState(initialClientData.name || 'المهندس أحمد محمود');
  const [companyName, setCompanyName] = useState(initialClientData.company || 'شركة النجم الفضي');
  const [phone, setPhone] = useState(initialClientData.phone || '01000000000');
  const [email, setEmail] = useState('client@example.com');
  const [selectedServices, setSelectedServices] = useState([
    'meta_capi',
    'landing_3d'
  ]);
  const [downloading, setDownloading] = useState(false);

  const availableServices = [
    { id: 'meta_capi', name: 'حملات Meta Ads + ربط خادم CAPI التتبعي', price: 25000 },
    { id: 'landing_3d', name: 'تطوير وتصميم 3D Interactive Landing Page', price: 35000 },
    { id: 'social_mgmt', name: 'إدارة السوشيال ميديا وصناعة المحتوى (Reels + Designs)', price: 20000 },
    { id: 'ai_bot_suite', name: 'بناء بوت أتمتة الذكاء الاصطناعي الفائق (Markncode AI Bot)', price: 30000 }
  ];

  const toggleService = (id) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter((s) => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const subtotal = selectedServices.reduce((acc, currId) => {
    const service = availableServices.find((s) => s.id === currId);
    return acc + (service ? service.price : 0);
  }, 0);

  const discount = Math.round(subtotal * 0.1); // 10% special discount
  const total = subtotal - discount;

  const handleGeneratePdf = () => {
    setDownloading(true);

    try {
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
      });

      // Header Colors
      doc.setFillColor(7, 9, 19);
      doc.rect(0, 0, 210, 297, 'F');

      // Title Banner
      doc.setFillColor(0, 242, 254);
      doc.rect(0, 0, 210, 10, 'F');

      // Brand Title
      doc.setTextColor(0, 242, 254);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('MARKNCODE DIGITAL AGENCY', 15, 28);

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.text('OFFICIAL SERVICE QUOTATION & PROPOSAL', 15, 36);

      // Metadata Box
      doc.setFillColor(15, 23, 42);
      doc.roundedRect(15, 45, 180, 35, 3, 3, 'F');

      doc.setFontSize(10);
      doc.setTextColor(148, 163, 184);
      doc.text(`Client Name: ${clientName}`, 22, 54);
      doc.text(`Company: ${companyName}`, 22, 62);
      doc.text(`Phone: ${phone}`, 22, 70);

      doc.text(`Quote Date: ${new Date().toLocaleDateString()}`, 120, 54);
      doc.text(`Validity: 14 Days`, 120, 62);
      doc.text(`Status: Approved Proposal`, 120, 70);

      // Services Table Header
      let yPos = 95;
      doc.setFillColor(30, 41, 59);
      doc.rect(15, yPos, 180, 10, 'F');
      doc.setTextColor(0, 242, 254);
      doc.setFontSize(10);
      doc.text('Selected Services & Solutions', 20, yPos + 7);
      doc.text('Investment (EGP)', 150, yPos + 7);

      yPos += 16;

      selectedServices.forEach((servId) => {
        const item = availableServices.find((s) => s.id === servId);
        if (item) {
          doc.setTextColor(255, 255, 255);
          doc.text(`- ${item.name}`, 20, yPos);
          doc.text(`${item.price.toLocaleString()} EGP`, 150, yPos);
          yPos += 10;
        }
      });

      // Line
      doc.setDrawColor(51, 65, 85);
      doc.line(15, yPos, 195, yPos);
      yPos += 10;

      // Summary
      doc.setTextColor(148, 163, 184);
      doc.text(`Subtotal:`, 120, yPos);
      doc.text(`${subtotal.toLocaleString()} EGP`, 160, yPos);
      yPos += 8;

      doc.text(`Markncode Special Discount (10%):`, 120, yPos);
      doc.text(`-${discount.toLocaleString()} EGP`, 160, yPos);
      yPos += 10;

      doc.setFillColor(0, 242, 254);
      doc.roundedRect(115, yPos - 5, 80, 14, 2, 2, 'F');
      doc.setTextColor(7, 9, 19);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`TOTAL: ${total.toLocaleString()} EGP`, 120, yPos + 4);

      // Footer
      doc.setTextColor(148, 163, 184);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('Markncode Agency | Web Development, Meta Ads & AI Automation', 15, 280);

      doc.save(`Markncode_Quotation_${companyName.replace(/\s+/g, '_')}.pdf`);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      <div className="glass-panel p-6 border-purple-500/30 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-bold mb-3">
          <FileText className="w-3.5 h-3.5" />
          <span>توليد عروض أسعار تفاعلية رسمية</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">توليد عرض سعر احترافي (PDF Quotation Generator) 📄</h2>
        <p className="text-slate-300 text-sm mt-1">
          قم بتحديد الخدمات والبيانات المطلوبة لتوليد وتنزيل ملف PDF رسمي مخصص باسمك واسم شركتك في أقل من ثانية.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Client Form */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-base font-bold text-white">بيانات العميل والشركة</h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">اسم العميل:</label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full pr-10 pl-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">اسم الشركة / البزنس:</label>
                <div className="relative">
                  <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full pr-10 pl-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">رقم الهاتف / واتساب:</label>
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pr-10 pl-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Selection & Output */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-base font-bold text-white">اختر الخدمات المطلوبة في العرض</h3>

            <div className="space-y-2">
              {availableServices.map((service) => {
                const isSelected = selectedServices.includes(service.id);
                return (
                  <div
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`p-3.5 rounded-xl border text-xs font-bold flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-purple-950/40 border-purple-500 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md flex-center border ${
                        isSelected ? 'bg-purple-500 border-purple-400 text-white' : 'border-slate-600'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span>{service.name}</span>
                    </div>
                    <span className="font-latin text-purple-400">{service.price.toLocaleString('ar-EG')} EGP</span>
                  </div>
                );
              })}
            </div>

            {/* Total Box */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">الإجمالي بعد الخصم (10% خصم خاص):</span>
                <span className="text-2xl font-black text-[#00F2FE] font-latin">{total.toLocaleString('ar-EG')} EGP</span>
              </div>
              <button
                onClick={handleGeneratePdf}
                disabled={downloading || selectedServices.length === 0}
                className="gradient-purple-btn px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>تنزيل ملف الـ PDF فوراً</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
