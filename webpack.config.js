'use strict';

const { join } = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = () => {
    const config = {
        entry: {
            main: './src/index',
            vendor: [
                'react',
                'react-dom',
                'material-ui',
                'redux',
                'react-redux',
                'react-router',
                'react-tap-event-plugin'
            ],
        },
        output: {
            path: join(__dirname, 'dist'),
            filename: '[name].js'
        },
        devtool: isProd ? 'source-map' : 'eval-source-map',
        module: {
            rules: [{
                test: /\.js$/,
                include: join(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    query: { cacheDirectory: true }
                }
            }, {
                test: /\.css$/,
                include: join(__dirname, 'node_modules/react-virtualized'),
                use: ['style-loader', 'css-loader']
            }]
        },
        plugins: [
            new HTMLWebpackPlugin({
                title: 'webpack detective',
                template: './src/index_template.ejs'
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: `"${process.env.NODE_ENV}"`
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: Infinity
            })
        ],
        devServer: {
            historyApiFallback: true
        }
    };

    if (process.env.NODE_ENV !== 'production') {
        config.plugins.push(new webpack.NamedModulesPlugin());
    } else {
        config.plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: true,
            mangle: true
        }));
    }

    return config;
};
