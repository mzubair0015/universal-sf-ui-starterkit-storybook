import type { ProductService, CartService, CustomerService } from './services.js';
export * from './types';
export type { Product, ProductSearchParams, ProductSearchResult, ProductSearchCallOptions, GetProductCallOptions, GetRecommendationsCallOptions, Cart, CartItem, GetCartCallOptions, AddToCartCallOptions, UpdateCartItemCallOptions, RemoveFromCartCallOptions, ApplyCouponCallOptions, SetGuestEmailOnCartCallOptions, EstimateTotalsCallOptions, SetPaymentMethodOnCartCallOptions, PlaceOrderCallOptions, PlaceOrderResult, SetShippingAddressOnCartCallOptions, GetOrderByTokenCallOptions, GetOrderByTokenResult, UpdateCustomerInput, UpdateCustomerCallOptions, ChangePasswordInput, ChangePasswordCallOptions, CustomerOrderSummary, GetCustomerOrdersResult, GetCustomerOrdersParams, GetCustomerOrdersCallOptions, GetOrderByNumberResult, GetOrderByNumberCallOptions, RegionOption, CountryOption, StoreCountriesData, } from './types';
export { ProductService, CartService, CustomerService, createCommerceServices, } from './services.js';
/**
 * Generic commerce services contract.
 * Implementations (e.g. createAdobeCommerceServices) return an object matching this shape.
 * Backends may extend it with a client (e.g. AdobeCommerceServices adds client: AdobeCommerceClient).
 */
export interface CommerceServices {
    products: ProductService;
    cart: CartService;
    customer: CustomerService;
}
//# sourceMappingURL=index.d.ts.map