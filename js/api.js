/**
 * La Rose Beauty & Cosmetics - Data Access Layer (API Wrapper)
 * =========================================================================
 * جميع عمليات قراءة وكتابة البيانات تمر عبر هذا الملف حصراً.
 * حالياً يقرأ من المتغيرات المحملة من data/ ويحفظ في localStorage.
 * عند نقل المتجر لسيرفر أو قاعدة بيانات لاحقاً، يتم استبدال محتوى هذه الدوال
 * بنداءات fetch() دون الحاجة لتعديل أي صفحة أو ملف واجهة آخر.
 * =========================================================================
 */

const API = {
  /**
   * جلب قائمة المنتجات مع دعم الفلترة والترتيب والبحث
   * @param {Object} options - { category, subcategory, problem, tag, isNew, isBestSeller, search, sort, limit }
   * @returns {Promise<Array>}
   */
  async getProducts(options = {}) {
    // محاكاة نداء غير متزامن للجاهزية المستقبلية
    let list = Array.isArray(window.PRODUCTS) ? [...window.PRODUCTS] : [];

    if (options.category) {
      list = list.filter(p => p.category === options.category);
    }

    if (options.subcategory) {
      list = list.filter(p => p.subcategory === options.subcategory);
    }

    if (options.problem) {
      const pLower = options.problem.toLowerCase();
      list = list.filter(p => 
        (p.problemTag && p.problemTag.toLowerCase().includes(pLower)) ||
        (p.shortDescription && p.shortDescription.toLowerCase().includes(pLower)) ||
        (p.suitableFor && p.suitableFor.toLowerCase().includes(pLower))
      );
    }

    if (options.tag) {
      list = list.filter(p => p.tags && p.tags.includes(options.tag));
    }

    if (options.isNew) {
      list = list.filter(p => p.isNew === true);
    }

    if (options.isBestSeller) {
      list = list.filter(p => p.isBestSeller === true);
    }

    if (options.search) {
      const q = options.search.trim().toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    // الترتيب
    if (options.sort === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (options.sort === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (options.sort === 'newest') {
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    if (options.limit && options.limit > 0) {
      list = list.slice(0, options.limit);
    }

    return list;
  },

  /**
   * جلب منتج واحد بواسطة الـ slug
   * @param {string} slug
   * @returns {Promise<Object|null>}
   */
  async getProduct(slug) {
    if (!window.PRODUCTS) return null;
    const found = window.PRODUCTS.find(p => p.slug === slug);
    return found ? { ...found } : null;
  },

  /**
   * جلب جميع الروتينات
   * @returns {Promise<Array>}
   */
  async getRoutines() {
    return Array.isArray(window.ROUTINES) ? [...window.ROUTINES] : [];
  },

  /**
   * جلب روتين بواسطة الـ slug
   * @param {string} slug
   * @returns {Promise<Object|null>}
   */
  async getRoutine(slug) {
    if (!window.ROUTINES) return null;
    const found = window.ROUTINES.find(r => r.slug === slug);
    return found ? { ...found } : null;
  },

  /**
   * جلب جميع المقالات
   * @returns {Promise<Array>}
   */
  async getArticles() {
    return Array.isArray(window.ARTICLES) ? [...window.ARTICLES] : [];
  },

  /**
   * جلب مقال بواسطة الـ slug
   * @param {string} slug
   * @returns {Promise<Object|null>}
   */
  async getArticle(slug) {
    if (!window.ARTICLES) return null;
    const found = window.ARTICLES.find(a => a.slug === slug);
    return found ? { ...found } : null;
  },

  /**
   * إنشاء طلب وحفظه محلياً في localStorage
   * @param {Object} orderData
   * @returns {Promise<Object>}
   */
  async createOrder(orderData) {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `LR-${new Date().getFullYear()}-${randomSuffix}`;

    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      status: "قيد المراجعة والتأكيد",
      paymentMethod: "cash_on_delivery",
      ...orderData
    };

    try {
      const rawOrders = localStorage.getItem('larose_orders');
      const orders = rawOrders ? JSON.parse(rawOrders) : [];
      orders.unshift(newOrder);
      localStorage.setItem('larose_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn("تعذر حفظ الطلب في localStorage:", e);
    }

    return newOrder;
  },

  /**
   * جلب طلب محدد برقم الطلب
   * @param {string} orderId
   * @returns {Promise<Object|null>}
   */
  async getOrder(orderId) {
    try {
      const rawOrders = localStorage.getItem('larose_orders');
      if (!rawOrders) return null;
      const orders = JSON.parse(rawOrders);
      return orders.find(o => o.orderId === orderId) || null;
    } catch (e) {
      return null;
    }
  },

  /**
   * إدارة المنتجات المشاهدة مؤخراً
   */
  getRecentProductSlugs() {
    try {
      const raw = localStorage.getItem('larose_recent_products');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  addRecentProductSlug(slug) {
    if (!slug) return;
    try {
      let list = this.getRecentProductSlugs();
      list = list.filter(s => s !== slug);
      list.unshift(slug);
      if (list.length > 6) list = list.slice(0, 6);
      localStorage.setItem('larose_recent_products', JSON.stringify(list));
    } catch (e) {
      // ignore
    }
  },

  async getRecentProducts(currentSlug = null) {
    let slugs = this.getRecentProductSlugs();
    if (currentSlug) {
      slugs = slugs.filter(s => s !== currentSlug);
    }
    const all = window.PRODUCTS || [];
    return slugs.map(s => all.find(p => p.slug === s)).filter(Boolean);
  }
};

if (typeof window !== "undefined") {
  window.API = API;
}
