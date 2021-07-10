const { detectClones } = require('../../services/jscpd');
const {
  getCurrentBranch,
  checkoutToBranch,
  stash,
  stashApply
} = require('../../services/git');

const { success, error, warning, info } = require('../../services/output');

const getStatisticFromBaseBranch = async (path, currentBranch, baseBranch) => {
  await stash();

  await checkoutToBranch(baseBranch);
  const { statistic } = await detectClones(path);
  await checkoutToBranch(currentBranch);

  await stashApply();

  return statistic;
};

const decimal = (num, count) => (Math.round(num * 100) / 100).toFixed(count);

const reportResult = (statistic, baseBranchStatistic, threshold) => {
  const { percentage } = statistic.total;
  const { percentage: baseBranchPercentage } = baseBranchStatistic.total;

  const duplicatedLinesDiff = decimal(percentage - baseBranchPercentage, 2);

  const resultValue = (value) => {
    if (parseInt(value, 10) === 0) return value;

    return `${value > 0 ? '+' : '-'}${value}`;
  };

  info(`duplicatedLines: ${resultValue(duplicatedLinesDiff)}%`);

  if (duplicatedLinesDiff - threshold > 0) {
    error('Percentage of duplicated lines is signifigtly increased!');
  } else if (duplicatedLinesDiff > 0) {
    warning('Percentage of duplicated lines is increased.');
  } else if (duplicatedLinesDiff < 0) {
    success('Percentage of duplicated lines is improved!');
  } else {
    success("Percentage of duplicated lines didn't change");
  }
};

const duplicationChecksCommand = async (path) => {
  const baseBranch = 'master';
  const threshold = 10;

  const currentBranch = await getCurrentBranch();
  const fullPath = `${process.cwd()}/${path}`;

  const { statistic } = await detectClones([fullPath]);

  const baseBranchStatistic = await getStatisticFromBaseBranch(
    [fullPath],
    currentBranch,
    baseBranch
  );

  reportResult(statistic, baseBranchStatistic, threshold);
};

module.exports = duplicationChecksCommand;
