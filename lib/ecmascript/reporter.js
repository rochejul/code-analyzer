'use strict';

const path = require('path');

const FileUtils = require('../utils/file');
const ReportLevelEnum = require('../enums/report-level');

/**
 * @param {Object} eslintReport
 * @param {[ cwd: string, files: string[] }} infos
 * @returns {Promise<CodeAnalyzeReport>}
 */
function ecmaScriptCodeReporter(eslintReport, { cwd = process.cwd(), files = [] }) {
    return FileUtils
        .countLinesInAllFiles(files)
        .then(countEcmaScriptNbLines => {
            let unflattenedMessages = eslintReport.results.map(eslintFileReport => {
                return eslintFileReport.messages.map(eslintMessage => {
                    return {
                        'column': eslintMessage.column,
                        'endColumn': eslintMessage.endColumn,
                        'endLine': eslintMessage.endLine,
                        'filePath': eslintFileReport.filePath,
                        'fileRelativePath': path.relative(cwd, eslintFileReport.filePath),
                        'level': eslintMessage.severity === 2 ? ReportLevelEnum.ERROR : ReportLevelEnum.WARNING,
                        'line': eslintMessage.line,
                        'message': eslintMessage.message,
                        'ruleId': eslintMessage.ruleId
                    };
                });
            });

            return {
                'global': {
                    'nbErrors': eslintReport.errorCount,
                    'nbFiles': files.length,
                    'nbLines': countEcmaScriptNbLines,
                    'nbWarnings': eslintReport.warningCount
                },
                'messages': unflattenedMessages.reduce((a, b) => a.concat(b), [])
            };
        });
}

module.exports = ecmaScriptCodeReporter;
