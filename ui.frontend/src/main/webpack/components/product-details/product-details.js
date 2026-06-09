import { ProductDetails } from '../../../../../scripts/universal-sf-ui/index.js';

const demoProduct = {
  id: 'prod-demo-1',
  name: 'Premium Leather Jacket',
  sku: 'LJ-2024-BLK',
  url: '/products/premium-leather-jacket',
  price: { regular: 349.99, special: 279.99, currency: 'USD' },
  images: [
    { url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80', label: 'Premium Leather Jacket - Front' },
    { url: 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?auto=format&fit=crop&w=800&q=80', label: 'Premium Leather Jacket - Back' },
    { url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80', label: 'Premium Leather Jacket - Detail' },
  ],
  inStock: true,
  shortDescription: 'A timeless leather jacket crafted from full-grain cowhide. Features a classic moto silhouette with asymmetric zipper and quilted shoulder details.',
  description: '<p>Crafted from premium full-grain cowhide leather, this jacket is built to last a lifetime. The supple leather softens beautifully with wear, developing a unique patina over time.</p><ul><li>Full-grain cowhide leather</li><li>YKK zippers throughout</li><li>Quilted shoulder and elbow panels</li><li>Two exterior zip pockets</li><li>One interior pocket</li><li>Fully lined with satin</li></ul>',
  attributes: {
    options: [
      {
        id: 'color',
        title: 'Color',
        values: [
          { id: 'black', title: 'Black', value: '#1a1a1a', type: 'COLOR_HEX', inStock: true, isDefault: true },
          { id: 'brown', title: 'Brown', value: '#8B4513', type: 'COLOR_HEX', inStock: true },
          { id: 'tan', title: 'Tan', value: '#D2B48C', type: 'COLOR_HEX', inStock: false },
        ],
      },
      {
        id: 'size',
        title: 'Size',
        values: [
          { id: 'xs', title: 'XS', inStock: false },
          { id: 's', title: 'S', inStock: true, isDefault: true },
          { id: 'm', title: 'M', inStock: true },
          { id: 'l', title: 'L', inStock: true },
          { id: 'xl', title: 'XL', inStock: true },
        ],
      },
    ],
    attributes: [
      { name: 'material', label: 'Material', value: 'Full-grain cowhide leather' },
      { name: 'lining', label: 'Lining', value: 'Polyester satin' },
      { name: 'fit', label: 'Fit', value: 'Slim' },
      { name: 'care', label: 'Care', value: 'Leather clean only' },
      { name: 'country', label: 'Made in', value: 'Italy' },
    ],
  },
};

export default class {
  static init(el) {
    const { product: productJson, showQuantity, showWishlist } = el.dataset;

    let product = demoProduct;
    if (productJson) {
      try {
        product = JSON.parse(productJson);
      } catch {
        // fall back to demo data
      }
    }

    ProductDetails.render(el, {
      product,
      showQuantity: showQuantity !== 'false',
      showWishlist: showWishlist === 'true',
      onAddToCart: (p, quantity, options) => {
        el.dispatchEvent(new CustomEvent('usf:add-to-cart', {
          bubbles: true,
          detail: { product: p, quantity, options },
        }));
      },
    });
  }
}
