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

                report.messages.forEach(reportMessage => {
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
                Logger.info('\n');
                Logger.info(messagesReportTable.toString());

            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = ReportUtils;
