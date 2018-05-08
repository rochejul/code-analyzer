'use strict';

const ReportUtils = require('./utils/report');

const ReportTypeEnum = require('./enums/report-type');
const ReportFormatEnum = require('./enums/report-format');

const ecmaScriptCodeAnalyze = require('./ecmascript');
const stylelintCodeAnalyze = require('./stylesheet');

/**
 * @class CodeAnalyzerOptions
 * @property {string} cwd
 * @property {string[]} baseDirectories
 * @property {string} reportFormat
 * @property {string} reportPath
 */

/**
 * @param {CodeAnalyzerOptions} options
 * @returns {Promise}
 */
function codeAnalyzer(options) {
    return Promise
        .all([
            ecmaScriptCodeAnalyze(options),
            stylelintCodeAnalyze(options)
        ])
        .then(([ecmaScriptCodeAnalyzeReport, styleSheetcodeAnalyzeReport]) => {
            let reportEntries = [
                { 'type': ReportTypeEnum.ECMASCRIPT, 'report': ecmaScriptCodeAnalyzeReport },
                { 'type': ReportTypeEnum.STYLESHEET, 'report': styleSheetcodeAnalyzeReport }
            ];

            if (options.reportFormat === ReportFormatEnum.HTML) {
                return ReportUtils.toHtml(reportEntries, options.reportPath);
            }

            if (options.reportFormat === ReportFormatEnum.JSON) {
                return ReportUtils.toJson(reportEntries, options.reportPath);
            }

            return ReportUtils.toConsole(reportEntries);
        });
}


module.exports = codeAnalyzer;
