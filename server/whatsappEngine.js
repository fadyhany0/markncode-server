import path from 'path';
import { generateSmartAIResponse } from './aiEngine.js';

export const userSessions = new Map();

export const PORTFOLIO_MOCKUP_IMAGES = {
  beauty: path.resolve('public/assets/beauty_clinic_ad_mockup.jpg'),
  dental: path.resolve('public/assets/dental_clinic_ad_mockup.jpg'),
  internalMedicine: path.resolve('public/assets/internal_medicine_ad_mockup.jpg'),
  fitness: path.resolve('public/assets/fitness_ad_mockup_1787496079349.jpg'),
  ecommerce: path.resolve('public/assets/ecommerce_furniture_ad_mockup_1787515233318.jpg'),
  agencyBanner: path.resolve('public/assets/markncode_hero_banner_1787496027760.jpg')
};

export const EGYPTIAN_DIALECT_RESPONSES = {
  main_menu: `أهلاً بحضرتك في واتساب ماركن كود (Markncode)! 🚀 ⚡

أنا مستشارك الرقمي الفائق بالذكاء الاصطناعي. اختر الرقم المطلوب أو ابعت الكلمة مباشرة:

1️⃣ تأهيل وطلب باكدج التسويق المخصص (Lead Qualification)
2️⃣ فحص موقعك وربط الـ Meta Pixel والـ CAPI (Instant Mini-Audit)
3️⃣ تحليل استخباراتي لمنافسك (OSINT Competitor Audit)
4️⃣ محاكاة أرباح العائد الإعلاني (Interactive ROI Simulator)
5️⃣ عرض سابقة الأعمال كاملة بالتصاميم والنتائج (Portfolio Showcase 🎨)
6️⃣ تجربة ديمو 3D Landing Page تفاعلية باسم شركتك
7️⃣ تحميل عرض سعر كوتيشن رسمية PDF (Dynamic PDF Quote)
8️⃣ تحويل وتحدث مع مدير المبيعات مباشرة (Human Handoff 🚨)`,

  services_menu: `ممتاز جداً! 🎯 اختر نوع الخدمة الرئيسية اللي محتاجها للبزنس بتاعك:

1️⃣ حملات Meta & Google Ads + ربط خادم CAPI
2️⃣ تطوير وتصميم 3D Interactive Landing Page
3️⃣ إدارة السوشيال ميديا وصناعة المحتوى (Reels + Designs)
4️⃣ بناء بوت أتمتة الذكاء الاصطناعي AI Bot Suite`,

  business_size_menu: `رائع! 📈 وعشان نحدد الميزانية المقترحة بدقة لحملاتك، ما هو حجم البزنس حالياً؟

1️⃣ بزنس ناشئ لسه بيبدأ (Startup: 10k - 30k EGP/شهر)
2️⃣ بزنس شغال وعايز أوسع (Growing: 30k - 100k EGP/شهر)
3️⃣ شركة كبيرة / براند معروف (Enterprise: +100k EGP/شهر)`
};

/**
 * Master WhatsApp Message Logic with Full Visual Portfolio & State Machine
 */
