'use strict';

const path = require('path');

const ReportUtils = require('./utils/report');
const Logger = require('./logger');

const ecmaScriptCodeAnalyze = require('./ecmascript');
const stylelintCodeAnalyze = require('./stylesheet');

/**
 * @class CodeAnalyzerOptions
 * @property {string} cwd
 * @property {string[]} baseDirectories
 */

// Display reports
let options = { 'cwd': path.resolve(path.join(__dirname, '../test')), 'baseDirectories': ['files-to-lint'] };
Promise
    .all([
        ecmaScriptCodeAnalyze(options),
        stylelintCodeAnalyze(options)
    ])
    .then(([ecmaScriptCodeAnalyzeReport, styleSheetcodeAnalyzeReport]) => {
        return ReportUtils
            .toConsole('EcmaScript', ecmaScriptCodeAnalyzeReport)
            .then(() => ReportUtils.toConsole('Stylesheet', styleSheetcodeAnalyzeReport));
    })
    .catch((err) => {
        Logger.error('An error occured');
        Logger.error(err);
        process.exit(1);
    });
