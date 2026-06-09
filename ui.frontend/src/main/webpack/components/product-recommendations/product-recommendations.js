import { ProductRecommendations } from '../../../../../scripts/universal-sf-ui/index.js';

const demoProducts = [
  {
    id: 'rec-1',
    name: 'Merino Wool Sweater',
    sku: 'SWT-001',
    url: '/products/merino-wool-sweater',
    price: { regular: 129.99, currency: 'USD' },
    images: [{ url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80', label: 'Merino Wool Sweater' }],
    inStock: true,
  },
  {
    id: 'rec-2',
    name: 'Canvas Backpack',
    sku: 'BAG-010',
    url: '/products/canvas-backpack',
    price: { regular: 79.99, currency: 'USD' },
    images: [{ url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80', label: 'Canvas Backpack' }],
    inStock: true,
  },
  {
    id: 'rec-3',
    name: 'Slim Chino Pants',
    sku: 'PNT-003',
    url: '/products/slim-chino-pants',
    price: { regular: 69.99, special: 54.99, currency: 'USD' },
    images: [{ url: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=400&q=80', label: 'Slim Chino Pants' }],
    inStock: true,
  },
  {
    id: 'rec-4',
    name: 'Leather Belt',
    sku: 'ACC-011',
    url: '/products/leather-belt',
    price: { regular: 49.99, currency: 'USD' },
    images: [{ url: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=400&q=80', label: 'Leather Belt' }],
    inStock: true,
  },
];

export default class {
  static init(el) {
    const {
      title,
      products: productsJson,
      columnsMobile,
      columnsTablet,
      columnsDesktop,
    } = el.dataset;

    let products = demoProducts;
    if (productsJson) {
      try {
        products = JSON.parse(productsJson);
      } catch {
        // fall back to demo data
      }
    }

    const columns = {
      mobile: parseInt(columnsMobile, 10) || 2,
      tablet: parseInt(columnsTablet, 10) || 3,
      desktop: parseInt(columnsDesktop, 10) || 4,
    };

    ProductRecommendations.render(el, {
      products,
      columns,
      title: title || 'You may also like',
      onAddToCart: (product) => {
        el.dispatchEvent(new CustomEvent('usf:add-to-cart', {
          bubbles: true,
          detail: { product, quantity: 1 },
        }));
      },
      onProductClick: (product) => {
        if (product.url) window.location.href = product.url;
      },
    });
  }
}
