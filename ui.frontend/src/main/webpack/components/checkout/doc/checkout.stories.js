import Checkout from '../checkout.hbs';

export default {
  title: 'Components/Checkout',
  argTypes: {
    backToCartUrl: { control: 'text' },
    showOrderSummary: { control: 'boolean' },
  },
};

export { Checkout };
