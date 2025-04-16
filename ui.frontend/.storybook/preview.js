// Stylesheets

// AEM Grid styles
import "../src/main/webpack/site/scss/_grid.scss";

// AEM Core Components styles and scripts
import "../src/main/webpack/site/core-components/sass/main.scss";
import "../src/main/webpack/site/core-components/main.ts";

// Custom components styles and scripts
import "../src/main/webpack/site/main.scss";
import "../src/main/webpack/site/main.ts";

// Import viewport configurations
import { VIEWPORTS } from '../tests/config/viewports';

// Import addons
import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';
import './addons/visual-overlay/dist/index';

// Initialize addons
addons.setConfig({
  theme: themes.light,
  enableShortcuts: true,
  toolbar: {
    'visual-overlay': {
      hidden: false,
    }
  }
});

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
    viewport: {
      viewports: VIEWPORTS.reduce((acc, viewport) => {
        acc[viewport.name] = {
          name: viewport.name,
          styles: {
            width: `${viewport.width}px`,
            height: `${viewport.height}px`,
          },
        };
        return acc;
      }, {}),
      defaultViewport: 'desktop',
    },
  },
};

export default preview;
