import ProductListPage from '../product-list-page.hbs';

export default {
  title: 'Components/ProductListPage',
  argTypes: {
    columnsMobile: { control: 'number' },
    columnsTablet: { control: 'number' },
    columnsDesktop: { control: 'number' },
    pageSize: { control: 'number' },
  },
};

export { ProductListPage };
