const path = require('path');
const webpack = require('webpack');
const helpers = require('./config/helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        polyfills:"./src/polyfills.ts",
        main:"./src/app.ts"
    }, // bundle entry point
    resolve: {
      extensions: ['.js', '.ts']
    },
    output: {
        path: path.resolve(__dirname, 'dist'), //output directory
        filename: "[name].js" // name of generated bundle
    },
    module: {
      rules: [
          /**
           * css-loader: The css-loader loads css files and returns css code.
           * style-loader: The style-loader adds this css code as a style element to the DOM
           */
          {
              test: /\.css$/,
              loader: ["style-loader", "css-loader"]
          },
          {
              test: /\.ts$/,
              loader: "awesome-typescript-loader"
          },
          {
              test: /\.ts$/,
              enforce: "pre",
              loader: "tslint-loader"
          },
          {
              test: /\.scss$/,
              loader: ["raw-loader", "sass-loader?sourceMap"]
          },
          {
              test: /\.html$/,
              loader: "html-loader"
          }
      ]
    },
    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('./src'), // location of your src
            {} // a map of your routes
        ),
        new HtmlWebpackPlugin({
            template: "src/index.html",
            inject: "body"
        })
    ],
    /**
     * Instructs webpack to generate source-maps
     */
    devtool:"source-map",
    /**
     * Required when using webpack-dev-server with angular routing
     */
    devServer: {
        historyApiFallback:true
    }
};