import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, User, Sparkles, Phone, CheckCircle2, Play, Pause, Calendar, Image as ImageIcon, ShieldAlert, Activity, ArrowRight, FileText, Zap, Award } from 'lucide-react';
import { EGYPTIAN_VOICE_NOTES, CASE_STUDIES, SERVICES, BUSINESS_SIZES } from '../data/egyptianBotKnowledge';

export default function MarkncodeBotChat({ onAddLead, onTriggerHandoff, openTab }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      type: 'text',
      text: 'يا هلا بيك يا فنان في مؤسسة ماركن كود! 👋 أنا مساعدك الذكي المطور بأعلى تقنيات الذكاء الاصطناعي.\n\nمن خلالي تقدر:\n1️⃣ تفحص موقعك وربط الـ Meta Pixel والـ CAPI مجاناً.\n2️⃣ تحسب العائد الإعلاني المتوقع (ROI) لميزانيتك.\n3️⃣ تعمل تحليل استخباراتي (OSINT) لموقع منافسك.\n4️⃣ تصمم تجربة 3D تفاعلية وتطلب كوتيشن PDF رسمي باسم شركتك!\n\nقولي تحب نبدأ بإيه النهاردة يا باشا؟',
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [activeVoiceId, setActiveVoiceId] = useState(null);

  // Qualification Form State
  const [qualStep, setQualStep] = useState(0); // 0: none, 1: service, 2: business size, 3: contact info
  const [qualData, setQualData] = useState({ service: '', businessSize: '', name: '', phone: '', company: '' });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend = input) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      type: 'text',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (textToSend === input) setInput('');
    setIsTyping(true);

    // Process User Query with Egyptian Dialect AI Engine
    setTimeout(() => {
      processBotResponse(textToSend);
      setIsTyping(false);
    }, 1200);
  };

  const processBotResponse = (userInput) => {
    const text = userInput.toLowerCase();

    // Human handoff keywords or high-ticket triggers
    if (text.includes('بشري') || text.includes('اتكلم مع حد') || text.includes('مدير المبيعات') || text.includes('مشكلة معقدة') || text.includes('100k') || text.includes('صفقة كبيرة')) {
      triggerHandoffResponse(userInput);
      return;
    }

    // Audit / Pixel keywords
    if (text.includes('فحص') || text.includes('حلل') || text.includes('بيكسل') || text.includes('pixel') || text.includes('موقعي') || text.includes('capi')) {
      botReplyAuditSnippet(userInput);
      return;
    }

    // Competitor OSINT keywords
    if (text.includes('منافس') || text.includes('osint') || text.includes('تغلب')) {
      botReplyOsintSnippet(userInput);
      return;
    }

    // ROI Simulator keywords
    if (text.includes('roi') || text.includes('عائد') || text.includes('ميزانية') || text.includes('أرباح')) {
      botReplyRoiSnippet();
      return;
    }

    // 3D Landing Page keywords
    if (text.includes('3d') || text.includes('ثلاثي الأبعاد') || text.includes('لاندنج')) {
      botReply3DSnippet();
      return;
    }

    // Clinic keywords (Dental, Internal Medicine, Beauty/Cosmetics)
    if (text.includes('عياد') || text.includes('أسنان') || text.includes('اسنان') || text.includes('باطنة') || text.includes('بطنه') || text.includes('تجميل') || text.includes('جلدية')) {
      botReplyClinicPortfolio();
      return;
    }

    // Portfolio & Case studies
    if (text.includes('سابقة') || text.includes('شغلكم') || text.includes('أعمال') || text.includes('نتائج') || text.includes('بورتفوليو')) {
      botReplyPortfolio();
      return;
    }

    // Egyptian Qualification quiz trigger
    if (text.includes('باكدج') || text.includes('أسعار') || text.includes('بكام') || text.includes('عرض') || text.includes('اشتراك')) {
      startQualificationQuiz();
      return;
    }

    // Default friendly Egyptian AI response
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'bot',
        type: 'text',
        text: 'أمرك يا فنان! أنا فاهم طلبك بخصوص البزنس والتسويق الرقمي.\n\nتقدر تختار إحدى الأدوات الذكية من القائمة فوق، أو تحجز مكالمة استشارة مباشرة مع فريق ماركن كود.',
        actionButtons: [
          { label: 'تأهيل وطلب عرض سعر', action: () => startQualificationQuiz() },
          { label: 'فحص الـ Meta Pixel لموقعك', action: () => openTab('audit') },
          { label: 'محاكاة أرباح الـ ROI', action: () => openTab('roi') }
        ],
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const startQualificationQuiz = () => {
    setQualStep(1);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'bot',
        type: 'qual_service',
        text: 'ممتاز يا باشا! عشان نقدملك أفضل باقة وعرض سعر مخصص لشركتك، قولي إيه الخدمة الرئيسية اللي بتدور عليها؟',
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSelectQualService = (serviceObj) => {
    setQualData((prev) => ({ ...prev, service: serviceObj.title }));
    setQualStep(2);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() - 1,
        sender: 'user',
        type: 'text',
        text: `اخترت: ${serviceObj.title}`,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      },
      {
        id: Date.now(),
        sender: 'bot',
        type: 'qual_business_size',
        text: 'تمام جداً! وعشان نحدد نطاق الحملة والميزانية التقريبية المناسبة، ما هو حجم البزنس حالياً؟',
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSelectQualSize = (sizeObj) => {
    setQualData((prev) => ({ ...prev, businessSize: sizeObj.label, budget: sizeObj.budgetRange }));
    setQualStep(3);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() - 1,
        sender: 'user',
        type: 'text',
        text: `حجم البزنس: ${sizeObj.label}`,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      },
      {
        id: Date.now(),
        sender: 'bot',
        type: 'qual_contact_form',
        text: 'رائع جداً! يرجى إدخال اسمك ورقم الهاتف للربط التلقائي وإرسال ملف الكوتيشن عبر الواتساب فوراً.',
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleFinalQualSubmit = (name, phone, company) => {
    const finalLead = {
      name,
      phone,
      company,
      service: qualData.service,
      budget: qualData.budget,
      businessSize: qualData.businessSize,
      time: new Date().toLocaleTimeString('ar-EG')
    };

    onAddLead(finalLead);
    setQualStep(0);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'bot',
        type: 'qual_success',
        lead: finalLead,
        text: `تم تسجيل بياناتك بنجاح يامباشا! 🚀 تم ربط بياناتك آلياً مع Google Sheets و Notion CRM.`,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const botReplyAuditSnippet = (query) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'bot',
        type: 'audit_snippet',
        text: `بناءً على طلبك لفحص الموقع والـ Meta Pixel:\nقمنا بتشغيل الفحص التلقائي ووجدنا فرصة ممتازة لتخفيض تكلفة الإعلان من خلال ربط Meta Conversions API (CAPI).`,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const botReplyOsintSnippet = (query) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'bot',
        type: 'osint_snippet',
        text: `تقرير OSINT السريع لمنافسك:\nمنافسك الحالي يعتمد على استضافة تقليدية وبدون Meta CAPI مما يجعله يخسر 35% من زوار الآيفون. يمكنك التغلب عليه فوراً باستخدام تقنيات ماركن كود.`,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const botReplyRoiSnippet = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'bot',
        type: 'roi_snippet',
        text: `الحسبة السريعة للعائد الإعلاني (ROI):\nبميزانية متوسطة 30,000 EGP، متوقع الوصول لـ ~65,000 شخص مهتم، وتحقيق من 40 إلى 60 عميل مؤهل بأرباح متوقعة +320% ROI.`,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const botReply3DSnippet = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'bot',
        type: '3d_snippet',
        text: `التجربة الـ 3D التفاعلية من ماركن كود:\nنوفر واجهات تفاعلية 3D WebGL تفتح على الموبايل بسرعة فائقة مع تجربة لمس فريدة تشوق العميل وتقفل الصفقات بسرعة.`,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const botReplyClinicPortfolio = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'bot',
        type: 'clinic_portfolio_showcase',
        text: `🏥 **بورتفوليو وسابقة أعمال العيادات والمراكز الطبية (Markncode Medical Clinics Portfolio):**\n\nتفضل نتائج وتصاميم إعلانات تخصصات الأسنان، الباطنة، والتجميل:`,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const botReplyPortfolio = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'bot',
        type: 'portfolio_showcase',
        text: `إليك نماذج ودراسات حالة حقيقية من نتائج عملاء ماركن كود:`,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const triggerHandoffResponse = (queryText) => {
    onTriggerHandoff({
      reason: 'High-Ticket Inquiry / Human Handoff Request',
      lastMessage: queryText,
      time: new Date().toLocaleTimeString('ar-EG')
    });

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'bot',
        type: 'handoff_alert',
        text: 'تم إيقاف الرد التلقائي وإرسال إشعار فوري لمدير المبيعات في ماركن كود 🚨 سيتواصل معك أحد متخصصينا بشرياً في خلال دقائق معدودة.',
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const toggleVoiceNote = (id) => {
    if (activeVoiceId === id && isPlayingVoice) {
      setIsPlayingVoice(false);
      setActiveVoiceId(null);
    } else {
      setActiveVoiceId(id);
      setIsPlayingVoice(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-2 md:p-4 flex flex-col h-[calc(100vh-80px)]">
      {/* Chat Messages Container */}
      <div className="flex-1 glass-panel p-4 md:p-6 overflow-y-auto space-y-4 rounded-b-none border-b-0">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-start' : 'items-end'}`}>
            <div className="flex items-start gap-2.5 max-w-[90%] md:max-w-[80%]">
              {/* Bot Avatar */}
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00F2FE] to-[#7F00FF] p-[1px] shrink-0 mt-1">
                  <div className="w-full h-full bg-slate-950 rounded-[11px] flex-center">
                    <Bot className="w-4 h-4 text-[#00F2FE]" />
                  </div>
                </div>
              )}

              {/* User Avatar */}
              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 flex-center shrink-0 mt-1 text-slate-300">
                  <User className="w-4 h-4" />
                </div>
              )}

              {/* Message Content Box */}
              <div
                className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed space-y-3 ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none shadow-md shadow-cyan-500/10'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-xl'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>

                {/* Qualification Step 1: Services */}
                {msg.type === 'qual_service' && (
                  <div className="space-y-2 pt-2">
                    {SERVICES.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => handleSelectQualService(s)}
                        className="w-full text-right p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-[#00F2FE] hover:bg-cyan-950/30 transition-all flex items-center justify-between cursor-pointer"
                      >
                        <div>
                          <span className="font-bold text-white text-xs block">{s.title}</span>
                          <span className="text-[10px] text-slate-400">{s.description}</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/30 whitespace-nowrap">
                          {s.badge}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Qualification Step 2: Business Size */}
                {msg.type === 'qual_business_size' && (
                  <div className="space-y-2 pt-2">
                    {BUSINESS_SIZES.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => handleSelectQualSize(b)}
                        className="w-full text-right p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500 hover:bg-purple-950/30 transition-all flex items-center justify-between cursor-pointer"
                      >
                        <span className="font-bold text-white text-xs">{b.label}</span>
                        <span className="text-[10px] text-purple-300 font-latin">{b.budgetRange}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Qualification Step 3: Contact Form */}
                {msg.type === 'qual_contact_form' && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.target;
                      handleFinalQualSubmit(form.clientName.value, form.clientPhone.value, form.clientCompany.value);
                    }}
                    className="space-y-3 pt-2 bg-slate-950 p-4 rounded-xl border border-slate-800"
                  >
                    <div>
                      <label className="text-[11px] font-bold text-slate-300 block mb-1">الاسم الكامل:</label>
                      <input
                        name="clientName"
                        required
                        placeholder="أدخل اسمك هنا..."
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-300 block mb-1">رقم الهاتف / الواتساب:</label>
                      <input
                        name="clientPhone"
                        required
                        placeholder="010xxxxxxx"
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-latin"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-300 block mb-1">اسم البزنس أو الشركة:</label>
                      <input
                        name="clientCompany"
                        placeholder="اسم شركتك..."
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <button
                      type="submit"
                      className="gradient-btn w-full py-2.5 rounded-xl text-xs font-bold flex-center gap-2 cursor-pointer mt-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>إرسال البيانات ومزامنة CRM فوراً</span>
                    </button>
                  </form>
                )}

                {/* Qualification Success Card */}
                {msg.type === 'qual_success' && msg.lead && (
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-3 text-xs">
                    <div className="flex items-center justify-between text-emerald-400 font-bold">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>تم حفظ العميل في CRM & Notion</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-latin">{msg.lead.time}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-slate-300 text-[11px] bg-slate-950 p-3 rounded-lg border border-slate-800">
                      <div>الاسم: <strong className="text-white">{msg.lead.name}</strong></div>
                      <div>الشركة: <strong className="text-white">{msg.lead.company}</strong></div>
                      <div>الخدمة: <strong className="text-cyan-400">{msg.lead.service}</strong></div>
                      <div>الميزانية: <strong className="text-emerald-400 font-latin">{msg.lead.budget}</strong></div>
                    </div>

                    {/* Booking Link CTA */}
                    <div className="p-3 rounded-lg bg-slate-900 border border-cyan-500/30 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#00F2FE]" />
                        <span className="text-[11px] text-white">حجز مكالمة استشارة مباشرة عبر Calendly</span>
                      </div>
                      <a
                        href="https://calendly.com"
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#00F2FE] text-[#070913] font-bold text-[10px] whitespace-nowrap"
                      >
                        اختر الميعاد المناسب 📅
                      </a>
                    </div>
                  </div>
                )}

                {/* Clinics Special Portfolio Showcase */}
                {msg.type === 'clinic_portfolio_showcase' && (
                  <div className="space-y-4 pt-2">
                    <div className="p-3 rounded-xl bg-slate-950 border border-[#00F2FE]/30 space-y-2">
                      <img src="/assets/dental_clinic_ad_mockup.jpg" alt="Dental Clinic Ad Design" className="w-full h-36 object-cover rounded-lg" />
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">🦷 BrightSmile Dental Center (عيادات الأسنان)</span>
                        <span className="text-[10px] text-emerald-400 font-bold">+180% حجوزات</span>
                      </div>
                      <p className="text-[11px] text-slate-300">استهداف دقيق لحالات تبييض وزراعة الأسنان وبناء Landing Page حجز مواعيد آلي.</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
                      <img src="/assets/internal_medicine_ad_mockup.jpg" alt="Internal Medicine Clinic Ad Design" className="w-full h-36 object-cover rounded-lg" />
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">🩺 El-Safa Center (عيادات الباطنة والجهاز الهضمي)</span>
                        <span className="text-[10px] text-emerald-400 font-bold">-40% تكلفة المريض</span>
                      </div>
                      <p className="text-[11px] text-slate-300">حملات التوعية بالفحص الشامل وأتمتة الرد والمتابعة الفورية للعيادة.</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-purple-500/30 space-y-2">
                      <img src="/assets/beauty_clinic_ad_mockup.jpg" alt="Beauty Clinic Ad Design" className="w-full h-36 object-cover rounded-lg" />
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">💇‍♀️ Derma Glow Clinic (مراكز التجميل والجلدية)</span>
                        <span className="text-[10px] text-emerald-400 font-bold">420 حجز مؤكد</span>
                      </div>
                      <p className="text-[11px] text-slate-300">استهداف دقيق لعلاجات الليزر والنضارة مع بوستر إعلاني فاخر مخصص.</p>
                    </div>
                  </div>
                )}

                {/* Portfolio Showcase Card */}
                {msg.type === 'portfolio_showcase' && (
                  <div className="space-y-3 pt-2">
                    {CASE_STUDIES.map((cs) => (
                      <div key={cs.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-xs">{cs.client}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                            {cs.result}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-normal">{cs.details}</p>
                        <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-900">
                          <span>الميزانية: {cs.metrics.spent}</span>
                          <span className="text-emerald-400 font-bold">الأرباح: {cs.metrics.revenue}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* AI Voice Note Player Widget */}
                {msg.sender === 'bot' && (
                  <div className="pt-2 border-t border-slate-800">
                    <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/20 flex items-center justify-between gap-3">
                      <button
                        onClick={() => toggleVoiceNote(msg.id)}
                        className="w-8 h-8 rounded-full bg-[#00F2FE] text-[#070913] flex-center shrink-0 font-bold cursor-pointer"
                      >
                        {activeVoiceId === msg.id && isPlayingVoice ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                      </button>

                      <div className="flex-1 flex items-center gap-1">
                        {[12, 24, 8, 28, 16, 32, 10, 22, 14, 26, 18, 30, 12, 20, 15, 25].map((h, i) => (
                          <div
                            key={i}
                            className={`w-1 rounded-full transition-all ${
                              activeVoiceId === msg.id && isPlayingVoice ? 'bg-[#00F2FE] waveform-bar' : 'bg-slate-700'
                            }`}
                            style={{ height: `${activeVoiceId === msg.id && isPlayingVoice ? h : 8}px` }}
                          ></div>
                        ))}
                      </div>

                      <span className="text-[10px] text-slate-400 font-latin">AI Voice 0:22</span>
                    </div>
                  </div>
                )}

                {/* Watermarked AI Banner Visual Mockup */}
                {msg.type === 'qual_success' && (
                  <div className="mt-3 relative rounded-xl overflow-hidden border border-cyan-500/40">
                    <img
                      src="/assets/fitness_ad_mockup_1787496079349.jpg"
                      alt="AI Visual Mockup with Markncode Watermark"
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute bottom-2 left-2 backdrop-blur-md bg-slate-950/80 px-2.5 py-1 rounded-md text-[9px] text-cyan-400 font-bold border border-cyan-500/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-yellow-400" />
                      <span>عينات تصاميم بالذكاء الاصطناعي - Markncode</span>
                    </div>
                  </div>
                )}

                {/* Interactive Action Buttons */}
                {msg.actionButtons && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {msg.actionButtons.map((btn, idx) => (
                      <button
                        key={idx}
                        onClick={btn.action}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-cyan-300 border border-slate-700 hover:border-cyan-500 text-xs font-bold transition-all cursor-pointer"
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[9px] text-slate-500 block text-left font-latin">{msg.timestamp}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs py-2">
            <Bot className="w-4 h-4 text-[#00F2FE] animate-bounce" />
            <span>مساعد Markncode الذكي يكتب الرد...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Triggers Carousel */}
      <div className="glass-panel p-2 flex items-center gap-2 overflow-x-auto no-scrollbar border-t-0 rounded-none bg-slate-950/90">
        <button
          onClick={() => handleSend('معاينة بورتفوليو تصاميم العيادات')}
          className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs whitespace-nowrap font-bold hover:bg-emerald-500/20"
        >
          🏥 بورتفوليو العيادات
        </button>
        <button
          onClick={() => handleSend('بكام باكدجات التسويق وإعلانات Meta؟')}
          className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs whitespace-nowrap font-bold hover:bg-cyan-500/20"
        >
          💰 بكام الباكدج؟
        </button>
        <button
          onClick={() => openTab('audit')}
          className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs whitespace-nowrap font-bold hover:bg-purple-500/20"
        >
          🔍 فحص موقعي و الـ Pixel
        </button>
        <button
          onClick={() => openTab('osint')}
          className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs whitespace-nowrap font-bold hover:bg-rose-500/20"
        >
          🕵️‍♂️ تحليل المنافس OSINT
        </button>
        <button
          onClick={() => handleSend('أنا محتاج اتكلم مع مدير المبيعات البشري')}
          className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs whitespace-nowrap font-bold hover:bg-amber-500/20"
        >
          🚨 تحويل لبشري
        </button>
      </div>

      {/* Input Form Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="glass-panel p-3 rounded-t-none border-t border-slate-800 flex items-center gap-2 bg-[#070913]"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="اكتب سؤالك هنا باللهجة المصرية (مثال: بكام باكدج الإعلانات الممولة؟)"
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs md:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#00F2FE]"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="gradient-btn p-3 rounded-xl text-slate-950 disabled:opacity-50 cursor-pointer shrink-0"
        >
          <Send className="w-4 h-4 rotate-180" />
        </button>
      </form>
    </div>
  );
}
