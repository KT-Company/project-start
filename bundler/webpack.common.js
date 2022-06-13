const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const webpack = require("webpack");
const path = require("path");
const command = process.env["npm_lifecycle_event"];
console.log("env", command);

const mode = process.env.NODE_ENV;

console.log(mode);
module.exports = {
  mode,
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name].[contenthash:8].js",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "2d": "@/2d",
      "3d": "@/3d",
    },
    extensions: [".js", ".vue", ".ts", ".tsx"],
  },
  // Loader
  module: {
    rules: [
      // Js
      {
        test: /\.(js|mjs)/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      // Vue
      {
        test: /\.(vue)$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              esModule: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      // Images
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10 * 1024,
              esModule: false,
              name: "[name].[hash:8].[ext]",
              outputPath: "images",
            },
          },
        ],
        type: "javascript/auto",
      },
      // Fonts
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: -Infinity,
              esModule: false,
              outputPath: "fonts",
              name: "[name].[hash:8].[ext]",
            },
          },
        ],
        type: "javascript/auto",
      },
      // css
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      // less
      {
        test: /\.(less)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      // Ts
    //   {
    //     test: /\.ts$/,
    //     loader: "ts-loader",
    //     options: { appendTsSuffixTo: [/\.vue$/] },
    //     exclude: /node_modules/,
    //   },
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // 指定特定的ts编译配置，为了区分脚本的ts配置
              configFile: path.resolve(__dirname, '../tsconfig.json'),
              // 对应文件添加个.ts或.tsx后缀
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true // 关闭类型检测，即值进行转译
            },
          },
        ],
    },
    ],
  },
  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      templateParameters: {
        title: "project-start",
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public/"),
          noErrorOnMissing: true,
          globOptions: {
            ignore: ["**/index.html"],
          },
          // to:'public/'
        },
      ],
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename:
        mode === "development" ? "css/[name].css" : "css/[name].min.css",
    }),
    new webpack.DefinePlugin({
      IS_3D: command === "dev:3d",
      IS_2D: command === "dev:2d",
      IS_PRODUCTION: mode === "production",
    }),
  ],
};
