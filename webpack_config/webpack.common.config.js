const path = require('path');
const webpack = require('webpack');
// const CopyWebpackPlugin=require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getEntryFilesInfo = require('../src/utils/readEntry');
const entryGenerates = getEntryFilesInfo(path.resolve(__dirname, '../src/entry'));

module.exports = (env, argv) => ({
    entry: entryGenerates.entry,
    target: 'web',
    output: {
        // publicPath: 'assets/',
        path: path.resolve(__dirname, '../dist'),
        filename: '[name]/js/[name].[contenthash:8].js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],

        alias: {
            // react: 'preact/compat',
            // 'react-dom': 'preact/compat',
            utils: path.resolve(__dirname, '../src/utils'),
            components: path.resolve(__dirname, '../src/components'),
            assets: path.resolve(__dirname, '../src/assets'),
            pages: path.resolve(__dirname, '../src/pages'),
            store: path.resolve(__dirname, '../src/store'),
            hooks: path.resolve(__dirname, '../src/hooks'),
            config: path.resolve(__dirname, '../src/config'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [
                            tsImportPluginFactory({
                                libraryName: 'antd',
                                libraryDirectory: 'lib',
                                style: true,
                            }),
                        ],
                    }),
                },
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {
                            lessOptions: {
                                // strictMath: true,
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            },
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            // ????????????
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    'sass-loader',
                    // 'post-loader', //??????post-loader?????????
                ],
            },

            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            esModule: false,
                            limit: 100,
                            outputPath: 'assets/', // ?????????????????????????????? output ???????????? ; ??????????????????????????????
                            // publicPath: 'assets/', // ?????????????????????????????? public ???????????? ; ??????????????????????????????
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.9],
                                speed: 4,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75,
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify({
                siteId: process.env.siteId,
                name: argv.name,
            }),
        }),
        ...entryGenerates.plugins,
        new MiniCssExtractPlugin({
            filename: '[name]/css/[name].[contenthash].css',
        }),
        new webpack.ProgressPlugin(),
    ],
});
