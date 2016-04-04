/* global __dirname */

var path = require("path");

var webpack = require("webpack");

var jsDir = path.resolve(__dirname, "src");
var buildDir = path.resolve(__dirname, "build");

module.exports = {
    entry: path.resolve(jsDir, "index.js"),
    output: {
        path: buildDir,
        library: "ReactPaginate",
        libraryTarget: "umd",
        filename: "react-paginate.js"
    },
    devServer: {
        contentBase: buildDir,
    },
    module: {
        loaders: [
            {
                loader: "react-hot",
                test: jsDir,
            },
            {
                loader: "babel-loader",
                test: jsDir,
                query: {
                    presets: ["es2015", "react", "stage-0"],
                },
            }
        ]
    },
    externals: [
        {
            react: {
                root: "React",
                amd: "react",
                commonjs: "react",
                commonjs2: "react"
            }
        }
    ],
    stats: {
        colors: true
    },
    devtool: "source-map",
};
