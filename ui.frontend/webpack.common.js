"use strict";

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TSConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require("webpack");
const dotenv = require("dotenv").config({ path: "./.env" });

const SOURCE_ROOT = __dirname + "/src/main/webpack";

const resolve = {
  extensions: [".js", ".ts", ".jsx", ".tsx"],
  alias: {
    "@universal-sf-ui/ui/utils": path.resolve(
      __dirname,
      "scripts/universal-sf-ui/ui/utils.js"
    ),
    preact$: path.resolve(__dirname, "scripts/universal-sf-ui/vendor/preact.js"),
    "preact/compat": path.resolve(
      __dirname,
      "scripts/universal-sf-ui/vendor/preact-compat.js"
    ),
    "preact/hooks": path.resolve(
      __dirname,
      "scripts/universal-sf-ui/vendor/preact-hooks.js"
    ),
    "preact/jsx-runtime": path.resolve(
      __dirname,
      "scripts/universal-sf-ui/vendor/jsx-runtime.js"
    ),
    zustand$: path.resolve(__dirname, "scripts/universal-sf-ui/vendor/zustand.js"),
    "zustand/vanilla": path.resolve(
      __dirname,
      "scripts/universal-sf-ui/vendor/zustand-vanilla.js"
    ),
  },
  plugins: [
    new TSConfigPathsPlugin({
      configFile: "./tsconfig.json",
    }),
  ],
};

module.exports = {
  resolve: resolve,
  entry: {
    site: SOURCE_ROOT + "/site/main.ts",
  },
  output: {
    filename: (chunkData) => {
      return chunkData.chunk.name === "dependencies"
        ? "clientlib-dependencies/[name].js"
        : "clientlib-site/[name].js";
    },
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
          {
            loader: "glob-import-loader",
            options: {
              resolve: resolve,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins() {
                return [require("autoprefixer")];
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              additionalData: `$resource-path: ${process.env.RESOURCE_AEM_PATH}`,
            },
          },
          {
            loader: "glob-import-loader",
            options: {
              resolve: resolve,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new ESLintPlugin({
    //     extensions: ['js', 'ts', 'tsx']
    // }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "window.$": "jquery",
    }),
    new MiniCssExtractPlugin({
      filename: "clientlib-[name]/[name].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, SOURCE_ROOT + "/resources"),
          to: "./clientlib-site/",
        },
      ],
    }),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
  ],
  stats: {
    assetsSort: "chunks",
    builtAt: true,
    children: false,
    chunkGroups: true,
    chunkOrigins: true,
    colors: false,
    errors: true,
    errorDetails: true,
    env: true,
    modules: false,
    performance: true,
    providedExports: false,
    source: false,
    warnings: true,
  },
};
