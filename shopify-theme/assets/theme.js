/* =============================================
   VELOUR SKIN — MASTER THEME JS
   Luxury Skincare Shopify 2.0 Theme
   ============================================= */

'use strict';

/* ─────────────────────────────────────────────
   UTILITIES
   ───────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);
const off = (el, ev, fn) => el && el.removeEventListener(ev, fn);
const emit = (el, name, detail = {}) => el.dispatchEvent(new CustomEvent(name, { detail, bubbles: true }));

function formatMoney(cents) {
  const amount = (cents / 100).toFixed(2);
  return `£${amount}`;
}

function debounce(fn, wait = 200) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
}

/* Focus trap — keeps keyboard navigation inside an element */
function createFocusTrap(el) {
  const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function getFocusable() {
    return [...el.querySelectorAll(FOCUSABLE)].filter(e => getComputedStyle(e).display !== 'none');
  }

  function handleKeydown(e) {
    if (e.key !== 'Tab') return;
    const els = getFocusable();
    if (!els.length) return;
    const first = els[0];
    const last = els[els.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  return {
    activate() { el.addEventListener('keydown', handleKeydown); },
    deactivate() { el.removeEventListener('keydown', handleKeydown); }
  };
}

/* ─────────────────────────────────────────────
   HEADER — Scroll behaviour + sticky
   ───────────────────────────────────────────── */
class SiteHeader {
  constructor() {
    this.el = $('.site-header');
    if (!this.el) return;
    this.scrolled = false;
    this.threshold = 60;
    this.onScroll = this.onScroll.bind(this);
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll();
  }

  onScroll() {
    const past = window.scrollY > this.threshold;
    if (past !== this.scrolled) {
      this.scrolled = past;
      this.el.classList.toggle('scrolled', past);
    }
  }
}

/* ─────────────────────────────────────────────
   MOBILE MENU
   ───────────────────────────────────────────── */
class MobileMenu {
  constructor() {
    this.menu = $('.mobile-menu');
    this.toggle = $('.header-mobile-toggle');
    this.close = $('.mobile-menu__close');
    this.overlay = null;
    if (!this.menu || !this.toggle) return;
    this.isOpen = false;
    this.bindEvents();
  }

  bindEvents() {
    on(this.toggle, 'click', () => this.open());
    on(this.close, 'click', () => this.closeMenu());
    on(document, 'keydown', (e) => { if (e.key === 'Escape' && this.isOpen) this.closeMenu(); });
  }

  open() {
    this.isOpen = true;
    this.menu.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    this.menu.setAttribute('aria-hidden', 'false');
    this.toggle.setAttribute('aria-expanded', 'true');
    if (!this.trap) this.trap = createFocusTrap(this.menu);
    this.trap.activate();
    if (this.close) this.close.focus();
  }

  closeMenu() {
    this.isOpen = false;
    this.menu.classList.remove('is-open');
    document.body.style.overflow = '';
    this.menu.setAttribute('aria-hidden', 'true');
    this.toggle.setAttribute('aria-expanded', 'false');
    if (this.trap) this.trap.deactivate();
    if (this.toggle) this.toggle.focus();
  }
}

/* ─────────────────────────────────────────────
   ANNOUNCEMENT BAR — Dismiss
   ───────────────────────────────────────────── */
class AnnouncementBar {
  constructor() {
    this.bar = $('.announcement-bar');
    this.closeBtn = $('.announcement-bar__close');
    if (!this.bar || !this.closeBtn) return;

    if (sessionStorage.getItem('ann-dismissed')) {
      this.bar.remove();
      return;
    }

    on(this.closeBtn, 'click', () => {
      this.bar.style.maxHeight = this.bar.offsetHeight + 'px';
      requestAnimationFrame(() => {
        this.bar.style.transition = 'max-height 0.35s ease, opacity 0.35s ease';
        this.bar.style.maxHeight = '0';
        this.bar.style.opacity = '0';
        this.bar.style.overflow = 'hidden';
      });
      setTimeout(() => this.bar.remove(), 360);
      sessionStorage.setItem('ann-dismissed', '1');
    });
  }
}

/* ─────────────────────────────────────────────
   CART DRAWER
   ───────────────────────────────────────────── */
class CartDrawer {
  constructor() {
    this.drawer = $('#cart-drawer');
    this.overlay = $('#cart-overlay');
    this.openBtns = $$('[data-cart-open]');
    this.closeBtn = $('#cart-drawer-close');
    this.itemsContainer = $('#cart-items');
    this.subtotalEl = $('#cart-subtotal');
    this.countEls = $$('[data-cart-count]');
    if (!this.drawer) return;
    this.isOpen = false;
    this.bindEvents();
    this.fetchCart();
  }

  bindEvents() {
    this.openBtns.forEach(btn => on(btn, 'click', () => this.open()));
    on(this.closeBtn, 'click', () => this.close());
    on(this.overlay, 'click', () => this.close());
    on(document, 'keydown', (e) => { if (e.key === 'Escape' && this.isOpen) this.close(); });
    on(document, 'cart:open', () => this.open());
    on(document, 'cart:refresh', () => this.fetchCart());
  }

  open() {
    this.isOpen = true;
    this.drawer.classList.add('is-open');
    this.overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    this.drawer.setAttribute('aria-hidden', 'false');
    if (!this.trap) this.trap = createFocusTrap(this.drawer);
    this.trap.activate();
    if (this.closeBtn) setTimeout(() => this.closeBtn.focus(), 60);
    this.fetchCart();
  }

  close() {
    this.isOpen = false;
    this.drawer.classList.remove('is-open');
    this.overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    this.drawer.setAttribute('aria-hidden', 'true');
    if (this.trap) this.trap.deactivate();
  }

  async fetchCart() {
    try {
      const res = await fetch('/cart.js');
      const cart = await res.json();
      this.render(cart);
      this.updateCount(cart.item_count);
    } catch (e) {
      console.warn('Cart fetch failed:', e);
    }
  }

  updateCount(count) {
    this.countEls.forEach(el => {
      el.textContent = count;
      el.dataset.count = count;
    });
    /* Screen reader announcement */
    const live = $('#cart-live-region');
    if (live && count > 0) {
      live.textContent = '';
      setTimeout(() => {
        live.textContent = `${count} item${count !== 1 ? 's' : ''} added to your bag.`;
      }, 50);
    }
  }

  render(cart) {
    if (!this.itemsContainer) return;

    if (cart.item_count === 0) {
      this.itemsContainer.innerHTML = `
        <div class="cart-drawer__empty">
          <p>Your ritual awaits.</p>
          <a href="/collections/all" class="btn btn--primary btn--sm" onclick="window.cartDrawer.close()">
            Explore Serums
          </a>
        </div>`;
      if (this.subtotalEl) this.subtotalEl.textContent = formatMoney(0);
      return;
    }

    const itemsHTML = cart.items.map(item => `
      <div class="cart-item" data-line-key="${item.key}">
        <div class="cart-item__image">
          <img src="${item.image}" alt="${item.title}" width="96" height="120" loading="lazy">
        </div>
        <div class="cart-item__details">
          <p class="cart-item__name">${item.product_title}</p>
          ${item.variant_title ? `<p class="cart-item__variant">${item.variant_title}</p>` : ''}
          <p class="cart-item__price">${formatMoney(item.final_line_price)}</p>
          <div class="cart-item__footer">
            <div class="cart-item__qty">
              <button class="cart-item__qty-btn" data-qty-action="decrease" data-key="${item.key}" aria-label="Decrease quantity">−</button>
              <span class="cart-item__qty-num">${item.quantity}</span>
              <button class="cart-item__qty-btn" data-qty-action="increase" data-key="${item.key}" aria-label="Increase quantity">+</button>
            </div>
            <button class="cart-item__remove" data-remove-key="${item.key}">Remove</button>
          </div>
        </div>
      </div>
    `).join('');

    this.itemsContainer.innerHTML = `<div class="cart-items">${itemsHTML}</div>`;

    if (this.subtotalEl) this.subtotalEl.textContent = formatMoney(cart.total_price);

    /* Upsell section */
    this.renderUpsells(cart);

    // Bind quantity change events
    $$('[data-qty-action]', this.itemsContainer).forEach(btn => {
      on(btn, 'click', () => {
        const key = btn.dataset.key;
        const action = btn.dataset.qtyAction;
        const qtyEl = btn.closest('.cart-item__qty').querySelector('.cart-item__qty-num');
        const current = parseInt(qtyEl.textContent);
        const newQty = action === 'increase' ? current + 1 : Math.max(0, current - 1);
        this.changeQuantity(key, newQty);
      });
    });

    $$('[data-remove-key]', this.itemsContainer).forEach(btn => {
      on(btn, 'click', () => this.changeQuantity(btn.dataset.removeKey, 0));
    });
  }

  async changeQuantity(key, quantity) {
    try {
      const res = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, quantity })
      });
      const cart = await res.json();
      this.render(cart);
      this.updateCount(cart.item_count);
    } catch (e) {
      console.warn('Cart change failed:', e);
    }
  }

  renderUpsells(cart) {
    /* Remove any existing upsell block */
    const existing = this.itemsContainer.querySelector('#cart-upsells');
    if (existing) existing.remove();

    const upsells = window.velourUpsells || [];
    if (!upsells.length) return;

    /* Filter out items already in cart */
    const cartVariantIds = new Set(cart.items.map(i => String(i.variant_id)));
    const available = upsells.filter(u => !cartVariantIds.has(String(u.variantId)));
    if (!available.length) return;

    const html = `
      <div id="cart-upsells" class="cart-upsell">
        <p class="cart-upsell__label">Complete your ritual</p>
        <div class="cart-upsell__items">
          ${available.slice(0, 2).map(u => `
            <div class="cart-upsell-item">
              <div class="cart-upsell-item__image">
                ${u.image ? `<img src="${u.image}" alt="${u.title}" loading="lazy" width="52" height="64">` : ''}
              </div>
              <div class="cart-upsell-item__info">
                <p class="cart-upsell-item__name">${u.title}</p>
                <p class="cart-upsell-item__desc">${u.desc || ''}</p>
                <p class="cart-upsell-item__price">${formatMoney(u.price)}</p>
              </div>
              <button
                class="cart-upsell-item__add"
                data-upsell-add
                data-variant-id="${u.variantId}"
                aria-label="Add ${u.title} to your bag">Add</button>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.itemsContainer.insertAdjacentHTML('beforeend', html);

    $$('[data-upsell-add]', this.itemsContainer).forEach(btn => {
      on(btn, 'click', async () => {
        const variantId = btn.dataset.variantId;
        if (!variantId) return;
        const original = btn.textContent;
        btn.textContent = '...';
        btn.disabled = true;
        try {
          const res = await fetch('/cart/add.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: variantId, quantity: 1 })
          });
          if (res.ok) {
            btn.textContent = 'Added';
            btn.classList.add('added');
            await this.fetchCart();
          } else {
            btn.textContent = original;
            btn.disabled = false;
          }
        } catch {
          btn.textContent = original;
          btn.disabled = false;
        }
      });
    });
  }
}

