'use strict';

const _ = require('lodash');
const stylelint = require('stylelint');
const stylelintConfigStandard = require('stylelint-config-standard');
const stylelintConfigRecommended = require('stylelint-config-recommended');

const reporter = require('./reporter');
const baseDirectoriesConstants = require('../constants/base-repositories');

/**
 * @param {CodeAnalyzerOptions} options
 * @returns {Promise<CodeAnalyzeReport>}
 */
function stylelintCodeAnalyze({ cwd = process.cwd(), baseDirectories = baseDirectoriesConstants }) {
    // For further details https://github.com/stylelint/stylelint/blob/master/docs/user-guide/node-api.md
    let extensions = ['.sass', '.scss', '.less', '.sss'];
    let unflattenStyleFiles = baseDirectories.map(baseDirectory => extensions.map(extension => `${cwd}/${baseDirectory}/**/*${extension}`));
    let styleFiles = unflattenStyleFiles.reduce((a, b) => a.concat(b), []);

    return stylelint
        .lint({
            'config': _.merge({ }, stylelintConfigRecommended, stylelintConfigStandard),
            'formatter': 'json',
            'files': styleFiles,
            'syntax': null // The linter will automatically search what we need
        })
        .then(stylelintReport => {
            return reporter(stylelintReport, { cwd, files: stylelintReport.results.map(stylelintFileReport => stylelintFileReport.source) });
        });
}

module.exports = stylelintCodeAnalyze;
