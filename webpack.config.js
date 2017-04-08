const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractBootstrap = new ExtractTextPlugin("css/bootstrap.css");
const extractSass = new ExtractTextPlugin("css/styles.css");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
            },
            {
                test: /\.css$/,
                // loader: "style-loader!css-loader",
                use: extractBootstrap.extract({
                    use: "css-loader",
                    fallback: "style-loader"
                })
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.jpg$/,
                loader: "file-loader"
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=image/svg+xml"
            },
            {
                test: /\.s[ac]ss$/,
                use: extractSass.extract({
                    use: ["css-loader", "sass-loader"],
                    fallback: "style-loader"
                })
            }
        ]
    },
    plugins: [
        extractBootstrap,
        extractSass,
        new HtmlWebpackPlugin({
            template: "./client/index.html",
            filename: "index.html",
            inject: "body"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};