/* ─────────────────────────────────────────────
   ADD TO CART
   ───────────────────────────────────────────── */
class AddToCart {
  constructor() {
    on(document, 'submit', async (e) => {
      const form = e.target.closest('[data-product-form]');
      if (!form) return;
      e.preventDefault();
      await this.handle(form);
    });

    // Quick-add buttons on product cards
    on(document, 'click', async (e) => {
      const btn = e.target.closest('[data-quick-add]');
      if (!btn) return;
      e.preventDefault();
      const variantId = btn.dataset.variantId;
      if (!variantId) return;
      await this.addItem(variantId, 1, btn);
    });
  }

  async handle(form) {
    const btn = form.querySelector('[data-atc-btn]');
    const data = new FormData(form);
    const variantId = data.get('id');
    const quantity = parseInt(data.get('quantity') || 1);
    await this.addItem(variantId, quantity, btn);
  }

  async addItem(variantId, quantity, btn) {
    if (btn) {
      btn.classList.add('loading');
      btn.textContent = 'Adding...';
    }

    try {
      const res = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: variantId, quantity })
      });

      if (!res.ok) throw new Error('Add to cart failed');

      if (btn) {
        btn.textContent = 'Added!';
        setTimeout(() => {
          btn.classList.remove('loading');
          btn.textContent = btn.dataset.originalText || 'Add to Bag';
        }, 1500);
      }

      emit(document, 'cart:refresh');
      emit(document, 'cart:open');

    } catch (err) {
      console.warn('Add to cart error:', err);
      if (btn) {
        btn.textContent = 'Sold Out';
        btn.classList.remove('loading');
      }
    }
  }
}

