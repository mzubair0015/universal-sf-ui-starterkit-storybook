import { createStore as s } from "zustand/vanilla";
const o = {
  products: [],
  totalCount: 0,
  loading: !1,
  error: null,
  filters: {
    categories: [],
    priceRange: void 0,
    attributes: {},
    inStock: void 0
  },
  aggregations: [],
  sortableAttributes: [],
  sort: { field: "relevance", direction: "desc" },
  page: 1,
  pageSize: 24,
  viewMode: "grid"
}, a = s((e) => ({
  ...o,
  setProducts: (t, r) => e({
    products: t,
    totalCount: r,
    loading: !1,
    error: null
  }),
  setLoading: (t) => e({ loading: t, error: t ? null : void 0 }),
  setError: (t) => e({ error: t, loading: !1 }),
  updateFilters: (t) => e((r) => ({
    filters: {
      ...r.filters,
      ...t,
      // Merge attributes instead of replacing
      attributes: t.attributes ? { ...r.filters.attributes, ...t.attributes } : r.filters.attributes
    },
    page: 1
    // Reset to first page when filters change
  })),
  clearFilters: () => e({
    filters: o.filters,
    page: 1
  }),
  setAggregations: (t) => e({ aggregations: t }),
  setSortableAttributes: (t) => e({ sortableAttributes: t }),
  setSort: (t, r) => e({ sort: { field: t, direction: r }, page: 1 }),
  setPage: (t) => e({ page: t }),
  setPageSize: (t) => e({ pageSize: t, page: 1 }),
  setViewMode: (t) => e({ viewMode: t }),
  reset: () => e(o)
})), i = () => a.getState().filters, l = () => a.getState().products, n = () => a.getState().viewMode, c = () => a.getState().sort, d = () => a.getState().page, u = () => a.getState().pageSize, S = () => a.getState().totalCount, p = () => a.getState().loading, b = () => a.getState().aggregations, f = () => a.getState().sortableAttributes;
export {
  i as a,
  p as b,
  d as c,
  u as d,
  l as e,
  c as f,
  b as g,
  f as h,
  S as i,
  n as j,
  a as p
};
