describe('ecmaScript - CodeReporter ', () => {
    const ecmaScriptCodeReporter = require('../../lib/ecmascript/reporter');
    const path = require('path');

    it('should exist', () => {
        expect(ecmaScriptCodeReporter).toBeDefined();
    });

    it('should return an appropriate report format', () => {
        let cwd = path.resolve(path.join(__dirname, '../'));
        let promise = ecmaScriptCodeReporter(
            require('../outputs/files-to-lint-eslint-report'),
            {
                cwd,
                files: [
                    path.resolve(path.join(cwd, './files-to-lint/sample.js'))
                ]
            }
        );

        return promise
            .then(report => {
               expect(report).toEqual(require('./report-sample'));
            });
    });
});
