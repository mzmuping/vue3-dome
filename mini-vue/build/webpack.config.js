const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
console.log(process.env)
module.exports = {
    mode: 'development',
    entry: './mini-vue/main.js',
    output: {
        path: path.resolve(process.cwd(), 'dist-min-vue3'),
        publicPath: '/',
        filename: 'mini-vue3.js',
        clean: true,
        asyncChunks: true,
    },
    devtool: 'inline-source-map',
    devServer: {
        compress: true,
        port: 9000,
        open: true,
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'mini-vue3'
    })]
}