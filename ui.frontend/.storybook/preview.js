// Stylesheets

// AEM Grid styles
import "../src/main/webpack/site/scss/_grid.scss";

// AEM Core Components styles and scripts
import "../src/main/webpack/site/core-components/sass/main.scss";
import "../src/main/webpack/site/core-components/main.ts";

// Custom components styles and scripts
import "../src/main/webpack/site/main.scss";
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
