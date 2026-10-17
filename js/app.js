/**
 * La Rose Beauty & Cosmetics - Main Application Controller
 * =========================================================================
 * التفاعل العام مع الواجهة، الهيدر، الفلاتر، صفحات الأقسام والمنتج والدفع
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

const App = {
  init() {
    this.setupHeader();
    this.setupDrawerEvents();
    this.setupSearch();
    this.setupQuickLinks();
    this.updateCartBadges();
    this.setupNewsletter();
    this.highlightActiveNav();
  },

  setupHeader() {
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-navigation');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');

    // تظليل الهيدر عند النزول
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    }, { passive: true });

    // القائمة الجانبية للموبايل
    if (menuToggle && mobileNav && mobileOverlay) {
      menuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.classList.toggle('nav-open');
      });

      mobileOverlay.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.classList.remove('nav-open');
      });

      const closeBtn = mobileNav.querySelector('.btn-close-nav');
      closeBtn?.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.classList.remove('nav-open');
      });
    }
  },

  setupDrawerEvents() {
    const overlay = document.getElementById('cart-overlay');
    const closeBtn = document.getElementById('btn-close-cart');
    const cartTriggers = document.querySelectorAll('.trigger-cart');

    cartTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.Cart?.openDrawer();
      });
    });

    overlay?.addEventListener('click', () => {
      window.Cart?.closeDrawer();
    });

    closeBtn?.addEventListener('click', () => {
      window.Cart?.closeDrawer();
    });
  },

  setupSearch() {
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && input.value.trim().length > 0) {
          e.preventDefault();
          const query = encodeURIComponent(input.value.trim());
          window.location.href = `skin.html?search=${query}`;
        }
      });
    });
  },

  setupQuickLinks() {
    // تحديث أي رابط واتساب بالرقم من config.js
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
   * دالة مساعدة لإنشاء بطاقة منتج HTML متوافقة مع كل الأجهزة
   * تعرض صورة بديلة أنيقة بالـ SVG إذا لم تتوفر الصورة بعد
   */
  renderProductCard(product) {
    const hasDiscount = product.oldPrice && product.oldPrice > product.price;
    const discountPercent = hasDiscount ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
    
    return `
      <article class="product-card" data-slug="${product.slug}" data-category="${product.category}">
        <div class="product-card-top">
          ${product.isNew ? '<span class="badge badge-new">جديد</span>' : ''}
          ${hasDiscount ? `<span class="badge badge-sale">-${discountPercent}%</span>` : ''}
          <a href="product.html?slug=${product.slug}" class="product-img-wrapper" title="${product.name}">
            <div class="product-svg-placeholder">
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
