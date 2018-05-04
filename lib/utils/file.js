'use strict';

const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const countLinesInFile = require('count-lines-in-file');
const countLinesInFileAsync = promisify(countLinesInFile);

const PACKAGE_JSON_FILENAME = 'package.json';

class FileUtils {
    /**
     * @param {string[]} filePaths
     * @returns {Promise<number>}
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
     * @returns {Promise<number>}
     */
    static countLinesInFile(filePath) {
        return countLinesInFileAsync(filePath);
    }

    /**
     * Checks if we found a package.json file onto the CWD path
     * @param {string} [cwd]
     * @returns {boolean}
     */
    static hasPackageJsonFile(cwd = process.cwd()) {
        return fs.existsSync(path.resolve(path.join(cwd, PACKAGE_JSON_FILENAME)));
    }
}

module.exports = FileUtils;
