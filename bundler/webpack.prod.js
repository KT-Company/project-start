const {
    merge
} = require('webpack-merge')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

const path = require('path')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    entry: path.resolve(__dirname, '../src/main.js'),
    plugins: [
        new CleanWebpackPlugin({}),
        new webpack.optimize.SplitChunksPlugin({

        })
    ],
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(),
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                terserOptions: {
                    comments: false
                }
            }),
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    }
})