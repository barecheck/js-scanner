const getMetrics = require('../../services/duplication/getMetrics');

const {
  reporterTypes,
  buildDuplicationsReport
} = require('../../services/report');

const reportResult = async (path, baseBranch) => {
  const {
    linesDiff,
    tokensDiff,
    totalPercentage,
    totalTokens,
    clones,
    changedFiles
  } = await getMetrics(path, baseBranch);

  buildDuplicationsReport(reporterTypes.console, {
    linesDiff,
    tokensDiff,
    totalPercentage,
    totalTokens,
    clones,
    changedFiles
  });
};

const duplicationChecksCommand = async (path, { baseBranch }) => {
  await reportResult(path, baseBranch);
};

module.exports = duplicationChecksCommand;
