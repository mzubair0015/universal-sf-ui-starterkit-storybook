import { OrderList } from '../../../../../scripts/universal-sf-ui/auth/index.js';

const demoOrders = [
  {
    id: 'ord-1',
    number: '000001001',
    order_date: new Date(Date.now() - 864e5 * 2).toISOString(),
    status: 'Complete',
    total: { value: 349.97, currency: 'USD' },
    carrier: 'FedEx',
  },
  {
    id: 'ord-2',
    number: '000001002',
    order_date: new Date(Date.now() - 864e5 * 10).toISOString(),
    status: 'Processing',
    total: { value: 89.99, currency: 'USD' },
    carrier: 'UPS',
  },
  {
    id: 'ord-3',
    number: '000001003',
    order_date: new Date(Date.now() - 864e5 * 30).toISOString(),
    status: 'Complete',
    total: { value: 199.0, currency: 'USD' },
    carrier: 'USPS',
  },
];

function createDemoCustomerService() {
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));
  return {
    async getCustomerOrders({ pageSize = 10 } = {}) {
      await delay(400);
      return {
        items: demoOrders,
        total_count: demoOrders.length,
        page_info: { current_page: 1, page_size: pageSize, total_pages: 1 },
      };
    },
  };
}

export default class {
  static init(el) {
    const { pageSize, orderViewUrl } = el.dataset;
    const customerService = window.universalSfCustomerService || createDemoCustomerService();

    OrderList.render(el, {
      customerService,
      pageSize: pageSize ? parseInt(pageSize, 10) : 10,
      orderViewUrl: orderViewUrl || '/order-details?orderNumber={number}',
    });
  }
}