/* ─────────────────────────────────────────────
   PRODUCT GALLERY
   ───────────────────────────────────────────── */
class ProductGallery {
  constructor(el) {
    this.el = el;
    this.mainImg = $('[data-gallery-main]', el);
    this.thumbs = $$('[data-gallery-thumb]', el);
    if (!this.mainImg || !this.thumbs.length) return;
    this.bindEvents();
  }

  bindEvents() {
    this.thumbs.forEach(thumb => {
      on(thumb, 'click', () => this.setActive(thumb));
    });
  }

  setActive(thumb) {
    this.thumbs.forEach(t => t.classList.remove('is-active'));
    thumb.classList.add('is-active');

    const src = thumb.dataset.src;
    const srcset = thumb.dataset.srcset;

    this.mainImg.style.opacity = '0.6';
    this.mainImg.src = src;
    if (srcset) this.mainImg.srcset = srcset;
    this.mainImg.onload = () => { this.mainImg.style.opacity = '1'; };
  }
}

/* ─────────────────────────────────────────────
   PRODUCT TABS
   ───────────────────────────────────────────── */
class ProductTabs {
  constructor(el) {
    this.el = el;
    this.btns = $$('[data-tab-btn]', el);
    this.panels = $$('[data-tab-panel]', el);
    if (!this.btns.length) return;
    this.bindEvents();
  }

