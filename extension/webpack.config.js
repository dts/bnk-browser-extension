const path = require('path');
const SizePlugin = require('size-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtensionReloader  = require('webpack-extension-reloader');
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const VueAutoRoutingPlugin = require('vue-auto-routing/lib/webpack-plugin')

module.exports = {
	devtool: 'inline-source-map',
	stats: 'errors-only',
	entry: {
		background: './source/background',
    popup: './source/popup.js',
		options: './source/options',
	},
	output: {
		path: path.join(__dirname, 'distribution'),
		filename: '[name].js'
	},
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // this will apply to both plain `.js` files
      // AND `<script>` blocks in `.vue` files
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          { loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.join(__dirname, 'distribution'),
            }
          },
          'css-loader',
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname,'source'),
    }
  },
	plugins: [
    new VueAutoRoutingPlugin({
      // Path to the directory that contains your page components.
      pages: 'source/popup/pages/',
      // A string that will be added to importing component path (default @/pages/).
      importPrefix: '@/popup/pages/'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new VueLoaderPlugin(),
		new SizePlugin(),
    new ExtensionReloader({
      reloadPage: true,
      entries: {
        background: 'background',
        extensionPage: 'popup',
      }
    }),
		new CopyWebpackPlugin([
			{
				from: '**/*',
				context: 'source',
				ignore: ['*.js']
			},
			{
				from: 'node_modules/webextension-polyfill/dist/browser-polyfill.min.js'
			}
		]),
	],
	optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					mangle: false,
					compress: false,
					output: {
						beautify: true,
						indent_level: 2 // eslint-disable-line camelcase
					}
				}
			})
		]
	}
};
