'use strict';

const path = require('path');

const cwd = path.resolve(path.join(__dirname, '../'));
const targetedFolder = path.resolve(path.join(cwd, './files-to-lint'));
const sampleJsFilePath = path.resolve(path.join(targetedFolder, './sample.js'));
const sampleJsRelativeFilePath = path.relative(cwd, sampleJsFilePath);

module.exports = Object.freeze({
    "global": {
        "nbErrors": 11,
        "nbFiles": 1,
        "nbLines": 6,
        "nbWarnings": 0
    },
    "messages": [
        {
            "column": 1,
            "endColumn": 2,
            "endLine": 6,
            "filePath": sampleJsFilePath,
            "fileRelativePath": sampleJsRelativeFilePath,
            "level": "error",
            "line": 2,
            "message": "Missing JSDoc comment.",
            "ruleId": "require-jsdoc"
        },
        {
            "column": 1,
            "endColumn": 2,
            "endLine": 6,
            "filePath": sampleJsFilePath,
            "fileRelativePath": sampleJsRelativeFilePath,
            "level": "error",
            "line": 2,
            "message": "Use the global form of 'use strict'.",
            "ruleId": "strict"
        },
        {
            "column": 10,
            "endColumn": 21,
            "endLine": 2,
            "filePath": sampleJsFilePath,
            "fileRelativePath": sampleJsRelativeFilePath,
            "level": "error",
            "line": 2,
            "message": "'aFakeMethod' is defined but never used.",
            "ruleId": "no-unused-vars"
        },
        {
            "column": 21,
            "filePath": sampleJsFilePath,
            "fileRelativePath": sampleJsRelativeFilePath,
            "level": "error",
            "line": 2,
            "message": "Unexpected space before function parentheses.",
            "ruleId": "space-before-function-paren"
        },
        {
            "column": 31,
            "endColumn": 37,
            "endLine": 2,
            "filePath": sampleJsFilePath,
            "fileRelativePath": sampleJsRelativeFilePath,
            "level": "error",
            "line": 2,
            "message": "'param2' is defined but never used.",
            "ruleId": "no-unused-vars"
        },
        {
            "column": 38,
            "filePath": sampleJsFilePath,
            "fileRelativePath": sampleJsRelativeFilePath,
            "level": "error",
            "line": 2,
            "message": "There should be no spaces inside this paren.",
            "ruleId": "space-in-parens"
        },
        {
            "column": 5,
            "endColumn": 9,
            "endLine": 3,
            "filePath": sampleJsFilePath,
            "fileRelativePath": sampleJsRelativeFilePath,
            "level": "error",
            "line": 3,
            "message": "'_var' is not defined.",
            "ruleId": "no-undef"
        },
        {
            "column": 11,
            "filePath": sampleJsFilePath,
            "fileRelativePath": sampleJsRelativeFilePath,
            "level": "error",
            "line": 4,
            "message": "Missing semicolon.",
            "ruleId": "semi"
        },
        {
            "column": 1,
            "endColumn": 9,
            "endLine": 5,
            "filePath": sampleJsFilePath,
            "fileRelativePath": sampleJsRelativeFilePath,
            "level": "error",
            "line": 5,
            "message": "Expected indentation of 4 spaces but found 8.",
            "ruleId": "indent"
        },
        {
            "column": 9,
            "endColumn": 13,
            "endLine": 5,
            "filePath": sampleJsFilePath,
            "fileRelativePath": sampleJsRelativeFilePath,
            "level": "error",
            "line": 5,
            "message": "'_var' is not defined.",
            "ruleId": "no-undef"
        },
        {
            "column": 9,
            "endColumn": 14,
            "endLine": 5,
            "filePath": sampleJsFilePath,
            "fileRelativePath": sampleJsRelativeFilePath,
            "level": "error",
            "line": 5,
            "message": "Expected an assignment or function call and instead saw an expression.",
            "ruleId": "no-unused-expressions"
        }
    ]
});
