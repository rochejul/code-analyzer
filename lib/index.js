'use strict';

const path = require('path');
const { promisify } = require('util');

const Table = require('cli-table');
const countLinesInFile = require('count-lines-in-file');
const countLinesInFileAsync = promisify(countLinesInFile);

const eslint = require('eslint');
const eslintGlobUtil = require('eslint/lib/util/glob-util');
const eslintRecommendConfiguration = require('eslint-config-eslint');

function countNumberofLines(filePaths) {
    return Promise
        .all(
            filePaths.map(filePath => countLinesInFileAsync(filePath))
        )
        .then(counts => counts.reduce((nbLines, nbTotalLines) => nbLines + nbTotalLines, 0));
}

// For further details https://eslint.org/docs/developer-guide/nodejs-api
// For further configuration https://eslint.org/docs/user-guide/configuring
// For further formating https://eslint.org/docs/developer-guide/nodejs-api#clienginegetformatter
let cwd = path.resolve(path.join(__dirname, '../test'));
let jsFiles = [
    'files-to-lint/**/*.js'
];
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
let jsFileList = eslintGlobUtil.listFilesToProcess(
    eslintGlobUtil.resolveFileGlobPatterns(jsFiles, { cwd }),
    { cwd }
);


// Display reports
countNumberofLines(jsFileList.map(jsFile => jsFile.filename))
    .then(countEcmaScriptNbLines => {
        // Display the global report
        let globalReport = new Table({
            'head': [
                'Global Report',
                'Global Measure'
            ]
        });

        globalReport.push([ 'EcmaScript nb files', jsFileList.length ]);
        globalReport.push([ 'EcmaScript nb lines', countEcmaScriptNbLines ]);
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
    });
