'use strict'

const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const prod = process.env.NODE_ENV === 'production'
const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  devtool: prod ? false : 'cheap-module-eval-source-map',
  output: {
    path: resolve('../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'pages': resolve('../views/pages'),
      'components': resolve('../views/components'),
      'config': resolve('../views/config.json')
    }
  },
  module: {
    rules: [{
        test: /\.(vue|js)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // 配置哪些引入路径按照模块方式查找
          transformAssetUrls: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          { loader: "vue-style-loader" },
          { loader: "css-loader" },
          {
            loader: 'less-loader',
            options: {
              strictMath: true,
              noIeCompat: true
            }
          }
        ]
      }
    ]
  },
  plugins: [new FriendlyErrorsPlugin({ log: false }), new VueLoaderPlugin()],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
}