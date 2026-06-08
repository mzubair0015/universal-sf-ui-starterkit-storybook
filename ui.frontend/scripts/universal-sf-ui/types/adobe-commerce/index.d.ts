/**
 * Adobe Commerce Services
 * GraphQL-based implementation for Adobe Commerce (Magento 2.4+)
 */
/**
 * Factory function to create all Adobe Commerce services
 */
import { AdobeCommerceClient, AdobeCommerceConfig } from './client.js';
import { AdobeCommerceProductService } from './ProductService.js';
import type { ProductServiceDefaultOptions } from './ProductService.js';
import { AdobeCommerceCartService } from './CartService.js';
import type { CartServiceDefaultOptions } from './CartService.js';
import { AdobeCommerceCustomerService } from './CustomerService.js';
import type { CustomerServiceDefaultOptions } from './CustomerService.js';
export { AdobeCommerceClient } from './client.js';
export type { AdobeCommerceConfig } from './client.js';
export { AdobeCommerceProductService } from './ProductService.js';
export type { ProductServiceDefaultOptions } from './ProductService.js';
export { AdobeCommerceCartService } from './CartService.js';
export type { CartServiceDefaultOptions } from './CartService.js';
export { AdobeCommerceCustomerService } from './CustomerService.js';
export type { CustomerServiceDefaultOptions, TokenStorage } from './CustomerService.js';
export * from './queries.js';
/** Optional per-service default options. Each key is passed to that service's constructor. */
export interface AdobeCommerceServiceOptions {
    products?: ProductServiceDefaultOptions;
    cart?: CartServiceDefaultOptions;
    customer?: CustomerServiceDefaultOptions;
}
export interface AdobeCommerceServices {
    client: AdobeCommerceClient;
    products: AdobeCommerceProductService;
    cart: AdobeCommerceCartService;
    customer: AdobeCommerceCustomerService;
}
export declare function createAdobeCommerceServices(config: AdobeCommerceConfig, serviceOptions?: AdobeCommerceServiceOptions): AdobeCommerceServices;
//# sourceMappingURL=index.d.ts.map