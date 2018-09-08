const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { routes } = require('./routes/index.json');

let htmlPlugins = routes.map((route) => {
  return new HtmlWebpackPlugin({
    filename: `${route.name}.html`,
    template: `./src/${route.name}/index.html`,
    chunks: route.name
  });
});

let sketchEntries = {};
for (var i = 0; i < routes.length; i+=1) {
  const route = routes[i];
  sketchEntries[route.name] = `./src/${route.name}/index.js`;
};

let config = {
  mode: 'development',
  entry: sketchEntries,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: process.env.PORT || 8000
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    ...htmlPlugins
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              // publicPath: '/dist'
            }
          },
          "css-loader"
        ]
      }
    ]
  }
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    //override any settings for dev here

  }
  if (argv.mode === 'production') {
    //override any settings for production here
    config.plugins = [...config.plugins, new CleanWebpackPlugin(['dist'])]
  }
  return config;
};