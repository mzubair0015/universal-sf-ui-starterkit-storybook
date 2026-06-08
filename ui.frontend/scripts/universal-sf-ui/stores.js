import { g as te, a as re, b as ie, c as se, d as de, e as oe, f as ne, h as ae, i as ce, j as le, p as he } from "./productListStore.js";
import { createStore as H } from "zustand/vanilla";
const Y = {
  email: "",
  firstName: "",
  lastName: "",
  phone: ""
}, z = {
  street: [],
  city: "",
  region: "",
  postcode: "",
  country: "",
  telephone: ""
}, J = {
  AL: 1,
  AK: 2,
  AZ: 4,
  AR: 5,
  CA: 6,
  CO: 7,
  CT: 8,
  DE: 9,
  DC: 10,
  FL: 11,
  GA: 12,
  HI: 13,
  ID: 14,
  IL: 15,
  IN: 16,
  IA: 17,
  KS: 18,
  KY: 19,
  LA: 20,
  ME: 21,
  MD: 22,
  MA: 23,
  MI: 24,
  MN: 25,
  MS: 26,
  MO: 27,
  MT: 28,
  NE: 29,
  NV: 30,
  NH: 31,
  NJ: 32,
  NM: 33,
  NY: 34,
  NC: 35,
  ND: 36,
  OH: 37,
  OK: 38,
  OR: 39,
  PA: 40,
  RI: 41,
  SC: 42,
  SD: 43,
  TN: 44,
  TX: 45,
  UT: 46,
  VT: 47,
  VA: 48,
  WA: 49,
  WV: 50,
  WI: 51,
  WY: 52,
  PR: 53,
  GU: 54,
  VI: 55,
  AS: 56
}, R = [];
function Q(m, i) {
  const k = typeof m.updateItem == "function" || typeof m.updateCartItem == "function", M = i == null ? void 0 : i.getShippingMethods, T = i == null ? void 0 : i.setShippingAddressOnCart, L = i == null ? void 0 : i.setGuestEmailOnCart, A = i == null ? void 0 : i.setPaymentMethodOnCart, g = i == null ? void 0 : i.estimateTotals, U = i == null ? void 0 : i.placeOrder, w = i == null ? void 0 : i.getOrderByToken, E = i == null ? void 0 : i.handleInitialCartData;
  let C = null;
  const F = (i == null ? void 0 : i.regionRequiredCountries) ?? ["US", "CA"];
  return H((d, o) => ({
    cart: null,
    loading: !0,
    error: !1,
    contact: Y,
    shippingAddress: z,
    selectedShippingId: null,
    selectedPaymentId: R.length > 0 ? R[0].id : null,
    shippingMethods: [],
    shippingMethodsLoading: !1,
    shippingMethodsError: !1,
    paymentMethods: R,
    setCart: (e) => d({ cart: e, loading: !1, error: !1 }),
    fetchCart: async (e = !1) => {
      var s;
      d({ loading: !0, error: !1 });
      try {
        const t = await m.getCart();
        d({ cart: t, loading: !1, error: !1 });
        const r = t;
        if (Array.isArray(r.shippingMethods) && d({
          shippingMethods: r.shippingMethods
        }), Array.isArray(r.paymentMethods)) {
          const a = o().selectedPaymentId, c = a || r.selectedPaymentCode || ((s = r.paymentMethods[0]) == null ? void 0 : s.id) || null;
          d({
            paymentMethods: r.paymentMethods,
            selectedPaymentId: c
          }), !a && !r.selectedPaymentCode && c && A && (t != null && t.id) && A(t.id, c).catch((l) => {
            console.error("Set default payment method failed", l);
          });
        }
        e && (E == null || E(t, d));
      } catch {
        d({ cart: null, loading: !1, error: !0 });
      }
    },
    removeItem: async (e) => {
      try {
        const s = await m.removeItem(e);
        d({ cart: s, loading: !1, error: !1 });
      } catch (s) {
        console.error("Remove item failed", s), await o().fetchCart();
      }
    },
    updateItem: async (e, s) => {
      if (k)
        try {
          const t = m, r = await (t.updateItem ? t.updateItem(e, s) : t.updateCartItem(e, s));
          d({ cart: r, loading: !1, error: !1 });
        } catch (t) {
          console.error("Update item failed", t), await o().fetchCart();
        }
    },
    setContact: (e) => {
      var t, r;
      d({ contact: e });
      const s = (t = e.email) == null ? void 0 : t.trim();
      L && s && ((r = o().cart) != null && r.id) && (C && clearTimeout(C), C = setTimeout(() => {
        C = null, L(o().cart.id, s).then(() => o().fetchCart()).catch((a) => {
          console.error("Set guest email failed", a);
        });
      }, 500));
    },
    setShippingAddress: (e) => d({ shippingAddress: e }),
    setSelectedShippingId: (e) => {
      var s;
      if (d({ selectedShippingId: e }), g && e && ((s = o().cart) != null && s.id)) {
        const { cart: t, shippingAddress: r } = o(), a = e.split("_"), c = a[0] ?? "", l = a.slice(1).join("_") || c, f = {
          country_code: r.country || "US",
          ...r.postcode && { postcode: r.postcode },
          ...r.region && { region: {
            region_code: r.region,
            ...r.region_id != null && { region_id: r.region_id }
          } }
        };
        g(t.id, f, { carrier_code: c, method_code: l }).then((n) => d({ cart: n })).catch((n) => {
          console.error("Estimate totals failed", n);
        });
      }
    },
    setSelectedPaymentId: (e) => {
      var s;
      d({ selectedPaymentId: e }), A && e && ((s = o().cart) != null && s.id) && A(o().cart.id, e).then(() => o().fetchCart()).catch((t) => {
        console.error("Set payment method failed", t);
      });
    },
    setPaymentMethods: (e) => d({ paymentMethods: e }),
    setShippingMethods: (e) => d({ shippingMethods: e, shippingMethodsError: !1 }),
    fetchShippingMethods: async () => {
      var t;
      if (!M) return;
      const { cart: e, shippingAddress: s } = o();
      if (e != null && e.id) {
        d({ shippingMethodsLoading: !0, shippingMethodsError: !1 });
        try {
          const r = {
            country_code: s.country || "US",
            ...s.region && { region_code: s.region },
            ...s.postcode && { postcode: s.postcode }
          }, a = await M(e.id, r), l = o().selectedShippingId ?? (a.length > 0 ? a[0].id : null);
          if (d({
            shippingMethods: a,
            selectedShippingId: l,
            shippingMethodsLoading: !1,
            shippingMethodsError: !1
          }), g && l && ((t = o().cart) != null && t.id)) {
            const { cart: f, shippingAddress: n } = o(), h = l.split("_"), S = h[0] ?? "", _ = h.slice(1).join("_") || S, I = {
              country_code: n.country || "US",
              ...n.postcode && { postcode: n.postcode },
              ...n.region && { region: { region_code: n.region, ...n.region_id != null && { region_id: n.region_id } } }
            };
            g(f.id, I, { carrier_code: S, method_code: _ }).then((u) => d({ cart: u })).catch((u) => {
              console.error("Estimate totals failed", u);
            });
          }
        } catch (r) {
          console.error("Fetch shipping methods failed", r), d({ shippingMethods: [], shippingMethodsLoading: !1, shippingMethodsError: !0 });
        }
      }
    },
    saveShippingAddress: async () => {
      var _, I, u, D, q, x, G, V;
      if (!T) return;
      const { cart: e, contact: s, shippingAddress: t } = o();
      if (!(e != null && e.id) || !((_ = t.city) != null && _.trim()) || !((I = t.postcode) != null && I.trim()) || !((u = t.country) != null && u.trim())) return;
      const r = t.country.trim().toUpperCase(), a = o().regionRequiredCountries;
      if (a.includes(r) && !((D = t.region) != null && D.trim()))
        throw new Error("Region is required.");
      const c = (q = t.street) != null && q.length ? t.street : [""], l = (s.firstName ?? "").trim() || "Guest", f = (s.lastName ?? "").trim() || "User", n = ((x = t.region) == null ? void 0 : x.trim()) ?? "";
      let { region_id: h } = t;
      h == null && r === "US" && n && (h = J[n.toUpperCase()]);
      const S = {
        firstname: l,
        lastname: f,
        street: c,
        city: t.city.trim(),
        ...n && a.includes(r) && { region: n },
        postcode: t.postcode.trim(),
        country_code: r,
        telephone: ((G = t.telephone) == null ? void 0 : G.trim()) || void 0,
        ...h != null && { region_id: h }
      };
      try {
        d({ shippingMethodsLoading: !0, shippingMethodsError: !1 });
        const y = await T(e.id, S), K = {
          country_code: t.country.trim(),
          ...t.region && { region_code: t.region.trim() },
          ...t.postcode && { postcode: t.postcode.trim() }
        };
        let O = [];
        if (M)
          try {
            O = await M(y.cart.id, K);
          } catch {
          }
        const P = o().selectedShippingId ?? (O.length > 0 ? O[0].id : null);
        if (d({
          cart: y.cart,
          shippingMethods: O,
          selectedShippingId: P,
          shippingMethodsLoading: !1,
          shippingMethodsError: !1
        }), g && P && ((V = o().cart) != null && V.id)) {
          const { cart: W, shippingAddress: p } = o(), b = P.split("_"), j = b[0] ?? "", v = b.slice(1).join("_") || j, B = {
            country_code: p.country || "US",
            ...p.postcode && { postcode: p.postcode },
            ...p.region && { region: { region_code: p.region, ...p.region_id != null && { region_id: p.region_id } } }
          };
          g(W.id, B, { carrier_code: j, method_code: v }).then((N) => d({ cart: N })).catch((N) => {
            console.error("Estimate totals failed", N);
          });
        }
      } catch (y) {
        throw console.error("Save shipping address failed", y), d({ shippingMethodsLoading: !1, shippingMethodsError: !0 }), y;
      }
    },
    placeOrder: async () => {
      if (!U) return { errors: [{ message: "Place order not configured" }] };
      const { cart: e } = o();
      return e != null && e.id ? U(e.id) : { errors: [{ message: "No cart" }] };
    },
    getOrderByToken: async (e) => w ? w(e) : { errors: [{ message: "Get order by token not configured" }] },
    lastPlacedOrder: null,
    setLastPlacedOrder: (e) => d({ lastPlacedOrder: e }),
    regionRequiredCountries: F,
    setRegionRequiredCountries: (e) => d({ regionRequiredCountries: e })
  }));
}
export {
  Q as createCartStore,
  te as getAggregations,
  re as getFilters,
  ie as getLoading,
  se as getPage,
  de as getPageSize,
  oe as getProducts,
  ne as getSort,
  ae as getSortableAttributes,
  ce as getTotalCount,
  le as getViewMode,
  he as productListStore
};
