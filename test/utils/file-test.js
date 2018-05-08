describe('FileUtils ', () => {
    const FileUtils = require('../../lib/utils/file');

    it('should exist', () => {
        expect(FileUtils).toBeDefined();
    });

    describe('and the method "countLinesInFile" ', () => {
        it('should exist', () => {
            expect(FileUtils.countLinesInFile).toBeDefined();
        });
    });
});