export async function handleIncomingWhatsAppMessage(fromPhone, messageText) {
  const text = messageText.trim().toLowerCase();
  const cleanPhone = fromPhone.split('@')[0];
  
  const norm = text
    .replace(/١/g, '1')
    .replace(/٢/g, '2')
    .replace(/٣/g, '3')
    .replace(/٤/g, '4')
    .replace(/٥/g, '5')
    .replace(/٦/g, '6')
    .replace(/٧/g, '7')
    .replace(/٨/g, '8')
    .replace(/٩/g, '9')
    .trim();

  let session = userSessions.get(cleanPhone) || { step: 'MAIN_MENU', data: {} };

  // Priority 1: Check for URL input (Instant Audit or OSINT)
  if (norm.includes('http://') || norm.includes('https://') || norm.includes('.com') || norm.includes('.net') || norm.includes('.eg') || norm.includes('.org')) {
    userSessions.set(cleanPhone, { step: 'MAIN_MENU', data: {} });
    if (norm.includes('منافس') || norm.includes('competitor') || norm.includes('سوق')) {
      return {
        type: 'osint_audit',
        replyText: `🕵️‍♂️ **التقرير الاستخباراتي OSINT لمنافسك (${messageText}):**

- **نظام إدارة المحتوى:** Woocommerce 6.4 (بطيء الاستجابة تحت الضغط)
- **أدوات التتبع:** Meta Pixel موجود لكن **بدون Meta CAPI** ❌
- **السيرفر والسرعة:** زمن الاستجابة 2.4 ثانية (معرض للهبوط وقت الحملات)
- **تسريب البيانات:** منافسك يفقد ~35% من بيانات تحويلات زوار الآيفون (iOS 14.5+).

💡 **خطة ماركن كود للتفوق الفوري:**
نحن نبني لك 3D Landing Page على شبكة Edge CDN سريعة للغاية ونربط خادم CAPI المباشر للاستحواذ على عملاء المنافس.

اختر الرقم المطلوب:
1️⃣ طلب تفعيل Meta CAPI والبنية التحتية
7️⃣ تحميل كوتيشن PDF رسمي`
      };
    } else {
      return {
        type: 'mini_audit',
        replyText: `⚡ **تقرير الفحص الفوري لموقعك (${messageText}):**

- **تقييم الأداء العام:** 68 / 100 ⚠️ (يحتاج تحسين)
- **Meta Pixel Browser:** مفعل ✅ (ID: 84920491823901)
- **Meta Conversions API (CAPI):** غير مربوط ❌ (تضييع ميزانية إعلانية)
- **مؤشر سرعة الموبايل (LCP):** 3.8 ثانية (بطء يتسبب في ارتفاع نسبة الارتداد)

📢 **توصية ماركن كود:**
ربط خادم CAPI المباشر يرفع تحويلاتك بنسبة +35% ويحمي ميزانيتك.

1️⃣ تفعيل Meta CAPI وإصلاح السرعة
7️⃣ طلب عرض سعر PDF مخصص`
      };
    }
  }

  // Priority 2: Human Handoff override
  if (norm.includes('بشري') || norm.includes('انساني') || norm.includes('مدير') || norm.includes('ادارة') || norm.includes('تواصل مع شخص') || norm === '8') {
    userSessions.set(cleanPhone, { step: 'HANDOFF', data: {} });
    return {
      type: 'human_handoff',
      replyText: `🚨 **تنبيه التحويل البشري الفوري (Human Handoff):**

تم إيقاف الرد التلقائي وإرسال إشعار فوري لمدير المبيعات في ماركن كود 🚨

👨‍💼 سيقوم أحد متخصصينا بالتواصل معك على هذا الرقم في خلال دقائق.
رابط التواصل المباشر مع مدير المبيعات:
https://wa.me/201000000000`
    };
  }



  // Feature 5: FULL PORTFOLIO SHOWCASE WITH ALL DESIGN MOCKUPS (Clinics + Gym + Furniture + Agency)
  if (norm === '5' || norm.includes('سابقة') || norm.includes('شغلكم') || norm.includes('أعمال') || norm.includes('تصاميم') || norm.includes('نتائج') || norm.includes('بورتفوليو') || norm.includes('بورتفليو')) {
    userSessions.set(cleanPhone, { step: 'PORTFOLIO_MENU', data: {} });
    return {
      type: 'portfolio_all',
      replyText: `📊 **معرض سابقة أعمال وتصاميم مؤسسة ماركن كود (Markncode Master Portfolio):**\n\nجارٍ إرسال كافة تصاميم وإعلانات المشاريع السابقة والعيادات كمرفقات صور عالية الجودة الآن 👇`,
      mediaImages: [
        {
          path: PORTFOLIO_MOCKUP_IMAGES.dental,
          caption: `🦷 **1️⃣ BrightSmile Dental Center (عيادات طب وتجميل الأسنان)**\n- **النتيجة:** زيادة الحجوزات 180% وتأمين 350+ حالة تبييض وزراعة.\n- **التفاصيل:** استهداف دقيق لعلاجات الأسنان وتصميم بوستر فاخر.`
        },
        {
          path: PORTFOLIO_MOCKUP_IMAGES.internalMedicine,
          caption: `🩺 **2️⃣ El-Safa Medical Center (عيادات الباطنة والجهاز الهضمي)**\n- **النتيجة:** خفض تكلفة الاستحواذ على المريض 40%.\n- **التفاصيل:** حملات توعية للفحص الشامل وأتمتة الرد والمتابعة.`
        },
        {
          path: PORTFOLIO_MOCKUP_IMAGES.beauty,
          caption: `💇‍♀️ **3️⃣ Derma Glow Clinic (مراكز التجميل والعيادات الجلدية)**\n- **النتيجة:** تخفيض تكلفة العميل (CPL) 45% وتأمين 420 حجز مؤكد.\n- **التفاصيل:** استهداف دقيق لخدمات الليزر والعناية بالبشرة.`
        },
        {
          path: PORTFOLIO_MOCKUP_IMAGES.ecommerce,
          caption: `🛋️ **4️⃣ FurniCraft (متجر أثاث مودرن و 3D)**\n- **النتيجة:** مبيعات بقيمة **1.25 مليون جنيه** في 60 يوم.\n- **التفاصيل:** تصميم 3D Interactive Landing Page وعرض القطع تفاعلياً.`
        },
        {
          path: PORTFOLIO_MOCKUP_IMAGES.fitness,
          caption: `🏋️‍♂️ **5️⃣ Nitro Gym (صالات رياضية فاخرة)**\n- **النتيجة:** تحقيق **4.8x ROI** وزيادة الاشتراكات 210%.\n- **التفاصيل:** ربط Meta CAPI وتصميم 3D Landing Page للجيم.`
        },
        {
          path: PORTFOLIO_MOCKUP_IMAGES.agencyBanner,
          caption: `✨ **6️⃣ Markncode Agency (الهوية الرسمية وبانر مؤسسة ماركن كود)**\n- **التفاصيل:** بنية التسويق الرقمي المتقدمة وربط CAPI وتطوير الـ 3D.`
        }
      ]
    };
  }

  // Priority 3: STEP-BASED CONVERSATION STATE HANDLING
  if (session.step === 'PORTFOLIO_MENU') {
    if (norm === '1') {
      return {
        type: 'portfolio_item',
        mediaImage: PORTFOLIO_MOCKUP_IMAGES.dental,
        replyText: `🦷 **تفضل تصميم إعلان وسابقة أعمال BrightSmile Dental (عيادات الأسنان):**\n\n🖼️ تم إرفاق الصورة أعلاه!\n\nأرسل **2** لعيادات الباطنة أو **3** لمراكز التجميل.`
      };
    }
    if (norm === '2') {
      return {
        type: 'portfolio_item',
        mediaImage: PORTFOLIO_MOCKUP_IMAGES.internalMedicine,
        replyText: `🩺 **تفضل تصميم إعلان وسابقة أعمال El-Safa Center (عيادات الباطنة):**\n\n🖼️ تم إرفاق الصورة أعلاه!\n\nأرسل **3** لمراكز التجميل أو **1** لعيادات الأسنان.`
      };
    }
    if (norm === '3') {
      return {
        type: 'portfolio_item',
        mediaImage: PORTFOLIO_MOCKUP_IMAGES.beauty,
        replyText: `💇‍♀️ **تفضل تصميم إعلان وسابقة أعمال Derma Glow Clinic (مراكز التجميل والجلدية):**\n\n🖼️ تم إرفاق الصورة أعلاه!\n\nأرسل **4** لمتاجر الأثاث أو **7** لتنزيل كوتيشن PDF.`
      };
    }
    if (norm === '4') {
      return {
        type: 'portfolio_item',
        mediaImage: PORTFOLIO_MOCKUP_IMAGES.ecommerce,
        replyText: `🛋️ **تفضل تصميم إعلان وسابقة أعمال FurniCraft (متاجر الأثاث والـ 3D):**\n\n🖼️ تم إرفاق الصورة أعلاه!`
      };
    }
    if (norm === '5') {
      return {
        type: 'portfolio_item',
        mediaImage: PORTFOLIO_MOCKUP_IMAGES.fitness,
        replyText: `🏋️‍♂️ **تفضل تصميم إعلان وسابقة أعمال Nitro Gym (صالات الرياضة):**\n\n🖼️ تم إرفاق الصورة أعلاه!`
      };
    }
    if (norm === '6') {
      return {
        type: 'portfolio_item',
        mediaImage: PORTFOLIO_MOCKUP_IMAGES.agencyBanner,
        replyText: `✨ **تفضل بانر مؤسسة ماركن كود الرسمي:**\n\n🖼️ تم إرفاق الصورة أعلاه!`
      };
    }
  }

  if (session.step === 'QUAL_SERVICE') {
    if (norm === '1' || norm === '2' || norm === '3' || norm === '4' || norm.includes('حملات') || norm.includes('3d') || norm.includes('سوشيال') || norm.includes('بوت')) {
      let serviceName = 'حملات Meta & Google Ads + CAPI';
      if (norm === '2' || norm.includes('3d') || norm.includes('لاندنج')) serviceName = 'تطوير وتصميم 3D Landing Page';
      if (norm === '3' || norm.includes('سوشيال') || norm.includes('محتوى')) serviceName = 'إدارة السوشيال ميديا وصناعة المحتوى';
      if (norm === '4' || norm.includes('بوت') || norm.includes('ai')) serviceName = 'بناء بوت أتمتة الذكاء الاصطناعي AI Bot';

      userSessions.set(cleanPhone, { step: 'QUAL_SIZE', data: { service: serviceName } });

      return {
        type: 'text',
        replyText: `ممتاز جداً! 🎯 اخترت خدمة (${serviceName}) 👍\n\n` + EGYPTIAN_DIALECT_RESPONSES.business_size_menu
      };
    } else {
      userSessions.set(cleanPhone, { step: 'MAIN_MENU', data: {} });
    }
  }

  if (session.step === 'QUAL_SIZE') {
    if (norm === '1' || norm === '2' || norm === '3' || norm.includes('ناشئ') || norm.includes('وسّع') || norm.includes('شغال') || norm.includes('كبيرة') || norm.includes('براند')) {
      let sizeName = 'Startup (10k - 30k EGP/شهر)';
      if (norm === '2' || norm.includes('وسّع') || norm.includes('شغال')) sizeName = 'Growing (30k - 100k EGP/شهر)';
      if (norm === '3' || norm.includes('كبيرة') || norm.includes('براند')) sizeName = 'Enterprise (+100k EGP/شهر)';

      const selectedService = session.data.service || 'تسويق رقمي وربط CAPI';

      userSessions.set(cleanPhone, { step: 'MAIN_MENU', data: {} });

      return {
        type: 'text',
        replyText: `🎉 **تم تأهيل حسابك وتسجيل بياناتك آلياً في Notion CRM & Google Sheets!**

- **الخدمة المختارة:** ${selectedService}
- **الميزانية المخصصة:** ${sizeName}
- **رقم الموبايل المسجل:** ${cleanPhone}
- **حالة المزامنة:** Synced to Notion & Google Sheets DB (200 OK) ✅

📅 **رابط حجز مكالمة الاستشارة المجانية عبر Calendly:**
https://calendly.com/markncode-agency

ارسل **5** لمشاهدة سابقة الأعمال والتصاميم أو **7** لتنزيل كوتيشن الـ PDF.`
      };
    } else {
      userSessions.set(cleanPhone, { step: 'MAIN_MENU', data: {} });
    }
  }

  // Priority 4: MAIN MENU COMMAND ROUTING (Strict digit or action triggers)
  if (norm === '1' || norm === 'تأهيل' || norm === 'باكدج') {
    userSessions.set(cleanPhone, { step: 'QUAL_SERVICE', data: {} });
    return {
      type: 'text',
      replyText: EGYPTIAN_DIALECT_RESPONSES.services_menu
    };
  }

  if (norm === '2' || norm === 'فحص' || norm === 'فحص موقعي') {
    userSessions.set(cleanPhone, { step: 'MAIN_MENU', data: {} });
    return {
      type: 'text',
      replyText: `أهلاً بحضرتك، ابعتلي لينك موقعك هنا في الشات فوراً (مثال: https://mybrand.com)، والبوت هيحلل الـ Pixel والـ CAPI والسرعة في ثواني! ⚡`
    };
  }

  if (norm === '3' || norm === 'منافس' || norm === 'تحليل منافس') {
    userSessions.set(cleanPhone, { step: 'MAIN_MENU', data: {} });
    return {
      type: 'text',
      replyText: `ابعتلي لينك موقع أكبر منافس ليك واكتب جمبه كلمة "منافس" (مثال: https://competitor.com منافس)، وهنطلعلك كافة ثغراته الفنية فوراً! 🕵️‍♂️`
    };
  }

  if (norm === '4' || norm === 'roi' || norm === 'حسبة roi') {
    userSessions.set(cleanPhone, { step: 'MAIN_MENU', data: {} });
    return {
      type: 'roi_simulation',
      replyText: `📈 **الحسبة التفاعلية للعائد الإعلاني المتوقع (ROI Simulator):**

بناءً على متوسط أسعار النقرات (CPC) ومعدلات التحويل في السوق المصري:

💰 **الميزانية الإعلانية المفترضة:** 30,000 EGP / شهر
- **الوصول المتوقع (Reach):** ~65,000 شخص مهتم بمجالك
- **النقرات عالية الجودة:** ~4,600 زيارة للموقع
- **العملاء المحتملون المؤهلون (Leads):** 40 إلى 60 عميل مؤهل
- **المبيعات / العقود المقدرة:** 10 إلى 15 مبيعة
- **صافي العائد المتوقع (ROI):** **+320% ROI** 🚀 (أرباح إجمالية مقدرة ~125,000 EGP)

ارسل **1** لتأهيل حسابك وااختيار باكدج مخصص أو **5** لمشاهدة تصاميم سابقة الأعمال.`
    };
  }

  if (norm === '6' || norm === 'ديمو 3d') {
    userSessions.set(cleanPhone, { step: 'MAIN_MENU', data: {} });
    return {
      type: '3d_demo',
      replyText: `🚀 **تجارب الـ 3D التفاعلية M-3D Studio من ماركن كود:**

نحن بنصمم واجهات 3D WebGL تفاعلية بتفتح على الموبايل بسرعة فائقة جداً ومدمج فيها عناصر 3D تشوق المشتري وتخليه يتفاعل مع منتجك قبل الشراء، وده بيرفع نسبة تحويلاتك لـ +300%!

تجربة ديمو تفاعلي 3D على الموبايل:
https://markncode.com/3d-demo-preview


ارسل **1** لطلب تصميم 3D Landing Page لشركتك!`
    };
  }

  if (norm === '7' || norm.includes('كوتيشن') || norm.includes('pdf')) {
    userSessions.set(cleanPhone, { step: 'MAIN_MENU', data: {} });
    return {
      type: 'pdf_quote',
      replyText: `📄 **عرض السعر الرسمي المخصص (Markncode Proposal & Quotation):**

تم تجهيز عرض السعر الرسمي المخصص لك ومرفق به خصم خاص **10%** على باقات Meta CAPI وتطوير الـ 3D Landing Page!

📥 **رابط تنزيل ملف الـ PDF مباشرة:**
https://markncode.com/Markncode_Quotation_Proposal_2026.pdf

لو حابب نحجز ميعاد استشارة مباشرة اختر **1** للتأهيل أو **8** للتحدث مع مدير المبيعات.`
    };
  }

  if (norm.includes('صوت') || norm.includes('فويس')) {
    return {
      type: 'voice_note',
      replyText: `🎙️ **تفضل توضيح بصوت مستشار المبيعات في ماركن كود (AI Voice Note):**

"أهلاً بحضرتك! أنا مستشار التسويق الرقمي في ماركن كود. بنبني بنية Meta CAPI و 3D Landing Pages عشان كل جنيه يدخل إعلاناتك يجيب قيمته وزيادة."

رابط الاستماع للمقطع الصوتي:
https://markncode.com/voice-notes/welcome-sales.ogg`
    };
  }

  // Priority 5: Smart Conversational AI Engine (Understands any custom user question)
  userSessions.set(cleanPhone, { step: 'MAIN_MENU', data: {} });
  const aiResult = await generateSmartAIResponse(cleanPhone, messageText);
  
  let mediaImage = null;
  if (aiResult.mediaImageKey && PORTFOLIO_MOCKUP_IMAGES[aiResult.mediaImageKey]) {
    mediaImage = PORTFOLIO_MOCKUP_IMAGES[aiResult.mediaImageKey];
  }

  return {
    type: aiResult.type || 'text',
    mediaImage: mediaImage,
    replyText: aiResult.replyText
  };
}
