'use strict';

const path = require('path');

const _ = require('lodash');
const stylelint = require('stylelint');
const stylelintConfigStandard = require('stylelint-config-standard');
const stylelintConfigRecommended = require('stylelint-config-recommended');

const FileUtils = require('../utils/file');

/**
 * @param {CodeAnalyzerOptions} options
 * @returns {Promise<CodeAnalyzeReport>}
 */
function stylelintCodeAnalyze({ cwd = process.cwd(), baseDirectories = [] }) {
    // For further details https://github.com/stylelint/stylelint/blob/master/docs/user-guide/node-api.md
    let extensions = ['.sass', '.scss', '.less', '.sss'];
    let unflattenStyleFiles = baseDirectories.map(baseDirectory => extensions.map(extension => `${cwd}/${baseDirectory}/**/*${extension}`));
    let styleFiles = unflattenStyleFiles.reduce((a, b) => a.concat(b), []);

    return stylelint
        .lint({
            'config': _.merge({ }, stylelintConfigRecommended, stylelintConfigStandard),
            'formatter': 'json',
            'files': styleFiles,
            'syntax': null // The linter will automatically search what we need
        })
        .then(({ results }) => {
            let styleFileList = results.map(stylelintFileReport => stylelintFileReport.source);
            return Promise.all([results, styleFileList, FileUtils.countLinesInAllFiles(styleFileList)]);
        })
        .then(([results, styleFileList, countStyleSheetNbLines]) => {
            let errorCount = 0;
            let warningCount = 0;
            let unflattenedMessages = results.map(stylelintFileReport => {
                return stylelintFileReport.warnings.map(stylelintMessage => {
                    if (stylelintMessage.severity === 'error') {
                        errorCount += 1;

                    } else {
                        warningCount += 1;
                    }

                    return {
                        'column': stylelintMessage.column,
                        'endColumn': stylelintMessage.column,
                        'endLine': stylelintMessage.line,
                        'filePath': stylelintFileReport.source,
                        'fileRelativePath': path.relative(cwd, stylelintFileReport.source),
                        'level': stylelintMessage.severity,
                        'line': stylelintMessage.line,
                        'message': stylelintMessage.text,
                        'ruleId': stylelintMessage.rule
                    };
                });
            });

            return {
                'global': {
                    'nbErrors': errorCount,
                    'nbFiles': styleFileList.length,
                    'nbLines': countStyleSheetNbLines,
                    'nbWarnings': warningCount
                },
                'messages': unflattenedMessages.reduce((a, b) => a.concat(b), [])
            };
        });
}

module.exports = stylelintCodeAnalyze;
