import { Login } from '../../../../../scripts/universal-sf-ui/auth/index.js';

function createDemoCustomerService() {
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));
  return {
    async signIn(email) {
      await delay(600);
      return { id: 'customer-1', firstName: 'Jane', lastName: 'Doe', email };
    },
  };
}

export default class {
  static init(el) {
    const { redirectUrl } = el.dataset;
    const customerService = window.universalSfCustomerService || createDemoCustomerService();

    Login.render(el, {
      customerService,
      redirectUrl: redirectUrl || '/',
    });
  }
}
