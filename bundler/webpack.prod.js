const {merge} = require('webpack-merge')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const path = require('path')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    entry:path.resolve(__dirname,'../src/main.js'),
    plugins:[
        new CleanWebpackPlugin({})
    ],
    optimization:{
        minimizer:[new CssMinimizerPlugin()]
    }
})