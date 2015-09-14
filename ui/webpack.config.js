var ExtractTextPlugin = require("extract-text-webpack-plugin");
var buildDir = '../public/build';
var entriesDir = './webpack-entrypoints/';
var _ = require('lodash');
var argv = require('optimist').argv;
var entry = argv.entryPoint || (function () {
        var fs = require('fs');
        return fs.readdirSync(entriesDir).join();
    })();
var entries = entry.split(',');
var entryPoints = {};
_.forEach(entries, function (point) {
    _.merge(entryPoints, require(entriesDir + point))
});
console.log(entryPoints)
module.exports = {
    entry: entryPoints,
    output: {
        path: buildDir,
        filename: '[name].js'
    },
    module: {
        loaders: [
            {test: /\.jsx$/, loader: 'jsx-loader?insertPragma=React.DOM&harmony'},
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"},
            {test: /\.less$/, loader: 'style!css!less'}
        ]
    },
    //watch: true,
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new ExtractTextPlugin("[name].css", {
            allChunks: true
        })
    ]
};