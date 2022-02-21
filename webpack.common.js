const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
  // target: 'node',
  resolve: {
    fallback: {
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": require.resolve("stream-browserify"),
      "crypto": false,
      "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
      "buffer": require.resolve("buffer/")
    }
  },
  entry: {
    popup: path.resolve('src/popup/popup.tsx'),
    options: path.resolve('src/options/options.tsx'),
    background: path.resolve('src/background/background.ts'),
    contentScript: path.resolve('src/contentScript/contentScript.tsx'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('src/static'),
          to: path.resolve('dist'),
        }
      ]
    }),
    ...getHtmlPlugins([
      'popup',
      'options'
    ]),
    new NodePolyfillPlugin()

  ],
  output: {
    filename: '[name].js',
    path: path.resolve('dist'),
  },
  optimization: {
    splitChunks: {
      chunks(chunk) {
        return chunk.name !== 'contentScript' && chunk.name !== 'background'
      }
    },
  }
}

function getHtmlPlugins(chunks) {
  return chunks.map(chunk => new HtmlPlugin({
    title: 'Goodreads NLB',
    filename: `${chunk}.html`,
    chunks: [chunk],
  }))
}
