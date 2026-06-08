import { ProductService as B, CartService as z, CustomerService as W } from "@universal-sf-ui/commerce-interface";
class V {
  constructor(e) {
    this.cartId = null, this.config = {
      endpoint: e.endpoint,
      apiKey: e.apiKey,
      storeCode: e.storeCode,
      storeViewCode: e.storeViewCode,
      websiteCode: e.websiteCode,
      environmentId: e.environmentId,
      customerGroupId: e.customerGroupId || "b6589fc6ab0dc82cf12099d1c2d40ab994e8410c",
      headers: e.headers || {},
      timeout: e.timeout || 3e4,
      getAuthToken: e.getAuthToken
    }, this.loadCartId();
  }
  /** Return current auth token if configured (used for customer cart query when logged in). */
  getAuthToken() {
    var e, a;
    return ((a = (e = this.config).getAuthToken) == null ? void 0 : a.call(e)) ?? null;
  }
  /**
   * Execute GraphQL query
   * @param options.minimalHeaders - When true, only Content-Type, Accept, Store and config.headers are sent (for signup/login).
   */
  async query(e, a, n) {
    const i = new AbortController(), t = setTimeout(() => i.abort(), this.config.timeout);
    try {
      const r = (n == null ? void 0 : n.minimalHeaders) === !0, o = r ? {
        "Content-Type": "application/json",
        Accept: "application/json",
        Store: this.config.storeViewCode,
        ...this.config.headers
      } : {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-key": this.config.apiKey,
        "magento-store-code": this.config.storeCode,
        "magento-store-view-code": this.config.storeViewCode,
        "magento-website-code": this.config.websiteCode,
        "magento-environment-id": this.config.environmentId,
        "magento-customer-group": this.config.customerGroupId,
        store: this.config.storeViewCode,
        ...this.config.headers
      };
      !r && this.cartId && (o["X-Cart-Id"] = this.cartId);
      const s = await fetch(this.config.endpoint, {
        method: "POST",
        headers: o,
        body: JSON.stringify({ query: e, variables: a }),
        signal: i.signal
      });
      if (clearTimeout(t), !s.ok)
        throw new Error(`HTTP ${s.status}: ${s.statusText}`);
      const c = await s.json();
      if (c.errors && c.errors.length > 0) {
        const l = c.errors[0];
        throw new Error(l.message || "GraphQL error");
      }
      if (!c.data)
        throw new Error("No data returned from GraphQL");
      return c.data;
    } catch (r) {
      throw r instanceof Error ? r.name === "AbortError" ? new Error("Request timeout") : r : new Error("Unknown error occurred");
    } finally {
      clearTimeout(t);
    }
  }
  /**
   * Execute a GraphQL query with a specific Bearer token (e.g. after login to fetch customer data).
   * Uses minimal headers plus Authorization: Bearer token.
   */
  async queryWithToken(e, a, n) {
    const i = new AbortController(), t = setTimeout(() => i.abort(), this.config.timeout);
    try {
      const r = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Store: this.config.storeViewCode,
        Authorization: `Bearer ${e}`,
        ...this.config.headers
      }, o = await fetch(this.config.endpoint, {
        method: "POST",
        headers: r,
        body: JSON.stringify({ query: a, variables: n }),
        signal: i.signal
      });
      if (clearTimeout(t), !o.ok)
        throw new Error(`HTTP ${o.status}: ${o.statusText}`);
      const s = await o.json();
      if (s.errors && s.errors.length > 0)
        throw new Error(s.errors[0].message || "GraphQL error");
      if (!s.data)
        throw new Error("No data returned from GraphQL");
      return s.data;
    } catch (r) {
      throw r instanceof Error ? r.name === "AbortError" ? new Error("Request timeout") : r : new Error("Unknown error occurred");
    } finally {
      clearTimeout(t);
    }
  }
  /**
   * Get current cart ID
   */
  getCartId() {
    return this.cartId;
  }
  /**
   * Set cart ID and persist to storage
   */
  setCartId(e) {
    this.cartId = e, typeof localStorage < "u" && (e ? localStorage.setItem("adobe_commerce_cart_id", e) : localStorage.removeItem("adobe_commerce_cart_id"));
  }
  /**
   * Load cart ID from storage
   */
  loadCartId() {
    typeof localStorage < "u" && (this.cartId = localStorage.getItem("adobe_commerce_cart_id"));
  }
  /**
   * Clear cart ID
   */
  clearCartId() {
    this.setCartId(null);
  }
}
const Y = `
  query productSearch(
    $phrase: String!
    $pageSize: Int
    $currentPage: Int = 1
    $filter: [SearchClauseInput!]
    $sort: [ProductSearchSortInput!]
    $context: QueryContextInput
  ) {
    attributeMetadata {
      sortable {
        label
        attribute
        numeric
      }
      filterableInSearch {
        label
        attribute
        numeric
      }
    }
    productSearch(
      phrase: $phrase
      page_size: $pageSize
      current_page: $currentPage
      filter: $filter
      sort: $sort
      context: $context
    ) {
      total_count
      items {
        ...ProductView
      }
      facets {
        ...Facet
      }
      page_info {
        current_page
        page_size
        total_pages
      }
    }
  }

  fragment ProductView on ProductSearchItem {
    productView {
      __typename
      sku
      name
      inStock
      url
      urlKey
      images {
        label
        url
        roles
      }
      ... on ComplexProductView {
        priceRange {
          maximum {
            final {
              amount {
                value
                currency
              }
            }
            regular {
              amount {
                value
                currency
              }
            }
          }
          minimum {
            final {
              amount {
                value
                currency
              }
            }
            regular {
              amount {
                value
                currency
              }
            }
          }
        }
        options {
          id
          title
          values {
            title
            ... on ProductViewOptionValueSwatch {
              id
              inStock
              type
              value
            }
          }
        }
      }
      ... on SimpleProductView {
        price {
          final {
            amount {
              value
              currency
            }
          }
          regular {
            amount {
              value
              currency
            }
          }
        }
      }
    }
    highlights {
      attribute
      value
      matched_words
    }
  }

  fragment Facet on Aggregation {
    title
    attribute
    buckets {
      title
      __typename
      ... on CategoryView {
        name
        count
        path
      }
      ... on ScalarBucket {
        count
      }
      ... on RangeBucket {
        from
        to
        count
      }
      ... on StatsBucket {
        min
        max
      }
    }
  }
`, Q = `
  query GET_PRODUCT_DATA($skus: [String]) {
    products(skus: $skus) {
      ...PRODUCT_VIEW_FRAGMENT
    }
  }
  fragment PRODUCT_VIEW_FRAGMENT on ProductView {
    __typename
    id
    sku
    name
    shortDescription
    metaDescription
    metaKeyword
    metaTitle
    description
    inStock
    addToCartAllowed
    url
    urlKey
    externalId
    images(roles: []) {
      url
      label
      roles
    }
    attributes(roles: []) {
      name
      label
      value
      roles
    }
    ... on SimpleProductView {
      price {
        regular {
          amount {
            value
            currency
          }
        }
        final {
          amount {
            value
            currency
          }
        }
      }
    }
    ... on ComplexProductView {
      options {
        ...PRODUCT_OPTION_FRAGMENT
      }
      ...PRICE_RANGE_FRAGMENT
    }
  }
  fragment PRODUCT_OPTION_FRAGMENT on ProductViewOption {
    id
    title
    required
    multi
    values {
      id
      title
      inStock
      __typename
      ... on ProductViewOptionValueProduct {
        title
        quantity
        isDefault
        __typename
        product {
          sku
          shortDescription
          metaDescription
          metaKeyword
          metaTitle
          name
          price {
            final {
              amount {
                value
                currency
              }
            }
            regular {
              amount {
                value
                currency
              }
            }
          }
        }
      }
      ... on ProductViewOptionValueSwatch {
        id
        title
        type
        value
        inStock
      }
    }
  }
  fragment PRICE_RANGE_FRAGMENT on ComplexProductView {
    priceRange {
      maximum {
        final {
          amount {
            value
            currency
          }
        }
        regular {
          amount {
            value
            currency
          }
        }
      }
      minimum {
        final {
          amount {
            value
            currency
          }
        }
        regular {
          amount {
            value
            currency
          }
        }
      }
    }
  }
`, U = `
  fragment ProductDetails on ProductInterface {
    __typename
    id
    uid
    sku
    name
    url_key
    stock_status
    only_x_left_in_stock
    price_range {
      minimum_price {
        regular_price {
          value
          currency
        }
        final_price {
          value
          currency
        }
        discount {
          amount_off
          percent_off
        }
      }
    }
    small_image {
      url
      label
    }
    image {
      url
      label
    }
    thumbnail {
      url
      label
    }
    media_gallery {
      url
      label
      position
    }
    description {
      html
    }
    short_description {
      html
    }
    categories {
      uid
      name
      url_path
    }
  }
`, be = `
  query searchProducts(
    $search: String
    $filter: ProductAttributeFilterInput
    $pageSize: Int
    $currentPage: Int
    $sort: ProductAttributeSortInput
  ) {
    products(
      search: $search
      filter: $filter
      pageSize: $pageSize
      currentPage: $currentPage
      sort: $sort
    ) {
      total_count
      items {
        ...ProductDetails
      }
      aggregations {
        attribute_code
        label
        count
        options {
          label
          value
          count
        }
      }
      page_info {
        current_page
        page_size
        total_pages
      }
      sort_fields {
        default
        options {
          label
          value
        }
      }
    }
  }
  ${U}
`, we = `
  query getProduct($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
      items {
        ...ProductDetails
        ... on ConfigurableProduct {
          configurable_options {
            attribute_code
            attribute_uid
            label
            values {
              uid
              label
              swatch_data {
                value
              }
            }
          }
          variants {
            product {
              ...ProductDetails
            }
            attributes {
              code
              value_index
            }
          }
        }
      }
    }
  }
  ${U}
`, x = `
  query GUEST_CART_QUERY(
    $cartId: String!
    $pageSize: Int! = 100
    $currentPage: Int! = 1
    $itemsSortInput: QuoteItemsSortInput! = { field: CREATED_AT, order: DESC }
  ) {
    cart(cart_id: $cartId) {
      ...GET_CART_CART_FRAGMENT
    }
  }

  fragment GET_CART_CART_FRAGMENT on Cart {
    id
    is_virtual
    email
    total_quantity
    billing_address {
      ...GET_CART_BILLING_ADDRESS_FRAGMENT
    }
    applied_gift_cards {
      ...GET_CART_APPLIED_GIFT_CARDS_FRAGMENT
    }
    gift_receipt_included
    printed_card_included
    gift_message {
      ...GET_CART_GIFT_MESSAGE_FRAGMENT
    }
    gift_wrapping {
      ...GET_CART_GIFT_WRAPPING_FRAGMENT
    }
    available_gift_wrappings {
      ...GET_CART_AVAILABLE_GIFT_WRAPPING_FRAGMENT
    }
    prices {
      gift_options {
        gift_wrapping_for_items {
          currency
          value
        }
        gift_wrapping_for_items_incl_tax {
          currency
          value
        }
        gift_wrapping_for_order {
          currency
          value
        }
        gift_wrapping_for_order_incl_tax {
          currency
          value
        }
        printed_card {
          currency
          value
        }
        printed_card_incl_tax {
          currency
          value
        }
      }
      subtotal_with_discount_excluding_tax {
        currency
        value
      }
      subtotal_including_tax {
        currency
        value
      }
      subtotal_excluding_tax {
        currency
        value
      }
      grand_total {
        currency
        value
      }
      grand_total_excluding_tax {
        currency
        value
      }
      applied_taxes {
        label
        amount {
          value
          currency
        }
      }
      discounts {
        amount {
          value
          currency
        }
        label
        coupon {
          code
        }
        applied_to
      }
    }
    applied_coupons {
      code
    }
    itemsV2(pageSize: $pageSize, currentPage: $currentPage, sort: $itemsSortInput) {
      items {
        ...GET_CART_ITEM_FRAGMENT
      }
    }
    shipping_addresses {
      ...GET_CART_SHIPPING_ADDRESS_FRAGMENT
    }
    available_payment_methods {
      code
      title
    }
    selected_payment_method {
      code
      title
    }
  }

  fragment GET_CART_BILLING_ADDRESS_FRAGMENT on BillingCartAddress {
    id
    city
    country {
      code
      label
    }
    firstname
    lastname
    company
    postcode
    vat_id
    region {
      region_id
      code
      label
    }
    street
    telephone
    custom_attributes {
      ... on AttributeValue {
        code
        value
      }
    }
    prefix
    suffix
    middlename
    fax
  }

  fragment GET_CART_SHIPPING_ADDRESS_FRAGMENT on ShippingCartAddress {
    id
    firstname
    lastname
    company
    street
    city
    postcode
    vat_id
    region {
      region_id
      code
      label
    }
    country {
      code
      label
    }
    telephone
    custom_attributes {
      ... on AttributeValue {
        code
        value
      }
    }
    available_shipping_methods {
      amount {
        currency
        value
      }
      available
      carrier_code
      carrier_title
      error_message
      method_code
      method_title
      price_excl_tax {
        value
        currency
      }
      price_incl_tax {
        value
        currency
      }
    }
    selected_shipping_method {
      amount {
        value
        currency
      }
      carrier_code
      carrier_title
      method_code
      method_title
      price_excl_tax {
        value
        currency
      }
      price_incl_tax {
        value
        currency
      }
    }
    same_as_billing
    prefix
    suffix
    middlename
    fax
  }

  fragment GET_CART_ITEM_FRAGMENT on CartItemInterface {
    __typename
    uid
    quantity
    is_available
    not_available_message
    errors {
      code
      message
    }
    prices {
      price {
        value
        currency
      }
      discounts {
        amount {
          value
          currency
        }
        label
      }
      total_item_discount {
        value
        currency
      }
      row_total {
        value
        currency
      }
      row_total_including_tax {
        value
        currency
      }
      price_including_tax {
        value
        currency
      }
      fixed_product_taxes {
        amount {
          value
          currency
        }
        label
      }
      original_item_price {
        value
        currency
      }
      original_row_total {
        value
        currency
      }
    }
    product {
      name
      sku
      quantity
      gift_message_available
      gift_wrapping_available
      gift_wrapping_price {
        currency
        value
      }
      thumbnail {
        url
        label
      }
      url_key
      canonical_url
      categories {
        url_path
        url_key
        name
      }
      custom_attributesV2(filters: { is_visible_on_front: true }) {
        items {
          code
          ... on AttributeValue {
            value
          }
          ... on AttributeSelectedOptions {
            selected_options {
              value
              label
            }
          }
        }
      }
      only_x_left_in_stock
      stock_status
      price_range {
        ...GET_CART_PRICE_RANGE_FRAGMENT
      }
    }
    ... on SimpleCartItem {
      available_gift_wrapping {
        ...GET_CART_AVAILABLE_GIFT_WRAPPING_FRAGMENT
      }
      gift_message {
        ...GET_CART_GIFT_MESSAGE_FRAGMENT
      }
      gift_wrapping {
        ...GET_CART_GIFT_WRAPPING_FRAGMENT
      }
      customizable_options {
        ...GET_CART_CUSTOMIZABLE_OPTIONS_FRAGMENT
      }
    }
    ... on ConfigurableCartItem {
      available_gift_wrapping {
        ...GET_CART_AVAILABLE_GIFT_WRAPPING_FRAGMENT
      }
      gift_message {
        ...GET_CART_GIFT_MESSAGE_FRAGMENT
      }
      gift_wrapping {
        ...GET_CART_GIFT_WRAPPING_FRAGMENT
      }
      configurable_options {
        configurable_product_option_uid
        option_label
        value_label
        configurable_product_option_value_uid
      }
      configured_variant {
        uid
        sku
        only_x_left_in_stock
        stock_status
        thumbnail {
          label
          url
        }
        price_range {
          ...GET_CART_PRICE_RANGE_FRAGMENT
        }
      }
      customizable_options {
        ...GET_CART_CUSTOMIZABLE_OPTIONS_FRAGMENT
      }
    }
    ... on BundleCartItem {
      available_gift_wrapping {
        ...GET_CART_AVAILABLE_GIFT_WRAPPING_FRAGMENT
      }
      gift_message {
        ...GET_CART_GIFT_MESSAGE_FRAGMENT
      }
      gift_wrapping {
        ...GET_CART_GIFT_WRAPPING_FRAGMENT
      }
      bundle_options {
        uid
        label
        values {
          uid
          label
        }
      }
    }
    ... on GiftCardCartItem {
      message
      recipient_email
      recipient_name
      sender_email
      sender_name
      amount {
        currency
        value
      }
      is_available
    }
  }

  fragment GET_CART_PRICE_RANGE_FRAGMENT on PriceRange {
    minimum_price {
      regular_price {
        value
        currency
      }
      final_price {
        value
        currency
      }
      discount {
        percent_off
        amount_off
      }
    }
    maximum_price {
      regular_price {
        value
        currency
      }
      final_price {
        value
        currency
      }
      discount {
        percent_off
        amount_off
      }
    }
  }

  fragment GET_CART_CUSTOMIZABLE_OPTIONS_FRAGMENT on SelectedCustomizableOption {
    type
    customizable_option_uid
    label
    is_required
    values {
      label
      value
      price {
        type
        units
        value
      }
    }
  }

  fragment GET_CART_GIFT_WRAPPING_FRAGMENT on GiftWrapping {
    __typename
    uid
    design
    image {
      url
    }
    price {
      value
      currency
    }
  }

  fragment GET_CART_GIFT_MESSAGE_FRAGMENT on GiftMessage {
    __typename
    from
    to
    message
  }

  fragment GET_CART_AVAILABLE_GIFT_WRAPPING_FRAGMENT on GiftWrapping {
    __typename
    uid
    design
    image {
      url
      label
    }
    price {
      currency
      value
    }
  }

  fragment GET_CART_APPLIED_GIFT_CARDS_FRAGMENT on AppliedGiftCard {
    __typename
    code
    applied_balance {
      value
      currency
    }
    current_balance {
      value
      currency
    }
    expiration_date
  }
`, H = `
  query CUSTOMER_CART_QUERY(
    $pageSize: Int! = 100,
    $currentPage: Int! = 1,
    $itemsSortInput: QuoteItemsSortInput! = { field: CREATED_AT, order: DESC }
  ) {
    customer {
      ...CUSTOMER_FRAGMENT
    }
    cart: customerCart {
      ...CART_FRAGMENT
    }
  }

  fragment CUSTOMER_FRAGMENT on Customer {
    addresses {
      default_shipping
      country_code
      postcode
      region {
        region
        region_code
        region_id
      }
    }
  }

  fragment CART_FRAGMENT on Cart {
    id
    is_virtual
    email
    total_quantity
    billing_address {
      ...CUSTOMER_CART_BILLING_ADDRESS_FRAGMENT
    }
    applied_gift_cards {
      ...APPLIED_GIFT_CARDS_FRAGMENT
    }
    gift_receipt_included
    printed_card_included
    gift_message {
      ...GIFT_MESSAGE_FRAGMENT
    }
    gift_wrapping {
      ...GIFT_WRAPPING_FRAGMENT
    }
    available_gift_wrappings {
      ...AVAILABLE_GIFT_WRAPPING_FRAGMENT
    }
    prices {
      gift_options {
        gift_wrapping_for_items {
          currency
          value
        }
        gift_wrapping_for_items_incl_tax {
          currency
          value
        }
        gift_wrapping_for_order {
          currency
          value
        }
        gift_wrapping_for_order_incl_tax {
          currency
          value
        }
        printed_card {
          currency
          value
        }
        printed_card_incl_tax {
          currency
          value
        }
      }
      subtotal_with_discount_excluding_tax {
        currency
        value
      }
      subtotal_including_tax {
        currency
        value
      }
      subtotal_excluding_tax {
        currency
        value
      }
      grand_total {
        currency
        value
      }
      grand_total_excluding_tax {
        currency
        value
      }
      applied_taxes {
        label
        amount {
          value
          currency
        }
      }
      discounts {
        amount {
          value
          currency
        }
        label
        coupon {
          code
        }
        applied_to
      }
    }
    applied_coupons {
      code
    }
    itemsV2(pageSize: $pageSize, currentPage: $currentPage, sort: $itemsSortInput) {
      items {
        ...CART_ITEM_FRAGMENT
      }
    }
    shipping_addresses {
      ...CUSTOMER_CART_SHIPPING_ADDRESS_FRAGMENT
    }
    available_payment_methods {
      code
      title
    }
    selected_payment_method {
      code
      title
    }
  }

  fragment CUSTOMER_CART_BILLING_ADDRESS_FRAGMENT on BillingCartAddress {
    id
    city
    country {
      code
      label
    }
    firstname
    lastname
    company
    postcode
    vat_id
    region {
      region_id
      code
      label
    }
    street
    telephone
    custom_attributes {
      ... on AttributeValue {
        code
        value
      }
    }
    prefix
    suffix
    middlename
    fax
  }

  fragment CUSTOMER_CART_SHIPPING_ADDRESS_FRAGMENT on ShippingCartAddress {
    id
    firstname
    lastname
    company
    street
    city
    postcode
    vat_id
    region {
      region_id
      code
      label
    }
    country {
      code
      label
    }
    telephone
    custom_attributes {
      ... on AttributeValue {
        code
        value
      }
    }
    available_shipping_methods {
      amount {
        currency
        value
      }
      available
      carrier_code
      carrier_title
      error_message
      method_code
      method_title
      price_excl_tax {
        value
        currency
      }
      price_incl_tax {
        value
        currency
      }
    }
    selected_shipping_method {
      amount {
        value
        currency
      }
      carrier_code
      carrier_title
      method_code
      method_title
      price_excl_tax {
        value
        currency
      }
      price_incl_tax {
        value
        currency
      }
    }
    same_as_billing
    prefix
    suffix
    middlename
    fax
  }

  fragment CART_ITEM_FRAGMENT on CartItemInterface {
    __typename
    uid
    quantity
    is_available
    not_available_message
    errors { code message }
    prices {
      price { value currency }
      discounts { amount { value currency } label }
      total_item_discount { value currency }
      row_total { value currency }
      row_total_including_tax { value currency }
      price_including_tax { value currency }
      fixed_product_taxes { amount { value currency } label }
      original_item_price { value currency }
      original_row_total { value currency }
    }
    product {
      name
      sku
      quantity
      gift_message_available
      gift_wrapping_available
      gift_wrapping_price { currency value }
      thumbnail { url label }
      url_key
      canonical_url
      categories { url_path url_key name }
      custom_attributesV2(filters: { is_visible_on_front: true }) {
        items {
          code
          ... on AttributeValue { value }
          ... on AttributeSelectedOptions {
            selected_options { value label }
          }
        }
      }
      only_x_left_in_stock
      stock_status
      price_range { ...PRICE_RANGE_FRAGMENT }
    }
    ... on SimpleCartItem {
      available_gift_wrapping { ...AVAILABLE_GIFT_WRAPPING_FRAGMENT }
      gift_message { ...GIFT_MESSAGE_FRAGMENT }
      gift_wrapping { ...GIFT_WRAPPING_FRAGMENT }
      customizable_options { ...CUSTOMIZABLE_OPTIONS_FRAGMENT }
    }
    ... on ConfigurableCartItem {
      available_gift_wrapping { ...AVAILABLE_GIFT_WRAPPING_FRAGMENT }
      gift_message { ...GIFT_MESSAGE_FRAGMENT }
      gift_wrapping { ...GIFT_WRAPPING_FRAGMENT }
      configurable_options {
        configurable_product_option_uid
        option_label
        value_label
        configurable_product_option_value_uid
      }
      configured_variant {
        uid
        sku
        only_x_left_in_stock
        stock_status
        thumbnail { label url }
        price_range { ...PRICE_RANGE_FRAGMENT }
      }
      customizable_options { ...CUSTOMIZABLE_OPTIONS_FRAGMENT }
    }
    ... on BundleCartItem {
      available_gift_wrapping { ...AVAILABLE_GIFT_WRAPPING_FRAGMENT }
      gift_message { ...GIFT_MESSAGE_FRAGMENT }
      gift_wrapping { ...GIFT_WRAPPING_FRAGMENT }
      bundle_options {
        uid
        label
        values { uid label }
      }
    }
    ... on GiftCardCartItem {
      message
      recipient_email
      recipient_name
      sender_email
      sender_name
      amount { currency value }
      is_available
    }
  }

  fragment PRICE_RANGE_FRAGMENT on PriceRange {
    minimum_price {
      regular_price { value currency }
      final_price { value currency }
      discount { percent_off amount_off }
    }
    maximum_price {
      regular_price { value currency }
      final_price { value currency }
      discount { percent_off amount_off }
    }
  }

  fragment CUSTOMIZABLE_OPTIONS_FRAGMENT on SelectedCustomizableOption {
    type
    customizable_option_uid
    label
    is_required
    values {
      label
      value
      price { type units value }
    }
  }

  fragment GIFT_WRAPPING_FRAGMENT on GiftWrapping {
    __typename
    uid
    design
    image { url }
    price { value currency }
  }
  fragment GIFT_MESSAGE_FRAGMENT on GiftMessage {
    __typename
    from
    to
    message
  }
  fragment AVAILABLE_GIFT_WRAPPING_FRAGMENT on GiftWrapping {
    __typename
    uid
    design
    image { url label }
    price { currency value }
  }
  fragment APPLIED_GIFT_CARDS_FRAGMENT on AppliedGiftCard {
    __typename
    code
    applied_balance { value currency }
    current_balance { value currency }
    expiration_date
  }
`, K = `
  mutation CREATE_GUEST_CART_MUTATION {
    createGuestCart {
      cart {
        id
      }
    }
  }
`, j = `
  mutation ADD_PRODUCTS_TO_CART_MUTATION(
    $cartId: String!
    $cartItems: [CartItemInput!]!
    $pageSize: Int! = 100
    $currentPage: Int! = 1
    $itemsSortInput: QuoteItemsSortInput! = { field: CREATED_AT, order: DESC }
  ) {
    addProductsToCart(cartId: $cartId, cartItems: $cartItems) {
      cart {
        ...ADD_TO_CART_CART_FRAGMENT
      }
      user_errors {
        code
        message
      }
    }
  }

  fragment ADD_TO_CART_CART_FRAGMENT on Cart {
    id
    total_quantity
    is_virtual
    applied_gift_cards {
      ...ADD_TO_CART_APPLIED_GIFT_CARDS_FRAGMENT
    }
    gift_receipt_included
    printed_card_included
    gift_message {
      ...ADD_TO_CART_GIFT_MESSAGE_FRAGMENT
    }
    gift_wrapping {
      ...ADD_TO_CART_GIFT_WRAPPING_FRAGMENT
    }
    available_gift_wrappings {
      ...ADD_TO_CART_AVAILABLE_GIFT_WRAPPING_FRAGMENT
    }
    prices {
      gift_options {
        gift_wrapping_for_items {
          currency
          value
        }
        gift_wrapping_for_items_incl_tax {
          currency
          value
        }
        gift_wrapping_for_order {
          currency
          value
        }
        gift_wrapping_for_order_incl_tax {
          currency
          value
        }
        printed_card {
          currency
          value
        }
        printed_card_incl_tax {
          currency
          value
        }
      }
      subtotal_with_discount_excluding_tax {
        currency
        value
      }
      subtotal_including_tax {
        currency
        value
      }
      subtotal_excluding_tax {
        currency
        value
      }
      grand_total {
        currency
        value
      }
      grand_total_excluding_tax {
        currency
        value
      }
      applied_taxes {
        label
        amount {
          value
          currency
        }
      }
      discounts {
        amount {
          value
          currency
        }
        label
        coupon {
          code
        }
        applied_to
      }
    }
    applied_coupons {
      code
    }
    itemsV2(pageSize: $pageSize, currentPage: $currentPage, sort: $itemsSortInput) {
      items {
        ...ADD_TO_CART_ITEM_FRAGMENT
      }
    }
    shipping_addresses {
      country {
        code
      }
      region {
        code
      }
      postcode
    }
  }

  fragment ADD_TO_CART_ITEM_FRAGMENT on CartItemInterface {
    __typename
    uid
    quantity
    is_available
    not_available_message
    errors {
      code
      message
    }
    prices {
      price {
        value
        currency
      }
      discounts {
        amount {
          value
          currency
        }
        label
      }
      total_item_discount {
        value
        currency
      }
      row_total {
        value
        currency
      }
      row_total_including_tax {
        value
        currency
      }
      price_including_tax {
        value
        currency
      }
      fixed_product_taxes {
        amount {
          value
          currency
        }
        label
      }
      original_item_price {
        value
        currency
      }
      original_row_total {
        value
        currency
      }
    }
    product {
      name
      sku
      quantity
      gift_message_available
      gift_wrapping_available
      gift_wrapping_price {
        currency
        value
      }
      thumbnail {
        url
        label
      }
      url_key
      canonical_url
      categories {
        url_path
        url_key
        name
      }
      custom_attributesV2(filters: { is_visible_on_front: true }) {
        items {
          code
          ... on AttributeValue {
            value
          }
          ... on AttributeSelectedOptions {
            selected_options {
              value
              label
            }
          }
        }
      }
      only_x_left_in_stock
      stock_status
      price_range {
        ...ADD_TO_CART_PRICE_RANGE_FRAGMENT
      }
    }
    ... on SimpleCartItem {
      available_gift_wrapping {
        ...ADD_TO_CART_AVAILABLE_GIFT_WRAPPING_FRAGMENT
      }
      gift_message {
        ...ADD_TO_CART_GIFT_MESSAGE_FRAGMENT
      }
      gift_wrapping {
        ...ADD_TO_CART_GIFT_WRAPPING_FRAGMENT
      }
      customizable_options {
        ...ADD_TO_CART_CUSTOMIZABLE_OPTIONS_FRAGMENT
      }
    }
    ... on ConfigurableCartItem {
      available_gift_wrapping {
        ...ADD_TO_CART_AVAILABLE_GIFT_WRAPPING_FRAGMENT
      }
      gift_message {
        ...ADD_TO_CART_GIFT_MESSAGE_FRAGMENT
      }
      gift_wrapping {
        ...ADD_TO_CART_GIFT_WRAPPING_FRAGMENT
      }
      configurable_options {
        configurable_product_option_uid
        option_label
        value_label
        configurable_product_option_value_uid
      }
      configured_variant {
        uid
        sku
        only_x_left_in_stock
        stock_status
        thumbnail {
          label
          url
        }
        price_range {
          ...ADD_TO_CART_PRICE_RANGE_FRAGMENT
        }
      }
      customizable_options {
        ...ADD_TO_CART_CUSTOMIZABLE_OPTIONS_FRAGMENT
      }
    }
    ... on BundleCartItem {
      available_gift_wrapping {
        ...ADD_TO_CART_AVAILABLE_GIFT_WRAPPING_FRAGMENT
      }
      gift_message {
        ...ADD_TO_CART_GIFT_MESSAGE_FRAGMENT
      }
      gift_wrapping {
        ...ADD_TO_CART_GIFT_WRAPPING_FRAGMENT
      }
      bundle_options {
        uid
        label
        values {
          uid
          label
        }
      }
    }
    ... on GiftCardCartItem {
      message
      recipient_email
      recipient_name
      sender_email
      sender_name
      amount {
        currency
        value
      }
      is_available
    }
  }

  fragment ADD_TO_CART_PRICE_RANGE_FRAGMENT on PriceRange {
    minimum_price {
      regular_price {
        value
        currency
      }
      final_price {
        value
        currency
      }
      discount {
        percent_off
        amount_off
      }
    }
    maximum_price {
      regular_price {
        value
        currency
      }
      final_price {
        value
        currency
      }
      discount {
        percent_off
        amount_off
      }
    }
  }

  fragment ADD_TO_CART_CUSTOMIZABLE_OPTIONS_FRAGMENT on SelectedCustomizableOption {
    type
    customizable_option_uid
    label
    is_required
    values {
      label
      value
      price {
        type
        units
        value
      }
    }
  }

  fragment ADD_TO_CART_GIFT_WRAPPING_FRAGMENT on GiftWrapping {
    __typename
    uid
    design
    image {
      url
    }
    price {
      value
      currency
    }
  }

  fragment ADD_TO_CART_GIFT_MESSAGE_FRAGMENT on GiftMessage {
    __typename
    from
    to
    message
  }

  fragment ADD_TO_CART_AVAILABLE_GIFT_WRAPPING_FRAGMENT on GiftWrapping {
    __typename
    uid
    design
    image {
      url
      label
    }
    price {
      currency
      value
    }
  }

  fragment ADD_TO_CART_APPLIED_GIFT_CARDS_FRAGMENT on AppliedGiftCard {
    __typename
    code
    applied_balance {
      value
      currency
    }
    current_balance {
      value
      currency
    }
    expiration_date
  }
`, Z = `
  mutation updateCartItems(
    $cartId: String!
    $cartItems: [CartItemUpdateInput!]!
    $pageSize: Int! = 100
    $currentPage: Int! = 1
    $itemsSortInput: QuoteItemsSortInput! = { field: CREATED_AT, order: DESC }
  ) {
    updateCartItems(input: { cart_id: $cartId, cart_items: $cartItems }) {
      cart {
        id
        total_quantity
        prices {
          subtotal_excluding_tax { value currency }
          grand_total { value currency }
          applied_taxes { amount { value currency } }
          discounts { amount { value currency } }
        }
        itemsV2(pageSize: $pageSize, currentPage: $currentPage, sort: $itemsSortInput) {
          items {
            uid
            quantity
            product {
              uid
              sku
              name
              thumbnail { url label }
              url_key
              canonical_url
              stock_status
            }
            prices {
              price { value currency }
              row_total { value currency }
            }
            ... on ConfigurableCartItem {
              configurable_options { option_label value_label }
              configured_variant { thumbnail { url label } }
              customizable_options { label values { value label } }
            }
            ... on SimpleCartItem {
              customizable_options { label values { value label } }
            }
          }
        }
        shipping_addresses {
          selected_shipping_method { amount { value currency } }
        }
      }
    }
  }
`, J = `
  mutation removeItemFromCart(
    $cartId: String!
    $cartItemUid: ID!
    $pageSize: Int! = 100
    $currentPage: Int! = 1
    $itemsSortInput: QuoteItemsSortInput! = { field: CREATED_AT, order: DESC }
  ) {
    removeItemFromCart(input: { cart_id: $cartId, cart_item_uid: $cartItemUid }) {
      cart {
        id
        total_quantity
        prices {
          subtotal_excluding_tax { value currency }
          grand_total { value currency }
          applied_taxes { amount { value currency } }
          discounts { amount { value currency } }
        }
        itemsV2(pageSize: $pageSize, currentPage: $currentPage, sort: $itemsSortInput) {
          items {
            uid
            quantity
            product {
              uid
              sku
              name
              thumbnail { url label }
              url_key
              canonical_url
              stock_status
            }
            prices {
              price { value currency }
              row_total { value currency }
            }
            ... on ConfigurableCartItem {
              configurable_options { option_label value_label }
              configured_variant { thumbnail { url label } }
              customizable_options { label values { value label } }
            }
            ... on SimpleCartItem {
              customizable_options { label values { value label } }
            }
          }
        }
        shipping_addresses {
          selected_shipping_method { amount { value currency } }
        }
      }
    }
  }
`, X = `
  mutation applyCouponToCart($cartId: String!, $couponCode: String!) {
    applyCouponToCart(input: { cart_id: $cartId, coupon_code: $couponCode }) {
      cart {
        id
        applied_coupons {
          code
        }
      }
    }
  }
`, ee = `
  mutation estimateTotals(
    $cartId: String!
    $address: EstimateAddressInput!
    $shipping_method: ShippingMethodInput
    $pageSize: Int! = 100
    $currentPage: Int! = 1
    $itemsSortInput: QuoteItemsSortInput! = { field: CREATED_AT, order: DESC }
  ) {
    estimateTotals(
      input: {
        cart_id: $cartId
        address: $address
        shipping_method: $shipping_method
      }
    ) {
      cart {
        id
        prices {
          subtotal_excluding_tax { value currency }
          grand_total { value currency }
          grand_total_excluding_tax { value currency }
          applied_taxes { amount { value currency } }
          discounts { amount { value currency } }
        }
        itemsV2(pageSize: $pageSize, currentPage: $currentPage, sort: $itemsSortInput) {
          items {
            uid
            quantity
            product {
              uid
              sku
              name
              thumbnail { url label }
              url_key
              canonical_url
              stock_status
              description { html }
            }
            prices {
              price { value currency }
              row_total { value currency }
            }
          }
        }
      }
    }
  }
`, te = `
  mutation estimateShippingMethods(
    $cartId: String!
    $address: EstimateAddressInput!
  ) {
    estimateShippingMethods(input: { cart_id: $cartId, address: $address }) {
      carrier_title
      carrier_code
      method_title
      method_code
      available
      amount {
        currency
        value
      }
      price_excl_tax {
        currency
        value
      }
      price_incl_tax {
        currency
        value
      }
      error_message
    }
  }
`, re = `
  mutation setGuestEmail($cartId: String!, $email: String!) {
    setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
      cart {
        id
        email
      }
    }
  }
`, ae = `
  mutation setPaymentMethod($cartId: String!, $paymentMethod: PaymentMethodInput!) {
    setPaymentMethodOnCart(input: { cart_id: $cartId, payment_method: $paymentMethod }) {
      cart {
        id
        selected_payment_method {
          code
          title
        }
      }
    }
  }
`, q = `
  fragment PLACE_ORDER_FRAGMENT on CustomerOrder {
    printed_card_included
    gift_receipt_included
    gift_wrapping {
      ...GIFT_WRAPPING_FRAGMENT
    }
    gift_message {
      ...GIFT_MESSAGE_FRAGMENT
    }
    applied_gift_cards {
      ...APPLIED_GIFT_CARDS_FRAGMENT
    }
    email
    available_actions
    status
    number
    token
    id
    order_date
    carrier
    shipping_method
    is_virtual
    applied_coupons {
      code
    }
    shipments {
      id
      number
      tracking {
        title
        number
        carrier
      }
      comments {
        message
        timestamp
      }
      items {
        id
        product_sku
        product_name
        order_item {
          ...ORDER_ITEM_DETAILS_FRAGMENT
          ... on GiftCardOrderItem {
            ...GIFT_CARD_DETAILS_FRAGMENT
            product {
              ...PRODUCT_DETAILS_FRAGMENT
            }
          }
        }
      }
    }
    payment_methods {
      name
      type
    }
    shipping_address {
      ...ADDRESS_FRAGMENT
    }
    billing_address {
      ...ADDRESS_FRAGMENT
    }
    items {
      ...ORDER_ITEM_FRAGMENT
    }
    total {
      ...ORDER_SUMMARY_FRAGMENT
    }
  }

  fragment ADDRESS_FRAGMENT on OrderAddress {
    city
    company
    country_code
    fax
    firstname
    lastname
    middlename
    postcode
    prefix
    region
    region_id
    street
    suffix
    telephone
    vat_id
  }

  fragment BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT on BundleOrderItem {
    ...PRICE_DETAILS_FRAGMENT
    bundle_options {
      uid
      label
      values {
        uid
        product_name
      }
    }
  }

  fragment GIFT_CARD_DETAILS_FRAGMENT on GiftCardOrderItem {
    ...PRICE_DETAILS_FRAGMENT
    gift_message {
      ...GIFT_MESSAGE_FRAGMENT
    }
    gift_card {
      recipient_name
      recipient_email
      sender_name
      sender_email
      message
    }
  }

  fragment ORDER_ITEM_DETAILS_FRAGMENT on OrderItemInterface {
    gift_wrapping {
      ...GIFT_WRAPPING_FRAGMENT
    }
    __typename
    status
    product_sku
    eligible_for_return
    product_name
    product_url_key
    id
    quantity_ordered
    quantity_shipped
    quantity_canceled
    quantity_invoiced
    quantity_refunded
    quantity_return_requested
    gift_message {
      ...GIFT_MESSAGE_FRAGMENT
    }
    product_sale_price {
      value
      currency
    }
    selected_options {
      label
      value
    }
    product {
      ...PRODUCT_DETAILS_FRAGMENT
    }
    ...PRICE_DETAILS_FRAGMENT
  }

  fragment ORDER_SUMMARY_FRAGMENT on OrderTotal {
    gift_options {
      gift_wrapping_for_items {
        currency
        value
      }
      gift_wrapping_for_items_incl_tax {
        currency
        value
      }
      gift_wrapping_for_order {
        currency
        value
      }
      gift_wrapping_for_order_incl_tax {
        currency
        value
      }
      printed_card {
        currency
        value
      }
      printed_card_incl_tax {
        currency
        value
      }
    }
    grand_total {
      value
      currency
    }
    grand_total_excl_tax {
      value
      currency
    }
    total_giftcard {
      currency
      value
    }
    subtotal_excl_tax {
      currency
      value
    }
    subtotal_incl_tax {
      currency
      value
    }
    taxes {
      amount {
        currency
        value
      }
      rate
      title
    }
    total_tax {
      currency
      value
    }
    total_shipping {
      currency
      value
    }
    discounts {
      amount {
        currency
        value
      }
      label
    }
  }

  fragment PRICE_DETAILS_FRAGMENT on OrderItemInterface {
    prices {
      price_including_tax {
        value
        currency
      }
      original_price {
        value
        currency
      }
      original_price_including_tax {
        value
        currency
      }
      price {
        value
        currency
      }
    }
  }

  fragment PRODUCT_DETAILS_FRAGMENT on ProductInterface {
    __typename
    canonical_url
    url_key
    uid
    name
    sku
    only_x_left_in_stock
    gift_wrapping_price {
      currency
      value
    }
    stock_status
    thumbnail {
      label
      url
    }
    price_range {
      maximum_price {
        regular_price {
          currency
          value
        }
      }
    }
  }

  fragment ORDER_ITEM_FRAGMENT on OrderItemInterface {
    ...ORDER_ITEM_DETAILS_FRAGMENT
    ... on BundleOrderItem {
      ...BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT
    }
    ... on GiftCardOrderItem {
      ...GIFT_CARD_DETAILS_FRAGMENT
      product {
        ...PRODUCT_DETAILS_FRAGMENT
      }
    }
  }

  fragment GIFT_WRAPPING_FRAGMENT on GiftWrapping {
    __typename
    uid
    design
    image {
      url
    }
    price {
      value
      currency
    }
  }

  fragment GIFT_MESSAGE_FRAGMENT on GiftMessage {
    __typename
    from
    to
    message
  }

  fragment APPLIED_GIFT_CARDS_FRAGMENT on ApplyGiftCardToOrder {
    __typename
    code
    applied_balance {
      value
      currency
    }
  }
`, ie = `
  mutation PLACE_ORDER_MUTATION($cartId: String!) {
    placeOrder(input: { cart_id: $cartId }) {
      errors {
        code
        message
      }
      orderV2 {
        ...PLACE_ORDER_FRAGMENT
      }
    }
  }
${q}`, ne = `
  query GUEST_ORDER_BY_TOKEN($token: String!) {
    guestOrderByToken(input: { token: $token }) {
      ...PLACE_ORDER_FRAGMENT
    }
  }
${q}`, oe = `
  mutation setShippingAddressOnCart(
    $cartId: String!
    $shippingAddressInput: ShippingAddressInput!
  ) {
    setShippingAddressesOnCart(
      input: { cart_id: $cartId, shipping_addresses: [$shippingAddressInput] }
    ) {
      cart {
        id
        shipping_addresses {
          firstname
          lastname
          company
          street
          city
          postcode
          country { code label }
          telephone
          available_shipping_methods {
            amount { currency value }
            available
            carrier_code
            carrier_title
            error_message
            method_code
            method_title
            price_excl_tax { value currency }
            price_incl_tax { value currency }
          }
          selected_shipping_method {
            amount { value currency }
            carrier_code
            carrier_title
            method_code
            method_title
          }
        }
        available_payment_methods {
          code
          title
        }
        selected_payment_method {
          code
          title
        }
      }
    }
  }
`, se = `
  query getCustomer {
    customer {
      email
      firstname
      lastname
      addresses {
        id
        firstname
        lastname
        street
        city
        region {
          region
          region_code
        }
        postcode
        country_code
        telephone
        default_shipping
        default_billing
      }
    }
  }
`, ce = `
  query VALIDATE_TOKEN {
    customerCart {
      id
    }
  }
`, ue = `
  mutation MERGE_CARTS_MUTATION($guestCartId: String!, $customerCartId: String!) {
    mergeCarts(
      source_cart_id: $guestCartId,
      destination_cart_id: $customerCartId
    ) {
      id
      total_quantity
    }
  }
`, le = `
  query GET_CUSTOMER_DATA {
    customer {
      ...CUSTOMER_INFORMATION_FRAGMENT
    }
  }
  fragment CUSTOMER_INFORMATION_FRAGMENT on Customer {
    __typename
    firstname
    lastname
    email
  }
`, _e = `
  mutation GET_CUSTOMER_TOKEN($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`, me = `
  mutation CREATE_CUSTOMER_V2($input: CustomerCreateInput!) {
    createCustomerV2(input: $input) {
      customer {
        __typename
        firstname
        lastname
        email
      }
    }
  }
`, de = `
  mutation UPDATE_CUSTOMER_V2($input: CustomerUpdateInput!) {
    updateCustomerV2(input: $input) {
      customer {
        firstname
        lastname
        email
      }
    }
  }
`, pe = `
  mutation CHANGE_CUSTOMER_PASSWORD(
    $currentPassword: String!
    $newPassword: String!
  ) {
    changeCustomerPassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      email
    }
  }
`, ge = `
  query GET_CUSTOMER_ORDERS_LIST(
    $currentPage: Int
    $pageSize: Int
    $filter: CustomerOrdersFilterInput
    $sort: CustomerOrderSortInput
  ) {
    customer {
      returns {
        items {
          uid
          number
          order { id }
        }
      }
      orders(
        currentPage: $currentPage
        pageSize: $pageSize
        filter: $filter
        sort: $sort
      ) {
        page_info {
          page_size
          total_pages
          current_page
        }
        date_of_first_order
        total_count
        items {
          token
          email
          shipping_method
          payment_methods { name type }
          shipping_address { ...ADDRESS_FRAGMENT }
          billing_address { ...ADDRESS_FRAGMENT }
          shipments {
            id
            number
            tracking { title number carrier }
          }
          number
          id
          order_date
          carrier
          status
          items {
            status
            product_name
            id
            quantity_ordered
            quantity_shipped
            quantity_invoiced
            product { sku url_key small_image { url } }
          }
          total { ...ORDER_SUMMARY_FRAGMENT }
        }
      }
    }
  }

  fragment ADDRESS_FRAGMENT on OrderAddress {
    city
    company
    country_code
    fax
    firstname
    lastname
    middlename
    postcode
    prefix
    region
    region_id
    street
    suffix
    telephone
    vat_id
  }

  fragment ORDER_SUMMARY_FRAGMENT on OrderTotal {
    grand_total { value currency }
    grand_total_excl_tax { value currency }
    total_giftcard { currency value }
    subtotal_excl_tax { currency value }
    subtotal_incl_tax { currency value }
    taxes { amount { currency value } rate title }
    total_tax { currency value }
    total_shipping { currency value }
    discounts { amount { currency value } label }
  }
`, fe = `
  query ORDER_BY_NUMBER($orderNumber: String!) {
    customer {
      orders(filter: { number: { eq: $orderNumber } }) {
        items {
          ...PLACE_ORDER_FRAGMENT
        }
      }
    }
  }
${q}`, Te = `
  query GET_COUNTRIES {
    countries {
      two_letter_abbreviation
      full_name_locale
      available_regions {
        id
        code
        name
      }
    }
    storeConfig {
      countries_with_required_region
      optional_zip_countries
    }
  }
`;
function L(u) {
  var r, o, s, c, l, m, d, _, g, E, f, A, T, y, h, I, v, P, C, S, G, b, w, M, N;
  let e = 0, a = 0, n = "USD";
  if (u.__typename === "SimpleProductView" && u.price)
    e = ((o = (r = u.price.regular) == null ? void 0 : r.amount) == null ? void 0 : o.value) ?? 0, a = ((c = (s = u.price.final) == null ? void 0 : s.amount) == null ? void 0 : c.value) ?? e, n = ((m = (l = u.price.final) == null ? void 0 : l.amount) == null ? void 0 : m.currency) ?? "USD";
  else if (u.__typename === "ComplexProductView" && u.priceRange) {
    const p = u.priceRange.minimum;
    e = ((_ = (d = p == null ? void 0 : p.regular) == null ? void 0 : d.amount) == null ? void 0 : _.value) ?? 0, a = ((E = (g = p == null ? void 0 : p.final) == null ? void 0 : g.amount) == null ? void 0 : E.value) ?? e, n = ((A = (f = p == null ? void 0 : p.final) == null ? void 0 : f.amount) == null ? void 0 : A.currency) ?? "USD";
  }
  const i = ((T = u.images) == null ? void 0 : T.map((p) => ({
    url: p.url,
    label: p.label || u.name
  }))) ?? [], t = {
    __typename: u.__typename,
    urlKey: u.urlKey,
    options: u.options,
    attributes: u.attributes
  };
  if (u.__typename === "ComplexProductView" && u.priceRange) {
    const p = u.priceRange.minimum, R = u.priceRange.maximum;
    t.priceRange = {
      minimum: ((h = (y = p == null ? void 0 : p.final) == null ? void 0 : y.amount) == null ? void 0 : h.value) ?? ((v = (I = p == null ? void 0 : p.regular) == null ? void 0 : I.amount) == null ? void 0 : v.value),
      maximum: ((C = (P = R == null ? void 0 : R.final) == null ? void 0 : P.amount) == null ? void 0 : C.value) ?? ((G = (S = R == null ? void 0 : R.regular) == null ? void 0 : S.amount) == null ? void 0 : G.value),
      currency: ((w = (b = p == null ? void 0 : p.final) == null ? void 0 : b.amount) == null ? void 0 : w.currency) ?? ((N = (M = R == null ? void 0 : R.final) == null ? void 0 : M.amount) == null ? void 0 : N.currency) ?? "USD"
    };
  }
  return {
    id: u.sku,
    sku: u.sku,
    name: u.name,
    description: u.description ?? "",
    shortDescription: u.shortDescription ?? "",
    price: {
      regular: a,
      special: e !== a ? e : void 0,
      currency: n
    },
    images: i,
    url: u.url ?? "",
    inStock: u.inStock ?? !1,
    categories: [],
    attributes: t
  };
}
function Ae(u) {
  const { productView: e } = u;
  return L(e);
}
function ye(u) {
  var a, n, i, t;
  const e = [];
  if ((a = u.filters) != null && a.categories && u.filters.categories.length > 0 && e.push({
    attribute: "categoryPath",
    in: u.filters.categories
  }), (n = u.filters) != null && n.priceRange) {
    const [r, o] = u.filters.priceRange;
    (r !== void 0 || o !== void 0) && e.push({
      attribute: "price",
      range: {
        from: r,
        to: o
      }
    });
  }
  return (i = u.filters) != null && i.inStock && e.push({
    attribute: "inStock",
    eq: "true"
  }), (t = u.filters) != null && t.attributes && Object.entries(u.filters.attributes).forEach(([r, o]) => {
    o && o.length > 0 && e.push({
      attribute: r,
      [Array.isArray(o) ? "in" : "eq"]: o
    });
  }), e;
}
function Ee(u) {
  if (!u.sort)
    return [{ attribute: "position", direction: "DESC" }];
  const { field: e, direction: a } = u.sort, n = a === "asc" ? "ASC" : "DESC";
  return [{ attribute: {
    name: "name",
    price: "price",
    created_at: "createdAt",
    position: "position",
    relevance: "relevance"
  }[e] || e, direction: n }];
}
class Re extends B {
  constructor(e, a = {}) {
    super({ client: e }), this.client = e, this.defaultOptions = a;
  }
  mergeOptions(e, a = {}) {
    return { ...this.defaultOptions[e] ?? {}, ...a };
  }
  /**
   * Search products with filters, sorting, and pagination
   */
  async searchProducts(e, a = {}) {
    var r, o, s;
    const n = this.mergeOptions("searchProducts", a);
    let i;
    if (n.query) {
      const c = await n.query(e);
      i = await this.client.query(c.query, c.variables ?? {});
    } else {
      const c = {
        phrase: e.query || "",
        pageSize: e.pageSize || 20,
        currentPage: e.page || 1,
        filter: ye(e),
        sort: Ee(e)
      };
      i = await this.client.query(Y, c);
    }
    let t;
    if (n.transform)
      t = await n.transform(i);
    else {
      const c = i.productSearch.items.map(Ae), l = (o = (r = i.attributeMetadata) == null ? void 0 : r.sortable) == null ? void 0 : o.map((d) => ({
        attribute: d.attribute,
        label: d.label,
        numeric: d.numeric
      })), m = ((s = i.productSearch.facets) == null ? void 0 : s.map((d) => ({
        field: d.attribute,
        label: d.title,
        options: d.buckets.map((_) => _.__typename === "CategoryView" ? { value: _.path, label: _.name || _.title, count: _.count } : _.__typename === "ScalarBucket" ? { value: _.title, label: _.title, count: _.count } : _.__typename === "RangeBucket" ? { value: `${_.from}-${_.to}`, label: _.title, count: _.count } : { value: _.title, label: _.title, count: _.count || 0 })
      }))) || [];
      t = {
        items: c,
        total: i.productSearch.total_count,
        aggregations: m,
        sortable: l
      };
    }
    if (n.afterTransform) {
      const c = await n.afterTransform(t, i);
      c !== void 0 && (t = c);
    }
    return t;
  }
  /**
   * Get a single product by SKU (Edge Delivery Services: products(skus) query)
   */
  async getProduct(e, a = {}) {
    var c;
    const n = this.mergeOptions("getProduct", a);
    let i;
    if (n.query) {
      const l = await n.query(e);
      i = await this.client.query(l.query, l.variables ?? {});
    } else
      i = await this.client.query(Q, { skus: [e] });
    const t = Array.isArray(i.products) ? i.products : (c = i.products) == null ? void 0 : c.items;
    if (!(t != null && t.length))
      throw new Error(`Product not found: ${e}`);
    const r = t[0], o = r.productView ?? r;
    let s;
    if (n.transform ? s = await n.transform(r) : s = L(o), n.afterTransform) {
      const l = await n.afterTransform(s, i);
      l !== void 0 && (s = l);
    }
    return s;
  }
  /**
   * Get product recommendations (placeholder - requires additional Adobe Commerce setup)
   */
  async getRecommendations(e, a = "related", n = {}) {
    const i = this.mergeOptions("getRecommendations", n);
    let t;
    if (i.query) {
      const o = await i.query(e, a);
      t = await this.client.query(o.query, o.variables ?? {});
    } else
      console.warn("Product recommendations require Adobe Commerce Product Recommendations module"), t = [];
    let r;
    if (i.transform ? r = await i.transform(t) : Array.isArray(t) ? r = t : r = (t == null ? void 0 : t.items) ?? (t == null ? void 0 : t.products) ?? [], i.afterTransform) {
      const o = await i.afterTransform(r, t);
      o !== void 0 && (r = o);
    }
    return r;
  }
}
function O(u) {
  var r, o, s, c, l, m, d, _, g, E, f, A;
  const e = u == null ? void 0 : u.itemsV2, n = (Array.isArray(e == null ? void 0 : e.items) ? e.items : Array.isArray(e) ? e : Array.isArray(u == null ? void 0 : u.items) ? u.items : []).map((T) => {
    var S, G, b, w, M, N;
    const y = T.product ?? {}, h = T.prices ?? {}, I = y.thumbnail ?? y.small_image ?? ((S = T.configured_variant) == null ? void 0 : S.thumbnail), v = T.configurable_options ?? [], P = T.customizable_options ?? [], C = [
      ...v.map((p) => ({ label: p.option_label, value: p.value_label })),
      ...P.flatMap((p) => (p.values ?? []).map((R) => ({ label: p.label, value: R.value ?? R.label ?? "" })))
    ].filter((p) => p.label && p.value);
    return {
      id: T.uid,
      product: {
        id: y.uid ?? y.sku,
        sku: y.sku,
        name: y.name,
        description: ((G = y.description) == null ? void 0 : G.html) ?? "",
        price: {
          regular: ((b = h.price) == null ? void 0 : b.value) ?? 0,
          currency: ((w = h.price) == null ? void 0 : w.currency) ?? "USD"
        },
        images: I ? [{
          url: I.url,
          label: I.label
        }] : [],
        inStock: y.stock_status === "IN_STOCK",
        url: y.url_key ?? y.canonical_url ?? ""
      },
      quantity: T.quantity,
      price: ((M = h.price) == null ? void 0 : M.value) ?? 0,
      subtotal: ((N = h.row_total) == null ? void 0 : N.value) ?? 0,
      ...C.length > 0 && { options: C }
    };
  }), i = u.prices ?? {}, t = {
    subtotal: ((r = i.subtotal_excluding_tax) == null ? void 0 : r.value) ?? 0,
    tax: ((c = (s = (o = i.applied_taxes) == null ? void 0 : o[0]) == null ? void 0 : s.amount) == null ? void 0 : c.value) ?? 0,
    discount: ((d = (m = (l = i.discounts) == null ? void 0 : l[0]) == null ? void 0 : m.amount) == null ? void 0 : d.value) ?? 0,
    shipping: ((f = (E = (g = (_ = u.shipping_addresses) == null ? void 0 : _[0]) == null ? void 0 : g.selected_shipping_method) == null ? void 0 : E.amount) == null ? void 0 : f.value) ?? 0,
    total: ((A = i.grand_total) == null ? void 0 : A.value) ?? 0
  };
  return {
    id: u.id,
    items: n,
    totals: t
  };
}
class he extends z {
  constructor(e, a = {}) {
    super({ client: e }), this.client = e, this.defaultOptions = a;
  }
  mergeOptions(e, a = {}) {
    return { ...this.defaultOptions[e] ?? {}, ...a };
  }
  /**
   * Add item to cart (interface method). Delegates to addItem.
   * @param sku - Product SKU
   * @param quantity - Quantity to add
   * @param options - Optional query, transform, afterTransform hooks
   * @returns Updated cart
   */
  async addToCart(e, a, n = {}) {
    return this.addItem(e, a, n);
  }
  /**
   * Update cart item (interface method). Delegates to updateItem.
   * @param itemId - Cart line item UID
   * @param quantity - New quantity
   * @param options - Optional query, transform, afterTransform hooks
   * @returns Updated cart
   */
  async updateCartItem(e, a, n = {}) {
    return this.updateItem(e, a, n);
  }
  /**
   * Remove item from cart (interface method). Delegates to removeItem.
   * @param itemId - Cart line item UID to remove
   * @param options - Optional query, transform, afterTransform hooks
   * @returns Updated cart
   */
  async removeFromCart(e, a = {}) {
    return this.removeItem(e, a);
  }
  /**
   * Get current cart. Creates a new cart if none exists.
   * @param options - Optional query, transform, afterTransform hooks
   * @returns Current cart (transformed to standard Cart type when using default)
   */
  async getCart(e = {}) {
    const a = this.mergeOptions("getCart", e), n = this.client.getAuthToken(), i = !!n && !a.query;
    let t;
    if (i)
      try {
        const s = await this.client.queryWithToken(n, H, {
          pageSize: 100,
          currentPage: 1,
          itemsSortInput: { field: "CREATED_AT", order: "DESC" }
        });
        t = s.cart ?? s.customerCart, t != null && t.id && this.client.setCartId(t.id);
      } catch {
        t = null;
      }
    if (!t) {
      let o = this.client.getCartId();
      if (o || (o = await this.createCart()), a.query) {
        const s = await a.query(o), c = await this.client.query(s.query, s.variables ?? {});
        t = c.cart ?? c;
      } else
        try {
          t = (await this.client.query(x, { cartId: o })).cart;
        } catch {
          console.warn("Cart not found, creating new cart"), this.client.clearCartId();
          const s = await this.createCart();
          t = (await this.client.query(x, { cartId: s })).cart;
        }
    }
    let r;
    if (a.transform ? r = await a.transform(t) : r = O(t), a.afterTransform) {
      const o = await a.afterTransform(r, t);
      o !== void 0 && (r = o);
    }
    return r;
  }
  /**
   * Create a new cart
   */
  async createCart() {
    const a = (await this.client.query(K)).createGuestCart.cart.id;
    return this.client.setCartId(a), a;
  }
  /**
   * Add item to cart.
   * @param sku - Product SKU
   * @param quantity - Quantity to add
   * @param callOptions - Optional selected_options (e.g. configurable options), query, transform, afterTransform hooks
   * @returns Updated cart
   */
  async addItem(e, a, n) {
    var _, g, E, f;
    const {
      selected_options: i,
      query: t,
      transform: r,
      afterTransform: o
    } = n ?? {}, s = n ? { query: t, transform: r, afterTransform: o } : {}, c = this.mergeOptions("addItem", s);
    let l = this.client.getCartId();
    l || (l = await this.createCart());
    let m;
    if (c.query) {
      const A = await c.query(e, a, l), T = await this.client.query(A.query, A.variables ?? {});
      if (m = T.cart ?? ((_ = T.addProductsToCart) == null ? void 0 : _.cart) ?? T, ((E = (g = T.addProductsToCart) == null ? void 0 : g.user_errors) == null ? void 0 : E.length) > 0)
        throw new Error(T.addProductsToCart.user_errors[0].message);
    } else {
      const A = [{ sku: e, quantity: a }];
      i && (A[0].selected_options = i);
      const T = await this.client.query(j, {
        cartId: l,
        cartItems: A
      });
      if (((f = T.addProductsToCart.user_errors) == null ? void 0 : f.length) > 0)
        throw new Error(T.addProductsToCart.user_errors[0].message);
      m = T.addProductsToCart.cart;
    }
    let d;
    if (c.transform ? d = await c.transform(m) : d = O(m), c.afterTransform) {
      const A = await c.afterTransform(d, m);
      A !== void 0 && (d = A);
    }
    return d;
  }
  /**
   * Update cart item quantity.
   * @param itemId - Cart line item UID
   * @param quantity - New quantity
   * @param options - Optional query, transform, afterTransform hooks
   * @returns Updated cart
   */
  async updateItem(e, a, n = {}) {
    var s, c;
    const i = this.mergeOptions("updateItem", n), t = this.client.getCartId();
    if (!t)
      throw new Error("No active cart");
    let r;
    if (i.query) {
      const l = await i.query(e, a, t), m = await this.client.query(l.query, l.variables ?? {});
      r = m.cart ?? ((s = m.updateCartItems) == null ? void 0 : s.cart) ?? m;
    } else
      r = (c = (await this.client.query(Z, {
        cartId: t,
        cartItems: [{ cart_item_uid: e, quantity: a }]
      })).updateCartItems) == null ? void 0 : c.cart;
    let o;
    if (i.transform ? o = await i.transform(r) : o = O(r), i.afterTransform) {
      const l = await i.afterTransform(o, r);
      l !== void 0 && (o = l);
    }
    return o;
  }
  /**
   * Remove item from cart.
   * @param itemId - Cart line item UID to remove
   * @param options - Optional query, transform, afterTransform hooks
   * @returns Updated cart
   */
  async removeItem(e, a = {}) {
    var o, s;
    const n = this.mergeOptions("removeItem", a), i = this.client.getCartId();
    if (!i)
      throw new Error("No active cart");
    let t;
    if (n.query) {
      const c = await n.query(e, i), l = await this.client.query(c.query, c.variables ?? {});
      t = l.cart ?? ((o = l.removeItemFromCart) == null ? void 0 : o.cart) ?? l;
    } else
      t = (s = (await this.client.query(J, {
        cartId: i,
        cartItemUid: e
      })).removeItemFromCart) == null ? void 0 : s.cart;
    let r;
    if (n.transform ? r = await n.transform(t) : r = O(t), n.afterTransform) {
      const c = await n.afterTransform(r, t);
      c !== void 0 && (r = c);
    }
    return r;
  }
  /**
   * Apply coupon code to the current cart.
   * @param code - Coupon code to apply
   * @param options - Optional query, transform, afterTransform hooks
   * @returns Updated cart
   */
  async applyCoupon(e, a = {}) {
    const n = this.mergeOptions("applyCoupon", a), i = this.client.getCartId();
    if (!i) throw new Error("No active cart");
    let t;
    if (n.query) {
      const o = await n.query(e, i);
      t = await this.client.query(o.query, o.variables ?? {});
    } else
      await this.client.query(X, { cartId: i, couponCode: e }), t = { applied: !0 };
    let r;
    if (n.transform ? r = await n.transform(t) : r = await this.getCart(), n.afterTransform) {
      const o = await n.afterTransform(r, t);
      if (o !== void 0) return o;
    }
    return r;
  }
  /**
   * Clear cart
   */
  async clearCart() {
    this.client.clearCartId(), await this.createCart();
  }
  /**
   * Set guest email on cart (Adobe Commerce Edge).
   * @param cartId - Cart ID
   * @param email - Guest email address
   * @param options - Optional query, transform, afterTransform hooks
   * @returns Updated cart (from getCart after mutation when using default)
   */
  async setGuestEmailOnCart(e, a, n = {}) {
    const i = this.mergeOptions("setGuestEmailOnCart", n);
    let t;
    if (i.query) {
      const o = await i.query(e, a.trim());
      t = await this.client.query(o.query, o.variables ?? {});
    } else
      t = await this.client.query(re, { cartId: e, email: a.trim() });
    let r;
    if (i.transform ? r = await i.transform(t) : r = await this.getCart(), i.afterTransform) {
      const o = await i.afterTransform(r, t);
      if (o !== void 0) return o;
    }
    return r;
  }
  /**
   * Estimate totals with a shipping method (Adobe Commerce Edge).
   * @param cartId - Cart ID
   * @param address - country_code; optional postcode, region (object with region_id and/or region_code)
   * @param shippingMethod - { carrier_code, method_code } e.g. { carrier_code: 'flatrate', method_code: 'flatrate' }
   * @param options - Optional query, transform, afterTransform hooks
   * @returns Cart with updated totals (transformed to standard Cart type when using default)
   */
  async estimateTotals(e, a, n, i = {}) {
    var c;
    const t = this.mergeOptions("estimateTotals", i), r = {
      country_code: a.country_code,
      ...a.postcode != null && a.postcode !== "" && { postcode: a.postcode },
      ...a.region != null && (a.region.region_id != null || a.region.region_code != null) && { region: a.region }
    };
    let o;
    if (t.query) {
      const l = await t.query(e, a, n);
      o = await this.client.query(l.query, l.variables ?? {});
    } else
      o = await this.client.query(ee, {
        cartId: e,
        address: r,
        shipping_method: n
      });
    let s;
    if (t.transform)
      s = await t.transform(o);
    else {
      const l = (c = o.estimateTotals) == null ? void 0 : c.cart;
      if (!l) return this.getCart();
      s = O(l);
    }
    if (t.afterTransform) {
      const l = await t.afterTransform(s, o);
      if (l !== void 0) return l;
    }
    return s;
  }
  /**
   * Set payment method on cart (Adobe Commerce Edge).
   * @param cartId - Cart ID
   * @param paymentMethodCode - Payment method code (e.g. "payment_services_paypal_hosted_fields")
   * @param options - Optional query, transform, afterTransform hooks
   * @returns Updated cart (from getCart after mutation when using default)
   */
  async setPaymentMethodOnCart(e, a, n = {}) {
    const i = this.mergeOptions("setPaymentMethodOnCart", n);
    let t;
    if (i.query) {
      const o = await i.query(e, a);
      t = await this.client.query(o.query, o.variables ?? {});
    } else
      t = await this.client.query(ae, {
        cartId: e,
        paymentMethod: { code: a }
      });
    let r;
    if (i.transform ? r = await i.transform(t) : r = await this.getCart(), i.afterTransform) {
      const o = await i.afterTransform(r, t);
      if (o !== void 0) return o;
    }
    return r;
  }
  /**
   * Place order (Adobe Commerce Edge).
   * @param cartId - Cart ID
   * @param options - Optional query, transform, afterTransform hooks
   * @returns { order?, errors? } – order contains id, number, status, order_date (and more when using full fragment)
   */
  async placeOrder(e, a = {}) {
    var r;
    const n = this.mergeOptions("placeOrder", a);
    let i;
    if (n.query) {
      const o = await n.query(e);
      i = await this.client.query(o.query, o.variables ?? {});
    } else
      i = await this.client.query(ie, { cartId: e });
    let t;
    if (n.transform)
      t = await n.transform(i);
    else {
      const o = i.placeOrder;
      t = {
        order: o == null ? void 0 : o.orderV2,
        errors: (r = o == null ? void 0 : o.errors) != null && r.length ? o.errors : void 0
      };
    }
    if (n.afterTransform) {
      const o = await n.afterTransform(t, i);
      if (o !== void 0) return o;
    }
    return t;
  }
  /**
   * Get order by token (guest order, e.g. for order confirmation page).
   * @param token - Order token (from place order response or URL orderRef)
   * @param options - Optional query, transform, afterTransform hooks
   * @returns { order?, errors? } – order has same shape as place order (items, total, addresses, etc.)
   */
  async getOrderByToken(e, a = {}) {
    const n = this.mergeOptions("getOrderByToken", a);
    let i;
    if (n.query) {
      const r = await n.query(e);
      i = await this.client.query(r.query, r.variables ?? {});
    } else
      i = await this.client.query(ne, { token: e });
    let t;
    if (n.transform)
      t = await n.transform(i);
    else {
      const r = i == null ? void 0 : i.guestOrderByToken;
      t = r != null ? { order: r } : { errors: [{ message: "Order not found" }] };
    }
    if (n.afterTransform) {
      const r = await n.afterTransform(t, i);
      if (r !== void 0) return r;
    }
    return t;
  }
  /**
   * Set shipping address on cart and set billing to same-as-shipping (Adobe Commerce Edge).
   * @param cartId - Cart ID
   * @param address - firstname, lastname, street, city, region, postcode, country_code; optional telephone, company, region_id, etc.
   * @param options - Optional query, transform, afterTransform hooks
   * @returns Full cart and shipping methods from the mutation response (when using default)
   */
  async setShippingAddressOnCart(e, a, n = {}) {
    var s, c, l, m, d;
    const i = this.mergeOptions("setShippingAddressOnCart", n), t = {
      firstname: a.firstname,
      lastname: a.lastname,
      street: a.street,
      city: a.city,
      ...a.region && { region: a.region },
      ...a.region_id !== void 0 && { region_id: a.region_id },
      postcode: a.postcode,
      country_code: a.country_code,
      ...a.telephone !== void 0 && { telephone: a.telephone },
      ...a.company !== void 0 && { company: a.company },
      ...a.vat_id !== void 0 && { vat_id: a.vat_id },
      ...((s = a.custom_attributes) == null ? void 0 : s.length) && { custom_attributes: a.custom_attributes },
      save_in_address_book: a.save_in_address_book ?? !!this.client.getAuthToken()
    };
    let r;
    if (i.query) {
      const _ = await i.query(e, a);
      r = await this.client.query(_.query, _.variables ?? {});
    } else
      r = await this.client.query(oe, {
        cartId: e,
        shippingAddressInput: { address: t }
      });
    let o;
    if (i.transform)
      o = await i.transform(r);
    else {
      const g = (((d = (m = (l = (c = r.setShippingAddressesOnCart) == null ? void 0 : c.cart) == null ? void 0 : l.shipping_addresses) == null ? void 0 : m[0]) == null ? void 0 : d.available_shipping_methods) ?? []).filter((f) => f.available !== !1 && !f.error_message).map((f) => {
        var I, v;
        const A = [f.carrier_code, f.method_code].filter(Boolean).join("_") || `shipping_${Math.random().toString(36).slice(2, 9)}`, T = f.method_title || f.carrier_title || A, y = ((I = f.amount) == null ? void 0 : I.currency) ?? "USD", h = typeof ((v = f.amount) == null ? void 0 : v.value) == "number" ? f.amount.value : 0;
        return {
          id: A,
          label: T,
          description: f.carrier_title && f.method_title ? f.carrier_title : void 0,
          price: h,
          currency: y
        };
      });
      o = { cart: await this.getCart(), shippingMethods: g };
    }
    if (i.afterTransform) {
      const _ = await i.afterTransform(o, r);
      if (_ !== void 0) return _;
    }
    return o;
  }
  /**
   * Estimate shipping methods for a cart and address (Adobe Commerce Edge).
   * @param cartId - Cart ID
   * @param address - At least country_code (e.g. { country_code: 'US' }); optional region_code, postcode
   * @param options - Optional query, transform, afterTransform hooks
   * @returns Shipping options in UI shape (id, label, description?, price, currency)
   */
  async estimateShippingMethods(e, a, n = {}) {
    const i = this.mergeOptions("estimateShippingMethods", n), t = {
      country_code: a.country_code,
      region: {
        region_code: a.region_code,
        region_id: 1
        // TODO needs fix
      }
    };
    let r;
    if (i.query) {
      const s = await i.query(e, t);
      r = await this.client.query(s.query, s.variables ?? {});
    } else
      r = await this.client.query(te, {
        cartId: e,
        address: t
      });
    let o;
    if (i.transform ? o = await i.transform(r) : o = (r.estimateShippingMethods ?? []).filter((c) => c.available !== !1 && !c.error_message).map((c) => {
      var g, E;
      const l = [c.carrier_code, c.method_code].filter(Boolean).join("_") || `shipping_${Math.random().toString(36).slice(2, 9)}`, m = c.method_title || c.carrier_title || l, d = ((g = c.amount) == null ? void 0 : g.currency) ?? "USD", _ = typeof ((E = c.amount) == null ? void 0 : E.value) == "number" ? c.amount.value : 0;
      return {
        id: l,
        label: m,
        description: c.carrier_title && c.method_title ? c.carrier_title : void 0,
        price: _,
        currency: d
      };
    }), i.afterTransform) {
      const s = await i.afterTransform(o, r);
      if (s !== void 0) return s;
    }
    return o;
  }
  async getCountries() {
    var i, t;
    const e = await this.client.query(Te), a = (r) => r ? r.split(",").map((o) => o.trim()).filter(Boolean) : [];
    return {
      countries: (e.countries ?? []).map((r) => {
        const o = {
          code: r.two_letter_abbreviation,
          name: r.full_name_locale
        };
        return Array.isArray(r.available_regions) && r.available_regions.length > 0 && (o.regions = r.available_regions.map((s) => ({ id: s.id, code: s.code, name: s.name }))), o;
      }),
      regionRequiredCountries: a((i = e.storeConfig) == null ? void 0 : i.countries_with_required_region),
      optionalZipCountries: a((t = e.storeConfig) == null ? void 0 : t.optional_zip_countries)
    };
  }
}
const k = "commerce_customer_data", $ = "commerce_auth_token", Ie = 7;
function ve(u) {
  if (typeof document > "u") return;
  const e = Ie * 24 * 60 * 60;
  document.cookie = `${$}=${encodeURIComponent(u)}; path=/; max-age=${e}; SameSite=Lax`;
}
function Ce() {
  typeof document > "u" || (document.cookie = `${$}=; path=/; max-age=0`);
}
function D() {
  if (typeof localStorage > "u") return null;
  const u = $;
  return {
    setToken(e) {
      localStorage.setItem(u, e), ve(e);
    },
    removeToken() {
      localStorage.removeItem(u), Ce();
    },
    setCustomerData(e) {
      try {
        localStorage.setItem(k, JSON.stringify(e));
      } catch {
      }
    },
    removeCustomerData() {
      localStorage.removeItem(k);
    }
  };
}
function F(u) {
  var e;
  return {
    id: u.email,
    // Adobe Commerce uses email as identifier in some contexts
    email: u.email,
    firstName: u.firstname,
    lastName: u.lastname,
    addresses: ((e = u.addresses) == null ? void 0 : e.map((a) => {
      var n;
      return {
        id: a.id,
        firstName: a.firstname,
        lastName: a.lastname,
        street: a.street,
        city: a.city,
        region: (n = a.region) == null ? void 0 : n.region,
        postcode: a.postcode,
        country: a.country_code,
        telephone: a.telephone,
        isDefaultShipping: a.default_shipping,
        isDefaultBilling: a.default_billing
      };
    })) || []
  };
}
class Se extends W {
  constructor(e, a = {}) {
    super({ client: e }), this.client = e, this.defaultOptions = a;
  }
  mergeOptions(e, a = {}) {
    return { ...this.defaultOptions[e] ?? {}, ...a };
  }
  /** Default filter: order_date from (3 months ago) to (end of today). */
  // eslint-disable-next-line class-methods-use-this
  getDefaultOrdersFilter() {
    const e = /* @__PURE__ */ new Date(), a = `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")} 23:59:59`, n = new Date(e);
    return n.setMonth(n.getMonth() - 3), { order_date: { from: `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`, to: a } };
  }
  /**
   * Get current customer (interface method). Delegates to getCustomer.
   */
  async getCurrentCustomer(e = {}) {
    return this.getCustomer(e);
  }
  /**
   * Get current customer
   * Note: Requires customer to be authenticated (token in headers)
   */
  async getCustomer(e = {}) {
    const a = this.mergeOptions("getCustomer", e);
    let n;
    if (a.query) {
      const t = await a.query();
      n = await this.client.query(t.query, t.variables ?? {});
    } else
      try {
        n = await this.client.query(se);
      } catch {
        n = { customer: null };
      }
    let i;
    if (a.transform ? i = await a.transform(n.customer ?? n ?? null) : n.customer ? i = F(n.customer) : i = null, a.afterTransform) {
      const t = await a.afterTransform(i, n);
      t !== void 0 && (i = t);
    }
    return i;
  }
  /**
   * Sign in customer (interface method). When options.query is provided, fires that GraphQL request
   * and uses the result; otherwise delegates to login().
   */
  async signIn(e, a, n = {}) {
    var o;
    const i = this.mergeOptions("signIn", n);
    let t, r;
    if (i.query) {
      const s = await i.query(e, a);
      r = await this.client.query(s.query, s.variables ?? {}, { minimalHeaders: !0 });
      const c = r.customer ?? r.generateCustomerToken ?? r;
      if (i.transform)
        t = await i.transform(c);
      else if (r.customer)
        t = F(r.customer);
      else if ((o = r.generateCustomerToken) != null && o.customer)
        t = F(r.generateCustomerToken.customer);
      else
        throw new Error("Sign in failed: no customer in response");
    } else
      t = await this.login(e, a), i.transform && (t = await i.transform(t));
    if (i.afterTransform) {
      const s = await i.afterTransform(t, r);
      s !== void 0 && (t = s);
    }
    return t;
  }
  /**
   * Sign up (create) customer using createCustomerV2 mutation.
   */
  async signUp(e, a = {}) {
    var o, s, c, l;
    const n = this.mergeOptions("signUp", a);
    let i, t;
    if (n.query) {
      const m = await n.query(e);
      t = await this.client.query(m.query, m.variables ?? {}, { minimalHeaders: !0 });
    } else
      t = await this.client.query(
        me,
        {
          input: {
            firstname: e.firstName,
            lastname: e.lastName,
            email: e.email,
            password: e.password
          }
        },
        { minimalHeaders: !0 }
      );
    const r = ((o = t == null ? void 0 : t.createCustomerV2) == null ? void 0 : o.customer) ?? (t == null ? void 0 : t.customer) ?? t;
    if (n.transform)
      i = await n.transform(r);
    else if (r != null && r.email)
      i = {
        id: r.email,
        email: r.email,
        firstName: r.firstname,
        lastName: r.lastname
      };
    else {
      const m = ((s = t == null ? void 0 : t.createCustomerV2) == null ? void 0 : s.message) ?? ((l = (c = t == null ? void 0 : t.errors) == null ? void 0 : c[0]) == null ? void 0 : l.message) ?? "Sign up failed";
      throw new Error(m);
    }
    if (n.afterTransform) {
      const m = await n.afterTransform(i, t);
      m !== void 0 && (i = m);
    }
    return i;
  }
  /**
   * Sign out customer (interface method). Delegates to logout.
   */
  async signOut() {
    return this.logout();
  }
  /**
   * Login customer: calls generateCustomerToken, persists token, returns minimal customer.
   * Consumer should redirect (e.g. to /customer/account); next page load will have token in config.
   */
  async login(e, a, n) {
    var m, d, _;
    const i = await this.client.query(
      _e,
      { email: e.trim(), password: a },
      { minimalHeaders: !0 }
    ), t = (m = i == null ? void 0 : i.generateCustomerToken) == null ? void 0 : m.token;
    if (!t)
      throw new Error(((d = i == null ? void 0 : i.generateCustomerToken) == null ? void 0 : d.message) ?? "Login failed: no token returned");
    const r = this.defaultOptions.tokenStorage ?? D();
    r && r.setToken(t);
    const o = this.client.getCartId();
    let s = null;
    try {
      const g = await this.client.queryWithToken(
        t,
        le
      );
      s = (g == null ? void 0 : g.customer) ?? null, s && (r != null && r.setCustomerData) && r.setCustomerData(s);
    } catch {
    }
    let c = null;
    try {
      const g = await this.client.queryWithToken(
        t,
        ce
      );
      c = ((_ = g == null ? void 0 : g.customerCart) == null ? void 0 : _.id) ?? null, c && this.client.setCartId(c);
    } catch {
    }
    if (o && c && o !== c)
      try {
        await this.client.queryWithToken(t, ue, {
          guestCartId: o,
          customerCartId: c
        }), this.client.setCartId(c);
      } catch {
      }
    const l = e.trim();
    return {
      id: (s == null ? void 0 : s.email) ?? l,
      email: (s == null ? void 0 : s.email) ?? l,
      firstName: s == null ? void 0 : s.firstname,
      lastName: s == null ? void 0 : s.lastname
    };
  }
  /**
   * Update customer profile (firstname, lastname, email). Requires Bearer token.
   */
  async updateCustomer(e, a = {}) {
    var l;
    const n = this.mergeOptions("updateCustomer", a), i = this.client.getAuthToken();
    if (!i)
      throw new Error("Must be logged in to update profile");
    const t = {};
    if (e.firstName !== void 0 && (t.firstname = e.firstName), e.lastName !== void 0 && (t.lastname = e.lastName), Object.keys(t).length === 0) {
      const m = await this.getCustomer();
      if (!m) throw new Error("Customer not found");
      return m;
    }
    let r;
    if (n.query) {
      const m = await n.query(e);
      r = await this.client.queryWithToken(
        i,
        m.query,
        m.variables ?? {}
      );
    } else
      r = await this.client.queryWithToken(i, de, {
        input: t
      });
    const o = ((l = r == null ? void 0 : r.updateCustomerV2) == null ? void 0 : l.customer) ?? (r == null ? void 0 : r.customer) ?? r;
    let s;
    if (n.transform)
      s = await n.transform(r);
    else if (o)
      s = {
        id: o.email ?? "",
        email: o.email ?? "",
        firstName: o.firstname,
        lastName: o.lastname
      };
    else
      throw new Error("Update succeeded but no customer returned");
    if (n.afterTransform) {
      const m = await n.afterTransform(s, r);
      m !== void 0 && (s = m);
    }
    const c = this.defaultOptions.tokenStorage ?? D();
    return c != null && c.setCustomerData && o && c.setCustomerData({
      firstname: s.firstName ?? o.firstname,
      lastname: s.lastName ?? o.lastname,
      email: s.email
    }), s;
  }
  /**
   * Change customer password. Requires Bearer token.
   */
  async changePassword(e, a = {}) {
    var r;
    const n = this.mergeOptions("changePassword", a), i = this.client.getAuthToken();
    if (!i)
      throw new Error("Must be logged in to change password");
    if (!((r = e.currentPassword) != null && r.trim()) || !e.newPassword)
      throw new Error("Current password and new password are required");
    let t;
    if (n.query) {
      const o = await n.query(e);
      t = await this.client.queryWithToken(
        i,
        o.query,
        o.variables ?? {}
      );
    } else
      t = await this.client.queryWithToken(i, pe, {
        currentPassword: e.currentPassword.trim(),
        newPassword: e.newPassword
      });
    n.transform && await n.transform(t), n.afterTransform && await n.afterTransform(void 0, t);
  }
  /**
   * Get customer orders (paginated). Requires Bearer token.
   * Default filter: last 3 months (order_date from/to). Pass filter in params to override.
   */
  async getCustomerOrders(e = {}, a = {}) {
    var m;
    const n = this.mergeOptions("getCustomerOrders", a), i = this.client.getAuthToken();
    if (!i)
      throw new Error("Must be logged in to view orders");
    const t = e.page ?? 1, r = e.pageSize ?? 10, o = {
      currentPage: t,
      pageSize: r,
      sort: e.sort ?? { sort_direction: "DESC", sort_field: "CREATED_AT" }
    };
    e.filter && Object.keys(e.filter).length > 0 ? o.filter = e.filter : o.filter = this.getDefaultOrdersFilter();
    let s;
    if (n.query) {
      const d = await n.query(e);
      s = await this.client.queryWithToken(
        i,
        d.query,
        d.variables ?? {}
      );
    } else
      s = await this.client.queryWithToken(
        i,
        ge,
        o
      );
    const c = (m = s == null ? void 0 : s.customer) == null ? void 0 : m.orders;
    let l;
    if (n.transform ? l = await n.transform(s) : c ? l = {
      items: (c.items ?? []).map((_) => {
        var g;
        return {
          id: _.id,
          number: _.number,
          order_date: _.order_date,
          status: _.status,
          carrier: _.carrier,
          email: _.email,
          token: _.token,
          total: (g = _.total) != null && g.grand_total ? {
            value: _.total.grand_total.value,
            currency: _.total.grand_total.currency ?? "USD"
          } : void 0
        };
      }),
      page_info: c.page_info ? {
        current_page: c.page_info.current_page,
        page_size: c.page_info.page_size,
        total_pages: c.page_info.total_pages
      } : void 0,
      total_count: c.total_count
    } : l = { items: [] }, n.afterTransform) {
      const d = await n.afterTransform(l, s);
      d !== void 0 && (l = d);
    }
    return l;
  }
  /**
   * Get order by order number (logged-in customer). Requires Bearer token.
   * Use for order details page when URL has ?orderNumber=...
   */
  async getOrderByNumber(e, a = {}) {
    var o, s;
    const n = this.mergeOptions("getOrderByNumber", a), i = this.client.getAuthToken();
    if (!i)
      return { errors: [{ message: "Must be logged in to view order details" }] };
    let t;
    if (n.query) {
      const c = await n.query(e);
      t = await this.client.queryWithToken(
        i,
        c.query,
        c.variables ?? {}
      );
    } else
      t = await this.client.queryWithToken(i, fe, {
        orderNumber: e.trim()
      });
    let r;
    if (n.transform)
      r = await n.transform(t);
    else {
      const l = (((s = (o = t == null ? void 0 : t.customer) == null ? void 0 : o.orders) == null ? void 0 : s.items) ?? [])[0] ?? null;
      r = l != null ? { order: l } : { errors: [{ message: "Order not found" }] };
    }
    if (n.afterTransform) {
      const c = await n.afterTransform(r, t);
      c !== void 0 && (r = c);
    }
    return r;
  }
  /**
   * Logout customer: removes persisted token and clears stored cart id
   * so getCart uses guest flow and can create a new guest cart.
   */
  async logout() {
    var a;
    const e = this.defaultOptions.tokenStorage ?? D();
    e && (e.removeToken(), (a = e.removeCustomerData) == null || a.call(e)), this.client.clearCartId();
  }
}
function Me(u, e = {}) {
  const a = new V(u);
  return {
    client: a,
    products: new Re(a, e.products),
    cart: new he(a, e.cart),
    customer: new Se(a, e.customer)
  };
}
export {
  j as ADD_TO_CART_MUTATION,
  X as APPLY_COUPON_MUTATION,
  he as AdobeCommerceCartService,
  V as AdobeCommerceClient,
  Se as AdobeCommerceCustomerService,
  Re as AdobeCommerceProductService,
  pe as CHANGE_CUSTOMER_PASSWORD_MUTATION,
  K as CREATE_CART_MUTATION,
  me as CREATE_CUSTOMER_V2_MUTATION,
  H as CUSTOMER_CART_QUERY,
  te as ESTIMATE_SHIPPING_METHODS_MUTATION,
  ee as ESTIMATE_TOTALS_MUTATION,
  _e as GENERATE_CUSTOMER_TOKEN_MUTATION,
  x as GET_CART_QUERY,
  Te as GET_COUNTRIES_QUERY,
  le as GET_CUSTOMER_DATA_QUERY,
  ge as GET_CUSTOMER_ORDERS_QUERY,
  se as GET_CUSTOMER_QUERY,
  Q as GET_PRODUCT_EDGE_QUERY,
  we as GET_PRODUCT_QUERY,
  ne as GUEST_ORDER_BY_TOKEN_QUERY,
  ue as MERGE_CARTS_MUTATION,
  fe as ORDER_BY_NUMBER_QUERY,
  ie as PLACE_ORDER_MUTATION,
  U as PRODUCT_FRAGMENT,
  Y as PRODUCT_SEARCH_QUERY,
  J as REMOVE_ITEM_MUTATION,
  be as SEARCH_PRODUCTS_QUERY,
  re as SET_GUEST_EMAIL_ON_CART_MUTATION,
  ae as SET_PAYMENT_METHOD_ON_CART_MUTATION,
  oe as SET_SHIPPING_ADDRESS_ON_CART_MUTATION,
  Z as UPDATE_CART_ITEMS_MUTATION,
  de as UPDATE_CUSTOMER_V2_MUTATION,
  ce as VALIDATE_TOKEN_QUERY,
  Me as createAdobeCommerceServices
};
