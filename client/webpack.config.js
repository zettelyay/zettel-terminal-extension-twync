const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ZipWebpackPlugin = require("zip-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "extension-function.js",
    path: path.resolve(__dirname, "output", "unpacked"),
    clean: true,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: ["public"],
    }),
    new ZipWebpackPlugin({
      path: "..",
      filename: "packed.zip",
    }),
  ],
};