  bindEvents() {
    this.btns.forEach(btn => {
      on(btn, 'click', () => {
        const target = btn.dataset.tabBtn;
        this.btns.forEach(b => b.classList.remove('is-active'));
        this.panels.forEach(p => p.classList.remove('is-active'));
        btn.classList.add('is-active');
        const panel = $(`[data-tab-panel="${target}"]`, this.el);
        if (panel) panel.classList.add('is-active');
      });
    });
  }
}

/* ─────────────────────────────────────────────
   QUANTITY ADJUSTER
   ───────────────────────────────────────────── */
class QuantityAdjuster {
  constructor(el) {
    this.el = el;
    this.input = $('[data-qty-input]', el);
    this.decBtn = $('[data-qty-dec]', el);
    this.incBtn = $('[data-qty-inc]', el);
    if (!this.input) return;
    this.min = parseInt(this.input.min || 1);
    this.max = parseInt(this.input.max || 99);
    this.bindEvents();
  }

  bindEvents() {
    on(this.decBtn, 'click', () => this.adjust(-1));
    on(this.incBtn, 'click', () => this.adjust(+1));
    on(this.input, 'change', () => this.clamp());
  }

  adjust(delta) {
    const val = parseInt(this.input.value) + delta;
    this.input.value = Math.max(this.min, Math.min(this.max, val));
    this.updateBtns();
  }

  clamp() {
    const val = parseInt(this.input.value);
    this.input.value = isNaN(val) ? this.min : Math.max(this.min, Math.min(this.max, val));
    this.updateBtns();
  }

  updateBtns() {
    if (this.decBtn) this.decBtn.disabled = parseInt(this.input.value) <= this.min;
    if (this.incBtn) this.incBtn.disabled = parseInt(this.input.value) >= this.max;
  }
}

/* ─────────────────────────────────────────────
   ACCORDION
   ───────────────────────────────────────────── */
class Accordion {
  constructor(el) {
    this.el = el;
    this.items = $$('[data-accordion-item]', el);
    this.bindEvents();
  }

