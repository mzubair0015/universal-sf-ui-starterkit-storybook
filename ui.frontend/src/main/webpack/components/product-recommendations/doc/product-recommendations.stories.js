import ProductRecommendations from '../product-recommendations.hbs';

export default {
  title: 'UniversalStorefront/ProductRecommendations',
  argTypes: {
    title: { control: 'text' },
    columnsMobile: { control: 'number' },
    columnsTablet: { control: 'number' },
    columnsDesktop: { control: 'number' },
  },
};

export { ProductRecommendations };
