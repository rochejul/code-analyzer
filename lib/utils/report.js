'use strict';

const Table = require('cli-table');
const Logger = require('../logger');

/**
 * @class CodeAnalyzeReport
 * @property {CodeAnalyzeReportGlobal} global
 * @property {CodeAnalyzeReportMessages[]} messages
 */

/**
 * @class CodeAnalyzeReportGlobal
 * @property {number} nbErrors
 * @property {number} nbFiles
 * @property {number} nbLines
 * @property {number} nbWarnings
 */

/**
 * @class CodeAnalyzeReportMessages
 * @property {number} column
 * @property {string} filePath
 * @property {string} fileRelativePath
 * @property {string} level
 * @property {number} line
 * @property {string} message
 * @property {string} ruleId
 */

const MAX_ARRAY_LENGTH = 2000;

class ReportUtils {
    /**
     * @param {string} typeOfReport
     * @param {CodeAnalyzeReport} report
     * @returns {Promise}
     */
    static toConsole(typeOfReport, report) {
        return new Promise((resolve, reject) => {
            try {
                // Display the global report
                let globalReport = new Table({
                    'head': [
                        'Global Report',
                        'Global Measure'
                    ]
                });

                globalReport.push([ `${typeOfReport} nb files`, report.global.nbFiles ]);
                globalReport.push([ `${typeOfReport} nb lines`, report.global.nbLines ]);
                globalReport.push([ `${typeOfReport} errors`, report.global.nbErrors ]);
                globalReport.push([ `${typeOfReport} warnings`, report.global.nbWarnings ]);

                // Display the messages report
                let messagesReportTable = new Table({
                    'head': [
                        `${typeOfReport} file`,
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
}

module.exports = ReportUtils;
