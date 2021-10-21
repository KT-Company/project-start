const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const path = require('path')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    entry: path.resolve(__dirname, '../src/main.js'),
    plugins: [
        new CleanWebpackPlugin({}),
        new webpack.optimize.SplitChunksPlugin(),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 6
        }),
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 1000 * 200
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(),
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                }
            }),
        ],
        splitChunks: {
            maxSize: 1000 * 2000,
            chunks: 'all',
        },
    }
})
