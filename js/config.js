/**
 * La Rose Beauty & Cosmetics - Global Configuration
 * يمكنك تعديل بيانات المتجر، رقم الواتساب، الدومين، ورسوم الشحن من هذا الملف مباشرة
 */
const CONFIG = {
  storeName: "La Rose Beauty & Cosmetics",
  storeTagline: "جمالك يبدأ بروتين يناسبك | منتجات عناية مختارة بعناية",
  // رقم الواتساب بصيغة دولية بدون علامة + (مثال لمصر: 201029424008)
  whatsappNumber: "201029424008",
  whatsappDisplay: "+20 10 2942 4008",
  // الدومين الأساسي للمتجر على GitHub Pages
  domain: "https://mostafa-salah01.github.io/larose-store",
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
  supportEmail: "mmarwarefaat123@gmail.com",
  workingHours: "يومياً من 10 صباحاً حتى 10 مساءً"
};

// إتاحة الكائن في النطاق العام للمتصفح
if (typeof window !== "undefined") {
  window.CONFIG = CONFIG;
}
