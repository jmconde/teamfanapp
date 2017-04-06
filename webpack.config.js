var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig =

module.exports = {
    entry: "./client/index.js",
    output: {
        path: path.resolve("dist"),
        filename: "bundle.js",
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
            }/*,
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    use: ["css-loader", "sass-loader"],
                    fallback: "style-loader"
                })
            }*/
        ]
    },
    plugins: [
        // new ExtractTextPlugin(`../dist/css/styles.css`),
        new HtmlWebpackPlugin({
            template: './client/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ]
};
