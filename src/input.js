const fs = require('fs');

const rawData = fs.readFileSync('.barecheck.json');
const input = JSON.parse(rawData);

module.exports = input;
