import {
  FilterPanel,
  ProductGrid,
  SortControls,
  Pagination,
} from '../../../../../scripts/universal-sf-ui/index.js';
import { productListStore } from '../../../../../scripts/universal-sf-ui/stores.js';

const demoProducts = [
  {
    id: 'prod-1',
    name: 'Classic White T-Shirt',
    sku: 'TSH-001',
    url: '/products/classic-white-tshirt',
    price: { regular: 29.99, currency: 'USD' },
    images: [{ url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80', label: 'Classic White T-Shirt' }],
    inStock: true,
  },
  {
    id: 'prod-2',
    name: 'Slim Fit Jeans',
    sku: 'JNS-002',
    url: '/products/slim-fit-jeans',
    price: { regular: 89.99, special: 69.99, currency: 'USD' },
    images: [{ url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&q=80', label: 'Slim Fit Jeans' }],
    inStock: true,
  },
  {
    id: 'prod-3',
    name: 'Leather Crossbody Bag',
    sku: 'BAG-003',
    url: '/products/leather-crossbody-bag',
    price: { regular: 149.99, currency: 'USD' },
    images: [{ url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80', label: 'Leather Crossbody Bag' }],
    inStock: true,
  },
  {
    id: 'prod-4',
    name: 'Running Sneakers',
    sku: 'SHO-004',
    url: '/products/running-sneakers',
    price: { regular: 119.99, special: 89.99, currency: 'USD' },
    images: [{ url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80', label: 'Running Sneakers' }],
    inStock: true,
  },
  {
    id: 'prod-5',
    name: 'Wool Blend Scarf',
    sku: 'ACC-005',
    url: '/products/wool-blend-scarf',
    price: { regular: 45.99, currency: 'USD' },
    images: [{ url: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=400&q=80', label: 'Wool Blend Scarf' }],
    inStock: false,
  },
  {
    id: 'prod-6',
    name: 'Structured Blazer',
    sku: 'JAC-006',
    url: '/products/structured-blazer',
    price: { regular: 199.99, currency: 'USD' },
    images: [{ url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80', label: 'Structured Blazer' }],
    inStock: true,
  },
];

const demoAggregations = [
  {
    field: 'category',
    label: 'Category',
    options: [
      { value: 'tops', label: 'Tops', count: 2 },
      { value: 'bottoms', label: 'Bottoms', count: 1 },
      { value: 'bags', label: 'Bags', count: 1 },
      { value: 'shoes', label: 'Shoes', count: 1 },
      { value: 'accessories', label: 'Accessories', count: 1 },
    ],
  },
  {
    field: 'color',
    label: 'Color',
    options: [
      { value: 'white', label: 'White', count: 1 },
      { value: 'blue', label: 'Blue', count: 2 },
      { value: 'black', label: 'Black', count: 2 },
      { value: 'brown', label: 'Brown', count: 1 },
    ],
  },
  {
    field: 'size',
    label: 'Size',
    options: [
      { value: 'xs', label: 'XS', count: 3 },
      { value: 's', label: 'S', count: 5 },
      { value: 'm', label: 'M', count: 6 },
      { value: 'l', label: 'L', count: 4 },
      { value: 'xl', label: 'XL', count: 2 },
    ],
  },
];

export default class {
  static init(el) {
    const { columnsMobile, columnsTablet, columnsDesktop, pageSize } = el.dataset;

    const columns = {
      mobile: parseInt(columnsMobile, 10) || 2,
      tablet: parseInt(columnsTablet, 10) || 3,
      desktop: parseInt(columnsDesktop, 10) || 4,
    };

    productListStore.setState({
      products: demoProducts,
      loading: false,
      totalCount: demoProducts.length,
      aggregations: demoAggregations,
      pageSize: parseInt(pageSize, 10) || 12,
    });

    el.innerHTML = `
      <div class="product-list-page__sidebar">
        <div class="product-list-page__filters"></div>
      </div>
      <div class="product-list-page__main">
        <div class="product-list-page__toolbar">
          <div class="product-list-page__sort"></div>
        </div>
        <div class="product-list-page__grid"></div>
        <div class="product-list-page__pagination"></div>
      </div>
    `;

    FilterPanel.render(el.querySelector('.product-list-page__filters'), { store: productListStore });
    SortControls.render(el.querySelector('.product-list-page__sort'), { store: productListStore });
    ProductGrid.render(el.querySelector('.product-list-page__grid'), { store: productListStore, columns });
    Pagination.render(el.querySelector('.product-list-page__pagination'), { store: productListStore });
  }
}
