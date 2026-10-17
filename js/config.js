/**
 * La Rose Beauty & Cosmetics - Global Configuration
 * يمكنك تعديل بيانات المتجر، رقم الواتساب، الدومين، ورسوم الشحن من هذا الملف مباشرة
 */
const CONFIG = {
  storeName: "La Rose Beauty & Cosmetics",
  storeTagline: "جمالك يبدأ بروتين يناسبك | منتجات عناية مختارة بعناية",
  // رقم الواتساب بصيغة دولية بدون علامة + (مثال لمصر: 201012345678)
  whatsappNumber: "201012345678",
  whatsappDisplay: "+20 101 234 5678",
  // الدومين الأساسي للمتجر (استبدله برابط GitHub Pages أو نطاقك الخاص)
  domain: "https://example.com",
  currency: "ج.م",
  shippingFee: 50,
  freeShippingThreshold: 500,
  // المحافظات المصرية المدعومة للشحن
  governorates: [
    "القاهرة",
    "الجيزة",
    "الإسكندرية",
    "القليوبية",
    "الدقهلية",
    "الشرقية",
    "المنوفية",
    "الغربية",
    "البحيرة",
    "دمياط",
    "كفر الشيخ",
    "بورسعيد",
    "الإسماعيلية",
    "السويس",
    "بني سويف",
    "الفيوم",
    "المنيا",
    "أسيوط",
    "سوهاج",
    "قنا",
    "الأقصر",
    "أسوان",
    "البحر الأحمر",
    "مطروح"
  ],
  supportEmail: "care@larosestore.com",
  workingHours: "يومياً من 10 صباحاً حتى 10 مساءً"
};

// إتاحة الكائن في النطاق العام للمتصفح
if (typeof window !== "undefined") {
  window.CONFIG = CONFIG;
}
