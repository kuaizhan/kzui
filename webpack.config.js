const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const lessConfig = require('./config/less');
const assertsRules = require('./config/asserts');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    mode: 'production', // development

    entry: './website/index.tsx',
    output: {
        // publicPath: path.resolve(__dirname, 'public'),
        path: path.resolve(__dirname, 'public/dist'),
        filename: 'bundle.js',
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'website/public/index.html',
            hash: false,
            inject: true,
        }),
        new ExtractTextPlugin("styles.css"),
    ],

    // Enable sourcemaps for debugging webpack's output.
    // devtool: 'source-map',

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.md'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: './tsconfig.json',
                logLevel: 'info',
                extensions: ['.ts', '.tsx', '.js'],
                mainFields: ['browser', 'main'],
            }),
        ]
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)|\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
            {
                test: /\.md$/,
                use: {
                    loader: 'raw-loader',
                },
            },
        ].concat(lessConfig(), assertsRules()),
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     react: 'React',
    //     'react-dom': 'ReactDOM',
    // },

    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true, // Must be set to true if using source-maps in production
                terserOptions: {
                // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                },
            }),
        ],
    },

    devServer: {
        port: 8080,
        host: 'localhost',
        compress: true,
        stats: {
            children: false,
        },
    },
};
