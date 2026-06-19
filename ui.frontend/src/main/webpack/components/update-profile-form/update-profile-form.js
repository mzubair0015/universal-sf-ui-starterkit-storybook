import { UpdateProfileForm } from '../../../../../scripts/universal-sf-ui/auth/index.js';

const demoCustomer = {
  id: 'customer-1',
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane.doe@example.com',
};

function createDemoCustomerService() {
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));
  return {
    async updateCustomer({ firstName, lastName }) {
      await delay(600);
      return { ...demoCustomer, firstName, lastName };
    },
  };
}

export default class {
  static init(el) {
    const { customer: customerJson } = el.dataset;
    const customerService = window.universalSfCustomerService || createDemoCustomerService();

    let customer = demoCustomer;
    if (customerJson) {
      try {
        customer = JSON.parse(customerJson);
      } catch {
        // fall back to demo customer
      }
    }

    UpdateProfileForm.render(el, { customerService, customer });
  }
}
