const path = require("path");
const { VueLoaderPlugin } = require("vue-loader/dist/index")
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");

module.exports = {
    entry: "./src/main.js",
    
    resolve: {
        extensions: [".js", ".json", ".vue", ".jsx", ".ts", ".tsx"],
        alias: {
            // "@": resolveApp("./src"),
            // pages: path.resolve(__dirname, "../src/pages"),
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "less-loader" }
                ]
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 60 * 1024   // 设置图片大小最大为60kb，超过60kb就单独作为文件用url引入
                    }
                },
                generator: {

                    filename: "img/[name]_[hash:8][ext]"
                }
            },
            {
                test: /\.js$/,
                use: [
                    "babel-loader"
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    "vue-loader"
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: "果果同学的网页",  //指定index.html的title
            template: "./index.html"   // 指定自己的html模板所在路径
        }),
        new DefinePlugin({// 定义全局变量
            "BASE_URL": "'./'"
        })
    ]
}