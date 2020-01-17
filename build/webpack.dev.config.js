const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = merge(webpackBaseConfig, {
    target: "web",
    entry: {
        main: path.resolve(__dirname, '../examples/main.js'),
        vendors: ['vue', 'vue-router']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    resolve: {
        alias: {
            iview: '../../src/index',
            vue: 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
            }
        }),
        new HtmlWebpackPlugin({
            inject: true,
            // filename: path.join(__dirname, '/dist/index.html'),
            template: path.join(__dirname, '../examples/index.html')
        })
    ]
})
