'use strict';

const path = require('path');

const ecmaScriptCodeAnalyze = require('./ecmascript');
const ReportUtils = require('./utils/report');
const Logger = require('./logger');

/**
 * @class CodeAnalyzerOptions
 * @property {string} cwd
 * @property {string[]} baseDirectories
 */

// Display reports
ecmaScriptCodeAnalyze({ 'cwd': path.resolve(path.join(__dirname, '../test')), 'baseDirectories': ['files-to-lint'] })
    .then(codeAnalyzeReport => ReportUtils.toConsole('EcmaScript', codeAnalyzeReport))
    .catch((err) => {
        Logger.error('An error occured');
        Logger.error(err);
        process.exit(1);
    });
