// Stylesheets
import "../src/main/webpack/site/main.scss";
import "../src/main/webpack/site/core-components/main.ts";
import "../src/main/webpack/site/main.ts";

/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
