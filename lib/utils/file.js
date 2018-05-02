'use strict';

const { promisify } = require('util');

const countLinesInFile = require('count-lines-in-file');
const countLinesInFileAsync = promisify(countLinesInFile);

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
}

module.exports = FileUtils;
