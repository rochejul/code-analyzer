'use strict';

const Table = require('cli-table');

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
     */
    static toConsole(typeOfReport, report) {
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
        console.log(globalReport.toString());
        console.log('\n');
        console.log(messagesReportTable.toString());
    }
}

module.exports = ReportUtils;
