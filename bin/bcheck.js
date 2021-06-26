#!/usr/bin/env node

const { checkDuplicates } = require('../src/checks/duplicates');

async function main() {
  await checkDuplicates();
}

main();
