const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const spreadArray = (array1, array2) => {
  let arrayOut = [];
  arrayOut = array1.reduce((prev, item) => {
    prev.push(item);
    return prev;
  }, arrayOut);
  arrayOut = array2.reduce((prev, item) => {
    prev.push(item);
    return prev;
  }, arrayOut);
  return arrayOut;
};

const spreadObject = (object1, object2) => {
  let objectOut = {};
  for (const key in object1) {
    if (object1.hasOwnProperty(key)) {
      const element = object1[key];
      objectOut[key] = element;
    }
  }
  for (const key in object2) {
    if (object2.hasOwnProperty(key)) {
      const element = object2[key];
      objectOut[key] = element;
    }
  }
  return objectOut;
};

/**
 * génère une config pour webpack
 * @param {{useReact?: boolean,useTypescript?: boolean,htmlWebpackPlugin?: boolean|{title?: string, template?: string},cleanOutput?: boolean}} options
 */
const configGenerator = options => {
  const optionsBase = {
    useReact: true,
    useTypescript: true,
    htmlWebpackPlugin: true,
    cleanOutput: true
  };
  options = spreadObject(optionsBase, options);
  let extensions = [".js", ".json"];
  let presets = [["@babel/preset-env", { modules: false }]];
  if (options.useReact) {
    extensions = spreadArray(extensions, [".jsx"]);
    presets = spreadArray(presets, ["@babel/preset-react"]);
  }
  const babelPlugins = [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    ["@babel/plugin-proposal-class-properties", { loose: false }],
    "@babel/plugin-proposal-json-strings"
  ];
  let rules = [
    {
      test: /\.jsx?$/i,
      exclude: /node_modules/,
      loader: "babel-loader",
      options: {
        plugins: babelPlugins,
        presets: presets
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
    extensions = spreadArray(extensions, [".ts"]);
    rules = spreadArray(rules, [
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          plugins: babelPlugins,
          presets: spreadArray(presets, ["@babel/preset-typescript"])
        }
      }
    ]);
  }
  if (options.useReact && options.useTypescript) {
    extensions = spreadArray(extensions, [".tsx"]);
  }
  let plugins = []
  if(options.cleanOutput){
    plugins = spreadArray(plugins, [new CleanWebpackPlugin()]);
  }
  if (!!options.htmlWebpackPlugin) {
    if (options.htmlWebpackPlugin === true) {
      plugins = spreadArray(plugins, [new HtmlWebpackPlugin()]);
    } else {
      plugins = spreadArray(plugins, [
        new HtmlWebpackPlugin(options.htmlWebpackPlugin)
      ]);
    }
  }

  return {
    resolve: { extensions },
    target: "web",
    devtool: "source-map",
    module: { rules },
    plugins: plugins,
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
