/* eslint-disable no-var, prefer-arrow-callback, consistent-return, prefer-template */
var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: path.join(__dirname + '/src'),
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './app.js',
    ],
    output: {
        path: path.join(__dirname + '/build'),
        filename: 'bundle.js'
    },
    devServer: {
        outputPath: path.join(__dirname, '/build')
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.html$/,
                loader: 'raw'
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'index.html' }
        ]),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
