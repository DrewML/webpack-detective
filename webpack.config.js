'use strict';

const { join } = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = () => {
    const config = {
        entry: './src/index',
        output: {
            path: join(__dirname, 'dist'),
            filename: '[name].js'
        },
        devtool: isProd ? 'source-map' : 'eval',
        module: {
            rules: [{
                test: /\.js$/,
                include: join(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    query: { cacheDirectory: true }
                }
            }]
        },
        plugins: [
            new webpack.NamedModulesPlugin(),
            new HTMLWebpackPlugin({
                title: 'webpack detective',
                template: './src/index_template.ejs'
            })
        ],
        devServer: {
            historyApiFallback: true
        }
    };

    return config;
};
