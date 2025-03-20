const path = require("path");
const { createScriptResolver } = require("@adobe/htlengine");

const resolver = createScriptResolver([path.resolve(__dirname)]);

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/theming",
    "@storybook/addon-a11y",
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
        partialDirs: [path.join(__dirname, "../src/main/webpack/")],
      },
    });

    // SCSS loader
    config.module.rules.push({
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "style-loader",
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
          },
        },
      ],
      include: path.resolve(__dirname, "../src/main/webpack/site/"),
    });

    // HTL loader
    config.module.rules.push({
      test: /\.htl$/,
      use: ["htl-template-loader"],
    });

    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    return config;
  },
};
