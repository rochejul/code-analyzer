'use strict';

const path = require('path');

const cwd = path.resolve(path.join(__dirname, '../'));
const targetedFolder = path.resolve(path.join(cwd, './files-to-lint'));
const sampleLessFilePath = path.resolve(path.join(targetedFolder, './sample.less'));
const sampleLessRelativeFilePath = path.relative(cwd, sampleLessFilePath);

module.exports = Object.freeze({
    "global": {
        "nbErrors": 5,
            "nbFiles": 1,
            "nbLines": 6,
            "nbWarnings": 0
    },
    "messages": [
        {
            "column": 25,
            "endColumn": 25,
            "endLine": 2,
            "filePath": sampleLessFilePath,
            "fileRelativePath": sampleLessRelativeFilePath,
            "level": "error",
            "line": 2,
            "message": "Expected single space before \"{\" (block-opening-brace-space-before)",
            "ruleId": "block-opening-brace-space-before"
        },
        {
            "column": 8,
            "endColumn": 8,
            "endLine": 5,
            "filePath": sampleLessFilePath,
            "fileRelativePath": sampleLessRelativeFilePath,
            "level": "error",
            "line": 5,
            "message": "Unexpected empty line before declaration (declaration-empty-line-before)",
            "ruleId": "declaration-empty-line-before"
        },
        {
            "column": 5,
            "endColumn": 5,
            "endLine": 3,
            "filePath": sampleLessFilePath,
            "fileRelativePath": sampleLessRelativeFilePath,
            "level": "error",
            "line": 3,
            "message": "Expected indentation of 2 spaces (indentation)",
            "ruleId": "indentation"
        },
        {
            "column": 8,
            "endColumn": 8,
            "endLine": 5,
            "filePath": sampleLessFilePath,
            "fileRelativePath": sampleLessRelativeFilePath,
            "level": "error",
            "line": 5,
            "message": "Expected indentation of 2 spaces (indentation)",
            "ruleId": "indentation"
        },
        {
            "column": 10,
            "endColumn": 10,
            "endLine": 2,
            "filePath": sampleLessFilePath,
            "fileRelativePath": sampleLessRelativeFilePath,
            "level": "error",
            "line": 2,
            "message": "Expected newline after \",\" (selector-list-comma-newline-after)",
            "ruleId": "selector-list-comma-newline-after"
        }
    ]
});
