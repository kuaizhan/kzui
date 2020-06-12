const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = () => [
    {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
        })
    },
    {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
    },
];
