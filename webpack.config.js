const path = require('path');
const webpack = require('webpack');
require('react');

module.exports = {
    entry: ['@babel/polyfill', './client/src/index.js'],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ],
    },
    output: {
        path: path.resolve(__dirname, 'client/build'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            "React": "react",
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'client/build'),
        },
        port: 8080
    },
    watchOptions: {
        aggregateTimeout: 600,
        poll: true
    }
};