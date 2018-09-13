const path = require('path');
const nodeExternals = require("webpack-node-externals");
const HappyPack = require("happypack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  entry: "./src/main.ts",
  target: "node",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs2"
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  devtool: "inline-source-map",
  externals: [nodeExternals()],
  module: {
    rules: [
      // {
      //   test: /\.tsx?$/,
      //   use: "happypack/loader?id=ts"
      // },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "happypack/loader?id=ts"
      },
      {
        test: /\.js$/,
        exclude: /(node_module)/,
        use: "happypack/loader?id=babel"
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
    new HappyPack({
      id: "babel",
      loaders: [
        {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
            cacheDirectory: true
          }
        }
      ]
    }),
    new HappyPack({
      id: "ts",
      loaders: [
        {
          loader: "ts-loader",
          query: { happyPackMode: true }
        }
      ]
    })
  ]
};