import { jsx as l } from "preact/jsx-runtime";
import { render as t } from "preact";
function f(u) {
  return (n, c, s) => {
    if (!n || !(n instanceof HTMLElement))
      throw new Error("Target must be a valid HTMLElement");
    let r = c;
    const { beforeRender: o, afterRender: e } = s ?? {}, m = () => {
      o == null || o(n, r), t(/* @__PURE__ */ l(u, { ...r }), n), e == null || e(n, r);
    };
    return m(), {
      update: (i) => {
        r = { ...r, ...i }, m();
      },
      unmount: () => {
        t(null, n);
      }
    };
  };
}
export {
  f as c
};
