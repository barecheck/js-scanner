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
  // eslint-disable-next-line no-console
  console.log('compareStatistic:', statistic);
  await checkoutToBranch(currentBranch);

  await stashApply();

  return statistic;
};

const duplicationChecksCommand = async (path) => {
  const baseBranch = 'master';
  const currentBranch = await getCurrentBranch();
  const fullPath = `${process.cwd()}/${path}`;

  const { statistic } = await detectClones([fullPath]);
  // eslint-disable-next-line no-console
  console.log('statistic:', statistic);

  await getStatisticFromBaseBranch([fullPath], currentBranch, baseBranch);

  // eslint-disable-next-line no-console
  console.log(`Running checks over ${fullPath} directory`);
};

module.exports = duplicationChecksCommand;
