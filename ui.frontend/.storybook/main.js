const path = require("path");
const { createScriptResolver } = require("@adobe/htlengine");
const { spawn } = require('child_process');

// Start the visual test server
const startVisualTestServer = () => {
  const serverPath = path.join(__dirname, 'addons/visual-test/dist/server.js');
  const server = spawn('node', [serverPath], {
    stdio: 'inherit',
    shell: true
  });

  process.on('exit', () => {
    server.kill();
  });
};

// Start the server
startVisualTestServer();

const resolver = createScriptResolver([path.resolve(__dirname)]);

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/theming",
    "@storybook/addon-a11y",
    {
      name: 'visual-test',
      options: {}
    }
  ],
  staticDirs: [
    "../src/main/webpack/resources",
    "../src/main/webpack/static",
    "../static",
    "../src/main/webpack/core-components",
  ],
  framework: {
    name: "@storybook/html-webpack5",
    options: {}
  },
  webpackFinal: async (config, { configType }) => {
    // Add React support
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread'
            ]
          }
        }
      ]
    });

    // Handlebars loader
    config.module.rules.push({
      test: /\.handlebars|hbs$/,
      loader: "handlebars-loader",
      options: {
        ignoreHelpers: true,
        ignorePartials: [],
        rootRelative: "../src/main/webpack/",
        partialDirs: [path.join(__dirname, "../src/main/webpack/")]
      }
    });

    // SCSS loader
    config.module.rules.push({
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "style-loader"
        },
        {
          loader: "css-loader",
          options: {
            sourceMap: true,
          },
        },
        {
          loader: "postcss-loader",
          options: {
            sourceMap: true,
            plugins() {
              return [require("autoprefixer")];
            },
          },
        },
        {
          loader: "sass-loader",
          options: {
            sourceMap: true,
            additionalData: `
              $env: ${process.env.NODE_ENV};
              $resource-path: ${process.env.RESOURCE_LOCAL_PATH};
            `,
          },
        },
      ],
      include: path.resolve(__dirname, "../src/main/webpack/"),
    });

    // HTL loader
    config.module.rules.push({
      test: /\.htl$/,
      use: ["htl-template-loader"]
    });

    config.experiments = {
      ...config.experiments,
      topLevelAwait: true
    };

    return config;
  },
  docs: {
    autodocs: true
  }
};
