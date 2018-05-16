'use strict';

const path = require('path');

const FileUtils = require('../utils/file');

/**
 * @param {Object} stylelintReport
 * @param {[ cwd: string, files: string[] }} infos
 * @returns {Promise<CodeAnalyzeReport>}
 */
function styleSheetCodeReporter({ results }, { cwd = process.cwd(), files = [] }) {
    return FileUtils
        .countLinesInAllFiles(files)
        .then(countStyleSheetNbLines => {
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
                    'nbFiles': files.length,
                    'nbLines': countStyleSheetNbLines,
                    'nbWarnings': warningCount
                },
                'messages': unflattenedMessages.reduce((a, b) => a.concat(b), [])
            };
        });
}

module.exports = styleSheetCodeReporter;
