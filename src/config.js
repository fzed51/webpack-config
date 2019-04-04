const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

/**
 * génère une config pour webpack
 * @param {{useReact?: boolean,useTypescript?: boolean,htmlWebpackPlugin?: boolean|{title?: string, template?: string}}} options
 */
const configGenerator = options => {
  const optionsBase = {
    useReact: true,
    useTypescript: true,
    htmlWebpackPlugin: true
  };
  options = { ...optionsBase, ...options };
  const extensions = [".js", ".json"];
  const presets = [["@babel/preset-env", { modules: false }]];
  if (options.useReact) {
    extensions = [...extensions, ".jsx"];
    presets = [...presets, "@babel/preset-react"];
  }
  const rules = [
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
        presets
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
  ];
  if (options.useTypescript) {
    extensions = [...extensions, ".ts"];
    rules = [
      ...rules,
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
          presets: [...presets, "@babel/preset-typescript"]
        }
      }
    ];
  }
  if (options.useReact && options.useTypescript) {
    extensions = [...extensions, ".tsx"];
  }
  const plugins = [new CleanWebpackPlugin()];
  if (!!options.htmlWebpackPlugin) {
    if (options.htmlWebpackPlugin === true) {
      plugins = [...plugins, new HtmlWebpackPlugin()];
    } else {
      plugins = [...plugins, new HtmlWebpackPlugin(options.htmlWebpackPlugin)];
    }
  }

  return {
    resolve: { extensions },
    target: "web",
    devtool: "source-map",
    module: { rules },
    plugins,
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        minSize: 0,
        maxSize: 100000
      }
    }
  };
};

module.exports = configGenerator;
