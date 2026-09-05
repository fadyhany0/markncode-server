import { GoogleGenAI } from '@google/genai';

// Concise & Respectful WhatsApp Copywriting System Prompt (Polite Egyptian Arabic Dialect)
const MARKNCODE_GEMINI_SYSTEM_PROMPT = `
أنت "مستشار ماركن كود الرقمي" (Markncode Senior AI Marketing Advisor).

### 🎯 القواعد الذهبية للرد على الواتساب (مختصر، لهجة مصرية عادية ومحترمة 100%):
1. **اللهجة المصرية العامية المحترفة (Polite Egyptian Arabic Dialect)**:
   - اتكلم باللهجة المصرية العامية العادية بس بأسلوب محترم وراقي جداً (مثل: "أهلاً بحضرتك"، "منورنا في ماركن كود"، "بنبنيلك"، "عشان توفر ميزانيتك"، "نقدر نساعدك تكبر البزنس بتاعك"، "تحب نساعدك إزاي").
   - **ممنوع تماماً** استخدام الألقاب العامية أو الشعبية مثل: ("يا باشا"، "يا فنان"، "يا غالي"، "يا كابتن").
   - التزم بالاحترام والمهنية العالية مع الحفاظ على سهولة وسلاسة العامية المصرية.

2. **ردود قصيرة وسريعة القراءة (Concise & High-Converting WhatsApp Copy)**:
   - اجعل إجابتك **مختصرة جداً في 3 إلى 5 أسطر قصيرة وسريعة القراءة** (أو 3 نقاط مركزة كحد أقصى).
   - ممنوع إرسال مقالات أو رسائل طويلة جداً لأن عميل الواتساب يمل بسرعة ولا يقرأ الكلام الطويل!

3. **الإقناع التسويقي العالي (High Persuasion & Value)**:
   - ركّز فوراً على الفائدة والنمو للبزنس الخاص بالعميل (مضاعفة المبيعات/الحجوزات +180%، إعلانات Meta & Google المستهدفة، ربط Meta CAPI لمنع ضياع المبيعات من مستخدمي الآيفون، والعرض الـ 3D التفاعلي).
   - إذا ذكر العميل مجاله (مثل: ملابس/هدوم، عيادة أسنان، عقارات، جيم، أثاث): اعطه الحل المباشر لمجاله فوراً في 3 نقاط سريعة واختم بسؤال تفاعلي محفز.

4. **استخدام الـ Emojis بالتنسيق الممتاز**:
   - استخدم Emojis مبهجة وجذابة تعطي الرسالة شكلاً تنسيقياً ممتازاً (👗, 🩺, 🚀, 📈, ⚡, 💡, 💰, 🎯).

أجب فوراً بصفتك مستشار ماركن كود التسويقي بإجابة قصيرة جداً ومقنعة 100% باللهجة المصرية المحترمة بدون ألقاب شعبية.
`;

export const conversationHistoryStore = new Map();

/**
 * Direct Gemini AI Engine Execution
 */
export async function generateSmartAIResponse(cleanPhone, userInput) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  // Track conversation history (last 10 turns)
  let history = conversationHistoryStore.get(cleanPhone) || [];
  history.push({ role: 'user', content: userInput });
  if (history.length > 10) history = history.slice(-10);
  conversationHistoryStore.set(cleanPhone, history);

  // Check if API key is provided and valid
  const isKeyPresent = apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE' && apiKey.length > 10;

  if (isKeyPresent) {
    const ai = new GoogleGenAI({ apiKey });

    const promptMessages = [
      MARKNCODE_GEMINI_SYSTEM_PROMPT,
      ...history.map(h => `${h.role === 'user' ? 'العميل' : 'المستشار'}: ${h.content}`),
      `العميل: ${userInput}\nالمستشار:`
    ].join('\n\n');

    const GEMINI_MODELS_CASCADE = [
      'gemini-3.5-flash',
      'gemini-3.1-flash-lite',
      'gemini-flash-latest',
      'gemini-3.6-flash'
    ];

    for (const modelName of GEMINI_MODELS_CASCADE) {
      try {
        console.log(`🤖 [Gemini AI Engine] Requesting [${modelName}] for [${cleanPhone}]...`);
        const response = await ai.models.generateContent({
          model: modelName,
          contents: promptMessages,
          config: {
            temperature: 0.7,
            maxOutputTokens: 1500
          }
        });

        const replyText = response.text ? response.text.trim() : null;

        if (replyText) {
          console.log(`✅ [Gemini AI Engine] Generated Gemini response via [${modelName}] (${replyText.length} chars)!`);
          history.push({ role: 'assistant', content: replyText });
          conversationHistoryStore.set(cleanPhone, history);
          return parseActionFromText(userInput, replyText);
        }
      } catch (err) {
        console.warn(`⚠️ [Gemini AI Engine] Model [${modelName}] rate-limit/error (${err?.status || 'ERR'}): ${err?.message?.substring(0, 80)}... Retrying next model.`);
      }
    }
  } else {
    console.log(`⚠️ [Gemini AI Engine Warning]: GEMINI_API_KEY is missing or set to placeholder in .env!`);
  }

  // Concise & Respectful Fallback Response for ALL business domains
  return generateConciseFallbackResponse(cleanPhone, userInput, history);
}

