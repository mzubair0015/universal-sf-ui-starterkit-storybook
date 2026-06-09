import { OrderDetails } from '../../../../../scripts/universal-sf-ui/index.js';

const demoOrder = {
  id: 'ORD-2024-001',
  number: '000001234',
  status: 'Processing',
  order_date: new Date().toISOString(),
  email: 'customer@example.com',
  carrier: 'FedEx',
  shipping_method: 'Ground',
  payment_methods: [{ name: 'Visa ending 4242', type: 'card' }],
  items: [
    {
      id: 'item-1',
      product_name: 'Premium Leather Jacket',
      product_sku: 'LJ-2024-BLK',
      quantity_ordered: 1,
      product_sale_price: { value: 279.99, currency: 'USD' },
      prices: { row_total: { value: 279.99 } },
      product: {
        thumbnail: {
          url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=120&q=80',
          label: 'Premium Leather Jacket',
        },
      },
    },
    {
      id: 'item-2',
      product_name: 'Classic White T-Shirt',
      product_sku: 'TSH-001',
      quantity_ordered: 2,
      product_sale_price: { value: 29.99, currency: 'USD' },
      prices: { row_total: { value: 59.98 } },
      product: {
        thumbnail: {
          url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=120&q=80',
          label: 'Classic White T-Shirt',
        },
      },
    },
  ],
  total: {
    subtotal_excl_tax: { value: 339.97, currency: 'USD' },
    total_tax: { value: 27.20, currency: 'USD' },
    total_shipping: { value: 0, currency: 'USD' },
    grand_total: { value: 367.17, currency: 'USD' },
  },
  shipping_address: {
    firstname: 'Jane',
    lastname: 'Doe',
    street: ['123 Main Street', 'Apt 4B'],
    city: 'San Francisco',
    region: 'CA',
    postcode: '94105',
    country_code: 'US',
    telephone: '(415) 555-0100',
  },
  billing_address: {
    firstname: 'Jane',
    lastname: 'Doe',
    street: ['123 Main Street', 'Apt 4B'],
    city: 'San Francisco',
    region: 'CA',
    postcode: '94105',
    country_code: 'US',
    telephone: '(415) 555-0100',
  },
};

export default class {
  static init(el) {
    const { order: orderJson, continueShoppingUrl } = el.dataset;

    let order = demoOrder;
    if (orderJson) {
      try {
        order = JSON.parse(orderJson);
      } catch {
        // fall back to demo data
      }
    }

    OrderDetails.render(el, {
      order,
      continueShoppingUrl: continueShoppingUrl || '/',
    });
  }
}
