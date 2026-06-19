import { Signup } from '../../../../../scripts/universal-sf-ui/auth/index.js';

function createDemoCustomerService() {
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));
  return {
    async signUp({ firstName, lastName, email }) {
      await delay(800);
      return { id: 'customer-1', firstName, lastName, email };
    },
    async signIn(email) {
      await delay(300);
      return { id: 'customer-1', firstName: 'Jane', lastName: 'Doe', email };
    },
  };
}

export default class {
  static init(el) {
    const { redirectUrl } = el.dataset;
    const customerService = window.universalSfCustomerService || createDemoCustomerService();

    Signup.render(el, {
      customerService,
      redirectUrl: redirectUrl || '/',
    });
  }
}
