const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {
    VueLoaderPlugin
} = require('vue-loader')
const webpack = require('webpack')
const path = require('path')
const command = process.env['npm_lifecycle_event']
console.log('env', command)

const mode = process.env.NODE_ENV

console.log(mode)
module.exports = {
    mode,
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[contenthash:8].js',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
            '2d': '@/2d',
            '3d': '@/3d'
        },
        extensions: ['.js', '.vue', '.ts']
    },
    // Loader
    module: {
        rules: [
            // Js
            {
                test: /\.(js|mjs)/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            // Vue
            {
                test: /\.(vue)$/,
                use: ['vue-loader']
            },
            // Images
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024,
                        esModule: false,
                        name: '[name].[hash:8].[ext]',
                        outputPath: 'images'
                    },

                }, ],
                type: 'javascript/auto'
            },
            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: -Infinity,
                        esModule: false,
                        outputPath: 'fonts',
                        name: '[name].[hash:8].[ext]',
                    }
                }],
                type: 'javascript/auto'
            },
            // css
            {
                test: /\.(css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            // less
            {
                test: /\.(less)$/,
                use: [MiniCssExtractPlugin.loader,'css-loader','less-loader']
            },
            // Ts
            {
                test: /\.ts$/,
                use: ['ts-loader']
            }
        ]
    },
    // Plugins 
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            templateParameters: {
                title: 'project-start'
            }
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, '../public/'),
                noErrorOnMissing: true,
                globOptions: {
                    ignore: ['**/index.html']
                },
                // to:'public/'
            }]
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: mode === 'development' ? 'css/[name].css' : 'css/[name].min.css'
        }),
        new webpack.DefinePlugin({
            IS_3D: command === 'dev:3d',
            IS_2D: command === 'dev:2d',
            IS_PRODUCTION: mode === 'production',
        })
    ],
}