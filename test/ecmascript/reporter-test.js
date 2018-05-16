describe('ecmaScript - CodeReporter ', () => {
    const ecmaScriptCodeReporter = require('../../lib/ecmascript/reporter');
    const path = require('path');

    it('should exist', () => {
        expect(ecmaScriptCodeReporter).toBeDefined();
    });

    it('should return an appropriate report format', () => {
        let cwd = path.resolve(path.join(__dirname, '../files-to-lint'));
        let promise = ecmaScriptCodeReporter(
            require('../outputs/files-to-lint-eslint-report.json'),
            {
                cwd,
                files: [
                    path.resolve(path.join(cwd, 'sample.js'))
                ]
            }
        );

        return promise
            .then(report => {
               expect(report).toEqual(require('./report-sample.json'));
            });
    });
});
