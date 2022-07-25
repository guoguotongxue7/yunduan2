const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require("webpack-merge");
const commonCofig = require("./webpack.common.config")

module.exports = merge(CleanWebpackPlugin, {
    mode: "production",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "../build"),
        clean: true
    },
    plugins: [
        new CleanWebpackPlugin()
    ]

})