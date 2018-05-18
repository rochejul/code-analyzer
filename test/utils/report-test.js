describe('ReportUtils ', () => {
    const ReportUtils = require('../../lib/utils/report');
    const ReportTypeEnum = require('../../lib/enums/report-type');
    const path = require('path');

    let reportEntries;

    beforeEach(function () {
        jest.spyOn(Date.prototype, 'toLocaleString').mockImplementation(() => '2018-5-16 21:53:04');

        reportEntries = [
            { 'type': ReportTypeEnum.ECMASCRIPT, 'report': require('../ecmascript/report-code-analyze.js') },
            { 'type': ReportTypeEnum.STYLESHEET, 'report': require('../stylesheet/report-code-analyze.js') }
        ];
    });

    it('should exist', () => {
        expect(ReportUtils).toBeDefined();
    });

    describe('and the method "getReportFormat" ', () => {
        it('should exist', () => {
            expect(ReportUtils.getReportFormat).toBeDefined();
        });

        it('should return the expected report format', () => {
            return ReportUtils
                .getReportFormat(reportEntries)
                .then(report => {
                    expect(report).toEqual(require('./getReportFormat.js'));
                });
        });
    });
});
