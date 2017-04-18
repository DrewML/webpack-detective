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
        resolve: {
            alias: {
                // Both copies in the bundle suck. Force all libs to just bundle one
                // (the non-deprecated one)
                './ReactClass': 'create-react-class/factory'
            }
        },
        module: {
            rules: [{
                test: /\.js$/,
                include: [
                    join(__dirname, 'src'),
                    require.resolve('sort-on'),
                    require.resolve('dot-prop')
                ],
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
