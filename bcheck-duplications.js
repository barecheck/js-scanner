#!/usr/bin/env node
const duplicationProgram = require('commander');

const check = require('./src/commands/duplication/check');

duplicationProgram
  .command('check <path>')
  .alias('c')
  .description('Run code duplication checks', '.')
  .option(
    '-b, --baseBranch <baseBranch>',
    'specify base branch to compare',
    'master'
  )
  .action(check);

duplicationProgram.parse(process.argv);
