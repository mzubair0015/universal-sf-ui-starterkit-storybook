import React from "react";
import { createRoot } from "react-dom/client";
import {{ pascalCase  name}} from "./{{ pascalCase  name}}.jsx";

export default class {
  static init(el) {
    const props = JSON.parse(JSON.stringify(el.dataset));
    createRoot(el).render(<{{ pascalCase  name}} {...props} />);
  }
}
