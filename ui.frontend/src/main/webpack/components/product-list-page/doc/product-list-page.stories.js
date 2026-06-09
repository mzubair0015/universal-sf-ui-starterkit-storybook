import ProductListPage from '../product-list-page.hbs';

export default {
  title: 'UniversalStorefront/ProductListPage',
  argTypes: {
    columnsMobile: { control: 'number' },
    columnsTablet: { control: 'number' },
    columnsDesktop: { control: 'number' },
    pageSize: { control: 'number' },
  },
};

export { ProductListPage };
