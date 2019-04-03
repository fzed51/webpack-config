const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const config = {
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
  },
  target: "web",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          plugins: [
            "@babel/plugin-syntax-dynamic-import",
            "@babel/plugin-syntax-import-meta",
            ["@babel/plugin-proposal-class-properties", { loose: false }],
            "@babel/plugin-proposal-json-strings"
          ],
          presets: [
            ["@babel/preset-env", { modules: false }],
            "@babel/preset-react"
          ]
        }
      },
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          plugins: [
            "@babel/plugin-syntax-dynamic-import",
            "@babel/plugin-syntax-import-meta",
            ["@babel/plugin-proposal-class-properties", { loose: false }],
            "@babel/plugin-proposal-json-strings"
          ],
          presets: [
            ["@babel/preset-env", { modules: false }],
            "@babel/preset-react",
            "@babel/preset-typescript"
          ]
        }
      },
      {
        test: /\.s?css$/i,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: { name: "img/[hash].[ext]" }
          }
        ]
      },
      {
        test: /\.(ttf|woff2?|eof|eot)$/i,
        use: [
          {
            loader: "file-loader",
            options: { name: "font/[hash].[ext]" }
          }
        ]
      }
    ]
  },
  plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin()],
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      minSize: 0,
      maxSize: 100000
    }
  }
};

module.exports = config;
