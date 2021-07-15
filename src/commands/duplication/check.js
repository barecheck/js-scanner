const { detectClones } = require('../../services/jscpd');
const {
  getCurrentBranch,
  checkoutToBranch,
  stash,
  stashApply
} = require('../../services/git');

const {
  reporterTypes,
  buildDuplicationsReport
} = require('../../services/report');

const getStatisticFromBaseBranch = async (path, currentBranch, baseBranch) => {
  await stash();

  await checkoutToBranch(baseBranch);
  const duplicates = await detectClones(path);
  await checkoutToBranch(currentBranch);

  await stashApply();

  return duplicates;
};

const decimal = (num, count) => (Math.round(num * 100) / 100).toFixed(count);

const reportResult = (duplicates, baseBranchDuplicates) => {
  const { percentage: linesPercentage, percentageTokens } =
    duplicates.statistic.total;
  const {
    percentage: baseBranchLinesPercentage,
    percentageTokens: baseBranchPercentageTokens
  } = baseBranchDuplicates.statistic.total;

  const linesDiff = decimal(linesPercentage - baseBranchLinesPercentage, 2);
  const tokensDiff = decimal(percentageTokens - baseBranchPercentageTokens, 2);

  buildDuplicationsReport(reporterTypes.console, {
    linesDiff,
    tokensDiff,
    totalPercentage: linesPercentage,
    totalTokens: percentageTokens,
    clones: duplicates.clones
  });
};

const duplicationChecksCommand = async (path) => {
  const baseBranch = 'master';

  const currentBranch = await getCurrentBranch();

  const duplicates = await detectClones([path]);

  const baseBranchDuplicates = await getStatisticFromBaseBranch(
    [path],
    currentBranch,
    baseBranch
  );

  reportResult(duplicates, baseBranchDuplicates);
};

module.exports = duplicationChecksCommand;
