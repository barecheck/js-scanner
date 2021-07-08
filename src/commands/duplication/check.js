const { detectClones } = require('../../services/jscpd');

const duplicationChecksCommand = async (path) => {
  const fullPath = `${process.cwd()}/${path}`;
  const { statistic } = await detectClones([fullPath]);
  // eslint-disable-next-line no-console
  console.log(`Running checks over ${fullPath} directory`);
  // eslint-disable-next-line no-console
  console.log('statistic:', statistic);
};

module.exports = duplicationChecksCommand;
