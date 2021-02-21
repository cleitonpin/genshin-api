module.exports = {
    env: {
		browser: true,
		es2021: true,
    },
    extends: [
		'airbnb-base',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        indent: [4, 'tab'],
		noTabs: 0,
		"linebreak-style": 0
    },
};
