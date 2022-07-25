const { merge } = require("webpack-merge");
const commonCofig = require("./webpack.common.config")


module.exports = merge(commonCofig, {
    mode: "development",
    devServer: {
        hot: true,  //默认为true
        // host: "0.0.0.0", 
        // port: 8888,
    
    }
  
})