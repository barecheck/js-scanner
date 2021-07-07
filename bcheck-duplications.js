#!/usr/bin/env node
const duplicationProgram = require('commander');

const check = require('./src/commands/duplication/check');

duplicationProgram
  .command('check <path>')
  .description('Run code duplication checks', '.')
  .action(check);

duplicationProgram.parse(process.argv);
