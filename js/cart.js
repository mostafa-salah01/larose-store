/**
 * La Rose Beauty & Cosmetics - Cart Manager & Drawer Controller
 * =========================================================================
 * إدارة السلة بالكامل عبر localStorage مع دعم الـ Drawer الجانبي وصفحة السلة
 * =========================================================================
 */

const Cart = {
  STORAGE_KEY: 'larose_cart_items',

  getItems() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn("Error reading cart:", e);
      return [];
    }
  },

  saveItems(items) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
      this.updateBadges();
      this.renderDrawer();
      // إذا كنا في صفحة cart.html نقوم بتحديثها أيضاً
      if (typeof window.renderCartPage === 'function') {
        window.renderCartPage();
      }
    } catch (e) {
      console.warn("Error saving cart:", e);
    }
  },

  addItem(product, size = null, quantity = 1) {
    if (!product || !product.slug) return;
    const items = this.getItems();
    const chosenSize = size || (product.sizes && product.sizes[0]) || "قياسي";
    
    // فحص ما إذا كان العنصر موجوداً مسبقاً بنفس الحجم
    const existingIndex = items.findIndex(item => item.slug === product.slug && item.size === chosenSize);
    
    if (existingIndex > -1) {
      items[existingIndex].quantity += quantity;
    } else {
      items.push({
        id: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand || "La Rose",
        price: product.price,
        oldPrice: product.oldPrice || null,
        size: chosenSize,
        quantity: quantity,
        image: (product.images && product.images[0]) || ''
      });
    }

    this.saveItems(items);
    this.showToast(`تمت إضافة "${product.name}" إلى سلتك`);
    this.openDrawer();
  },

  removeItem(slug, size) {
    let items = this.getItems();
    items = items.filter(item => !(item.slug === slug && item.size === size));
    this.saveItems(items);
    this.showToast("تم حذف المنتج من السلة");
  },

  updateQty(slug, size, delta) {
    let items = this.getItems();
    const target = items.find(item => item.slug === slug && item.size === size);
    if (!target) return;

    target.quantity += delta;
    if (target.quantity <= 0) {
      this.removeItem(slug, size);
      return;
    }

    this.saveItems(items);
  },

  clear() {
    this.saveItems([]);
  },

  getCount() {
    const items = this.getItems();
    return items.reduce((sum, item) => sum + item.quantity, 0);
  },

  getSubtotal() {
    const items = this.getItems();
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  getShippingFee() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;
    const threshold = (window.CONFIG && window.CONFIG.freeShippingThreshold) || 500;
    const standardFee = (window.CONFIG && window.CONFIG.shippingFee) || 50;
    return subtotal >= threshold ? 0 : standardFee;
  },

  getTotal() {
    return this.getSubtotal() + this.getShippingFee();
  },

  getFreeShippingRemaining() {
    const threshold = (window.CONFIG && window.CONFIG.freeShippingThreshold) || 500;
    const subtotal = this.getSubtotal();
    return Math.max(0, threshold - subtotal);
  },

  updateBadges() {
    const count = this.getCount();
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
    });
  },

  showToast(message) {
    let toast = document.getElementById('larose-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'larose-toast';
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  },

  openDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer && overlay) {
      this.renderDrawer();
      drawer.classList.add('open');
      overlay.classList.add('open');
      document.body.classList.add('drawer-open');
    }
  },

  closeDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer && overlay) {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      document.body.classList.remove('drawer-open');
    }
  },

  renderDrawer() {
    const container = document.getElementById('drawer-cart-items');
    const footerContainer = document.getElementById('drawer-cart-footer');
    const freeShippingProgress = document.getElementById('free-shipping-progress');
    const freeShippingText = document.getElementById('free-shipping-text');
    
    if (!container) return;

    const items = this.getItems();
    const subtotal = this.getSubtotal();
    const shipping = this.getShippingFee();
    const total = this.getTotal();
    const remaining = this.getFreeShippingRemaining();
    const threshold = (window.CONFIG && window.CONFIG.freeShippingThreshold) || 500;
    const percent = Math.min(100, Math.round((subtotal / threshold) * 100));

    // شريط الشحن المجاني
    if (freeShippingProgress && freeShippingText) {
      freeShippingProgress.style.width = `${percent}%`;
      if (subtotal === 0) {
        freeShippingText.innerHTML = `أضيفي منتجات بقيمة <strong>${threshold} ج.م</strong> للحصول على <strong>شحن مجاني</strong>!`;
      } else if (remaining === 0) {
        freeShippingText.innerHTML = `🎉 مبروك! لقد حصلتِ على <strong>شحن مجاني</strong> لطلبك!`;
      } else {
        freeShippingText.innerHTML = `تبقّى <strong>${remaining} ج.م</strong> فقط للحصول على <strong>شحن مجاني</strong>!`;
      }
    }

    if (items.length === 0) {
      container.innerHTML = `
        <div class="empty-cart-state">
          <div class="empty-cart-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
            </svg>
          </div>
          <h3>سلتك فارغة حالياً</h3>
          <p>تصفحي مجموعاتنا الرائعة من منتجات العناية بالبشرة والشعر واختاري ما يناسب جمالك.</p>
          <a href="skin.html" class="btn btn-primary" onclick="Cart.closeDrawer()">ابدئي التسوق الآن</a>
        </div>
      `;
      if (footerContainer) footerContainer.style.display = 'none';
      return;
    }

    if (footerContainer) footerContainer.style.display = 'block';

    let html = '';
    items.forEach(item => {
      html += `
        <div class="cart-drawer-item">
          <div class="cart-item-img-wrap">
            <div class="product-css-thumb" data-slug="${item.slug}">
              <span class="rose-icon">🌸</span>
            </div>
          </div>
          <div class="cart-item-details">
            <h4 class="cart-item-title"><a href="product.html?slug=${item.slug}">${item.name}</a></h4>
            <div class="cart-item-meta">الحجم: ${item.size}</div>
            <div class="cart-item-price">${item.price} ج.م</div>
            <div class="cart-item-actions">
              <div class="quantity-control-small">
                <button type="button" onclick="Cart.updateQty('${item.slug}', '${item.size}', -1)" aria-label="تقليل الكمية">-</button>
                <span>${item.quantity}</span>
                <button type="button" onclick="Cart.updateQty('${item.slug}', '${item.size}', 1)" aria-label="زيادة الكمية">+</button>
              </div>
              <button type="button" class="btn-remove-item" onclick="Cart.removeItem('${item.slug}', '${item.size}')" title="حذف المنتج">
                حذف
              </button>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    // تحديث الإجمالي في الفوتر
    const subtotalEl = document.getElementById('drawer-subtotal');
    const shippingEl = document.getElementById('drawer-shipping');
    const totalEl = document.getElementById('drawer-total');

    if (subtotalEl) subtotalEl.textContent = `${subtotal} ج.م`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'مجاناً' : `${shipping} ج.م`;
    if (totalEl) totalEl.textContent = `${total} ج.م`;
  }
};

if (typeof window !== "undefined") {
  window.Cart = Cart;
}
