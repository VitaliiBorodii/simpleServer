var ExtractTextPlugin = require("extract-text-webpack-plugin");
var buildDir = '../public/build';
var webpack = require("webpack");
var production = process.env.NODE_ENV === 'production';
var plugins = [new ExtractTextPlugin("[name].css", {
    allChunks: true
})];
var prod = process.env.NODE_ENV === "production";
if (prod) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}))
}
module.exports = {
    entry: {
        chat: './chat.jsx',
        'font-awesome': 'font-awesome-webpack!./less/font-awesome.config.js',
        style: './css/style.css',
        login: './login.js',
        mypage: './todo.jsx'
    },
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
    plugins: plugins
};