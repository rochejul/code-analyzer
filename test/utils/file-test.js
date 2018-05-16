describe('FileUtils ', () => {
    const FileUtils = require('../../lib/utils/file');
    const path = require('path');

    it('should exist', () => {
        expect(FileUtils).toBeDefined();
    });

    describe('and the method "countLinesInAllFiles" ', () => {
        it('should exist', () => {
            expect(FileUtils.countLinesInAllFiles).toBeDefined();
        });

        it('should return the expected number of lines', () => {
            return FileUtils
                .countLinesInAllFiles([
                    path.resolve(path.join(__dirname, '../files-to-lint/sample.js')),
                    path.resolve(path.join(__dirname, '../files-to-lint/sample.less'))
                ])
                .then(count => {
                    expect(count).toEqual(12);
                });
        });
    });

    describe('and the method "countLinesInFile" ', () => {
        it('should exist', () => {
            expect(FileUtils.countLinesInFile).toBeDefined();
        });

        it('should return the expected number of lines', () => {
            return FileUtils
                .countLinesInFile(path.resolve(path.join(__dirname, '../files-to-lint/sample.js')))
                .then(count => {
                    expect(count).toEqual(6);
                });
        });
    });

    describe('and the method "getBaseDirectories" ', () => {
        it('should exist', () => {
            expect(FileUtils.getBaseDirectories).toBeDefined();
        });

        it('should return the filtered list of directories', () => {
            expect(FileUtils.getBaseDirectories(path.resolve(path.join(__dirname, '../fake-directories-structuration/getBaseDirectories')))).toEqual([
                'a',
                'b'
            ]);
        });
    });

    describe('and the method "hasPackageJsonFile" ', () => {
        it('should exist', () => {
            expect(FileUtils.hasPackageJsonFile).toBeDefined();
        });

        it('should return false if no detected package.json file', () => {
            expect(FileUtils.hasPackageJsonFile(path.resolve(path.join(__dirname, '../fake-directories-structuration/hasPackageJsonFile-false')))).toBeFalsy();
        });

        it('should return true otherwise', () => {
            expect(FileUtils.hasPackageJsonFile(path.resolve(path.join(__dirname, '../fake-directories-structuration/hasPackageJsonFile-true')))).toBeTruthy();
        });
    });
});
