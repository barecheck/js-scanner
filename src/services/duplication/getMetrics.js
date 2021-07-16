const { detectClones } = require('../../lib/jscpd');
const {
  getCurrentBranch,
  checkoutToBranch,
  stash,
  stashApply,
  diffFileNames
} = require('../../lib/git');

const getStatisticFromBaseBranch = async (path, currentBranch, baseBranch) => {
  await stash();

  await checkoutToBranch(baseBranch);
  const duplicates = await detectClones(path);
  await checkoutToBranch(currentBranch);

  try {
    await stashApply();
  } catch (err) {
    // TODO: find better way of checking if apply exists
    // eslint-disable-next-line no-console
    console.error(err);
  }

  return duplicates;
};

const decimal = (num, count) => (Math.round(num * 100) / 100).toFixed(count);

const getMetrics = async (path, baseBranch) => {
  const currentBranch = await getCurrentBranch();
  const duplicates = await detectClones([path]);
  const changedFiles = await diffFileNames(baseBranch);

  const baseBranchDuplicates = await getStatisticFromBaseBranch(
    [path],
    currentBranch,
    baseBranch
  );

  const { percentage: linesPercentage, percentageTokens } =
    duplicates.statistic.total;
  const {
    percentage: baseBranchLinesPercentage,
    percentageTokens: baseBranchPercentageTokens
  } = baseBranchDuplicates.statistic.total;

  const linesDiff = decimal(linesPercentage - baseBranchLinesPercentage, 2);
  const tokensDiff = decimal(percentageTokens - baseBranchPercentageTokens, 2);

  return {
    linesDiff,
    tokensDiff,
    totalPercentage: linesPercentage,
    totalTokens: percentageTokens,
    clones: duplicates.clones,
    changedFiles
  };
};

module.exports = getMetrics;
