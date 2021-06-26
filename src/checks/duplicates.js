const { getTotalStatistics } = require('../duplicates/report');

const checkDuplicates = async () => {
  const total = getTotalStatistics();

  // TODO: Use compared branches functionality for the report

  // eslint-disable-next-line no-console
  console.log(total);
};

module.exports = {
  checkDuplicates
};
