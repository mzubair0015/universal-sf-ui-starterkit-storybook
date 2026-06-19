import { ChangePasswordForm } from '../../../../../scripts/universal-sf-ui/auth/index.js';

function createDemoCustomerService() {
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));
  return {
    async changePassword() {
      await delay(600);
    },
  };
}

export default class {
  static init(el) {
    const customerService = window.universalSfCustomerService || createDemoCustomerService();

    ChangePasswordForm.render(el, { customerService });
  }
}