  bindEvents() {
    this.items.forEach(item => {
      const trigger = $('[data-accordion-trigger]', item);
      const content = $('[data-accordion-content]', item);
      if (!trigger || !content) return;

      // Set initial heights
      content.style.maxHeight = '0';
      content.style.overflow = 'hidden';
      content.style.transition = 'max-height 0.36s cubic-bezier(0.16, 1, 0.3, 1)';

      on(trigger, 'click', () => {
        const isOpen = item.classList.contains('is-open');
        // Close all
        this.items.forEach(i => {
          i.classList.remove('is-open');
          const c = $('[data-accordion-content]', i);
          if (c) c.style.maxHeight = '0';
        });
        // Open clicked if it was closed
        if (!isOpen) {
          item.classList.add('is-open');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  }
}

/* ─────────────────────────────────────────────
   SERUM FINDER QUIZ
   ───────────────────────────────────────────── */
class SerumQuiz {
  constructor(el) {
    this.el = el;
    if (!this.el) return;

    this.answers = {};
    this.currentStep = 1;
    this.totalSteps = 4;

    this.steps = $$('[data-quiz-step]', el);
    this.progressFill = $('[data-quiz-progress]', el);
    this.progressText = $('[data-quiz-progress-text]', el);
    this.resultsEl = $('[data-quiz-results]', el);
    this.resultsGrid = $('[data-quiz-results-grid]', el);
    this.restartBtn = $('[data-quiz-restart]', el);

    this.bindEvents();
    this.updateProgress();
  }

  bindEvents() {
    // Option selection
    on(this.el, 'click', (e) => {
      const option = e.target.closest('[data-quiz-option]');
      if (!option) return;
      const step = option.closest('[data-quiz-step]');
      if (!step) return;

      // Deselect siblings
      $$('[data-quiz-option]', step).forEach(o => o.classList.remove('is-selected'));
      option.classList.add('is-selected');

      const key = step.dataset.quizStep;
      this.answers[key] = option.dataset.value;

      setTimeout(() => this.nextStep(), 400);
    });

    // Back buttons
    on(this.el, 'click', (e) => {
      if (e.target.closest('[data-quiz-back]')) this.prevStep();
    });

    // Restart
    on(this.restartBtn, 'click', () => this.restart());
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.showStep(++this.currentStep);
    } else {
      this.showResults();
    }
  }

  prevStep() {
    if (this.currentStep > 1) this.showStep(--this.currentStep);
  }

  showStep(n) {
    this.steps.forEach(s => s.classList.remove('is-active'));
    const next = $(`[data-quiz-step="${n}"]`, this.el);
    if (next) next.classList.add('is-active');
    if (this.resultsEl) this.resultsEl.classList.remove('is-active');
    this.updateProgress();
  }

  updateProgress() {
    const pct = ((this.currentStep - 1) / this.totalSteps) * 100;
    if (this.progressFill) this.progressFill.style.width = pct + '%';
    if (this.progressText) this.progressText.textContent = `${this.currentStep} of ${this.totalSteps}`;
  }

  showResults() {
    this.steps.forEach(s => s.classList.remove('is-active'));
    if (this.resultsEl) this.resultsEl.classList.add('is-active');
    if (this.progressFill) this.progressFill.style.width = '100%';
    const products = this.getRecommendations();
    this.renderResults(products);
  }

  getRecommendations() {
    const concern = this.answers['concern'] || 'hydration';
    const skinType = this.answers['skin-type'] || 'normal';

    const map = {
      'hydration-oily':        ['hydra-boost-serum', 'niacinamide-clear', 'pore-refine-serum'],
      'hydration-dry':         ['hydra-boost-serum', 'peptide-firming', 'calm-barrier'],
      'hydration-combination': ['hydra-boost-serum', 'niacinamide-clear', 'pore-refine-serum'],
      'hydration-sensitive':   ['hydra-boost-serum', 'calm-barrier'],
      'hydration-normal':      ['hydra-boost-serum', 'luminance-serum', 'peptide-firming'],
      'brightening-oily':      ['vitamin-c-radiance', 'niacinamide-clear', 'pore-refine-serum'],
      'brightening-dry':       ['luminance-serum', 'hydra-boost-serum', 'peptide-firming'],
      'brightening-combination':['vitamin-c-radiance', 'niacinamide-clear'],
      'brightening-sensitive': ['luminance-serum', 'calm-barrier'],
      'brightening-normal':    ['vitamin-c-radiance', 'luminance-serum'],
      'anti-aging-oily':       ['retinol-renewal', 'niacinamide-clear', 'hydra-boost-serum'],
      'anti-aging-dry':        ['peptide-firming', 'hydra-boost-serum', 'retinol-renewal'],
      'anti-aging-combination':['retinol-renewal', 'peptide-firming'],
      'anti-aging-sensitive':  ['peptide-firming', 'calm-barrier'],
      'anti-aging-normal':     ['retinol-renewal', 'peptide-firming', 'hydra-boost-serum'],
      'pores-oily':            ['pore-refine-serum', 'niacinamide-clear', 'vitamin-c-radiance'],
      'pores-dry':             ['pore-refine-serum', 'hydra-boost-serum'],
      'pores-combination':     ['pore-refine-serum', 'niacinamide-clear'],
      'pores-sensitive':       ['calm-barrier', 'niacinamide-clear'],
      'pores-normal':          ['pore-refine-serum', 'niacinamide-clear'],
      'sensitivity-oily':      ['calm-barrier', 'niacinamide-clear'],
      'sensitivity-dry':       ['calm-barrier', 'hydra-boost-serum'],
      'sensitivity-combination':['calm-barrier', 'niacinamide-clear'],
      'sensitivity-sensitive': ['calm-barrier', 'hydra-boost-serum'],
      'sensitivity-normal':    ['calm-barrier', 'hydra-boost-serum'],
    };

    const key = `${concern}-${skinType}`;
    return map[key] || ['hydra-boost-serum', 'luminance-serum', 'calm-barrier'];
  }

  renderResults(handles) {
    if (!this.resultsGrid) return;
    this.resultsGrid.innerHTML = handles.slice(0, 3).map(handle => `
      <a href="/products/${handle}" class="product-card" style="text-decoration:none">
        <div class="product-card__media">
          <div style="width:100%;height:100%;background:var(--c-mint);display:flex;align-items:center;justify-content:center;">
            <span style="color:var(--c-sage);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;">Image</span>
          </div>
        </div>
        <div class="product-card__info">
          <p class="product-card__category">Recommended for you</p>
          <p class="product-card__name">${handle.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}</p>
          <div class="product-card__footer">
            <span class="product-card__price">Shop Now</span>
          </div>
        </div>
      </a>
    `).join('');
  }

  restart() {
    this.answers = {};
    this.currentStep = 1;
    this.steps.forEach(s => s.classList.remove('is-active'));
    if (this.resultsEl) this.resultsEl.classList.remove('is-active');
    const first = $('[data-quiz-step="1"]', this.el);
    if (first) first.classList.add('is-active');
    $$('[data-quiz-option]', this.el).forEach(o => o.classList.remove('is-selected'));
    this.updateProgress();
  }
}

/* ─────────────────────────────────────────────
   ROUTINE BUILDER
   ───────────────────────────────────────────── */
class RoutineBuilder {
  constructor(el) {
    this.el = el;
    if (!this.el) return;

    this.tabs = $$('[data-skin-type]', el);
    this.contents = $$('[data-routine-content]', el);

    this.tabs.forEach(tab => {
      on(tab, 'click', () => {
        const type = tab.dataset.skinType;
        this.tabs.forEach(t => t.classList.remove('is-active'));
        this.contents.forEach(c => c.classList.remove('is-active'));
        tab.classList.add('is-active');
        const content = $(`[data-routine-content="${type}"]`, this.el);
        if (content) content.classList.add('is-active');
      });
    });

    // Activate first tab
    if (this.tabs[0]) this.tabs[0].click();
  }
}

/* ─────────────────────────────────────────────
   SCROLL REVEAL — Intersection Observer
   ───────────────────────────────────────────── */
class ScrollReveal {
  constructor() {
    const SELECTORS = '.reveal, .reveal-scale, .reveal-left, .reveal-right';

    if (!('IntersectionObserver' in window)) {
      $$(SELECTORS).forEach(el => el.classList.add('is-visible'));
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
    );

    $$(SELECTORS).forEach(el => this.observer.observe(el));
  }
}

/* ─────────────────────────────────────────────
   COLLECTION FILTERS
   ───────────────────────────────────────────── */
class CollectionFilters {
  constructor() {
    this.groups = $$('[data-filter-group]');
    this.groups.forEach(group => {
      const label = $('[data-accordion-trigger]', group);
      const options = $('[data-filter-options]', group);
      if (!label || !options) return;

      let open = true;
      options.style.maxHeight = options.scrollHeight + 'px';
      options.style.overflow = 'hidden';
      options.style.transition = 'max-height 0.3s ease';

      on(label, 'click', () => {
        open = !open;
        options.style.maxHeight = open ? options.scrollHeight + 'px' : '0';
        group.classList.toggle('is-collapsed', !open);
      });
    });

    // Filter checkboxes
    on(document, 'change', (e) => {
      const input = e.target.closest('[data-filter-input]');
      if (input) this.applyFilters();
    });

    // Sort
    const sort = $('[data-sort-select]');
    if (sort) on(sort, 'change', () => this.applyFilters());
  }

  applyFilters() {
    const params = new URLSearchParams(window.location.search);
    const checkedFilters = $$('[data-filter-input]:checked');

    // Clear existing filter params (keep page etc.)
    const filterKeys = new Set($$('[data-filter-input]').map(i => i.name));
    filterKeys.forEach(k => params.delete(k));

    checkedFilters.forEach(input => {
      params.append(input.name, input.value);
    });

    params.delete('page');
    window.location.search = params.toString();
  }
}

/* ─────────────────────────────────────────────
   VARIANT SELECTOR
   ───────────────────────────────────────────── */
class VariantSelector {
  constructor(el) {
    this.el = el;
    this.form = $('[data-product-form]', el) || el.closest('[data-product-form]');
    this.variantInput = $('[name="id"]', this.form);
    this.btns = $$('[data-option-value]', el);
    this.priceEl = $('[data-product-price]', el);
    this.comparePriceEl = $('[data-compare-price]', el);
    this.atcBtn = $('[data-atc-btn]', el);

    try {
      this.variants = JSON.parse($('[data-variants-json]', el)?.textContent || '[]');
    } catch { this.variants = []; }

    this.selections = {};
    this.bindEvents();
  }

  bindEvents() {
    this.btns.forEach(btn => {
      on(btn, 'click', () => {
        const option = btn.dataset.optionName;
        const value = btn.dataset.optionValue;

        // Update visual state for this option group
        $$(`[data-option-name="${option}"]`, this.el).forEach(b => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');

        this.selections[option] = value;
        this.updateVariant();
      });
    });
  }

  updateVariant() {
    const matched = this.variants.find(v => {
      return v.options.every((opt, i) => {
        const key = `option${i + 1}`;
        return !this.selections[`option${i}`] || this.selections[`option${i}`] === opt;
      });
    });

    // More robust: match by selected option values
    const selectedValues = Object.values(this.selections);
    const variant = this.variants.find(v =>
      selectedValues.every(val => v.options.includes(val))
    );

    if (variant) {
      if (this.variantInput) this.variantInput.value = variant.id;
      if (this.priceEl) this.priceEl.textContent = formatMoney(variant.price);
      if (this.comparePriceEl) {
        if (variant.compare_at_price > variant.price) {
          this.comparePriceEl.textContent = formatMoney(variant.compare_at_price);
          this.comparePriceEl.style.display = '';
        } else {
          this.comparePriceEl.style.display = 'none';
        }
      }
      if (this.atcBtn) {
        const avail = variant.available;
        this.atcBtn.disabled = !avail;
        this.atcBtn.dataset.originalText = avail ? 'Add to Bag' : 'Sold Out';
        this.atcBtn.textContent = avail ? 'Add to Bag' : 'Sold Out';
      }
    }
  }
}

/* ─────────────────────────────────────────────
   SMOOTH HORIZONTAL PRESS SCROLL
   ───────────────────────────────────────────── */
class PressStrip {
  constructor() {
    const track = $('.press-strip__track');
    if (!track) return;
    // Duplicate items for seamless loop
    const clone = track.cloneNode(true);
    track.parentElement.appendChild(clone);
  }
}

/* ─────────────────────────────────────────────
   CONTACT FORM
   ───────────────────────────────────────────── */
class ContactForm {
  constructor() {
    const form = $('[data-contact-form]');
    if (!form) return;

    on(form, 'submit', async (e) => {
      e.preventDefault();
      const btn = $('[data-contact-submit]', form);
      const success = $('[data-contact-success]');

      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending...';
      }

      // Shopify handles contact form via standard POST to /contact
      // For AJAX-style, we submit normally
      const data = new FormData(form);
      try {
        await fetch('/contact', {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        if (success) success.style.display = 'block';
        form.reset();
      } catch {
        if (btn) { btn.disabled = false; btn.textContent = 'Send Message'; }
      }
    });
  }
}

/* ─────────────────────────────────────────────
   INGREDIENT ROWS — Expandable
   ───────────────────────────────────────────── */
class IngredientRows {
  constructor() {
    on(document, 'click', (e) => {
      const row = e.target.closest('.ingredient-row[data-ingredient]');
      if (!row) return;
      row.classList.toggle('is-expanded');
    });
  }
}

/* ─────────────────────────────────────────────
   IMAGE LAZY LOAD — native + fallback
   ───────────────────────────────────────────── */
class LazyImages {
  constructor() {
    if (!('loading' in HTMLImageElement.prototype)) {
      // Fallback for browsers without native lazy load
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) img.src = img.dataset.src;
            obs.unobserve(img);
          }
        });
      });
      $$('img[loading="lazy"]').forEach(img => obs.observe(img));
    }
  }
}

