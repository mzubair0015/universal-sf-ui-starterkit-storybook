class r {
  constructor(e) {
    if (new.target === r)
      throw new Error("ProductService is an abstract class and cannot be instantiated directly");
    this.config = e;
  }
  /**
   * Search products with filters, sorting, and pagination
   * @param {import('./types').ProductSearchParams} params - Search parameters
   * @param {import('./types').ProductSearchCallOptions} [options] - Optional query, transform, afterTransform hooks
   * @returns {Promise<import('./types').ProductSearchResult>}
   */
  async searchProducts(e, t = {}) {
    throw new Error("searchProducts must be implemented by subclass");
  }
  /**
   * Get a single product by ID or SKU
   * @param {string} id - Product ID or SKU
   * @param {import('./types').GetProductCallOptions} [options] - Optional query, transform, afterTransform hooks
   * @returns {Promise<import('./types').Product>}
   */
  async getProduct(e, t = {}) {
    throw new Error("getProduct must be implemented by subclass");
  }
  /**
   * Get product recommendations
   * @param {string} productId - Product ID
   * @param {string} type - Recommendation type (related, upsell, crosssell)
   * @param {import('./types').GetRecommendationsCallOptions} [options] - Optional query, transform, afterTransform hooks
   * @returns {Promise<import('./types').Product[]>}
   */
  async getRecommendations(e, t = "related", s = {}) {
    throw new Error("getRecommendations must be implemented by subclass");
  }
}
class n {
  constructor(e) {
    if (new.target === n)
      throw new Error("CartService is an abstract class and cannot be instantiated directly");
    this.config = e;
  }
  /**
   * Get current cart
   * @param {import('./types').GetCartCallOptions} [options] - Optional query, transform, afterTransform hooks
   * @returns {Promise<import('./types').Cart>}
   */
  async getCart(e = {}) {
    throw new Error("getCart must be implemented by subclass");
  }
  /**
   * Add item to cart
   * @param {string} sku - Product SKU
   * @param {number} quantity - Quantity to add
   * @param {import('./types').AddToCartCallOptions} [options] - Optional query, transform, afterTransform hooks
   * @returns {Promise<import('./types').Cart>}
   */
  async addToCart(e, t, s = {}) {
    throw new Error("addToCart must be implemented by subclass");
  }
  /**
   * Update cart item quantity
   * @param {string} itemId - Cart item ID
   * @param {number} quantity - New quantity
   * @param {import('./types').UpdateCartItemCallOptions} [options] - Optional query, transform, afterTransform hooks
   * @returns {Promise<import('./types').Cart>}
   */
  async updateCartItem(e, t, s = {}) {
    throw new Error("updateCartItem must be implemented by subclass");
  }
  /**
   * Remove item from cart
   * @param {string} itemId - Cart item ID
   * @param {import('./types').RemoveFromCartCallOptions} [options] - Optional query, transform, afterTransform hooks
   * @returns {Promise<import('./types').Cart>}
   */
  async removeFromCart(e, t = {}) {
    throw new Error("removeFromCart must be implemented by subclass");
  }
  /**
   * Clear cart
   * @returns {Promise<void>}
   */
  async clearCart() {
    throw new Error("clearCart must be implemented by subclass");
  }
  /**
   * Apply coupon/promo code to cart
   * @param {string} code - Coupon code
   * @param {import('./types').ApplyCouponCallOptions} [options] - Optional query, transform, afterTransform hooks
   * @returns {Promise<import('./types').Cart>}
   */
  async applyCoupon(e, t = {}) {
    throw new Error("applyCoupon must be implemented by subclass");
  }
  /**
   * Place order for the given cart (checkout). Required for checkout flow.
   * @param {string} cartId - Cart ID
   * @param {import('./types').PlaceOrderCallOptions} [options] - Optional query, transform, afterTransform hooks
   * @returns {Promise<import('./types').PlaceOrderResult>}
   */
  async placeOrder(e, t = {}) {
    throw new Error("placeOrder must be implemented by subclass");
  }
  /**
   * Get order by token (e.g. guest order token for order confirmation page).
   * @param {string} token - Order token (e.g. from place order response or URL)
   * @param {import('./types').GetOrderByTokenCallOptions} [options] - Optional query, transform, afterTransform hooks
   * @returns {Promise<import('./types').GetOrderByTokenResult>}
   */
  async getOrderByToken(e, t = {}) {
    throw new Error("getOrderByToken must be implemented by subclass");
  }
  /**
   * Set guest email on cart (checkout contact). Required for guest checkout.
   * @param {string} cartId - Cart ID
   * @param {string} email - Guest email
   * @param {import('./types').SetGuestEmailOnCartCallOptions} [options] - Optional query, transform, afterTransform hooks
   * @returns {Promise<import('./types').Cart>}
   */
  async setGuestEmailOnCart(e, t, s = {}) {
    throw new Error("setGuestEmailOnCart must be implemented by subclass");
  }
  /**
   * Set shipping address on cart and return updated cart with available shipping methods.
   * @param {string} cartId - Cart ID
   * @param {import('./types').SetShippingAddressInput} address - Shipping address
   * @param {import('./types').SetShippingAddressOnCartCallOptions} [options] - Optional query, transform, afterTransform hooks
   * @returns {Promise<import('./types').SetShippingAddressOnCartResult>}
   */
  async setShippingAddressOnCart(e, t, s = {}) {
    throw new Error("setShippingAddressOnCart must be implemented by subclass");
  }
  /**
   * Get available shipping methods for a cart and address.
   * @param {string} cartId - Cart ID
   * @param {import('./types').EstimateAddressInput} address - Address (country_code, optional region/postcode)
   * @param {import('./types').EstimateShippingMethodsCallOptions} [options] - Optional query, transform, afterTransform hooks
   * @returns {Promise<import('./types').ShippingMethodOption[]>}
   */
  async estimateShippingMethods(e, t, s = {}) {
    throw new Error("estimateShippingMethods must be implemented by subclass");
  }
  /**
   * Set payment method on cart.
   * @param {string} cartId - Cart ID
   * @param {string} paymentMethodCode - Payment method code
   * @param {import('./types').SetPaymentMethodOnCartCallOptions} [options] - Optional query, transform, afterTransform hooks
   * @returns {Promise<import('./types').Cart>}
   */
  async setPaymentMethodOnCart(e, t, s = {}) {
    throw new Error("setPaymentMethodOnCart must be implemented by subclass");
  }
  /**
   * Estimate totals (tax, shipping) for cart with given address and shipping method.
   * @param {string} cartId - Cart ID
   * @param {object} address - Address (country_code, postcode, region)
   * @param {object} shippingMethod - { carrier_code, method_code }
   * @param {import('./types').EstimateTotalsCallOptions} [options] - Optional query, transform, afterTransform hooks
   * @returns {Promise<import('./types').Cart>}
   */
  async estimateTotals(e, t, s, m = {}) {
    throw new Error("estimateTotals must be implemented by subclass");
  }
}
class o {
  constructor(e) {
    if (new.target === o)
      throw new Error("CustomerService is an abstract class and cannot be instantiated directly");
    this.config = e;
  }
  /**
   * Get current customer
   * @param {import('./types').GetCurrentCustomerCallOptions} [options] - Optional query, transform, afterTransform hooks
   * @returns {Promise<import('./types').Customer|null>}
   */
  async getCurrentCustomer(e = {}) {
    throw new Error("getCurrentCustomer must be implemented by subclass");
  }
  /**
   * Sign in customer
   * @param {string} email - Customer email
   * @param {string} password - Customer password
   * @param {import('./types').SignInCallOptions} [options] - Optional query, transform, afterTransform hooks
   * @returns {Promise<import('./types').Customer>}
   */
  async signIn(e, t, s = {}) {
    throw new Error("signIn must be implemented by subclass");
  }
  /**
   * Sign up (create) customer
   * @param {import('./types').CreateCustomerInput} input - First name, last name, email, password
   * @param {import('./types').SignUpCallOptions} [options] - Optional query, transform, afterTransform hooks
   * @returns {Promise<import('./types').Customer>}
   */
  async signUp(e, t = {}) {
    throw new Error("signUp must be implemented by subclass");
  }
  /**
   * Sign out customer
   * @returns {Promise<void>}
   */
  async signOut() {
    throw new Error("signOut must be implemented by subclass");
  }
  /**
   * Update customer profile (firstname, lastname, email). Requires authenticated customer.
   * @param {import('./types').UpdateCustomerInput} input - Fields to update (firstname, lastname, email)
   * @param {import('./types').UpdateCustomerCallOptions} [options] - Optional query, transform, afterTransform hooks
   * @returns {Promise<import('./types').Customer>}
   */
  async updateCustomer(e, t = {}) {
    throw new Error("updateCustomer must be implemented by subclass");
  }
  /**
   * Change customer password. Requires authenticated customer.
   * @param {import('./types').ChangePasswordInput} input - currentPassword, newPassword
   * @param {import('./types').ChangePasswordCallOptions} [options] - Optional query, transform, afterTransform hooks
   * @returns {Promise<void>}
   */
  async changePassword(e, t = {}) {
    throw new Error("changePassword must be implemented by subclass");
  }
  /**
   * Get customer orders (paginated list). Requires authenticated customer.
   * @param {import('./types').GetCustomerOrdersParams} [params] - page, pageSize, filter, sort
   * @param {import('./types').GetCustomerOrdersCallOptions} [options] - Optional query, transform, afterTransform hooks
   * @returns {Promise<import('./types').GetCustomerOrdersResult>}
   */
  async getCustomerOrders(e = {}, t = {}) {
    throw new Error("getCustomerOrders must be implemented by subclass");
  }
  /**
   * Get order by order number (logged-in customer). Requires Bearer token.
   * @param {string} orderNumber - Order number (e.g. from URL ?orderNumber=...)
   * @param {import('./types').GetOrderByNumberCallOptions} [options] - Optional query, transform, afterTransform hooks
   * @returns {Promise<import('./types').GetOrderByNumberResult>}
   */
  async getOrderByNumber(e, t = {}) {
    throw new Error("getOrderByNumber must be implemented by subclass");
  }
}
function c(a) {
  const { products: e, cart: t, customer: s } = a;
  if (!e || !t || !s)
    throw new Error("createCommerceServices requires products, cart, and customer");
  return { products: e, cart: t, customer: s };
}
export {
  n as CartService,
  o as CustomerService,
  r as ProductService,
  c as createCommerceServices
};
