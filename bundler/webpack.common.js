const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {
    VueLoaderPlugin
} = require('vue-loader')

const path = require('path')

const mode = process.env.NODE_ENV


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
        extensions: ['.js', '.vue','.ts']
    },
    // Loader
    module: {
        rules: [
            // Images 
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024,
                            esModule: false,
                            name: 'images/[name].[hash:8].[ext]'
                        }
                    },
                    /*{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[contenthash].[ext]',
                        outputPath: 'images',
                        esModule: false
                    }
                }*/
                ]
                // use:['url-loader']
            },
            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts'
                    }
                }]
            },
            // Js
            {
                test: /\.(js|mjs)/,
                use: ['babel-loader']
            },
            // Vue
            {
                test: /\.(vue)$/,
                use: ['vue-loader']
            },
            // css
            {
                test: /\.(css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            // Ts
            {
                test:/\.ts$/,
                use:['ts-loader']
            }
        ]
    },
    // Plugins 
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
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
        new MiniCssExtractPlugin({filename:mode==='development'?'css/[name].css':'css/[name].min.css'})
    ],
}