var webpack = require('webpack');
var path = require('path');

/*
 * Default webpack configuration for development
 */
var config = {
    // devtool: 'eval-source-map',
    entry:  ['./src/index.js', './src/style.css'],
    output: {
        path: __dirname + '/public/',
        filename: "bundle.js"
    },
    resolve: {
        root: path.resolve('./src')
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel?' + JSON.stringify({
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                })],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: 'style!css-loader'
            }
        ]
    }
};

module.exports = config;
