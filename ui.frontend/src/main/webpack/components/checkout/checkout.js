import { Checkout } from '../../../../../scripts/universal-sf-ui/index.js';
import { createCartStore } from '../../../../../scripts/universal-sf-ui/stores.js';

const demoCart = {
  id: 'storybook-checkout',
  items: [
    {
      id: 'cart-item-1',
      quantity: 1,
      price: 279.99,
      subtotal: 279.99,
      product: {
        name: 'Premium Leather Jacket',
        sku: 'LJ-2024-BLK',
        price: { currency: 'USD' },
        images: [{ url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=240&q=80', label: 'Premium Leather Jacket' }],
      },
      options: [{ label: 'Color', value: 'Black' }, { label: 'Size', value: 'M' }],
    },
    {
      id: 'cart-item-2',
      quantity: 2,
      price: 29.99,
      subtotal: 59.98,
      product: {
        name: 'Classic White T-Shirt',
        sku: 'TSH-001',
        price: { currency: 'USD' },
        images: [{ url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=240&q=80', label: 'Classic White T-Shirt' }],
      },
      options: [{ label: 'Size', value: 'M' }],
    },
  ],
  totals: {
    subtotal: 339.97,
    tax: 27.20,
    shipping: 0,
    discount: 0,
    total: 367.17,
  },
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function createDemoCartStore() {
  const service = {
    getCart: async () => clone(demoCart),
    removeItem: async () => clone(demoCart),
    updateItem: async () => clone(demoCart),
  };
  return createCartStore(service);
}

export default class {
  static init(el) {
    const { backToCartUrl, showOrderSummary } = el.dataset;
    const cartStore = window.universalSfCartStore || createDemoCartStore();

    Checkout.render(el, {
      cartStore,
      backToCartUrl: backToCartUrl || '/cart',
      showOrderSummary: showOrderSummary !== 'false',
      onPlaceOrder: async (cart, formData) => {
        el.dispatchEvent(new CustomEvent('usf:place-order', {
          bubbles: true,
          detail: { cart, formData },
        }));
      },
    });
  }
}