/* ─────────────────────────────────────────────
   STICKY ATC BAR — Product page
   ───────────────────────────────────────────── */
class StickyATC {
  constructor() {
    this.bar = $('.sticky-atc');
    if (!this.bar) return;

    /* Watch the main ATC form — show bar when it scrolls out */
    const form = $('#pd-atc-form') || $('[data-product-form]');
    if (!form) return;

    /* Populate bar with product info from data attributes on the bar element */
    const nameEl  = $('.sticky-atc__name',  this.bar);
    const priceEl = $('.sticky-atc__price', this.bar);

    /* Sync price when variant changes */
    on(document, 'variant:change', (e) => {
      if (priceEl && e.detail?.price) priceEl.textContent = e.detail.price;
    });

    /* The sticky ATC button fires the main ATC form */
    const stickyBtn = $('.sticky-atc__btn', this.bar);
    if (stickyBtn) {
      on(stickyBtn, 'click', () => {
        const mainBtn = $('#pd-atc-btn') || $('[data-atc-btn]');
        if (mainBtn && !mainBtn.disabled) mainBtn.click();
      });

      /* Keep disabled state in sync */
      const mainBtn = $('#pd-atc-btn') || $('[data-atc-btn]');
      if (mainBtn) {
        const syncDisabled = () => { stickyBtn.disabled = mainBtn.disabled; };
        syncDisabled();
        new MutationObserver(syncDisabled).observe(mainBtn, { attributes: true, attributeFilter: ['disabled'] });
      }
    }

    /* IntersectionObserver: show bar when form top passes the header */
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          this.bar.classList.toggle('is-visible', !entry.isIntersecting);
        });
      },
      {
        threshold: 0,
        rootMargin: `-${document.documentElement.style.getPropertyValue('--header-h') || '80'}px 0px 0px 0px`
      }
    );

    this.observer.observe(form);
  }
}

