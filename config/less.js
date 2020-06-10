// const lessLoader = require('../less-loader');

module.exports = () => [
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
    },
    {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
    },
];
