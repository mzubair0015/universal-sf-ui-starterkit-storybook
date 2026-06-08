import { jsx as e, jsxs as s } from "preact/jsx-runtime";
import { useState as t, useEffect as M } from "preact/hooks";
import { render as T } from "preact";
function S(r) {
  return (a, o, b) => {
    if (!a || !(a instanceof HTMLElement))
      throw new Error("Target must be a valid HTMLElement");
    let c = o;
    const { beforeRender: v, afterRender: u } = b ?? {}, _ = () => {
      v == null || v(a, c), T(/* @__PURE__ */ e(r, { ...c }), a), u == null || u(a, c);
    };
    return _(), {
      update: (h) => {
        c = { ...c, ...h }, _();
      },
      unmount: () => {
        T(null, a);
      }
    };
  };
}
function A({
  customerService: r,
  redirectUrl: a,
  title: o = "Sign in",
  emailLabel: b = "Email",
  passwordLabel: c = "Password",
  submitLabel: v = "Sign in",
  onSuccess: u,
  onError: _,
  className: h = ""
}) {
  const [f, $] = t(""), [p, L] = t(""), [g, C] = t(null), [y, N] = t(!1), P = async (m) => {
    if (m.preventDefault(), C(null), !f.trim() || !p) {
      C("Please enter your email and password.");
      return;
    }
    N(!0);
    try {
      const i = await r.signIn(f.trim(), p);
      u == null || u(i), a && typeof window < "u" && (window.location.href = a);
    } catch (i) {
      const F = i instanceof Error ? i.message : "Sign in failed. Please try again.";
      C(F), _ == null || _(i instanceof Error ? i : new Error(F));
    } finally {
      N(!1);
    }
  };
  return /* @__PURE__ */ s("div", { className: `usf-login ${h}`.trim(), children: [
    /* @__PURE__ */ e("h2", { className: "usf-login__title", children: o }),
    /* @__PURE__ */ s("form", { className: "usf-login__form", onSubmit: P, noValidate: !0, children: [
      /* @__PURE__ */ s("div", { className: "usf-login__field", children: [
        /* @__PURE__ */ e("label", { htmlFor: "usf-login-email", className: "usf-login__label", children: b }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "usf-login-email",
            type: "email",
            className: "usf-login__input",
            value: f,
            onInput: (m) => $(m.target.value),
            placeholder: "you@example.com",
            autoComplete: "email",
            required: !0,
            disabled: y
          }
        )
      ] }),
      /* @__PURE__ */ s("div", { className: "usf-login__field", children: [
        /* @__PURE__ */ e("label", { htmlFor: "usf-login-password", className: "usf-login__label", children: c }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "usf-login-password",
            type: "password",
            className: "usf-login__input",
            value: p,
            onInput: (m) => L(m.target.value),
            autoComplete: "current-password",
            required: !0,
            disabled: y
          }
        )
      ] }),
      g && /* @__PURE__ */ e("div", { className: "usf-login__error", role: "alert", children: g }),
      /* @__PURE__ */ e("button", { type: "submit", className: "usf-login__submit", disabled: y, children: y ? "Signing in…" : v })
    ] })
  ] });
}
A.render = S(A);
function R({
  customerService: r,
  redirectUrl: a,
  title: o = "Create account",
  firstNameLabel: b = "First name",
  lastNameLabel: c = "Last name",
  emailLabel: v = "Email",
  passwordLabel: u = "Password",
  submitLabel: _ = "Create account",
  onSuccess: h,
  onError: f,
  className: $ = ""
}) {
  const [p, L] = t(""), [g, C] = t(""), [y, N] = t(""), [P, m] = t(""), [i, F] = t(null), [w, l] = t(!1), d = async (n) => {
    n.preventDefault(), F(null);
    const D = p.trim(), x = g.trim(), E = y.trim();
    if (!D || !x || !E || !P) {
      F("Please fill in all fields.");
      return;
    }
    l(!0);
    try {
      const I = await r.signUp({
        firstName: D,
        lastName: x,
        email: E,
        password: P
      });
      h == null || h(I);
      try {
        await r.signIn(E, P);
      } catch {
      }
      a && typeof window < "u" && (window.location.href = a);
    } catch (I) {
      const U = I instanceof Error ? I.message : "Sign up failed. Please try again.";
      F(U), f == null || f(I instanceof Error ? I : new Error(U));
    } finally {
      l(!1);
    }
  };
  return /* @__PURE__ */ s("div", { className: `usf-signup ${$}`.trim(), children: [
    /* @__PURE__ */ e("h2", { className: "usf-signup__title", children: o }),
    /* @__PURE__ */ s("form", { className: "usf-signup__form", onSubmit: d, noValidate: !0, children: [
      /* @__PURE__ */ s("div", { className: "usf-signup__row", children: [
        /* @__PURE__ */ s("div", { className: "usf-signup__field", children: [
          /* @__PURE__ */ e("label", { htmlFor: "usf-signup-firstName", className: "usf-signup__label", children: b }),
          /* @__PURE__ */ e(
            "input",
            {
              id: "usf-signup-firstName",
              type: "text",
              className: "usf-signup__input",
              value: p,
              onInput: (n) => L(n.target.value),
              placeholder: "First name",
              autoComplete: "given-name",
              required: !0,
              disabled: w
            }
          )
        ] }),
        /* @__PURE__ */ s("div", { className: "usf-signup__field", children: [
          /* @__PURE__ */ e("label", { htmlFor: "usf-signup-lastName", className: "usf-signup__label", children: c }),
          /* @__PURE__ */ e(
            "input",
            {
              id: "usf-signup-lastName",
              type: "text",
              className: "usf-signup__input",
              value: g,
              onInput: (n) => C(n.target.value),
              placeholder: "Last name",
              autoComplete: "family-name",
              required: !0,
              disabled: w
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ s("div", { className: "usf-signup__field", children: [
        /* @__PURE__ */ e("label", { htmlFor: "usf-signup-email", className: "usf-signup__label", children: v }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "usf-signup-email",
            type: "email",
            className: "usf-signup__input",
            value: y,
            onInput: (n) => N(n.target.value),
            placeholder: "you@example.com",
            autoComplete: "email",
            required: !0,
            disabled: w
          }
        )
      ] }),
      /* @__PURE__ */ s("div", { className: "usf-signup__field", children: [
        /* @__PURE__ */ e("label", { htmlFor: "usf-signup-password", className: "usf-signup__label", children: u }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "usf-signup-password",
            type: "password",
            className: "usf-signup__input",
            value: P,
            onInput: (n) => m(n.target.value),
            autoComplete: "new-password",
            required: !0,
            disabled: w
          }
        )
      ] }),
      i && /* @__PURE__ */ e("div", { className: "usf-signup__error", role: "alert", children: i }),
      /* @__PURE__ */ e("button", { type: "submit", className: "usf-signup__submit", disabled: w, children: w ? "Creating account…" : _ })
    ] })
  ] });
}
R.render = S(R);
function q({
  customerService: r,
  customer: a,
  onCustomerChange: o,
  title: b = "Profile details",
  firstNameLabel: c = "First name",
  lastNameLabel: v = "Last name",
  emailLabel: u = "Email",
  submitLabel: _ = "Save changes",
  onSuccess: h,
  onError: f,
  className: $ = ""
}) {
  const [p, L] = t((a == null ? void 0 : a.firstName) ?? ""), [g, C] = t((a == null ? void 0 : a.lastName) ?? ""), [y, N] = t((a == null ? void 0 : a.email) ?? ""), [P, m] = t(null), [i, F] = t(!1), [w, l] = t(!1);
  M(() => {
    L((a == null ? void 0 : a.firstName) ?? ""), C((a == null ? void 0 : a.lastName) ?? ""), N((a == null ? void 0 : a.email) ?? "");
  }, [a == null ? void 0 : a.firstName, a == null ? void 0 : a.lastName, a == null ? void 0 : a.email]);
  const d = async (n) => {
    n.preventDefault(), m(null), F(!1);
    const D = p.trim(), x = g.trim();
    if (!D || !x) {
      m("Please fill in first name and last name.");
      return;
    }
    l(!0);
    try {
      const E = await r.updateCustomer({
        firstName: D,
        lastName: x
      });
      o == null || o(E), h == null || h(E), F(!0);
    } catch (E) {
      const I = E instanceof Error ? E.message : "Update failed. Please try again.";
      m(I), f == null || f(E instanceof Error ? E : new Error(I));
    } finally {
      l(!1);
    }
  };
  return /* @__PURE__ */ s("div", { className: `usf-update-profile ${$}`.trim(), children: [
    /* @__PURE__ */ e("h3", { className: "usf-update-profile__title", children: b }),
    /* @__PURE__ */ s("form", { className: "usf-update-profile__form", onSubmit: d, noValidate: !0, children: [
      /* @__PURE__ */ s("div", { className: "usf-update-profile__field", children: [
        /* @__PURE__ */ e("label", { htmlFor: "usf-profile-firstname", className: "usf-update-profile__label", children: c }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "usf-profile-firstname",
            type: "text",
            className: "usf-update-profile__input",
            value: p,
            onInput: (n) => L(n.target.value),
            autoComplete: "given-name",
            disabled: w
          }
        )
      ] }),
      /* @__PURE__ */ s("div", { className: "usf-update-profile__field", children: [
        /* @__PURE__ */ e("label", { htmlFor: "usf-profile-lastname", className: "usf-update-profile__label", children: v }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "usf-profile-lastname",
            type: "text",
            className: "usf-update-profile__input",
            value: g,
            onInput: (n) => C(n.target.value),
            autoComplete: "family-name",
            disabled: w
          }
        )
      ] }),
      /* @__PURE__ */ s("div", { className: "usf-update-profile__field", children: [
        /* @__PURE__ */ e("label", { htmlFor: "usf-profile-email", className: "usf-update-profile__label", children: u }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "usf-profile-email",
            type: "email",
            className: "usf-update-profile__input usf-update-profile__input--readonly",
            value: y,
            readOnly: !0,
            "aria-readonly": "true",
            title: "Email cannot be changed here"
          }
        )
      ] }),
      P && /* @__PURE__ */ e("div", { className: "usf-update-profile__error", role: "alert", children: P }),
      i && /* @__PURE__ */ e("div", { className: "usf-update-profile__success", role: "status", children: "Profile updated." }),
      /* @__PURE__ */ e("button", { type: "submit", className: "usf-update-profile__submit", disabled: w, children: w ? "Saving…" : _ })
    ] })
  ] });
}
q.render = S(q);
function V({
  customerService: r,
  title: a = "Change password",
  currentPasswordLabel: o = "Current password",
  newPasswordLabel: b = "New password",
  confirmPasswordLabel: c = "Confirm new password",
  submitLabel: v = "Update password",
  onSuccess: u,
  onError: _,
  className: h = ""
}) {
  const [f, $] = t(""), [p, L] = t(""), [g, C] = t(""), [y, N] = t(null), [P, m] = t(!1), [i, F] = t(!1), w = async (l) => {
    if (l.preventDefault(), N(null), m(!1), !f.trim()) {
      N("Please enter your current password.");
      return;
    }
    if (!p) {
      N("Please enter a new password.");
      return;
    }
    if (p !== g) {
      N("New password and confirmation do not match.");
      return;
    }
    F(!0);
    try {
      await r.changePassword({
        currentPassword: f.trim(),
        newPassword: p
      }), $(""), L(""), C(""), u == null || u(), m(!0);
    } catch (d) {
      const n = d instanceof Error ? d.message : "Password update failed. Please try again.";
      N(n), _ == null || _(d instanceof Error ? d : new Error(n));
    } finally {
      F(!1);
    }
  };
  return /* @__PURE__ */ s("div", { className: `usf-change-password ${h}`.trim(), children: [
    /* @__PURE__ */ e("h3", { className: "usf-change-password__title", children: a }),
    /* @__PURE__ */ s("form", { className: "usf-change-password__form", onSubmit: w, noValidate: !0, children: [
      /* @__PURE__ */ s("div", { className: "usf-change-password__field", children: [
        /* @__PURE__ */ e("label", { htmlFor: "usf-password-current", className: "usf-change-password__label", children: o }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "usf-password-current",
            type: "password",
            className: "usf-change-password__input",
            value: f,
            onInput: (l) => $(l.target.value),
            autoComplete: "current-password",
            disabled: i
          }
        )
      ] }),
      /* @__PURE__ */ s("div", { className: "usf-change-password__field", children: [
        /* @__PURE__ */ e("label", { htmlFor: "usf-password-new", className: "usf-change-password__label", children: b }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "usf-password-new",
            type: "password",
            className: "usf-change-password__input",
            value: p,
            onInput: (l) => L(l.target.value),
            autoComplete: "new-password",
            disabled: i
          }
        )
      ] }),
      /* @__PURE__ */ s("div", { className: "usf-change-password__field", children: [
        /* @__PURE__ */ e("label", { htmlFor: "usf-password-confirm", className: "usf-change-password__label", children: c }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "usf-password-confirm",
            type: "password",
            className: "usf-change-password__input",
            value: g,
            onInput: (l) => C(l.target.value),
            autoComplete: "new-password",
            disabled: i
          }
        )
      ] }),
      y && /* @__PURE__ */ e("div", { className: "usf-change-password__error", role: "alert", children: y }),
      P && /* @__PURE__ */ e("div", { className: "usf-change-password__success", role: "status", children: "Password updated." }),
      /* @__PURE__ */ e("button", { type: "submit", className: "usf-change-password__submit", disabled: i, children: i ? "Updating…" : v })
    ] })
  ] });
}
V.render = S(V);
function Y(r, a = "USD") {
  return r == null ? "—" : new Intl.NumberFormat("en-US", { style: "currency", currency: a }).format(r);
}
function k(r) {
  if (!r) return "—";
  try {
    const a = new Date(r);
    return Number.isNaN(a.getTime()) ? r : a.toLocaleDateString(void 0, { dateStyle: "medium" });
  } catch {
    return r;
  }
}
function j({
  customerService: r,
  pageSize: a = 10,
  title: o = "Recent orders",
  orderNumberLabel: b = "Order",
  dateLabel: c = "Date",
  statusLabel: v = "Status",
  totalLabel: u = "Total",
  actionsLabel: _ = "Actions",
  emptyMessage: h = "You have no orders yet.",
  orderViewUrl: f,
  viewOrderLabel: $ = "View",
  loadingMessage: p = "Loading orders…",
  className: L = ""
}) {
  const [g, C] = t([]), [y, N] = t(!0), [P, m] = t(null), [i, F] = t(null);
  M(() => {
    let l = !1;
    return N(!0), m(null), r.getCustomerOrders({ page: 1, pageSize: a }).then((d) => {
      l || (C(d.items ?? []), F(d.page_info ? { ...d.page_info, total_count: d.total_count } : { total_count: d.total_count }));
    }).catch((d) => {
      l || m(d instanceof Error ? d.message : "Failed to load orders.");
    }).finally(() => {
      l || N(!1);
    }), () => {
      l = !0;
    };
  }, [r, a]);
  const w = (l) => (f || "/order-details?orderNumber={number}").replace("{id}", l.id ?? "").replace("{number}", l.number ?? "") || "/order-details";
  return y ? /* @__PURE__ */ s("div", { className: `usf-order-list ${L}`.trim(), children: [
    /* @__PURE__ */ e("h2", { className: "usf-order-list__title", children: o }),
    /* @__PURE__ */ e("p", { className: "usf-order-list__loading", children: p })
  ] }) : P ? /* @__PURE__ */ s("div", { className: `usf-order-list ${L}`.trim(), children: [
    /* @__PURE__ */ e("h2", { className: "usf-order-list__title", children: o }),
    /* @__PURE__ */ e("p", { className: "usf-order-list__error", role: "alert", children: P })
  ] }) : /* @__PURE__ */ s("div", { className: `usf-order-list ${L}`.trim(), children: [
    /* @__PURE__ */ e("h2", { className: "usf-order-list__title", children: o }),
    g.length === 0 ? /* @__PURE__ */ e("p", { className: "usf-order-list__empty", children: h }) : /* @__PURE__ */ e("ul", { className: "usf-order-list__items", role: "list", children: g.map((l) => {
      var U, O;
      const d = w(l), n = l.number ?? l.id ?? "—", D = k(l.order_date), x = l.status ?? "—", E = Y((U = l.total) == null ? void 0 : U.value, (O = l.total) == null ? void 0 : O.currency), I = l.carrier ?? null;
      return /* @__PURE__ */ e("li", { className: "usf-order-list__item", children: /* @__PURE__ */ s("article", { className: "usf-order-list__card", children: [
        /* @__PURE__ */ s("div", { className: "usf-order-list__card-header", children: [
          /* @__PURE__ */ s("span", { className: "usf-order-list__item-number", children: [
            b,
            " #",
            n
          ] }),
          /* @__PURE__ */ e(
            "a",
            {
              href: d,
              className: "usf-order-list__item-action",
              "aria-label": `${$} ${b} ${n}`,
              children: $
            }
          )
        ] }),
        /* @__PURE__ */ s("dl", { className: "usf-order-list__card-details", children: [
          /* @__PURE__ */ s("div", { className: "usf-order-list__card-row", children: [
            /* @__PURE__ */ e("dt", { className: "usf-order-list__card-label", children: c }),
            /* @__PURE__ */ e("dd", { className: "usf-order-list__card-value", children: D })
          ] }),
          /* @__PURE__ */ s("div", { className: "usf-order-list__card-row", children: [
            /* @__PURE__ */ e("dt", { className: "usf-order-list__card-label", children: v }),
            /* @__PURE__ */ e("dd", { className: "usf-order-list__card-value", children: /* @__PURE__ */ e("span", { className: "usf-order-list__item-status", "data-status": x.toLowerCase(), children: x }) })
          ] }),
          I && /* @__PURE__ */ s("div", { className: "usf-order-list__card-row", children: [
            /* @__PURE__ */ e("dt", { className: "usf-order-list__card-label", children: "Carrier" }),
            /* @__PURE__ */ e("dd", { className: "usf-order-list__card-value", children: I })
          ] }),
          /* @__PURE__ */ s("div", { className: "usf-order-list__card-row usf-order-list__card-row--total", children: [
            /* @__PURE__ */ e("dt", { className: "usf-order-list__card-label", children: u }),
            /* @__PURE__ */ e("dd", { className: "usf-order-list__card-value usf-order-list__item-total", children: E })
          ] })
        ] })
      ] }) }, l.id ?? l.number ?? l.order_date ?? "");
    }) }),
    (i == null ? void 0 : i.total_count) != null && i.total_count > 0 && /* @__PURE__ */ s("p", { className: "usf-order-list__count", children: [
      "Showing ",
      g.length,
      " of ",
      i.total_count,
      " order(s)"
    ] })
  ] });
}
j.render = S(j);
function H({
  customerService: r,
  customer: a,
  onCustomerChange: o,
  title: b = "Account settings",
  profileTitle: c,
  passwordTitle: v,
  className: u = ""
}) {
  return /* @__PURE__ */ s("section", { className: `usf-account-settings ${u}`.trim(), "aria-labelledby": "usf-account-settings-heading", children: [
    /* @__PURE__ */ e("h2", { id: "usf-account-settings-heading", className: "usf-account-settings__title", children: b }),
    /* @__PURE__ */ s("div", { className: "usf-account-settings__grid", children: [
      /* @__PURE__ */ e(
        q,
        {
          customerService: r,
          customer: a,
          onCustomerChange: o,
          title: c
        }
      ),
      /* @__PURE__ */ e(
        V,
        {
          customerService: r,
          title: v
        }
      )
    ] })
  ] });
}
H.render = S(H);
export {
  H as AccountSettings,
  V as ChangePasswordForm,
  A as Login,
  j as OrderList,
  R as Signup,
  q as UpdateProfileForm
};
