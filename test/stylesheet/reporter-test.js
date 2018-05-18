describe('styleSheet - CodeReporter ', () => {
    const styleSheetCodeReporter = require('../../lib/stylesheet/reporter');
    const path = require('path');

    it('should exist', () => {
        expect(styleSheetCodeReporter).toBeDefined();
    });

    it('should return an appropriate report format', () => {
        let cwd = path.resolve(path.join(__dirname, '../'));
        let promise = styleSheetCodeReporter(
            require('../outputs/files-to-lint-stylelint-report'),
            {
                cwd,
                files: [
                    path.resolve(path.join(cwd, './files-to-lint/sample.less'))
                ]
            }
        );

        return promise
            .then(report => {
               expect(report).toEqual(require('./report-sample'));
            });
    });
});
