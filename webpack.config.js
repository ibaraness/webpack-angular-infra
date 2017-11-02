const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/app.ts", // bundle entry point
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
              loader: ["style-loader", "css-loader", "sass-loader?sourceMap"]
          }
      ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
            inject: "body"
        })
    ]
}