/**
 * Action and Media Attachment Parser
 */
function parseActionFromText(userInput, replyText) {
  const norm = userInput.toLowerCase();

  let actionType = 'text';
  let mediaImage = null;

  if (norm.includes('أسنان') || norm.includes('اسنان') || norm.includes('dental')) {
    actionType = 'portfolio_item';
    mediaImage = 'dental';
  } else if (norm.includes('باطنة') || norm.includes('بطنه') || norm.includes('internal')) {
    actionType = 'portfolio_item';
    mediaImage = 'internalMedicine';
  } else if (norm.includes('تجميل') || norm.includes('جلدية') || norm.includes('ليزر') || norm.includes('beauty')) {
    actionType = 'portfolio_item';
    mediaImage = 'beauty';
  } else if (norm.includes('جيم') || norm.includes('لياقة') || norm.includes('gym') || norm.includes('nitro')) {
    actionType = 'portfolio_item';
    mediaImage = 'fitness';
  } else if (norm.includes('أثاث') || norm.includes('اثاث') || norm.includes('furniture') || norm.includes('furni')) {
    actionType = 'portfolio_item';
    mediaImage = 'ecommerce';
  } else if (norm.includes('سابقة') || norm.includes('شغلكم') || norm.includes('أعمال') || norm.includes('تصاميم') || norm.includes('بورتفوليو')) {
    actionType = 'portfolio_all';
  } else if (norm.includes('http://') || norm.includes('https://') || norm.includes('.com') || norm.includes('.net') || norm.includes('.eg')) {
    actionType = norm.includes('منافس') ? 'osint_audit' : 'mini_audit';
  } else if (norm.includes('بشري') || norm.includes('مدير') || norm.includes('تحدث مع') || norm === '8') {
    actionType = 'human_handoff';
  } else if (norm.includes('كوتيشن') || norm.includes('عرض سعر') || norm.includes('pdf') || norm === '7') {
    actionType = 'pdf_quote';
  }

  return {
    type: actionType,
    replyText,
    mediaImageKey: mediaImage
  };
}

/**
 * Concise & Respectful Fallback Response in Egyptian Arabic (No Slang Titles)
 */
