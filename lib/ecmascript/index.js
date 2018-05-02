'use strict';

const path = require('path');

const eslint = require('eslint');
const eslintRecommendConfiguration = require('eslint-config-eslint');

const FileUtils = require('../utils/file');

/**
 * @param cwd
 * @param baseDirectories
 * @returns {Promise<CodeAnalyzeReport>}
 */
function ecmaScriptCodeAnalyze({ cwd = process.cwd(), baseDirectories = [] }) {
    // For further details https://eslint.org/docs/developer-guide/nodejs-api
    // For further configuration https://eslint.org/docs/user-guide/configuring
    // For further formating https://eslint.org/docs/developer-guide/nodejs-api#clienginegetformatter
    let jsFiles = baseDirectories.map(baseDirectory => `${baseDirectory}/**/*.js`);
    let cli = new eslint.CLIEngine({
        'cwd': cwd,
        'envs': [
            'es6',
            'node'
        ],
        'useEslintrc': false,
        'rules': eslintRecommendConfiguration.rules,
        'globals': [
        ]
    });

    // Execute Eslint reporting
    let eslintReport = cli.executeOnFiles(jsFiles);
    let jsFileList = eslintReport.results.map(eslintFileReport => eslintFileReport.filePath);

    // Create reports
    return FileUtils
        .countLinesInAllFiles(jsFileList)
        .then(countEcmaScriptNbLines => {
            let unflattenedMessages = eslintReport.results.map(eslintFileReport => {
                return eslintFileReport.messages.map(eslintMessage => {
                    return {
                        'column': eslintMessage.column,
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
