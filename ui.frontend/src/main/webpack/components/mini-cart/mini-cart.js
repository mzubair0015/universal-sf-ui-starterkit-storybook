import { MiniCart } from '../../../../../scripts/universal-sf-ui/index.js';
import { createCartStore } from '../../../../../scripts/universal-sf-ui/stores.js';

const demoCart = {
  id: 'storybook-mini-cart',
  items: [
    {
      id: 'cart-item-1',
      quantity: 1,
      price: 79,
      subtotal: 79,
      product: {
        name: 'Everyday Tote',
        sku: 'BAG-001',
        price: { currency: 'USD' },
        images: [{ url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=240&q=80', label: 'Everyday Tote' }],
      },
      options: [{ label: 'Color', value: 'Black' }],
    },
    {
      id: 'cart-item-2',
      quantity: 2,
      price: 28,
      subtotal: 56,
      product: {
        name: 'Cotton Cap',
        sku: 'CAP-002',
        price: { currency: 'USD' },
        images: [{ url: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=240&q=80', label: 'Cotton Cap' }],
      },
      options: [{ label: 'Size', value: 'M' }],
    },
  ],
  totals: { total: 135 },
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function getCartTotal(items) {
  return items.reduce((total, item) => total + item.subtotal, 0);
}

function createDemoCartStore() {
  let currentCart = clone(demoCart);

  const service = {
    getCart: async () => clone(currentCart),
    removeItem: async (itemId) => {
      currentCart.items = currentCart.items.filter((item) => item.id !== itemId);
      currentCart.totals.total = getCartTotal(currentCart.items);
      return clone(currentCart);
    },
    updateItem: async (itemId, quantity) => {
      currentCart.items = currentCart.items.map((item) => {
        if (item.id !== itemId) return item;
        return { ...item, quantity, subtotal: item.price * quantity };
      });
      currentCart.totals.total = getCartTotal(currentCart.items);
      return clone(currentCart);
    },
  };

  return createCartStore(service);
}

export default class {
  static init(el) {
    const { checkoutUrl, viewCartUrl, cartIconUrl } = el.dataset;
    const cartStore = window.universalSfCartStore || createDemoCartStore();

    MiniCart.render(el, {
      cartStore,
      checkoutUrl: checkoutUrl || '/checkout',
      viewCartUrl: viewCartUrl || '/cart',
      ...(cartIconUrl && { cartIconUrl }),
    });
  }
}
