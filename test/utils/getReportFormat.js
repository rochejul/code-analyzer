'use strict';

const path = require('path');

const ecmaScriptReport = { 'type': 'EcmaScript', 'report': require('../ecmascript/report-code-analyze') };
const StyleSheetReport = { 'type': 'StyleSheet', 'report': require('../stylesheet/report-code-analyze') };

const cwd = path.resolve(path.join(__dirname, '../'));
const targetedFolder = path.resolve(path.join(cwd, './files-to-lint'));
const sampleJsFilePath = path.resolve(path.join(targetedFolder, './sample.js'));
const sampleLessFilePath = path.resolve(path.join(targetedFolder, './sample.less'));

module.exports = Object.freeze({
    'date': '2018-5-16 21:53:04',
    'reports': [
        ecmaScriptReport,
        StyleSheetReport
    ],
    'reportBy': {
        'EcmaScript': ecmaScriptReport,
        'StyleSheet': StyleSheetReport
    },
    'files': [
        {
            "fileName": "sample.js",
            "filePath": sampleJsFilePath,
            "extension": ".js",
            "lines": {
                "error": {
                    "count": 11,
                    "lines": []
                },
                "warning": {
                    "count": 0,
                    "lines": []
                }
            }
        },
        {
            "fileName": "sample.less",
            "filePath": sampleLessFilePath,
            "extension": ".less",
            "lines": {
                "error": {
                    "count": 5,
                    "lines": []
                },
                "warning": {
                    "count": 0,
                    "lines": []
                }
            }
        }
    ]
});
