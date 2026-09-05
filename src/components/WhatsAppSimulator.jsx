import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCheck, Paperclip, Phone, Video, MoreVertical, Play, Pause, FileText, Download, ShieldAlert, Sparkles, Check, Globe, AlertTriangle, ArrowRight, UserCheck, Bot } from 'lucide-react';
import { EGYPTIAN_VOICE_NOTES } from '../data/egyptianBotKnowledge';

export default function WhatsAppSimulator({ onAddLead, onTriggerHandoff, openTab }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      type: 'text',
      text: `يا هلا بيك يا فنان في واتساب ماركن كود! 👋 ⚡

أنا مستشارك الرقمي بالذكاء الاصطناعي من مؤسسة Markncode.

إحنا بنساعدك تكبر البزنس بتاعك من خلال:
1️⃣ حملات إعلانية ممولة Meta & Google بربط CAPI
2️⃣ تطوير مواقع وتجارب 3D Landing Pages فاخرة
3️⃣ إدارة السوشيال ميديا وصناعة المحتوى

إزاي أقدر أساعدك النهاردة يا باشا؟ اختر من الأزرار تحت 👇`,
      buttons: [
        { id: 'btn_qual', title: 'تأهيل وطلب باكدج 💰' },
        { id: 'btn_audit', title: 'فحص موقعي والـ Pixel ⚡' },
        { id: 'btn_quote', title: 'تحميل كوتيشن PDF 📄' }
      ],
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend = input) => {
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

    setTimeout(() => {
      processWhatsAppBotLogic(textToSend);
      setIsTyping(false);
    }, 1100);
  };

  const processWhatsAppBotLogic = (userInput) => {
    const text = userInput.toLowerCase();

    // 1. URL Check (Mini Audit or OSINT)
    if (text.includes('http://') || text.includes('https://') || text.includes('.com') || text.includes('.net') || text.includes('.eg')) {
      if (text.includes('منافس') || text.includes('competitor')) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: 'bot',
            type: 'osint_card',
            url: userInput,
            text: `🕵️‍♂️ تقرير OSINT الفوري لمنافسك (${userInput}):\n\n- نظام إدارة المحتوى: Woocommerce (بطيء في الاستجابة)\n- الـ Pixel: مفعل بدون Meta CAPI ❌\n- النتيجة: منافسك يفقد ~35% من بيانات تحويلات الآيفون.\n\nتفضل خطة ماركن كود للتفوق عليه:`,
            buttons: [
              { id: 'btn_solve_osint', title: 'خطة التغلب عليه 🚀' },
              { id: 'btn_main_menu', title: 'القائمة الرئيسية 📋' }
            ],
            timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: 'bot',
            type: 'audit_card',
            url: userInput,
            text: `⚡ تقرير فحص الموقع والـ Pixel لموقعك (${userInput}):\n\n- تقييم الأداء: 68/100 ⚠️\n- Meta Pixel Browser: مفعل ✅ (ID: 84920491823901)\n- Meta Conversions API (CAPI): غير مربوط ❌\n- سرعة الموبايل: 3.8 ثانية (بطء ملحوظ)\n\nتحب فريق ماركن كود يفعل الـ CAPI ويصلح سرعة موقعك؟`,
            buttons: [
              { id: 'btn_fix_pixel', title: 'تفعيل Meta CAPI 🔧' },
              { id: 'btn_quote_pdf', title: 'طلب عرض سعر 📄' }
            ],
            timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
      return;
    }

    // 2. PDF Quote Document Request
    if (text.includes('كوتيشن') || text.includes('pdf') || text.includes('تحميل عرض') || text.includes('btn_quote') || text.includes('btn_quote_pdf')) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          type: 'document_pdf',
          filename: 'Markncode_Official_Proposal_2026.pdf',
          size: '1.4 MB',
          text: `📄 تفضل يا باشا مستند عرض السعر والتفاصيل الرسمية من مؤسسة ماركن كود.\n\nيشمل باقة Meta CAPI وتطوير الـ 3D Landing Page مع خصم خاص 10%.`,
          timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      return;
    }

    // 3. Human Handoff Trigger
    if (text.includes('بشري') || text.includes('انساني') || text.includes('تحدث مع شخص') || text.includes('مدير المبيعات')) {
      onTriggerHandoff({
        phone: '01012345678',
        reason: 'طلب تحويل بشري من شات الواتساب',
        lastMessage: userInput,
        time: new Date().toLocaleTimeString('ar-EG')
      });

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          type: 'handoff_alert',
          text: `🚨 تم إيقاف الرد التلقائي وإرسال إشعار فوري لمدير المبيعات في ماركن كود.\n\nسيقوم أحد متخصصينا بالتواصل معك عبر الواتساب فوراً.`,
          timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      return;
    }

    // 4. Voice Note Request
    if (text.includes('صوت') || text.includes('توضيح بصوت') || text.includes('فويس')) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          type: 'voice_note',
          text: `تفضل توضيح بصوت مستشار المبيعات في ماركن كود:`,
          timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      return;
    }

    // 5. Dental Clinic Design Mockup Request
    if (text.includes('أسنان') || text.includes('اسنان') || text.includes('سنان') || text.includes('dental')) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          type: 'portfolio_item',
          mediaImage: '/assets/dental_clinic_ad_mockup.jpg',
          text: `🦷 **معاينة تصميم وسابقة أعمال عيادات الأسنان (BrightSmile Dental Center):**\n\n- **النتائج:** زيادة الحجوزات 180% وتأمين 350+ حالة تبييض وزراعة أسنان.\n- **التفاصيل:** استهداف دقيق لعلاجات وتجميل الأسنان + ربط Meta CAPI وحجز مواعيد آلي.\n\n🖼️ تم إرفاق تصميم الإعلان المخصص لعيادات الأسنان أعلاه كصورة!`,
          buttons: [
            { id: 'btn_internal', title: 'تصميم عيادات الباطنة 🩺' },
            { id: 'btn_beauty', title: 'تصميم عيادات التجميل 💇‍♀️' },
            { id: 'btn_quote', title: 'تحميل كوتيشن PDF 📄' }
          ],
          timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      return;
    }

    // 6. Internal Medicine Clinic Design Mockup Request
    if (text.includes('باطنة') || text.includes('بطنه') || text.includes('جهاز هضمي') || text.includes('internal')) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          type: 'portfolio_item',
          mediaImage: '/assets/internal_medicine_ad_mockup.jpg',
          text: `🩺 **معاينة تصميم وسابقة أعمال عيادات الباطنة والجهاز الهضمي (El-Safa Center):**\n\n- **النتائج:** تخفيض تكلفة الاستحواذ على المريض بنسبة 40%.\n- **التفاصيل:** حملات توعية بالفحص الشامل، مع أتمتة الرد والمتابعة الفورية عبر الواتساب.\n\n🖼️ تم إرفاق تصميم الإعلان المخصص لعيادات الباطنة أعلاه كصورة!`,
          buttons: [
            { id: 'btn_dental', title: 'تصميم عيادات الأسنان 🦷' },
            { id: 'btn_beauty', title: 'تصميم عيادات التجميل 💇‍♀️' },
            { id: 'btn_quote', title: 'تحميل كوتيشن PDF 📄' }
          ],
          timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      return;
    }

    // 7. Beauty & Dermatology Clinic Design Mockup Request
    if (text.includes('تجميل') || text.includes('جلدية') || text.includes('بشرة') || text.includes('ليزر') || text.includes('beauty')) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          type: 'portfolio_item',
          mediaImage: '/assets/beauty_clinic_ad_mockup.jpg',
          text: `💇‍♀️ **معاينة تصميم وسابقة أعمال مراكز التجميل والجلدية (Derma Glow Clinic):**\n\n- **النتائج:** خفض تكلفة العميل (CPL) بنسبة 45% وتأمين 420 حجز مؤكد.\n- **التفاصيل:** استهداف دقيق لعلاجات الليزر والنضارة مع بوستر فاخر مخصص.\n\n🖼️ تم إرفاق تصميم الإعلان المخصص لمراكز التجميل أعلاه كصورة!`,
          buttons: [
            { id: 'btn_dental', title: 'تصميم عيادات الأسنان 🦷' },
            { id: 'btn_internal', title: 'تصميم عيادات الباطنة 🩺' },
            { id: 'btn_quote', title: 'تحميل كوتيشن PDF 📄' }
          ],
          timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      return;
    }

    // 8. General Clinics Portfolio Request
    if (text.includes('عيادات') || text.includes('عيادة') || text.includes('طبي') || text.includes('clinics')) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          type: 'portfolio_item',
          mediaImage: '/assets/dental_clinic_ad_mockup.jpg',
          text: `🏥 **سابقة أعمال وتصاميم العيادات والمراكز الطبية (Markncode Clinics Portfolio):**\n\nاختر مجال العيادة لمعاينة التصميم فوراً كصورة:\n1️⃣ عيادات الأسنان (BrightSmile Dental Center)\n2️⃣ عيادات الباطنة والجهاز الهضمي (El-Safa Medical Center)\n3️⃣ مراكز التجميل والجلدية (Derma Glow Clinic)\n\n💬 انقر على أحد الأزرار أدناه لمعاينة بوستر الإعلان المخصص!`,
          buttons: [
            { id: 'btn_dental', title: 'تصميم عيادات الأسنان 🦷' },
            { id: 'btn_internal', title: 'تصميم عيادات الباطنة 🩺' },
            { id: 'btn_beauty', title: 'تصميم عيادات التجميل 💇‍♀️' }
          ],
          timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      return;
    }

    // 9. Furniture Store Design Mockup Request
    if (text.includes('أثاث') || text.includes('اثاث') || text.includes('furni') || text.includes('furniture')) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          type: 'portfolio_item',
          mediaImage: '/assets/ecommerce_furniture_ad_mockup_1787515233318.jpg',
          text: `🛋️ **تفضل تصميم إعلان وسابقة أعمال متاجر الأثاث والـ 3D (FurniCraft):**\n\n- **النتائج:** مبيعات بقيمة 1.25 مليون جنيه في 60 يوم.\n- **التفاصيل:** تصميم 3D Interactive Landing Page لمتاجر الأثاث.\n\n🖼️ تم إرفاق تصميم الإعلان الخاص بمتاجر الأثاث أعلاه كصورة!`,
          timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      return;
    }

    // 10. Fitness Gym Design Mockup Request
    if (text.includes('جيم') || text.includes('رياضة') || text.includes('fitness') || text.includes('nitro')) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          type: 'portfolio_item',
          mediaImage: '/assets/fitness_ad_mockup_1787496079349.jpg',
          text: `🏋️‍♂️ **تفضل تصميم إعلان وسابقة أعمال صالات الرياضة (Nitro Gym):**\n\n- **النتائج:** تحقيق 4.8x ROI وزيادة الاشتراكات 210%.\n- **التفاصيل:** ربط Meta CAPI وتصميم 3D Landing Page للجيم.\n\n🖼️ تم إرفاق تصميم الإعلان الخاص بالجيم أعلاه كصورة!`,
          timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      return;
    }

    // 11. General Master Portfolio Request
    if (text.includes('سابقة') || text.includes('تصاميم') || text.includes('أعمال') || text.includes('بورتفوليو') || text === '5') {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          type: 'portfolio_item',
          mediaImage: '/assets/dental_clinic_ad_mockup.jpg',
          text: `📊 **سابقة أعمال ومحفظة تصاميم ماركن كود (Markncode Master Portfolio):**\n\nاختر اسم المجال لمعاينة تصميم الإعلان كصورة:\n1️⃣ عيادات الأسنان (BrightSmile Dental)\n2️⃣ عيادات الباطنة (El-Safa Center)\n3️⃣ عيادات التجميل (Derma Glow Clinic)\n4️⃣ صالات الجيم (Nitro Gym)\n5️⃣ متاجر الأثاث (FurniCraft)\n\n💬 انقر على الأزرار تحت لمعاينة تصميم أي مجال!`,
          buttons: [
            { id: 'btn_dental', title: 'تصميم عيادات الأسنان 🦷' },
            { id: 'btn_internal', title: 'تصميم عيادات الباطنة 🩺' },
            { id: 'btn_beauty', title: 'تصميم عيادات التجميل 💇‍♀️' }
          ],
          timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      return;
    }

    // Smart Conversational AI Assistant (Understands any custom user query)
    let aiText = `💡 **فهمت استفسارك يا فنان بخصوص "${userInput}":**\n\n`;

    if (text.includes('capi') || text.includes('بيكسل') || text.includes('pixel') || text.includes('آيفون') || text.includes('ios')) {
      aiText += `تحديثات iOS 14.5+ بتسبب فقدان 35% لـ 45% من بيانات تحويلات زوار موقعك. إحنا بنربط خادم CAPI المباشر بين موقعك وميتا لحماية ميزانيتك وتأكيد كل حجز ومبيعة! ⚡`;
    } else if (text.includes('3d') || text.includes('لاندنج') || text.includes('موقع') || text.includes('landing')) {
      aiText += `إحنا بنبني واجهات 3D تفاعلية خفيفة جداً تفتح على الموبايل في أقل من ثانيتين، بتخلي المشتري يشوف عيادتك أو جتك أو منتجك 360 درجة وده بيرفع المبيعات لـ +300%! 🎨`;
    } else if (text.includes('بكام') || text.includes('سعر') || text.includes('تكلفة') || text.includes('باكدج') || text.includes('خصم')) {
      aiText += `إحنا بنصمم خطة استثمارية مخصصة لحجم بزنسك (سواء لسه بتبدأ أو شركة كبيرة) لضمان تحقيق أعلى عائد أرباح ROI وتخفيض تكلفة النتائج CPL! 💰`;
    } else if (text.includes('دكتور') || text.includes('طبيب') || text.includes('عياد')) {
      aiText += `التسويق الطبي للعيادات هو تخصصنا الرئيسي! حققنا لعيادات الأسنان والتجميل والباطنة زيادة في الحجوزات بـ +180% وتخفيض تكلفة الحجز لـ 45%. 🩺`;
    } else {
      aiText += `في مؤسسة ماركن كود، بنبني بنية الإعلانات الممولة (Meta & Google Ads) وربط خادم CAPI وواجهات الـ 3D التفاعلية لضمان أقصى مبيعات وأعلى عائد أرباح ROI. 🚀`;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'bot',
        type: 'text',
        text: aiText,
        buttons: [
          { id: 'btn_qual', title: 'تأهيل وطلب باكدج 💰' },
          { id: 'btn_audit_click', title: 'فحص موقعي والـ Pixel ⚡' },
          { id: 'btn_human', title: 'تحويل لبشري 🚨' }
        ],
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleButtonClick = (buttonTitle) => {
    handleSendMessage(buttonTitle);
  };

  return (
    <div className="max-w-4xl mx-auto p-2 md:p-4">
      {/* WhatsApp Web Outer Window Container */}
      <div className="rounded-2xl overflow-hidden border border-emerald-500/30 bg-[#0b141a] shadow-2xl flex flex-col h-[calc(100vh-100px)]">
        
        {/* WhatsApp Header Bar */}
        <div className="bg-[#202c33] px-4 py-3 border-b border-[#222d34] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00F2FE] to-[#7F00FF] p-[2px]">
                <div className="w-full h-full bg-slate-950 rounded-full flex-center text-[#00F2FE]">
                  <Bot className="w-5 h-5" />
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#202c33]"></span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-[#e9edef] font-latin">Markncode AI Assistant</h3>
                <span className="flex-center w-4 h-4 rounded-full bg-emerald-500 text-[#0b141a]">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
              </div>
              <p className="text-[11px] text-[#8696a0]">نشط الآن (WhatsApp Business API)</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[#8696a0]">
            <Video className="w-5 h-5 cursor-pointer hover:text-white" />
            <Phone className="w-5 h-5 cursor-pointer hover:text-white" />
            <MoreVertical className="w-5 h-5 cursor-pointer hover:text-white" />
          </div>
        </div>

        {/* WhatsApp Chat Conversation Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0b141a] bg-[radial-gradient(#111b21_1px,transparent_1px)] [background-size:16px_16px]">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-start' : 'items-end'}`}>
              <div
                className={`max-w-[85%] md:max-w-[75%] rounded-lg p-3 text-xs md:text-sm leading-relaxed relative space-y-2.5 shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-[#005c4b] text-[#e9edef] rounded-tl-none'
                    : 'bg-[#202c33] text-[#e9edef] rounded-tr-none'
                }`}
              >
                <p className="whitespace-pre-line text-[#e9edef]">{msg.text}</p>

                {/* Audit Card in WhatsApp */}
                {msg.type === 'audit_card' && (
                  <div className="p-3 rounded-lg bg-[#111b21] border border-cyan-500/40 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-cyan-400 font-bold">
                      <span className="flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5" />
                        <span>نتائج فحص الـ Meta Pixel</span>
                      </span>
                      <span className="text-[10px] text-amber-400 font-latin">Score: 68/100</span>
                    </div>
                    <p className="text-[11px] text-[#8696a0]">الموقع غير مربوط بـ Meta CAPI مما يسبب تسريب بيانات مبيعات iOS.</p>
                  </div>
                )}

                {/* OSINT Competitor Card in WhatsApp */}
                {msg.type === 'osint_card' && (
                  <div className="p-3 rounded-lg bg-[#111b21] border border-purple-500/40 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-purple-400 font-bold">
                      <span>تقرير المنافس الاستخباراتي</span>
                      <span className="text-[10px] text-rose-400">ثغرة تتبع مكتشفة</span>
                    </div>
                    <p className="text-[11px] text-[#8696a0]">يمكنك التفوق على منافسك بسهولة عبر ربط CAPI وسيرفرات Edge.</p>
                  </div>
                )}

                {/* WhatsApp Media Image with Watermark */}
                {(msg.mediaImage || msg.type === 'media_image' || msg.type === 'portfolio_item' || msg.type === 'portfolio') && (
                  <div className="relative rounded-lg overflow-hidden border border-emerald-500/30 my-2">
                    <img
                      src={msg.mediaImage || "/assets/beauty_clinic_ad_mockup_1787515128911.jpg"}
                      alt="Markncode Ad Design Mockup"
                      className="w-full h-48 md:h-60 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 left-2 bg-[#0b141a]/90 backdrop-blur-md px-2 py-0.5 rounded text-[9px] text-emerald-400 font-bold border border-emerald-500/30">
                      Designed by Markncode Agency
                    </div>
                  </div>
                )}

                {/* WhatsApp PDF Document Card */}
                {msg.type === 'document_pdf' && (
                  <div className="p-3 rounded-lg bg-[#111b21] border border-[#222d34] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-rose-500/20 text-rose-400 flex-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-white text-xs block">{msg.filename}</span>
                        <span className="text-[10px] text-[#8696a0] font-latin">{msg.size} • PDF Document</span>
                      </div>
                    </div>
                    <button
                      onClick={() => openTab('quote')}
                      className="w-8 h-8 rounded-full bg-[#00a884] text-[#0b141a] flex-center font-bold shrink-0 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* WhatsApp Voice Note Audio Player */}
                {msg.type === 'voice_note' && (
                  <div className="p-3 rounded-lg bg-[#111b21] flex items-center justify-between gap-3">
                    <button
                      onClick={() => setIsPlayingVoice(!isPlayingVoice)}
                      className="w-8 h-8 rounded-full bg-[#00a884] text-[#0b141a] flex-center shrink-0 cursor-pointer"
                    >
                      {isPlayingVoice ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                    <div className="flex-1 flex items-center gap-1">
                      {[10, 20, 8, 24, 14, 28, 12, 18, 22, 16, 26, 12].map((h, idx) => (
                        <div
                          key={idx}
                          className={`w-1 rounded-full transition-all ${
                            isPlayingVoice ? 'bg-[#00a884] waveform-bar' : 'bg-[#374248]'
                          }`}
                          style={{ height: `${isPlayingVoice ? h : 8}px` }}
                        ></div>
                      ))}
                    </div>
                    <span className="text-[10px] text-[#8696a0] font-latin">0:22</span>
                  </div>
                )}

                {/* Human Handoff Alert in WhatsApp */}
                {msg.type === 'handoff_alert' && (
                  <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/40 space-y-2 text-xs">
                    <div className="flex items-center gap-1.5 text-rose-400 font-bold">
                      <AlertTriangle className="w-4 h-4" />
                      <span>إشعار تحويل بشري لمدير المبيعات</span>
                    </div>
                    <a
                      href="https://wa.me/201000000000"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2 rounded-lg bg-rose-500 text-white font-bold text-xs flex-center gap-1.5"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>فتح شات مسؤول المبيعات مباشرة</span>
                    </a>
                  </div>
                )}

                {/* WhatsApp Interactive Buttons */}
                {msg.buttons && (
                  <div className="space-y-1.5 pt-2 border-t border-[#222d34]">
                    {msg.buttons.map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => handleButtonClick(btn.title)}
                        className="w-full text-center py-2 px-3 rounded-md bg-[#111b21] hover:bg-[#2a3942] text-[#00a884] font-bold text-xs border border-[#222d34] transition-all cursor-pointer"
                      >
                        {btn.title}
                      </button>
                    ))}
                  </div>
                )}

                {/* Timestamp & Read Receipts */}
                <div className="flex items-center justify-end gap-1 text-[9px] text-[#8696a0] font-latin pt-1">
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'user' && <CheckCheck className="w-3 h-3 text-[#53bdeb]" />}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-[#8696a0] text-xs py-1">
              <span className="w-2 h-2 bg-[#00a884] rounded-full animate-ping"></span>
              <span>Markncode AI Bot يكتب الآن...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick WhatsApp Presets Bar */}
        <div className="bg-[#111b21] px-3 py-2 border-t border-[#222d34] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => handleSendMessage('بورتفوليو تصاميم العيادات')}
            className="px-3 py-1 rounded-full bg-[#202c33] text-emerald-400 border border-[#222d34] text-xs font-bold whitespace-nowrap hover:bg-[#2a3942]"
          >
            🏥 بورتفوليو العيادات
          </button>
          <button
            onClick={() => handleSendMessage('معاينة تصميم عيادات الأسنان')}
            className="px-3 py-1 rounded-full bg-[#202c33] text-cyan-400 border border-[#222d34] text-xs font-bold whitespace-nowrap hover:bg-[#2a3942]"
          >
            🦷 عيادات أسنان
          </button>
          <button
            onClick={() => handleSendMessage('معاينة تصميم عيادات الباطنة')}
            className="px-3 py-1 rounded-full bg-[#202c33] text-teal-400 border border-[#222d34] text-xs font-bold whitespace-nowrap hover:bg-[#2a3942]"
          >
            🩺 عيادات باطنة
          </button>
          <button
            onClick={() => handleSendMessage('معاينة تصميم عيادات التجميل')}
            className="px-3 py-1 rounded-full bg-[#202c33] text-pink-400 border border-[#222d34] text-xs font-bold whitespace-nowrap hover:bg-[#2a3942]"
          >
            💇‍♀️ عيادات تجميل
          </button>
          <button
            onClick={() => handleSendMessage('بكام الباكدج؟')}
            className="px-3 py-1 rounded-full bg-[#202c33] text-[#00a884] border border-[#222d34] text-xs font-bold whitespace-nowrap hover:bg-[#2a3942]"
          >
            💰 بكام الباكدج؟
          </button>
          <button
            onClick={() => handleSendMessage('تحميل كوتيشن PDF')}
            className="px-3 py-1 rounded-full bg-[#202c33] text-yellow-400 border border-[#222d34] text-xs font-bold whitespace-nowrap hover:bg-[#2a3942]"
          >
            📄 كوتيشن PDF
          </button>
          <button
            onClick={() => handleSendMessage('أنا محتاج اتكلم مع بشري')}
            className="px-3 py-1 rounded-full bg-[#202c33] text-rose-400 border border-[#222d34] text-xs font-bold whitespace-nowrap hover:bg-[#2a3942]"
          >
            🚨 تحويل لبشري
          </button>
        </div>

        {/* WhatsApp Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="bg-[#202c33] px-4 py-3 flex items-center gap-3 border-t border-[#222d34]"
        >
          <Paperclip className="w-5 h-5 text-[#8696a0] cursor-pointer hover:text-white" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتب رسالتك للواتساب هنا (مثال: بكام الباكدج أو أرسل رابط موقعك)"
            className="flex-1 bg-[#2a3942] rounded-lg px-4 py-2.5 text-xs md:text-sm text-[#e9edef] placeholder-[#8696a0] focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-10 h-10 rounded-full bg-[#00a884] text-[#0b141a] flex-center shrink-0 disabled:opacity-50 cursor-pointer"
          >
            <Send className="w-5 h-5 rotate-180" />
          </button>
        </form>
      </div>
    </div>
  );
}
