const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        // chunkFilename: '[name].bundle.js',  //懒加载使用。  chunks插件会无效
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            Utils: path.resolve(__dirname, 'utils'),
            Components: path.resolve(__dirname, 'components'),
        },
        extensions: [".ts", ".tsx",".js", ".jsx", ".json"]
    },
    // externals: {
    //     'react': 'React',
    //     'react-dom': 'ReactDOM',
    // },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'template.html',
            minify: {
              removeComments: true,
              collapseWhitespace: true
            }
          }),
        new ExtractTextPlugin({
            filename: 'build.min.css',
            allChunks: true,
        }),
        // new webpack.optimize.RuntimeChunkPlugin({  // 不懂
        //     name: "manifest"
        // }),
        // new webpack.optimize.SplitChunksPlugin({
        //     cacheGroups: {
        //         default: {
        //             minChunks: 2,
        //             priority: -20,
        //             reuseExistingChunk: true,
        //         },
        //         //打包重复出现的代码 lodash被打包进来
        //         vendor: {
        //             chunks: 'initial',
        //             minChunks: 2,
        //             maxInitialRequests: 5, // The default limit is too small to showcase the effect
        //             minSize: 0, // This is example is too small to create commons chunks
        //             name: 'vendor'
        //         },
        //         //打包第三方类库
        //         commons: {  // 不知道如何将lodash打包进来
        //             name: "commons",
        //             chunks: "initial",
        //             minChunks: Infinity
        //         }
        //     }
        // }),
        // new webpack.HashedModuleIdsPlugin(),
        // new webpack.NamedModulesPlugin(),
        // new webpack.HotModuleReplacementPlugin() //以便更容易查看要修补(patch)的依赖。
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
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
                test: /\.(css|less)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            noIeCompat: true
                        }
                    }
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