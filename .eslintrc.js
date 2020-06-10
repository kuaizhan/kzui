module.exports = {
	root: true,
    parserOptions: {
        ecmascript: 6,
        sourceType: 'module',
    },
    env: {
        browser: true,
        node: true
    },
    extends: [
        'kuaizhan'
    ],
    rules: {
        'react/prefer-stateless-function': 'off',
        'react/jsx-indent-props': [1, 4],
        'jsx-a11y/label-has-for': 'off',
        "jsx-a11y/href-no-hash": "off",
        'jsx-a11y/no-static-element-interactions': 'off',
        'react/no-array-index-key': 'off',
        'import/no-extraneous-dependencies': 'off',
        'class-methods-use-this': ['error', {
            exceptMethods: [
                'render',
                'getInitialState',
                'getDefaultProps',
                'getChildContext',
                'componentWillMount',
                'componentDidMount',
                'componentWillReceiveProps',
                'shouldComponentUpdate',
                'componentWillUpdate',
                'componentDidUpdate',
                'componentWillUnmount',
                'initStateFromProps',
            ],
        }],
    }
};
