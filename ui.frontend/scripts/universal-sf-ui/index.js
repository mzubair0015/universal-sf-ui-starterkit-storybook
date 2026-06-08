import { jsxs as s, jsx as e, Fragment as Z } from "preact/jsx-runtime";
import { createRenderer as U } from "@universal-sf-ui/ui/utils";
import { useStore as A } from "zustand";
import { p as fe } from "./productListStore.js";
import { useState as _e, useRef as ve, useEffect as te, useMemo as $e } from "preact/hooks";
function Ne({
  product: t,
  layout: a = "vertical",
  imageAspectRatio: m = "1:1",
  showQuickView: p = !0,
  showWishlist: h = !1,
  showBadges: c = !0,
  showAddToCart: o = !0,
  renderImage: d,
  renderTitle: r,
  renderPrice: N,
  renderActions: w,
  badge: C,
  footer: x,
  onAddToCart: g,
  onQuickView: v,
  onWishlist: n,
  onClick: _,
  className: y = "",
  loading: u = !1
}) {
  const S = [
    "usf-product-card",
    `usf-product-card--${a}`,
    u && "usf-product-card--loading",
    y
  ].filter(Boolean).join(" "), $ = (l) => {
    _ && (l.preventDefault(), _(t));
  }, P = (l) => {
    l.preventDefault(), l.stopPropagation(), g == null || g(t);
  }, F = (l) => {
    l.preventDefault(), l.stopPropagation(), v == null || v(t);
  }, f = (l) => {
    l.preventDefault(), l.stopPropagation(), n == null || n(t);
  }, L = t.price.special && t.price.special < t.price.regular ? Math.round((t.price.regular - t.price.special) / t.price.regular * 100) : null, R = t.showAddToCart !== void 0 ? t.showAddToCart : o;
  return /* @__PURE__ */ s("div", { class: S, children: [
    /* @__PURE__ */ s("div", { class: "usf-product-card__image-container", children: [
      c && /* @__PURE__ */ s("div", { class: "usf-product-card__badges", children: [
        C,
        !t.inStock && /* @__PURE__ */ e("span", { class: "usf-product-card__badge usf-product-card__badge--out-of-stock", children: "Out of Stock" }),
        L && /* @__PURE__ */ s("span", { class: "usf-product-card__badge usf-product-card__badge--sale", children: [
          "-",
          L,
          "%"
        ] })
      ] }),
      h && /* @__PURE__ */ e(
        "button",
        {
          class: "usf-product-card__wishlist",
          onClick: f,
          "aria-label": "Add to wishlist",
          type: "button",
          children: /* @__PURE__ */ e("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", children: /* @__PURE__ */ e("path", { d: "M10 17.5L8.5 16.1C4.5 12.5 2 10.2 2 7.5C2 5.5 3.5 4 5.5 4C6.7 4 7.8 4.6 8.5 5.5H11.5C12.2 4.6 13.3 4 14.5 4C16.5 4 18 5.5 18 7.5C18 10.2 15.5 12.5 11.5 16.1L10 17.5Z", stroke: "currentColor", "stroke-width": "1.5" }) })
        }
      ),
      d ? d(t) : /* @__PURE__ */ e(
        "a",
        {
          href: t.url,
          class: "usf-product-card__image-link",
          onClick: $,
          children: t.images[0] ? /* @__PURE__ */ e(
            "img",
            {
              src: t.images[0].url,
              alt: t.images[0].label || t.name,
              class: "usf-product-card__image",
              style: `aspect-ratio: ${m.replace(":", "/")}`,
              loading: "lazy"
            }
          ) : /* @__PURE__ */ e(
            "div",
            {
              class: "usf-product-card__image usf-product-card__image--placeholder",
              style: `aspect-ratio: ${m.replace(":", "/")}`,
              children: /* @__PURE__ */ s("svg", { width: "48", height: "48", viewBox: "0 0 48 48", fill: "none", children: [
                /* @__PURE__ */ e("path", { d: "M38 38H10V10H38V38Z", stroke: "currentColor", "stroke-width": "2" }),
                /* @__PURE__ */ e("path", { d: "M14 30L20 24L26 30L34 22L38 26", stroke: "currentColor", "stroke-width": "2" }),
                /* @__PURE__ */ e("circle", { cx: "18", cy: "16", r: "2", fill: "currentColor" })
              ] })
            }
          )
        }
      ),
      p && t.inStock && /* @__PURE__ */ e(
        "button",
        {
          class: "usf-product-card__quick-view",
          onClick: F,
          type: "button",
          children: "Quick View"
        }
      )
    ] }),
    /* @__PURE__ */ s("div", { class: "usf-product-card__content", children: [
      r ? r(t) : /* @__PURE__ */ e("h3", { class: "usf-product-card__title", children: /* @__PURE__ */ e("a", { href: t.url, onClick: $, children: t.name }) }),
      N ? N(t) : /* @__PURE__ */ e("div", { class: "usf-product-card__price", children: t.price.special && t.price.special < t.price.regular ? /* @__PURE__ */ s(Z, { children: [
        /* @__PURE__ */ s("span", { class: "usf-product-card__price-special", children: [
          t.price.currency,
          " ",
          t.price.special.toFixed(2)
        ] }),
        /* @__PURE__ */ s("span", { class: "usf-product-card__price-regular", children: [
          t.price.currency,
          " ",
          t.price.regular.toFixed(2)
        ] })
      ] }) : /* @__PURE__ */ s("span", { class: "usf-product-card__price-regular", children: [
        t.price.currency,
        " ",
        t.price.regular.toFixed(2)
      ] }) }),
      w ? w(t) : R ? /* @__PURE__ */ e("div", { class: "usf-product-card__actions", children: /* @__PURE__ */ e(
        "button",
        {
          class: "usf-product-card__add-to-cart",
          onClick: P,
          disabled: !t.inStock || u,
          type: "button",
          children: u ? "Adding..." : t.inStock ? "Add to Cart" : "Out of Stock"
        }
      ) }) : null,
      x && /* @__PURE__ */ e("div", { class: "usf-product-card__footer", children: x })
    ] })
  ] });
}
Ne.render = U(Ne);
function ye({
  products: t,
  store: a = fe,
  columns: m = { mobile: 2, tablet: 3, desktop: 4 },
  gap: p = "md",
  productCardProps: h = {},
  ProductCard: c,
  onAddToCart: o,
  onProductClick: d,
  onQuickView: r,
  className: N = "",
  showSkeleton: w = !0,
  skeletonCount: C = 8
}) {
  const x = A(a, ($) => $.products), g = A(a, ($) => $.loading), v = A(a, ($) => $.viewMode), n = t ?? x, _ = g && n.length === 0, y = [
    "usf-product-grid",
    `usf-product-grid--gap-${p}`,
    `usf-product-grid--view-${v}`,
    N
  ].filter(Boolean).join(" "), u = {
    "--usf-grid-cols-mobile": m.mobile || 2,
    "--usf-grid-cols-tablet": m.tablet || 3,
    "--usf-grid-cols-desktop": m.desktop || 4
  }, S = c || Ne;
  return _ && w ? /* @__PURE__ */ e("div", { class: y, style: u, children: Array.from({ length: C }).map(($, P) => /* @__PURE__ */ s("div", { class: "usf-product-grid__skeleton", children: [
    /* @__PURE__ */ e("div", { class: "usf-product-grid__skeleton-image" }),
    /* @__PURE__ */ s("div", { class: "usf-product-grid__skeleton-content", children: [
      /* @__PURE__ */ e("div", { class: "usf-product-grid__skeleton-title" }),
      /* @__PURE__ */ e("div", { class: "usf-product-grid__skeleton-price" }),
      /* @__PURE__ */ e("div", { class: "usf-product-grid__skeleton-button" })
    ] })
  ] }, P)) }) : !n || n.length === 0 ? /* @__PURE__ */ s("div", { class: "usf-product-grid--empty", children: [
    /* @__PURE__ */ s("svg", { width: "64", height: "64", viewBox: "0 0 64 64", fill: "none", children: [
      /* @__PURE__ */ e("path", { d: "M32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56Z", stroke: "currentColor", "stroke-width": "2" }),
      /* @__PURE__ */ e("path", { d: "M24 28L28 32L40 20", stroke: "currentColor", "stroke-width": "2" })
    ] }),
    /* @__PURE__ */ e("h3", { children: "No products found" }),
    /* @__PURE__ */ e("p", { children: "Try adjusting your filters or search terms" })
  ] }) : /* @__PURE__ */ e("div", { class: y, style: u, children: n.map(($) => /* @__PURE__ */ e(
    S,
    {
      product: $,
      ...h,
      onAddToCart: o,
      onClick: d,
      onQuickView: r
    },
    $.id
  )) });
}
ye.render = U(ye);
function xe({
  aggregations: t,
  store: a = fe,
  title: m = "Filters",
  showClearAll: p = !0,
  defaultExpanded: h = !0,
  onFilterChange: c,
  className: o = ""
}) {
  const d = A(a, (_) => _.aggregations), r = A(a, (_) => _.filters), N = t ?? d, w = r.categories && r.categories.length > 0 || r.priceRange !== void 0 || r.attributes && Object.keys(r.attributes).length > 0, C = () => {
    a.getState().clearFilters(), c == null || c({});
  }, x = (_, y) => {
    const u = r.categories || [], S = y ? [...u, _] : u.filter((P) => P !== _), $ = { ...r, categories: S };
    a.getState().updateFilters({ categories: S }), c == null || c($);
  }, g = (_, y, u) => {
    const S = r.attributes || {}, $ = S[_] || [], P = u ? [...$, y] : $.filter((L) => L !== y), F = { ...S, [_]: P }, f = { ...r, attributes: F };
    a.getState().updateFilters({ attributes: F }), c == null || c(f);
  }, v = (_, y) => {
    var u, S, $;
    return _ === "category" ? ((u = r.categories) == null ? void 0 : u.includes(y)) || !1 : (($ = (S = r.attributes) == null ? void 0 : S[_]) == null ? void 0 : $.includes(y)) || !1;
  }, n = [
    "usf-filter-panel",
    o
  ].filter(Boolean).join(" ");
  return !N || N.length === 0 ? null : /* @__PURE__ */ s("div", { class: n, children: [
    /* @__PURE__ */ s("div", { class: "usf-filter-panel__header", children: [
      /* @__PURE__ */ e("h2", { class: "usf-filter-panel__title", children: m }),
      p && w && /* @__PURE__ */ e(
        "button",
        {
          class: "usf-filter-panel__clear",
          onClick: C,
          type: "button",
          children: "Clear All"
        }
      )
    ] }),
    /* @__PURE__ */ e("div", { class: "usf-filter-panel__groups", children: N.map((_) => /* @__PURE__ */ s(
      "details",
      {
        class: "usf-filter-panel__group",
        open: h,
        children: [
          /* @__PURE__ */ s("summary", { class: "usf-filter-panel__group-title", children: [
            _.label,
            /* @__PURE__ */ e("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ e("path", { d: "M4 6L8 10L12 6", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }) })
          ] }),
          /* @__PURE__ */ e("div", { class: "usf-filter-panel__options", children: _.options.map((y) => /* @__PURE__ */ s(
            "label",
            {
              class: "usf-filter-panel__option",
              children: [
                /* @__PURE__ */ e(
                  "input",
                  {
                    type: "checkbox",
                    checked: v(_.field, y.value),
                    onChange: (u) => {
                      const { checked: S } = u.target;
                      _.field === "category" ? x(y.value, S) : g(_.field, y.value, S);
                    }
                  }
                ),
                /* @__PURE__ */ e("span", { class: "usf-filter-panel__option-label", children: y.label }),
                /* @__PURE__ */ s("span", { class: "usf-filter-panel__option-count", children: [
                  "(",
                  y.count,
                  ")"
                ] })
              ]
            },
            y.value
          )) })
        ]
      },
      _.field
    )) })
  ] });
}
xe.render = U(xe);
function Pe({
  currentPage: t,
  totalPages: a,
  pageSize: m,
  totalCount: p,
  store: h = fe,
  maxVisible: c = 7,
  showFirstLast: o = !0,
  showPageSize: d = !0,
  pageSizeOptions: r = [12, 24, 48, 96],
  onPageChange: N,
  onPageSizeChange: w,
  className: C = ""
}) {
  const x = A(h, (l) => l.page), g = A(h, (l) => l.pageSize), v = A(h, (l) => l.totalCount), n = t ?? x, _ = m ?? g, y = p ?? v, u = a ?? Math.ceil(y / _);
  if (u <= 1)
    return null;
  const S = (l) => {
    l < 1 || l > u || l === n || (h.getState().setPage(l), N == null || N(l), window.scrollTo({ top: 0, behavior: "smooth" }));
  }, $ = (l) => {
    const I = parseInt(l.target.value, 10);
    h.getState().setPageSize(I), w == null || w(I);
  }, F = (() => {
    const l = [];
    if (u <= c) {
      for (let k = 1; k <= u; k += 1)
        l.push(k);
      return l;
    }
    const I = Math.floor((c - 3) / 2), i = Math.ceil((c - 3) / 2);
    if (l.push(1), n <= I + 2) {
      for (let k = 2; k <= Math.min(c - 1, u - 1); k += 1)
        l.push(k);
      u > c - 1 && l.push("...");
    } else if (n >= u - i - 1) {
      l.push("...");
      for (let k = Math.max(2, u - c + 2); k <= u - 1; k += 1)
        l.push(k);
    } else {
      l.push("...");
      for (let k = n - I; k <= n + i; k += 1)
        l.push(k);
      l.push("...");
    }
    return u > 1 && l.push(u), l;
  })(), f = (n - 1) * _ + 1, L = Math.min(n * _, y), R = ["usf-pagination", C].filter(Boolean).join(" ");
  return /* @__PURE__ */ s("div", { class: R, children: [
    /* @__PURE__ */ s("div", { class: "usf-pagination__info", children: [
      "Showing ",
      f,
      "-",
      L,
      " of ",
      y,
      " products"
    ] }),
    /* @__PURE__ */ s("nav", { class: "usf-pagination__nav", "aria-label": "Pagination", children: [
      o && /* @__PURE__ */ e(
        "button",
        {
          class: "usf-pagination__button usf-pagination__button--first",
          onClick: () => S(1),
          disabled: n === 1,
          "aria-label": "First page",
          type: "button",
          children: /* @__PURE__ */ e("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ e("path", { d: "M11 12L7 8L11 4M5 12L5 4", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }) })
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          class: "usf-pagination__button usf-pagination__button--prev",
          onClick: () => S(n - 1),
          disabled: n === 1,
          "aria-label": "Previous page",
          type: "button",
          children: /* @__PURE__ */ e("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ e("path", { d: "M10 12L6 8L10 4", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }) })
        }
      ),
      F.map((l, I) => typeof l == "number" ? /* @__PURE__ */ e(
        "button",
        {
          class: `usf-pagination__button usf-pagination__button--page ${l === n ? "usf-pagination__button--active" : ""}`,
          onClick: () => S(l),
          "aria-label": `Page ${l}`,
          "aria-current": l === n ? "page" : void 0,
          type: "button",
          children: l
        },
        I
      ) : /* @__PURE__ */ e("span", { class: "usf-pagination__ellipsis", children: l }, I)),
      /* @__PURE__ */ e(
        "button",
        {
          class: "usf-pagination__button usf-pagination__button--next",
          onClick: () => S(n + 1),
          disabled: n === u,
          "aria-label": "Next page",
          type: "button",
          children: /* @__PURE__ */ e("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ e("path", { d: "M6 4L10 8L6 12", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }) })
        }
      ),
      o && /* @__PURE__ */ e(
        "button",
        {
          class: "usf-pagination__button usf-pagination__button--last",
          onClick: () => S(u),
          disabled: n === u,
          "aria-label": "Last page",
          type: "button",
          children: /* @__PURE__ */ e("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ e("path", { d: "M5 4L9 8L5 12M11 4L11 12", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }) })
        }
      )
    ] }),
    d && /* @__PURE__ */ s("div", { class: "usf-pagination__page-size", children: [
      /* @__PURE__ */ e("label", { for: "page-size-select", children: "Show:" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "page-size-select",
          value: _,
          onChange: $,
          class: "usf-pagination__page-size-select",
          children: r.map((l) => /* @__PURE__ */ e("option", { value: l, children: l }, l))
        }
      )
    ] })
  ] });
}
Pe.render = U(Pe);
const ze = [
  { value: "relevance", label: "Relevance", direction: "desc" },
  { value: "name", label: "Name (A-Z)", direction: "asc" },
  { value: "name", label: "Name (Z-A)", direction: "desc" },
  { value: "price", label: "Price (Low to High)", direction: "asc" },
  { value: "price", label: "Price (High to Low)", direction: "desc" },
  { value: "created_at", label: "Newest First", direction: "desc" }
];
function Le({
  value: t,
  store: a = fe,
  options: m,
  label: p = "Sort by:",
  variant: h = "dropdown",
  onChange: c,
  className: o = ""
}) {
  const d = A(a, (v) => v.sort), r = t ?? d, N = m ?? ze, w = (v, n) => {
    const _ = { field: v, direction: n };
    a.getState().setSort(v, n), c == null || c(_);
  }, C = (v) => {
    const { value: n } = v.target, [_, y] = n.split(":");
    w(_, y);
  }, x = `${r.field}:${r.direction}`, g = [
    "usf-sort-controls",
    `usf-sort-controls--${h}`,
    o
  ].filter(Boolean).join(" ");
  return h === "buttons" ? /* @__PURE__ */ s("div", { class: g, children: [
    p && /* @__PURE__ */ e("span", { class: "usf-sort-controls__label", children: p }),
    /* @__PURE__ */ e("div", { class: "usf-sort-controls__buttons", children: N.map((v, n) => {
      const y = `${v.value}:${v.direction || "asc"}` === x;
      return /* @__PURE__ */ e(
        "button",
        {
          class: `usf-sort-controls__button ${y ? "usf-sort-controls__button--active" : ""}`,
          onClick: () => w(v.value, v.direction || "asc"),
          type: "button",
          children: v.label
        },
        n
      );
    }) })
  ] }) : /* @__PURE__ */ s("div", { class: g, children: [
    /* @__PURE__ */ e("label", { for: "sort-select", class: "usf-sort-controls__label", children: p }),
    /* @__PURE__ */ e(
      "select",
      {
        id: "sort-select",
        class: "usf-sort-controls__select",
        value: x,
        onChange: C,
        children: N.map((v, n) => {
          const _ = `${v.value}:${v.direction || "asc"}`;
          return /* @__PURE__ */ e("option", { value: _, children: v.label }, n);
        })
      }
    )
  ] });
}
Le.render = U(Le);
function ke(t, a = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: a }).format(t ?? 0);
}
const De = /* @__PURE__ */ s("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
  /* @__PURE__ */ e("path", { d: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" }),
  /* @__PURE__ */ e("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
  /* @__PURE__ */ e("path", { d: "M16 10a4 4 0 0 1-8 0" })
] }), Ee = /* @__PURE__ */ s("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
  /* @__PURE__ */ e("polyline", { points: "3 6 5 6 21 6" }),
  /* @__PURE__ */ e("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" })
] });
function Ie({
  cartStore: t,
  cartIconUrl: a,
  checkoutUrl: m = "/checkout",
  viewCartUrl: p = "/cart",
  customerFirstName: h,
  accountUrl: c = "/customer/account",
  className: o = ""
}) {
  var $, P, F, f, L, R, l, I;
  const [d, r] = _e(!1), N = ve(null), w = ve(null), C = ve(0), x = 3e4, g = A(t, (i) => i.cart), v = A(t, (i) => i.loading), n = A(t, (i) => i.error);
  te(() => {
    t.getState().fetchCart();
  }, [t]), te(() => {
    if (!d) return;
    const i = Date.now();
    i - C.current < x || (C.current = i, t.getState().fetchCart());
  }, [d, t]), te(() => {
    if (!d) return;
    const i = (k) => {
      var V;
      const b = k.target;
      (V = w.current) != null && V.contains(b) || r(!1);
    };
    return document.addEventListener("click", i), () => document.removeEventListener("click", i);
  }, [d]);
  const _ = (($ = g == null ? void 0 : g.items) == null ? void 0 : $.reduce((i, k) => i + (k.quantity ?? 0), 0)) ?? 0, y = ((L = (f = (F = (P = g == null ? void 0 : g.items) == null ? void 0 : P[0]) == null ? void 0 : F.product) == null ? void 0 : f.price) == null ? void 0 : L.currency) ?? "USD", u = ((R = g == null ? void 0 : g.totals) == null ? void 0 : R.total) ?? 0, S = (i) => {
    t.getState().removeItem(i);
  };
  return /* @__PURE__ */ s("div", { ref: w, className: `usf-mini-cart ${o}`.trim(), children: [
    /* @__PURE__ */ s(
      "button",
      {
        type: "button",
        className: "usf-mini-cart-trigger",
        "aria-label": "Shopping cart",
        "aria-expanded": d,
        "aria-haspopup": "true",
        onClick: (i) => {
          i.stopPropagation(), r((k) => !k);
        },
        children: [
          /* @__PURE__ */ e("span", { className: "usf-mini-cart-trigger-icon", children: a ? /* @__PURE__ */ e("img", { src: a, alt: "", className: "usf-mini-cart-trigger-icon-img", "aria-hidden": "true" }) : De }),
          /* @__PURE__ */ e(
            "span",
            {
              className: `usf-mini-cart-trigger-badge ${_ > 0 ? "usf-mini-cart-trigger-badge--visible" : ""}`,
              "data-count": _,
              children: _
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ s(
      "div",
      {
        ref: N,
        className: "usf-mini-cart-panel",
        role: "dialog",
        "aria-label": "Shopping cart",
        hidden: !d,
        children: [
          /* @__PURE__ */ s("div", { className: "usf-mini-cart-panel-header", children: [
            h && /* @__PURE__ */ s("p", { className: "usf-mini-cart-panel-greeting", children: [
              "Hi, ",
              h,
              c && /* @__PURE__ */ s(Z, { children: [
                " · ",
                /* @__PURE__ */ e("a", { href: c, className: "usf-mini-cart-panel-account-link", children: "Account" })
              ] })
            ] }),
            /* @__PURE__ */ s("h2", { className: "usf-mini-cart-panel-title", children: [
              "Shopping Cart (",
              _,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ e("div", { className: "usf-mini-cart-panel-items", children: v && !((l = g == null ? void 0 : g.items) != null && l.length) && d ? /* @__PURE__ */ e("p", { className: "usf-mini-cart-panel-empty", children: "Loading..." }) : n ? /* @__PURE__ */ e("p", { className: "usf-mini-cart-panel-empty", children: "Unable to load cart." }) : (I = g == null ? void 0 : g.items) != null && I.length ? g.items.map((i) => {
            var z, E, T;
            const k = i.product ?? {}, b = (z = k.images) == null ? void 0 : z[0], V = i.options;
            return /* @__PURE__ */ s("div", { className: "usf-mini-cart-panel-item", children: [
              /* @__PURE__ */ e("div", { className: "usf-mini-cart-panel-item-image", children: b ? /* @__PURE__ */ e("img", { src: b.url, alt: b.label || k.name, loading: "lazy" }) : /* @__PURE__ */ e("span", { className: "usf-mini-cart-panel-item-placeholder" }) }),
              /* @__PURE__ */ s("div", { className: "usf-mini-cart-panel-item-details", children: [
                /* @__PURE__ */ e("div", { className: "usf-mini-cart-panel-item-name", children: k.name || "Product" }),
                /* @__PURE__ */ e("div", { className: "usf-mini-cart-panel-item-variant", children: k.sku || "" }),
                V && V.length > 0 && /* @__PURE__ */ e("div", { className: "usf-mini-cart-panel-item-options", children: V.map((M) => /* @__PURE__ */ s("span", { className: "usf-mini-cart-panel-item-option", children: [
                  M.label,
                  ": ",
                  M.value
                ] }, `${M.label}-${M.value}`)) }),
                /* @__PURE__ */ s("div", { className: "usf-mini-cart-panel-item-qty-price", children: [
                  i.quantity,
                  " x ",
                  ke(i.price, (E = k.price) == null ? void 0 : E.currency)
                ] }),
                /* @__PURE__ */ e("div", { className: "usf-mini-cart-panel-item-total", children: ke(i.subtotal, (T = k.price) == null ? void 0 : T.currency) })
              ] }),
              /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  className: "usf-mini-cart-panel-item-remove",
                  onClick: () => S(i.id),
                  "aria-label": "Remove item",
                  children: Ee
                }
              )
            ] }, i.id);
          }) : /* @__PURE__ */ e("p", { className: "usf-mini-cart-panel-empty", children: "Your cart is empty." }) }),
          /* @__PURE__ */ s("div", { className: "usf-mini-cart-panel-footer", children: [
            /* @__PURE__ */ s("div", { className: "usf-mini-cart-panel-subtotal", children: [
              /* @__PURE__ */ e("span", { children: "Subtotal" }),
              /* @__PURE__ */ e("strong", { className: "usf-mini-cart-panel-subtotal-value", children: ke(u, y) })
            ] }),
            /* @__PURE__ */ e("a", { href: m, className: "usf-mini-cart-panel-checkout button", children: "Checkout" }),
            /* @__PURE__ */ e("a", { href: p, className: "usf-mini-cart-panel-view-cart", children: "View Cart" })
          ] })
        ]
      }
    )
  ] });
}
Ie.render = U(Ie);
function be(t, a = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: a }).format(t ?? 0);
}
const Te = /* @__PURE__ */ s("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
  /* @__PURE__ */ e("polyline", { points: "3 6 5 6 21 6" }),
  /* @__PURE__ */ e("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" })
] });
function Me({
  cartStore: t,
  title: a = "Shopping Cart",
  loadingMessage: m = "Loading...",
  errorMessage: p = "Unable to load cart. Please try again.",
  emptyMessage: h = "Your cart is empty.",
  checkoutUrl: c = "/checkout",
  checkoutLabel: o = "Proceed to Checkout",
  continueShoppingUrl: d = "/",
  continueShoppingLabel: r = "Continue Shopping",
  showQuantity: N = !0,
  showRemoveItem: w = !0,
  showContinueShopping: C = !0,
  showCheckout: x = !0,
  subtotalLabel: g = "Subtotal",
  className: v = ""
}) {
  var L, R, l, I, i, k;
  const n = A(t, (b) => b.cart), _ = A(t, (b) => b.loading), y = A(t, (b) => b.error);
  te(() => {
    t.getState().fetchCart();
  }, [t]);
  const u = ((I = (l = (R = (L = n == null ? void 0 : n.items) == null ? void 0 : L[0]) == null ? void 0 : R.product) == null ? void 0 : l.price) == null ? void 0 : I.currency) ?? "USD", S = ((i = n == null ? void 0 : n.totals) == null ? void 0 : i.total) ?? 0, $ = (((k = n == null ? void 0 : n.items) == null ? void 0 : k.length) ?? 0) > 0, P = _ && !n, F = (b) => {
    t.getState().removeItem(b);
  }, f = (b, V) => {
    const z = Math.max(1, Math.min(999, V));
    t.getState().updateItem(b, z);
  };
  return /* @__PURE__ */ s("div", { className: `usf-cart ${v}`.trim(), children: [
    /* @__PURE__ */ e("h1", { className: "usf-cart__title", children: a }),
    P ? /* @__PURE__ */ e("p", { className: "usf-cart__empty", children: m }) : y ? /* @__PURE__ */ e("p", { className: "usf-cart__empty", children: p }) : $ ? /* @__PURE__ */ s(Z, { children: [
      /* @__PURE__ */ e("div", { className: "usf-cart__items", children: n.items.map((b) => {
        var T, M, K;
        const V = b.product ?? {}, z = (T = V.images) == null ? void 0 : T[0], E = b.options;
        return /* @__PURE__ */ s("div", { className: "usf-cart__item", children: [
          /* @__PURE__ */ e("div", { className: "usf-cart__item-image", children: z ? /* @__PURE__ */ e("img", { src: z.url, alt: z.label || V.name, loading: "lazy" }) : /* @__PURE__ */ e("span", { className: "usf-cart__item-placeholder" }) }),
          /* @__PURE__ */ s("div", { className: "usf-cart__item-details", children: [
            /* @__PURE__ */ e("div", { className: "usf-cart__item-name", children: V.name || "Product" }),
            /* @__PURE__ */ e("div", { className: "usf-cart__item-variant", children: V.sku || "" }),
            E && E.length > 0 && /* @__PURE__ */ e("div", { className: "usf-cart__item-options", children: E.map((O) => /* @__PURE__ */ s("span", { className: "usf-cart__item-option", children: [
              O.label,
              ": ",
              O.value
            ] }, `${O.label}-${O.value}`)) }),
            /* @__PURE__ */ s("div", { className: "usf-cart__item-price", children: [
              be(b.price, (M = V.price) == null ? void 0 : M.currency),
              " each"
            ] })
          ] }),
          N ? /* @__PURE__ */ s("div", { className: "usf-cart__item-qty", children: [
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: "usf-cart__item-qty-btn",
                "aria-label": "Decrease quantity",
                onClick: () => f(b.id, b.quantity - 1),
                children: "−"
              }
            ),
            /* @__PURE__ */ e("span", { className: "usf-cart__item-qty-value", "aria-live": "polite", children: b.quantity }),
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: "usf-cart__item-qty-btn",
                "aria-label": "Increase quantity",
                onClick: () => f(b.id, b.quantity + 1),
                children: "+"
              }
            )
          ] }) : /* @__PURE__ */ e("div", { className: "usf-cart__item-qty-placeholder", "aria-hidden": "true", children: b.quantity }),
          /* @__PURE__ */ e("div", { className: "usf-cart__item-total", children: be(b.subtotal, (K = V.price) == null ? void 0 : K.currency) }),
          w ? /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "usf-cart__item-remove",
              onClick: () => F(b.id),
              "aria-label": "Remove item",
              children: Te
            }
          ) : /* @__PURE__ */ e("div", { className: "usf-cart__item-remove-placeholder", "aria-hidden": "true" })
        ] }, b.id);
      }) }),
      /* @__PURE__ */ s("div", { className: "usf-cart__footer", children: [
        /* @__PURE__ */ s("div", { className: "usf-cart__subtotal", children: [
          /* @__PURE__ */ e("span", { children: g }),
          /* @__PURE__ */ e("strong", { className: "usf-cart__subtotal-value", children: be(S, u) })
        ] }),
        /* @__PURE__ */ s("div", { className: "usf-cart__actions", children: [
          C && /* @__PURE__ */ e("a", { href: d, className: "usf-cart__continue", children: r }),
          x && /* @__PURE__ */ e("a", { href: c, className: "usf-cart__checkout button", children: o })
        ] })
      ] })
    ] }) : /* @__PURE__ */ e("p", { className: "usf-cart__empty", children: h })
  ] });
}
Me.render = U(Me);
function Ue({
  value: t,
  onChange: a,
  title: m = "Contact details",
  emailLabel: p = "Email",
  phoneLabel: h = "Phone",
  firstNameLabel: c = "First name",
  lastNameLabel: o = "Last name",
  emailRequired: d = !0,
  disabled: r = !1,
  className: N = ""
}) {
  const w = (C) => {
    a({ ...t, ...C });
  };
  return /* @__PURE__ */ s("fieldset", { className: `usf-checkout-contact ${N}`.trim(), disabled: r, children: [
    /* @__PURE__ */ e("legend", { className: "usf-checkout-contact__title", children: m }),
    /* @__PURE__ */ s("div", { className: "usf-checkout-contact__grid", children: [
      /* @__PURE__ */ s("div", { className: "usf-checkout-contact__field usf-checkout-contact__field--half", children: [
        /* @__PURE__ */ e("label", { htmlFor: "usf-checkout-contact-firstName", className: "usf-checkout-contact__label", children: c }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "usf-checkout-contact-firstName",
            type: "text",
            className: "usf-checkout-contact__input",
            value: t.firstName ?? "",
            onInput: (C) => w({ firstName: C.target.value }),
            autoComplete: "given-name"
          }
        )
      ] }),
      /* @__PURE__ */ s("div", { className: "usf-checkout-contact__field usf-checkout-contact__field--half", children: [
        /* @__PURE__ */ e("label", { htmlFor: "usf-checkout-contact-lastName", className: "usf-checkout-contact__label", children: o }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "usf-checkout-contact-lastName",
            type: "text",
            className: "usf-checkout-contact__input",
            value: t.lastName ?? "",
            onInput: (C) => w({ lastName: C.target.value }),
            autoComplete: "family-name"
          }
        )
      ] }),
      /* @__PURE__ */ s("div", { className: "usf-checkout-contact__field", children: [
        /* @__PURE__ */ s("label", { htmlFor: "usf-checkout-contact-email", className: "usf-checkout-contact__label", children: [
          p,
          d && /* @__PURE__ */ e("span", { className: "usf-checkout-contact__required", "aria-hidden": "true", children: " *" })
        ] }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "usf-checkout-contact-email",
            type: "email",
            className: "usf-checkout-contact__input",
            value: t.email ?? "",
            onInput: (C) => w({ email: C.target.value }),
            autoComplete: "email",
            required: d
          }
        )
      ] }),
      /* @__PURE__ */ s("div", { className: "usf-checkout-contact__field", children: [
        /* @__PURE__ */ e("label", { htmlFor: "usf-checkout-contact-phone", className: "usf-checkout-contact__label", children: h }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "usf-checkout-contact-phone",
            type: "tel",
            className: "usf-checkout-contact__input",
            value: t.phone ?? "",
            onInput: (C) => w({ phone: C.target.value }),
            autoComplete: "tel"
          }
        )
      ] })
    ] })
  ] });
}
const Ze = (t) => t === "shipping" ? "Shipping address" : t === "billing" ? "Billing address" : "Address";
function qe({
  type: t,
  value: a,
  onChange: m,
  countries: p,
  title: h,
  streetLabel: c = "Street",
  cityLabel: o = "City",
  regionLabel: d = "State / Region",
  postcodeLabel: r = "ZIP / Postal code",
  countryLabel: N = "Country",
  telephoneLabel: w = "Phone",
  disabled: C = !1,
  className: x = ""
}) {
  const g = h ?? Ze(t), v = (f) => m({ ...a, ...f }), n = a.street ?? [], _ = Array.isArray(n) ? n.join(`
`) : String(n || ""), y = p ?? [], u = y.find((f) => f.code === a.country), S = (u == null ? void 0 : u.regions) ?? [], $ = S.length > 0, P = (f) => {
    v({ country: f, region: "", region_id: void 0 });
  }, F = (f) => {
    const L = S.find((R) => R.code === f);
    v({ region: f, region_id: L == null ? void 0 : L.id });
  };
  return /* @__PURE__ */ s("fieldset", { className: `usf-checkout-address ${x}`.trim(), disabled: C, children: [
    /* @__PURE__ */ e("legend", { className: "usf-checkout-address__title", children: g }),
    /* @__PURE__ */ s("div", { className: "usf-checkout-address__grid", children: [
      /* @__PURE__ */ s("div", { className: "usf-checkout-address__field usf-checkout-address__field--full", children: [
        /* @__PURE__ */ e("label", { htmlFor: `usf-checkout-address-street-${t}`, className: "usf-checkout-address__label", children: c }),
        /* @__PURE__ */ e(
          "textarea",
          {
            id: `usf-checkout-address-street-${t}`,
            className: "usf-checkout-address__input",
            rows: 2,
            value: _,
            onInput: (f) => v({ street: f.target.value.split(`
`).filter(Boolean) }),
            autoComplete: t === "shipping" ? "street-address" : "billing street-address"
          }
        )
      ] }),
      /* @__PURE__ */ s("div", { className: "usf-checkout-address__field", children: [
        /* @__PURE__ */ e("label", { htmlFor: `usf-checkout-address-city-${t}`, className: "usf-checkout-address__label", children: o }),
        /* @__PURE__ */ e(
          "input",
          {
            id: `usf-checkout-address-city-${t}`,
            type: "text",
            className: "usf-checkout-address__input",
            value: a.city ?? "",
            onInput: (f) => v({ city: f.target.value }),
            autoComplete: t === "shipping" ? "address-level2" : "billing address-level2"
          }
        )
      ] }),
      /* @__PURE__ */ s("div", { className: "usf-checkout-address__field", children: [
        /* @__PURE__ */ e("label", { htmlFor: `usf-checkout-address-region-${t}`, className: "usf-checkout-address__label", children: d }),
        $ ? /* @__PURE__ */ s(
          "select",
          {
            id: `usf-checkout-address-region-${t}`,
            className: "usf-checkout-address__input",
            value: a.region ?? "",
            onChange: (f) => F(f.target.value),
            autoComplete: t === "shipping" ? "address-level1" : "billing address-level1",
            children: [
              /* @__PURE__ */ e("option", { value: "", children: "Select a region" }),
              S.map((f) => /* @__PURE__ */ e("option", { value: f.code, children: f.name }, f.code))
            ]
          }
        ) : /* @__PURE__ */ e(
          "input",
          {
            id: `usf-checkout-address-region-${t}`,
            type: "text",
            className: "usf-checkout-address__input",
            value: a.region ?? "",
            onInput: (f) => v({ region: f.target.value, region_id: void 0 }),
            autoComplete: t === "shipping" ? "address-level1" : "billing address-level1"
          }
        )
      ] }),
      /* @__PURE__ */ s("div", { className: "usf-checkout-address__field", children: [
        /* @__PURE__ */ e("label", { htmlFor: `usf-checkout-address-postcode-${t}`, className: "usf-checkout-address__label", children: r }),
        /* @__PURE__ */ e(
          "input",
          {
            id: `usf-checkout-address-postcode-${t}`,
            type: "text",
            className: "usf-checkout-address__input",
            value: a.postcode ?? "",
            onInput: (f) => v({ postcode: f.target.value }),
            autoComplete: t === "shipping" ? "postal-code" : "billing postal-code"
          }
        )
      ] }),
      /* @__PURE__ */ s("div", { className: "usf-checkout-address__field usf-checkout-address__field--full", children: [
        /* @__PURE__ */ e("label", { htmlFor: `usf-checkout-address-country-${t}`, className: "usf-checkout-address__label", children: N }),
        /* @__PURE__ */ s(
          "select",
          {
            id: `usf-checkout-address-country-${t}`,
            className: "usf-checkout-address__input",
            value: a.country ?? "",
            onChange: (f) => P(f.target.value),
            autoComplete: t === "shipping" ? "country" : "billing country",
            children: [
              /* @__PURE__ */ e("option", { value: "", children: "Select a country" }),
              y.map(({ code: f, name: L }) => /* @__PURE__ */ e("option", { value: f, children: L }, f))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ s("div", { className: "usf-checkout-address__field usf-checkout-address__field--full", children: [
        /* @__PURE__ */ e("label", { htmlFor: `usf-checkout-address-telephone-${t}`, className: "usf-checkout-address__label", children: w }),
        /* @__PURE__ */ e(
          "input",
          {
            id: `usf-checkout-address-telephone-${t}`,
            type: "tel",
            className: "usf-checkout-address__input",
            value: a.telephone ?? "",
            onInput: (f) => v({ telephone: f.target.value }),
            autoComplete: "tel"
          }
        )
      ] })
    ] })
  ] });
}
function Oe(t, a = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: a }).format(t ?? 0);
}
function Ge({
  options: t,
  selectedId: a,
  onSelect: m,
  title: p = "Shipping method",
  disabled: h = !1,
  className: c = ""
}) {
  return t != null && t.length ? /* @__PURE__ */ s("fieldset", { className: `usf-checkout-shipping ${c}`.trim(), disabled: h, children: [
    /* @__PURE__ */ e("legend", { className: "usf-checkout-shipping__title", children: p }),
    /* @__PURE__ */ e("div", { className: "usf-checkout-shipping__list", role: "radiogroup", "aria-label": p, children: t.map((o) => /* @__PURE__ */ s(
      "label",
      {
        className: `usf-checkout-shipping__option ${a === o.id ? "usf-checkout-shipping__option--selected" : ""}`,
        children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "radio",
              name: "usf-checkout-shipping-method",
              value: o.id,
              checked: a === o.id,
              onInput: () => m(o.id),
              className: "usf-checkout-shipping__radio"
            }
          ),
          /* @__PURE__ */ s("span", { className: "usf-checkout-shipping__option-content", children: [
            /* @__PURE__ */ e("span", { className: "usf-checkout-shipping__option-label", children: o.label }),
            o.description && /* @__PURE__ */ e("span", { className: "usf-checkout-shipping__option-desc", children: o.description })
          ] }),
          /* @__PURE__ */ e("span", { className: "usf-checkout-shipping__option-price", children: o.price === 0 ? "Free" : Oe(o.price, o.currency) })
        ]
      },
      o.id
    )) })
  ] }) : /* @__PURE__ */ e(Z, {});
}
function Qe({
  methods: t,
  selectedId: a,
  onSelect: m,
  title: p = "Payment method",
  disabled: h = !1,
  className: c = "",
  children: o
}) {
  return t != null && t.length ? /* @__PURE__ */ s("fieldset", { className: `usf-checkout-payment ${c}`.trim(), disabled: h, children: [
    /* @__PURE__ */ e("legend", { className: "usf-checkout-payment__title", children: p }),
    /* @__PURE__ */ e("div", { className: "usf-checkout-payment__list", role: "radiogroup", "aria-label": p, children: t.map((d) => /* @__PURE__ */ s(
      "label",
      {
        className: `usf-checkout-payment__option ${a === d.id ? "usf-checkout-payment__option--selected" : ""}`,
        children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "radio",
              name: "usf-checkout-payment-method",
              value: d.id,
              checked: a === d.id,
              onInput: () => m(d.id),
              className: "usf-checkout-payment__radio"
            }
          ),
          /* @__PURE__ */ s("span", { className: "usf-checkout-payment__option-content", children: [
            /* @__PURE__ */ e("span", { className: "usf-checkout-payment__option-label", children: d.label }),
            d.description && /* @__PURE__ */ e("span", { className: "usf-checkout-payment__option-desc", children: d.description })
          ] })
        ]
      },
      d.id
    )) }),
    o && a && /* @__PURE__ */ e("div", { className: "usf-checkout-payment__form", children: o })
  ] }) : /* @__PURE__ */ e(Z, {});
}
function ee(t, a = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: a }).format(t ?? 0);
}
function Ae({
  cartStore: t,
  title: a = "Checkout",
  loadingMessage: m = "Loading...",
  errorMessage: p = "Unable to load cart. Please try again.",
  emptyMessage: h = "Your cart is empty.",
  backToCartUrl: c,
  backToCartLabel: o = "Back to cart",
  placeOrderUrl: d,
  placeOrderLabel: r = "Place Order",
  onPlaceOrder: N,
  showOrderSummary: w = !0,
  showSubtotal: C = !0,
  showTax: x = !0,
  showShipping: g = !0,
  showDiscount: v = !0,
  subtotalLabel: n = "Subtotal",
  taxLabel: _ = "Tax",
  shippingLabel: y = "Shipping",
  discountLabel: u = "Discount",
  totalLabel: S = "Total",
  className: $ = "",
  children: P,
  contact: F,
  onContactChange: f,
  shippingAddress: L,
  onShippingAddressChange: R,
  billingAddress: l,
  onBillingAddressChange: I,
  shippingOptions: i,
  selectedShippingId: k,
  onShippingMethodSelect: b,
  paymentMethods: V,
  selectedPaymentId: z,
  onPaymentMethodSelect: E,
  countries: T
}) {
  var se, ae, ce, ie, we;
  const M = A(t, (B) => B.cart), K = A(t, (B) => B.loading), O = A(t, (B) => B.error), ne = A(t, (B) => B.shippingAddress), re = A(t, (B) => B.contact), oe = A(t, (B) => B.paymentMethods), de = A(t, (B) => B.selectedPaymentId), j = ne || L || void 0, q = re || F || void 0, X = oe || V || void 0, G = de || z || "";
  te(() => {
    t.getState().fetchCart(!0);
  }, [t]);
  const H = ((ie = (ce = (ae = (se = M == null ? void 0 : M.items) == null ? void 0 : se[0]) == null ? void 0 : ae.product) == null ? void 0 : ce.price) == null ? void 0 : ie.currency) ?? "USD", D = (M == null ? void 0 : M.totals) ?? {
    subtotal: 0,
    tax: 0,
    shipping: 0,
    discount: 0,
    total: 0
  }, J = (((we = M == null ? void 0 : M.items) == null ? void 0 : we.length) ?? 0) > 0, me = K && !M, Y = async (B) => {
    if (B.preventDefault(), d || !M || !J) return;
    const W = {
      contact: q ?? void 0,
      shippingAddress: j,
      billingAddress: l ?? void 0,
      selectedShippingId: k ?? void 0,
      selectedPaymentId: z ?? void 0
    };
    try {
      await (N == null ? void 0 : N(M, W));
    } catch (le) {
      console.error("Place order failed", le);
    }
  }, ue = () => X && X.length > 0 && G != null && E ? /* @__PURE__ */ e(
    Qe,
    {
      methods: X,
      selectedId: G,
      onSelect: E,
      children: P
    }
  ) : P ? /* @__PURE__ */ e("div", { className: "usf-checkout__extra", children: P }) : null, pe = () => me ? /* @__PURE__ */ e("p", { className: "usf-checkout__empty", children: m }) : O ? /* @__PURE__ */ e("p", { className: "usf-checkout__empty", children: p }) : J ? /* @__PURE__ */ s(Z, { children: [
    q != null && f && /* @__PURE__ */ e(Ue, { value: q, onChange: f }),
    j != null && R && /* @__PURE__ */ e(
      qe,
      {
        type: "shipping",
        value: j,
        onChange: R,
        countries: T
      }
    ),
    l != null && I && /* @__PURE__ */ e(
      qe,
      {
        type: "billing",
        value: l,
        onChange: I,
        countries: T
      }
    ),
    i && i.length > 0 && k != null && b && /* @__PURE__ */ e(
      Ge,
      {
        options: i,
        selectedId: k,
        onSelect: b
      }
    ),
    w && /* @__PURE__ */ s("div", { className: "usf-checkout__summary", children: [
      /* @__PURE__ */ e("h2", { className: "usf-checkout__summary-title", children: "Order summary" }),
      /* @__PURE__ */ e("ul", { className: "usf-checkout__items", children: M.items.map((B) => {
        var Ce, Se;
        const W = B.product ?? {}, le = (Ce = W.images) == null ? void 0 : Ce[0], ge = B.options;
        return /* @__PURE__ */ s("li", { className: "usf-checkout__item", children: [
          /* @__PURE__ */ e("div", { className: "usf-checkout__item-image", children: le ? /* @__PURE__ */ e("img", { src: le.url, alt: le.label || W.name, loading: "lazy" }) : /* @__PURE__ */ e("span", { className: "usf-checkout__item-placeholder" }) }),
          /* @__PURE__ */ s("div", { className: "usf-checkout__item-details", children: [
            /* @__PURE__ */ e("span", { className: "usf-checkout__item-name", children: W.name || "Product" }),
            ge && ge.length > 0 && /* @__PURE__ */ e("span", { className: "usf-checkout__item-options", children: ge.map((he) => /* @__PURE__ */ s("span", { className: "usf-checkout__item-option", children: [
              he.label,
              ": ",
              he.value
            ] }, `${he.label}-${he.value}`)) }),
            /* @__PURE__ */ s("span", { className: "usf-checkout__item-qty", children: [
              "Qty: ",
              B.quantity
            ] })
          ] }),
          /* @__PURE__ */ e("div", { className: "usf-checkout__item-total", children: ee(B.subtotal, (Se = W.price) == null ? void 0 : Se.currency) })
        ] }, B.id);
      }) })
    ] }),
    /* @__PURE__ */ s("div", { className: "usf-checkout__totals", children: [
      C && /* @__PURE__ */ s("div", { className: "usf-checkout__total-row", children: [
        /* @__PURE__ */ e("span", { children: n }),
        /* @__PURE__ */ e("span", { children: ee(D.subtotal, H) })
      ] }),
      g && D.shipping != null && D.shipping > 0 && /* @__PURE__ */ s("div", { className: "usf-checkout__total-row", children: [
        /* @__PURE__ */ e("span", { children: y }),
        /* @__PURE__ */ e("span", { children: ee(D.shipping, H) })
      ] }),
      v && D.discount != null && D.discount > 0 && /* @__PURE__ */ s("div", { className: "usf-checkout__total-row usf-checkout__total-row--discount", children: [
        /* @__PURE__ */ e("span", { children: u }),
        /* @__PURE__ */ s("span", { children: [
          "-",
          ee(D.discount, H)
        ] })
      ] }),
      x && D.tax != null && D.tax > 0 && /* @__PURE__ */ s("div", { className: "usf-checkout__total-row", children: [
        /* @__PURE__ */ e("span", { children: _ }),
        /* @__PURE__ */ e("span", { children: ee(D.tax, H) })
      ] }),
      /* @__PURE__ */ s("div", { className: "usf-checkout__total-row usf-checkout__total-row--final", children: [
        /* @__PURE__ */ e("span", { children: S }),
        /* @__PURE__ */ e("strong", { children: ee(D.total, H) })
      ] })
    ] }),
    ue(),
    /* @__PURE__ */ s("div", { className: "usf-checkout__actions", children: [
      d ? /* @__PURE__ */ e("a", { href: d, className: "usf-checkout__button usf-checkout__button--primary", children: r }) : /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: "usf-checkout__button usf-checkout__button--primary",
          onClick: Y,
          children: r
        }
      ),
      c && /* @__PURE__ */ e("a", { href: c, className: "usf-checkout__button usf-checkout__button--secondary", children: o })
    ] })
  ] }) : /* @__PURE__ */ s("div", { className: "usf-checkout__empty-block", children: [
    /* @__PURE__ */ e("p", { className: "usf-checkout__empty", children: h }),
    c && /* @__PURE__ */ e("a", { href: c, className: "usf-checkout__button usf-checkout__button--secondary", children: o })
  ] });
  return /* @__PURE__ */ s("div", { className: `usf-checkout ${$}`.trim(), children: [
    /* @__PURE__ */ s("div", { className: "usf-checkout__header", children: [
      /* @__PURE__ */ e("h1", { className: "usf-checkout__title", children: a }),
      c && /* @__PURE__ */ e("a", { href: c, className: "usf-checkout__back", children: o })
    ] }),
    pe()
  ] });
}
Ae.render = U(Ae);
function Ye({
  images: t,
  productName: a,
  selectedIndex: m = 0,
  className: p = ""
}) {
  const [h, c] = _e(m), o = (t == null ? void 0 : t.length) > 0, d = o ? t[h] : null;
  return /* @__PURE__ */ s("div", { class: `usf-product-gallery ${p}`.trim(), children: [
    /* @__PURE__ */ e("div", { class: "usf-product-gallery__main", children: d ? /* @__PURE__ */ e(
      "img",
      {
        src: d.url,
        alt: d.label || a,
        class: "usf-product-gallery__main-image"
      }
    ) : /* @__PURE__ */ e("div", { class: "usf-product-gallery__placeholder", "aria-hidden": "true", children: /* @__PURE__ */ s("svg", { width: "120", height: "120", viewBox: "0 0 48 48", fill: "none", children: [
      /* @__PURE__ */ e("path", { d: "M38 38H10V10H38V38Z", stroke: "currentColor", "stroke-width": "2" }),
      /* @__PURE__ */ e("path", { d: "M14 30L20 24L26 30L34 22L38 26", stroke: "currentColor", "stroke-width": "2" }),
      /* @__PURE__ */ e("circle", { cx: "18", cy: "16", r: "2", fill: "currentColor" })
    ] }) }) }),
    o && t.length > 1 && /* @__PURE__ */ e("div", { class: "usf-product-gallery__thumbnails", role: "tablist", "aria-label": "Product images", children: t.map((r, N) => /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        role: "tab",
        "aria-selected": N === h,
        "aria-label": `View image ${N + 1}`,
        class: `usf-product-gallery__thumb ${N === h ? "usf-product-gallery__thumb--selected" : ""}`,
        onClick: () => c(N),
        children: /* @__PURE__ */ e("img", { src: r.url, alt: "", class: "usf-product-gallery__thumb-img" })
      },
      r.url
    )) })
  ] });
}
const Ke = (t) => {
  var m;
  const a = (m = t.values) == null ? void 0 : m[0];
  return !!(a && ("type" in a || "value" in a) && (a.__typename === "ProductViewOptionValueSwatch" || a.type === "color"));
};
function Xe({
  options: t,
  selected: a,
  onSelect: m,
  disabled: p = !1,
  className: h = ""
}) {
  return t != null && t.length ? /* @__PURE__ */ e("div", { class: `usf-product-options ${h}`.trim(), children: t.map((c) => {
    const o = Ke(c), d = a[c.id];
    return /* @__PURE__ */ s("div", { class: "usf-product-options__group", children: [
      /* @__PURE__ */ e("span", { class: "usf-product-options__label", children: c.title }),
      /* @__PURE__ */ e("div", { class: `usf-product-options__values usf-product-options__values--${o ? "swatch" : "button"}`, role: "group", "aria-label": c.title, children: c.values.map((r) => {
        const N = d === r.id, w = r.inStock === !1;
        if (o) {
          const C = r.value || r.title, x = r.type === "COLOR_HEX", g = r.type === "text" || r.type === "TEXT";
          return /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              class: `usf-product-options__swatch ${g ? "usf-product-options__swatch--text" : ""} ${N ? "usf-product-options__swatch--selected" : ""} ${w ? "usf-product-options__swatch--out" : ""}`,
              style: x && C ? { backgroundColor: C } : void 0,
              title: r.title,
              "aria-label": r.title,
              "aria-pressed": N,
              disabled: p || w,
              onClick: () => m(c.id, r.id),
              children: !x && /* @__PURE__ */ e("span", { class: "usf-product-options__swatch-text", children: r.title })
            },
            r.id
          );
        }
        return /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            class: `usf-product-options__button ${N ? "usf-product-options__button--selected" : ""} ${w ? "usf-product-options__button--out" : ""}`,
            "aria-pressed": N,
            disabled: p || w,
            onClick: () => m(c.id, r.id),
            children: r.title
          },
          r.id
        );
      }) })
    ] }, c.id);
  }) }) : /* @__PURE__ */ e(Z, {});
}
function je({
  features: t,
  title: a = "Details",
  className: m = ""
}) {
  const p = Array.isArray(t) ? t : [];
  return p.length === 0 ? /* @__PURE__ */ e(Z, {}) : /* @__PURE__ */ s("div", { class: `usf-product-features ${m}`.trim(), children: [
    /* @__PURE__ */ e("h3", { class: "usf-product-features__title", children: a }),
    /* @__PURE__ */ e("dl", { class: "usf-product-features__list", children: p.map((h, c) => {
      const o = h.label ?? h.name ?? "", d = h.value != null ? String(h.value) : "";
      return !o && !d ? null : /* @__PURE__ */ s("div", { class: "usf-product-features__row", children: [
        /* @__PURE__ */ e("dt", { class: "usf-product-features__term", children: o }),
        /* @__PURE__ */ e("dd", { class: "usf-product-features__value", children: d })
      ] }, h.name ?? c);
    }) })
  ] });
}
function Be(t) {
  const a = {};
  return (t || []).forEach((m) => {
    var c, o;
    const p = (c = m.values) == null ? void 0 : c[0], h = (o = m.values) == null ? void 0 : o.find((d) => d.isDefault);
    h != null && h.id ? a[m.id] = h.id : p != null && p.id && (a[m.id] = p.id);
  }), a;
}
function Fe({
  product: t,
  showQuantity: a = !0,
  defaultQuantity: m = 1,
  showWishlist: p = !1,
  shippingMessage: h,
  renderDescription: c,
  onAddToCart: o,
  onWishlist: d,
  onOptionChange: r,
  className: N = "",
  loading: w = !1
}) {
  var R, l, I;
  const [C, x] = _e(m), g = ((R = t.attributes) == null ? void 0 : R.options) ?? [], v = $e(() => g.map((i) => i.id).join(","), [g]), n = $e(() => Be(g), [v]), [_, y] = _e(n);
  te(() => {
    y(Be(g));
  }, [t.sku, v]);
  const u = (l = t.attributes) == null ? void 0 : l.priceRange, S = u && u.minimum != null && u.maximum != null && u.minimum !== u.maximum, $ = (u == null ? void 0 : u.currency) ?? t.price.currency, P = t.price.special != null && t.price.special < t.price.regular ? Math.round((t.price.regular - t.price.special) / t.price.regular * 100) : null, F = (i, k) => {
    const b = { ..._, [i]: k };
    y(b), r == null || r(i, k, b);
  }, f = (i) => {
    i.preventDefault(), o == null || o(t, C, _);
  }, L = ((I = t.attributes) == null ? void 0 : I.attributes) ?? [];
  return /* @__PURE__ */ e("article", { class: `usf-product-details ${N}`.trim(), "data-sku": t.sku, children: /* @__PURE__ */ s("div", { class: "usf-product-details__layout", children: [
    /* @__PURE__ */ e("div", { class: "usf-product-details__gallery", children: /* @__PURE__ */ e(
      Ye,
      {
        images: t.images || [],
        productName: t.name
      }
    ) }),
    /* @__PURE__ */ s("div", { class: "usf-product-details__info", children: [
      /* @__PURE__ */ e("h1", { class: "usf-product-details__title", children: t.name }),
      t.sku && /* @__PURE__ */ s("p", { class: "usf-product-details__sku", children: [
        "SKU: ",
        t.sku
      ] }),
      /* @__PURE__ */ e("div", { class: "usf-product-details__price", children: S ? /* @__PURE__ */ s("span", { class: "usf-product-details__price-current usf-product-details__price-range", children: [
        $,
        " ",
        Number(u.minimum).toFixed(2),
        " - ",
        Number(u.maximum).toFixed(2)
      ] }) : t.price.special != null && t.price.special < t.price.regular ? /* @__PURE__ */ s(Z, { children: [
        /* @__PURE__ */ s("span", { class: "usf-product-details__price-current", children: [
          t.price.currency,
          " ",
          t.price.special.toFixed(2)
        ] }),
        /* @__PURE__ */ s("span", { class: "usf-product-details__price-original", children: [
          t.price.currency,
          " ",
          t.price.regular.toFixed(2)
        ] }),
        P != null && /* @__PURE__ */ s("span", { class: "usf-product-details__badge", children: [
          "-",
          P,
          "%"
        ] })
      ] }) : /* @__PURE__ */ s("span", { class: "usf-product-details__price-current", children: [
        t.price.currency,
        " ",
        t.price.regular.toFixed(2)
      ] }) }),
      h && /* @__PURE__ */ e("p", { class: "usf-product-details__shipping", children: h }),
      g.length > 0 && /* @__PURE__ */ e(
        Xe,
        {
          options: g,
          selected: _,
          onSelect: F,
          disabled: !t.inStock
        }
      ),
      (t.shortDescription || t.description) && /* @__PURE__ */ e("div", { class: "usf-product-details__short-description", children: c ? c(t) : /* @__PURE__ */ e(
        "div",
        {
          dangerouslySetInnerHTML: {
            __html: t.shortDescription || t.description || ""
          }
        }
      ) }),
      L.length > 0 && /* @__PURE__ */ e(je, { features: L, title: "Details" }),
      !t.inStock && /* @__PURE__ */ e("p", { class: "usf-product-details__out-of-stock", children: "Out of stock" }),
      /* @__PURE__ */ s("div", { class: "usf-product-details__actions", children: [
        a && t.inStock && /* @__PURE__ */ e("div", { class: "usf-product-details__quantity", children: /* @__PURE__ */ s("div", { class: "usf-product-details__quantity-controls", children: [
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              class: "usf-product-details__quantity-btn",
              "aria-label": "Decrease quantity",
              onClick: () => x((i) => Math.max(1, i - 1)),
              children: "−"
            }
          ),
          /* @__PURE__ */ e(
            "input",
            {
              id: "usf-product-details-qty",
              type: "number",
              min: 1,
              max: 999,
              value: C,
              onInput: (i) => x(Math.max(1, parseInt(i.target.value, 10) || 1)),
              class: "usf-product-details__quantity-input",
              "aria-label": "Quantity"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              class: "usf-product-details__quantity-btn",
              "aria-label": "Increase quantity",
              onClick: () => x((i) => Math.min(999, i + 1)),
              children: "+"
            }
          )
        ] }) }),
        /* @__PURE__ */ s("div", { class: "usf-product-details__buttons", children: [
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              class: "usf-product-details__add-to-cart",
              disabled: !t.inStock || w,
              onClick: f,
              children: w ? "Adding..." : t.inStock ? "Add to Cart" : "Out of Stock"
            }
          ),
          p && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              class: "usf-product-details__wishlist",
              "aria-label": "Add to wishlist",
              onClick: () => d == null ? void 0 : d(t),
              children: /* @__PURE__ */ e("svg", { width: "24", height: "24", viewBox: "0 0 20 20", fill: "none", children: /* @__PURE__ */ e("path", { d: "M10 17.5L8.5 16.1C4.5 12.5 2 10.2 2 7.5C2 5.5 3.5 4 5.5 4C6.7 4 7.8 4.6 8.5 5.5H11.5C12.2 4.6 13.3 4 14.5 4C16.5 4 18 5.5 18 7.5C18 10.2 15.5 12.5 11.5 16.1L10 17.5Z", stroke: "currentColor", "stroke-width": "1.5" }) })
            }
          )
        ] })
      ] }),
      t.description && /* @__PURE__ */ e(
        "div",
        {
          class: "usf-product-details__description",
          dangerouslySetInnerHTML: { __html: t.description }
        }
      )
    ] })
  ] }) });
}
Fe.render = U(Fe);
function Re({
  title: t = "You may also like",
  products: a,
  columns: m = { mobile: 2, tablet: 3, desktop: 4 },
  onAddToCart: p,
  onProductClick: h,
  className: c = ""
}) {
  return a != null && a.length ? /* @__PURE__ */ s("section", { class: `usf-product-recommendations ${c}`.trim(), "aria-labelledby": "usf-product-recommendations-heading", children: [
    /* @__PURE__ */ e("h2", { id: "usf-product-recommendations-heading", class: "usf-product-recommendations__title", children: t }),
    /* @__PURE__ */ e(
      ye,
      {
        products: a,
        columns: m,
        productCardProps: {
          layout: "vertical",
          showQuickView: !1,
          showWishlist: !1
        },
        onAddToCart: p,
        onProductClick: h
      }
    )
  ] }) : /* @__PURE__ */ e(Z, {});
}
Re.render = U(Re);
function Q(t, a = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: a }).format(t ?? 0);
}
function Ve(t) {
  if (!t) return "";
  const a = Array.isArray(t.street) ? t.street.join(", ") : t.street ?? "";
  return [
    [t.firstname, t.lastname].filter(Boolean).join(" "),
    a,
    [t.city, t.region, t.postcode].filter(Boolean).join(", "),
    t.country_code,
    t.telephone
  ].filter(Boolean).join(`
`);
}
function He({
  order: t,
  title: a = "Order confirmation",
  emptyMessage: m = "No order to display.",
  orderNumberLabel: p = "Order number",
  statusLabel: h = "Status",
  orderDateLabel: c = "Order date",
  shippingAddressLabel: o = "Shipping address",
  billingAddressLabel: d = "Billing address",
  itemsLabel: r = "Order items",
  shippingMethodLabel: N = "Shipping method",
  paymentMethodLabel: w = "Payment method",
  productColumnLabel: C = "Product",
  qtyColumnLabel: x = "Qty",
  priceColumnLabel: g = "Price",
  totalColumnLabel: v = "Total",
  subtotalLabel: n = "Subtotal",
  shippingLabel: _ = "Shipping",
  taxLabel: y = "Tax",
  discountLabel: u = "Discount",
  totalLabel: S = "Total",
  totalsSectionLabel: $ = "Order Summary",
  continueShoppingUrl: P = "/",
  continueShoppingLabel: F = "Continue shopping",
  className: f = ""
}) {
  var K, O, ne, re, oe, de, j;
  if (!t)
    return /* @__PURE__ */ s("div", { className: `usf-order-details ${f}`.trim(), children: [
      /* @__PURE__ */ e("h1", { className: "usf-order-details__title", children: a }),
      /* @__PURE__ */ e("p", { className: "usf-order-details__empty", children: m }),
      P && /* @__PURE__ */ e("a", { href: P, className: "usf-order-details__continue", children: F })
    ] });
  const L = t.number ?? t.id ?? "", R = t.status ?? "", l = t.order_date ? new Date(t.order_date).toLocaleDateString(void 0, { dateStyle: "medium" }) : "", I = t.items ?? [], i = t.total, k = i == null ? void 0 : i.grand_total, b = (k == null ? void 0 : k.currency) ?? "USD", V = ((K = i == null ? void 0 : i.subtotal_excl_tax) == null ? void 0 : K.value) ?? ((O = i == null ? void 0 : i.subtotal_incl_tax) == null ? void 0 : O.value) ?? 0, z = ((ne = i == null ? void 0 : i.total_shipping) == null ? void 0 : ne.value) ?? 0, E = ((re = i == null ? void 0 : i.total_tax) == null ? void 0 : re.value) ?? 0, T = ((oe = i == null ? void 0 : i.discounts) == null ? void 0 : oe.reduce((q, X) => {
    var G;
    return q + (((G = X.amount) == null ? void 0 : G.value) ?? 0);
  }, 0)) ?? 0, M = (k == null ? void 0 : k.value) ?? 0;
  return /* @__PURE__ */ s("div", { className: `usf-order-details ${f}`.trim(), children: [
    /* @__PURE__ */ e("h1", { className: "usf-order-details__title", children: a }),
    /* @__PURE__ */ s("div", { className: "usf-order-details__meta", children: [
      L && /* @__PURE__ */ s("div", { className: "usf-order-details__meta-row", children: [
        /* @__PURE__ */ e("span", { className: "usf-order-details__meta-label", children: p }),
        /* @__PURE__ */ e("strong", { className: "usf-order-details__meta-value", children: L })
      ] }),
      R && /* @__PURE__ */ s("div", { className: "usf-order-details__meta-row", children: [
        /* @__PURE__ */ e("span", { className: "usf-order-details__meta-label", children: h }),
        /* @__PURE__ */ e("span", { className: "usf-order-details__meta-value", children: R })
      ] }),
      l && /* @__PURE__ */ s("div", { className: "usf-order-details__meta-row", children: [
        /* @__PURE__ */ e("span", { className: "usf-order-details__meta-label", children: c }),
        /* @__PURE__ */ e("span", { className: "usf-order-details__meta-value", children: l })
      ] }),
      t.email && /* @__PURE__ */ s("div", { className: "usf-order-details__meta-row", children: [
        /* @__PURE__ */ e("span", { className: "usf-order-details__meta-label", children: "Email" }),
        /* @__PURE__ */ e("span", { className: "usf-order-details__meta-value", children: t.email })
      ] })
    ] }),
    (t.carrier || t.shipping_method || (((de = t.payment_methods) == null ? void 0 : de.length) ?? 0) > 0) && /* @__PURE__ */ s("div", { className: "usf-order-details__method-summary", children: [
      (t.carrier || t.shipping_method) && /* @__PURE__ */ s("div", { className: "usf-order-details__method-row", children: [
        /* @__PURE__ */ e("span", { className: "usf-order-details__method-label", children: N }),
        /* @__PURE__ */ s("span", { className: "usf-order-details__method-value", children: [
          [t.carrier, t.shipping_method].filter(Boolean).join(" - "),
          z > 0 && ` (${Q(z, b)})`
        ] })
      ] }),
      (j = t.payment_methods) != null && j.length ? /* @__PURE__ */ s("div", { className: "usf-order-details__method-row", children: [
        /* @__PURE__ */ e("span", { className: "usf-order-details__method-label", children: w }),
        /* @__PURE__ */ e("span", { className: "usf-order-details__method-value", children: t.payment_methods.map((q) => q.name || q.type).filter(Boolean).join(", ") || "—" })
      ] }) : null
    ] }),
    /* @__PURE__ */ s("div", { className: "usf-order-details__main", children: [
      I.length > 0 && /* @__PURE__ */ s("section", { className: "usf-order-details__section", "aria-labelledby": "usf-order-details-items-heading", children: [
        /* @__PURE__ */ e("h2", { id: "usf-order-details-items-heading", className: "usf-order-details__section-title", children: r }),
        /* @__PURE__ */ e("ul", { className: "usf-order-details__items", role: "list", children: I.map((q, X) => {
          var se, ae, ce, ie;
          const G = q.quantity_ordered ?? 0, H = q.product_sale_price ?? ((se = q.prices) == null ? void 0 : se.price), D = (ae = q.prices) == null ? void 0 : ae.row_total, J = (H == null ? void 0 : H.value) ?? 0, me = (D == null ? void 0 : D.value) ?? J * G, Y = ((ce = q.product) == null ? void 0 : ce.thumbnail) ?? ((ie = q.product) == null ? void 0 : ie.image), ue = Y == null ? void 0 : Y.url, pe = (Y == null ? void 0 : Y.label) ?? q.product_name ?? q.product_sku ?? "";
          return /* @__PURE__ */ s("li", { className: "usf-order-details__item", children: [
            /* @__PURE__ */ e("div", { className: "usf-order-details__item-image", children: ue ? /* @__PURE__ */ e("img", { src: ue, alt: pe, loading: "lazy", className: "usf-order-details__item-img" }) : /* @__PURE__ */ e("span", { className: "usf-order-details__item-image-placeholder", "aria-hidden": "true" }) }),
            /* @__PURE__ */ s("div", { className: "usf-order-details__item-details", "aria-label": C, children: [
              /* @__PURE__ */ e("span", { className: "usf-order-details__item-name", children: q.product_name ?? q.product_sku ?? "Item" }),
              q.product_sku && /* @__PURE__ */ s("span", { className: "usf-order-details__item-sku", children: [
                "SKU: ",
                q.product_sku
              ] }),
              /* @__PURE__ */ s(
                "div",
                {
                  className: "usf-order-details__item-qty-price",
                  "aria-label": `${x}: ${G}, ${g}: ${Q(J, (H == null ? void 0 : H.currency) ?? b)}`,
                  children: [
                    G,
                    " × ",
                    Q(J, (H == null ? void 0 : H.currency) ?? b)
                  ]
                }
              ),
              /* @__PURE__ */ s("div", { className: "usf-order-details__item-total", children: [
                v,
                ": ",
                Q(me, (H == null ? void 0 : H.currency) ?? b)
              ] })
            ] })
          ] }, q.id ?? X);
        }) })
      ] }),
      /* @__PURE__ */ s("div", { className: "usf-order-details__totals", children: [
        /* @__PURE__ */ e("h3", { className: "usf-order-details__totals-title", children: $ }),
        V > 0 && /* @__PURE__ */ s("div", { className: "usf-order-details__total-row", children: [
          /* @__PURE__ */ e("span", { children: n }),
          /* @__PURE__ */ e("span", { children: Q(V, b) })
        ] }),
        z > 0 && /* @__PURE__ */ s("div", { className: "usf-order-details__total-row", children: [
          /* @__PURE__ */ e("span", { children: _ }),
          /* @__PURE__ */ e("span", { children: Q(z, b) })
        ] }),
        /* @__PURE__ */ s("div", { className: "usf-order-details__total-row", children: [
          /* @__PURE__ */ e("span", { children: y }),
          /* @__PURE__ */ e("span", { children: Q(E, b) })
        ] }),
        T > 0 && /* @__PURE__ */ s("div", { className: "usf-order-details__total-row", children: [
          /* @__PURE__ */ e("span", { children: u }),
          /* @__PURE__ */ s("span", { children: [
            "−",
            Q(T, b)
          ] })
        ] }),
        /* @__PURE__ */ s("div", { className: "usf-order-details__total-row usf-order-details__total-row--final", children: [
          /* @__PURE__ */ e("span", { children: S }),
          /* @__PURE__ */ e("strong", { children: Q(M, b) })
        ] })
      ] })
    ] }),
    (t.shipping_address || t.billing_address) && /* @__PURE__ */ s("div", { className: "usf-order-details__addresses", children: [
      t.shipping_address && /* @__PURE__ */ s("div", { className: "usf-order-details__address", children: [
        /* @__PURE__ */ e("h3", { className: "usf-order-details__address-title", children: o }),
        /* @__PURE__ */ e("pre", { className: "usf-order-details__address-content", children: Ve(t.shipping_address) })
      ] }),
      t.billing_address && /* @__PURE__ */ s("div", { className: "usf-order-details__address", children: [
        /* @__PURE__ */ e("h3", { className: "usf-order-details__address-title", children: d }),
        /* @__PURE__ */ e("pre", { className: "usf-order-details__address-content", children: Ve(t.billing_address) })
      ] })
    ] }),
    P && /* @__PURE__ */ e("div", { className: "usf-order-details__actions", children: /* @__PURE__ */ e("a", { href: P, className: "usf-order-details__continue button", children: F }) })
  ] });
}
He.render = U(He);
export {
  Me as Cart,
  Ae as Checkout,
  qe as CheckoutAddress,
  Ue as CheckoutContact,
  Qe as CheckoutPayment,
  Ge as CheckoutShippingMethod,
  xe as FilterPanel,
  Ie as MiniCart,
  He as OrderDetails,
  Pe as Pagination,
  Ne as ProductCard,
  Fe as ProductDetails,
  je as ProductFeatures,
  Ye as ProductGallery,
  ye as ProductGrid,
  Xe as ProductOptionSelector,
  Re as ProductRecommendations,
  Le as SortControls
};
