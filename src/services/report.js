const duplicationsConsoleReporter = require('../lib/reporters/console/duplications');

const reporterTypes = {
  console: 'CONSOLE'
};

const buildDuplicationsReport = (reporterType, reporterOptions) => {
  switch (reporterType) {
    case reporterTypes.console:
      return duplicationsConsoleReporter(reporterOptions);
    default:
      throw new Error(`${reporterType} is not defined`);
  }
};

module.exports = {
  reporterTypes,
  buildDuplicationsReport
};
