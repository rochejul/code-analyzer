'use strict';

const path = require('path');

const ecmaScriptCodeAnalyze = require('./ecmascript');
const ReportUtils = require('./utils/report');

// Display reports
ecmaScriptCodeAnalyze({ 'cwd': path.resolve(path.join(__dirname, '../test')), 'baseDirectories': ['files-to-lint'] })
    .then(codeAnalyzeReport => {
        ReportUtils.toConsole('EcmaScript', codeAnalyzeReport);
    });
