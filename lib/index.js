'use strict';

const path = require('path');
const Table = require('cli-table');
const eslint = require('eslint');
const eslintRecommendConfiguration = require('eslint-config-eslint');

// For further details https://eslint.org/docs/developer-guide/nodejs-api
// For further configuration https://eslint.org/docs/user-guide/configuring
// For further formating https://eslint.org/docs/developer-guide/nodejs-api#clienginegetformatter
let cli = new eslint.CLIEngine({
    'cwd': path.resolve(path.join(__dirname, '../test')),
    'envs': [
        'es6',
        'node'
    ],
    'useEslintrc': false,
    'rules': eslintRecommendConfiguration.rules,
    'globals': [
    ]
});

let eslintReport = cli.executeOnFiles([
    'files-to-lint/**/*.js'
]);

// Display the global report
let globalReport = new Table({
    'head': [
        'Global Report',
        'Global Measure'
    ]
});

globalReport.push([ 'EcmaScript errors', eslintReport.errorCount ]);
globalReport.push([ 'EcmaScript warnings', eslintReport.warningCount ]);

// Display the ecmascript report as verbose
let ecmaScriptReportTable = new Table({
    'head': [
        'JavaScript file',
        'Level',
        'Where into the file',
        'Reason',
        'Rule ID'
    ]
});

// table is an Array, so you can `push`, `unshift`, `splice` and friends
eslintReport.results.forEach(eslintFileReport => {
    eslintFileReport.messages.forEach(eslintMessage => {
        ecmaScriptReportTable.push([
            eslintFileReport.filePath,
            eslintMessage.severity === 2 ? 'error' : 'warning',
            `Line ${eslintMessage.line} / Column ${eslintMessage.column}`,
            eslintMessage.message,
            eslintMessage.ruleId
        ]);
    });
});

// Display the tables
console.log(globalReport.toString());
console.log('\n');
console.log(ecmaScriptReportTable.toString());
