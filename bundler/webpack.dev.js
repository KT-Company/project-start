const {
    merge
} = require('webpack-merge')

const path = require('path')
const {
    v4
} = require('internal-ip')
const {
    getPort
} = require('portfinder-sync')


// port 
const port = getPort(8000)

// common config 
const common = require('./webpack.common.js')

// devMode parse 
const devMode = process.env['npm_lifecycle_event']
let src = path.resolve(__dirname, '../src')
let entry

switch (devMode) {
    case 'dev:2d':
        entry = path.resolve(src, './2d/index.js')
        break;
    case 'dev:3d':
        entry = path.resolve(src, './3d/index.ts')
        break;
    default:
        entry = path.resolve(src, './main.js')
        break;
}


// dev config
module.exports = merge(common, {
    entry,
    devServer: {
        static:{
            directory:path.resolve(__dirname,'../public')
        },
        host:'local-ip',
        port,
        hot:true,
        open:true
    }
})