const { detectClones } = require('../../services/jscpd');
const {
  getCurrentBranch,
  checkoutToBranch,
  stash,
  stashApply
} = require('../../services/git');

const getStatisticFromBaseBranch = async (path, currentBranch, baseBranch) => {
  await stash();

  await checkoutToBranch(baseBranch);
  const { statistic } = await detectClones(path);
  await checkoutToBranch(currentBranch);

  await stashApply();

  return statistic;
};

const reportResult = (statistic, baseBranchStatistic) => {
  const duplicatedLinesDiff =
    statistic.total.duplicatedLines - baseBranchStatistic.total.duplicatedLines;

  const duplicatedTokensDiff =
    statistic.total.duplicatedTokens -
    baseBranchStatistic.total.duplicatedTokens;

  const resultValue = (value) => `${value > 0 ? '+' : '-'}${value}`;
  // eslint-disable-next-line no-console
  console.log('duplicatedLines:', resultValue(duplicatedLinesDiff));
  // eslint-disable-next-line no-console
  console.log('duplicatedTokens:', resultValue(duplicatedTokensDiff));
};

const duplicationChecksCommand = async (path) => {
  const baseBranch = 'master';
  const currentBranch = await getCurrentBranch();
  const fullPath = `${process.cwd()}/${path}`;

  const { statistic } = await detectClones([fullPath]);

  const baseBranchStatistic = await getStatisticFromBaseBranch(
    [fullPath],
    currentBranch,
    baseBranch
  );

  // eslint-disable-next-line no-console
  console.log(`Running checks over ${fullPath} directory`);

  reportResult(statistic, baseBranchStatistic);
};

module.exports = duplicationChecksCommand;
