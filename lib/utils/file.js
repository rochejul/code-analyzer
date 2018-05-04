'use strict';

const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const countLinesInFile = require('count-lines-in-file');
const countLinesInFileAsync = promisify(countLinesInFile);

const PACKAGE_JSON_FILENAME = 'package.json';
const FOLDER_BLACK_LIST = [
    'node_modules',
    'bower_components'
];

class FileUtils {
    /**
     * @param {string[]} filePaths
     * @return {Promise<number>}
     */
    static countLinesInAllFiles(filePaths) {
        return Promise
            .all(
                filePaths.map(filePath => FileUtils.countLinesInFile(filePath))
            )
            .then(counts => counts.reduce((nbLines, nbTotalLines) => nbLines + nbTotalLines, 0));
    }

    /**
     * @param {string} filePath
     * @return {Promise<number>}
     */
    static countLinesInFile(filePath) {
        return countLinesInFileAsync(filePath);
    }

    /**
     * @param {string} [cwd]
     * @return {string[]} List of folder name
     */
    static getBaseDirectories(cwd = process.cwd()) {
        return fs
            .readdirSync(cwd)
            .filter(folderName => fs.statSync(folderName).isDirectory())
            .filter(folderName => !folderName.startsWith('.'))
            .filter(folderName => FOLDER_BLACK_LIST.indexOf(folderName) < 0)
        ;
    }

    /**
     * Checks if we found a package.json file onto the CWD path
     * @param {string} [cwd]
     * @return {boolean}
     */
    static hasPackageJsonFile(cwd = process.cwd()) {
        return fs.existsSync(path.resolve(path.join(cwd, PACKAGE_JSON_FILENAME)));
    }
}

module.exports = FileUtils;
