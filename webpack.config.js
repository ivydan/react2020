const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './core/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name]-[chunkhash:8].js',  //懒加载使用
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            Utils: path.resolve(__dirname, 'utils'),
            Components: path.resolve(__dirname, 'components'),
            Core: path.resolve(__dirname, 'core'),
            '@': path.resolve(__dirname, 'src')
        },
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            cacheGroups: {
                // Split vendor code to its own chunk(s)
                vendors: {
                    test: /[\\/]node_modules[\\/]/i,
                    chunks: "all"
                }
            }
        },
        // The runtime should be in its own chunk
        runtimeChunk: {
            name: "runtime"
        }
    },
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
    // optimization: {
    //     splitChunks: {
    //         name: "vendors"
    //     }
    // },
    // externals: {
    //     'react': 'React',
    //     'react-dom': 'ReactDOM',
    // },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'template.html',
            chunksSortMode: "none",
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
        //         //打包重复出现的代码
        //         vendor: {
        //             chunks: 'initial',
        //             minChunks: 2,
        //             maxInitialRequests: 5, // The default limit is too small to showcase the effect
        //             minSize: 0, // This is example is too small to create commons chunks
        //             name: 'vendor'
        //         },
        //         //打包第三方类库
        // 		commons: {
        // 			name: "commons",
        // 			chunks: "initial",
        // 			minChunks: Infinity
        // 		}
        //     }
        // }),
        // new webpack.HashedModuleIdsPlugin(),
        // new webpack.NamedModulesPlugin(),
        // new webpack.HotModuleReplacementPlugin() //以便更容易查看要修补(patch)的依赖。
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["es2015", "react", "stage-0"],
                    },
                }]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            }, {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }, {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: { name: 'fonts/[name].[hash:8].[ext]' }
                }]
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