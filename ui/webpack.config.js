var ExtractTextPlugin = require("extract-text-webpack-plugin");
var buildDir = '../public/build';
module.exports = {
    entry: {
        user: './todo.jsx',
        chat: './chat.jsx',
        'font-awesome': 'font-awesome-webpack!./less/font-awesome.config.js',
        style: './css/style.css',
        login: './css/login.css'
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
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"}
        ]
    },
    watch: false,
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