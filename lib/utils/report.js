'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { promisify } = require('util');

const ejs = require('ejs');
const _ = require('lodash');
const Table = require('cli-table');

const Logger = require('../logger');
const writeFileAsync = promisify(fs.writeFile);

/**
 * @class CodeAnalyzeReport
 * @property {CodeAnalyzeReportGlobal} global
 * @property {CodeAnalyzeReportMessage[]} messages
 */

/**
 * @class CodeAnalyzeReportGlobal
 * @property {number} nbErrors
 * @property {number} nbFiles
 * @property {number} nbLines
 * @property {number} nbWarnings
 */

/**
 * @class CodeAnalyzeReportMessage
 * @property {number} column
 * @property {number} endColumn
 * @property {number} endLine
 * @property {string} filePath
 * @property {string} fileRelativePath
 * @property {string} level
 * @property {number} line
 * @property {string} message
 * @property {string} ruleId
 */

/**
 * @class CodeAnalyzeReportEntry
 * @property {string} type
 * @property {CodeAnalyzeReport} report
 */

/**
 * @class CodeAnalyzeReportFile
 * @property {string} fileName
 * @property {string} filePath
 * @property {string} extension
 * @property {CodeAnalyzeReportFileLines} lines
 */

/**
 * @class CodeAnalyzeReportFileLines
 * @property {CodeAnalyzeReportFileLinesDetails} error
 * @property {CodeAnalyzeReportFileLinesDetails} warning
 */

/**
 * @class CodeAnalyzeReportFileLinesDetails
 * @property {number} count
 * @property {number[]} lines
 */

/**
 * @class CodeAnalyzeReporting
 * @property {string} date
 * @property {CodeAnalyzeReportEntry[]} reports
 * @property {CodeAnalyzeReportFile[]} files
 * @property {Object<CodeAnalyzeReportTypeEnum, CodeAnalyzeReportEntry>} reportBy
 */

const MAX_ARRAY_LENGTH = 2000;

const REPORT_TEMPLATES = {
    'SIMPLE_HTML': ejs.compile(fs.readFileSync(path.resolve(path.join(__dirname, './templates/simple-report.html'))).toString())
};

/**
 * @private
 * @param {CodeAnalyzeReportEntry} reportEntry
 * @returns {Promise}
 */
function toConsole({ type, report }) {
    return new Promise((resolve, reject) => {
        try {
            // Display the global report
            let globalReport = new Table({
                'head': [
                    'Global Report',
                    'Global Measure'
                ]
            });

            globalReport.push([ `${type} nb files`, report.global.nbFiles ]);
            globalReport.push([ `${type} nb lines`, report.global.nbLines ]);
            globalReport.push([ `${type} errors`, report.global.nbErrors ]);
            globalReport.push([ `${type} warnings`, report.global.nbWarnings ]);

            // Display the messages report
            let messagesReportTable = new Table({
                'head': [
                    `${type} file`,
                    'Level',
                    'Line',
                    'Column',
                    'Reason',
                    'Rule ID'
                ]
            });

            let messages = report.messages;
            let warnMessages = false;

            if (messages.length > MAX_ARRAY_LENGTH) {
                warnMessages = true;
                messages = messages.splice(0, MAX_ARRAY_LENGTH);
            }

            messages.forEach(reportMessage => {
                messagesReportTable.push([
                    reportMessage.fileRelativePath,
                    reportMessage.level,
                    reportMessage.line,
                    reportMessage.column,
                    reportMessage.message,
                    reportMessage.ruleId
                ]);
            });

            // Display the tables
            Logger.info(globalReport.toString());

            if (warnMessages) {
                Logger.warn(`You have more than ${MAX_ARRAY_LENGTH} of errors and warnings. We will display only the first ${MAX_ARRAY_LENGTH} messages`);
            }

            Logger.info(messagesReportTable.toString());

            // Finish
            resolve();

        } catch (err) {
            reject(err);
        }
    });
}

/**
 * @private
 * @param {string} reportName
 * @param {string} extension
 * @returns {string}
 */
function tempReportPath(reportName, extension) {
    let reportPath = path.resolve(path.join(os.tmpdir()), `./${reportName}-${Date.now()}.${extension}`);
    return reportPath;
}

class ReportUtils {
    /**
     * @param {CodeAnalyzeReportEntry[]} reportEntries
     * @returns {Promise.<CodeAnalyzeReporting>}
     */
    static getReportFormat(reportEntries) {
        return new Promise((resolve, reject) => {
            try {
                let messagesChaining = _.chain(reportEntries)
                    .map(reportEntry => reportEntry.report.messages)
                    .flatten();

                let files = messagesChaining
                    .map(reportEntry => reportEntry.filePath)
                    .uniq()
                    .sort()
                    .value();

                let model = {
                    'date': new Date().toLocaleString(),
                    'reports': reportEntries,
                    'reportBy': _.keyBy(reportEntries, 'type'),
                    'files': files.map(filePath => {
                        let fileChaining = messagesChaining
                            .filter(message => message.filePath === filePath);

                        let warningMessages = fileChaining
                            .filter(message => message.level === 'warning')
                            .value();

                        let errorMessages = fileChaining
                            .filter(message => message.level === 'error')
                            .value();

                        return {
                            'fileName': path.basename(filePath),
                            'filePath': filePath,
                            'extension': path.extname(filePath),
                            'lines': {
                                'error': {
                                    'count': errorMessages.length,
                                    'lines': _.chain(warningMessages)
                                        .map(message => message.line)
                                        .uniq()
                                        .sort()
                                        .value()
                                },
                                'warning': {
                                    'count': warningMessages.length,
                                    'lines': _.chain(warningMessages)
                                        .map(message => message.line)
                                        .uniq()
                                        .sort()
                                        .value()
                                }
                            }
                        }
                    })
                };

                resolve(model);

            } catch (ex) {
                reject(ex);
            }
        });
    }

    /**
     * @param {CodeAnalyzeReportEntry[]} reportEntries
     * @param {string} [reportPath]
     * @returns {Promise}
     */
    static toHtml(reportEntries, reportPath = tempReportPath('code-analyzer-report', 'html')) {
        return ReportUtils
            .getReportFormat(reportEntries)
            .then(reportModel => REPORT_TEMPLATES.SIMPLE_HTML({ 'model': reportModel }))
            .then(htmlContent => writeFileAsync(reportPath, htmlContent))
            .then(() => {
                Logger.info(`File report was generated to: ${reportPath}`);
            });
    }

    /**
     * @param {CodeAnalyzeReportEntry[]} reportEntries
     * @param {string} [reportPath]
     * @returns {Promise}
     */
    static toJson(reportEntries, reportPath = tempReportPath('code-analyzer-report', 'json')) {
        return ReportUtils
            .getReportFormat(reportEntries)
            .then(reportFormat => writeFileAsync(reportPath, JSON.stringify(reportFormat, null, 3)))
            .then(() => {
                Logger.info(`File report was generated to: ${reportPath}`);
            });
    }

    /**
     * @param {CodeAnalyzeReportEntry[]} reportEntries
     * @returns {Promise}
     */
    static toConsole(reportEntries) {
        let promise = Promise.resolve();

        reportEntries.forEach(reportEntry => {
            promise = promise.then(() => toConsole(reportEntry));
        });

        return promise;
    }
}

module.exports = ReportUtils;
