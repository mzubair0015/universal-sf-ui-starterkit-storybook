/**
 * Sample React Component Integration
 */
import React from "react";
import { createRoot } from "react-dom/client";
import ReactComponent from "./ReactComponent.jsx";

export default class {
  static init(el) {
    createRoot(el).render(<ReactComponent name="Jane" />);
  }
}
