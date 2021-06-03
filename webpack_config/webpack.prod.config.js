const path = require('path');
const webpack = require('webpack');
// const CopyWebpackPlugin=require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const getEntryFilesInfo = require('../src/utils/readEntry');

const entryGenerates = getEntryFilesInfo(path.resolve(__dirname, '../src/entry'));
module.exports = (env, argv) => {
    console.log(env, 'env');
    console.log(argv, 'argv');

    return {
        entry: entryGenerates.entry,
        target: 'web',
        mode: 'production',
        // devtool: 'source-map',

        output: {
            // publicPath: 'assets/',
            path: path.resolve(__dirname, '../dist'),
            filename: '[name]/js/[name].[contenthash:8].js',
            clean: true,
        },

        resolve: {
            extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
            alias: {
                utils: path.resolve(__dirname, '../src/utils'),
                components: path.resolve(__dirname, '../src/components'),
                assets: path.resolve(__dirname, '../src/assets'),
                pages: path.resolve(__dirname, '../src/pages'),
                store: path.resolve(__dirname, '../src/store'),
                entry: path.resolve(__dirname, '../src/entry'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    loader: 'awesome-typescript-loader',
                },
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    loader: 'source-map-loader',
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
                                                // 其他选项
                                            },
                                        ],
                                    ],
                                },
                            },
                        },
                        'sass-loader',
                        // 'post-loader', //添加post-loader加载器
                    ],
                },
                // {
                //     test: /\.(png|jpe?g|gif)$/i,
                //     loader: 'file-loader',
                //     options: {
                //         esModule: false,
                //         outputPath: 'assets',
                //     },
                // },
                {
                    test: /\.(png|jpg|gif)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                esModule: false,
                                limit: 100,
                                outputPath: 'assets/', // 为你的文件配置自定义 output 输出目录 ; 用来处理图片路径问题
                                // publicPath: 'assets/', // 为你的文件配置自定义 public 发布目录 ; 用来处理图片路径问题
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
            // new CopyWebpackPlugin([
            //     {
            //         from:'./dll/vendor.dll.js',
            //         to:'vendor.dll.js'
            //     }
            // ]),
            new webpack.DefinePlugin({
                'process.env': JSON.stringify({
                    siteId: process.env.siteId,
                    name: argv.name,
                }),
            }),

            new MiniCssExtractPlugin({
                filename: '[name]/css/[name].[contenthash].css',
            }),
            ...entryGenerates.plugins,

            new webpack.ProgressPlugin(),
        ],
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    extractComments: false, //不将注释提取到单独的文件中,不生成license文件
                }),
            ],

            splitChunks: {
                cacheGroups: {
                    vendors: {
                        minChunks: 1,
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10, // 权重
                        minSize: 0,
                    },
                    base: {
                        priority: -20, // 权重
                        chunks: 'initial', //initial表示提取入口文件的公共部分
                        minChunks: 2, //表示提取公共部分最少的文件数
                        minSize: 0, //表示提取公共部分最小的大小
                        name: 'base', //提取出来的文件命名
                    },
                },
            },
        },
    };
};
