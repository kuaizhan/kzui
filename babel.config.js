module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-react', '@babel/preset-typescript',
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        [
            'babel-plugin-transform-require-ignore',
            {
                extensions: ['.less'],
            },
        ],
    ],
    babelrcRoots: ['./packages/*'],
};
