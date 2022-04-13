const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackDashboard = require('webpack-dashboard/plugin');

const isDev = process.argv.includes('development');

module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.js', 'json', 'pug'],
        fallback: {
            fs: false,
            os: false,
            path: false,
        },
        alias: {
            '@': [ path.resolve(__dirname, 'src') ],
        },
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 3000,
        historyApiFallback: true,
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: [
                {
                    loader: 'ts-loader',
                    options: {
                        configFile: path.resolve(__dirname, 'tsconfig.json'),
                    },
                },
            ],
            exclude: /(node_modules)/,
        }, {
            test: /\.scss$/i,
            use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ],
        }, {
            test: /\.(jpg|png|svg)$/i,
            type: 'asset/resource',
            generator: {
                filename: 'images/[hash][ext][query]',
            },
        }, {
            test: /\.pug$/,
            use: [ 'pug-loader' ],
        }],
    },
    plugins: [
        new webpackDashboard(),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
};