function generateConciseFallbackResponse(cleanPhone, userInput, history) {
  const norm = userInput.trim().toLowerCase();

  let replyText = '';
  let actionType = 'text';
  let mediaImageKey = null;

  // 1. Fashion / Clothing / Apparel Domain ("هدوم", "ملابس", "فاشون", "موضة", "أزياء", "شنط", "أحذية")
  if (norm.includes('هدوم') || norm.includes('ملابس') || norm.includes('فاشون') || norm.includes('موضة') || norm.includes('أزياء') || norm.includes('شنط') || norm.includes('احذية') || norm.includes('أحذية') || norm.includes('ازياء')) {
    replyText = `أهلاً بحضرتك! 👗✨ منورنا في **ماركن كود**.

لمتاجر وصفحات الملابس والفاشون، بنبنيلك منظومة مبيعات متكاملة عشان تضاعف أرباحك:
🎯 **إعلانات Meta مستهدفة** لعشاق الفاشون + فيديوهات Reels جذابة.
🛡️ **ربط Meta CAPI** عشان تمنع ضياع مبيعات الآيفون وتوفر في ميزانية الإعلان.
🛍️ **3D Interactive Catalog** لعرض قطع هدومك وتسهيل الطلب الآلي.

تحب نحدد خطة زيادة مبيعات براندك دلوقتي؟ 🚀`;
  }
  // 2. Real Estate Domain ("عقارات", "شقق", "فيلا", "عقاري")
  else if (norm.includes('عقار') || norm.includes('شقق') || norm.includes('فيلا') || norm.includes('كومباوند')) {
    replyText = `أهلاً بحضرتك! 🏠 منورنا في **ماركن كود**.

للمشاريع والعقارات: بنوفرلك حملات Meta & Google Ads مستهدفة للمستثمرين + ربط Meta CAPI لتتبع العملاء + 3D Virtual Tour لعرض المشاريع بشكل تفاعلي يزود المبيعات 🚀✨`;
  }
  // 3. Restaurants & Food Domain ("مطعم", "كافيه", "أكل", "وجبات", "دليفري")
  else if (norm.includes('مطعم') || norm.includes('كافيه') || norm.includes('أكل') || norm.includes('وجبات') || norm.includes('دليفري')) {
    replyText = `أهلاً بحضرتك! 🍔 منورنا في **ماركن كود**.

للمطاعم والكافيهات: بنبنيلك إعلانات بموقع جغرافي دقيق لنطاق التوصيل بتاعك، مع فيديوهات Reels تفتح النفس وأتمتة منيو الطلبات المباشرة على الواتساب ⚡🛍️`;
  }
  // 4. Clinics & Medical ("عياد", "دكتور", "طبيب", "أسنان", "تجميل", "باطنة")
  else if (norm.includes('عياد') || norm.includes('دكتور') || norm.includes('طبيب') || norm.includes('أسنان') || norm.includes('تجميل') || norm.includes('باطنة')) {
    replyText = `أهلاً بحضرتك يا دكتور! 🩺 منورنا في **ماركن كود**.

حلولنا للعيادات والمراكز الطبية زودت الحجوزات +180% وخفضت تكلفة المريض لـ 45%:
🎯 إعلانات موجهة لدكاترة الأسنان والتجميل والباطنة.
🛡️ ربط Meta CAPI وحجز المواعيد الآلي على الواتساب.

(تم إرفاق نموذج تصميم سابقة الأعمال فوق كصورة 🖼️)`;
    actionType = 'portfolio_item';
    mediaImageKey = 'dental';
  }
  // 5. Gym & Fitness Domain ("جيم", "لياقة", "رياضي", "gym")
  else if (norm.includes('جيم') || norm.includes('لياقة') || norm.includes('رياضي') || norm.includes('gym')) {
    replyText = `أهلاً بحضرتك! 🏋️‍♂️ صالات الرياضة محتاجة خطة سريعة لجذب المشتركين.

حققت حلولنا لسلسلة Nitro Gym زيادة في الاشتراكات +210% و 4.8x ROI من خلال ربط CAPI وتصميم 3D Landing Page لعروض الجيم 🚀✨

(تم إرفاق نموذج التصميم فوق كصورة 🖼️)`;
    actionType = 'portfolio_item';
    mediaImageKey = 'fitness';
  }
  // 6. Furniture Domain ("أثاث", "اثاث", "محل أثاث")
  else if (norm.includes('أثاث') || norm.includes('اثاث')) {
    replyText = `أهلاً بحضرتك! 🛋️ لمتاجر الأثاث: العرض الـ 3D التفاعلي مع إعلانات Meta CAPI بيخلي العميل يعاين قطعة الأثاث ويتفاعل معاها قبل الشراء.

التجربة دي حققت لمتجر FurniCraft مبيعات 1.25 مليون جنيه في 60 يوم بس! 🚀✨`;
    actionType = 'portfolio_item';
    mediaImageKey = 'ecommerce';
  }
  // 7. General Pattern "عندي" / "شركة" / "متجر" / "بيدج"
  else if (norm.includes('عندي') || norm.includes('بيدج') || norm.includes('صفحة') || norm.includes('شركة') || norm.includes('متجر')) {
    replyText = `أهلاً وسهلاً بحضرتك! 🚀 منورنا في **ماركن كود**.

إحنا بنكبر مبيعات الشركات والمتاجر من خلال:
1️⃣ إعلانات Meta & Google Ads مستهدفة صح.
2️⃣ ربط Meta CAPI عشان تتبع كل المبيعات بدقة 99%.
3️⃣ واجهات 3D وأتمتة الواتساب للطلب الفوري.

نقدر نساعد البزنس بتاعك إزاي النهاردة؟ 💡⚡`;
  }
  // 8. General Catch-All
  else {
    replyText = `أهلاً بحضرتك في مؤسسة ماركن كود! 🚀

بنعلي مبيعاتك وحجوزاتك من خلال إعلانات ممولة استراتيجية (Meta & Google Ads)، وربط Meta CAPI، وتصاميم 3D تفاعلية.

تحب نساعدك في إيه النهاردة؟ 💡`;
  }

  return {
    type: actionType,
    replyText,
    mediaImageKey
  };
}
