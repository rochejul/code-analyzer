'use strict';

const path = require('path');

const cwd = path.resolve(path.join(__dirname, '../'));
const targetedFolder = path.resolve(path.join(cwd, './files-to-lint'));
const sampleJsFilePath = path.resolve(path.join(targetedFolder, './sample.js'));

module.exports = Object.freeze({
    "results": [
        {
            "filePath": sampleJsFilePath,
            "messages": [
                {
                    "ruleId": "require-jsdoc",
                    "severity": 2,
                    "message": "Missing JSDoc comment.",
                    "line": 2,
                    "column": 1,
                    "nodeType": "FunctionDeclaration",
                    "source": "function aFakeMethod (param1, param2 ) {",
                    "endLine": 6,
                    "endColumn": 2
                },
                {
                    "ruleId": "strict",
                    "severity": 2,
                    "message": "Use the global form of 'use strict'.",
                    "line": 2,
                    "column": 1,
                    "nodeType": "Program",
                    "source": "function aFakeMethod (param1, param2 ) {",
                    "endLine": 6,
                    "endColumn": 2
                },
                {
                    "ruleId": "no-unused-vars",
                    "severity": 2,
                    "message": "'aFakeMethod' is defined but never used.",
                    "line": 2,
                    "column": 10,
                    "nodeType": "Identifier",
                    "source": "function aFakeMethod (param1, param2 ) {",
                    "endLine": 2,
                    "endColumn": 21
                },
                {
                    "ruleId": "space-before-function-paren",
                    "severity": 2,
                    "message": "Unexpected space before function parentheses.",
                    "line": 2,
                    "column": 21,
                    "nodeType": "FunctionDeclaration",
                    "source": "function aFakeMethod (param1, param2 ) {",
                    "fix": {
                        "range": [
                            21,
                            22
                        ],
                        "text": ""
                    }
                },
                {
                    "ruleId": "no-unused-vars",
                    "severity": 2,
                    "message": "'param2' is defined but never used.",
                    "line": 2,
                    "column": 31,
                    "nodeType": "Identifier",
                    "source": "function aFakeMethod (param1, param2 ) {",
                    "endLine": 2,
                    "endColumn": 37
                },
                {
                    "ruleId": "space-in-parens",
                    "severity": 2,
                    "message": "There should be no spaces inside this paren.",
                    "line": 2,
                    "column": 38,
                    "nodeType": "Program",
                    "source": "function aFakeMethod (param1, param2 ) {",
                    "fix": {
                        "range": [
                            37,
                            38
                        ],
                        "text": ""
                    }
                },
                {
                    "ruleId": "no-undef",
                    "severity": 2,
                    "message": "'_var' is not defined.",
                    "line": 3,
                    "column": 5,
                    "nodeType": "Identifier",
                    "source": "    _var = param1;",
                    "endLine": 3,
                    "endColumn": 9
                },
                {
                    "ruleId": "semi",
                    "severity": 2,
                    "message": "Missing semicolon.",
                    "line": 4,
                    "column": 11,
                    "nodeType": "ReturnStatement",
                    "source": "    return",
                    "fix": {
                        "range": [
                            71,
                            71
                        ],
                        "text": ";"
                    }
                },
                {
                    "ruleId": "indent",
                    "severity": 2,
                    "message": "Expected indentation of 4 spaces but found 8.",
                    "line": 5,
                    "column": 1,
                    "nodeType": "Identifier",
                    "source": "        _var;",
                    "endLine": 5,
                    "endColumn": 9,
                    "fix": {
                        "range": [
                            72,
                            80
                        ],
                        "text": "    "
                    }
                },
                {
                    "ruleId": "no-undef",
                    "severity": 2,
                    "message": "'_var' is not defined.",
                    "line": 5,
                    "column": 9,
                    "nodeType": "Identifier",
                    "source": "        _var;",
                    "endLine": 5,
                    "endColumn": 13
                },
                {
                    "ruleId": "no-unused-expressions",
                    "severity": 2,
                    "message": "Expected an assignment or function call and instead saw an expression.",
                    "line": 5,
                    "column": 9,
                    "nodeType": "ExpressionStatement",
                    "source": "        _var;",
                    "endLine": 5,
                    "endColumn": 14
                }
            ],
            "errorCount": 11,
            "warningCount": 0,
            "fixableErrorCount": 4,
            "fixableWarningCount": 0,
            "source": "\nfunction aFakeMethod (param1, param2 ) {\n    _var = param1;\n    return\n        _var;\n}\n"
        }
    ],
    "errorCount": 11,
    "warningCount": 0,
    "fixableErrorCount": 4,
    "fixableWarningCount": 0
});
