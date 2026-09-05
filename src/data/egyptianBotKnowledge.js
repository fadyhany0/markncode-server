// Knowledge Base & Egyptian Dialect NLP Engine Data for Markncode AI Assistant

export const EGYPTIAN_DIALECT_DICTIONARY = {
  greetings: ['ازيك', 'ازيكم', 'مساء الخير', 'صباح الخير', 'سلام عليكم', 'أهلا', 'يا غالي', 'يا باشا', 'يا فنان'],
  pricing_keywords: ['بكام', 'الأسعار', 'باكدج', 'أسعاركم', 'تكلفة', 'خصم', 'عروض', 'الميزانية'],
  meta_keywords: ['إعلان ممول', 'ممول', 'فيس بوك', 'انستجرام', 'ميتا', 'Meta', 'إعلانات', 'حملة إعلانية', 'بيكسل', 'Pixel', 'CAPI'],
  web_keywords: ['موقع', 'لاندنج بيج', 'Landing Page', 'برمجة', 'تصميم', '3D', 'متجر', 'موقع تفاعلي', 'ويب سايت'],
  social_keywords: ['سوشيال ميديا', 'إدارة صفحات', 'محتوى', 'تصاميم', 'ريلز', 'Reels', 'فيديوهات', 'موديريتور'],
  audit_keywords: ['افحص', 'فحص', 'حلل', 'موقعي', 'لينك', 'صفحتي', 'مشاكل', 'سرعة'],
  competitor_keywords: ['منافس', 'منافسين', 'أكبر منافس', 'سوق', 'تحليل المنافس'],
  roi_keywords: ['عائد', 'ROI', 'أرباح', 'نتائج', 'كام عميل', 'النقرة', 'CPC']
};

export const SERVICES = [
  {
    id: 'meta_ads',
    title: 'حملات إعلانية ممولة (Meta & Google Ads)',
    description: 'بناء بنية تتبع متطورة (Meta Pixel + CAPI) للحصول على أعلى عائد ROI وتخفيض تكلفة العميل.',
    icon: 'Target',
    badge: 'الأعلى طلباً 🔥'
  },
  {
    id: 'web_3d',
    title: 'برمجة وتصميم 3D Landing Pages تفاعلية',
    description: 'واجهات مستخدم سريعة جداً وتجارب 3D تفاعلية تنقذ مبيعات الموقع وترفع نسبة التحويل (CR).',
    icon: 'Code2',
    badge: 'تقنية حصرية ⚡'
  },
  {
    id: 'social_mgmt',
    title: 'إدارة السوشيال ميديا وصناعة المحتوى',
    description: 'إدارة شاملة للمحتوى، تصميمات مبتكرة، صناعة فيديوهات Reels/Shorts، والرد على العملاء.',
    icon: 'Share2',
    badge: 'باقات متكاملة 🚀'
  }
];

export const BUSINESS_SIZES = [
  { id: 'startup', label: 'لسه ببدأ جديد (Startup / مشروع ناشئ)', budgetRange: '10k - 30k EGP / شهر' },
  { id: 'growing', label: 'بزنس شغال وعايز أوسع (Growing Business)', budgetRange: '30k - 100k EGP / شهر' },
  { id: 'enterprise', label: 'شركة كبيرة أو براند معروف (Enterprise / High-Ticket)', budgetRange: '+100k EGP / شهر' }
];

export const EGYPTIAN_VOICE_NOTES = [
  {
    id: 'vn_welcome',
    title: 'ترحيب بصوت مهندس المبيعات في ماركن كود',
    duration: '0:22',
    transcript: 'أهلاً بحضرتك! أنا مستشار التسويق الرقمي في ماركن كود. مبسوط جداً إنك بتتواصل معانا، وعايز أطمنك إننا بنبني شغلنا على أرقام وحقائق حقيقية مش مجرد إعلانات وخلاص. قولي تحب نبدأ بفحص موقعك ولا نعمل حسبة سريعة للـ ROI لحملتك؟'
  },
  {
    id: 'vn_audit_explain',
    title: 'توضيح تقرير الفحص والـ Pixel',
    duration: '0:35',
    transcript: 'بعد ما فحصنا اللينك بتاعك لاحظنا إن الـ Meta Pixel مش مربوط بـ CAPI بشكل صحيح وده بيضيع عليك أطياف واسعة من العملاء المستهدفين خاصة مستخدمي iOS. إحنا في ماركن كود بنحل المشكلة دي من أول يوم عشان كل جنيه في ميزانيتك يجيب قيمته وزيادة.'
  }
];

