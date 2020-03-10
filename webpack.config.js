const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/index3.js',
        math: './src/math.js', 
    },
    output: {
        filename: '[name].[chunkhash].js',
        // chunkFilename: '[name].bundle.js',  //懒加载使用。  chunks插件会无效
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Management'
        }),
        new webpack.optimize.RuntimeChunkPlugin({  // 不懂
            name: "manifest"
        }),
        new webpack.optimize.SplitChunksPlugin({
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                //打包重复出现的代码 lodash被打包进来
                vendor: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0, // This is example is too small to create commons chunks
                    name: 'vendor'
                },
                //打包第三方类库
                commons: {  // 不知道如何将lodash打包进来
                    name: "commons",
                    chunks: "initial",
                    minChunks: Infinity
                }
            }
        }),
        new webpack.HashedModuleIdsPlugin(),
        // new webpack.NamedModulesPlugin(),
        // new webpack.HotModuleReplacementPlugin() //以便更容易查看要修补(patch)的依赖。
    ],
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 name: "commons",
    //                 chunks: "initial",
    //                 minChunks: 2
    //             }
    //         }
    //     }
    // },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts)$/,
                use: [{
                    loader: 'babel-loader', 
                    options: {//如果有这个设置则不用再添加.babelrc文件进行配置
                        "babelrc": false,// 不采用.babelrc的配置
                        "plugins": [
                            "dynamic-import-webpack"
                        ],
                        presets: ["es2015", "react"]
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }, {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            }, {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    }
};