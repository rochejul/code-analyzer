describe('styleSheet - CodeAnalyze ', () => {
    const styleSheetCodeAnalyze = require('../../lib/stylesheet/index');
    const path = require('path');

    it('should exist', () => {
        expect(styleSheetCodeAnalyze).toBeDefined();
    });

    it('should return an appropriate report format for the specified folder', () => {
        let cwd = path.resolve(path.join(__dirname, '../'));

        let promise = styleSheetCodeAnalyze(
            {
                cwd,
                baseDirectories: [
                    'files-to-lint'
                ]
            }
        );

        return promise
            .then(report => {
               expect(report).toEqual(require('./report-code-analyze'));
            });
    });
});
