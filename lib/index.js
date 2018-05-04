'use strict';

const ReportUtils = require('./utils/report');

const ecmaScriptCodeAnalyze = require('./ecmascript');
const stylelintCodeAnalyze = require('./stylesheet');

/**
 * @class CodeAnalyzerOptions
 * @property {string} cwd
 * @property {string[]} baseDirectories
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
            return ReportUtils
                .toConsole('EcmaScript', ecmaScriptCodeAnalyzeReport)
                .then(() => ReportUtils.toConsole('Stylesheet', styleSheetcodeAnalyzeReport));
        });
}


module.exports = codeAnalyzer;
