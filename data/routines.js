/**
 * La Rose Beauty & Cosmetics - Skincare & Haircare Routines
 * الروتينات الخمسة المنسقة لتقديم تجربة متكاملة للباقات والعناية اليومية
 */

const ROUTINES = [
  {
    slug: "dry-hair",
    htmlFile: "routine-dry-hair.html",
    title: "روتين الشعر الجاف والمتقصف",
    image: "images/routine-dry-hair.webp",
    badge: "شعر حريري ولامع",
    shortDesc: "روتين مخصص لإعادة المرونة واللمعان لخصلات الشعر الجافة وتخفيف مظهر التقصف والهيشان.",
    problemHelped: "يساعد في تحسين مظهر الشعر الجاف والباهت، ويعيد التغذية والمرونة للأطراف المجهدة نتيجة الحرارة والصبغات.",
    morningSteps: [
      {
        order: 1,
        title: "التغذية والحماية اليومية",
        instruction: "ضعي قطرتين خفيفتين من زيت الأرغان والورد على أطراف الشعر المنداة أو الجافة قبل التصفيف لتقليل الاحتكاك والهيشان."
      }
    ],
    eveningSteps: [
      {
        order: 1,
        title: "حمام الزيت الأسبوعي والتغذية المركزة",
        instruction: "دلكي الأطراف الجافة بزيت التغذية قبل الاستحمام بنصف ساعة، واغسلي بماء فاتر وشامبو لطيف، ثم استخدمي بلسم مرطب."
      },
      {
        order: 2,
        title: "حماية الشعر ليلاً",
        instruction: "استخدمي وسادة أو بونيه ستان حريري لحماية خصلات الشعر من الاحتكاك المسبب للجفاف أثناء النوم."
      }
    ],
    productSlugs: [
      "nourishing-argan-rose-hair-oil",
      "oriental-rose-hair-mist"
    ],
    bundlePrice: 380,
    originalPrice: 425,
    savingsText: "وفري 45 ج.م مع باقة روتين الشعر الجاف",
    disclaimer: "هذا الروتين تجميلي وليس تشخيصاً أو علاجاً طبياً."
  },
  {
    slug: "oily-skin",
    htmlFile: "routine-oily-skin.html",
    title: "روتين البشرة الدهنية والمختلطة",
    image: "images/routine-oily-skin.webp",
    badge: "توازن ونقاء بدون لمعان",
    shortDesc: "خطوات متناسقة للسيطرة على فرط الإفرازات الدهنية وتحسين مظهر المسام مع الحفاظ على ترطيب الحاجز الطبيعي.",
    problemHelped: "يساعد في تنظيم مظهر اللمعان الزائد، تنقية مظهر المسام الواسعة، والوقاية من المظهر الباهت دون التسبب في جفاف الجلد.",
    morningSteps: [
      {
        order: 1,
        title: "تنظيف لطيف للبشرة",
        instruction: "اغسلي وجهك بغسول مائي لطيف لإزالة الإفرازات الدهنية الليلية دون إثارة رد فعل تحسسي."
      },
      {
        order: 2,
        title: "تنظيم المسام واللمعان",
        instruction: "وزعي 3 قطرات من سيروم النياسيناميد 10% والزنك على كامل الوجه مع التربيت بلطف."
      },
      {
        order: 3,
        title: "حماية غير دهنية من الشمس",
        instruction: "طبقي واقي الشمس المخملي الشفاف SPF 50+ بمقدار إصبعين كاملين لحماية البشرة من اسمرار البقع الناتجة عن الشمس."
      }
    ],
    eveningSteps: [
      {
        order: 1,
        title: "التنظيف المسائي",
        instruction: "نظفي وجهك جيداً لإزالة الشوائب وبقايا واقي الشمس والدهون المتراكمة طوال النهار."
      },
      {
        order: 2,
        title: "دعم مظهر المسام والتجدد",
        instruction: "ضعي قطرات النياسيناميد مرة أخرى لتنقية مظهر البشرة أثناء الراحة الليلية."
      }
    ],
    productSlugs: [
      "niacinamide-zinc-balancing-serum",
      "invisible-velvet-sunscreen-spf50"
    ],
    bundlePrice: 470,
    originalPrice: 520,
    savingsText: "وفري 50 ج.م مع باقة البشرة الدهنية",
    disclaimer: "هذا الروتين تجميلي وليس تشخيصاً أو علاجاً طبياً."
  },
  {
    slug: "dry-skin",
    htmlFile: "routine-dry-skin.html",
    title: "روتين البشرة الجافة والترطيب المكثف",
    image: "images/routine-dry-skin.webp",
    badge: "ترطيب عميق وراحة فورية",
    shortDesc: "روتين حبس الرطوبة الثلاثي لإعادة النعومة والمرونة للبشرة الجافة ومنع التقشر والشعور بالشد.",
    problemHelped: "يساعد في تخفيف مظهر الجفاف والخطوط الرفيعة الناتجة عن قلة الماء، ودعم حاجز البشرة لتقليل التحسس وسرعة التهيج.",
    morningSteps: [
      {
        order: 1,
        title: "غسيل هادئ بالورد",
        instruction: "نظفي وجهك بغسول الورد اللطيف بالماء الفاتر لتنظيف ناعم يحافظ على ترطيب البشرة."
      },
      {
        order: 2,
        title: "حبس الرطوبة بالسيراميد",
        instruction: "ضعي كمية سخية من كريم السيراميد المكثف على بشرة رطبة قليلاً لدعم حاجز الرطوبة."
      },
      {
        order: 3,
        title: "الحماية من الجفاف والتبخر",
        instruction: "اختمي بواقي الشمس الفيلفيت المخملي لحماية البشرة من أشعة الشمس الجافة."
      }
    ],
    eveningSteps: [
      {
        order: 1,
        title: "تنظيف وترطيب ليلي",
        instruction: "كرري الغسول اللطيف للتخلص من ملوثات اليوم، ثم طبقي طبقة مهدئة من كريم السيراميد لتعويض البشرة أثناء النوم."
      }
    ],
    productSlugs: [
      "gentle-rose-hydrating-cleanser",
      "ceramide-barrier-repair-cream",
      "invisible-velvet-sunscreen-spf50"
    ],
    bundlePrice: 640,
    originalPrice: 725,
    savingsText: "وفري 85 ج.م مع باقة روتين البشرة الجافة",
    disclaimer: "هذا الروتين تجميلي وليس تشخيصاً أو علاجاً طبياً."
  },
  {
    slug: "curly-hair",
    htmlFile: "routine-curly-hair.html",
    title: "روتين الشعر الكيرلي وتحديد التموجات",
    image: "images/routine-curly-hair.webp",
    badge: "تموجات مرنة وثابتة بدون هيشان",
    shortDesc: "تكنيك وخطوات متخصصة للعناية بالشعر الكيرلي والمموج للحفاظ على الترطيب والشكل الطبيعي للتموجات.",
    problemHelped: "يساعد في منع هيشان الكيرلي، الحفاظ على ترطيب الخصلات ذات المسامية العالية، وتحديد التموجات دون إثقال الشعر.",
    morningSteps: [
      {
        order: 1,
        title: "تحديد وترطيب الخصلات (Styling)",
        instruction: "على شعر رطب جداً، وزعي كريم ليف-إن زبدة المانجو والكتان بالتساوي، واجمعي الخصلات بتقنية السكرنش لأعلى لتنشيط الكيرلي."
      },
      {
        order: 2,
        title: "اللمسة النهائية واللمعان",
        instruction: "بعد جفاف الشعر، ربتي بقطرة من زيت الأرغان لكسر أي طبقة جافة والحصول على تموجات ناعمة ولامعة."
      }
    ],
    eveningSteps: [
      {
        order: 1,
        title: "حماية التموجات أثناء النوم",
        instruction: "اربطي الشعر للأعلى بشكل الأناناس الفضفاض واستخدمي غطاء ستان لحماية شكل التموجات لليوم التالي دون الحاجة لغسيل يومي."
      }
    ],
    productSlugs: [
      "curl-defining-leave-in-cream",
      "nourishing-argan-rose-hair-oil"
    ],
    bundlePrice: 365,
    originalPrice: 405,
    savingsText: "وفري 40 ج.م مع باقة روتين الكيرلي",
    disclaimer: "هذا الروتين تجميلي وليس تشخيصاً أو علاجاً طبياً."
  },
  {
    slug: "sun-care",
    htmlFile: "routine-sun-care.html",
    title: "روتين الحماية من الشمس والعناية النهارية",
    image: "images/routine-sun-care.webp",
    badge: "حماية واسعة ونضارة مشرقة",
    shortDesc: "روتين الحماية اليومي الأساسي للوقاية من ظهور التصبغات ومظهر الشيخوخة المبكرة الناتجة عن التعرض للشمس.",
    problemHelped: "يساعد في الوقاية من اسمرار البشرة غير المتجانس وحروق الشمس وتلف الكولاجين الناجم عن الأشعة فوق البنفسجية اليومية.",
    morningSteps: [
      {
        order: 1,
        title: "غسيل وانتعاش",
        instruction: "نظفي وجهك بالغسول اللطيف بماء الورد لإعداد البشرة لامتصاص مستحضرات الحماية."
      },
      {
        order: 2,
        title: "مضادات الأكسدة",
        instruction: "ضعي سيروم النياسيناميد لدعم حماية البشرة من أضرار الجذور الحرة وعوامل التلوث البيئي."
      },
      {
        order: 3,
        title: "درع الحماية SPF 50+",
        instruction: "وزعي كمية كافية من واقي الشمس المخملي قبل الخروج بـ 15 دقيقة مع تجديده بعد ساعتين في حال التعرض للشمس."
      }
    ],
    eveningSteps: [
      {
        order: 1,
        title: "التنظيف المزدوج وإراحة البشرة",
        instruction: "تأكدي من إزالة واقي الشمس بالكامل ليلاً وترطيب البشرة بمرطب هادئ لتهدئتها بعد نهار مشمس."
      }
    ],
    productSlugs: [
      "gentle-rose-hydrating-cleanser",
      "niacinamide-zinc-balancing-serum",
      "invisible-velvet-sunscreen-spf50"
    ],
    bundlePrice: 630,
    originalPrice: 705,
    savingsText: "وفري 75 ج.م مع باقة الحماية المتكاملة",
    disclaimer: "هذا الروتين تجميلي وليس تشخيصاً أو علاجاً طبياً."
  }
];

if (typeof window !== "undefined") {
  window.ROUTINES = ROUTINES;
}
