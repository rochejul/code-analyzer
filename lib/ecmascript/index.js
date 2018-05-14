'use strict';

const path = require('path');

const eslint = require('eslint');
const eslintRecommendConfiguration = require('eslint-config-eslint');

const reporter = require('./reporter');
const baseDirectoriesConstants = require('../constants/base-repositories');

/**
 * @param {CodeAnalyzerOptions} options
 * @returns {Promise<CodeAnalyzeReport>}
 */
function ecmaScriptCodeAnalyze({ cwd = process.cwd(), baseDirectories = baseDirectoriesConstants }) {
    // For further details https://eslint.org/docs/developer-guide/nodejs-api
    // For further configuration https://eslint.org/docs/user-guide/configuring
    // For further formating https://eslint.org/docs/developer-guide/nodejs-api#clienginegetformatter
    let cli = new eslint.CLIEngine({
        'cwd': cwd,
        'envs': [
            'es6',
            'browser',
            'node'
        ],
        'parserOptions': {
            'ecmaVersion': 2018 // EcmaScript 9
        },
        'extensions': [
            '.js',
            '.mjs'
        ],
        'useEslintrc': false, // Ignore eslint config file
        'ignorePath': path.resolve(path.join(__dirname, './.eslintignore')), // Specify it to replace the ignore file
        'rules': eslintRecommendConfiguration.rules,
        'globals': [
        ]
    });

    // Execute Eslint reporting
    let eslintReport = cli.executeOnFiles(baseDirectories);
    let jsFileList = eslintReport.results.map(eslintFileReport => eslintFileReport.filePath);

    // Create reports
    return reporter(eslintReport, { cwd, files: jsFileList });
}

module.exports = ecmaScriptCodeAnalyze;
