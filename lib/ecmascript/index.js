'use strict';

const path = require('path');

const eslint = require('eslint');
const eslintRecommendConfiguration = require('eslint-config-eslint');

const FileUtils = require('../utils/file');

/**
 * @param {CodeAnalyzerOptions} options
 * @returns {Promise<CodeAnalyzeReport>}
 */
function ecmaScriptCodeAnalyze({ cwd = process.cwd(), baseDirectories = [] }) {
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
    return FileUtils
        .countLinesInAllFiles(jsFileList)
        .then(countEcmaScriptNbLines => {
            let unflattenedMessages = eslintReport.results.map(eslintFileReport => {
                return eslintFileReport.messages.map(eslintMessage => {
                    return {
                        'column': eslintMessage.column,
                        'endColumn': eslintMessage.endColumn,
                        'endLine': eslintMessage.endLine,
                        'filePath': eslintFileReport.filePath,
                        'fileRelativePath': path.relative(cwd, eslintFileReport.filePath),
                        'level': eslintMessage.severity === 2 ? 'error' : 'warning',
                        'line': eslintMessage.line,
                        'message': eslintMessage.message,
                        'ruleId': eslintMessage.ruleId
                    };
                });
            });

            return {
                'global': {
                    'nbErrors': eslintReport.errorCount,
                    'nbFiles': jsFileList.length,
                    'nbLines': countEcmaScriptNbLines,
                    'nbWarnings': eslintReport.warningCount
                },
                'messages': unflattenedMessages.reduce((a, b) => a.concat(b), [])
            };
        });
}

module.exports = ecmaScriptCodeAnalyze;
