import OrderList from '../order-list.hbs';

export default {
  title: 'UniversalStorefront/OrderList',
  argTypes: {
    pageSize: { control: 'number' },
    orderViewUrl: { control: 'text' },
  },
};

export { OrderList };
