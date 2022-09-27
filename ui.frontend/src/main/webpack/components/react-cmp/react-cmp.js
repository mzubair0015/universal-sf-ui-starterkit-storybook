/**
 * Header class
 */
import React from "react";

import ReactDOM from "react-dom/client";
import ReactComponent from "./ReactComponent.jsx";

export default class {
  static init(el) {
    ReactDOM.createRoot(el).render(<ReactComponent name="Jane" />);
  }
}