/* ─────────────────────────────────────────────
   QUICK-ADD DRAWER — Bottom sheet
   ───────────────────────────────────────────── */
class QuickAddDrawer {
  constructor() {
    this.drawer  = $('#quick-add-drawer');
    this.overlay = $('#quick-add-overlay');
    if (!this.drawer) return;

    this.isOpen = false;
    this.trap   = null;
    this.bindEvents();
  }

  bindEvents() {
    /* Buttons on product cards with data-quick-add-drawer attribute */
    on(document, 'click', (e) => {
      const btn = e.target.closest('[data-quick-add-drawer]');
      if (!btn) return;
      e.preventDefault();
      this.open({
        handle:    btn.dataset.productHandle,
        title:     btn.dataset.productTitle   || 'Product',
        tagline:   btn.dataset.productTagline || '',
        price:     btn.dataset.productPrice   || '',
        variantId: btn.dataset.variantId,
        image:     btn.dataset.productImage   || ''
      });
    });

    const closeBtn = this.drawer.querySelector('#quick-add-drawer-close');
    on(closeBtn,     'click', () => this.close());
    on(this.overlay, 'click', () => this.close());
    on(document, 'keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });
  }

  open(data) {
    /* Populate content */
    const titleEl   = this.drawer.querySelector('.quick-add-drawer__title');
    const taglineEl = this.drawer.querySelector('.quick-add-drawer__tagline');
    const priceEl   = this.drawer.querySelector('.quick-add-drawer__price');
    const imgEl     = this.drawer.querySelector('.quick-add-drawer__image img');
    const submitBtn = this.drawer.querySelector('[data-quick-add-submit]');
    const linkEl    = this.drawer.querySelector('.quick-add-drawer__link');

    if (titleEl)   titleEl.textContent   = data.title;
    if (taglineEl) taglineEl.textContent = data.tagline;
    if (priceEl)   priceEl.textContent   = data.price;
    if (imgEl && data.image) { imgEl.src = data.image; imgEl.alt = data.title; }
    if (submitBtn) {
      submitBtn.dataset.variantId = data.variantId;
      submitBtn.disabled = !data.variantId;
    }
    if (linkEl && data.handle) linkEl.href = `/products/${data.handle}`;

    this.drawer.classList.add('is-open');
    if (this.overlay) this.overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    this.isOpen = true;

    if (!this.trap) this.trap = createFocusTrap(this.drawer);
    this.trap.activate();
    if (submitBtn) setTimeout(() => submitBtn.focus(), 60);
  }

  close() {
    this.drawer.classList.remove('is-open');
    if (this.overlay) this.overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    this.isOpen = false;
    if (this.trap) this.trap.deactivate();
  }
}

/* ─────────────────────────────────────────────
   INIT
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Global
  new SiteHeader();
  new MobileMenu();
  new AnnouncementBar();
  new CartDrawer();
  new AddToCart();
  new ScrollReveal();
  new PressStrip();
  new LazyImages();
  new IngredientRows();
  new ContactForm();
  new CollectionFilters();

  // Product page
  const productPage = $('[data-product-page]');
  if (productPage) {
    $$('[data-product-gallery]').forEach(el => new ProductGallery(el));
    $$('[data-product-tabs]').forEach(el => new ProductTabs(el));
    $$('[data-qty-wrapper]').forEach(el => new QuantityAdjuster(el));
    $$('[data-variant-selector]').forEach(el => new VariantSelector(el));
    new StickyATC();
  }

  // Quick-add drawer
  new QuickAddDrawer();

  // Accordion
  $$('[data-accordion]').forEach(el => new Accordion(el));

  // Quiz
  const quizEl = $('[data-serum-quiz]');
  if (quizEl) new SerumQuiz(quizEl);

  // Routine builder
  const routineEl = $('[data-routine-builder]');
  if (routineEl) new RoutineBuilder(routineEl);

  // Expose cart drawer globally
  window.cartDrawer = { close: () => emit(document, 'cart:close') };
  on(document, 'cart:close', () => {
    const drawer = $('#cart-drawer');
    const overlay = $('#cart-overlay');
    if (drawer) drawer.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  });

  /* Quick-add drawer submit */
  on(document, 'click', async (e) => {
    const btn = e.target.closest('[data-quick-add-submit]');
    if (!btn) return;
    const variantId = btn.dataset.variantId;
    if (!variantId) return;

    const original = btn.textContent;
    btn.textContent = 'Adding…';
    btn.classList.add('loading');

    try {
      const res = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: variantId, quantity: 1 })
      });

      if (res.ok) {
        btn.textContent = 'Added!';
        setTimeout(() => {
          btn.classList.remove('loading');
          btn.textContent = original;
          /* Close quick-add drawer, open cart */
          const qad = $('#quick-add-drawer');
          const qao = $('#quick-add-overlay');
          if (qad) qad.classList.remove('is-open');
          if (qao) qao.classList.remove('is-open');
          document.body.style.overflow = '';
          emit(document, 'cart:refresh');
          emit(document, 'cart:open');
        }, 700);
      } else {
        throw new Error('Add failed');
      }
    } catch {
      btn.textContent = 'Sold Out';
      btn.classList.remove('loading');
      setTimeout(() => { btn.textContent = original; }, 2000);
    }
  });
});
