const fs = require('fs');
const input = require('../input');

const getReportData = () => {
  const rawData = fs.readFileSync(input.jscpdJSONReport);
  const jscpdData = JSON.parse(rawData);

  return jscpdData;
};
const getTotalStatistics = () => {
  const { statistics } = getReportData();

  return statistics.total;
};

module.exports = {
  getReportData,
  getTotalStatistics
};
