'use strict';

const path = require('path');
const eslint = require('eslint');
const eslintRecommendConfiguration = require('eslint-config-eslint');

// For further details https://eslint.org/docs/developer-guide/nodejs-api
let cli = new eslint.CLIEngine({
    'cwd': path.resolve(path.join(__dirname, '../test')),
    'envs': [
        'es6',
        'node'
    ],
    'useEslintrc': false,
    'rules': eslintRecommendConfiguration.rules,
    'globals': [
    ]
});

let report = cli.executeOnFiles([
    'files-to-lint/**/*.js'
]);
console.info(JSON.stringify(report, null, 3));
