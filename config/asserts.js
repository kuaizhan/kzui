module.exports = () => [
    {
        test: /\.(svg|eot|woff2|woff|ttf|otf)$/,
        exclude: /^node_modules$/,
        loader: 'file-loader?name=fonts/[name].[hash:8].[ext]',
    },
    {
        test: /\.(png|jpg|gif|webp)$/,
        loader: 'file-loader?name=images/[name].[hash:8].[ext]',
    },
];