export const CASE_STUDIES = [
  {
    id: 'cs_beauty',
    client: 'مركز ديرما جلو للتجميل والجلدية (Derma Glow Clinic)',
    industry: 'عيادات تجميل وجلدية',
    result: 'تخفيض تكلفة العميل المحتمل (CPL) بنسبة 45% وتأمين 420 حجز',
    details: 'حملات Meta Ads استهداف دقيق لعلاجات الليزر والنضارة مع متابعة آلياً عبر الواتساب وربط CAPI.',
    metrics: { spent: '35,000 EGP', revenue: '165,000 EGP', leads: '420 حجز' }
  },
  {
    id: 'cs_dental',
    client: 'مركز برايت سمايل لطب وتجميل الأسنان (BrightSmile Dental Center)',
    industry: 'عيادات أسنان وتجميل أسنان',
    result: 'زيادة الحجوزات 180% وتأمين 350+ كشف وزراعة',
    details: 'استهداف دقيق لحالات تبييض وزراعة الأسنان وبناء Landing Page تفاعلية مع حجز مواعيد آلي.',
    metrics: { spent: '40,000 EGP', revenue: '210,000 EGP', leads: '350 حجز' }
  },
  {
    id: 'cs_internal_medicine',
    client: 'مركز الصفا التخصصي للباطنة والرعاية الشاملة (El-Safa Center)',
    industry: 'عيادات باطنة وجهاز هضمي',
    result: 'تخفيض تكلفة الاستحواذ على المريض 40%',
    details: 'حملات التوعية الصحية والفحص الشامل مع أتمتة الرد الفوري ومتابعة مرضى العيادة.',
    metrics: { spent: '30,000 EGP', revenue: '145,000 EGP', leads: '290 مريض' }
  },
  {
    id: 'cs_gym',
    client: 'سلسلة صالات رياضية فاخرة (Nitro Gym)',
    industry: 'جم وياقة بدنية',
    result: 'تحقيق 4.8x ROI وزيادة الاشتراكات بنسبة 210%',
    details: 'تم ربط Meta CAPI وتطوير Landing Page 3D تفاعلية تعبر عن أجهزة الجيم، مما ضاعف نسبة تحويل المبيعات.',
    metrics: { spent: '50,000 EGP', revenue: '240,000 EGP', leads: '680 عميل' }
  },
  {
    id: 'cs_ecommerce',
    client: 'متجر أثاث مودرن و 3D (FurniCraft)',
    industry: 'تجارة إلكترونية',
    result: 'بيع قطع أثاث بقيمة 1.2 مليون جنيه في 60 يوم',
    details: 'ديمو تفاعلي 3D يسمح للعميل بتحريك الغرفة وتجربتها قبل الشراء.',
    metrics: { spent: '120,000 EGP', revenue: '1,250,000 EGP', leads: '1,450 مبيعة' }
  }
];

export const FOLLOWUP_TEMPLATES = {
  h24: {
    delay: '24 ساعة',
    arabicText: 'صباح الخير 👋 يا رب تكون بخير. حبيت أطمن عليك هل شفت تقرير الفحص والعائد المتوقع لحملتك؟ لو حابب نناقش خطة التنفيذ المخصصة للبزنس بتاعك، تقدر تحجز مكالمة استشارية مدتها 15 دقيقة مجاناً مع فريقنا.',
    cta: 'حجز الاستشارة المجانية'
  },
  h48: {
    delay: '48 ساعة',
    arabicText: 'أهلاً بحضرتك 🚀 لاحظت إنك كنت بتسأل عن باقات التسويق وتطوير المواقع في ماركن كود. عندنا عرض خاص الأسبوع ده يشمل ربط الـ Meta CAPI و 3D Mockup مجاناً مع أول حملة إعلانية. تحب أبعتلك التفاصيل؟',
    cta: 'تفعيل العرض الخاص'
  }
};
