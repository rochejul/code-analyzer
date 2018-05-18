describe('ecmaScript - CodeAnalyze ', () => {
    const ecmaScriptCodeAnalyze = require('../../lib/ecmascript/index');
    const path = require('path');

    it('should exist', () => {
        expect(ecmaScriptCodeAnalyze).toBeDefined();
    });

    it('should return an appropriate report format for the specified folder', () => {
        let cwd = path.resolve(path.join(__dirname, '../'));

        let promise = ecmaScriptCodeAnalyze(
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
