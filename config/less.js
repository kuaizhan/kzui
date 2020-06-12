const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = () => [
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    },
    {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
                loader: 'css-loader',
                options: {
                    minimize: true,
                }
            }, 'less-loader']
        }),
    },
];
