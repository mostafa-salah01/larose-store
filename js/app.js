/**
 * La Rose Beauty & Cosmetics - Main Application Controller
 * =========================================================================
 * التفاعل العام مع الواجهة، الهيدر، القائمة الجانبية للموبايل، الفلاتر، والسلة
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

const App = {
  init() {
    this.ensureMobileNav();
    this.ensureCartDrawer();
    this.ensureFooterCredits();
    this.setupHeader();
    this.setupDrawerEvents();
    this.setupSearch();
    this.setupQuickLinks();
    this.updateCartBadges();
    this.setupNewsletter();
    this.highlightActiveNav();
  },

  /**
   * التأكد من وجود القائمة الجانبية المتنقلة للموبايل في جميع الصفحات
   * وحقنها تلقائياً إن لم تكن متواجدة لضمان عمل زر القائمة على الهاتف 100%
   */
  ensureMobileNav() {
    let overlay = document.querySelector('.mobile-nav-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'mobile-nav-overlay';
      document.body.appendChild(overlay);
    }

    let mobileNav = document.querySelector('.mobile-navigation');
    if (!mobileNav) {
      mobileNav = document.createElement('aside');
      mobileNav.className = 'mobile-navigation';
      mobileNav.innerHTML = `
        <div class="mobile-nav-header">
          <img src="images/larose-logo.png" alt="La Rose Beauty & Cosmetics" height="38">
          <button type="button" class="btn-close-nav" aria-label="إغلاق القائمة">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="mobile-nav-body">
          <div style="margin-bottom: 16px;">
            <input type="search" class="search-input" placeholder="ابحثي عن منتج...">
          </div>
          <ul class="mobile-nav-list">
            <li><a href="index.html">الرئيسية</a></li>
            <li><a href="hair.html">الشعر</a></li>
            <li><a href="skin.html">البشرة</a></li>
            <li><a href="body.html">الجسم</a></li>
            <li><a href="fragrance.html">العطور والمخمريات</a></li>
            <li><a href="offers.html">العروض والباقات 🎁</a></li>
            <li><a href="new.html">وصل حديثاً ✨</a></li>
            <li><a href="routines.html">اختاري روتينك 🌸</a></li>
            <li><a href="guide.html">دليل الجمال</a></li>
            <li><a href="about.html">من نحن</a></li>
            <li><a href="contact.html">تواصل وواتساب</a></li>
          </ul>
        </div>
        <div class="mobile-nav-footer">
          <a href="contact.html" class="btn btn-whatsapp btn-block whatsapp-dynamic-link" data-message="مرحباً لا روز، أود المساعدة في اختيار الروتين المناسب">
            مساعدة فورية عبر واتساب
          </a>
        </div>
      `;
      document.body.appendChild(mobileNav);
    }
  },

  /**
   * التأكد من وجود درج السلة في كل الصفحات
   */
  ensureCartDrawer() {
    let overlay = document.getElementById('cart-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'cart-overlay';
      overlay.className = 'cart-overlay';
      document.body.appendChild(overlay);
    }

    let drawer = document.getElementById('cart-drawer');
    if (!drawer) {
      drawer = document.createElement('aside');
      drawer.id = 'cart-drawer';
      drawer.className = 'cart-drawer';
      drawer.setAttribute('aria-label', 'سلة التسوق');
      drawer.innerHTML = `
        <div class="cart-drawer-header">
          <div class="cart-drawer-title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
            </svg>
            <span>سلة مشترياتك</span>
          </div>
          <button type="button" class="btn-close-cart" id="btn-close-cart" aria-label="إغلاق السلة">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="free-shipping-meter">
          <div class="free-shipping-text" id="free-shipping-text">
            أضيفي منتجات بقيمة <strong>500 ج.م</strong> للحصول على <strong>شحن مجاني</strong>!
          </div>
          <div class="free-shipping-bar">
            <div class="free-shipping-progress" id="free-shipping-progress" style="width: 0%;"></div>
          </div>
        </div>
        <div class="cart-drawer-items" id="drawer-cart-items"></div>
        <div class="cart-drawer-footer" id="drawer-cart-footer">
          <div class="summary-row">
            <span>المجموع الفرعي:</span>
            <span id="drawer-subtotal">0 ج.م</span>
          </div>
          <div class="summary-row">
            <span>الشحن:</span>
            <span id="drawer-shipping">50 ج.م</span>
          </div>
          <div class="summary-row total-row">
            <span>الإجمالي النهائي:</span>
            <span id="drawer-total">0 ج.م</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <a href="checkout.html" class="btn btn-primary btn-block">متابعة إتمام الطلب</a>
            <a href="cart.html" class="btn btn-secondary btn-block">عرض السلة كاملة</a>
          </div>
        </div>
      `;
      document.body.appendChild(drawer);
    }
  },

  /**
   * إضافة توقيع المطور في أسفل كل الصفحات
   */
  ensureFooterCredits() {
    const footers = document.querySelectorAll('.footer-bottom');
    footers.forEach(footer => {
      let devCredit = footer.querySelector('.developer-credit');
      if (!devCredit) {
        devCredit = document.createElement('p');
        devCredit.className = 'developer-credit';
        devCredit.innerHTML = `صنع بواسطة <strong style="color: var(--pink);">Webstak</strong> | <a href="tel:01205798302" dir="ltr" style="color: var(--gold); font-weight: 700; text-decoration: underline;">01205798302</a>`;
        footer.appendChild(devCredit);
      }
    });
  },

  setupHeader() {
    const header = document.querySelector('.site-header');

    // تأثير الهيدر عند التمرير
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    }, { passive: true });

    // استماع شامل للنقر على زر القائمة المتنقلة للموبايل
    document.addEventListener('click', (e) => {
      const toggle = e.target.closest('.menu-toggle');
      if (toggle) {
        e.preventDefault();
        this.toggleMobileNav();
        return;
      }

      const close = e.target.closest('.btn-close-nav, .mobile-nav-overlay');
      if (close) {
        e.preventDefault();
        this.closeMobileNav();
        return;
      }

      // إغلاق القائمة عند النقر على أي رابط بداخلها
      const navLink = e.target.closest('.mobile-nav-list a');
      if (navLink) {
        this.closeMobileNav();
      }
    });
  },

  toggleMobileNav() {
    const mobileNav = document.querySelector('.mobile-navigation');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    if (mobileNav && mobileOverlay) {
      const isActive = mobileNav.classList.contains('active');
      if (isActive) {
        this.closeMobileNav();
      } else {
        this.openMobileNav();
      }
    }
  },

  openMobileNav() {
    const mobileNav = document.querySelector('.mobile-navigation');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    mobileNav?.classList.add('active');
    mobileOverlay?.classList.add('active');
    document.body.classList.add('nav-open');
  },

  closeMobileNav() {
    const mobileNav = document.querySelector('.mobile-navigation');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    mobileNav?.classList.remove('active');
    mobileOverlay?.classList.remove('active');
    document.body.classList.remove('nav-open');
  },

  setupDrawerEvents() {
    // استماع شامل لأزرار فتح وإغلاق السلة
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.trigger-cart');
      if (trigger) {
        e.preventDefault();
        window.Cart?.openDrawer();
        return;
      }

      const close = e.target.closest('#btn-close-cart, #cart-overlay');
      if (close) {
        e.preventDefault();
        window.Cart?.closeDrawer();
      }
    });
  },

  setupSearch() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const input = e.target.closest('.search-input');
        if (input && input.value.trim().length > 0) {
          e.preventDefault();
          const query = encodeURIComponent(input.value.trim());
          window.location.href = `skin.html?search=${query}`;
        }
      }
    });

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.search-btn');
      if (btn) {
        const form = btn.closest('form');
        const input = form?.querySelector('.search-input');
        if (input && input.value.trim().length > 0) {
          e.preventDefault();
          const query = encodeURIComponent(input.value.trim());
          window.location.href = `skin.html?search=${query}`;
        }
      }
    });
  },

  setupQuickLinks() {
    const waLinks = document.querySelectorAll('.whatsapp-dynamic-link');
    if (window.CONFIG && window.CONFIG.whatsappNumber) {
      const num = window.CONFIG.whatsappNumber;
      waLinks.forEach(link => {
        const text = encodeURIComponent(link.getAttribute('data-message') || "مرحباً متجر لا روز، أود الاستفسار عن منتجاتكم.");
        link.href = `https://wa.me/${num}?text=${text}`;
      });
    }
  },

  updateCartBadges() {
    if (window.Cart) {
      window.Cart.updateBadges();
    }
  },

  highlightActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a, .mobile-navigation a');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath) {
        link.classList.add('active');
      }
    });
  },

  setupNewsletter() {
    const form = document.getElementById('newsletter-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (input && input.value.trim()) {
          input.value = '';
          window.Cart?.showToast("شكراً لانضمامك إلى نادي جميلات لا روز 🌸");
        }
      });
    }
  },

  /**
   * دالة إنشاء بطاقة المنتج لعرض الصور الحقيقية الفاخرة لجميع المنتجات
   */
  renderProductCard(product) {
    const hasDiscount = product.oldPrice && product.oldPrice > product.price;
    const discountPercent = hasDiscount ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
    const primaryImage = (product.images && product.images[0]) || '';

    return `
      <article class="product-card" data-slug="${product.slug}" data-category="${product.category}">
        <div class="product-card-top">
          ${product.isNew ? '<span class="badge badge-new">جديد</span>' : ''}
          ${hasDiscount ? `<span class="badge badge-sale">-${discountPercent}%</span>` : ''}
          <a href="product.html?slug=${product.slug}" class="product-img-wrapper" title="${product.name}">
            ${primaryImage ? `
              <img 
                src="${primaryImage}" 
                alt="${product.name}" 
                class="product-img" 
                loading="lazy" 
                width="400" 
                height="400"
                onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';"
              >
            ` : ''}
            <div class="product-svg-placeholder" style="${primaryImage ? 'display: none;' : ''}">
              <svg viewBox="0 0 100 100" class="rose-vector" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="46" fill="#FDF7F4" stroke="#EBDED2" stroke-width="1.5"/>
                <path d="M50 22C42 22 34 30 34 40C34 52 48 64 50 78C52 64 66 52 66 40C66 30 58 22 50 22Z" fill="#E85A8C" fill-opacity="0.15" stroke="#E85A8C" stroke-width="1.8"/>
                <path d="M50 32C46 32 40 36 40 43C40 50 49 58 50 66C51 58 60 50 60 43C60 36 54 32 50 32Z" fill="#A8325E" fill-opacity="0.25"/>
                <circle cx="50" cy="42" r="6" fill="#E85A8C"/>
                <path d="M38 58C30 62 26 70 30 76C36 78 44 72 46 64" stroke="#C9A27E" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M62 58C70 62 74 70 70 76C64 78 56 72 54 64" stroke="#C9A27E" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <span class="product-category-sublabel">${product.brand || "La Rose"}</span>
            </div>
          </a>
        </div>
        
        <div class="product-card-body">
          <div class="product-brand">${product.brand || "La Rose Beauty"}</div>
          <h3 class="product-title">
            <a href="product.html?slug=${product.slug}">${product.name}</a>
          </h3>
          <p class="product-excerpt">${product.shortDescription || ""}</p>
          
          ${product.bestReason ? `
            <div class="product-best-reason">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <span>${product.bestReason}</span>
            </div>
          ` : ''}

          <div class="product-card-footer">
            <div class="product-pricing">
              <span class="current-price">${product.price} ج.م</span>
              ${hasDiscount ? `<span class="old-price">${product.oldPrice} ج.م</span>` : ''}
            </div>
            <button type="button" class="btn btn-add-cart" onclick="App.quickAddToCart('${product.slug}')" aria-label="أضيفي للسلة">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
              </svg>
              <span>أضيفي</span>
            </button>
          </div>
        </div>
      </article>
    `;
  },

  async quickAddToCart(slug) {
    const product = await window.API.getProduct(slug);
    if (product) {
      window.Cart.addItem(product, product.sizes ? product.sizes[0] : null, 1);
    }
  }
};

if (typeof window !== "undefined") {
  window.App = App;
}
